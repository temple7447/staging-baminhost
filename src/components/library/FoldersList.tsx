import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Folder,
  FolderOpen,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  Hash,
  FolderPlus,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  useGetFoldersQuery,
  useGetRootFoldersQuery,
  useDeleteFolderMutation 
} from '@/services/foldersApi';
import { cn } from '@/lib/utils';
import type { Folder as FolderType } from '@/types/folders';

interface FoldersListProps {
  onFolderSelect?: (folder: FolderType) => void;
  onFolderEdit?: (folder: FolderType) => void;
  onFolderDelete?: (folder: FolderType) => void;
  onCreateFolder?: () => void;
  showActions?: boolean;
  limit?: number;
  parentId?: string | null;
  className?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const FOLDER_LEVEL_COLORS = {
  0: 'bg-blue-100 text-blue-800',    // Parent folders
  1: 'bg-green-100 text-green-800',  // Child folders  
  2: 'bg-orange-100 text-orange-800', // Grandchild folders
};

const FOLDER_TYPE_NAMES = {
  'parent': 'Parent',
  'child': 'Child', 
  'grandchild': 'Grandchild'
};

export const FoldersList: React.FC<FoldersListProps> = ({
  onFolderSelect,
  onFolderEdit,
  onFolderDelete,
  onCreateFolder,
  showActions = true,
  limit,
  parentId = null,
  className = ''
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(limit || 20);
  
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  // Fetch root folders and all folders separately to avoid conditional hooks
  const { 
    data: rootFoldersResponse, 
    isLoading: isLoadingRoot, 
    isFetching: isFetchingRoot, 
    error: errorRoot, 
    refetch: refetchRoot 
  } = useGetRootFoldersQuery({}, { skip: parentId !== null });

  const { 
    data: allFoldersResponse, 
    isLoading: isLoadingAll, 
    isFetching: isFetchingAll, 
    error: errorAll, 
    refetch: refetchAll 
  } = useGetFoldersQuery({}, { skip: parentId === null });

  // Select the appropriate response based on parentId
  const foldersResponse = parentId === null ? rootFoldersResponse : allFoldersResponse;
  const isLoading = parentId === null ? isLoadingRoot : isLoadingAll;
  const isFetching = parentId === null ? isFetchingRoot : isFetchingAll;
  const error = parentId === null ? errorRoot : errorAll;
  const refetch = parentId === null ? refetchRoot : refetchAll;

  const folders = foldersResponse?.data || [];

  // Filter folders based on search and filters
  const filteredFolders = folders
    .filter(folder => {
      const matchesSearch = folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           folder.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           folder.fullPath?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = filterLevel === '' || folder.level?.toString() === filterLevel;
      const matchesType = filterType === '' || folder.folderType === filterType;
      
      return matchesSearch && matchesLevel && matchesType;
    })
    .sort((a, b) => {
      // Sort by level first, then by name
      if (a.level !== b.level) {
        return (a.level || 0) - (b.level || 0);
      }
      return a.name.localeCompare(b.name);
    });

  // Pagination
  const totalItems = filteredFolders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFolders = filteredFolders.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (folder: FolderType) => {
    if (!confirm(`Are you sure you want to delete "${folder.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const folderId = folder._id || folder.id;
      await deleteFolder(folderId).unwrap();
      
      toast({
        title: "Folder deleted",
        description: `"${folder.name}" has been deleted successfully.`,
      });
      
      if (onFolderDelete) {
        onFolderDelete(folder);
      }
      
      refetch();
    } catch (error) {
      const errorMessage = error && typeof error === 'object' && 'data' in error && 
        error.data && typeof error.data === 'object' && 'message' in error.data
        ? (error.data as { message: string }).message
        : "Failed to delete folder. Please try again.";
      
      toast({
        title: "Delete failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterLevel('');
    setFilterType('');
    setCurrentPage(1);
  };

  const getFolderIcon = (level: number) => {
    return level === 0 ? <Folder className="h-4 w-4" /> : <FolderOpen className="h-4 w-4" />;
  };

  const getLevelColor = (level: number) => {
    return FOLDER_LEVEL_COLORS[level as keyof typeof FOLDER_LEVEL_COLORS] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-red-500 mb-4">Failed to load folders</div>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Folders
              </CardTitle>
              <CardDescription>
                Organize your library content into folders
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onCreateFolder && (
                <Button onClick={onCreateFolder} size="sm">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                disabled={isLoading}
              >
                Clear Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                {isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Refresh'
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search folders by name, description, or path..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={filterLevel}
              onValueChange={setFilterLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="0">Level 0 (Parent)</SelectItem>
                <SelectItem value="1">Level 1 (Child)</SelectItem>
                <SelectItem value="2">Level 2 (Grandchild)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="parent">Parent Folders</SelectItem>
                <SelectItem value="child">Child Folders</SelectItem>
                <SelectItem value="grandchild">Grandchild Folders</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {isLoading ? (
                'Loading...'
              ) : (
                `Showing ${Math.min(startIndex + 1, totalItems)}-${Math.min(startIndex + itemsPerPage, totalItems)} of ${totalItems} folders`
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Folders Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            // Loading skeletons
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : paginatedFolders.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No folders found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || filterLevel || filterType
                  ? 'Try adjusting your search criteria or filters'
                  : 'No folders have been created yet'
                }
              </p>
              {onCreateFolder && !searchTerm && !filterLevel && !filterType && (
                <Button onClick={onCreateFolder}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Your First Folder
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium">Folder</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Level</th>
                    <th className="text-left p-4 font-medium">Path</th>
                    <th className="text-left p-4 font-medium">Items</th>
                    <th className="text-left p-4 font-medium">Updated</th>
                    {showActions && <th className="text-right p-4 font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedFolders.map((folder) => (
                    <tr 
                      key={folder._id || folder.id} 
                      className="border-b hover:bg-muted/25 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg", 
                            getLevelColor(folder.level || 0)
                          )}>
                            {getFolderIcon(folder.level || 0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div 
                              className="font-medium cursor-pointer hover:text-blue-600 truncate"
                              onClick={() => onFolderSelect?.(folder)}
                            >
                              {folder.name}
                            </div>
                            {folder.description && (
                              <div className="text-sm text-muted-foreground truncate">
                                {folder.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {FOLDER_TYPE_NAMES[folder.folderType as keyof typeof FOLDER_TYPE_NAMES] || folder.folderType}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getLevelColor(folder.level || 0))}
                        >
                          Level {folder.level || 0}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground font-mono max-w-xs truncate">
                          {folder.fullPath || '/'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          {folder.subFolderCount || 0} folders
                          {folder.materialCount && (
                            <span className="ml-2">
                              • {folder.materialCount} materials
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(folder.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      {showActions && (
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onFolderSelect?.(folder)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Open
                              </DropdownMenuItem>
                              {onFolderEdit && (
                                <DropdownMenuItem
                                  onClick={() => onFolderEdit(folder)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(folder)}
                                className="text-red-600 focus:text-red-600"
                                disabled={isDeleting}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages || isFetching}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};