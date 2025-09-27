import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  useGetFoldersQuery,
  useGetFoldersForMaterialsQuery,
  useGetFolderTreeQuery,
  useGetFolderStatsQuery,
  useCreateParentFolderMutation,
  useCreateChildFolderMutation,
  useCreateGrandchildFolderMutation
} from '@/services/foldersApi';
import { useToast } from '@/hooks/use-toast';
import { Folder, Users, Monitor, Mail, Book } from 'lucide-react';

/**
 * Demo component that showcases the folder hierarchy API usage
 * following the complete API specification provided.
 * 
 * This demonstrates:
 * - Creating Parent → Child → Grandchild folder hierarchy
 * - API endpoints matching the specification
 * - Proper field mapping (_id, parentFolder, etc.)
 * - Material folder restrictions
 */
export const FolderApiDemo: React.FC = () => {
  const { toast } = useToast();
  
  // Specific folder creation hooks
  const [createParentFolder, { isLoading: isCreatingParent }] = useCreateParentFolderMutation();
  const [createChildFolder, { isLoading: isCreatingChild }] = useCreateChildFolderMutation();
  const [createGrandchildFolder, { isLoading: isCreatingGrandchild }] = useCreateGrandchildFolderMutation();
  
  const isCreating = isCreatingParent || isCreatingChild || isCreatingGrandchild;

  // API Query hooks
  const { data: foldersData, refetch: refetchFolders } = useGetFoldersQuery({});
  const { data: materialFoldersData } = useGetFoldersForMaterialsQuery();
  const { data: folderTreeData } = useGetFolderTreeQuery();
  const { data: folderStatsData } = useGetFolderStatsQuery();

  const [demoState, setDemoState] = useState<{
    parentId?: string;
    childId?: string;
    grandchildId?: string;
  }>({});

  // Demo: Create folder hierarchy as shown in API docs
  const createDemoHierarchy = async () => {
    try {
      // Step 1: Create Parent Folder (Level 0) - Sales & Marketing
      // Note: Parent folders do NOT include parentFolder field since they are root-level
      const parentFolder = await createParentFolder({
        name: "Sales & Marketing",
        description: "All sales and marketing related materials and resources",
        icon: "megaphone",
        color: "#28a745",
        visibility: "public",
        isProtected: false,
        // No parentFolder field - this is a root-level folder
      }).unwrap();

      const parentId = parentFolder.data._id;
      setDemoState(prev => ({ ...prev, parentId }));

      // Step 2: Create Child Folder (Level 1) - Digital Marketing  
      const childFolder = await createChildFolder({
        name: "Digital Marketing",
        description: "Digital marketing strategies, campaigns, and resources",
        parentFolder: parentId,
        icon: "monitor",
        color: "#17a2b8",
        visibility: "public",
        isProtected: false,
      }).unwrap();

      const childId = childFolder.data._id;
      setDemoState(prev => ({ ...prev, childId }));

      // Step 3: Create Grandchild Folder (Level 2) - Social Media
      const grandchildFolder = await createGrandchildFolder({
        name: "Social Media",
        description: "Social media marketing materials, templates, and guides",
        parentFolder: childId,
        icon: "users",
        color: "#6f42c1",
        isProtected: true,
        allowMaterials: true,
      }).unwrap();

      const grandchildId = grandchildFolder.data._id;
      setDemoState(prev => ({ ...prev, grandchildId }));

      toast({
        title: "Hierarchy Created!",
        description: "3-level folder hierarchy created successfully matching API spec.",
      });

      // Refetch data to show updates
      refetchFolders();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create folder hierarchy",
        variant: "destructive",
      });
    }
  };

  // Demo: Try to create Level 3 folder (should fail)
  const attemptLevel3Creation = async () => {
    if (!demoState.grandchildId) {
      toast({
        title: "Error",
        description: "Please create the demo hierarchy first",
        variant: "destructive",
      });
      return;
    }

    try {
      // This should fail because we're trying to create Level 3
      await createGrandchildFolder({
        name: "Instagram Content",
        description: "Instagram-specific content and templates", 
        parentFolder: demoState.grandchildId!,
      }).unwrap();
    } catch (error: any) {
      toast({
        title: "Expected Error",
        description: error?.data?.message || "Maximum hierarchy depth exceeded (as expected)",
        variant: "default",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Folder API Demo</h2>
        <p className="text-muted-foreground">
          Demonstrates the 3-level folder hierarchy API as specified
        </p>
      </div>

      {/* Demo Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={createDemoHierarchy} 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? "Creating..." : "Create Demo Hierarchy (Parent → Child → Grandchild)"}
          </Button>
          
          <Button 
            variant="outline"
            onClick={attemptLevel3Creation}
            disabled={!demoState.grandchildId}
            className="w-full"
          >
            Try Creating Level 3 (Should Fail)
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All Folders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              All Folders (GET /api/folders)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {foldersData?.data && foldersData.data.length > 0 ? (
              <div className="space-y-2">
                {foldersData.data.map((folder) => (
                  <div key={folder._id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{folder.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {folder.fullPath}
                        </p>
                      </div>
                      <Badge variant={
                        folder.folderType === 'parent' ? 'default' :
                        folder.folderType === 'child' ? 'secondary' :
                        'outline'
                      }>
                        Level {folder.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No folders yet. Create the demo hierarchy!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Material Folders Only */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Material Folders (GET /api/folders/for-materials)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {materialFoldersData?.data && materialFoldersData.data.length > 0 ? (
              <div className="space-y-2">
                {materialFoldersData.data.map((folder) => (
                  <div key={folder._id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{folder.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {folder.fullPath}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        Can Store Materials
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No material folders yet. Only Level 2 folders can store materials.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Folder Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Folder Tree (GET /api/folders?view=tree)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {folderTreeData?.data ? (
              <pre className="text-xs overflow-auto max-h-60 bg-muted p-3 rounded">
                {JSON.stringify(folderTreeData.data, null, 2)}
              </pre>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No tree data available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Folder Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Folder Stats (GET /api/folders/stats)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {folderStatsData?.data ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Overview</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Total: {folderStatsData.data.overview?.totalFolders || 0}</span>
                    <span>Materials: {folderStatsData.data.overview?.totalMaterials || 0}</span>
                    <span>Parents: {folderStatsData.data.overview?.parentFolders || 0}</span>
                    <span>Children: {folderStatsData.data.overview?.childFolders || 0}</span>
                    <span>Grandchildren: {folderStatsData.data.overview?.grandchildFolders || 0}</span>
                  </div>
                </div>
                
                {folderStatsData.data.levelDistribution && (
                  <div>
                    <p className="text-sm font-medium">Level Distribution</p>
                    <div className="flex gap-2">
                      {folderStatsData.data.levelDistribution.map((level) => (
                        <Badge key={level._id} variant="outline">
                          L{level._id}: {level.count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No stats available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* API Structure Info */}
      <Card>
        <CardHeader>
          <CardTitle>Key API Structure Points</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div>
            <p className="font-medium">✅ Field Mapping:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>Uses <code>_id</code> for MongoDB document ID</li>
              <li>Uses <code>parentFolder</code> (not parentId) for API requests</li>
              <li>Auto-generates <code>slug</code> and <code>fullPath</code></li>
              <li>Includes <code>folderType</code>: parent/child/grandchild</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <p className="font-medium">✅ Hierarchy Rules:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li><strong>Level 0 (Parent):</strong> canHaveSubfolders=true, canHaveMaterials=false</li>
              <li><strong>Level 1 (Child):</strong> canHaveSubfolders=true, canHaveMaterials=false</li>
              <li><strong>Level 2 (Grandchild):</strong> canHaveSubfolders=false, canHaveMaterials=true</li>
              <li>Maximum 3 levels enforced by API</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <p className="font-medium">✅ Material Storage:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>Only Level 2 (Grandchild) folders can contain materials</li>
              <li><code>GET /api/folders/for-materials</code> returns only Level 2 folders</li>
              <li>Material upload requires folder at Level 2</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FolderApiDemo;