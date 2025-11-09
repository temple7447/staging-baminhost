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
  id?: string;
  _id?: string;
  unitLabel?: string;
  tenantName?: string;  // Combined name for display (computed from firstName + otherNames + surname)
  firstName?: string;
  surname?: string;
  otherNames?: string;
  email?: string;
  tenantEmail?: string;  // Legacy field
  whatsapp?: string;
  tenantPhone?: string;  // Legacy field  
  whatsappNumber?: string;  // Legacy field
  rentAmount?: number;
  tenantType?: 'new' | 'existing' | 'renewal' | 'transfer';
  electricMeterNumber?: string;
  status?: 'occupied' | 'vacant' | 'maintenance';
  nextDueDate?: string;
}

export interface TenantHistoryEntry {
  id: string;
  date: string; // ISO
  action: string; // e.g., 'moved_in', 'renewed', 'transferred', 'updated_rent'
  notes?: string;
}

export interface TenantTransactionEntry {
  id: string;
  date: string; // ISO
  amount: number;
  type: 'rent' | 'service' | 'misc';
  status?: 'pending' | 'completed' | 'failed';
  description?: string;
}

export interface TenantOverview {
  name: string;
  unit: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  rent?: number;
  nextDue?: string;
  meter?: string;
  type?: 'new' | 'existing' | 'renewal' | 'transfer';
  typeBadge?: string;
  status?: string;
}

export interface TenantDetailResponse {
  success: boolean;
  data: {
    tenant: Tenant;
    overview: TenantOverview;
    history?: TenantHistoryEntry[];
    transactions?: TenantTransactionEntry[];
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface EstateOverviewResponse {
  success: boolean;
  data: {
    estate: { _id: string; name: string; totalUnits: number; createdAt: string };
    occupancy: { totalUnits: number; occupiedUnits: number; vacantUnits: number; occupancyRate: number };
    billing: { upcomingDueCount: number; last30d: { revenue: number; transactions: number } };
  };
}

export interface CreateTenantPayload {
  unitLabel: string;
  firstName: string;
  surname: string;
  otherNames?: string;
  email?: string;
  whatsapp?: string;
  rentAmount: number;
  tenantType?: 'new' | 'existing' | 'renewal' | 'transfer';
  electricMeterNumber?: string;
  nextDueDate?: string; // DD/MM/YYYY format
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
    getEstateOverview: builder.query<EstateOverviewResponse, string>({
      query: (id) => `/api/estates/${id}/overview`,
      providesTags: (result, error, id) => [{ type: 'Estate', id }],
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
    getTenant: builder.query<TenantDetailResponse | { success: boolean; data: { tenant: Tenant; overview: TenantOverview } }, string | { id: string; expand?: string; page?: number; limit?: number }>({
      query: (arg) => {
        const id = typeof arg === 'string' ? arg : arg.id;
        const qs = new URLSearchParams();
        if (typeof arg !== 'string') {
          if (arg.expand) qs.set('expand', arg.expand);
          if (arg.page != null) qs.set('page', String(arg.page));
          if (arg.limit != null) qs.set('limit', String(arg.limit));
        }
        const query = qs.toString();
        return `/api/tenants/${id}${query ? `?${query}` : ''}`;
      },
    }),
    updateTenant: builder.mutation<Tenant, { tenantId: string; rentAmount?: number; nextDueDate?: string } & Partial<Tenant>>({
      query: ({ tenantId, ...body }) => ({ url: `/api/tenants/${tenantId}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'EstateTenants', id: tenantId }],
    }),
    deleteTenant: builder.mutation<{ success?: boolean }, string>({
      query: (tenantId) => ({ url: `/api/tenants/${tenantId}`, method: 'DELETE' }),
    }),
    getTenantHistory: builder.query<TenantHistoryEntry[], string>({
      query: (tenantId) => `/api/tenants/${tenantId}/history`,
    }),
    getTenantTransactions: builder.query<TenantTransactionEntry[], { tenantId: string; page?: number; limit?: number } | string>({
      query: (arg) => {
        if (typeof arg === 'string') return `/api/tenants/${arg}/transactions`;
        const qs = new URLSearchParams();
        if (arg.page != null) qs.set('page', String(arg.page));
        if (arg.limit != null) qs.set('limit', String(arg.limit));
        return `/api/tenants/${arg.tenantId}/transactions${qs.toString() ? `?${qs.toString()}` : ''}`;
      },
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
  useGetEstateOverviewQuery,
  useCreateEstateTenantMutation,
  useGetTenantsQuery,
  useGetTenantQuery,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetTenantHistoryQuery,
  useGetTenantTransactionsQuery,
} = estatesApi;
