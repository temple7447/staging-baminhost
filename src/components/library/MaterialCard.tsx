import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Video, 
  Headphones, 
  Image, 
  Download, 
  Eye, 
  Calendar,
  User
} from 'lucide-react';
import { format } from 'date-fns';

interface Material {
  _id: string;
  title: string;
  fileSize: number;
  fileType: string;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  slug: string;
  fileCategory: string;
  id: string;
}

interface MaterialCardProps {
  material: Material;
  onView?: (material: Material) => void;
  onDownload?: (material: Material) => void;
}

const getFileIcon = (fileType: string, fileCategory: string) => {
  switch (fileCategory?.toLowerCase() || fileType?.toLowerCase()) {
    case 'video':
    case 'mp4':
    case 'avi':
    case 'mov':
      return <Video className="h-5 w-5 text-red-500" />;
    case 'audio':
    case 'mp3':
    case 'wav':
    case 'm4a':
      return <Headphones className="h-5 w-5 text-green-500" />;
    case 'image':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image className="h-5 w-5 text-purple-500" />;
    case 'document':
    case 'pdf':
    case 'doc':
    case 'docx':
    default:
      return <FileText className="h-5 w-5 text-blue-500" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileTypeColor = (fileType: string) => {
  switch (fileType?.toLowerCase()) {
    case 'pdf':
      return 'bg-red-100 text-red-800';
    case 'doc':
    case 'docx':
      return 'bg-blue-100 text-blue-800';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'bg-purple-100 text-purple-800';
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'bg-orange-100 text-orange-800';
    case 'mp3':
    case 'wav':
    case 'm4a':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const MaterialCard: React.FC<MaterialCardProps> = ({ 
  material, 
  onView, 
  onDownload 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {getFileIcon(material.fileType, material.fileCategory)}
            <div className="flex-1">
              <CardTitle className="text-sm font-medium line-clamp-2 mb-2">
                {material.title}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getFileTypeColor(material.fileType)}`}
                >
                  {material.fileType?.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {formatFileSize(material.fileSize)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{material.viewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{material.downloadCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(material.createdAt), 'MMM d, yyyy')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onView?.(material)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onDownload?.(material)}
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};