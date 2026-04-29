import { useCallback } from 'react';
import { useToast } from './use-toast';
import {
  useGetPersonalWalletQuery,
  useGetWalletTransactionsQuery,
  useInitializePaystackDepositMutation,
  useVerifyPaystackDepositMutation,
} from '../services/walletApi';
import type { Wallet } from '../types/wallet';

export interface UseWalletReturn {
  wallet: Wallet | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
  formattedBalance: string;
  formatAmount: (amount: number) => string;
}

/**
 * Hook to fetch and manage user's personal wallet
 */
export const useWallet = (): UseWalletReturn => {
  const { toast } = useToast();
  const { data, isLoading, isError, error, refetch } = useGetPersonalWalletQuery();

  const wallet = data?.data;

  const formatAmount = useCallback((amount: number): string => {
    if (!wallet) return `₦${amount.toLocaleString()}`;
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: wallet.currency || 'NGN',
      minimumFractionDigits: 2,
    });
    
    return formatter.format(amount / 100); // Assuming amounts are in kobo
  }, [wallet]);

  const formattedBalance = wallet
    ? `${wallet.currencySymbol}${wallet.balance.toLocaleString()}`
    : '₦0';

  if (isError) {
    console.error('Error fetching wallet:', error);
  }

  return {
    wallet,
    isLoading,
    isError,
    error,
    refetch,
    formattedBalance,
    formatAmount,
  };
};

/**
 * Hook to fetch wallet transactions
 */
export const useWalletTransactions = () => {
  const { data, isLoading, isError, error, refetch } = useGetWalletTransactionsQuery();

  return {
    transactions: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Hook to handle Paystack deposit flow
 */
export interface UsePaystackDepositReturn {
  initializeDeposit: (amount: number) => Promise<void>;
  verifyDeposit: (reference: string) => Promise<void>;
  isInitializing: boolean;
  isVerifying: boolean;
  initializeError: any;
  verifyError: any;
}

export const usePaystackDeposit = (): UsePaystackDepositReturn => {
  const { toast } = useToast();
  const [initializeDeposit, { isLoading: isInitializing, error: initializeError }] =
    useInitializePaystackDepositMutation();
  const [verifyDeposit, { isLoading: isVerifying, error: verifyError }] =
    useVerifyPaystackDepositMutation();

  const handleInitializeDeposit = useCallback(
    async (amount: number) => {
      try {
        if (amount < 100) {
          toast({
            title: 'Error',
            description: 'Minimum deposit is ₦100',
            variant: 'destructive',
          });
          return;
        }

        const response = await initializeDeposit({ amount }).unwrap();

        if (response.success && response.data.authorization_url) {
          // Redirect to Paystack payment page
          window.location.href = response.data.authorization_url;
        } else {
          toast({
            title: 'Error',
            description: 'Failed to initialize payment. Please try again.',
            variant: 'destructive',
          });
        }
      } catch (err: any) {
        console.error('Deposit initialization error:', err);
        toast({
          title: 'Error',
          description: err?.data?.message || 'Failed to initialize deposit',
          variant: 'destructive',
        });
      }
    },
    [initializeDeposit, toast]
  );

  const handleVerifyDeposit = useCallback(
    async (reference: string) => {
      try {
        const response = await verifyDeposit({ reference }).unwrap();

        if (response.success) {
          toast({
            title: 'Success',
            description: `Deposit successful! Your new balance is ${response.data.wallet.currencySymbol}${response.data.newBalance.toLocaleString()}`,
          });
          return response;
        } else {
          toast({
            title: 'Error',
            description: 'Failed to verify payment. Please contact support.',
            variant: 'destructive',
          });
        }
      } catch (err: any) {
        console.error('Deposit verification error:', err);
        toast({
          title: 'Error',
          description: err?.data?.message || 'Failed to verify deposit',
          variant: 'destructive',
        });
      }
    },
    [verifyDeposit, toast]
  );

  return {
    initializeDeposit: handleInitializeDeposit,
    verifyDeposit: handleVerifyDeposit,
    isInitializing,
    isVerifying,
    initializeError,
    verifyError,
  };
};
