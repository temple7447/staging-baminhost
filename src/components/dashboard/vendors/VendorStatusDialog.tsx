import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { Vendor } from '@/services/vendorsApi';

interface VendorStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: Vendor | null;
  onConfirm: (vendorId: string) => Promise<void>;
  isLoading?: boolean;
}

export const VendorStatusDialog: React.FC<VendorStatusDialogProps> = ({
  open,
  onOpenChange,
  vendor,
  onConfirm,
  isLoading = false,
}) => {
  const handleConfirm = async () => {
    if (!vendor) return;
    try {
      await onConfirm(vendor._id);
      onOpenChange(false);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  if (!vendor) return null;

  const isActivating = !vendor.isActive;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center h-12 w-12 rounded-full ${isActivating ? 'bg-green-100' : 'bg-red-100'}`}>
              {isActivating ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <AlertDialogTitle>
              {isActivating ? 'Activate' : 'Deactivate'} Vendor
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="pt-2">
          <p className="font-medium text-slate-900">
            Are you sure you want to {isActivating ? 'activate' : 'deactivate'} <span className="font-bold">{vendor.name}</span>?
          </p>
          <p className="text-sm text-slate-600 mt-2">
            {isActivating
              ? 'This vendor will regain access to their account and can receive assignments.'
              : 'This vendor will no longer be able to access their account or receive new assignments.'}
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={isActivating ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `${isActivating ? 'Activate' : 'Deactivate'} Vendor`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
