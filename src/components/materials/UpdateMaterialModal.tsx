import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from 'lucide-react';
import { Material } from '@/types/materials';
import { useUpdateMaterialMutation } from '@/services/materialsApi';

interface UpdateMaterialModalProps {
  material: Material | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const UpdateMaterialModal: React.FC<UpdateMaterialModalProps> = ({
  material,
  open,
  onOpenChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const [updateMaterial, { isLoading }] = useUpdateMaterialMutation();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    keywords: '',
  });

  // Reset form when material changes or modal opens/closes
  useEffect(() => {
    if (material && open) {
      setFormData({
        title: material.title,
        description: material.description || '',
        tags: material.tags.join(', '),
        keywords: material.keywords.join(', '),
      });
    } else if (!open) {
      setFormData({
        title: '',
        description: '',
        tags: '',
        keywords: '',
      });
    }
  }, [material, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!material || !formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const updateData = {
        id: material._id,
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0),
      };

      await updateMaterial(updateData).unwrap();
      
      toast({
        title: "Success",
        description: "Material has been updated successfully!",
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update material';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Material</DialogTitle>
          <DialogDescription>
            Edit the material information. Demonstrates useUpdateMaterialMutation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter material title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter material description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              placeholder="Enter keywords separated by commas"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Material
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};