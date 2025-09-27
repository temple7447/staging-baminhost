import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Search,
  Plus,
  MoreHorizontal,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Filter,
  FileText,
  Folder as FolderIcon,
  Upload,
  FolderPlus,
  ArrowLeft,
} from 'lucide-react';
import { FolderCard } from './FolderCard';
import { MaterialCard } from '../materials/MaterialCard';
import { CreateFolderModal } from './CreateFolderModal';
import { 
  useGetFolderContentsQuery, 
  useGetRootFoldersQuery,
  useMoveFolderMutation,
  useMoveMaterialToFolderMutation
} from '@/services/foldersApi';
import { useGetMaterialsQuery } from '@/services/materialsApi';
import { useToast } from '@/hooks/use-toast';
import type { Folder } from '@/types/folders';
import type { Material } from '@/types/materials';
import type { DragItem } from '@/utils/dragAndDrop';
import { parseFolderPath } from '@/utils/folderValidation';
import { cn } from '@/lib/utils';

interface FolderViewProps {
  currentFolderId?: string | null;
  onFolderClick?: (folder: Folder) => void;
  onMaterialClick?: (material: Material) => void;
  onFolderEdit?: (folder: Folder) => void;
  onFolderDelete?: (folder: Folder) => void;
  onMaterialEdit?: (material: Material) => void;
  onMaterialDelete?: (material: Material) => void;
  onBackToRoot?: () => void;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'size' | 'type';
type SortOrder = 'asc' | 'desc';

export const FolderView: React.FC<FolderViewProps> = ({
  currentFolderId = null,
  onFolderClick,
  onMaterialClick,
  onFolderEdit,
  onFolderDelete,
  onMaterialEdit,
  onMaterialDelete,
  onBackToRoot,
  className,
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: 'Library' }
  ]);
  
  // Mutations for drag and drop
  const [moveFolder] = useMoveFolderMutation();
  const [moveMaterialToFolder] = useMoveMaterialToFolderMutation();

  // Fetch folder contents or root folders
  const { 
    data: folderContentsResponse, 
    isLoading: isLoadingContents,
    error: contentsError 
  } = useGetFolderContentsQuery(
    currentFolderId ? { folderId: currentFolderId, includeMaterials: true, includeStats: true } : { folderId: '', includeMaterials: false, includeStats: false }, 
    { skip: !currentFolderId }
  );

  const { 
    data: rootFoldersResponse, 
    isLoading: isLoadingRoot,
    error: rootError 
  } = useGetRootFoldersQuery(
    {},
    { skip: !!currentFolderId }
  );

  // Get materials for root view
  const { 
    data: materialsResponse,
    isLoading: isLoadingMaterials 
  } = useGetMaterialsQuery(
    { folderId: currentFolderId },
    { skip: !!currentFolderId } // Only fetch for root view
  );

  const isLoading = isLoadingContents || isLoadingRoot || isLoadingMaterials;
  const error = contentsError || rootError;

  // Extract data based on current view
  const folders = currentFolderId 
    ? folderContentsResponse?.data?.subFolders || []
    : rootFoldersResponse?.data || [];
  
  const materials = currentFolderId 
    ? folderContentsResponse?.data?.materials || []
    : materialsResponse?.data || [];

  // Update breadcrumbs when folder contents change using fullPath
  useEffect(() => {
    if (currentFolderId && folderContentsResponse?.data?.folder) {
      const currentFolder = folderContentsResponse.data.folder;
      const pathItems = parseFolderPath(currentFolder.fullPath);
      
      // Create breadcrumbs from fullPath
      const newBreadcrumbs = [
        { id: null, name: 'Library' },
        ...pathItems.map((pathItem, index) => ({
          id: index === pathItems.length - 1 ? currentFolderId : null, // Only the last item gets the actual ID
          name: pathItem.name
        }))
      ];
      setBreadcrumbs(newBreadcrumbs);
    } else if (!currentFolderId) {
      setBreadcrumbs([{ id: null, name: 'Library' }]);
    }
  }, [currentFolderId, folderContentsResponse]);

  // Filter and sort logic
  const filteredAndSortedFolders = folders
    .filter(folder => 
      folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const filteredAndSortedMaterials = materials
    .filter(material => 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'type':
          comparison = a.materialType.localeCompare(b.materialType);
          break;
        default:
          comparison = a.title.localeCompare(b.title);
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const handleBreadcrumbClick = (folderId: string | null) => {
    if (folderId === null) {
      // Navigate back to root
      if (onBackToRoot) {
        onBackToRoot();
      } else if (onFolderClick) {
        onFolderClick(null as any);
      }
    } else if (onFolderClick) {
      // Navigate to specific folder
      const folder = { _id: folderId, id: folderId } as Folder;
      onFolderClick(folder);
    }
  };

  const handleSelectAll = () => {
    const allIds = [
      ...filteredAndSortedFolders.map(f => f._id || f.id),
      ...filteredAndSortedMaterials.map(m => m._id || m.id)
    ];
    
    if (selectedItems.size === allIds.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(allIds));
    }
  };

  const handleItemSelect = (itemId: string, selected: boolean) => {
    const newSelected = new Set(selectedItems);
    if (selected) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const totalItems = filteredAndSortedFolders.length + filteredAndSortedMaterials.length;

  // Handle drag and drop operations
  const handleDrop = async (dragItem: DragItem, targetFolderId: string | null) => {
    try {
      if (dragItem.type === 'folder') {
        await moveFolder({
          folderId: dragItem.id,
          parentFolder: targetFolderId
        }).unwrap();
        
        toast({
          title: 'Folder moved',
          description: `Folder moved successfully.`,
        });
      } else if (dragItem.type === 'material') {
        await moveMaterialToFolder({
          materialId: dragItem.id,
          folder: targetFolderId
        }).unwrap();
        
        toast({
          title: 'Material moved',
          description: `Material moved successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Move failed',
        description: error?.data?.message || 'Failed to move item. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.id || 'root'} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="cursor-pointer"
                      onClick={() => handleBreadcrumbClick(breadcrumb.id)}
                    >
                      {index === 0 ? (
                        <div className="flex items-center space-x-1">
                          <Home className="h-4 w-4" />
                          <span>{breadcrumb.name}</span>
                        </div>
                      ) : (
                        breadcrumb.name
                      )}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back button for mobile */}
        {currentFolderId && (
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => handleBreadcrumbClick(breadcrumbs[breadcrumbs.length - 2]?.id || null)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
      </div>

      {/* Header with controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FolderIcon className="h-5 w-5" />
              <div className="flex flex-col">
                <span>
                  {currentFolderId 
                    ? folderContentsResponse?.data?.folder?.name || 'Folder'
                    : 'Knowledge Library'
                  }
                </span>
                {/* Show full path */}
                {currentFolderId && folderContentsResponse?.data?.folder?.fullPath && (
                  <span className="text-xs text-muted-foreground font-normal">
                    📁 {folderContentsResponse.data.folder.fullPath}
                  </span>
                )}
              </div>
              <Badge variant="secondary" className="ml-2">
                {totalItems} items
              </Badge>
              {/* Show level information */}
              {currentFolderId && folderContentsResponse?.data?.folder && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-2",
                    folderContentsResponse.data.folder.level === 0 && "bg-blue-50 text-blue-700 border-blue-200",
                    folderContentsResponse.data.folder.level === 1 && "bg-green-50 text-green-700 border-green-200",
                    folderContentsResponse.data.folder.level === 2 && "bg-orange-50 text-orange-700 border-orange-200"
                  )}
                >
                  Level {folderContentsResponse.data.folder.level}
                </Badge>
              )}
            </CardTitle>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateFolder(true)}
              >
                <FolderPlus className="h-4 w-4 mr-1" />
                New Folder
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search folders and files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* View mode toggle */}
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort controls */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortOrder === 'asc' ? (
                      <SortAsc className="h-4 w-4 mr-1" />
                    ) : (
                      <SortDesc className="h-4 w-4 mr-1" />
                    )}
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {['name', 'date', 'size', 'type'].map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => {
                        if (sortBy === option) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy(option as SortBy);
                          setSortOrder('asc');
                        }
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                      {sortBy === option && (
                        sortOrder === 'asc' ? (
                          <SortAsc className="ml-2 h-4 w-4" />
                        ) : (
                          <SortDesc className="ml-2 h-4 w-4" />
                        )
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Bulk actions */}
              {selectedItems.size > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4 mr-1" />
                      {selectedItems.size} selected
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Move to folder</DropdownMenuItem>
                    <DropdownMenuItem>Copy</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Select all checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedItems.size === totalItems && totalItems > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-muted-foreground">All</span>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load folder contents</p>
            </div>
          )}

          {/* Content grid/list */}
          {!isLoading && !error && (
            <div className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'space-y-2'
            )}>
              {/* Folders first */}
              {filteredAndSortedFolders.map((folder) => (
                <FolderCard
                  key={folder._id || folder.id}
                  folder={folder}
                  onClick={onFolderClick}
                  onEdit={onFolderEdit}
                  onDelete={onFolderDelete}
                  onDrop={handleDrop}
                  selectable
                  isSelected={selectedItems.has(folder._id || folder.id)}
                  onSelect={(_, selected) => handleItemSelect(folder._id || folder.id, selected)}
                  className={viewMode === 'list' ? 'w-full' : ''}
                />
              ))}

              {/* Materials second */}
              {filteredAndSortedMaterials.map((material) => (
                <MaterialCard
                  key={material._id || material.id}
                  material={material}
                  onClick={onMaterialClick}
                  onEdit={onMaterialEdit}
                  onDelete={onMaterialDelete}
                  selectable
                  isSelected={selectedItems.has(material._id || material.id)}
                  onSelect={(_, selected) => handleItemSelect(material._id || material.id, selected)}
                  className={viewMode === 'list' ? 'w-full' : ''}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && totalItems === 0 && (
            <div className="text-center py-12">
              <FolderIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No items found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'No folders or files match your search.'
                  : 'This folder is empty. Create a new folder or upload files to get started.'
                }
              </p>
              {!searchTerm && (
                <div className="mt-4 space-x-2">
                  <Button onClick={() => setShowCreateFolder(true)}>
                    <FolderPlus className="h-4 w-4 mr-1" />
                    Create Folder
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload Files
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create folder modal */}
      <CreateFolderModal
        open={showCreateFolder}
        onOpenChange={setShowCreateFolder}
        parentId={currentFolderId}
      />
    </div>
  );
};