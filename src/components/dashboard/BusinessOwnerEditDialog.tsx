import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import type { BusinessOwner } from '@/types/auth';
import type { Estate } from '@/services/estatesApi';

interface BusinessOwnerEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessOwner: BusinessOwner | null;
  estates: Estate[];
  onSave: (id: string, data: UpdateBusinessOwnerData) => Promise<void>;
  isLoading?: boolean;
}

export interface UpdateBusinessOwnerData {
  name: string;
  email: string;
  phone: string;
  estateIds: string[];
}

export const BusinessOwnerEditDialog: React.FC<BusinessOwnerEditDialogProps> = ({
  open,
  onOpenChange,
  businessOwner,
  estates,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<UpdateBusinessOwnerData>({
    name: '',
    email: '',
    phone: '',
    estateIds: [],
  });

  useEffect(() => {
    if (businessOwner) {
      setFormData({
        name: businessOwner.name || '',
        email: businessOwner.email || '',
        phone: businessOwner.phone || '',
        estateIds: businessOwner.assignedEstates?.map((e) => e._id) || [],
      });
    }
  }, [businessOwner, open]);

  const toggleEstateSelection = (estateId: string) => {
    setFormData((prev) => ({
      ...prev,
      estateIds: prev.estateIds.includes(estateId)
        ? prev.estateIds.filter((id) => id !== estateId)
        : [...prev.estateIds, estateId],
    }));
  };

  const handleSubmit = async () => {
    if (!businessOwner) return;
    try {
      await onSave(businessOwner._id, formData);
      onOpenChange(false);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Business Owner</DialogTitle>
          <DialogDescription>Update business owner information and assigned estates</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 0000000"
                />
              </div>
            </div>
          </div>

          {/* Estate Selection */}
          <div className="grid gap-2">
            <Label>Assigned Estates</Label>
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
              <div className="space-y-3">
                {estates.map((estate) => (
                  <div
                    key={estate.id}
                    className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => toggleEstateSelection(estate.id)}
                  >
                    <Checkbox
                      checked={formData.estateIds.includes(estate.id)}
                      onCheckedChange={() => toggleEstateSelection(estate.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{estate.name}</div>
                      {estate.description && (
                        <div className="text-xs text-muted-foreground">{estate.description}</div>
                      )}
                    </div>
                    {typeof estate.totalUnits === 'number' && (
                      <span className="text-xs text-muted-foreground">{estate.totalUnits} units</span>
                    )}
                  </div>
                ))}
                {estates.length === 0 && (
                  <p className="text-sm text-muted-foreground">No estates available</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};