import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LIBRARY_CONTENT } from "@/data/demoData";
import { useAuth } from "@/contexts/AuthContext";
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
import { Loader2 } from 'lucide-react';

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
  const { user }:any = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'root' | 'children' | 'materials'>('root');
  const [folderType, setFolderType] = useState<'parent' | 'child'>('parent');
  const [currentParentFolder, setCurrentParentFolder] = useState<any | null>(null);
  const [selectedGrandchildFolder, setSelectedGrandchildFolder] = useState<any | null>(null);
  const [folderMaterials, setFolderMaterials] = useState<any[]>([]);

  const [deleteFolder] = useDeleteFolderMutation();
  const { data: materialsResponse, refetch: refetchMaterials } = useGetMaterialsQuery();
  const { data: rootFoldersResponse, refetch: refetchFolders, isLoading: isRootFoldersLoading } = useGetRootFoldersQuery();
  const { data: childFoldersResponse, refetch: refetchChildFolders, isLoading: isChildFoldersLoading } = useGetChildFoldersQuery(
    currentFolderId!, 
    { skip: !currentFolderId }
  );
  
  const library = LIBRARY_CONTENT;
  const rootFolders = rootFoldersResponse?.data || [];
  const childFolders = childFoldersResponse?.data || [];


  // Filter content based on user role and access
  const getAccessibleContent = () => {
    return library.filter(content => 
      content.targetAudience.includes(user?.role)
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

 




  const handleMaterialSuccess = () => {
    refetchMaterials();
    toast({
      title: "Material added",
      description: "The material has been added successfully.",
    });
  };

  const handleAddMaterial = () => {
    if (!currentFolderId) return;
    setShowAddMaterialModal(true);
  };

  // Folder navigation functions
  const handleFolderClick = (folder: any | null) => {
    if (folder === null) {
      setCurrentFolderId(null);
      setCurrentView('root');
      setCurrentParentFolder(null);
    } else {
      const folderId = folder._id || folder.id;
      setCurrentFolderId(folderId);
      
      // For 2-level hierarchy: Level 0 shows children, Level 1 shows materials
      if (folder.level === 0) {
        setCurrentView('children');
        setCurrentParentFolder(folder);
      } else if (folder.level === 1) {
        // Level 1 folders can contain materials in the new 2-level system
        setCurrentView('materials');
        setSelectedGrandchildFolder(folder);
        // Load materials for this folder if needed
      }
      
      toast({
        title: `Opened ${folder.name}`,
        description: `Viewing contents of ${folder.folderType || 'Level ' + folder.level} folder`,
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

  const handleCreateChildFolder = () => {
    if (!currentParentFolder) return;
    
    // In 2-level hierarchy, only Level 0 (parent) folders can have children
    if (currentParentFolder.level >= 1) {
      toast({
        title: "Cannot create folder",
        description: "Child folders cannot have subfolders in the 2-level system",
        variant: "destructive"
      });
      return;
    }

    setFolderType('child');
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

  
  // Statistics - combine demo data with real materials
  const realMaterials = materialsResponse?.data || [];
  const totalContent = accessibleContent.length + realMaterials.length;
  const contentByType = {
    text: accessibleContent.filter(c => c.type === 'text').length + realMaterials.filter(m => m.materialType === 'text').length,
    audio: accessibleContent.filter(c => c.type === 'audio').length + realMaterials.filter(m => m.materialType === 'audio').length,
    video: accessibleContent.filter(c => c.type === 'video').length + realMaterials.filter(m => m.materialType === 'video').length,
    diagram: accessibleContent.filter(c => c.type === 'diagram').length + realMaterials.filter(m => m.materialType === 'image').length,
  };

  const renderLoader = () => (
    <TableRow>
      <TableCell colSpan={6} className="h-32">
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">Loading folders...</p>
        </div>
      </TableCell>
    </TableRow>
  );

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
                  onClick={() => {
                    if (currentView === 'materials') {
                      // Go back to the parent folder's children view
                      setCurrentView('children');
                      setSelectedGrandchildFolder(null);
                    } else {
                      // Go back to root
                      handleFolderClick(null);
                    }
                  }}
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
            {/* Show Add Material button for Level 1 folders (which can contain materials in 2-level system) */}
            {(currentView === 'children' && currentParentFolder?.level === 0) && (
              <Button
                variant="outline"
                onClick={() => setShowAddMaterialModal(true)}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Add Material to Child Folder
              </Button>
            )}
            {/* Only show create folder button for Level 0 folders */}
            {currentView === 'root' || (currentView === 'children' && currentParentFolder?.level === 0) ? (
              <Button
                onClick={() => currentView === 'children' 
                  ? handleCreateChildFolder()
                  : setShowCreateFolderModal(true)
                }
                className="gap-2"
              >
                <FolderPlus className="h-4 w-4" />
                {currentView === 'children' 
                  ? 'New Child Folder'
                  : 'New Parent Folder'
                }
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
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
                {currentView === 'materials'
                  ? folderMaterials.length > 0
                    ? folderMaterials.map((material) => (
                        <TableRow key={material._id || material.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{material.title}</div>
                                <div className="text-sm text-muted-foreground">{material.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              Material
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {material.type || 'File'}
                            </Badge>
                          </TableCell>
                          <TableCell>{material.createdBy?.name || 'Unknown'}</TableCell>
                          <TableCell>{material.createdAt ? format(new Date(material.createdAt), 'MMM d, yyyy') : 'Unknown'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMaterialClick(material)}
                              >
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="h-8 w-8 text-muted-foreground" />
                              <p className="text-muted-foreground">No materials found in this folder</p>
                              <Button
                                onClick={() => setShowAddMaterialModal(true)}
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                Add First Material
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  : currentView === 'children' 
                    ? isChildFoldersLoading 
                      ? renderLoader()
                      : childFolders.length > 0 
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
                                  Create Child Folder
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                    : isRootFoldersLoading
                      ? renderLoader()
                      : rootFolders?.map((folder) => renderFolderRow(folder))
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
                  