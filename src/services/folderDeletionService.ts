import { Folder, BulkDeletionRequest, BulkDeletionResponse } from '../types/folders';
import { 
  sortFoldersForDeletion,
  canFolderBeDeleted,
  validateDeletionOrder,
  getFolderDeletionRequirements
} from '../utils/folderDeletionHelpers';

/**
 * Service class for handling complex folder deletion operations
 */
export class FolderDeletionService {
  
  /**
   * Plan folder deletion strategy for a list of folders
   */
  static planDeletion(folders: Folder[], allFolders: Folder[] = []) {
    const sortedFolders = sortFoldersForDeletion(folders);
    const validation = validateDeletionOrder(folders);
    
    const deletionPlan = sortedFolders.map(folder => {
      const canDelete = canFolderBeDeleted(folder, allFolders);
      const requirements = getFolderDeletionRequirements(folder);
      
      return {
        folder,
        canDelete: canDelete.canDelete,
        reason: canDelete.reason,
        blockedBy: canDelete.blockedBy,
        requirements: requirements.requirements,
        order: sortedFolders.indexOf(folder) + 1
      };
    });

    return {
      isValid: validation.isValid,
      errors: validation.errors,
      suggestedOrder: validation.suggestedOrder,
      deletionPlan,
      summary: {
        totalFolders: folders.length,
        canDeleteNow: deletionPlan.filter(p => p.canDelete).length,
        blockedFolders: deletionPlan.filter(p => !p.canDelete).length,
        estimatedSteps: sortedFolders.length
      }
    };
  }

  /**
   * Create bulk deletion request with proper ordering
   */
  static createBulkDeletionRequest(
    folders: Folder[], 
    options: { force?: boolean; deleteOrder?: 'auto' | 'manual' } = {}
  ): BulkDeletionRequest {
    const { force = false, deleteOrder = 'auto' } = options;
    
    let folderIds: string[];
    
    if (deleteOrder === 'auto') {
      // Sort folders by deletion hierarchy
      const sortedFolders = sortFoldersForDeletion(folders);
      folderIds = sortedFolders.map(f => f._id);
    } else {
      // Keep the order provided by user
      folderIds = folders.map(f => f._id);
    }

    return {
      folderIds,
      force,
      deleteOrder
    };
  }

  /**
   * Validate if folders can be deleted without conflicts
   */
  static validateForDeletion(folders: Folder[], allFolders: Folder[] = []) {
    const conflicts: string[] = [];
    const warnings: string[] = [];
    const canProceed = true;

    // Check for parent-child relationships within the deletion set
    folders.forEach(folder => {
      const childrenInSet = folders.filter(f => f.parentFolder === folder._id);
      const childrenNotInSet = allFolders.filter(f => 
        f.parentFolder === folder._id && !folders.some(df => df._id === f._id)
      );

      if (childrenNotInSet.length > 0) {
        conflicts.push(
          `Cannot delete "${folder.name}" - it has ${childrenNotInSet.length} child folder(s) that are not selected for deletion`
        );
      }

      if (folder.materialCount > 0 && folder.isProtected) {
        conflicts.push(
          `Cannot delete "${folder.name}" - contains ${folder.materialCount} protected material(s)`
        );
      }

      if (folder.materialCount > 0 && !folder.isProtected) {
        warnings.push(
          `"${folder.name}" contains ${folder.materialCount} material(s) that will be deleted`
        );
      }
    });

    return {
      canProceed: conflicts.length === 0,
      conflicts,
      warnings,
      totalMaterials: folders.reduce((sum, f) => sum + f.materialCount, 0),
      totalFolders: folders.length
    };
  }

  /**
   * Get deletion progress steps for UI display
   */
  static getDeletionSteps(folders: Folder[]) {
    const sortedFolders = sortFoldersForDeletion(folders);
    
    return sortedFolders.map((folder, index) => ({
      id: folder._id,
      name: folder.name,
      level: folder.level,
      folderType: folder.folderType,
      step: index + 1,
      totalSteps: sortedFolders.length,
      emoji: folder.level === 2 ? '📁' : folder.level === 1 ? '📋' : '💼',
      description: `Delete ${folder.folderType} folder "${folder.name}"`
    }));
  }

  /**
   * Process deletion response and provide user-friendly summary
   */
  static processDeletionResponse(response: BulkDeletionResponse, originalFolders: Folder[]) {
    const { results } = response;
    const successCount = results.deleted.length;
    const failureCount = results.failed.length;
    
    const summary = {
      success: response.success,
      totalRequested: originalFolders.length,
      successfulDeletions: successCount,
      failedDeletions: failureCount,
      deletedFolders: originalFolders.filter(f => results.deleted.includes(f._id)),
      failedFolders: results.failed.map(failure => ({
        folder: originalFolders.find(f => f._id === failure.folderId),
        reason: failure.reason
      }))
    };

    const userMessage = response.success 
      ? `Successfully deleted ${successCount} folder(s)`
      : `Deleted ${successCount} folder(s), but ${failureCount} failed`;

    return {
      ...summary,
      userMessage,
      hasPartialSuccess: successCount > 0 && failureCount > 0
    };
  }

  /**
   * Get recommended deletion order explanation
   */
  static getDeletionOrderGuidance() {
    return {
      title: "Folder Deletion Order",
      description: "Folders must be deleted in hierarchical order to avoid conflicts:",
      steps: [
        {
          order: 1,
          level: 2,
          title: "📁 Grandchild Folders (Level 2)",
          description: "Delete deepest level folders first",
          rules: ["Can contain materials if not protected", "No subfolders to worry about"]
        },
        {
          order: 2, 
          level: 1,
          title: "📋 Child Folders (Level 1)",
          description: "Delete middle level folders second",
          rules: ["Must be empty of grandchild folders", "Cannot contain materials"]
        },
        {
          order: 3,
          level: 0, 
          title: "💼 Parent Folders (Level 0)",
          description: "Delete root level folders last",
          rules: ["Must be empty of all child folders", "Cannot contain materials"]
        }
      ],
      tip: "💡 Select 'Auto Order' to automatically sort folders for safe deletion"
    };
  }

  /**
   * Estimate deletion time/complexity based on folder structure
   */
  static estimateDeletionComplexity(folders: Folder[]) {
    const materialCount = folders.reduce((sum, f) => sum + f.materialCount, 0);
    const subfolderCount = folders.reduce((sum, f) => sum + f.subfolderCount, 0);
    
    let complexity: 'low' | 'medium' | 'high' = 'low';
    let estimatedTime = '< 30 seconds';
    
    if (materialCount > 100 || subfolderCount > 10) {
      complexity = 'high';
      estimatedTime = '2-5 minutes';
    } else if (materialCount > 20 || subfolderCount > 5) {
      complexity = 'medium'; 
      estimatedTime = '30 seconds - 2 minutes';
    }

    return {
      complexity,
      estimatedTime,
      factors: {
        folderCount: folders.length,
        materialCount,
        subfolderCount,
        hasProtectedFolders: folders.some(f => f.isProtected),
        hasHierarchyConflicts: folders.some(f => f.subfolderCount > 0)
      }
    };
  }
}