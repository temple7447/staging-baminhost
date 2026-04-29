import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './api';
import {
  Wallet,
  WalletResponse,
  PaystackInitializeResponse,
  PaystackVerifyResponse,
  DepositInitializeRequest,
  WalletTransactionResponse,
} from '../types/wallet';

// Types for Global Wallet (Multi-Engine)
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
  tagTypes: ['Wallet', 'GlobalWallet', 'PersonalWallet', 'WalletTransactions'],
  endpoints: (builder) => ({
    // GLOBAL WALLET ENDPOINTS (Multi-Engine)
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

    // PERSONAL WALLET ENDPOINTS (Deposits/Transactions)
    // Get user's personal wallet
    getPersonalWallet: builder.query<WalletResponse, void>({
      query: () => '/api/wallet',
      providesTags: ['PersonalWallet'],
    }),

    // Initialize Paystack deposit
    initializePaystackDeposit: builder.mutation<
      PaystackInitializeResponse,
      DepositInitializeRequest
    >({
      query: (body) => ({
        url: '/api/wallet/paystack/initialize',
        method: 'POST',
        body,
      }),
    }),

    // Verify Paystack payment and credit wallet
    verifyPaystackDeposit: builder.mutation<
      PaystackVerifyResponse,
      { reference: string }
    >({
      query: ({ reference }) => ({
        url: `/api/wallet/paystack/verify/${reference}`,
        method: 'GET',
      }),
      invalidatesTags: ['PersonalWallet', 'WalletTransactions'],
    }),

    // Get wallet transactions
    getWalletTransactions: builder.query<WalletTransactionResponse, void>({
      query: () => '/api/wallet/transactions',
      providesTags: ['WalletTransactions'],
    }),
  }),
});

// Export hooks
export const {
  useGetGlobalWalletSummaryQuery,
  useGetWalletQuery,
  useGetPersonalWalletQuery,
  useInitializePaystackDepositMutation,
  useVerifyPaystackDepositMutation,
  useGetWalletTransactionsQuery,
} = walletApi;
