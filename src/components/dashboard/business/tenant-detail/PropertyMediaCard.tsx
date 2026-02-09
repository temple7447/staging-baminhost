import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaUpload } from '@/components/ui/MediaUpload';
import { PropertyMediaDisplay } from '@/components/ui/PropertyMediaDisplay';

interface PropertyMediaCardProps {
  tenantId?: string;
  history: any[];
}

export const PropertyMediaCard = ({ tenantId, history }: PropertyMediaCardProps) => {
  const [propertyMedia, setPropertyMedia] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  const handleMediaUpload = async (files: any[]) => {
    console.log('Uploaded files:', files);
    const newMedia = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: file.preview,
      type: file.type,
      filename: file.file.name,
      uploadedAt: new Date().toISOString()
    }));
    setPropertyMedia(prev => [...prev, ...newMedia]);
  };

  const getHistoryMedia = () => {
    const movedInEntries = history.filter(h => h.action === 'moved_in' || (h as any).event === 'moved_in');
    const photos: { url: string; public_id: string }[] = [];
    const videos: { url: string; public_id: string }[] = [];

    movedInEntries.forEach(entry => {
      const meta = (entry as any).meta;
      if (meta?.photos) {
        photos.push(...meta.photos);
      }
      if (meta?.videos) {
        videos.push(...meta.videos);
      }
    });

    return { photos, videos };
  };

  const historyMedia = getHistoryMedia();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Property Media</CardTitle>
            <CardDescription>Initial property state documentation</CardDescription>
          </div>
          <MediaUpload
            tenantId={tenantId}
            onUpload={handleMediaUpload}
            maxImages={12}
            maxVideos={1}
          />
        </div>
      </CardHeader>
      <CardContent>
        <PropertyMediaDisplay
          media={propertyMedia}
          historyMedia={historyMedia}
          isLoading={mediaLoading}
        />
      </CardContent>
    </Card>
  );
};
