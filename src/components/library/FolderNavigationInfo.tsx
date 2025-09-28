import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ChevronRight, 
  Folder, 
  FileText, 
  Info,
  ArrowLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FolderNavigationInfoProps {
  currentFolderId: string | null;
  folderData?: {
    name: string;
    level: number;
    fullPath: string;
    folderType: 'parent' | 'child';
    materialCount: number;
    subfolderCount: number;
    canHaveSubfolders: boolean;
    canHaveMaterials: boolean;
  };
  onBack: () => void;
  className?: string;
}

const getLevelInfo = (level: number) => {
  switch (level) {
    case 0:
      return {
        name: 'Parent Folder',
        description: 'Root-level container (can have sub-categories, no materials)',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700'
      };
    case 1:
      return {
        name: 'Child Folder',
        description: 'Sub-category (can have material folders, no materials)',
        color: 'bg-green-50 text-green-700 border-green-200',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700'
      };
    case 2:
      return {
        description: 'Material folder (can contain materials, no subfolders)',
        color: 'bg-orange-50 text-orange-700 border-orange-200',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700'
      };
    default:
      return {
        name: 'Unknown',
        description: 'Unknown level',
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700'
      };
  }
};

export const FolderNavigationInfo: React.FC<FolderNavigationInfoProps> = ({
  currentFolderId,
  folderData,
  onBack,
  className
}) => {
  if (!currentFolderId || !folderData) {
    return (
      <Card className={cn('mb-4', className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Knowledge Library</span>
              <Badge variant="secondary">Root Level</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              📁 Browse parent folders to organize your library
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const levelInfo = getLevelInfo(folderData.level);
  const pathParts = folderData.fullPath.split('/');

  return (
    <Card className={cn('mb-4 border-l-4', levelInfo.color.includes('blue') ? 'border-l-blue-500' : 
                       levelInfo.color.includes('green') ? 'border-l-green-500' : 'border-l-orange-500', className)}>
      <CardContent className="p-4">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center space-x-2">
              <Folder className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">{folderData.name}</span>
              <Badge className={levelInfo.color}>
                {levelInfo.name}
              </Badge>
            </div>
          </div>
          
          {/* Folder stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Folder className="h-4 w-4" />
              <span>{folderData.subfolderCount} folders</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{folderData.materialCount} materials</span>
            </div>
          </div>
        </div>

        {/* Full path breadcrumb */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
          <Home className="h-4 w-4" />
          <span>Library</span>
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-3 w-3" />
              <span className={index === pathParts.length - 1 ? 'font-medium text-foreground' : ''}>
                {part}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Level information and capabilities */}
        <div className={cn('p-3 rounded-lg flex items-start space-x-3', levelInfo.bgColor)}>
          <Info className={cn('h-4 w-4 mt-0.5', levelInfo.textColor)} />
          <div className="flex-1">
            <p className={cn('text-sm font-medium', levelInfo.textColor)}>
              {levelInfo.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {folderData.canHaveSubfolders && (
                <Badge variant="outline" className="text-xs">
                  ✓ Can create subfolders
                </Badge>
              )}
              {folderData.canHaveMaterials && (
                <Badge variant="outline" className="text-xs">
                  ✓ Can store materials
                </Badge>
              )}
              {!folderData.canHaveSubfolders && (
                <Badge variant="outline" className="text-xs opacity-60">
                  ✗ Cannot create subfolders
                </Badge>
              )}
              {!folderData.canHaveMaterials && (
                <Badge variant="outline" className="text-xs opacity-60">
                  ✗ Cannot store materials
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Navigation guidance */}
        <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
          {folderData.level === 0 && (
            <span>💡 Click on child folders to navigate deeper, or create new child folders here.</span>
          )}
          {folderData.level === 1 && (
            <span>💡 Click on grandchild folders to view materials, or create material folders here.</span>
          )}
          {folderData.level === 2 && (
            <span>💡 This is a material folder - you can upload and view files here.</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};