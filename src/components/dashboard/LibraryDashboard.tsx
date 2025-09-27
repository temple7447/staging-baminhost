import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LIBRARY_CONTENT } from "@/data/demoData";
import { useAuth } from "@/contexts/AuthContext";
import { CategoryManager } from "../library/CategoryManager";
import { 
  BookOpen, 
  FileText, 
  Headphones, 
  Video, 
  Image, 
  Link2,
  AlertTriangle,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Target,
  Shield,
  Database,
  FolderPlus,
  Folder,
  Briefcase,
  BookA
} from "lucide-react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/services/categoriesApi";
import { useGetMaterialsQuery } from "@/services/materialsApi";
import { useToast } from "@/hooks/use-toast";
import { AddMaterialModal } from "../library/AddMaterialModal";
import { MaterialsManagementDashboard } from "../materials/MaterialsManagementDashboard";
import { FolderView } from "../library/FolderView";
import { FoldersTableView } from "../library/FoldersTableView";
import { FolderCard } from "../library/FolderCard";
import { CreateFolderModal } from "../library/CreateFolderModal";
import { FolderNavigationDebug } from "../debug/FolderNavigationDebug";
import { MaterialCard } from "../library/MaterialCard";
import { 
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetRootFoldersQuery,
  useGetChildFoldersQuery,
  useGetFolderWithMaterialsQuery,
} from '@/services/foldersApi';
// import type { Folder } from "@/types/folders";
import type { Material } from "@/types/materials";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const iconComponents: Record<string, React.ElementType> = {
  folder: Folder,
  briefcase: Briefcase,
  book: BookA,
  users: Users,
  settings: Shield,
  heart: Star,
  star: Star,
  home: Database,
  building: FolderPlus,
  video: Video,
  image: Image,
  fileText: FileText,
  target: Target,
  shield: Shield,
  database: Database
};

export const LibraryDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [currentView, setCurrentView] = useState<'root' | 'children' | 'materials'>('root');
  const [currentParentFolder, setCurrentParentFolder] = useState<any>(null);
  const [folderType, setFolderType] = useState<'parent' | 'child' | 'grandchild'>('parent');
  const [selectedGrandchildFolder, setSelectedGrandchildFolder] = useState<any>(null);

  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [deleteFolder] = useDeleteFolderMutation();
  const { data: materialsResponse, refetch: refetchMaterials } = useGetMaterialsQuery();
  const { data: rootFoldersResponse, refetch: refetchFolders } = useGetRootFoldersQuery();
  const { data: childFoldersResponse, refetch: refetchChildFolders } = useGetChildFoldersQuery(
    currentFolderId!, 
    { skip: !currentFolderId }
  );
  const { data: folderMaterialsResponse, refetch: refetchFolderMaterials } = useGetFolderWithMaterialsQuery(
    selectedGrandchildFolder?._id || '',
    { skip: !selectedGrandchildFolder?._id }
  );
  
  const library = LIBRARY_CONTENT;
  const rootFolders = rootFoldersResponse?.data || [];
  const childFolders = childFoldersResponse?.data || [];
  const folderWithMaterials = folderMaterialsResponse?.data;
  const folderMaterials = folderWithMaterials?.materials || [];

  console.log('User in LibraryDashboard:', materialsResponse);

  // Filter content based on user role and access
  const getAccessibleContent = () => {
    return library.filter(content => 
      content.targetAudience.includes(user?.role || 'owner')
    );
  };

  const accessibleContent = getAccessibleContent();

  // Filter content based on search and filters
  const filteredContent = accessibleContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'diagram': return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'technical': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'vendor': return 'bg-green-100 text-green-800';
      case 'customer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateCategory = async (id: string, updates: any) => {
    try {
      await updateCategory({ id, ...updates }).unwrap();
      toast({
        title: "Category updated",
        description: "The category has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMaterialSuccess = () => {
    refetchMaterials();
    if (selectedGrandchildFolder) {
      refetchFolderMaterials();
    }
    toast({
      title: "Material added",
      description: "The material has been added successfully.",
    });
  };

  const handleAddMaterial = () => {
    if (!currentParentFolder) return;
    setShowAddMaterialModal(true);
  };

  // Folder navigation functions
  const handleFolderClick = (folder: any | null) => {
    if (folder === null) {
      setCurrentFolderId(null);
      setCurrentView('root');
      setCurrentParentFolder(null);
      setSelectedGrandchildFolder(null);
    } else {
      const folderId = folder._id || folder.id;
      
      // If it's a grandchild folder (level 2), show materials
      if (folder.level === 2 || folder.folderType === 'grandchild') {
        setSelectedGrandchildFolder(folder);
        setCurrentView('materials');
        toast({
          title: `Viewing Materials in ${folder.name}`,
          description: `Loading materials from ${folder.fullPath}`,
        });
      } else {
        // For parent and child folders, show subfolders
        setCurrentFolderId(folderId);
        setCurrentView('children');
        setCurrentParentFolder(folder);
        setSelectedGrandchildFolder(null);
        
        toast({
          title: `Opened ${folder.name}`,
          description: `Viewing contents of ${folder.folderType || 'Level ' + folder.level} folder`,
        });
      }
    }
  };

  const handleFolderDelete = async (folder: any) => {
    try {
      const folderId = folder._id || folder.id;
      await deleteFolder(folderId).unwrap();
      toast({
        title: "Folder deleted",
        description: "The folder has been deleted successfully.",
      });
      refetchFolders();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete folder. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateChildFolder = () => {
    if (!currentParentFolder) return;
    
    const newFolderType = currentParentFolder.level === 0 ? 'child' : 'grandchild';
    
    if (currentParentFolder.level >= 2) {
      toast({
        title: "Cannot create folder",
        description: "Maximum folder depth reached",
        variant: "destructive"
      });
      return;
    }

    setFolderType(newFolderType);
    setShowCreateFolderModal(true);
  };

  const handleFolderCreationSuccess = () => {
    if (currentView === 'children') {
      refetchChildFolders();
    } else {
      refetchFolders();
    }
    setFolderType('parent');
    toast({
      title: "Folder created",
      description: "The folder has been created successfully.",
    });
  };

  // Back to root navigation
  const handleBackToRoot = () => {
    setCurrentFolderId(null);
    toast({
      title: "Back to Library",
      description: "Returned to root level",
    });
  };

  // Folder edit handler
  const handleFolderEdit = (folder: any) => {
    // For now, just show a toast. You can implement edit functionality here
    toast({
      title: "Edit Folder",
      description: `Editing functionality for "${folder.name}" will be implemented here.`,
    });
    console.log('Folder edit requested:', folder);
  };

  // Material click handler
  const handleMaterialClick = (material: Material) => {
    // For now, we can show a toast or open the material
    // You can implement file viewing/downloading logic here
    toast({
      title: "Material Selected",
      description: `Opening ${material.title}`,
    });
    
    // If the material has a file URL, open it
    if (material.fileUrl) {
      window.open(material.fileUrl, '_blank');
    }
    
    console.log('Material clicked:', material);
  };

  // Handle material view
  const handleMaterialView = (material: any) => {
    toast({
      title: "Viewing Material",
      description: `Opening ${material.title}`,
    });
    // Add logic to view material details
    console.log('Viewing material:', material);
  };

  // Handle material download
  const handleMaterialDownload = (material: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${material.title}`,
    });
    // Add logic to download material
    console.log('Downloading material:', material);
  };

  // Statistics - combine demo data with real materials
  const realMaterials = materialsResponse?.data || [];
  const totalContent = accessibleContent.length + realMaterials.length;
  const contentByType = {
    text: accessibleContent.filter(c => c.type === 'text').length + realMaterials.filter(m => m.materialType === 'text').length,
    audio: accessibleContent.filter(c => c.type === 'audio').length + realMaterials.filter(m => m.materialType === 'audio').length,
    video: accessibleContent.filter(c => c.type === 'video').length + realMaterials.filter(m => m.materialType === 'video').length,
    diagram: accessibleContent.filter(c => c.type === 'diagram').length + realMaterials.filter(m => m.materialType === 'image').length,
  };

  const renderFolderRow = (folder: any) => {
    // Remove the level check since we want to show all folders in the current view
    const IconComponent = iconComponents[folder.icon as keyof typeof iconComponents];
    
    return (
      <TableRow key={folder._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <div 
              className="p-1.5 rounded"
              style={{ backgroundColor: folder.color + '20' }}
            >
              {IconComponent && (
                <IconComponent
                  className="h-4 w-4"
                  style={{ color: folder.color }}
                />
              )}
            </div>
            <span>{folder.name}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="text-xs">
            Level {folder.level}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {folder.materialCount} materials
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {folder.subfolderCount} subfolders
            </Badge>
          </div>
        </TableCell>
        <TableCell>{folder.createdBy.name}</TableCell>
        <TableCell>{format(new Date(folder.createdAt), 'MMM d, yyyy')}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFolderClick(folder)}
            >
              Open
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFolderEdit(folder)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => handleFolderDelete(folder)}
            >
              Delete
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Library</h1>
          <p className="text-muted-foreground">
            Central knowledge hub with cross-referencing - {user?.role} access level
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowAddMaterialModal(true)}
          >
            Add Content
          </Button>
          <Button>Manage Categories</Button>
        </div>
      </div>


      {/* Add Material Modal */}
      <AddMaterialModal 
        open={showAddMaterialModal}
        onOpenChange={setShowAddMaterialModal}
        onSuccess={handleMaterialSuccess}
        folderId={currentView === 'materials' ? selectedGrandchildFolder?._id : currentFolderId || undefined}
      />

      {/* Create Folder Modal */}
      <CreateFolderModal
        open={showCreateFolderModal}
        onOpenChange={setShowCreateFolderModal}
        onSuccess={handleFolderCreationSuccess}
        parentFolder={currentView === 'children' ? currentFolderId : null}
        folderType={folderType}
      />

      {/* Content Library */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {(currentView === 'children' || currentView === 'materials') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFolderClick(null)}
                  className="mr-2"
                >
                  ← Back
                </Button>
              )}
              {currentView === 'materials'
                ? `${selectedGrandchildFolder?.name} - Materials`
                : currentView === 'children' 
                  ? `${currentParentFolder?.name} Contents`
                  : 'Content Library'
              }
            </CardTitle>
            <CardDescription>
              {currentView === 'materials'
                ? `Materials in ${selectedGrandchildFolder?.fullPath} (${folderMaterials.length} items)`
                : currentView === 'children'
                  ? `Viewing contents of ${currentParentFolder?.name}`
                  : 'Browse and manage knowledge base content'
              }
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {currentView === 'materials' && (
              <Button
                variant="outline"
                onClick={() => setShowAddMaterialModal(true)}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Add Material
              </Button>
            )}
            {currentView === 'children' && (
              <Button
                variant="outline"
                onClick={handleAddMaterial}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Add Material
              </Button>
            )}
            {currentView !== 'materials' && (
              <Button
                onClick={() => currentView === 'children' 
                  ? handleCreateChildFolder()
                  : setShowCreateFolderModal(true)
                }
                className="gap-2"
              >
                <FolderPlus className="h-4 w-4" />
                {currentView === 'children' 
                  ? `New ${currentParentFolder?.level === 0 ? 'Child' : 'Grandchild'} Folder`
                  : 'New Parent Folder'
                }
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentView === 'materials' ? (
            // Materials Grid View
            <div>
              {folderMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {folderMaterials.map((material) => (
                    <MaterialCard
                      key={material._id}
                      material={material}
                      onView={handleMaterialView}
                      onDownload={handleMaterialDownload}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Materials Found</h3>
                  <p className="text-muted-foreground mb-4">
                    This folder doesn't contain any materials yet.
                  </p>
                  <Button
                    onClick={() => setShowAddMaterialModal(true)}
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Add First Material
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Folders Table View
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Contents</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentView === 'children' 
                    ? childFolders.length > 0 
                      ? childFolders.map((folder) => renderFolderRow(folder))
                      : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <Folder className="h-8 w-8 text-muted-foreground" />
                              <p className="text-muted-foreground">No folders found</p>
                              <Button
                                onClick={handleCreateChildFolder}
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                Create {currentParentFolder?.level === 0 ? 'Child' : 'Grandchild'} Folder
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    : rootFolders?.map((folder) => renderFolderRow(folder))
                  }
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
