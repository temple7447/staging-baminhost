import { useState } from "react";
import { NetWorthCard } from "./NetWorthCard";
import { WalletOverview } from "./WalletOverview";
import { SplitTracker } from "./SplitTracker";
import { RecentTransactions } from "./RecentTransactions";

// Mock data - in real app this would come from your backend
const mockData = {
  netWorth: {
    total: 485750,
    monthlyChange: 12450,
    changePercentage: 2.6
  },
  wallet: {
    balance: 45230,
    monthlyInflow: 8500,
    monthlyOutflow: 6200,
    pendingTransactions: 3
  },
  monthlyIncome: 8500,
  splitData: {
    needs: {
      allocated: 4250,
      spent: 3840,
      budget: 4250
    },
    wants: {
      allocated: 2550,
      spent: 1920,
      budget: 2550
    },
    savings: {
      allocated: 1700,
      spent: 1700,
      budget: 1700
    }
  },
  recentTransactions: [
    { id: '1', date: '2024-01-15', description: 'Salary Deposit', amount: 8500, category: 'Income', type: 'inflow' as const },
    { id: '2', date: '2024-01-14', description: 'Grocery Store', amount: -125.50, category: 'Needs', type: 'outflow' as const },
    { id: '3', date: '2024-01-13', description: 'Netflix Subscription', amount: -15.99, category: 'Wants', type: 'outflow' as const },
    { id: '4', date: '2024-01-12', description: 'Investment Transfer', amount: -1000, category: 'Savings', type: 'outflow' as const },
    { id: '5', date: '2024-01-11', description: 'Coffee Shop', amount: -4.50, category: 'Wants', type: 'outflow' as const },
  ]
};

export const OwnerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Owner Dashboard</h1>
          <p className="text-muted-foreground">Track your financial health and 50/30/20 split</p>
        </div>
      </div>

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NetWorthCard 
            totalNetWorth={mockData.netWorth.total}
            monthlyChange={mockData.netWorth.monthlyChange}
            changePercentage={mockData.netWorth.changePercentage}
          />
        </div>
        <div className="lg:col-span-2">
          <WalletOverview walletData={mockData.wallet} />
        </div>
      </div>

      {/* Split Tracker */}
      <SplitTracker 
        monthlyIncome={mockData.monthlyIncome}
        splitData={mockData.splitData}
      />

      {/* Recent Transactions */}
      <RecentTransactions transactions={mockData.recentTransactions} />
    </div>
  );
};