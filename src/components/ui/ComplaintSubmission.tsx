import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X, Upload, Image, Video, FileText, Clock, AlertTriangle } from 'lucide-react';

interface ComplaintMedia {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface ComplaintData {
  description: string;
  duration: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  image?: ComplaintMedia;
  video?: ComplaintMedia;
}

interface ComplaintSubmissionProps {
  onSubmit?: (complaint: ComplaintData) => void;
  className?: string;
}

export const ComplaintSubmission = ({ 
  onSubmit, 
  className = "" 
}: ComplaintSubmissionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ComplaintMedia | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ComplaintMedia | null>(null);
  
  // Form state
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [category, setCategory] = useState('');
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, WebP).",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newMedia: ComplaintMedia = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: e.target?.result as string,
        type: 'image'
      };
      setSelectedImage(newMedia);
    };
    reader.readAsDataURL(file);
    
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file (MP4, WebM, MOV).",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newMedia: ComplaintMedia = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: e.target?.result as string,
        type: 'video'
      };
      setSelectedVideo(newMedia);
    };
    reader.readAsDataURL(file);
    
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const removeVideo = () => {
    setSelectedVideo(null);
  };

  const resetForm = () => {
    setDescription('');
    setDuration('');
    setPriority('medium');
    setCategory('');
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of the issue.",
        variant: "destructive"
      });
      return;
    }

    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a complaint category.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const complaintData: ComplaintData = {
        description: description.trim(),
        duration: duration.trim(),
        priority,
        category,
        image: selectedImage || undefined,
        video: selectedVideo || undefined
      };

      if (onSubmit) {
        onSubmit(complaintData);
      }
      
      toast({
        title: "Complaint submitted",
        description: "Your complaint has been submitted successfully. You'll receive updates on progress."
      });
      
      resetForm();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <AlertTriangle className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Report Property Issue
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Submit a complaint or issue that needs attention. Include photos or videos for better understanding.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Issue Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Issue Category *</Label>
            <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">Heating/Cooling</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="structural">Structural</SelectItem>
                <SelectItem value="pest">Pest Control</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="maintenance">General Maintenance</SelectItem>
                <SelectItem value="noise">Noise Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={(v: any) => setPriority(v)} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-green-500 mr-2`}></div>
                    Low - Can wait
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-yellow-500 mr-2`}></div>
                    Medium - Soon
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-orange-500 mr-2`}></div>
                    High - Urgent
                  </div>
                </SelectItem>
                <SelectItem value="urgent">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-red-500 mr-2`}></div>
                    Emergency - Immediate
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail. Include what happened, when it started, and any other relevant information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Estimated Fix Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Estimated Fix Duration (Optional)
            </Label>
            <Select value={duration} onValueChange={setDuration} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="How long do you think this will take to fix?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate (same day)</SelectItem>
                <SelectItem value="1-2-days">1-2 days</SelectItem>
                <SelectItem value="3-7-days">3-7 days</SelectItem>
                <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                <SelectItem value="1-month">Up to 1 month</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Image className="w-4 h-4 mr-2" />
                  Attach Image (Optional)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Upload one image to help explain the issue.
                </p>
              </CardHeader>
              <CardContent>
                <Input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isSubmitting}
                  className="mb-3"
                />
                
                {/* Image Preview */}
                {selectedImage && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Selected Image</span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    
                    <div className="relative group">
                      <img
                        src={selectedImage.preview}
                        alt="Issue"
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isSubmitting}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {selectedImage.file.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Attach Video (Optional)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Upload one video to help explain the issue.
                </p>
              </CardHeader>
              <CardContent>
                <Input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={isSubmitting}
                  className="mb-3"
                />
                
                {/* Video Preview */}
                {selectedVideo && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Selected Video</span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    
                    <div className="relative group">
                      <video
                        src={selectedVideo.preview}
                        className="w-full h-24 object-cover rounded border"
                        muted
                        controls={false}
                      />
                      <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <button
                        onClick={removeVideo}
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isSubmitting}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {selectedVideo.file.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !description.trim() || !category}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};