export interface User {
  _id: string;
  name: string;
  email: string;
  id: string;
}

export interface Wallet {
  _id: string;
  userId: User;
  balance: number;
  currency: string;
  currencySymbol: string;
  totalEarnings: number;
  totalSpent: number;
  transactions: string[];
  isActive: boolean;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface WalletResponse {
  success: boolean;
  data: Wallet;
}

// Paystack types
export interface PaystackInitializePayload {
  amount: number;
  email: string;
  callback_url: string;
  metadata?: {
    user_id: string;
    payment_type: string;
  };
}

export interface PaystackInitializeResponse {
  success: boolean;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  success: boolean;
  data: {
    reference: string;
    amount: number;
    status: string;
    newBalance: number;
    wallet: Wallet;
  };
}

export interface DepositInitializeRequest {
  amount: number;
}

export interface DepositVerifyRequest {
  reference: string;
}

export interface WalletTransaction {
  _id: string;
  userId: string;
  walletId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  /** Payment method - deposits use Paystack only */
  paymentMethod: 'paystack';
  reference?: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransactionResponse {
  success: boolean;
  data: WalletTransaction[];
}

export interface DepositError {
  success: false;
  message: string;
  error?: string;
}
