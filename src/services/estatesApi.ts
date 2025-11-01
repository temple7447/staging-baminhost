import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './api';

export interface Estate {
  id: string;
  name: string;
  description?: string;
  totalUnits?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEstatePayload {
  name: string;
  description?: string;
  totalUnits: number;
}

export type UpdateEstatePayload = Partial<CreateEstatePayload>;

export interface EstateListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
}

export interface Tenant {
  id: string;
  unitLabel?: string;
  tenantName: string;
  tenantEmail?: string;
  tenantPhone?: string;
  rentAmount?: number;
  tenantType?: 'new' | 'existing' | 'renewal' | 'transfer';
  electricMeterNumber?: string;
  status?: 'occupied' | 'vacant' | 'maintenance';
  nextDueDate?: string; // ISO YYYY-MM-DD
}

export interface CreateTenantPayload {
  unitLabel: string;
  tenantName: string;
  tenantEmail?: string;
  tenantPhone?: string;
  rentAmount: number;
  tenantType?: 'new' | 'existing' | 'renewal' | 'transfer';
  electricMeterNumber?: string;
  status?: 'occupied' | 'vacant' | 'maintenance';
  nextDueDate?: string; // ISO YYYY-MM-DD
}

export const estatesApi = createApi({
  reducerPath: 'estatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Estate', 'EstateList', 'EstateTenants'],
  endpoints: (builder) => ({
    getEstates: builder.query<PaginatedResponse<Estate>, EstateListParams | void>({
      query: (params = {}) => {
        const qs = new URLSearchParams();
        if (params.page != null) qs.set('page', String(params.page));
        if (params.limit != null) qs.set('limit', String(params.limit));
        if (params.search) qs.set('search', params.search);
        return `/api/estates${qs.toString() ? `?${qs.toString()}` : ''}`;
      },
      providesTags: (result) => [{ type: 'EstateList', id: 'LIST' }],
    }),
    getEstate: builder.query<Estate, string>({
      query: (id) => `/api/estates/${id}`,
      providesTags: (result, error, id) => [{ type: 'Estate', id }],
    }),
    getEstateTenants: builder.query<PaginatedResponse<Tenant> | Tenant[], { estateId: string; page?: number; limit?: number; search?: string }>({
      query: ({ estateId, page, limit, search }) => {
        const qs = new URLSearchParams();
        if (page != null) qs.set('page', String(page));
        if (limit != null) qs.set('limit', String(limit));
        if (search) qs.set('search', search);
        return `/api/estates/${estateId}/tenants${qs.toString() ? `?${qs.toString()}` : ''}`;
      },
      providesTags: (result, error, args) => [{ type: 'EstateTenants', id: args.estateId }],
    }),
    createEstate: builder.mutation<Estate, CreateEstatePayload>({
      query: (payload) => ({ url: '/api/estates', method: 'POST', body: payload }),
      invalidatesTags: [{ type: 'EstateList', id: 'LIST' }],
    }),
    updateEstate: builder.mutation<Estate, { id: string } & UpdateEstatePayload>({
      query: ({ id, ...payload }) => ({ url: `/api/estates/${id}`, method: 'PUT', body: payload }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Estate', id },
        { type: 'EstateList', id: 'LIST' },
      ],
    }),
    deleteEstate: builder.mutation<{ success?: boolean }, string>({
      query: (id) => ({ url: `/api/estates/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Estate', id },
        { type: 'EstateList', id: 'LIST' },
      ],
    }),
    createEstateTenant: builder.mutation<Tenant, { estateId: string; body: CreateTenantPayload }>({
      query: ({ estateId, body }) => ({ url: `/api/estates/${estateId}/tenants`, method: 'POST', body }),
      invalidatesTags: (result, error, { estateId }) => [
        { type: 'EstateTenants', id: estateId },
      ],
    }),
    // Global tenants endpoints
    getTenants: builder.query<PaginatedResponse<Tenant>, { page?: number; limit?: number; search?: string } | void>({
      query: (params = {}) => {
        const qs = new URLSearchParams();
        if (params?.page != null) qs.set('page', String(params.page));
        if (params?.limit != null) qs.set('limit', String(params.limit));
        if (params?.search) qs.set('search', params.search);
        return `/api/tenants${qs.toString() ? `?${qs.toString()}` : ''}`;
      },
    }),
    getTenant: builder.query<Tenant, string>({
      query: (tenantId) => `/api/tenants/${tenantId}`,
    }),
    updateTenant: builder.mutation<Tenant, { tenantId: string; rentAmount?: number; nextDueDate?: string } & Partial<Tenant>>({
      query: ({ tenantId, ...body }) => ({ url: `/api/tenants/${tenantId}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'EstateTenants', id: tenantId }],
    }),
    deleteTenant: builder.mutation<{ success?: boolean }, string>({
      query: (tenantId) => ({ url: `/api/tenants/${tenantId}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetEstatesQuery,
  useGetEstateQuery,
  useGetEstateTenantsQuery,
  useCreateEstateMutation,
  useUpdateEstateMutation,
  useDeleteEstateMutation,
  useCreateEstateTenantMutation,
  useGetTenantsQuery,
  useGetTenantQuery,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} = estatesApi;
