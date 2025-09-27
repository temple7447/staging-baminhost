import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase,
  Book, 
  Users,
  Settings,
  Heart,
  Star,
  Home,
  Building,
  GraduationCap,
  Target,
  Shield,
  Camera,
  Music,
  Video,
  FileText,
  Image,
  Code,
  Database,
  Globe,
  Folder,
  Megaphone,
  Monitor,
  Mail,
  TrendingUp,
  PieChart,
  Layout,
  Smartphone,
  Headphones,
  Calendar,
  Clock,
} from 'lucide-react';
import { 
  useCreateParentFolderMutation,
  useCreateChildFolderMutation, 
  useCreateGrandchildFolderMutation,
  useGetFolderQuery 
} from '@/services/foldersApi';
import { useToast } from '@/hooks/use-toast';
import { FOLDER_ICONS, FOLDER_COLORS, type FolderIcon, type FolderColor } from '@/types/folders';
import { cn } from '@/lib/utils';
import {
  validateFolderCreation,
  getFolderCreationMessage,
  getLevelDescription,
  getSuggestedFolderIcon,
  getSuggestedFolderColor,
} from '@/utils/folderValidation';

interface CreateFolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  parentFolder?: string | null;
  folderType?: 'parent' | 'child' | 'grandchild';
}

const iconComponents: Record<FolderIcon, React.ElementType> = {
  folder: Folder,
  briefcase: Briefcase,
  book: Book,
  users: Users,
  settings: Settings,
  heart: Heart,
  star: Star,
  home: Home,
  building: Building,
  graduationCap: GraduationCap,
  target: Target,
  shield: Shield,
  camera: Camera,
  music: Music,
  video: Video,
  fileText: FileText,
  image: Image,
  code: Code,
  database: Database,
  globe: Globe,
  megaphone: Megaphone,
  monitor: Monitor,
  mail: Mail,
  trendingUp: TrendingUp,
  'pie-chart': PieChart,
  layout: Layout,
  smartphone: Smartphone,
  headphones: Headphones,
  calendar: Calendar,
  clock: Clock,
};

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  open,
  onOpenChange,
  parentFolder = null,
  folderType = 'parent',
  onSuccess,
}) => {
  const { toast } = useToast();
  
  // Specific folder creation mutations
  const [createParentFolder, { isLoading: isLoadingParent }] = useCreateParentFolderMutation();
  const [createChildFolder, { isLoading: isLoadingChild }] = useCreateChildFolderMutation();
  const [createGrandchildFolder, { isLoading: isLoadingGrandchild }] = useCreateGrandchildFolderMutation();
  
  const isLoading = isLoadingParent || isLoadingChild || isLoadingGrandchild;
  
  // Get parent folder data if parentId is provided
  const { data: parentFolderResponse } = useGetFolderQuery(parentFolder!, { 
    skip: !parentFolder 
  });
  const parentFolderData = parentFolderResponse?.data;
  
  // Validate folder creation
  const validation = validateFolderCreation(parentFolderData);
  
  // Set initial form data based on suggested values for the level
  const [formData, setFormData] = useState(() => {
    const suggestedLevel = validation.level ?? 0;
    return {
      name: '',
      icon: getSuggestedFolderIcon(suggestedLevel) as FolderIcon,
      color: getSuggestedFolderColor(suggestedLevel) as FolderColor,
      visibility: 'public' as const,
    };
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Folder name is required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const folderData = {
        name: formData.name.trim(),
        icon: formData.icon,
        color: formData.color,
        ...(parentFolder ? { parentFolder } : {})
      };

      let response;
      console.log('Creating folder with data:', folderData, 'of type:', folderType);
      switch (folderType) {
        case 'child':
          response = await createChildFolder(folderData).unwrap();
          break;
        case 'grandchild':
          response = await createGrandchildFolder(folderData).unwrap();
          break;
        default:
          response = await createParentFolder(folderData).unwrap();
      }

      toast({
        title: 'Success',
        description: 'Folder created successfully.',
      });

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create folder. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    const suggestedLevel = validation.level ?? 0;
    setFormData({
      name: '',
      icon: getSuggestedFolderIcon(suggestedLevel) as FolderIcon,
      color: getSuggestedFolderColor(suggestedLevel) as FolderColor,
      visibility: 'public',
    });
    onOpenChange(false);
  };

  const IconComponent = iconComponents[formData.icon];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Create New Folder
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            {getFolderCreationMessage(parentFolderData)}
          </DialogDescription>
          
          {/* Level information and validation */}
          {validation.isValid ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h4 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">
                Level {validation.level} Folder
              </h4>
              <p className="text-xs sm:text-sm text-blue-600 leading-relaxed">
                {getLevelDescription(validation.level!)}
              </p>
              {parentFolderData && (
                <p className="text-xs text-blue-500 mt-2 break-all">
                  Parent: {parentFolderData.fullPath || parentFolderData.name}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <h4 className="text-sm sm:text-base font-semibold text-red-800 mb-2">
                Cannot Create Folder
              </h4>
              <p className="text-xs sm:text-sm text-red-600 leading-relaxed">
                {validation.message}
              </p>
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Folder Preview */}
          <div className="flex justify-center py-2">
            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
              <IconComponent
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 transition-colors"
                style={{ color: formData.color }}
                fill="currentColor"
                fillOpacity="0.1"
              />
              <span className="text-sm sm:text-base md:text-lg font-medium text-center break-all max-w-full">
                {formData.name || 'New Folder'}
              </span>
              {validation.isValid && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs sm:text-sm",
                    validation.level === 0 && "bg-blue-50 text-blue-700 border-blue-200",
                    validation.level === 1 && "bg-green-50 text-green-700 border-green-200",
                    validation.level === 2 && "bg-orange-50 text-orange-700 border-orange-200"
                  )}
                >
                  Level {validation.level}
                </Badge>
              )}
            </div>
          </div>

          {/* Folder Name */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base font-medium">
                Folder Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter folder name"
                maxLength={255}
                required
                className="w-full text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">
              Choose Icon
            </Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 max-h-32 sm:max-h-40 overflow-y-auto">
              {FOLDER_ICONS.map((iconName) => {
                const Icon = iconComponents[iconName];
                const isSelected = formData.icon === iconName;
                
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={cn(
                      'p-2 sm:p-3 rounded-lg border-2 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50',
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                    title={iconName}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">
              Choose Color
            </Label>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 sm:gap-3">
              {FOLDER_COLORS.map((color) => {
                const isSelected = formData.color === color;
                
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={cn(
                      'w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2',
                      isSelected
                        ? 'border-gray-600 ring-2 ring-gray-400 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                    style={{ 
                      backgroundColor: color,
                      focusRingColor: color
                    }}
                    title={color}
                  />
                );
              })}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.name.trim() || !validation.isValid}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isLoading && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isLoading ? 'Creating...' : 'Create Folder'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};