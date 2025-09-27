import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  XCircle, 
  Clock,
  FolderX,
  Trash2,
  ArrowDown
} from 'lucide-react';

import { Folder } from '@/types/folders';
import { 
  useDeleteFolderMutation, 
  useBulkDeleteFoldersMutation,
  useValidateFolderDeletionQuery 
} from '@/services/foldersApi';
import { FolderDeletionService } from '@/services/folderDeletionService';
import { 
  getDeletionConfirmationMessage,
  getDeletionOrderExplanation 
} from '@/utils/folderDeletionHelpers';

interface FolderDeletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folders: Folder | Folder[]; // Single folder or multiple folders
  allFolders?: Folder[]; // All folders for validation context
  onSuccess?: (deletedFolders: string[]) => void;
  onError?: (error: string) => void;
}

export function FolderDeletionDialog({
  open,
  onOpenChange,
  folders,
  allFolders = [],
  onSuccess,
  onError
}: FolderDeletionDialogProps) {
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useForceDelete, setUseForceDelete] = useState(false);
  const [deletionInProgress, setDeletionInProgress] = useState(false);

  const folderArray = Array.isArray(folders) ? folders : [folders];
  const isBulkDeletion = folderArray.length > 1;
  const singleFolder = folderArray[0];

  // API hooks
  const [deleteFolder] = useDeleteFolderMutation();
  const [bulkDeleteFolders] = useBulkDeleteFoldersMutation();
  
  // Only validate single folder deletion
  const { data: validationData } = useValidateFolderDeletionQuery(
    !isBulkDeletion ? singleFolder?._id : '',
    { skip: isBulkDeletion || !singleFolder }
  );

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setConfirmationChecked(false);
      setShowAdvanced(false);
      setUseForceDelete(false);
      setDeletionInProgress(false);
    }
  }, [open]);

  // Deletion plan and validation
  const deletionAnalysis = useMemo(() => {
    if (isBulkDeletion) {
      const plan = FolderDeletionService.planDeletion(folderArray, allFolders);
      const validation = FolderDeletionService.validateForDeletion(folderArray, allFolders);
      const complexity = FolderDeletionService.estimateDeletionComplexity(folderArray);
      
      return {
        ...plan,
        validation,
        complexity,
        isBulk: true
      };
    } else {
      const confirmation = getDeletionConfirmationMessage(singleFolder);
      return {
        confirmation,
        isBulk: false,
        canProceed: validationData?.canDelete ?? false
      };
    }
  }, [folderArray, allFolders, isBulkDeletion, singleFolder, validationData]);

  const handleDelete = async () => {
    if (!confirmationChecked || deletionInProgress) return;

    setDeletionInProgress(true);

    try {
      if (isBulkDeletion) {
        const request = FolderDeletionService.createBulkDeletionRequest(folderArray, {
          force: useForceDelete,
          deleteOrder: 'auto'
        });

        const response = await bulkDeleteFolders(request).unwrap();
        const processedResponse = FolderDeletionService.processDeletionResponse(response, folderArray);

        if (processedResponse.success || processedResponse.hasPartialSuccess) {
          onSuccess?.(response.results.deleted);
          onOpenChange(false);
        } else {
          throw new Error(processedResponse.userMessage);
        }
      } else {
        const response = await deleteFolder(singleFolder._id).unwrap();
        onSuccess?.([response.deletedFolderId]);
        onOpenChange(false);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || 'Failed to delete folder(s)';
      onError?.(errorMessage);
    } finally {
      setDeletionInProgress(false);
    }
  };

  const renderSingleFolderContent = () => {
    if (!deletionAnalysis.confirmation) return null;

    const { confirmation } = deletionAnalysis;
    const alertVariant = confirmation.warningLevel === 'high' ? 'destructive' : 
                        confirmation.warningLevel === 'medium' ? 'default' : 'default';

    return (
      <div className="space-y-4">
        <Alert variant={alertVariant}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{confirmation.title}</AlertTitle>
          <AlertDescription>{confirmation.message}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          {confirmation.details.map((detail, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              {detail}
            </div>
          ))}
        </div>

        {!deletionAnalysis.canProceed && validationData && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Cannot Delete</AlertTitle>
            <AlertDescription>
              {validationData.reason || 'This folder cannot be deleted due to restrictions.'}
              {validationData.blockers?.dependentFolders && (
                <div className="mt-2">
                  <strong>Delete these folders first:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {validationData.blockers.dependentFolders.map(id => (
                      <li key={id}>Folder ID: {id}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  const renderBulkDeletionContent = () => {
    if (!deletionAnalysis.isBulk) return null;

    const { validation, complexity, summary } = deletionAnalysis as any;

    return (
      <div className="space-y-4">
        {/* Summary */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Bulk Deletion Summary</AlertTitle>
          <AlertDescription>
            Deleting {summary.totalFolders} folders with {validation.totalMaterials} total materials.
            Estimated time: {complexity.estimatedTime}
          </AlertDescription>
        </Alert>

        {/* Conflicts */}
        {validation.conflicts.length > 0 && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Conflicts Found</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc list-inside">
                {validation.conflicts.map((conflict: string, index: number) => (
                  <li key={index}>{conflict}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Warnings */}
        {validation.warnings.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warnings</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc list-inside">
                {validation.warnings.map((warning: string, index: number) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Deletion Order */}
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Deletion Plan
            <ArrowDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>

          {showAdvanced && (
            <ScrollArea className="max-h-64 w-full rounded border p-4">
              <div className="space-y-3">
                <h4 className="font-medium">Deletion Order:</h4>
                {deletionAnalysis.deletionPlan?.map((item: any, index: number) => (
                  <div key={item.folder._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="text-2xl">{item.folder.level === 2 ? '📁' : item.folder.level === 1 ? '📋' : '💼'}</span>
                      <div>
                        <div className="font-medium">{item.folder.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Level {item.folder.level} - {item.folder.folderType}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.canDelete ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Force delete option */}
        {!validation.canProceed && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="force-delete"
              checked={useForceDelete}
              onCheckedChange={setUseForceDelete}
            />
            <label htmlFor="force-delete" className="text-sm">
              Force delete (bypass some restrictions) ⚠️
            </label>
          </div>
        )}
      </div>
    );
  };

  const canProceed = isBulkDeletion 
    ? (deletionAnalysis as any).validation?.canProceed || useForceDelete
    : deletionAnalysis.canProceed;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FolderX className="h-5 w-5 text-red-500" />
            <span>
              Delete {isBulkDeletion ? `${folderArray.length} Folders` : `"${singleFolder?.name}"`}
            </span>
          </DialogTitle>
          <DialogDescription>
            {isBulkDeletion 
              ? 'Review the deletion plan and confirm to proceed with bulk deletion.'
              : 'This action cannot be undone. Please confirm you want to delete this folder.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isBulkDeletion ? renderBulkDeletionContent() : renderSingleFolderContent()}
        </div>

        <Separator />

        <div className="space-y-4">
          {/* Deletion Order Guide */}
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Deletion Order Rules</AlertTitle>
            <AlertDescription>
              {getDeletionOrderExplanation().steps.map(step => (
                <div key={step.level} className="mt-1">
                  {step.emoji} {step.title} → {step.description.toLowerCase()}
                </div>
              ))}
            </AlertDescription>
          </Alert>

          {/* Confirmation checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="confirm-deletion"
              checked={confirmationChecked}
              onCheckedChange={setConfirmationChecked}
            />
            <label htmlFor="confirm-deletion" className="text-sm">
              I understand this action cannot be undone and want to proceed
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deletionInProgress}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!confirmationChecked || !canProceed || deletionInProgress}
          >
            {deletionInProgress ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {isBulkDeletion ? 'Folders' : 'Folder'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}