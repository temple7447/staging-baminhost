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

// Tenant billing
export interface TenantBillingItem {
  code: string; // e.g. 'rent', 'service_charge', 'caution_fee', 'legal_fee'
  label: string;
  amount: number;
  frequency: string; // 'monthly' | 'once'
  type: string; // 'recurring' | 'one_time'
}

export interface TenantBillingResponse {
  success: boolean;
  data: {
    tenant: {
      id: string;
      name: string;
      type: string;
      unit: string;
    };
    items: TenantBillingItem[];
  };
}

// Payments
export type PaymentType = 'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee';
export interface InitiatePaymentBody {
  tenantId: string;
  amount: number;
  description?: string;
}
export interface InitiatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    paymentLink: string;
    reference: string;
    accessCode: string;
    amount: number;
    tenant?: { name: string; unit: string };
  };
}

export interface TenantOverview {
  name: string;
  unit: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  // Pricing breakdown
  rent?: number;                 // tenant.rentAmount (what you actually charge this tenant)
  unitMonthlyPrice?: number;     // unit.monthlyPrice (base unit price)
  serviceChargeMonthly?: number; // unit.serviceChargeMonthly
  cautionFee?: number;           // unit.cautionFee
  legalFee?: number;             // unit.legalFee
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

export interface FinancialSummary {
  tenantCount: number;
  totalMonthlyRent: number;
  totalQuarterRent: number;
  currency: string;
}

export interface QuarterlyTenantData {
  [month: string]: Tenant[];
}

export interface QuarterlyTenantResponse {
  success: boolean;
  data: QuarterlyTenantData;
  summary: FinancialSummary;
}

export interface AllEstatesOverviewResponse {
  success: boolean;
  data: {
    estates: {
      totalEstates: number;
      activeEstates: number;
    };
    units: {
      totalUnits: number;
      occupiedUnits: number;
      vacantUnits: number;
      maintenanceUnits: number;
      reservedUnits: number;
      occupancyRate: number;
    };
    tenants: {
      totalActiveTenants: number;
      dueSoon7Days: number;
      dueSoon30Days: number;
    };
    revenue: {
      last30Days: {
        amount: number;
        transactionCount: number;
      };
      last90Days: {
        amount: number;
        transactionCount: number;
      };
    };
    payments: {
      pendingCount: number;
      completedLast30Days: number;
    };
  };
}

// Units
export interface EstateUnitFeature { name: string; value: string }
export interface EstateUnit {
  id?: string;
  _id?: string;
  label: string;
  monthlyPrice: number;
  serviceChargeMonthly?: number;
  cautionFee?: number;
  legalFee?: number;
  securityDeposit?: number;
  category?: string;
  listingType?: string;
  description?: string;
  availableDate?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  streetAddress?: string;
  amenities?: {
    wifi?: boolean;
    pool?: boolean;
    gym?: boolean;
    parking?: boolean;
    ac?: boolean;
    security?: boolean;
    petFriendly?: boolean;
    balcony?: boolean;
    laundry?: boolean;
  };
  meterNumber?: string;
  images?: string[];
  features?: EstateUnitFeature[];
}

export interface CreateTenantPayload {
  unitId: string;
  tenantName: string;
  tenantEmail?: string;
  tenantPhone?: string;
  tenantType?: 'new' | 'existing' | 'renewal' | 'transfer';
  entryDate?: string; // ISO YYYY-MM-DD (when tenant moves in)
  durationMonths?: number; // how many months until next rent is due
  // nextDueDate is now computed by the backend when durationMonths is provided
  nextDueDate?: string; // ISO YYYY-MM-DD (optional override if durationMonths is not provided)
}

export interface ShiftDueDatePayload {
  rentMonths?: number;
  serviceMonths?: number;
}

export interface ShiftDueDateResponse {
  success: boolean;
  message?: string;
  data: {
    tenant: Tenant;
    oldDueDate: string;
    newDueDate: string;
    rentMonthsPaid?: number;
    serviceMonthsPaid?: number;
    totalMonthsShifted: number;
  };
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
  tagTypes: ['Estate', 'EstateList', 'EstateTenants', 'EstateUnits', 'Tenant', 'TenantList'],
  endpoints: (builder) => ({
    getEstates: builder.query<PaginatedResponse<Estate>, EstateListParams | void>({
      query: (params = {}) => ({
        url: '/api/estates',
        params,
      }),
      providesTags: (result) => [{ type: 'EstateList', id: 'LIST' }],
    }),
    getEstate: builder.query<Estate, string>({
      query: (id) => `/api/estates/${id}`,
      providesTags: (result, error, id) => [{ type: 'Estate', id }],
    }),
    getEstateTenants: builder.query<PaginatedResponse<Tenant> | QuarterlyTenantResponse, { estateId: string; quarter?: string; year?: number; page?: number; limit?: number; search?: string }>({
      query: ({ estateId, quarter, ...params }) => {
        const baseUrl = `/api/estates/${estateId}/tenants`;
        const url = quarter ? `${baseUrl}/${quarter}` : baseUrl;
        return { url, params };
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
    getAllEstatesOverview: builder.query<AllEstatesOverviewResponse, void>({
      query: () => '/api/estates/overview/all',
      providesTags: [{ type: 'EstateList', id: 'LIST' }],
    }),
    createEstateTenant: builder.mutation<Tenant, { estateId: string; body: CreateTenantPayload }>({
      query: ({ estateId, body }) => ({ url: `/api/estates/${estateId}/tenants`, method: 'POST', body }),
      invalidatesTags: (result, error, { estateId }) => [
        { type: 'EstateTenants', id: estateId },
        { type: 'Estate', id: estateId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    createEstateUnit: builder.mutation<
      EstateUnit | { success?: boolean },
      {
        estateId: string; body: {
          label: string;
          monthlyPrice: number;
          serviceChargeMonthly?: number;
          cautionFee?: number;
          legalFee?: number;
          securityDeposit?: number;
          category?: string;
          listingType?: string;
          description?: string;
          availableDate?: string;
          bedrooms?: number;
          bathrooms?: number;
          area?: number;
          streetAddress?: string;
          amenities?: {
            wifi?: boolean;
            pool?: boolean;
            gym?: boolean;
            parking?: boolean;
            ac?: boolean;
            security?: boolean;
            petFriendly?: boolean;
            balcony?: boolean;
            laundry?: boolean;
          };
          meterNumber?: string;
          images?: string[];
          features?: { name: string; value: string }[];
        }
      }
    >({
      query: ({ estateId, body }) => ({ url: `/api/estates/${estateId}/units`, method: 'POST', body }),
      invalidatesTags: (result, error, { estateId }) => [
        { type: 'Estate', id: estateId },
      ],
    }),
    // Global tenants endpoints
    getTenants: builder.query<PaginatedResponse<Tenant>, { page?: number; limit?: number; search?: string } | void>({
      query: (params = {}) => ({
        url: '/api/tenants',
        params: params || {},
      }),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
            ...result.data.map((t) => ({ type: 'Tenant' as const, id: (t.id || t._id) as string })),
            { type: 'TenantList' as const, id: 'LIST' },
          ]
          : [{ type: 'TenantList' as const, id: 'LIST' }],
    }),
    getTenant: builder.query<TenantDetailResponse | { success: boolean; data: { tenant: Tenant; overview: TenantOverview } }, string | { id: string; expand?: string; page?: number; limit?: number }>({
      query: (arg) => {
        const isString = typeof arg === 'string';
        const id = isString ? arg : arg.id;
        const params = isString ? undefined : { ...arg };
        if (params) delete (params as any).id;

        return {
          url: `/api/tenants/${id}`,
          params,
        };
      },
      providesTags: (result, error, arg) => {
        const id = typeof arg === 'string' ? arg : arg.id;
        return [
          { type: 'Tenant' as const, id },
          { type: 'TenantList' as const, id: 'LIST' },
        ];
      },
    }),
    updateTenant: builder.mutation<Tenant, { tenantId: string; rentAmount?: number; nextDueDate?: string } & Partial<Tenant>>({
      query: ({ tenantId, ...body }) => ({ url: `/api/tenants/${tenantId}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { tenantId }) => [
        { type: 'EstateTenants', id: tenantId },
        { type: 'Tenant', id: tenantId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    deleteTenant: builder.mutation<{ success?: boolean }, string>({
      query: (tenantId) => ({ url: `/api/tenants/${tenantId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, tenantId) => [
        { type: 'Tenant', id: tenantId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    getTenantHistory: builder.query<TenantHistoryEntry[], string>({
      query: (tenantId) => `/api/tenants/${tenantId}/history`,
      providesTags: (result, error, tenantId) => [{ type: 'Tenant' as const, id: tenantId }],
    }),
    getTenantTransactions: builder.query<TenantTransactionEntry[], { tenantId: string; page?: number; limit?: number } | string>({
      query: (arg) => {
        const isString = typeof arg === 'string';
        const tenantId = isString ? arg : arg.tenantId;
        const params = isString ? undefined : { ...arg };
        if (params) delete (params as any).tenantId;

        return {
          url: `/api/tenants/${tenantId}/transactions`,
          params,
        };
      },
      providesTags: (result, error, arg) => {
        const tenantId = typeof arg === 'string' ? arg : arg.tenantId;
        return [{ type: 'Tenant' as const, id: tenantId }];
      },
    }),
    getTenantBilling: builder.query<TenantBillingResponse, string>({
      query: (tenantId) => `/api/tenants/${tenantId}/billing`,
      providesTags: (result, error, tenantId) => [{ type: 'Tenant' as const, id: tenantId }],
    }),
    // Vacant units for an estate
    getEstateVacantUnits: builder.query<{ success: boolean; data: { unitId: string; label: string; monthlyPrice: number; meterNumber?: string; status?: string; description?: string }[]; total?: number }, string>({
      query: (estateId) => `/api/estates/${estateId}/units/vacant`,
      providesTags: (result, error, estateId) => [
        { type: 'EstateUnits' as const, id: estateId },
      ],
    }),
    clearEstateUnitTenant: builder.mutation<{ success?: boolean }, { estateId: string; unitId: string }>({
      query: ({ estateId, unitId }) => ({
        url: `/api/estates/${estateId}/units/${unitId}/remove-tenant`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { estateId }) => [
        { type: 'EstateTenants', id: estateId },
        { type: 'EstateUnits', id: estateId },
        { type: 'Estate', id: estateId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    updateEstateUnit: builder.mutation<
      { success?: boolean },
      { unitId: string; body: { monthlyPrice?: number; serviceChargeMonthly?: number; cautionFee?: number; legalFee?: number } }
    >({
      query: ({ unitId, body }) => ({ url: `/api/estates/unit/${unitId}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { unitId }) => [
        { type: 'EstateUnits', id: unitId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    deleteEstateUnit: builder.mutation<{ success?: boolean }, string>({
      query: (unitId) => ({ url: `/api/estates/unit/${unitId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, unitId) => [
        { type: 'EstateUnits', id: 'LIST' }, // Broad invalidation since we don't have estateId here easily
        { type: 'Estate', id: 'LIST' },
        { type: 'EstateList', id: 'LIST' },
      ],
    }),
    initiatePayment: builder.mutation<InitiatePaymentResponse, { type: PaymentType; body: InitiatePaymentBody; params?: any }>({
      query: ({ type, body, params }) => ({
        url: `/api/payments/${type}`,
        method: 'POST',
        body,
        params,
      }),
      invalidatesTags: (result, error, { body }) => [
        { type: 'Tenant' as const, id: body.tenantId },
      ],
    }),
    verifyPayment: builder.query<{ success: boolean; message?: string; data?: any }, string>({
      query: (reference) => `/api/payments/verify/${reference}`,
    }),
    shiftTenantDueDate: builder.mutation<ShiftDueDateResponse, { tenantId: string; payload: ShiftDueDatePayload }>({
      query: ({ tenantId, payload }) => ({
        url: `/api/tenants/${tenantId}/shift-due-date`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result, error, { tenantId }) => [
        { type: 'Tenant', id: tenantId },
        { type: 'TenantList', id: 'LIST' },
      ],
    }),
    sendTenantReceipt: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (tenantId) => ({
        url: `/api/payments/tenant/${tenantId}/receipt`,
        method: 'POST',
      }),
    }),
    // Public List Endpoints
    getPublicListings: builder.query<PaginatedResponse<EstateUnit>, { page?: number; limit?: number; search?: string } | void>({
      query: (params = {}) => ({
        url: '/api/estates/public/listings',
        params: params || {},
      }),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [...result.data.map((u) => ({ type: 'Estate' as const, id: u.id || u._id })), { type: 'Estate', id: 'LIST' }]
          : [{ type: 'Estate', id: 'LIST' }],
    }),
    getPublicListingById: builder.query<{ success: boolean; data: EstateUnit }, string>({
      query: (id) => `/api/estates/public/listings/${id}`,
      providesTags: (result, error, id) => [{ type: 'Estate', id }],
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
  useGetEstateThreeMonthRentQuery,
  useGetAllEstatesOverviewQuery,
  useCreateEstateTenantMutation,
  useCreateEstateUnitMutation,
  useGetEstateVacantUnitsQuery,
  useClearEstateUnitTenantMutation,
  useUpdateEstateUnitMutation,
  useDeleteEstateUnitMutation,
  useGetTenantsQuery,
  useGetTenantQuery,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetTenantHistoryQuery,
  useGetTenantTransactionsQuery,
  useGetTenantBillingQuery,
  useInitiatePaymentMutation,
  useVerifyPaymentQuery,
  useShiftTenantDueDateMutation,
  useSendTenantReceiptMutation,
  // Public
  useGetPublicListingsQuery,
  useGetPublicListingByIdQuery,
} = estatesApi;
