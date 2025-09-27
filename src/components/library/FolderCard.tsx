import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  Folder as FolderIcon,
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  Move,
  Share,
  Lock,
  Unlock,
  FileText,
  Calendar,
  Users,
  Briefcase,
  Book,
  Settings,
  Heart,
  Star,
  Home,
  Building,
  GraduationCap,
  Target,
  Shield,
  Camera,
  Music,
  Video,
  Image,
  Code,
  Database,
  Globe,
  Megaphone,
  Monitor,
  Mail,
  TrendingUp,
  PieChart,
  Layout,
  Smartphone,
  Headphones,
  Clock,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Folder } from '@/types/folders';
import { cn } from '@/lib/utils';
import {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  type DragItem
} from '@/utils/dragAndDrop';
import {
  getLevelName,
  getLevelDescription,
  canPerformAction,
} from '@/utils/folderValidation';

interface FolderCardProps {
  folder: Folder;
  onClick?: (folder: Folder) => void;
  onEdit?: (folder: Folder) => void;
  onDelete?: (folder: Folder) => void;
  onDuplicate?: (folder: Folder) => void;
  onMove?: (folder: Folder) => void;
  onShare?: (folder: Folder) => void;
  onDrop?: (dragItem: DragItem, targetFolderId: string | null) => void;
  className?: string;
  isDragging?: boolean;
  isDragOver?: boolean;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (folder: Folder, selected: boolean) => void;
  allowDragAndDrop?: boolean;
}

export const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  onClick,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
  onShare,
  onDrop,
  className,
  isDragging = false,
  isDragOver = false,
  isSelected = false,
  selectable = false,
  onSelect,
  allowDragAndDrop = true,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(folder);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(folder, !isSelected);
    }
  };

  const formatFileSize = (bytes: number = 0) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getIconComponent = () => {
    // Map of icon names to their corresponding components
    const iconMap: Record<string, React.ElementType> = {
      folder: FolderIcon,
      briefcase: Briefcase,
      book: Book,
      users: Users,
      settings: Settings,
      heart: Heart,
      star: Star,
      home: Home,
      building: Building,
      graduationCap: GraduationCap,
      target: Target,
      shield: Shield,
      camera: Camera,
      music: Music,
      video: Video,
      fileText: FileText,
      image: Image,
      code: Code,
      database: Database,
      globe: Globe,
      megaphone: Megaphone,
      monitor: Monitor,
      mail: Mail,
      trendingUp: TrendingUp,
      'pie-chart': PieChart,
      layout: Layout,
      smartphone: Smartphone,
      headphones: Headphones,
      calendar: Calendar,
      clock: Clock,
    };

    const IconComponent = iconMap[folder.icon] || FolderIcon;
    return IconComponent;
  };

  const IconComponent = getIconComponent();

  const hasPermissions = folder.permissions && folder.permissions.length > 0;
  const isPrivate = hasPermissions && folder.permissions.some(p => p.permission !== 'read');

  // Drag and drop handlers
  const handleFolderDragStart = (e: React.DragEvent) => {
    if (!allowDragAndDrop) return;
    
    const dragItem: DragItem = {
      type: 'folder',
      id: folder._id || folder.id,
      data: folder,
    };
    handleDragStart(e, dragItem);
  };

  const handleFolderDrop = (e: React.DragEvent) => {
    if (!allowDragAndDrop || !onDrop) return;
    
    handleDrop(e, folder._id || folder.id, onDrop);
  };

  return (
    <>
      <Card
        className={cn(
          'group relative transition-all duration-200 hover:shadow-lg cursor-pointer',
          isDragging && 'opacity-50 transform scale-95',
          isDragOver && 'ring-2 ring-blue-500 bg-blue-50',
          isSelected && 'ring-2 ring-primary bg-primary/5',
          allowDragAndDrop && 'cursor-grab active:cursor-grabbing',
          className
        )}
        onClick={handleCardClick}
        draggable={allowDragAndDrop}
        onDragStart={handleFolderDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={allowDragAndDrop ? handleDragOver : undefined}
        onDragEnter={allowDragAndDrop ? handleDragEnter : undefined}
        onDragLeave={allowDragAndDrop ? handleDragLeave : undefined}
        onDrop={handleFolderDrop}
      >
        <CardContent className="p-4">
          {/* Selection checkbox */}
          {selectable && (
            <div className="absolute top-3 left-3 z-10">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          )}

          {/* More actions dropdown */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(folder)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                )}
                {onMove && (
                  <DropdownMenuItem onClick={() => onMove(folder)}>
                    <Move className="mr-2 h-4 w-4" />
                    Move
                  </DropdownMenuItem>
                )}
                {onDuplicate && (
                  <DropdownMenuItem onClick={() => onDuplicate(folder)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                )}
                {onShare && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onShare(folder)}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  </>
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

          {/* Folder icon and content */}
          <div className="flex flex-col items-center space-y-3">
            {/* Folder icon */}
            <div className="relative">
              <IconComponent
                className="h-16 w-16 transition-colors"
                style={{ color: folder.color }}
                fill="currentColor"
                fillOpacity="0.1"
              />
              {isPrivate && (
                <div className="absolute -top-1 -right-1">
                  <Lock className="h-4 w-4 text-yellow-600 bg-white rounded-full p-0.5 shadow-sm" />
                </div>
              )}
            </div>

            {/* Folder name */}
            <div className="text-center w-full">
              <h3 className="font-medium text-sm text-gray-900 truncate">
                {folder.name}
              </h3>
              {folder.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {folder.description}
                </p>
              )}
            </div>

            {/* Folder level and capabilities */}
            <div className="text-center w-full mb-2">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  folder.level === 0 && "bg-blue-50 text-blue-700 border-blue-200",
                  folder.level === 1 && "bg-green-50 text-green-700 border-green-200",
                  folder.level === 2 && "bg-orange-50 text-orange-700 border-orange-200"
                )}
              >
                Level {folder.level} - {getLevelName(folder.level)}
              </Badge>
            </div>

            {/* Capabilities indicators */}
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 w-full mb-2">
              {folder.canHaveSubfolders && (
                <div className="flex items-center space-x-1">
                  <FolderIcon className="h-3 w-3 text-blue-500" />
                  <span>Can have folders</span>
                </div>
              )}
              {folder.canHaveMaterials && (
                <div className="flex items-center space-x-1">
                  <FileText className="h-3 w-3 text-green-500" />
                  <span>Can have materials</span>
                </div>
              )}
            </div>

            {/* Folder stats */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 w-full">
              {folder.canHaveSubfolders && (
                <div className="flex items-center space-x-1">
                  <FolderIcon className="h-3 w-3" />
                  <span>{folder.subFoldersCount || 0} folders</span>
                </div>
              )}
              {folder.canHaveMaterials && (
                <div className="flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <span>{folder.materialsCount || 0} materials</span>
                </div>
              )}
              {folder.size !== undefined && folder.size > 0 && (
                <div className="text-xs">
                  {formatFileSize(folder.size)}
                </div>
              )}
            </div>

            {/* Full path */}
            {folder.fullPath && (
              <div className="text-center w-full mb-2">
                <p className="text-xs text-gray-500 truncate" title={folder.fullPath}>
                  📁 {folder.fullPath}
                </p>
              </div>
            )}

            {/* Last updated */}
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(folder.updatedAt), { addSuffix: true })}
              </span>
            </div>

            {/* Permissions badge */}
            {hasPermissions && (
              <div className="flex items-center space-x-1">
                {isPrivate ? (
                  <Badge variant="secondary" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    <Unlock className="h-3 w-3 mr-1" />
                    Shared
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Folder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{folder.name}"? This action cannot be undone.
              All subfolders and materials inside will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onDelete) onDelete(folder);
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