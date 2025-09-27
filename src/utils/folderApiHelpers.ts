/**
 * Helper functions and utilities for working with the folder API endpoints
 */

import type { 
  CreateParentFolderRequest,
  CreateChildFolderRequest,
  CreateGrandchildFolderRequest 
} from '@/types/folders';

/**
 * Get the appropriate API endpoint URL based on folder level
 */
export const getFolderCreationEndpoint = (level: number): string => {
  switch (level) {
    case 0:
      return '/api/folders/parent';
    case 1:
      return '/api/folders/child';
    case 2:
      return '/api/folders/grandchild';
    default:
      throw new Error(`Invalid folder level: ${level}. Only levels 0, 1, and 2 are supported.`);
  }
};

/**
 * Get the folder type name based on level
 */
export const getFolderTypeName = (level: number): string => {
  switch (level) {
    case 0:
      return 'Parent';
    case 1:
      return 'Child';
    case 2:
      return 'Grandchild';
    default:
      return 'Unknown';
  }
};

/**
 * Validate folder creation data based on level
 */
export const validateFolderCreationData = (
  level: number, 
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Common validations
  if (!data.name || !data.name.trim()) {
    errors.push('Folder name is required');
  }
  
  if (!data.icon) {
    errors.push('Folder icon is required');
  }
  
  if (!data.color) {
    errors.push('Folder color is required');
  }
  
  // Level-specific validations
  switch (level) {
    case 0:
      // Parent folders should NOT have parentFolder
      if (data.parentFolder) {
        errors.push('Parent folders cannot have a parent folder');
      }
      break;
      
    case 1:
    case 2:
      // Child and Grandchild folders MUST have parentFolder
      if (!data.parentFolder) {
        errors.push(`${getFolderTypeName(level)} folders must have a parent folder`);
      }
      break;
      
    default:
      errors.push(`Invalid folder level: ${level}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Create folder data examples for each level
 */
export const createFolderExamples = {
  parent: (): CreateParentFolderRequest => ({
    name: "Sales & Marketing",
    description: "All sales and marketing materials",
    icon: "megaphone",
    color: "#28a745",
    visibility: "public",
    isProtected: false
  }),
  
  child: (parentId: string): CreateChildFolderRequest => ({
    name: "Digital Marketing",
    description: "Digital marketing strategies and campaigns",
    parentFolder: parentId,
    icon: "monitor",
    color: "#17a2b8",
    visibility: "public",
    isProtected: false
  }),
  
  grandchild: (childId: string): CreateGrandchildFolderRequest => ({
    name: "Social Media",
    description: "Social media marketing materials",
    parentFolder: childId,
    icon: "users",
    color: "#6f42c1",
    isProtected: true,
    allowMaterials: true
  })
};

/**
 * API usage examples as code strings for documentation
 */
export const getApiUsageExamples = () => ({
  parent: `
// Create Parent Folder (Level 0)
const parentFolder = await createParentFolder({
  name: "Sales & Marketing",
  description: "All sales and marketing materials",
  icon: "megaphone",
  color: "#28a745",
  visibility: "public"
});
`,
  
  child: `
// Create Child Folder (Level 1)
const childFolder = await createChildFolder({
  name: "Digital Marketing",
  description: "Digital marketing strategies",
  parentFolder: parentFolderId, // Required - must be Level 0 folder
  icon: "monitor",
  color: "#17a2b8"
});
`,
  
  grandchild: `
// Create Grandchild Folder (Level 2)
const grandchildFolder = await createGrandchildFolder({
  name: "Social Media",
  description: "Social media materials",
  parentFolder: childFolderId, // Required - must be Level 1 folder
  icon: "users",
  color: "#6f42c1",
  allowMaterials: true
});
`
});

/**
 * Get folder capabilities based on level
 */
export const getFolderCapabilities = (level: number) => ({
  canHaveSubfolders: level < 2,
  canHaveMaterials: level === 2,
  maxDepthReached: level >= 2,
  levelName: getFolderTypeName(level),
  endpoint: getFolderCreationEndpoint(level)
});

/**
 * Format folder hierarchy path for display
 */
export const formatFolderPath = (
  folders: Array<{ name: string; level: number }>
): string => {
  return folders
    .sort((a, b) => a.level - b.level)
    .map(folder => folder.name)
    .join(' / ');
};