import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { WalletBalance } from './WalletBalance';
import { DepositForm } from './DepositForm';
import { TransactionHistory } from './TransactionHistory';
import { Wallet as WalletIcon, TrendingUp, History } from 'lucide-react';

/**
 * Complete wallet page with balance, deposits, and transaction history
 */
export const WalletPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-3 rounded-lg">
              <WalletIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
              <p className="text-gray-600">Manage your account balance and transactions</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance" className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4" />
              Balance
            </TabsTrigger>
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Balance Tab */}
          <TabsContent value="balance" className="space-y-6 mt-6">
            <WalletBalance />
          </TabsContent>

          {/* Deposit Tab */}
          <TabsContent value="deposit" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Form */}
              <div className="lg:col-span-2">
                <DepositForm />
              </div>

              {/* Info Sidebar */}
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
                  <ol className="space-y-2 text-sm text-blue-800">
                    <li className="flex gap-2">
                      <span className="font-bold">1.</span>
                      <span>Enter the amount you want to deposit</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">2.</span>
                      <span>Click "Deposit" to proceed to Paystack</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">3.</span>
                      <span>Enter your card or bank details on Paystack</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">4.</span>
                      <span>Your balance updates immediately after payment</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Paystack Secure</h3>
                  <p className="text-sm text-green-800">
                    All deposits are processed securely through Paystack. Your card details are never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
