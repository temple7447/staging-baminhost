import React, { useState, useMemo } from 'react';
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
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Loader2,
  Calendar,
  Hash,
  FolderPlus,
  MoreHorizontal,
  Users,
  FileText,
  HardDrive,
  Globe,
  Lock,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetFolderTreeQuery, useDeleteFolderMutation } from '@/services/foldersApi';
import { cn } from '@/lib/utils';

// Extended folder type to include subfolders and metadata
interface TreeFolder {
  _id: string;
  id: string;
  name: string;
  parentFolder: string | null;
  level: number;
  fullPath: string;
  icon: string;
  color: string;
  isActive: boolean;
  order: number;
  materialCount: number;
  subfolderCount: number;
  totalSize: number;
  visibility: 'public' | 'private';
  allowedRoles: string[];
  isProtected: boolean;
  allowMaterials: boolean;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
  breadcrumbs: Array<{
    name: string;
    level: number;
  }>;
  folderType: 'parent' | 'child';
  canHaveSubfolders: boolean;
  canHaveMaterials: boolean;
  subfolders: TreeFolder[];
  depth: number;
}

interface FlattenedFolder extends TreeFolder {
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  path: string[];
}

interface FoldersTableViewProps {
  onFolderSelect?: (folder: TreeFolder) => void;
  onFolderEdit?: (folder: TreeFolder) => void;
  onFolderDelete?: (folder: TreeFolder) => void;
  onCreateFolder?: () => void;
  showActions?: boolean;
  className?: string;
}

const FOLDER_LEVEL_COLORS = {
  0: 'bg-blue-100 text-blue-800',    // Parent folders
  1: 'bg-green-100 text-green-800',  // Child folders  
  2: 'bg-orange-100 text-orange-800', // Grandchild folders
};

const FOLDER_TYPE_NAMES = {
  'parent': 'Parent',
  'child': 'Child', 
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FoldersTableView: React.FC<FoldersTableViewProps> = ({
  onFolderSelect,
  onFolderEdit,
  onFolderDelete,
  onCreateFolder,
  showActions = true,
  className = ''
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  const { 
    data: treeResponse, 
    isLoading, 
    isFetching, 
    error, 
    refetch 
  } = useGetFolderTreeQuery();

  // Flatten the tree structure for table display
  const flattenedFolders = useMemo(() => {
    if (!treeResponse?.data) return [];

    const folders: TreeFolder[] = treeResponse.data;
    const flattened: FlattenedFolder[] = [];

    const flattenFolder = (folder: TreeFolder, depth: number = 0, path: string[] = []) => {
      const currentPath = [...path, folder.name];
      const hasChildren = folder.subfolders && folder.subfolders.length > 0;
      const isExpanded = expandedFolders.has(folder._id);

      flattened.push({
        ...folder,
        depth,
        hasChildren,
        isExpanded,
        path: currentPath
      });

      // Add children if expanded
      if (hasChildren && isExpanded) {
        folder.subfolders.forEach(subfolder => {
          flattenFolder(subfolder, depth + 1, currentPath);
        });
      }
    };

    folders.forEach(folder => flattenFolder(folder));
    return flattened;
  }, [treeResponse?.data, expandedFolders]);

  // Filter folders based on search and filters
  const filteredFolders = useMemo(() => {
    return flattenedFolders.filter(folder => {
      const matchesSearch = !searchTerm || 
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder.fullPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = !filterLevel || folder.level.toString() === filterLevel;
      const matchesType = !filterType || folder.folderType === filterType;
      
      return matchesSearch && matchesLevel && matchesType;
    });
  }, [flattenedFolders, searchTerm, filterLevel, filterType]);

  const toggleExpand = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const expandAll = () => {
    const allFolderIds = new Set<string>();
    const collectIds = (folders: TreeFolder[]) => {
      folders.forEach(folder => {
        if (folder.subfolders && folder.subfolders.length > 0) {
          allFolderIds.add(folder._id);
          collectIds(folder.subfolders);
        }
      });
    };
    if (treeResponse?.data) {
      collectIds(treeResponse.data);
    }
    setExpandedFolders(allFolderIds);
  };

  const collapseAll = () => {
    setExpandedFolders(new Set());
  };

  const handleDelete = async (folder: TreeFolder) => {
    if (!confirm(`Are you sure you want to delete "${folder.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteFolder(folder._id).unwrap();
      
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
  };

  const getLevelColor = (level: number) => {
    return FOLDER_LEVEL_COLORS[level as keyof typeof FOLDER_LEVEL_COLORS] || 'bg-gray-100 text-gray-800';
  };

  const getIconForFolder = (folder: TreeFolder) => {
    if (folder.level === 0) {
      return <Folder className="h-4 w-4" />;
    }
    return <FolderOpen className="h-4 w-4" />;
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-red-500 mb-4">Failed to load folder tree</div>
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
                Folder Hierarchy
              </CardTitle>
              <CardDescription>
                Complete folder structure with nested subfolders
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onCreateFolder && (
                <Button onClick={onCreateFolder} size="sm">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              )}
              <Button onClick={expandAll} variant="outline" size="sm">
                Expand All
              </Button>
              <Button onClick={collapseAll} variant="outline" size="sm">
                Collapse All
              </Button>
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
              placeholder="Search folders by name, path, or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filterLevel} onValueChange={setFilterLevel}>
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

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="parent">Parent Folders</SelectItem>
                <SelectItem value="child">Child Folders</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              {filteredFolders.length} folders shown
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
              {Array.from({ length: 10 }).map((_, index) => (
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
          ) : filteredFolders.length === 0 ? (
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
                    <th className="text-left p-4 font-medium">Folder Name</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Level</th>
                    <th className="text-left p-4 font-medium">Contents</th>
                    <th className="text-left p-4 font-medium">Size</th>
                    <th className="text-left p-4 font-medium">Permissions</th>
                    <th className="text-left p-4 font-medium">Creator</th>
                    <th className="text-left p-4 font-medium">Updated</th>
                    {showActions && <th className="text-right p-4 font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredFolders.map((folder) => (
                    <tr 
                      key={folder._id} 
                      className="border-b hover:bg-muted/25 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2" style={{ paddingLeft: `${folder.depth * 20}px` }}>
                          {folder.hasChildren && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleExpand(folder._id)}
                            >
                              {folder.isExpanded ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                          
                          <div 
                            className={cn(
                              "p-2 rounded-lg", 
                              getLevelColor(folder.level)
                            )}
                            style={{ backgroundColor: folder.color, opacity: 0.8 }}
                          >
                            {getIconForFolder(folder)}
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div 
                              className="font-medium cursor-pointer hover:text-blue-600 truncate flex items-center gap-2"
                              onClick={() => onFolderSelect?.(folder)}
                            >
                              {folder.name}
                              {folder.isProtected && <Lock className="h-3 w-3 text-amber-500" />}
                              {!folder.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {folder.fullPath}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {FOLDER_TYPE_NAMES[folder.folderType] || folder.folderType}
                        </Badge>
                      </td>
                      
                      <td className="p-4">
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getLevelColor(folder.level))}
                        >
                          Level {folder.level}
                        </Badge>
                      </td>
                      
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1">
                            <Folder className="h-3 w-3" />
                            <span>{folder.subfolderCount} folders</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{folder.materialCount} materials</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm">
                          <HardDrive className="h-3 w-3" />
                          {formatFileSize(folder.totalSize)}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {folder.visibility === 'public' ? (
                            <Globe className="h-3 w-3 text-green-600" />
                          ) : (
                            <Lock className="h-3 w-3 text-red-600" />
                          )}
                          <span className="text-xs">{folder.visibility}</span>
                          {folder.isProtected && (
                            <Shield className="h-3 w-3 text-amber-500" />
                          )}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          {folder.createdBy.name}
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
    </div>
  );
};