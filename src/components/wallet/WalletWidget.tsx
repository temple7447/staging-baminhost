import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useWallet } from '../../hooks/useWallet';
import { Wallet as WalletIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

/**
 * Compact widget for dashboard displays
 */
export const WalletWidget: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, isLoading } = useWallet();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            My Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!wallet) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5 text-green-600" />
            My Wallet
          </CardTitle>
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            {wallet.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Balance */}
        <div>
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-3xl font-bold text-green-600">
            {wallet.currencySymbol}
            {wallet.balance.toLocaleString()}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white/50 p-2 rounded">
            <p className="text-gray-600">Total Earnings</p>
            <p className="font-semibold text-green-700">
              {wallet.currencySymbol}
              {wallet.totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-white/50 p-2 rounded">
            <p className="text-gray-600">Total Spent</p>
            <p className="font-semibold text-red-700">
              {wallet.currencySymbol}
              {wallet.totalSpent.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => navigate('/wallet/deposit')}
          >
            <Send className="h-4 w-4 mr-2" />
            Deposit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/wallet')}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
