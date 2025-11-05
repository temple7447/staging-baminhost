import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X, Upload, Image, Video, Eye } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface MediaUploadProps {
  onUpload?: (files: MediaFile[]) => void;
  maxImages?: number;
  maxVideos?: number;
  className?: string;
}

export const MediaUpload = ({ 
  onUpload, 
  maxImages = 12, 
  maxVideos = 1,
  className = "" 
}: MediaUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentImages = mediaFiles.filter(f => f.type === 'image').length;
    
    if (currentImages + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `Maximum ${maxImages} images allowed. You can upload ${maxImages - currentImages} more.`,
        variant: "destructive"
      });
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia: MediaFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            type: 'image'
          };
          setMediaFiles(prev => [...prev, newMedia]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentVideos = mediaFiles.filter(f => f.type === 'video').length;
    
    if (currentVideos + files.length > maxVideos) {
      toast({
        title: "Too many videos",
        description: `Maximum ${maxVideos} video allowed.`,
        variant: "destructive"
      });
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia: MediaFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            type: 'video'
          };
          setMediaFiles(prev => [...prev, newMedia]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const removeMedia = (id: string) => {
    setMediaFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (mediaFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one image or video to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onUpload) {
        onUpload(mediaFiles);
      }
      
      toast({
        title: "Media uploaded successfully",
        description: `${mediaFiles.length} file(s) uploaded for initial property state.`
      });
      
      setMediaFiles([]);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload media files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const images = mediaFiles.filter(f => f.type === 'image');
  const videos = mediaFiles.filter(f => f.type === 'video');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Property Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Initial Property State</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upload images (7-{maxImages}) and video ({maxVideos}) showing the property's initial condition before rental.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Image className="w-4 h-4 mr-2" />
                  Images ({images.length}/{maxImages})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  Select multiple images (JPG, PNG, WebP)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Video ({videos.length}/{maxVideos})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={uploading || videos.length >= maxVideos}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  Select one video file (MP4, WebM, MOV)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Media Preview */}
          {mediaFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Preview ({mediaFiles.length} files)</h3>
                <Badge variant="secondary">
                  Ready to upload
                </Badge>
              </div>

              {/* Images Preview */}
              {images.length > 0 && (
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Images ({images.length})
                  </Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {images.map((media) => (
                      <div key={media.id} className="relative group">
                        <img
                          src={media.preview}
                          alt="Preview"
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={uploading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Preview */}
              {videos.length > 0 && (
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Video ({videos.length})
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {videos.map((media) => (
                      <div key={media.id} className="relative group">
                        <video
                          src={media.preview}
                          className="w-full h-32 object-cover rounded border"
                          controls={false}
                          muted
                        />
                        <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={uploading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {media.file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => {
                setMediaFiles([]);
                setIsOpen(false);
              }}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading || mediaFiles.length === 0}
            >
              {uploading ? 'Uploading...' : `Upload ${mediaFiles.length} file(s)`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};