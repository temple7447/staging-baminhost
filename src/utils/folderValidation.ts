import type { Folder } from '@/types/folders';
import { FOLDER_LEVELS, getFolderCapabilities, canCreateSubfolder, canAddMaterials } from '@/types/folders';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  level?: number;
}

// Validate folder creation based on parent folder
export const validateFolderCreation = (parentFolder?: Folder | null): ValidationResult => {
  // Creating root folder (Level 0)
  if (!parentFolder) {
    return {
      isValid: true,
      level: FOLDER_LEVELS.PARENT,
    };
  }

  // Check if parent can have subfolders
  if (!parentFolder.canHaveSubfolders) {
    return {
      isValid: false,
      message: `Cannot create subfolders in "${parentFolder.name}". This folder can only contain materials.`,
    };
  }

  // Determine the new folder's level
  const newLevel = parentFolder.level + 1;

  // Check if we're exceeding the maximum levels (0, 1, 2)
  if (newLevel > FOLDER_LEVELS.GRANDCHILD) {
    return {
      isValid: false,
      message: 'Maximum folder depth reached. Cannot create more than 3 levels of folders.',
    };
  }

  return {
    isValid: true,
    level: newLevel,
  };
};

// Check if materials can be uploaded to a folder
export const validateMaterialUpload = (folder: Folder): ValidationResult => {
  if (!folder.canHaveMaterials) {
    return {
      isValid: false,
      message: `Materials can only be uploaded to the deepest level folders. Please select a "${getLevelName(FOLDER_LEVELS.GRANDCHILD)}" folder.`,
    };
  }

  return {
    isValid: true,
  };
};

// Get folder creation restrictions message
export const getFolderCreationMessage = (parentFolder?: Folder | null): string => {
  if (!parentFolder) {
    return 'Create a root-level container (Parent folder)';
  }

  const newLevel = parentFolder.level + 1;
  
  switch (newLevel) {
    case FOLDER_LEVELS.CHILD:
      return `Create a sub-category under "${parentFolder.name}"`;
    case FOLDER_LEVELS.GRANDCHILD:
      return `Create a material folder under "${parentFolder.name}" (final level)`;
    default:
      return 'Cannot create folder at this level';
  }
};

// Get level-specific description
export const getLevelDescription = (level: number): string => {
  switch (level) {
    case FOLDER_LEVELS.PARENT:
      return 'Root-level container (can have sub-categories, no materials)';
    case FOLDER_LEVELS.CHILD:
      return 'Sub-category (can have material folders, no materials)';
    case FOLDER_LEVELS.GRANDCHILD:
      return 'Material folder (can contain materials, no subfolders)';
    default:
      return 'Unknown level';
  }
};

// Get level name
export const getLevelName = (level: number): string => {
  switch (level) {
    case FOLDER_LEVELS.PARENT:
      return 'Parent';
    case FOLDER_LEVELS.CHILD:
      return 'Child';
    case FOLDER_LEVELS.GRANDCHILD:
      return 'Grandchild';
    default:
      return 'Unknown';
  }
};

// Check if folder can have specific action
export const canPerformAction = (folder: Folder, action: 'createSubfolder' | 'uploadMaterial'): boolean => {
  switch (action) {
    case 'createSubfolder':
      return folder.canHaveSubfolders;
    case 'uploadMaterial':
      return folder.canHaveMaterials;
    default:
      return false;
  }
};

// Get folder icon based on level and capabilities
export const getSuggestedFolderIcon = (level: number): string => {
  switch (level) {
    case FOLDER_LEVELS.PARENT:
      return 'briefcase'; // Business/category icon
    case FOLDER_LEVELS.CHILD:
      return 'folder'; // Standard folder icon
    case FOLDER_LEVELS.GRANDCHILD:
      return 'fileText'; // Document/material icon
    default:
      return 'folder';
  }
};

// Get folder color based on level
export const getSuggestedFolderColor = (level: number): string => {
  switch (level) {
    case FOLDER_LEVELS.PARENT:
      return '#007bff'; // Blue for root containers
    case FOLDER_LEVELS.CHILD:
      return '#28a745'; // Green for sub-categories
    case FOLDER_LEVELS.GRANDCHILD:
      return '#fd7e14'; // Orange for material folders
    default:
      return '#6c757d'; // Gray as fallback
  }
};

// Parse fullPath into breadcrumb items
export const parseFolderPath = (fullPath: string): { name: string; level: number }[] => {
  if (!fullPath) return [];
  
  const pathParts = fullPath.split('/').map(part => part.trim());
  return pathParts.map((name, index) => ({
    name,
    level: index,
  }));
};

// Generate fullPath from folder hierarchy
export const generateFullPath = (folderName: string, parentPath?: string): string => {
  if (!parentPath) {
    return folderName;
  }
  return `${parentPath}/${folderName}`;
};