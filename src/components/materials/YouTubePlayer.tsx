import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ExternalLink,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface YouTubePlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  showControls?: boolean;
  height?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: string) => void;
}

// Extract YouTube video ID from various YouTube URL formats
const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|www\.youtube\.com\/watch\?v=|youtube\.com\/watch\?v=|youtu\.be\/)([^#\&\?]*).*/,
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[2] && match[2].length === 11) {
      return match[2];
    }
  }
  
  return null;
};

// Generate YouTube embed URL with parameters
const generateEmbedUrl = (
  videoId: string, 
  autoplay = false, 
  controls = true,
  mute = false,
  loop = false,
  modestbranding = true
): string => {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: controls ? '1' : '0',
    mute: mute ? '1' : '0',
    loop: loop ? '1' : '0',
    modestbranding: modestbranding ? '1' : '0',
    rel: '0', // Don't show related videos from other channels
    fs: '1', // Allow fullscreen
    cc_load_policy: '0', // Don't show captions by default
    iv_load_policy: '3', // Don't show video annotations
    playsinline: '1', // Play inline on mobile
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

// Get YouTube video thumbnail
const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  title,
  className = '',
  autoplay = false,
  showControls = true,
  height = '400px',
  onPlay,
  onPause,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);

  const videoId = extractYouTubeVideoId(videoUrl);
  
  useEffect(() => {
    if (!videoId) {
      setHasError(true);
      onError?.('Invalid YouTube URL');
    }
  }, [videoId, onError]);

  const handlePlayClick = () => {
    setShowPlayer(true);
    setIsPlaying(true);
    onPlay?.();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.('Failed to load YouTube video');
  };

  const openInYouTube = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  if (!videoId || hasError) {
    return (
      <Card className={`${className}`}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Invalid YouTube Video</h3>
          <p className="text-red-600 text-center mb-4">
            The provided URL is not a valid YouTube video link.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openInYouTube}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Original Link
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const embedUrl = generateEmbedUrl(videoId, autoplay, showControls, isMuted);
  const thumbnailUrl = getYouTubeThumbnail(videoId, 'maxresdefault');

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0 relative">
        {/* Video Title */}
        {title && (
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">
                YouTube Video
              </Badge>
              <Badge variant="outline" className="text-xs">
                ID: {videoId}
              </Badge>
            </div>
          </div>
        )}

        {/* Video Player Container */}
        <div 
          className="relative bg-black"
          style={{ height, minHeight: '300px' }}
        >
          {!showPlayer ? (
            // Thumbnail with play button overlay
            <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayClick}>
              <img
                src={thumbnailUrl}
                alt={title || 'YouTube Video Thumbnail'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to default thumbnail if maxres doesn't exist
                  e.currentTarget.src = getYouTubeThumbnail(videoId, 'hqdefault');
                }}
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                {/* Play button */}
                <div className="bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-full p-4 transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Video duration badge (if we had it) */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                Click to Play
              </div>
            </div>
          ) : (
            // YouTube iframe player
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-2" />
                    <p className="text-white text-sm">Loading video...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={embedUrl}
                title={title || 'YouTube Video Player'}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          )}
        </div>

        {/* Custom Controls (if enabled) */}
        {showControls && (
          <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
            <div className="flex items-center gap-2">
              {showPlayer ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    isPlaying ? onPause?.() : onPlay?.();
                  }}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handlePlayClick}>
                  <Play className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <div className="text-sm text-gray-600">
                YouTube Player
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={openInYouTube}
                title="Open in YouTube"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              
              {showPlayer && (
                <Button
                  variant="ghost"
                  size="sm"
                  title="Fullscreen"
                  onClick={() => {
                    // The iframe's allowFullScreen will handle this
                  }}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Video Info Footer */}
        <div className="p-3 bg-gray-100 text-xs text-gray-600 border-t">
          <div className="flex items-center justify-between">
            <span>Embedded from YouTube</span>
            <span className="font-mono">youtube.com/watch?v={videoId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};