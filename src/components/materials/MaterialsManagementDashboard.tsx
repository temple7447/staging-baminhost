import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Eye,
  Filter,
  BarChart3,
  FileText,
  Video,
  Headphones,
  Image,
  Type,
  Loader2,
  RefreshCw,
  Users,
  FolderOpen,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react';
import { MaterialsQueryParams } from '@/types/materials';
import {
  // All the hooks we need to demonstrate
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
  useGetMaterialsByCategoryQuery,
  useSearchMaterialsQuery,
  useGetMyMaterialsQuery,
  useUpdateMaterialViewMutation,
  useDownloadMaterialMutation,
} from '@/services/materialsApi';
import { useGetCategoriesQuery } from '@/services/categoriesApi';

// Import sub-components
import { AddMaterialModal } from '../library/AddMaterialModal';
import { MaterialDetail } from './MaterialDetail';
import { YouTubePlayer } from './YouTubePlayer';

interface MaterialsManagementDashboardProps {
  className?: string;
}

const MATERIAL_TYPE_ICONS = {
  document: FileText,
  video: Video,
  audio: Headphones,
  image: Image,
  text: Type,
};

const MATERIAL_TYPE_COLORS = {
  document: 'bg-blue-100 text-blue-800',
  video: 'bg-red-100 text-red-800',
  audio: 'bg-green-100 text-green-800',
  image: 'bg-purple-100 text-purple-800',
  text: 'bg-gray-100 text-gray-800',
};

export const MaterialsManagementDashboard: React.FC<MaterialsManagementDashboardProps> = ({
  className = ''
}) => {
  const { toast } = useToast();
  
  // UI State
  const [activeTab, setActiveTab] = useState('all-materials');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Query Parameters
  const [queryParams, setQueryParams] = useState<MaterialsQueryParams>({
    page: 1,
    limit: 12,
    search: '',
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update query params when filters change
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      search: debouncedSearch,
      category: selectedCategory || undefined,
      materialType: selectedType || undefined,
      page: 1, // Reset to first page when filtering
    }));
  }, [debouncedSearch, selectedCategory, selectedType]);

  // === HOOK DEMONSTRATIONS ===

  // 1. useGetMaterialsQuery - Get all materials with filtering/pagination
  const {
    data: materialsResponse,
    isLoading: isLoadingMaterials,
    isFetching: isFetchingMaterials,
    error: materialsError,
    refetch: refetchMaterials
  } = useGetMaterialsQuery(queryParams);

  // 2. useGetMaterialQuery - Get single material (when one is selected)
  const {
    data: selectedMaterialResponse,
    isLoading: isLoadingSelectedMaterial,
    error: selectedMaterialError
  } = useGetMaterialQuery(selectedMaterialId || '', {
    skip: !selectedMaterialId
  });

  // 3. useGetMaterialsByCategoryQuery - Get materials by category
  const {
    data: categoryMaterialsResponse,
    isLoading: isLoadingCategoryMaterials
  } = useGetMaterialsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory || activeTab !== 'by-category'
  });

  // 4. useSearchMaterialsQuery - Search materials
  const {
    data: searchResultsResponse,
    isLoading: isSearching
  } = useSearchMaterialsQuery(debouncedSearch, {
    skip: !debouncedSearch || activeTab !== 'search'
  });

  // 5. useGetMyMaterialsQuery - Get current user's materials
  const {
    data: myMaterialsResponse,
    isLoading: isLoadingMyMaterials,
    refetch: refetchMyMaterials
  } = useGetMyMaterialsQuery(
    { limit: 20, page: 1 },
    { skip: activeTab !== 'my-materials' }
  );

  // 6. useCreateMaterialMutation - Create new material
  const [createMaterial, { isLoading: isCreating }] = useCreateMaterialMutation();

  // 7. useUpdateMaterialMutation - Update existing material
  const [updateMaterial, { isLoading: isUpdating }] = useUpdateMaterialMutation();

  // 8. useDeleteMaterialMutation - Delete material
  const [deleteMaterial, { isLoading: isDeleting }] = useDeleteMaterialMutation();

  // 9. useUpdateMaterialViewMutation - Track material views
  const [updateMaterialView] = useUpdateMaterialViewMutation();

  // 10. useDownloadMaterialMutation - Download materials
  const [downloadMaterial, { isLoading: isDownloading }] = useDownloadMaterialMutation();

  // Get categories for filtering
  const { data: categoriesResponse } = useGetCategoriesQuery();

  const materials = materialsResponse?.data || [];
  const myMaterials = myMaterialsResponse?.data || [];
  const categoryMaterials = categoryMaterialsResponse?.data || [];
  const searchResults = searchResultsResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const selectedMaterial = selectedMaterialResponse?.data;

  // Event Handlers
  const handleMaterialSelect = async (materialId: string) => {
    setSelectedMaterialId(materialId);
    setShowDetailModal(true);
    
    // Track view using useUpdateMaterialViewMutation
    try {
      await updateMaterialView(materialId);
      // Refetch to update view count
      refetchMaterials();
    } catch (error) {
      console.warn('Failed to track view:', error);
    }
  };

  const handleMaterialEdit = (materialId: string) => {
    // In a real app, you'd open an edit modal
    toast({
      title: "Edit Material",
      description: `Edit functionality would open for material ${materialId}`,
    });
  };

  const handleDeleteMaterial = async (materialId: string) => {
    setMaterialToDelete(materialId);
  };

  const confirmDeleteMaterial = async () => {
    if (!materialToDelete) return;

    try {
      await deleteMaterial(materialToDelete).unwrap();
      toast({
        title: "Material Deleted",
        description: "The material has been deleted successfully.",
      });
      
      // Refetch all materials lists
      refetchMaterials();
      refetchMyMaterials();
      
      setMaterialToDelete(null);
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error?.data?.message || "Failed to delete material",
        variant: "destructive",
      });
    }
  };

  const handleDownloadMaterial = async (materialId: string) => {
    try {
      const result = await downloadMaterial(materialId).unwrap();
      
      if (result.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
      }

      toast({
        title: "Download Started",
        description: "Your file download has started.",
      });

      // Refetch to update download count
      refetchMaterials();
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error?.data?.message || "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const handleMaterialSuccess = () => {
    // Refetch all materials when a new one is created
    refetchMaterials();
    refetchMyMaterials();
    setShowAddModal(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setQueryParams({ page: 1, limit: 12 });
  };

  const getMaterialIcon = (materialType: string) => {
    const Icon = MATERIAL_TYPE_ICONS[materialType as keyof typeof MATERIAL_TYPE_ICONS];
    return Icon ? <Icon className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const getMaterialTypeColor = (materialType: string) => {
    return MATERIAL_TYPE_COLORS[materialType as keyof typeof MATERIAL_TYPE_COLORS] || 'bg-gray-100 text-gray-800';
  };

  const renderMaterialCard = (material: any, showOwnership = false) => (
    <Card key={material._id} className="group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div 
            className="flex items-center gap-3 min-w-0 flex-1"
            onClick={() => handleMaterialSelect(material._id)}
          >
            <div className={`p-2 rounded-lg ${getMaterialTypeColor(material.materialType)}`}>
              {getMaterialIcon(material.materialType)}
            </div>
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
                  {material.viewCount}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="h-3 w-3" />
                  {material.downloadCount}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {material.fileUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadMaterial(material._id);
                }}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMaterialEdit(material._id);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMaterial(material._id);
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {material.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {material.description}
          </p>
        )}
        
        {material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
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

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div>{material.relatedPortfolio}</div>
          <div>{new Date(material.createdAt).toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStatistics = () => {
    const totalMaterials = materials.length;
    const totalViews = materials.reduce((sum, m) => sum + m.viewCount, 0);
    const totalDownloads = materials.reduce((sum, m) => sum + m.downloadCount, 0);
    const typeStats = materials.reduce((acc, material) => {
      acc[material.materialType] = (acc[material.materialType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular Type</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(typeStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Materials Management</h1>
          <p className="text-muted-foreground">
            Comprehensive demonstration of all material API operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              refetchMaterials();
              refetchMyMaterials();
            }}
            disabled={isFetchingMaterials}
          >
            {isFetchingMaterials ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {renderStatistics()}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <div className="text-sm text-muted-foreground">
              {isLoadingMaterials ? 'Loading...' : `${materials.length} materials found`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all-materials">
            <FileText className="h-4 w-4 mr-2" />
            All Materials
          </TabsTrigger>
          <TabsTrigger value="my-materials">
            <Users className="h-4 w-4 mr-2" />
            My Materials
          </TabsTrigger>
          <TabsTrigger value="by-category">
            <FolderOpen className="h-4 w-4 mr-2" />
            By Category
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Search Results
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* All Materials Tab - useGetMaterialsQuery */}
        <TabsContent value="all-materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Materials (useGetMaterialsQuery)</CardTitle>
              <CardDescription>
                Demonstrates useGetMaterialsQuery with filtering and pagination
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMaterials ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      </CardHeader>
                      <CardContent>
                        <div className="h-16 bg-gray-100 rounded animate-pulse" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : materials.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No materials found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or create a new material.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => renderMaterialCard(material))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Materials Tab - useGetMyMaterialsQuery */}
        <TabsContent value="my-materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Materials (useGetMyMaterialsQuery)</CardTitle>
              <CardDescription>
                Demonstrates useGetMyMaterialsQuery to show user's own materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMyMaterials ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Loading your materials...</p>
                </div>
              ) : myMaterials.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No materials yet</h3>
                  <p className="text-muted-foreground mb-4">You haven't created any materials yet.</p>
                  <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Material
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myMaterials.map((material) => renderMaterialCard(material, true))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Category Tab - useGetMaterialsByCategoryQuery */}
        <TabsContent value="by-category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materials by Category (useGetMaterialsByCategoryQuery)</CardTitle>
              <CardDescription>
                Demonstrates useGetMaterialsByCategoryQuery with selected category: {selectedCategory || 'None selected'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedCategory ? (
                <div className="text-center py-8">
                  <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a category</h3>
                  <p className="text-muted-foreground mb-4">Choose a category from the filter above to see materials in that category.</p>
                </div>
              ) : isLoadingCategoryMaterials ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Loading category materials...</p>
                </div>
              ) : categoryMaterials.length === 0 ? (
                <div className="text-center py-8">
                  <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No materials in this category</h3>
                  <p className="text-muted-foreground">This category doesn't have any materials yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryMaterials.map((material) => renderMaterialCard(material))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Results Tab - useSearchMaterialsQuery */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Results (useSearchMaterialsQuery)</CardTitle>
              <CardDescription>
                Demonstrates useSearchMaterialsQuery with search term: "{debouncedSearch || 'None'}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!debouncedSearch ? (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Enter a search term</h3>
                  <p className="text-muted-foreground">Use the search input above to find specific materials.</p>
                </div>
              ) : isSearching ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Searching materials...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">No materials match your search criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Found {searchResults.length} result(s) for "{debouncedSearch}"
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((material) => renderMaterialCard(material))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Hook Usage</CardTitle>
              <CardDescription>
                Overview of all material API hooks being demonstrated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Query Hooks Used:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">useGetMaterialsQuery</span>
                      <Badge variant="outline" className="text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">useGetMaterialQuery</span>
                      <Badge variant="outline" className="text-blue-700">
                        {selectedMaterial ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">useGetMaterialsByCategoryQuery</span>
                      <Badge variant="outline" className="text-purple-700">
                        {selectedCategory ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm">useSearchMaterialsQuery</span>
                      <Badge variant="outline" className="text-orange-700">
                        {debouncedSearch ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
                      <span className="text-sm">useGetMyMaterialsQuery</span>
                      <Badge variant="outline" className="text-indigo-700">
                        {activeTab === 'my-materials' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Mutation Hooks Used:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">useCreateMaterialMutation</span>
                      <Badge variant="outline" className="text-green-700">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">useUpdateMaterialMutation</span>
                      <Badge variant="outline" className="text-blue-700">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">useDeleteMaterialMutation</span>
                      <Badge variant="outline" className="text-red-700">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">useUpdateMaterialViewMutation</span>
                      <Badge variant="outline" className="text-yellow-700">Auto-triggered</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-teal-50 rounded">
                      <span className="text-sm">useDownloadMaterialMutation</span>
                      <Badge variant="outline" className="text-teal-700">Available</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Material Modal - useCreateMaterialMutation */}
      <AddMaterialModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSuccess={handleMaterialSuccess}
      />

      {/* Material Detail Modal - useGetMaterialQuery */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Material Details</DialogTitle>
            <DialogDescription>
              Detailed view using useGetMaterialQuery and useUpdateMaterialViewMutation
            </DialogDescription>
          </DialogHeader>
          {selectedMaterialId && (
            <MaterialDetail
              materialId={selectedMaterialId}
              onEdit={handleMaterialEdit}
              onDelete={handleDeleteMaterial}
              onClose={() => setShowDetailModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - useDeleteMaterialMutation */}
      <AlertDialog open={!!materialToDelete} onOpenChange={(open) => !open && setMaterialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this material? This action cannot be undone.
              This demonstrates the useDeleteMaterialMutation hook.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteMaterial}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Material'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};