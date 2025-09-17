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
  FileText,
  Video,
  Headphones,
  Image,
  Type,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { MaterialType, MaterialsQueryParams } from '@/types/materials';
import { useGetMaterialsQuery } from '@/services/materialsApi';
import { useGetCategoriesQuery } from '@/services/categoriesApi';

interface MaterialsListProps {
  onMaterialSelect?: (materialId: string) => void;
  onMaterialEdit?: (materialId: string) => void;
  onMaterialDelete?: (materialId: string) => void;
  onMaterialDownload?: (materialId: string) => void;
  showActions?: boolean;
  limit?: number;
  category?: string;
  className?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const MATERIAL_TYPE_ICONS = {
  [MaterialType.DOCUMENT]: FileText,
  [MaterialType.VIDEO]: Video,
  [MaterialType.AUDIO]: Headphones,
  [MaterialType.IMAGE]: Image,
  [MaterialType.TEXT]: Type,
};

const MATERIAL_TYPE_COLORS = {
  [MaterialType.DOCUMENT]: 'bg-blue-100 text-blue-800',
  [MaterialType.VIDEO]: 'bg-red-100 text-red-800',
  [MaterialType.AUDIO]: 'bg-green-100 text-green-800',
  [MaterialType.IMAGE]: 'bg-purple-100 text-purple-800',
  [MaterialType.TEXT]: 'bg-gray-100 text-gray-800',
};

export const MaterialsList: React.FC<MaterialsListProps> = ({
  onMaterialSelect,
  onMaterialEdit,
  onMaterialDelete,
  onMaterialDownload,
  showActions = true,
  limit,
  category,
  className = ''
}) => {
  const { toast } = useToast();
  const [queryParams, setQueryParams] = useState<MaterialsQueryParams>({
    page: 1,
    limit: limit || 20,
    category,
    search: '',
    materialType: undefined,
    relatedPortfolio: '',
    relatedManagerRole: '',
    targetAudience: '',
  });

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Update query params when debounced search changes
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      search: debouncedSearch,
      page: 1, // Reset to first page when searching
    }));
  }, [debouncedSearch]);

  const {
    data: materialsResponse,
    isLoading,
    isFetching,
    error,
    refetch
  } = useGetMaterialsQuery(queryParams);

  const { data: categoriesResponse } = useGetCategoriesQuery();

  const materials = materialsResponse?.data || [];
  const totalCount = materialsResponse?.count || 0;
  const pagination = materialsResponse?.pagination;
  const categories = categoriesResponse?.data || [];

  const handleFilterChange = (key: keyof MaterialsQueryParams, value: string) => {
    setQueryParams(prev => ({
      ...prev,
      [key]: value || undefined,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (newLimit: number) => {
    setQueryParams(prev => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }));
  };

  const clearAllFilters = () => {
    setQueryParams({
      page: 1,
      limit: queryParams.limit,
    });
    setSearchInput('');
    setDebouncedSearch('');
  };

  const getMaterialIcon = (materialType: MaterialType) => {
    const Icon = MATERIAL_TYPE_ICONS[materialType];
    return Icon ? <Icon className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const getMaterialTypeColor = (materialType: MaterialType) => {
    return MATERIAL_TYPE_COLORS[materialType] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-red-500 mb-4">Failed to load materials</div>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Materials Library
              </CardTitle>
              <CardDescription>
                Browse and manage your materials collection
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
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
              placeholder="Search materials by title, description, or tags..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select
              value={queryParams.materialType || ''}
              onValueChange={(value) => handleFilterChange('materialType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Material Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {Object.values(MaterialType).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {getMaterialIcon(type)}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={queryParams.category || ''}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={queryParams.relatedPortfolio || ''}
              onValueChange={(value) => handleFilterChange('relatedPortfolio', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Portfolio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Portfolios</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={queryParams.relatedManagerRole || ''}
              onValueChange={(value) => handleFilterChange('relatedManagerRole', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Manager Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={queryParams.targetAudience || ''}
              onValueChange={(value) => handleFilterChange('targetAudience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Target Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Audiences</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {isLoading ? (
                'Loading...'
              ) : (
                `Showing ${materials.length} of ${totalCount} materials`
              )}
            </div>
            <div className="flex items-center gap-2">
              <span>Items per page:</span>
              <Select
                value={queryParams.limit?.toString() || '20'}
                onValueChange={(value) => handleLimitChange(parseInt(value))}
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
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : materials.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No materials found</h3>
                <p className="text-muted-foreground text-center">
                  {debouncedSearch || Object.values(queryParams).some(v => v && v !== '')
                    ? 'Try adjusting your search criteria or filters'
                    : 'No materials have been added yet'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          materials.map((material) => (
            <Card key={material._id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2 rounded-lg ${getMaterialTypeColor(material.materialType)}`}>
                      {getMaterialIcon(material.materialType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle 
                        className="text-base truncate cursor-pointer hover:text-blue-600"
                        onClick={() => onMaterialSelect?.(material._id)}
                      >
                        {material.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {material.materialType}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {material.viewCount}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Download className="h-3 w-3" />
                          {material.downloadCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  {showActions && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onMaterialDownload && material.file && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMaterialDownload(material._id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {onMaterialEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMaterialEdit(material._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onMaterialDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMaterialDelete(material._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {material.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {material.description}
                  </p>
                )}

                {/* Tags */}
                {material.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {material.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {material.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{material.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* File Info */}
                {material.file && (
                  <div className="text-xs text-muted-foreground">
                    <div>{material.file.originalName}</div>
                    <div>{formatFileSize(material.file.size)}</div>
                  </div>
                )}

                {/* Video URL */}
                {material.videoUrl && (
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      Video Content
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {material.relatedPortfolio}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(material.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages || isFetching}
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