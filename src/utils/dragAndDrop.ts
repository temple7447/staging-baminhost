import type { Folder } from '@/types/folders';
import type { Material } from '@/types/materials';

export type DragItem = {
  type: 'folder' | 'material';
  id: string;
  data: Folder | Material;
};

export const DRAG_TYPES = {
  FOLDER: 'application/x-folder',
  MATERIAL: 'application/x-material',
} as const;

// Create drag data for transfer
export const createDragData = (item: DragItem): string => {
  return JSON.stringify(item);
};

// Parse drag data from transfer
export const parseDragData = (dataTransfer: DataTransfer): DragItem | null => {
  try {
    const folderData = dataTransfer.getData(DRAG_TYPES.FOLDER);
    const materialData = dataTransfer.getData(DRAG_TYPES.MATERIAL);
    
    if (folderData) {
      return JSON.parse(folderData);
    }
    
    if (materialData) {
      return JSON.parse(materialData);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing drag data:', error);
    return null;
  }
};

// Check if drop is valid (e.g., can't drop folder into itself or its children)
export const isValidDrop = (dragItem: DragItem, targetFolderId: string | null): boolean => {
  // Can't drop folder into itself
  if (dragItem.type === 'folder' && dragItem.id === targetFolderId) {
    return false;
  }
  
  // Can't drop folder into its own child (basic check)
  if (dragItem.type === 'folder' && dragItem.data && 'parentFolder' in dragItem.data) {
    const folder = dragItem.data as any;
    if (folder.parentFolder === targetFolderId) {
      return false; // Already in this folder
    }
  }
  
  // TODO: Add more validation for nested folder checks
  // For now, we'll allow all other drops
  return true;
};

// Drag and drop event handlers
export const handleDragStart = (e: React.DragEvent, item: DragItem) => {
  const dragData = createDragData(item);
  
  if (item.type === 'folder') {
    e.dataTransfer.setData(DRAG_TYPES.FOLDER, dragData);
  } else {
    e.dataTransfer.setData(DRAG_TYPES.MATERIAL, dragData);
  }
  
  e.dataTransfer.effectAllowed = 'move';
  
  // Add visual feedback
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.style.opacity = '0.5';
  }
};

export const handleDragEnd = (e: React.DragEvent) => {
  // Reset visual feedback
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.style.opacity = '1';
  }
};

export const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDragEnter = (e: React.DragEvent) => {
  e.preventDefault();
  
  // Add visual feedback for drop target
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.add('drag-over');
  }
};

export const handleDragLeave = (e: React.DragEvent) => {
  // Only remove highlight if we're leaving the element itself, not a child
  if (e.currentTarget instanceof HTMLElement && !e.currentTarget.contains(e.relatedTarget as Node)) {
    e.currentTarget.classList.remove('drag-over');
  }
};

export const handleDrop = (
  e: React.DragEvent,
  targetFolderId: string | null,
  onDrop: (dragItem: DragItem, targetFolderId: string | null) => void
) => {
  e.preventDefault();
  
  // Remove visual feedback
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.remove('drag-over');
  }
  
  const dragItem = parseDragData(e.dataTransfer);
  
  if (dragItem && isValidDrop(dragItem, targetFolderId)) {
    onDrop(dragItem, targetFolderId);
  }
};