import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Search,
  Filter,
  FolderPlus,
  Folder
} from "lucide-react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/services/categoriesApi";
import { useGetMaterialsQuery } from "@/services/materialsApi";
import { useToast } from "@/hooks/use-toast";
import { AddMaterialModal } from "../library/AddMaterialModal";
import { MaterialsManagementDashboard } from "../materials/MaterialsManagementDashboard";
import { FolderView } from "../library/FolderView";
import { FoldersList } from "../library/FoldersList";
import { FoldersTableView } from "../library/FoldersTableView";
import { FolderCard } from "../library/FolderCard";
import { CreateFolderModal } from "../library/CreateFolderModal";
import { FolderNavigationDebug } from "../debug/FolderNavigationDebug";
import { 
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetRootFoldersQuery
} from "@/services/foldersApi";
// import type { Folder } from "@/types/folders";
import type { Material } from "@/types/materials";

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

  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [deleteFolder] = useDeleteFolderMutation();
  const { data: materialsResponse, refetch: refetchMaterials } = useGetMaterialsQuery();
  const { data: rootFoldersResponse, refetch: refetchFolders } = useGetRootFoldersQuery();
  
  const library = LIBRARY_CONTENT;
  const rootFolders = rootFoldersResponse?.data || [];

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
    toast({
      title: "Material added",
      description: "The material has been added successfully.",
    });
  };

  // Folder navigation functions
  const handleFolderClick = (folder: any | null) => {
    if (folder === null) {
      // Navigate back to root
      setCurrentFolderId(null);
    } else {
      // Navigate into the folder using _id or id
      const folderId = folder._id || folder.id;
      setCurrentFolderId(folderId);
      
      // Switch to Folders tab to show the navigation
      setActiveTab("folders");
      
      console.log('Navigating to folder:', folder.name, 'Level:', folder.level, 'ID:', folderId);
      
      toast({
        title: `Opened ${folder.name}`,
        description: `Navigating to ${folder.folderType || 'Level ' + folder.level} folder`,
      });
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

  const handleFolderCreationSuccess = () => {
    refetchFolders();
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

      {/* Content Library */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Browse and manage knowledge base content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="folders-list">Folders List</TabsTrigger>
              <TabsTrigger value="folders-table">Folders Table</TabsTrigger>
              <TabsTrigger value="materials">All Materials</TabsTrigger>
            </TabsList>

            {/* Folders Tab - Google Drive-like view */}
            <TabsContent value="folders" className="space-y-4">
              <FolderNavigationDebug
                currentFolderId={currentFolderId}
                onFolderClick={handleFolderClick}
                onBackClick={handleBackToRoot}
              />
              
              <FolderView
                currentFolderId={currentFolderId}
                onFolderClick={handleFolderClick}
                onMaterialClick={handleMaterialClick}
                onFolderDelete={handleFolderDelete}
                onBackToRoot={handleBackToRoot}
              />
            </TabsContent>

            {/* Folders List Tab - Table/List view */}
            <TabsContent value="folders-list" className="space-y-4">
              <FoldersList
                onFolderSelect={handleFolderClick}
                onFolderEdit={handleFolderEdit}
                onFolderDelete={handleFolderDelete}
                onCreateFolder={() => setShowCreateFolderModal(true)}
                showActions={true}
                parentId={null}
              />
            </TabsContent>

            {/* Folders Table Tab - Hierarchical Tree Table view */}
            <TabsContent value="folders-table" className="space-y-4">
              <FoldersTableView
                onFolderSelect={handleFolderClick}
                onFolderEdit={handleFolderEdit}
                onFolderDelete={handleFolderDelete}
                onCreateFolder={() => setShowCreateFolderModal(true)}
                showActions={true}
              />
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <MaterialsManagementDashboard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Material Modal */}
      <AddMaterialModal 
        open={showAddMaterialModal}
        onOpenChange={setShowAddMaterialModal}
        onSuccess={handleMaterialSuccess}
      />

      {/* Create Folder Modal */}
      <CreateFolderModal
        open={showCreateFolderModal}
        onOpenChange={setShowCreateFolderModal}
        onSuccess={handleFolderCreationSuccess}
      />
    </div>
  );
};