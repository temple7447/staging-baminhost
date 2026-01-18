import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './api';

export interface Vendor {
    id: string;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    businessType?: string; // Business type name from populated field
    businessTypeId?: string; // Business type ID
    businessName?: string;
    specialization?: string;
    role: 'vendor';
    isActive: boolean;
    status: 'approved' | 'pending' | 'suspended';
    type: 'service' | 'product';
    cacNumber?: string;
    registeredAddress?: string;
    pricingModel?: {
        type: 'hourly' | 'unit' | 'project';
        rate: number;
    };
    categories?: string[];
    verificationDocs?: {
        idUrl?: string;
        certUrl?: string;
        isVerified: boolean;
    };
    emailVerified?: boolean;
    createdBy?: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt?: string;
}

export interface OnboardVendorPayload {
    name: string;
    email: string;
    phone?: string;
    businessTypeId?: string;
    businessName?: string;
    specialization?: string;
    type: 'service' | 'product';
    cacNumber?: string;
    registeredAddress?: string;
    categories?: string[];
    pricingModel?: {
        type: 'hourly' | 'unit' | 'project';
        rate: number;
    };
    verificationDocs?: {
        idUrl?: string;
        certUrl?: string;
    };
    sendCredentials?: boolean;
}

export interface UpdateVendorPayload {
    name?: string;
    email?: string;
    phone?: string;
    businessTypeId?: string;
    businessName?: string;
    specialization?: string;
}

export interface VendorResponse {
    success: boolean;
    message?: string;
    data: Vendor;
}

export interface VendorsListResponse {
    success: boolean;
    count: number;
    data: Vendor[];
}

export interface UpdateVendorStatusPayload {
    id: string;
    isActive: boolean;
}

export const vendorsApi = createApi({
    reducerPath: 'vendorsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('authorization', `Bearer ${token}`);
            headers.set('content-type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Vendor', 'VendorList'],
    endpoints: (builder) => ({
        getVendors: builder.query<VendorsListResponse, void>({
            query: () => '/api/auth/vendors',
            providesTags: (result) =>
                result && Array.isArray(result.data)
                    ? [
                        ...result.data.map((vendor) => ({ type: 'Vendor' as const, id: vendor.id || vendor._id })),
                        { type: 'VendorList' as const, id: 'LIST' },
                    ]
                    : [{ type: 'VendorList' as const, id: 'LIST' }],
        }),
        onboardVendor: builder.mutation<VendorResponse, OnboardVendorPayload>({
            query: (payload) => ({
                url: '/api/auth/onboard-vendor',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [{ type: 'VendorList', id: 'LIST' }],
        }),
        updateVendor: builder.mutation<VendorResponse, { id: string; data: UpdateVendorPayload }>({
            query: ({ id, data }) => ({
                url: `/api/auth/vendor/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Vendor', id },
                { type: 'VendorList', id: 'LIST' },
            ],
        }),
        updateVendorStatus: builder.mutation<VendorResponse, UpdateVendorStatusPayload>({
            query: ({ id, isActive }) => ({
                url: `/api/auth/vendor/${id}/status`,
                method: 'PUT',
                body: { isActive },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Vendor', id },
                { type: 'VendorList', id: 'LIST' },
            ],
        }),
        deleteVendor: builder.mutation<{ success: boolean; message?: string }, string>({
            query: (id) => ({
                url: `/api/auth/vendor/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Vendor', id },
                { type: 'VendorList', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetVendorsQuery,
    useOnboardVendorMutation,
    useUpdateVendorMutation,
    useUpdateVendorStatusMutation,
    useDeleteVendorMutation,
} = vendorsApi;
