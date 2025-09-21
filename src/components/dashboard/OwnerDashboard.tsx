import { useState } from "react";
import { NetWorthCard } from "./NetWorthCard";
import { WalletOverview } from "./WalletOverview";
import { SplitTracker } from "./SplitTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NET_WORTH_DATA, WALLET_DATA, BUSINESSES, PERSONAL_PORTFOLIOS } from "@/data/demoData";
import { Building, Fuel, Truck, Clock, TrendingUp } from "lucide-react";
import "./dashboard-fixes.css";

export const OwnerDashboard = () => {
  const netWorthData = NET_WORTH_DATA;
  const walletData = WALLET_DATA.owner;
  const businesses = BUSINESSES;
  const personalPortfolios = PERSONAL_PORTFOLIOS;

  // Calculate monthly income from all sources
  const totalMonthlyIncome = businesses.reduce((sum, business) => sum + business.monthlyRevenue, 0);
  
  // Prepare split data for SplitTracker (using wallet allocations)
  const splitData = {
    needs: {
      allocated: walletData.allocations.operations,
      spent: walletData.allocations.operations * 0.8,
      budget: walletData.allocations.operations
    },
    wants: {
      allocated: walletData.allocations.withdrawals,
      spent: walletData.allocations.withdrawals * 0.75,
      budget: walletData.allocations.withdrawals
    },
    savings: {
      allocated: walletData.allocations.investment,
      spent: walletData.allocations.investment,
      budget: walletData.allocations.investment
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container space-y-4 sm:space-y-6 max-w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Owner Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground truncate">Master control of your ₦52.75M portfolio - 1/3rd active time rule</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs sm:text-sm">Active: 3/8 hours</span>
          </Badge>
        </div>
      </div>

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <NetWorthCard 
            totalNetWorth={netWorthData.total}
            monthlyChange={netWorthData.monthlyChange}
            changePercentage={netWorthData.changePercentage}
          />
        </div>
        <div className="xl:col-span-2 min-w-0">
          <WalletOverview walletData={walletData} />
        </div>
      </div>


      {/* Personal vs Business Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business vs Personal Life</CardTitle>
            <CardDescription>Net worth breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Business Portfolio</span>
                <span className="font-semibold">₦{netWorthData.breakdown.business.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(netWorthData.breakdown.business / netWorthData.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Personal Life</span>
                <span className="font-semibold">₦{netWorthData.breakdown.personal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(netWorthData.breakdown.personal / netWorthData.total) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Business efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Monthly Revenue</span>
              <span className="font-semibold text-green-600">₦{totalMonthlyIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Average ROI</span>
              <span className="font-semibold">
                {(businesses.reduce((sum, b) => sum + b.performance.roi, 0) / businesses.length).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Growth Rate</span>
              <span className="font-semibold text-blue-600">
                +{(businesses.reduce((sum, b) => sum + b.performance.growthRate, 0) / businesses.length).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Split Tracker */}
      <SplitTracker 
        monthlyIncome={totalMonthlyIncome}
        splitData={splitData}
      />


      </div>
    </div>
  );
};
