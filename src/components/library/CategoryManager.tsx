import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Edit3,
  Trash2,
  MoreVertical,
  Folder,
  FileText,
  Loader2,
  Plus,
  Palette,
  TrendingUp,
  Megaphone,
  Settings,
  DollarSign,
  Shield,
  Users,
  Award,
  Clock,
  Cpu,
  Smile,
  BarChart3,
  UserPlus,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '../../services/categoriesApi';
import { AddCategoryModal } from './AddCategoryModal';
import { toast } from 'sonner';
import type { Category } from '../../types/categories';

interface CategoryManagerProps {
  className?: string;
  onUpdateCategory: (id: string, updates: any) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  isUpdating: boolean;
  isDeleting: boolean;
}

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'folder': Folder,
    'trending-up': TrendingUp,
    'megaphone': Megaphone,
    'settings': Settings,
    'dollar-sign': DollarSign,
    'shield': Shield,
    'users': Users,
    'award': Award,
    'clock': Clock,
    'cpu': Cpu,
    'smile': Smile,
    'bar-chart': BarChart3,
    'user-plus': UserPlus,
  };
  return iconMap[iconName] || Folder;
};

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  className = '',
  onUpdateCategory,
  onDeleteCategory,
  isUpdating,
  isDeleting
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    data: categoriesResponse,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();

  const [deleteCategoryMutation, { isLoading: isDeletingMutation }] = useDeleteCategoryMutation();

  const categories = categoriesResponse?.data || [];

  const handleDeleteCategory = async () => {
    if (!deleteCategory) return;

    try {
      await deleteCategoryMutation(deleteCategory._id).unwrap();
      toast.success(`Category "${deleteCategory.name}" deleted successfully!`);
      setShowDeleteDialog(false);
      setDeleteCategory(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to delete category';
      toast.error(errorMessage);
    }
  };

  const openDeleteDialog = (category: Category) => {
    setDeleteCategory(category);
    setShowDeleteDialog(true);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading categories...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-red-500 mb-2">Failed to load categories</div>
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Content Categories
              </CardTitle>
              <CardDescription>
                Organize your library content with custom categories
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddModal(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Categories Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first category to start organizing your content
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Categories Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                  <div className="text-sm text-gray-600">Total Categories</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {categories.reduce((sum, cat) => sum + (cat.materialCount || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Materials</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {categories.filter(cat => cat.isActive && (cat.materialCount || 0) > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Categories</div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category._id} className="relative group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            {React.createElement(getIconComponent(category.icon), { size: 18 })}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base">{category.name}</CardTitle>
                              {!category.isActive && (
                                <EyeOff className="h-4 w-4 text-muted-foreground" title="Inactive" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="secondary"
                                className="text-xs"
                                style={{
                                  backgroundColor: `${category.color}20`,
                                  color: category.color,
                                  border: `1px solid ${category.color}40`
                                }}
                              >
                                {category.materialCount || 0} materials
                              </Badge>
                              {category.level > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  Level {category.level}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => openDeleteDialog(category)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Category
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {category.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Slug:</span>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {category.slug}
                          </code>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Order:</span>
                          <span className="font-medium">{category.order}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Palette className="h-3 w-3" />
                          {category.color}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {new Date(category.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category "{deleteCategory?.name}"?
              {deleteCategory && (deleteCategory.materialCount || 0) > 0 && (
                <span className="block mt-2 text-orange-600 font-medium">
                  Warning: This category contains {deleteCategory.materialCount} material(s).
                  This action cannot be undone.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              disabled={isDeletingMutation}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingMutation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Category'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};