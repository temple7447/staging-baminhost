import { Folder, FolderDeletionRequirements, FOLDER_LEVELS } from '../types/folders';

/**
 * Get deletion requirements for a specific folder based on its type/level
 */
export const getFolderDeletionRequirements = (folder: Folder): FolderDeletionRequirements => {
  const { level, folderType, subfolderCount, materialCount, isProtected } = folder;

  switch (level) {
    case FOLDER_LEVELS.PARENT: // Level 0 - Parent
      return {
        folderType: 'parent',
        level: 0,
        requirements: [
          'Must delete all descendants (children + grandchildren) before deleting',
          `Currently has ${subfolderCount} child folder(s)`,
          subfolderCount > 0 ? 'Delete all child folders first' : 'Folder is empty and can be deleted'
        ].filter(Boolean),
        canDelete: subfolderCount === 0,
        mustDeleteFirst: subfolderCount > 0 ? ['All child folders'] : undefined
      };

    case FOLDER_LEVELS.CHILD: // Level 1 - Child
      return {
        folderType: 'child',
        level: 1,
        requirements: [
          'Must delete all grandchild folders before deleting',
          `Currently has ${subfolderCount} grandchild folder(s)`,
          subfolderCount > 0 ? 'Delete all grandchild folders first' : 'Folder is empty and can be deleted'
        ].filter(Boolean),
        canDelete: subfolderCount === 0,
        mustDeleteFirst: subfolderCount > 0 ? ['All grandchild folders'] : undefined
      };

    case FOLDER_LEVELS.GRANDCHILD: // Level 2 - Grandchild
      const hasProtectedMaterials = isProtected && materialCount > 0;
      return {
        folderType: 'grandchild',
        level: 2,
        requirements: [
          'Can contain materials (as long as they\'re not protected)',
          `Currently has ${materialCount} material(s)`,
          hasProtectedMaterials ? 'Contains protected materials - cannot delete' : 'Can be deleted',
          isProtected ? 'Folder is marked as protected' : 'Folder is not protected'
        ].filter(Boolean),
        canDelete: !hasProtectedMaterials,
        mustDeleteFirst: hasProtectedMaterials ? ['Remove or unprotect materials'] : undefined
      };

    default:
      return {
        folderType: 'parent',
        level: 0,
        requirements: ['Unknown folder type'],
        canDelete: false
      };
  }
};

/**
 * Sort folders by deletion order (grandchildren -> children -> parents)
 */
export const sortFoldersForDeletion = (folders: Folder[]): Folder[] => {
  return [...folders].sort((a, b) => {
    // Sort by level descending (2 -> 1 -> 0)
    if (a.level !== b.level) {
      return b.level - a.level;
    }
    // Within same level, sort by name for consistency
    return a.name.localeCompare(b.name);
  });
};

/**
 * Group folders by their deletion level for ordered processing
 */
export const groupFoldersByDeletionLevel = (folders: Folder[]) => {
  const grouped = {
    grandchildren: folders.filter(f => f.level === FOLDER_LEVELS.GRANDCHILD),
    children: folders.filter(f => f.level === FOLDER_LEVELS.CHILD),
    parents: folders.filter(f => f.level === FOLDER_LEVELS.PARENT)
  };

  return {
    ...grouped,
    deletionOrder: [
      ...grouped.grandchildren,
      ...grouped.children, 
      ...grouped.parents
    ]
  };
};

/**
 * Check if a folder can be safely deleted according to hierarchy rules
 */
export const canFolderBeDeleted = (
  folder: Folder, 
  allFolders: Folder[] = []
): { canDelete: boolean; reason?: string; blockedBy?: string[] } => {
  const requirements = getFolderDeletionRequirements(folder);
  
  if (requirements.canDelete) {
    return { canDelete: true };
  }

  // Find specific folders blocking deletion
  const blockedBy: string[] = [];
  
  if (folder.level < FOLDER_LEVELS.GRANDCHILD) {
    // Find child/grandchild folders
    const childFolders = allFolders.filter(f => f.parentFolder === folder._id);
    blockedBy.push(...childFolders.map(f => f.name));
  }

  return {
    canDelete: false,
    reason: requirements.requirements.join('. '),
    blockedBy: blockedBy.length > 0 ? blockedBy : undefined
  };
};

/**
 * Get human-readable deletion order explanation
 */
export const getDeletionOrderExplanation = () => {
  return {
    title: '🗑️ Folder Deletion Order',
    steps: [
      {
        level: 2,
        emoji: '📁',
        title: 'Grandchild folders (Level 2)',
        description: 'Delete first - these are the deepest level folders that can contain materials',
        canContain: 'Materials (if not protected)'
      },
      {
        level: 1, 
        emoji: '📋',
        title: 'Child folders (Level 1)',
        description: 'Delete second - must be empty of grandchild folders',
        canContain: 'Only grandchild folders'
      },
      {
        level: 0,
        emoji: '💼', 
        title: 'Parent folders (Level 0)',
        description: 'Delete last - must be empty of all descendants',
        canContain: 'Only child folders'
      }
    ]
  };
};

/**
 * Validate if a batch of folders can be deleted in the given order
 */
export const validateDeletionOrder = (folders: Folder[]): {
  isValid: boolean;
  errors: string[];
  suggestedOrder: Folder[];
} => {
  const errors: string[] = [];
  const suggestedOrder = sortFoldersForDeletion(folders);
  
  // Check if any parent folders come before their children in the list
  for (let i = 0; i < folders.length; i++) {
    const currentFolder = folders[i];
    
    // Check if any folder later in the list is a child of current folder
    for (let j = i + 1; j < folders.length; j++) {
      const laterFolder = folders[j];
      
      if (laterFolder.parentFolder === currentFolder._id) {
        errors.push(
          `"${currentFolder.name}" cannot be deleted before its child "${laterFolder.name}"`
        );
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    suggestedOrder
  };
};

/**
 * Get deletion confirmation message based on folder type and contents
 */
export const getDeletionConfirmationMessage = (folder: Folder): {
  title: string;
  message: string;
  warningLevel: 'low' | 'medium' | 'high';
  details: string[];
} => {
  const requirements = getFolderDeletionRequirements(folder);
  
  if (!requirements.canDelete) {
    return {
      title: `Cannot Delete "${folder.name}"`,
      message: 'This folder cannot be deleted due to the following restrictions:',
      warningLevel: 'high',
      details: requirements.requirements
    };
  }

  const hasContent = folder.materialCount > 0 || folder.subfolderCount > 0;
  
  return {
    title: `Delete "${folder.name}"?`,
    message: hasContent 
      ? 'This action will permanently delete the folder and its contents.'
      : 'This action will permanently delete the empty folder.',
    warningLevel: hasContent ? 'medium' : 'low',
    details: [
      `📁 Folder: ${folder.name} (${folder.folderType})`,
      `📊 Level: ${folder.level} - ${folder.folderType}`,
      ...(folder.materialCount > 0 ? [`📄 Contains ${folder.materialCount} material(s)`] : []),
      ...(folder.subfolderCount > 0 ? [`📁 Contains ${folder.subfolderCount} subfolder(s)`] : []),
      '⚠️ This action cannot be undone'
    ]
  };
};