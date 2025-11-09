import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PropertyMediaSkeleton } from '@/components/ui/skeletons';
import { Image, Video, ZoomIn, Play } from 'lucide-react';

interface MediaItem {
  id?: string;
  url: string;
  type: 'image' | 'video';
  filename?: string;
  uploadedAt?: string;
  public_id?: string;
}

interface PropertyMediaDisplayProps {
  media?: MediaItem[];
  historyMedia?: {
    photos?: { url: string; public_id: string }[];
    videos?: { url: string; public_id: string }[];
  };
  isLoading?: boolean;
  className?: string;
}

export const PropertyMediaDisplay = ({ 
  media = [], 
  historyMedia,
  isLoading = false,
  className = "" 
}: PropertyMediaDisplayProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (isLoading) {
    return <PropertyMediaSkeleton />;
  }

  // Combine legacy media with history media
  const allImages = [
    ...media.filter(item => item.type === 'image'),
    ...(historyMedia?.photos?.map(photo => ({
      url: photo.url,
      type: 'image' as const,
      public_id: photo.public_id,
      id: photo.public_id
    })) || [])
  ];
  
  const allVideos = [
    ...media.filter(item => item.type === 'video'),
    ...(historyMedia?.videos?.map(video => ({
      url: video.url,
      type: 'video' as const,
      public_id: video.public_id,
      id: video.public_id
    })) || [])
  ];

  if (allImages.length === 0 && allVideos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <Image className="w-12 h-12 opacity-50" />
          <p>No property media uploaded yet.</p>
          <p className="text-sm">Upload images and video to document the initial property state.</p>
        </div>
      </div>
    );
  }

  const images = allImages;
  const videos = allVideos;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Images Section */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image className="w-4 h-4" />
            <Label className="text-sm font-medium">
              Property Images ({images.length})
            </Label>
            <Badge variant="secondary" className="text-xs">
              Initial State
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {images.map((item) => (
              <div key={item.id} className="relative group cursor-pointer">
                <img
                  src={item.url}
                  alt="Property"
                  className="w-full h-20 object-cover rounded border hover:border-primary transition-colors"
                  onClick={() => setSelectedImage(item.url)}
                />
                <div className="absolute inset-0 bg-black/20 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Video className="w-4 h-4" />
            <Label className="text-sm font-medium">
              Property Video ({videos.length})
            </Label>
            <Badge variant="secondary" className="text-xs">
              Initial State
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {videos.map((item) => (
              <div key={item.id} className="relative">
                <video
                  src={item.url}
                  className="w-full h-40 object-cover rounded border"
                  controls
                  poster="" // You might want to add poster/thumbnail
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Video
                  </Badge>
                </div>
                {item.filename && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {item.filename}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Property Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center">
              <img
                src={selectedImage}
                alt="Property"
                className="max-h-[70vh] object-contain rounded"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Total: {images.length} image{images.length !== 1 ? 's' : ''} and {videos.length} video{videos.length !== 1 ? 's' : ''} documenting initial property condition.
        </p>
      </div>
    </div>
  );
};