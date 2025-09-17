import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Video,
  Headphones,
  Image,
  Type,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  Calendar,
  User,
  Tag,
  ExternalLink,
  Play,
  FileIcon,
  AlertCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { Material } from '@/types/materials';
import { 
  useGetMaterialQuery, 
  useUpdateMaterialViewMutation,
  useDownloadMaterialMutation
} from '@/services/materialsApi';
import { YouTubePlayer } from './YouTubePlayer';

interface MaterialDetailProps {
  materialId: string;
  onEdit?: (materialId: string) => void;
  onDelete?: (materialId: string) => void;
  onClose?: () => void;
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

const ROI_COLORS = {
  low: 'bg-yellow-100 text-yellow-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-green-100 text-green-800',
};

const TIME_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const MaterialDetail: React.FC<MaterialDetailProps> = ({
  materialId,
  onEdit,
  onDelete,
  onClose,
  className = ''
}) => {
  const { toast } = useToast();
  const [hasTrackedView, setHasTrackedView] = useState(false);
  
  const {
    data: materialResponse,
    isLoading,
    error,
    refetch
  } = useGetMaterialQuery(materialId);

  const [updateView] = useUpdateMaterialViewMutation();
  const [downloadMaterial, { isLoading: isDownloading }] = useDownloadMaterialMutation();

  const material = materialResponse?.data;

  // Track view when component mounts
  useEffect(() => {
    if (material && !hasTrackedView) {
      updateView(materialId)
        .unwrap()
        .then(() => {
          setHasTrackedView(true);
        })
        .catch((error) => {
          console.warn('Failed to track view:', error);
        });
    }
  }, [material, materialId, updateView, hasTrackedView]);

  const getMaterialIcon = (materialType: string) => {
    const Icon = MATERIAL_TYPE_ICONS[materialType as keyof typeof MATERIAL_TYPE_ICONS];
    return Icon ? <Icon className="h-5 w-5" /> : <FileText className="h-5 w-5" />;
  };

  const getMaterialTypeColor = (materialType: string) => {
    return MATERIAL_TYPE_COLORS[materialType as keyof typeof MATERIAL_TYPE_COLORS] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const handleDownload = async () => {
    if (!material?.fileUrl) return;

    try {
      const result = await downloadMaterial(materialId).unwrap();
      
      if (result.downloadUrl) {
        // Open download URL in new tab
        window.open(result.downloadUrl, '_blank');
      } else if (material.fileUrl) {
        // Fallback to direct file URL
        window.open(material.fileUrl, '_blank');
      }

      toast({
        title: "Download Started",
        description: "Your file download has started.",
      });

      // Refetch to update download count
      refetch();
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error?.data?.message || "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const handleVideoPlay = () => {
    // Video play is now handled by the YouTubePlayer component
    return;
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load material</h3>
          <p className="text-muted-foreground text-center mb-4">
            There was an error loading the material details.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
            {onClose && (
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !material) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className={`p-3 rounded-lg ${getMaterialTypeColor(material.materialType)}`}>
                {getMaterialIcon(material.materialType)}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-2xl">{material.title}</CardTitle>
                <CardDescription className="mt-2">
                  {material.description || 'No description available'}
                </CardDescription>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="outline">
                    {material.materialType}
                  </Badge>
                  <Badge className={ROI_COLORS[material.expectedROI as keyof typeof ROI_COLORS] || 'bg-gray-100 text-gray-800'}>
                    {material.expectedROI} ROI
                  </Badge>
                  <Badge className={TIME_COLORS[material.timeRequirement as keyof typeof TIME_COLORS] || 'bg-gray-100 text-gray-800'}>
                    {material.timeRequirement} time
                  </Badge>
                  {material.isFeatured && (
                    <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {material.fileUrl && material.materialType !== 'video' && (
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Download
                </Button>
              )}
              {material.fileUrl && material.materialType === 'video' && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Video player below
                </div>
              )}
              {onEdit && (
                <Button variant="outline" onClick={() => onEdit(material._id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="outline" 
                  onClick={() => onDelete(material._id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              {onClose && (
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Preview/Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileIcon className="h-5 w-5" />
                File Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {material.fileUrl && material.materialType === 'video' && (
                <YouTubePlayer
                  videoUrl={material.fileUrl}
                  title={material.title}
                  height="400px"
                  showControls={true}
                  onPlay={() => {
                    // Track video play analytics
                    console.log('Video played:', material.title);
                  }}
                  onError={(error) => {
                    console.error('Video error:', error);
                  }}
                />
              )}

              {material.originalFileName && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">{material.originalFileName}</div>
                      <div className="text-sm text-muted-foreground">
                        {material.fileSize && formatFileSize(material.fileSize)}
                        {material.mimeType && ` • ${material.mimeType}`}
                      </div>
                    </div>
                  </div>
                  {material.fileUrl && (
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {material.fileUrl && material.materialType === 'video' && !material.originalFileName && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-8 w-8 text-red-600" />
                    <div>
                      <div className="font-medium">Video Content</div>
                      <div className="text-sm text-muted-foreground">
                        External video link
                        {material.duration && ` • ${formatDuration(material.duration)}`}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleVideoPlay}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Additional File Metadata */}
              <div className="grid grid-cols-2 gap-4">
                {material.pageCount && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{material.pageCount}</div>
                    <div className="text-sm text-muted-foreground">Pages</div>
                  </div>
                )}
                {material.duration && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatDuration(material.duration)}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags and Keywords */}
          {(material.tags.length > 0 || material.keywords.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags & Keywords
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {material.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {material.keywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{material.viewCount}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{material.downloadCount}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </div>
              
              {material.averageRating > 0 && (
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{material.averageRating.toFixed(1)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {material.ratingCount} rating{material.ratingCount !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Information */}
          {material.categoryInfo && material.categoryInfo.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                {material.categoryInfo.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="text-sm font-semibold">
                        {category.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {category.level} • {category.materialCount} materials
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portfolio:</span>
                <Badge variant="outline">{material.relatedPortfolio}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manager Role:</span>
                <Badge variant="outline">{material.relatedManagerRole}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visibility:</span>
                <Badge variant={material.visibility === 'public' ? 'default' : 'secondary'}>
                  {material.visibility}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={material.status === 'active' ? 'default' : 'destructive'}>
                  {material.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="font-mono text-sm">{material.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority:</span>
                <span>{material.priority}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="text-sm">
                  {new Date(material.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated:</span>
                <span className="text-sm">
                  {new Date(material.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};