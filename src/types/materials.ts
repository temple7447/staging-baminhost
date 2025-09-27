export enum MaterialType {
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
  IMAGE = 'image',
  TEXT = 'text'
}

export interface CategoryInfo {
  _id: string;
  name: string;
  parentCategory: string | null;
  level: number;
  icon: string;
  color: string;
  isActive: boolean;
  order: number;
  materialCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface Material {
  _id: string;
  title: string;
  description?: string;
  fileName?: string | null;
  originalFileName?: string | null;
  fileSize?: number;
  fileType?: string;
  mimeType?: string;
  filePath?: string;
  fileUrl?: string;
  cloudinaryId?: string;
  cloudinaryResourceType?: string;
  folder: string; // Reference to Folder ID
  relatedPortfolio: string;
  relatedManagerRole: string;
  materialType: string; // 'document', 'video', 'audio', 'image', 'text'
  expectedROI: string;
  timeRequirement: string;
  tags: string[];
  keywords: string[];
  pageCount?: number;
  duration?: number;
  visibility: string;
  allowedRoles: string[];
  viewCount: number;
  downloadCount: number;
  version: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
  isAssignedTraining: boolean;
  averageRating: number;
  ratingCount: number;
  createdBy: string;
  previousVersions: string[];
  assignedTo: string[];
  notes: string[];
  highlights: string[];
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  categoryInfo?: CategoryInfo[];
}

export interface CreateMaterialRequest {
  title: string;
  description?: string;
  materialType: string; // 'document', 'video', 'audio', 'image', 'text'
  folder: string;
  relatedPortfolio: string;
  relatedManagerRole: string;
  expectedROI?: string;
  timeRequirement?: string;
  tags?: string[];
  keywords?: string[];
  pageCount?: number;
  duration?: number;
  visibility?: string;
  allowedRoles?: string[];
  priority?: number;
  videoUrl?: string; // For video materials
  file?: File; // For document, image, audio uploads
}

export interface UpdateMaterialRequest extends Partial<Omit<CreateMaterialRequest, 'file'>> {
  id: string;
  file?: File;
}

export interface MaterialResponse {
  success: boolean;
  data: Material;
  message?: string;
}

export interface MaterialsResponse {
  success: boolean;
  data: Material[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface MaterialsQueryParams {
  page?: number;
  limit?: number;
  folder?: string;
  materialType?: string;
  tags?: string[];
  search?: string;
  relatedPortfolio?: string;
  relatedManagerRole?: string;
  expectedROI?: string;
  timeRequirement?: string;
  visibility?: string;
  status?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  createdBy?: string;
}

// Form data interface for material creation with file upload
export interface MaterialFormData {
  title: string;
  description?: string;
  materialType: string;
  folder: string;
  relatedPortfolio: string;
  relatedManagerRole: string;
  expectedROI?: string;
  timeRequirement?: string;
  tags?: string; // comma-separated string for form
  keywords?: string; // comma-separated string for form
  pageCount?: string;
  duration?: string;
  visibility?: string;
  allowedRoles?: string; // comma-separated string for form
  priority?: string;
  videoUrl?: string; // For video materials
  file?: File; // For document, image, audio uploads
}
