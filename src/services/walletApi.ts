import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './api';

// Types
export interface WalletSubAllocation {
  name: string;
  balance: number;
  percentage: number;
}

export interface EngineWallet {
  marketing: WalletSubAllocation;
  operations: WalletSubAllocation;
  savings: WalletSubAllocation;
  total: number;
  percentage: number;
}

export interface WalletSummary {
  totalBalance: number;
  totalReceived: number;
  totalMarketing: number;
  totalOperations: number;
  totalSavings: number;
}

export interface GlobalWalletData {
  growthEngine: EngineWallet;
  fulfillmentEngine: EngineWallet;
  innovationEngine: EngineWallet;
  summary: WalletSummary;
}

export interface GlobalWalletResponse {
  success: boolean;
  data: GlobalWalletData;
}

// RTK Query API
export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Wallet', 'GlobalWallet'],
  endpoints: (builder) => ({
    // Global wallet summary across all 3 engines
    getGlobalWalletSummary: builder.query<GlobalWalletResponse, void>({
      query: () => '/api/wallets/global-summary',
      providesTags: ['GlobalWallet'],
    }),
    // Individual wallet by ID
    getWallet: builder.query<any, string>({
      query: (userId) => `/api/wallets/${userId}`,
      providesTags: ['Wallet'],
    }),
  }),
});

// Export hooks
export const {
  useGetGlobalWalletSummaryQuery,
  useGetWalletQuery,
} = walletApi;
