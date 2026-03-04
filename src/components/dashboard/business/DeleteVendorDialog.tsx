import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteVendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendorName: string;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export const DeleteVendorDialog: React.FC<DeleteVendorDialogProps> = ({
  open,
  onOpenChange,
  vendorName,
  onConfirm,
  isLoading = false
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-lg">Deactivate Vendor</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="pt-2">
          <p className="font-medium text-slate-900">Are you sure you want to deactivate <span className="font-bold">{vendorName}</span>?</p>
          <p className="text-sm text-slate-600 mt-2">
            This will set their account to inactive. They will no longer be able to access their vendor portal or receive assignments. This action can be reversed.
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel disabled={isLoading} className="font-semibold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deactivating...
              </>
            ) : (
              'Deactivate Vendor'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
