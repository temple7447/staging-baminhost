import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle,
  XCircle,
  Loader2,
  Folder,
  BarChart,
  FileText,
  Plus,
  Edit,
  Move,
  Trash2,
} from 'lucide-react';
import {
  useGetFoldersQuery,
  useGetFolderStatsQuery,
  useGetFoldersForMaterialsQuery,
  useGetFolderQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useMoveFolderMutation,
  useDeleteFolderMutation,
} from '@/services/foldersApi';
import { useToast } from '@/hooks/use-toast';
import type { Folder as FolderType } from '@/types/folders';
import { cn } from '@/lib/utils';

export const FolderApiTester: React.FC = () => {
  const { toast } = useToast();
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [createFormData, setCreateFormData] = useState({
    name: 'Test Folder',
    icon: 'folder',
    color: '#28a745',
    description: 'Test folder description',
    parentFolder: null as string | null,
  });
  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [moveFormData, setMoveFormData] = useState({
    folderId: '',
    newParentFolder: null as string | null,
  });

  // Query hooks
  const { 
    data: foldersResponse, 
    isLoading: isLoadingFolders, 
    error: foldersError,
    refetch: refetchFolders 
  } = useGetFoldersQuery();

  const { 
    data: statsResponse, 
    isLoading: isLoadingStats, 
    error: statsError 
  } = useGetFolderStatsQuery();

  const { 
    data: materialFoldersResponse, 
    isLoading: isLoadingMaterialFolders, 
    error: materialFoldersError 
  } = useGetFoldersForMaterialsQuery();

  const { 
    data: selectedFolderResponse, 
    isLoading: isLoadingSelectedFolder, 
    error: selectedFolderError 
  } = useGetFolderQuery(selectedFolderId, { skip: !selectedFolderId });

  // Mutation hooks
  const [createFolder, { isLoading: isCreating }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: isUpdating }] = useUpdateFolderMutation();
  const [moveFolder, { isLoading: isMoving }] = useMoveFolderMutation();
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  const folders = foldersResponse?.data || [];
  const stats = statsResponse?.data;
  const materialFolders = materialFoldersResponse?.data || [];
  const selectedFolder = selectedFolderResponse?.data;

  const handleCreateFolder = async () => {
    if (!createFormData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Folder name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createFolder(createFormData).unwrap();
      toast({
        title: 'Success',
        description: 'Folder created successfully',
      });
      refetchFolders();
      setCreateFormData({
        name: 'Test Folder',
        icon: 'folder',
        color: '#28a745',
        description: 'Test folder description',
        parentFolder: null,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to create folder',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateFolder = async () => {
    if (!updateFormData.id || !updateFormData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Folder ID and name are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateFolder(updateFormData).unwrap();
      toast({
        title: 'Success',
        description: 'Folder updated successfully',
      });
      refetchFolders();
      setUpdateFormData({ id: '', name: '', description: '' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to update folder',
        variant: 'destructive',
      });
    }
  };

  const handleMoveFolder = async () => {
    if (!moveFormData.folderId) {
      toast({
        title: 'Error',
        description: 'Folder ID is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await moveFolder(moveFormData).unwrap();
      toast({
        title: 'Success',
        description: 'Folder moved successfully',
      });
      refetchFolders();
      setMoveFormData({ folderId: '', newParentFolder: null });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to move folder',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!folderId) return;

    try {
      await deleteFolder(folderId).unwrap();
      toast({
        title: 'Success',
        description: 'Folder deleted successfully',
      });
      refetchFolders();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to delete folder',
        variant: 'destructive',
      });
    }
  };

  const ApiStatusBadge = ({ isLoading, error }: { isLoading: boolean; error: any }) => {
    if (isLoading) {
      return (
        <Badge variant="secondary" className="animate-pulse">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Loading
        </Badge>
      );
    }
    
    if (error) {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      );
    }
    
    return (
      <Badge variant="default" className="bg-green-500">
        <CheckCircle className="h-3 w-3 mr-1" />
        Success
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">📁 Folder API Endpoint Tester</h1>
        <p className="text-muted-foreground">
          Test all folder hierarchy API endpoints
        </p>
      </div>

      <Tabs defaultValue="queries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queries">Query Endpoints</TabsTrigger>
          <TabsTrigger value="mutations">Mutation Endpoints</TabsTrigger>
          <TabsTrigger value="stats">API Statistics</TabsTrigger>
        </TabsList>

        {/* Query Endpoints Tab */}
        <TabsContent value="queries" className="space-y-4">
          {/* GET /api/folders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Folder className="h-5 w-5 mr-2" />
                  GET /api/folders - Folder Tree
                </span>
                <ApiStatusBadge isLoading={isLoadingFolders} error={foldersError} />
              </CardTitle>
              <CardDescription>
                Get the complete folder hierarchy tree
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFolders ? (
                <div className="text-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading folders...</p>
                </div>
              ) : foldersError ? (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Error: {foldersError?.message || 'Failed to load folders'}
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Found {folders.length} folders
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {folders.map((folder: FolderType) => (
                      <div
                        key={folder.id}
                        className={cn(
                          "p-2 border rounded cursor-pointer hover:bg-gray-50",
                          selectedFolderId === folder.id && "bg-blue-50 border-blue-500"
                        )}
                        onClick={() => setSelectedFolderId(folder.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Folder className="h-4 w-4" style={{ color: folder.color }} />
                          <span className="text-sm font-medium truncate">{folder.name}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Level {folder.level}
                          </Badge>
                          {folder.fullPath && (
                            <span className="text-xs text-muted-foreground truncate">
                              {folder.fullPath}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* GET /api/folders/stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  GET /api/folders/stats - Statistics
                </span>
                <ApiStatusBadge isLoading={isLoadingStats} error={statsError} />
              </CardTitle>
              <CardDescription>
                Get folder hierarchy statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.totalFolders}</div>
                    <div className="text-xs text-muted-foreground">Total Folders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.totalMaterials}</div>
                    <div className="text-xs text-muted-foreground">Total Materials</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.recentlyCreated}</div>
                    <div className="text-xs text-muted-foreground">Recently Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.recentlyUpdated}</div>
                    <div className="text-xs text-muted-foreground">Recently Updated</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* GET /api/folders/for-materials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  GET /api/folders/for-materials - Material Folders
                </span>
                <ApiStatusBadge isLoading={isLoadingMaterialFolders} error={materialFoldersError} />
              </CardTitle>
              <CardDescription>
                Get folders that can contain materials (Level 2 only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Found {materialFolders.length} folders that can contain materials
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {materialFolders.map((folder: FolderType) => (
                    <div key={folder.id} className="flex items-center space-x-2 p-2 border rounded">
                      <FileText className="h-4 w-4" style={{ color: folder.color }} />
                      <span className="text-sm truncate">{folder.fullPath}</span>
                      <Badge variant="outline" className="text-xs">
                        Level {folder.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GET /api/folders/:id */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Folder className="h-5 w-5 mr-2" />
                  GET /api/folders/:id - Single Folder
                </span>
                <ApiStatusBadge isLoading={isLoadingSelectedFolder} error={selectedFolderError} />
              </CardTitle>
              <CardDescription>
                Get details of a specific folder (click a folder above to test)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFolderId ? (
                selectedFolder ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Folder className="h-8 w-8" style={{ color: selectedFolder.color }} />
                      <div>
                        <h3 className="font-semibold">{selectedFolder.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedFolder.fullPath}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Level:</span> {selectedFolder.level}
                      </div>
                      <div>
                        <span className="font-medium">Subfolders:</span> {selectedFolder.subFoldersCount || 0}
                      </div>
                      <div>
                        <span className="font-medium">Materials:</span> {selectedFolder.materialsCount || 0}
                      </div>
                      <div>
                        <span className="font-medium">Can have materials:</span>{' '}
                        {selectedFolder.canHaveMaterials ? '✅' : '❌'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground mt-2">Loading folder details...</p>
                  </div>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a folder from the list above to view its details
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mutation Endpoints Tab */}
        <TabsContent value="mutations" className="space-y-4">
          {/* POST /api/folders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                POST /api/folders - Create Folder
              </CardTitle>
              <CardDescription>
                Create a new folder in the hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="create-name">Name</Label>
                  <Input
                    id="create-name"
                    value={createFormData.name}
                    onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-parent">Parent Folder ID</Label>
                  <Input
                    id="create-parent"
                    value={createFormData.parentFolder || ''}
                    onChange={(e) => setCreateFormData({ ...createFormData, parentFolder: e.target.value || null })}
                    placeholder="Leave empty for root folder"
                  />
                </div>
              </div>
              <Button onClick={handleCreateFolder} disabled={isCreating}>
                {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Folder
              </Button>
            </CardContent>
          </Card>

          {/* PUT /api/folders/:id */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="h-5 w-5 mr-2" />
                PUT /api/folders/:id - Update Folder
              </CardTitle>
              <CardDescription>
                Update an existing folder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="update-id">Folder ID</Label>
                  <Input
                    id="update-id"
                    value={updateFormData.id}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, id: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-name">New Name</Label>
                  <Input
                    id="update-name"
                    value={updateFormData.name}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-desc">Description</Label>
                  <Input
                    id="update-desc"
                    value={updateFormData.description}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleUpdateFolder} disabled={isUpdating}>
                {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update Folder
              </Button>
            </CardContent>
          </Card>

          {/* PUT /api/folders/:id/move */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Move className="h-5 w-5 mr-2" />
                PUT /api/folders/:id/move - Move Folder
              </CardTitle>
              <CardDescription>
                Move a folder to a different parent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="move-id">Folder ID to Move</Label>
                  <Input
                    id="move-id"
                    value={moveFormData.folderId}
                    onChange={(e) => setMoveFormData({ ...moveFormData, folderId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="move-parent">New Parent ID</Label>
                  <Input
                    id="move-parent"
                    value={moveFormData.newParentFolder || ''}
                    onChange={(e) => setMoveFormData({ ...moveFormData, newParentFolder: e.target.value || null })}
                    placeholder="Leave empty for root level"
                  />
                </div>
              </div>
              <Button onClick={handleMoveFolder} disabled={isMoving}>
                {isMoving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Move Folder
              </Button>
            </CardContent>
          </Card>

          {/* DELETE /api/folders/:id */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="h-5 w-5 mr-2" />
                DELETE /api/folders/:id - Delete Folder
              </CardTitle>
              <CardDescription>
                Delete a folder from the hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Click on any folder in the tree above to delete it. Be careful - this action cannot be undone!
                </AlertDescription>
              </Alert>
              {selectedFolderId && (
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteFolder(selectedFolderId)}
                  disabled={isDeleting}
                >
                  {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Delete Selected Folder ({selectedFolderId})
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Coverage</CardTitle>
              <CardDescription>
                All folder hierarchy endpoints are implemented and tested
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-600">✅ Query Endpoints</h3>
                  <ul className="space-y-1 text-sm">
                    <li>GET /api/folders - Folder tree</li>
                    <li>GET /api/folders/stats - Statistics</li>
                    <li>GET /api/folders/for-materials - Material folders</li>
                    <li>GET /api/folders/:id - Single folder</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-600">✅ Mutation Endpoints</h3>
                  <ul className="space-y-1 text-sm">
                    <li>POST /api/folders - Create folder</li>
                    <li>PUT /api/folders/:id - Update folder</li>
                    <li>PUT /api/folders/:id/move - Move folder</li>
                    <li>DELETE /api/folders/:id - Delete folder</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};