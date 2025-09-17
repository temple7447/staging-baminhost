import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  Material,
  MaterialsResponse,
  MaterialResponse,
  MaterialsQueryParams,
  MaterialFormData,
  UpdateMaterialRequest
} from '../types/materials';
import { BASE_API_URL } from './api';

export const materialsApi = createApi({
  reducerPath: 'materialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      // Get token directly from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // Don't set content-type for FormData - let the browser set it with boundary
      return headers;
    },
  }),
  tagTypes: ['Material'],
  endpoints: (builder) => ({
    // Get all materials with optional query parameters
    getMaterials: builder.query<MaterialsResponse, MaterialsQueryParams | void>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => searchParams.append(key, v.toString()));
            } else {
              searchParams.append(key, value.toString());
            }
          }
        });

        const queryString = searchParams.toString();
        return `/api/materials${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Material'],
    }),

    // Get single material by ID
    getMaterial: builder.query<MaterialResponse, string>({
      query: (id) => `/api/materials/${id}`,
      providesTags: (result, error, id) => [{ type: 'Material', id }],
    }),

    // Create new material with file upload support
    createMaterial: builder.mutation<MaterialResponse, MaterialFormData>({
      query: (materialData) => {
        const formData = new FormData();
        
        // Append all fields to FormData
        formData.append('title', materialData.title);
        if (materialData.description) {
          formData.append('description', materialData.description);
        }
        formData.append('materialType', materialData.materialType);
        formData.append('category', materialData.category);
        formData.append('relatedPortfolio', materialData.relatedPortfolio);
        formData.append('relatedManagerRole', materialData.relatedManagerRole);
        
        // Optional fields
        if (materialData.expectedROI) {
          formData.append('expectedROI', materialData.expectedROI);
        }
        if (materialData.timeRequirement) {
          formData.append('timeRequirement', materialData.timeRequirement);
        }
        if (materialData.tags) {
          formData.append('tags', materialData.tags);
        }
        if (materialData.keywords) {
          formData.append('keywords', materialData.keywords);
        }
        if (materialData.pageCount) {
          formData.append('pageCount', materialData.pageCount);
        }
        if (materialData.duration) {
          formData.append('duration', materialData.duration);
        }
        if (materialData.visibility) {
          formData.append('visibility', materialData.visibility);
        }
        if (materialData.allowedRoles) {
          formData.append('allowedRoles', materialData.allowedRoles);
        }
        if (materialData.priority) {
          formData.append('priority', materialData.priority);
        }
        
        // Handle conditional fields based on material type
        if (materialData.videoUrl) {
          formData.append('videoUrl', materialData.videoUrl);
        }
        if (materialData.file) {
          formData.append('file', materialData.file);
        }

        return {
          url: '/api/materials',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Material'],
    }),

    // Update existing material
    updateMaterial: builder.mutation<MaterialResponse, UpdateMaterialRequest>({
      query: ({ id, ...updates }) => {
        if (updates.file) {
          // If there's a file, use FormData
          const formData = new FormData();
          
          Object.entries(updates).forEach(([key, value]) => {
            if (key !== 'file' && value !== undefined && value !== null) {
              if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
              } else {
                formData.append(key, value.toString());
              }
            }
          });

          if (updates.file) {
            formData.append('file', updates.file);
          }

          return {
            url: `/api/materials/${id}`,
            method: 'PUT',
            body: formData,
            formData: true,
          };
        } else {
          // No file, use JSON
          return {
            url: `/api/materials/${id}`,
            method: 'PUT',
            body: updates,
            headers: {
              'content-type': 'application/json',
            },
          };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Material', id }],
    }),

    // Delete material
    deleteMaterial: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/materials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Material'],
    }),

    // Get materials by category
    getMaterialsByCategory: builder.query<MaterialsResponse, string>({
      query: (categoryId) => `/api/materials?category=${categoryId}`,
      providesTags: ['Material'],
    }),

    // Search materials
    searchMaterials: builder.query<MaterialsResponse, string>({
      query: (searchTerm) => `/api/materials?search=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Material'],
    }),

    // Get user's materials
    getMyMaterials: builder.query<MaterialsResponse, MaterialsQueryParams | void>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => searchParams.append(key, v.toString()));
            } else {
              searchParams.append(key, value.toString());
            }
          }
        });

        const queryString = searchParams.toString();
        return `/api/materials/my${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Material'],
    }),

    // Update material view count
    updateMaterialView: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/materials/${id}/view`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Material', id }],
    }),

    // Download material (increment download count)
    downloadMaterial: builder.mutation<{ success: boolean; downloadUrl: string }, string>({
      query: (id) => ({
        url: `/api/materials/${id}/download`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Material', id }],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
  useGetMaterialsByCategoryQuery,
  useSearchMaterialsQuery,
  useGetMyMaterialsQuery,
  useUpdateMaterialViewMutation,
  useDownloadMaterialMutation,
} = materialsApi;