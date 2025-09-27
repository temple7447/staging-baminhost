import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  FolderOpen,
} from 'lucide-react';
import { useGetFoldersForMaterialsQuery } from '@/services/foldersApi';
import { useCreateMaterialMutation } from '@/services/materialsApi';
import { useToast } from '@/hooks/use-toast';
import { validateMaterialUpload } from '@/utils/folderValidation';
import type { Folder } from '@/types/folders';
import { cn } from '@/lib/utils';

interface MaterialUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedFolderId?: string | null;
  onSuccess?: () => void;
}

export const MaterialUploadModal: React.FC<MaterialUploadModalProps> = ({
  open,
  onOpenChange,
  preSelectedFolderId = null,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [createMaterial, { isLoading }] = useCreateMaterialMutation();
  const { data: foldersResponse, isLoading: isLoadingFolders } = useGetFoldersForMaterialsQuery();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materialType: '',
    category: '',
    folderId: preSelectedFolderId || '',
    relatedPortfolio: '',
    relatedManagerRole: '',
    tags: '',
    keywords: '',
    visibility: 'public',
    allowedRoles: '',
    priority: 'medium',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  
  const availableFolders = foldersResponse?.data || [];
  
  // Update selected folder when folderId changes
  useEffect(() => {
    if (formData.folderId) {
      const folder = availableFolders.find(f => f.id === formData.folderId);
      setSelectedFolder(folder || null);
    } else {
      setSelectedFolder(null);
    }
  }, [formData.folderId, availableFolders]);
  
  // Validate selected folder
  const folderValidation = selectedFolder ? validateMaterialUpload(selectedFolder) : null;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-detect material type based on file extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      let materialType = 'document';
      
      if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
        materialType = 'image';
      } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension || '')) {
        materialType = 'video';
      } else if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
        materialType = 'audio';
      } else if (['pdf'].includes(extension || '')) {
        materialType = 'pdf';
      } else if (['doc', 'docx', 'txt'].includes(extension || '')) {
        materialType = 'text';
      }
      
      setFormData(prev => ({ ...prev, materialType }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Material title is required.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.folderId) {
      toast({
        title: 'Error',
        description: 'Please select a folder for the material.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!selectedFile) {
      toast({
        title: 'Error', 
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate folder can accept materials
    if (folderValidation && !folderValidation.isValid) {
      toast({
        title: 'Cannot upload to this folder',
        description: folderValidation.message,
        variant: 'destructive',
      });
      return;
    }
    
    try {
      await createMaterial({
        title: formData.title,
        description: formData.description,
        materialType: formData.materialType,
        category: formData.category,
        folderId: formData.folderId,
        relatedPortfolio: formData.relatedPortfolio,
        relatedManagerRole: formData.relatedManagerRole,
        tags: formData.tags,
        keywords: formData.keywords,
        visibility: formData.visibility,
        allowedRoles: formData.allowedRoles,
        priority: formData.priority,
        file: selectedFile,
      }).unwrap();
      
      toast({
        title: 'Material uploaded',
        description: 'Your material has been uploaded successfully.',
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        materialType: '',
        category: '',
        folderId: preSelectedFolderId || '',
        relatedPortfolio: '',
        relatedManagerRole: '',
        tags: '',
        keywords: '',
        visibility: 'public',
        allowedRoles: '',
        priority: 'medium',
      });
      setSelectedFile(null);
      
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error?.data?.message || 'Failed to upload material. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      materialType: '',
      category: '',
      folderId: preSelectedFolderId || '',
      relatedPortfolio: '',
      relatedManagerRole: '',
      tags: '',
      keywords: '',
      visibility: 'public',
      allowedRoles: '',
      priority: 'medium',
    });
    setSelectedFile(null);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
          <DialogDescription>
            Upload materials to Level 2 (Grandchild) folders only. These are the deepest folders that can contain materials.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Folder Selection */}
          <div className="space-y-2">
            <Label htmlFor="folder">Target Folder *</Label>
            <Select value={formData.folderId} onValueChange={(value) => setFormData({ ...formData, folderId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a folder that can contain materials" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingFolders ? (
                  <SelectItem value="" disabled>Loading folders...</SelectItem>
                ) : availableFolders.length === 0 ? (
                  <SelectItem value="" disabled>No material folders available</SelectItem>
                ) : (
                  availableFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      <div className="flex items-center space-x-2">
                        <FolderOpen className="h-4 w-4" />
                        <span>{folder.fullPath}</span>
                        <Badge variant="outline" className="ml-2">
                          Level {folder.level}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            
            {/* Folder validation feedback */}
            {selectedFolder && (
              <div className="mt-2">
                {folderValidation?.isValid ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      ✅ This folder can accept materials
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      ❌ {folderValidation?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
          
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <>
                      <FileText className="w-8 h-8 mb-2 text-green-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">{selectedFile.name}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, IMG, VIDEO (MAX. 10MB)</p>
                    </>
                  )}
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mp3,.wav"
                />
              </label>
            </div>
          </div>
          
          {/* Material Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter material title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="materialType">Type</Label>
              <Select value={formData.materialType} onValueChange={(value) => setFormData({ ...formData, materialType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the material content"
              rows={3}
            />
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.folderId || !selectedFile || (folderValidation && !folderValidation.isValid)}
            >
              {isLoading ? 'Uploading...' : 'Upload Material'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};