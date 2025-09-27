import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetRootFoldersQuery, useGetFolderContentsQuery } from '@/services/foldersApi';

interface FolderNavigationDebugProps {
  currentFolderId: string | null;
  onFolderClick: (folder: any) => void;
  onBackClick: () => void;
}

export const FolderNavigationDebug: React.FC<FolderNavigationDebugProps> = ({
  currentFolderId,
  onFolderClick,
  onBackClick,
}) => {
  // Fetch data based on current state
  const { data: rootFoldersData, isLoading: isLoadingRoot } = useGetRootFoldersQuery(
    {}, 
    { skip: !!currentFolderId }
  );
  
  const { data: folderContentsData, isLoading: isLoadingContents } = useGetFolderContentsQuery(
    { folderId: currentFolderId!, includeMaterials: true, includeStats: true },
    { skip: !currentFolderId }
  );

  const folders = currentFolderId ? 
    folderContentsData?.data?.subFolders || [] : 
    rootFoldersData?.data || [];
  
  const materials = currentFolderId ? 
    folderContentsData?.data?.materials || [] : 
    [];

  const currentFolder = currentFolderId ? folderContentsData?.data?.folder : null;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Navigation Debug</span>
          <div className="flex gap-2">
            {currentFolderId && (
              <Button variant="outline" size="sm" onClick={onBackClick}>
                ← Back
              </Button>
            )}
            <Badge variant="secondary">
              {currentFolderId ? 'Inside Folder' : 'Root Level'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current State */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Current State:</h4>
          <div className="text-sm space-y-1">
            <div><strong>Current Folder ID:</strong> {currentFolderId || 'null (root)'}</div>
            {currentFolder && (
              <>
                <div><strong>Current Folder Name:</strong> {currentFolder.name}</div>
                <div><strong>Current Folder Level:</strong> {currentFolder.level}</div>
                <div><strong>Full Path:</strong> {currentFolder.fullPath}</div>
              </>
            )}
            <div><strong>Folders Count:</strong> {folders.length}</div>
            <div><strong>Materials Count:</strong> {materials.length}</div>
            <div><strong>Loading:</strong> {isLoadingRoot || isLoadingContents ? 'Yes' : 'No'}</div>
          </div>
        </div>

        {/* Available Folders */}
        {folders.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">
              {currentFolderId ? 'Subfolders:' : 'Root Folders:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {folders.map((folder: any) => (
                <Card 
                  key={folder._id || folder.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    console.log('Debug: Clicking folder', folder);
                    onFolderClick(folder);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{folder.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {folder._id || folder.id}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Level: {folder.level}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {folder.folderType || `L${folder.level}`}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Materials */}
        {materials.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Materials:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {materials.map((material: any) => (
                <Card key={material._id || material.id}>
                  <CardContent className="p-3">
                    <div className="font-medium">{material.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Type: {material.materialType}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingRoot && !isLoadingContents && folders.length === 0 && materials.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {currentFolderId ? 'This folder is empty' : 'No folders found'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};