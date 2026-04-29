import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { useWallet } from '../../hooks/useWallet';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

/**
 * Component to display wallet balance and key statistics
 */
export const WalletBalance: React.FC = () => {
  const { wallet, isLoading, formattedBalance } = useWallet();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!wallet) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Wallet Error</CardTitle>
          <CardDescription>Unable to load wallet data</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const stats = [
    {
      title: 'Available Balance',
      value: formattedBalance,
      icon: Wallet,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Earnings',
      value: `${wallet.currencySymbol}${wallet.totalEarnings.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Spent',
      value: `${wallet.currencySymbol}${wallet.totalSpent.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.title === 'Available Balance' && wallet.lastUpdated && (
                <p className="text-xs text-gray-500 mt-1">
                  Updated {new Date(wallet.lastUpdated).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
