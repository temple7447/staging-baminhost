import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Palette, Plus } from 'lucide-react';
import { useCreateCategoryMutation } from '../../services/categoriesApi';
import { toast } from 'sonner';

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_COLORS = [
  '#17a2b8', // Info blue
  '#28a745', // Success green
  '#dc3545', // Danger red
  '#ffc107', // Warning yellow
  '#6f42c1', // Purple
  '#fd7e14', // Orange
  '#e83e8c', // Pink
  '#20c997', // Teal
  '#6c757d', // Gray
  '#495057', // Dark gray
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#17a2b8',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Category name must be less than 50 characters';
    }

    if (formData.description.trim() && formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    if (!formData.color || !/^#[0-9A-F]{6}$/i.test(formData.color)) {
      newErrors.color = 'Please select a valid color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await createCategory({
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
      }).unwrap();

      if (result.success) {
        toast.success('Category created successfully!');
        setFormData({ name: '', description: '', color: '#17a2b8' });
        setErrors({});
        onOpenChange(false);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to create category';
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleColorSelect = (color: string) => {
    handleInputChange('color', color);
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', color: '#17a2b8' });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Category
          </DialogTitle>
          <DialogDescription>
            Create a new category to organize your library content. Choose a descriptive name and color theme.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Marketing, Technical Documentation"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.name.length}/50 characters
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what type of content belongs in this category..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
              maxLength={200}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Category Color <span className="text-red-500">*</span>
            </Label>
            
            {/* Color Preview */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: formData.color }}
              />
              <Badge 
                className="text-white" 
                style={{ backgroundColor: formData.color }}
              >
                {formData.name || 'Category Preview'}
              </Badge>
            </div>

            {/* Preset Colors */}
            <div className="space-y-2">
              <Label className="text-sm">Quick Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                      formData.color === color 
                        ? 'border-gray-900 ring-2 ring-gray-300' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm">Custom Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-16 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  placeholder="#17a2b8"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className={`flex-1 ${errors.color ? 'border-red-500' : ''}`}
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
              {errors.submit}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Category
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};