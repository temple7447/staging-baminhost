export interface Folder {
  _id: string; // MongoDB _id from API
  id?: string; // Computed alias for _id
  name: string;
  slug: string; // Auto-generated URL-friendly slug
  description?: string;
  parentFolder?: string | null; // null for root folders
  level: number; // 0 = Parent, 1 = Child, 2 = Grandchild
  fullPath: string; // Automatic path like "Sales & Marketing/Digital Marketing/Social Media"
  icon: string;
  color: string;
  isActive: boolean;
  order: number;
  materialCount: number;
  subfolderCount: number;
  totalSize: number; // total size of files in bytes
  visibility: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles: string[];
  isProtected: boolean;
  allowMaterials: boolean;
  folderType: 'parent' | 'child' | 'grandchild'; // Virtual field based on level
  canHaveSubfolders: boolean; // true for levels 0 and 1, false for level 2
  canHaveMaterials: boolean; // false for levels 0 and 1, true for level 2
  depth?: number; // Used in tree view
  folderPath?: { _id: string; name: string; slug: string; level: number }[]; // Breadcrumb path
  subfolders?: Folder[]; // Nested subfolders in tree view
  materials?: import('./materials').Material[]; // Materials in this folder
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FolderPermission {
  id: string;
  folderId: string;
  userId?: string;
  roleType?: 'super_admin' | 'admin' | 'manager' | 'vendor' | 'customer' | 'owner';
  permission: 'read' | 'write' | 'admin' | 'full';
  createdAt: string;
}

export interface FolderTreeNode {
  folder: Folder;
  subFolders: FolderTreeNode[];
  materials: import('./materials').Material[];
}

export interface FoldersResponse {
  success: boolean;
  data: Folder[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FolderResponse {
  success: boolean;
  data: Folder;
  message?: string;
}

// Base folder creation interface
export interface BaseFolderRequest {
  name: string;
  description?: string;
  icon: string;
  color: string;
  order?: number;
  visibility?: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles?: string[];
  isProtected?: boolean;
  allowMaterials?: boolean;
}

// Parent folder creation (Level 0) - No parentFolder allowed
export interface CreateParentFolderRequest extends BaseFolderRequest {
  // parentFolder is explicitly excluded
}

// Child folder creation (Level 1) - parentFolder required (must be Level 0)
export interface CreateChildFolderRequest extends BaseFolderRequest {
  parentFolder: string; // Required, must reference a Level 0 folder
}

// Grandchild folder creation (Level 2) - parentFolder required (must be Level 1)
export interface CreateGrandchildFolderRequest extends BaseFolderRequest {
  parentFolder: string; // Required, must reference a Level 1 folder
}

// Legacy generic create folder request - for backward compatibility
export interface CreateFolderRequest extends BaseFolderRequest {
  parentFolder?: string; // Optional for backward compatibility
}

export interface UpdateFolderRequest {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  parentFolder?: string | null;
  icon?: string;
  color?: string;
  order?: number;
  visibility?: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles?: string[];
  isProtected?: boolean;
  isActive?: boolean;
}

export interface MoveFolderRequest {
  folderId: string;
  parentFolder?: string | null; // Updated to match API spec
}

export interface FolderContentsResponse {
  success: boolean;
  data: {
    folder: Folder;
    subFolders: Folder[];
    materials: import('./materials').Material[];
    breadcrumbs: { id: string; name: string }[];
  };
  message?: string;
}

export interface FoldersQueryParams {
  parentFolder?: string | null;
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'materialsCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FolderStats {
  overview: {
    totalFolders: number;
    totalMaterials: number;
    parentFolders: number; // Level 0
    childFolders: number;  // Level 1
    grandchildFolders: number; // Level 2
  };
  levelDistribution: { _id: number; count: number }[];
  topFolders: {
    name: string;
    fullPath: string;
    materialCount: number;
    totalSize: number;
  }[];
}

// Folder hierarchy levels
export const FOLDER_LEVELS = {
  PARENT: 0,     // Root level containers
  CHILD: 1,      // Sub-categories
  GRANDCHILD: 2  // Final level where materials are stored
} as const;

export type FolderLevel = typeof FOLDER_LEVELS[keyof typeof FOLDER_LEVELS];

// Helper functions for folder capabilities
export const getFolderCapabilities = (level: number) => ({
  canHaveSubfolders: level < 2, // Only levels 0 and 1 can have subfolders
  canHaveMaterials: level === 2  // Only level 2 can have materials
});

export const getMaxLevel = () => FOLDER_LEVELS.GRANDCHILD;

export const getLevelName = (level: number): string => {
  switch (level) {
    case 0: return 'Parent';
    case 1: return 'Child';
    case 2: return 'Grandchild';
    default: return 'Unknown';
  }
};

// Validation helpers
export const canCreateSubfolder = (parentLevel: number): boolean => {
  return parentLevel < 2; // Can create subfolders in levels 0 and 1
};

export const canAddMaterials = (folderLevel: number): boolean => {
  return folderLevel === 2; // Can only add materials to level 2 (grandchild) folders
};

// Available folder icons (can be extended)
export const FOLDER_ICONS = [
  'folder',
  'briefcase',
  'book',
  'users',
  'settings',
  'heart',
  'star',
  'home',
  'building',
  'graduationCap',
  'target',
  'shield',
  'camera',
  'music',
  'video',
  'fileText',
  'image',
  'code',
  'database',
  'globe',
  'megaphone', // Sales & Marketing example
  'monitor', // Digital Marketing example
  'mail', // Email Marketing example
  'trendingUp', // Sales trend/growth
  'pie-chart', // Analytics
  'layout', // Design/Layout
  'smartphone', // Mobile
  'headphones', // Audio/Support
  'calendar', // Scheduling
  'clock' // Time management
] as const;

export type FolderIcon = typeof FOLDER_ICONS[number];

// Predefined folder colors
export const FOLDER_COLORS = [
  '#28a745', // Green
  '#007bff', // Blue  
  '#6f42c1', // Purple
  '#fd7e14', // Orange
  '#dc3545', // Red
  '#17a2b8', // Teal
  '#ffc107', // Yellow
  '#e83e8c', // Pink
  '#6c757d', // Gray
  '#20c997', // Success green
  '#0dcaf0', // Cyan
  '#198754', // Dark green
] as const;

export type FolderColor = typeof FOLDER_COLORS[number];

// Folder Deletion Types
export interface FolderDeletionValidation {
  canDelete: boolean;
  reason?: string;
  blockers?: {
    hasSubfolders?: boolean;
    hasProtectedMaterials?: boolean;
    dependentFolders?: string[]; // IDs of folders that need to be deleted first
  };
  requirements?: string[];
}

export interface FolderDeletionResponse {
  success: boolean;
  message: string;
  deletedFolderId: string;
  cascadeDeleted?: string[]; // IDs of folders deleted in cascade
}

export interface BulkDeletionRequest {
  folderIds: string[];
  force?: boolean; // Force deletion ignoring some restrictions
  deleteOrder?: 'auto' | 'manual'; // Auto follows hierarchy rules
}

export interface BulkDeletionResponse {
  success: boolean;
  message: string;
  results: {
    deleted: string[];
    failed: {
      folderId: string;
      reason: string;
    }[];
  };
}

export interface FolderDeletionRequirements {
  folderType: 'parent' | 'child' | 'grandchild';
  level: number;
  requirements: string[];
  canDelete: boolean;
  mustDeleteFirst?: string[]; // Folder names/paths that must be deleted first
}
