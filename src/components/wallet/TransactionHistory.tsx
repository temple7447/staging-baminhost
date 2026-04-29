import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { useWalletTransactions } from '../../hooks/useWallet';
import { ArrowDownRight, ArrowUpRight, AlertCircle } from 'lucide-react';

/**
 * Component to display wallet transaction history
 */
export const TransactionHistory: React.FC = () => {
  const { transactions, isLoading } = useWalletTransactions();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No transactions yet</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Your wallet transactions will appear here once you make a deposit.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'transfer':
        return <ArrowDownRight className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
      case 'payment':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your wallet activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 10).map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Left: Icon & Details */}
              <div className="flex items-start gap-3">
                <div className="mt-1">{getTransactionIcon(transaction.type)}</div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    {getTypeLabel(transaction.type)}
                  </p>
                  {transaction.description && (
                    <p className="text-xs text-gray-500">{transaction.description}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.createdAt).toLocaleDateString()} at{' '}
                    {new Date(transaction.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Right: Amount & Status */}
              <div className="flex flex-col items-end gap-2">
                <p
                  className={`text-sm font-semibold ${
                    transaction.type === 'deposit' ||
                    transaction.type === 'transfer'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'deposit' || transaction.type === 'transfer'
                    ? '+'
                    : '-'}
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </p>
                <Badge className={`text-xs ${getStatusBadgeColor(transaction.status)}`}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Link */}
        {transactions.length > 10 && (
          <div className="text-center mt-4">
            <a
              href="/wallet/transactions"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all transactions →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
