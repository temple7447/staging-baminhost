import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Video, 
  Headphones, 
  Image, 
  Type,
  Upload,
  Link,
  X,
  Loader2,
  Plus
} from 'lucide-react';
import { MaterialFormData, MaterialType } from '@/types/materials';
import { useCreateMaterialMutation } from '@/services/materialsApi';
import { useAuth } from '@/contexts/AuthContext';
import { useGetRootFoldersQuery } from '@/services/foldersApi';

interface AddMaterialModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  folderId?: string; // Optional pre-selected folder ID
}

const MATERIAL_TYPE_OPTIONS = [
  {
    value: 'document',
    label: 'Document',
    icon: FileText,
    description: 'PDF, Word, Excel, PowerPoint files',
    supportedFormats: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  },
  {
    value: 'video',
    label: 'Video',
    icon: Video,
    description: 'YouTube, Vimeo, or direct video links',
    supportedFormats: ['YouTube URL', 'Vimeo URL', 'Direct video links']
  },
  {
    value: 'audio',
    label: 'Audio',
    icon: Headphones,
    description: 'Audio files for training materials',
    supportedFormats: ['.mp3', '.wav', '.m4a', '.aac']
  },
  {
    value: 'image',
    label: 'Image',
    icon: Image,
    description: 'Diagrams, charts, infographics',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.svg']
  },
  {
    value: 'text',
    label: 'Text',
    icon: Type,
    description: 'Plain text content or notes',
    supportedFormats: ['Plain text input']
  }
];

const PORTFOLIO_OPTIONS = [
  { value: 'personal', label: 'Personal Portfolio' },
  { value: 'business', label: 'Business Portfolio' },
  { value: 'estate', label: 'Estate Management' },
  { value: 'equipment', label: 'Equipment Portfolio' },
  { value: 'investments', label: 'Investments' },
  { value: 'other', label: 'Other Portfolio' }
];

const MANAGER_ROLE_OPTIONS = [
  { value: 'operations', label: 'Operations' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'finance', label: 'Finance' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'legal', label: 'Legal' },
  { value: 'automation', label: 'Automation' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'leadership', label: 'Leadership' }
];

const TARGET_AUDIENCE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'customer', label: 'Customer' }
];

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  folderId
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [createMaterial, { isLoading }] = useCreateMaterialMutation();
  const { data: rootFoldersResponse } = useGetRootFoldersQuery();
  
  const rootFolders = rootFoldersResponse?.data || [];
  
  // Get all child folders (level 1) for material upload
  const getChildFolders = () => {
    const childFolders: any[] = [];
    rootFolders.forEach(rootFolder => {
      if (rootFolder.subfolders) {
        rootFolder.subfolders.forEach((childFolder: any) => {
          if (childFolder.level === 1) {
            childFolders.push({
              ...childFolder,
              fullPath: `${rootFolder.name}/${childFolder.name}`
            });
          }
        });
      }
    });
    return childFolders;
  };
  
  const childFolders = getChildFolders();



  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    materialType: 'document',
    folder: folderId || '', // Use provided folderId or empty string
    relatedPortfolio: 'business',
    relatedManagerRole: 'operations',
    expectedROI: 'medium',
    timeRequirement: 'medium',
    tags: '',
    keywords: '',
    visibility: 'public',
    priority: '0',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setFormData({
        title: '',
        description: '',
        materialType: 'document',
        folder: folderId || '',
        tags: '',
        keywords: '',
        videoUrl: '',
        relatedPortfolio: 'business',
        relatedManagerRole: 'operations',
        expectedROI: 'medium',
        timeRequirement: 'medium',
        visibility: 'public',
        priority: '0',
      });
      setSelectedFile(null);
      setTagsArray([]);
    } else {
      // When opening, set folder if provided
      if (folderId) {
        setFormData(prev => ({ ...prev, folder: folderId }));
      }
    }
  }, [open, folderId]);

  const handleInputChange = (field: keyof MaterialFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMaterialTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      materialType: value,
      videoUrl: '',
    }));
    setSelectedFile(null);
  };

  const handleFileSelect = (file: File) => {
    const selectedType = MATERIAL_TYPE_OPTIONS.find(type => type.value === formData.materialType);
    
    if (selectedType && formData.materialType !== 'video' && formData.materialType !== 'text') {
      setSelectedFile(file);
      if (!formData.title) {
        setFormData(prev => ({
          ...prev,
          title: file.name.split('.')[0]
        }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleTagsChange = (value: string) => {
    setFormData(prev => ({ ...prev, tags: value }));
    
    // Parse tags from comma-separated string
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setTagsArray(tags);
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tagsArray.filter(tag => tag !== tagToRemove);
    setTagsArray(updatedTags);
    setFormData(prev => ({ ...prev, tags: updatedTags.join(', ') }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.folder?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select a folder for this material",
        variant: "destructive",
      });
      return false;
    }

    // Validate that selected folder is a child folder (level 1)
    const selectedFolder = childFolders.find(f => f._id === formData.folder);
    if (!selectedFolder) {
      toast({
        title: "Validation Error",
        description: "Please select a valid child folder (level 1) for materials",
        variant: "destructive",
      });
      return false;
    }

    if (formData.materialType === 'video' && !formData.videoUrl?.trim()) {
      toast({
        title: "Validation Error",
        description: "Video URL is required for video materials",
        variant: "destructive",
      });
      return false;
    }

    if (['document', 'image', 'audio'].includes(formData.materialType) && !selectedFile) {
      toast({
        title: "Validation Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData: MaterialFormData = {
        ...formData,
        file: selectedFile || undefined,
      };

      await createMaterial(submitData).unwrap();
      
      toast({
        title: "Success",
        description: "Material has been added successfully!",
      });

      onSuccess?.();
      onOpenChange?.(false);
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to create material';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const selectedMaterialType = MATERIAL_TYPE_OPTIONS.find(type => type.value === formData.materialType);
  const requiresFile = ['document', 'image', 'audio'].includes(formData.materialType);
  const requiresVideoUrl = formData.materialType === 'video';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>
            Upload and organize your knowledge base content with appropriate categorization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter material title"
                required
              />
            </div>
            
            {/* Remove category selection */}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter material description"
                rows={3}
              />
            </div>

            {/* Folder Selection */}
            <div className="space-y-2">
              <Label htmlFor="folder">Target Folder *</Label>
              {childFolders.length > 0 ? (
                <Select 
                  value={formData.folder} 
                  onValueChange={(value) => handleInputChange('folder', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a folder for this material" />
                  </SelectTrigger>
                  <SelectContent>
                    {childFolders.map((folder) => (
                      <SelectItem key={folder._id} value={folder._id}>
                        {folder.fullPath}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    No child folders available. Materials can only be uploaded to child folders. 
                    Please create a parent folder first, then create a child folder.
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Materials can only be uploaded to child folders
              </p>
            </div>
          </div>

          {/* Material Type Selection */}
          <div className="space-y-3">
            <Label>Material Type *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MATERIAL_TYPE_OPTIONS.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.materialType === type.value;
                
                return (
                  <Card 
                    key={type.value}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleMaterialTypeChange(type.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                        <div>
                          <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                            {type.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {selectedMaterialType && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <strong>Supported formats:</strong> {selectedMaterialType.supportedFormats.join(', ')}
              </div>
            )}
          </div>

          {/* Content Input Based on Type */}
          {requiresFile && (
            <div className="space-y-2">
              <Label>File Upload *</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto h-8 w-8 text-green-600" />
                    <div className="text-sm font-medium">{selectedFile.name}</div>
                    <div className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      Drop your file here or{' '}
                      <label className="text-blue-600 cursor-pointer hover:underline">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file);
                          }}
                          accept={selectedMaterialType?.supportedFormats.join(',') || '*'}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {requiresVideoUrl && (
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL *</Label>
              <div className="relative">
                <Link className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords || ''}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              placeholder="Enter keywords separated by commas"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., strategy, product, design)"
            />
            {tagsArray.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tagsArray.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Portfolio</Label>
              <Select 
                value={formData.relatedPortfolio} 
                onValueChange={(value) => handleInputChange('relatedPortfolio', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PORTFOLIO_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Manager Role</Label>
              <Select 
                value={formData.relatedManagerRole} 
                onValueChange={(value) => handleInputChange('relatedManagerRole', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MANAGER_ROLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expected ROI</Label>
              <Select 
                value={formData.expectedROI || 'medium'} 
                onValueChange={(value) => handleInputChange('expectedROI', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low ROI</SelectItem>
                  <SelectItem value="medium">Medium ROI</SelectItem>
                  <SelectItem value="high">High ROI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Requirement</Label>
              <Select 
                value={formData.timeRequirement || 'medium'} 
                onValueChange={(value) => handleInputChange('timeRequirement', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick Time</SelectItem>
                  <SelectItem value="medium">Medium Time</SelectItem>
                  <SelectItem value="deep_study">Deep Study</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Material...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Material
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};