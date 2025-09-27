import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  Video,
  Headphones,
  Image,
  File,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Material } from '@/types/materials';
import { cn } from '@/lib/utils';
import {
  handleDragStart,
  handleDragEnd,
  type DragItem
} from '@/utils/dragAndDrop';

interface MaterialCardProps {
  material: Material;
  onClick?: (material: Material) => void;
  onEdit?: (material: Material) => void;
  onDelete?: (material: Material) => void;
  onDownload?: (material: Material) => void;
  className?: string;
  isDragging?: boolean;
  isDragOver?: boolean;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (material: Material, selected: boolean) => void;
  showOwnership?: boolean;
  allowDragAndDrop?: boolean;
}

const MATERIAL_TYPE_ICONS: Record<string, React.ElementType> = {
  text: FileText,
  video: Video,
  audio: Headphones,
  image: Image,
  document: File,
  pdf: FileText,
  presentation: FileText,
  spreadsheet: FileText,
};

const MATERIAL_TYPE_COLORS: Record<string, string> = {
  text: 'bg-blue-100 text-blue-800',
  video: 'bg-purple-100 text-purple-800',
  audio: 'bg-green-100 text-green-800',
  image: 'bg-pink-100 text-pink-800',
  document: 'bg-gray-100 text-gray-800',
  pdf: 'bg-red-100 text-red-800',
  presentation: 'bg-orange-100 text-orange-800',
  spreadsheet: 'bg-teal-100 text-teal-800',
};

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onClick,
  onEdit,
  onDelete,
  onDownload,
  className,
  isDragging = false,
  isDragOver = false,
  isSelected = false,
  selectable = false,
  onSelect,
  showOwnership = false,
  allowDragAndDrop = true,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(material);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(material, !isSelected);
    }
  };

  const getMaterialIcon = (materialType: string) => {
    const Icon = MATERIAL_TYPE_ICONS[materialType] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getMaterialTypeColor = (materialType: string) => {
    return MATERIAL_TYPE_COLORS[materialType] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number = 0) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Drag and drop handlers
  const handleMaterialDragStart = (e: React.DragEvent) => {
    if (!allowDragAndDrop) return;
    
    const dragItem: DragItem = {
      type: 'material',
      id: material._id || material.id,
      data: material,
    };
    handleDragStart(e, dragItem);
  };

  return (
    <>
      <Card
        className={cn(
          'group hover:shadow-lg transition-all duration-200 cursor-pointer',
          isDragging && 'opacity-50 transform scale-95',
          isDragOver && 'ring-2 ring-blue-500 bg-blue-50',
          isSelected && 'ring-2 ring-primary bg-primary/5',
          allowDragAndDrop && 'cursor-grab active:cursor-grabbing',
          className
        )}
        onClick={handleCardClick}
        draggable={allowDragAndDrop}
        onDragStart={handleMaterialDragStart}
        onDragEnd={handleDragEnd}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Selection checkbox */}
              {selectable && (
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelect}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              )}

              {/* Material type icon */}
              <div className={`p-2 rounded-lg ${getMaterialTypeColor(material.materialType)}`}>
                {getMaterialIcon(material.materialType)}
              </div>

              {/* Title and metadata */}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base truncate">
                  {material.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {material.materialType}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    {material.viewCount || 0}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    {material.downloadCount || 0}
                  </div>
                  {showOwnership && (
                    <Badge variant="secondary" className="text-xs">
                      Mine
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {material.fileUrl && onDownload && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(material);
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(material)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {material.fileUrl && onDownload && (
                    <DropdownMenuItem onClick={() => onDownload(material)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Description */}
          {material.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {material.description}
            </p>
          )}

          {/* Tags */}
          {material.tags && material.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {material.tags.slice(0, 2).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {material.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{material.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Footer metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center space-x-2">
              <span>{material.relatedPortfolio || 'General'}</span>
              {material.category && (
                <>
                  <span>•</span>
                  <span>{material.category}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(material.createdAt || material.updatedAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* File size info if available */}
          {material.fileSize && (
            <div className="text-xs text-muted-foreground mt-1">
              Size: {formatFileSize(material.fileSize)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{material.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onDelete) onDelete(material);
                setShowDeleteDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};