import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, LoginResponse, UpdateEmailRequest, UpdateEmailResponse, UpdatePasswordRequest, UpdatePasswordResponse } from '../types/auth';
import { BASE_API_URL } from './api';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      // Get token directly from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    updateSuperadminEmail: builder.mutation<UpdateEmailResponse, UpdateEmailRequest>({
      query: (data) => ({
        url: '/api/auth/update-superadmin-email',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: '/api/auth/updatepassword',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useUpdateSuperadminEmailMutation, useUpdatePasswordMutation } = authApi;