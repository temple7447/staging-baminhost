export interface Category {
  _id: string;
  id: string;
  name: string;
  description?: string;
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
  subcategories: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  color: string;
  icon?: string;
  parentCategory?: string | null;
  order?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

export interface CategoryResponse {
  success: boolean;
  category: Category;
}

export interface CategoriesResponse {
  success: boolean;
  count: number;
  data: Category[];
}
