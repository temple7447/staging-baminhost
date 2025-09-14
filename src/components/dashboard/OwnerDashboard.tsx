import { useState } from "react";
import { NetWorthCard } from "./NetWorthCard";
import { WalletOverview } from "./WalletOverview";
import { SplitTracker } from "./SplitTracker";
import { RecentTransactions } from "./RecentTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NET_WORTH_DATA, WALLET_DATA, RECENT_TRANSACTIONS, BUSINESSES, PERSONAL_PORTFOLIOS } from "@/data/demoData";
import { Building, Fuel, Truck, Clock, TrendingUp } from "lucide-react";

export const OwnerDashboard = () => {
  const netWorthData = NET_WORTH_DATA;
  const walletData = WALLET_DATA.owner;
  const transactions = RECENT_TRANSACTIONS;
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Owner Dashboard</h1>
          <p className="text-muted-foreground">Master control of your ₦52.75M portfolio - 1/3rd active time rule</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Active: 3/8 hours
          </Badge>
        </div>
      </div>

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NetWorthCard 
            totalNetWorth={netWorthData.total}
            monthlyChange={netWorthData.monthlyChange}
            changePercentage={netWorthData.changePercentage}
          />
        </div>
        <div className="lg:col-span-2">
          <WalletOverview walletData={walletData} />
        </div>
      </div>

      {/* Business Portfolio Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Portfolio Overview
          </CardTitle>
          <CardDescription>Your three main business units performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Estate Business */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Real Estate
                  </CardTitle>
                  <Badge variant="default">₦18M/year</Badge>
                </div>
                <CardDescription>38 units across 3 locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-semibold">₦{businesses[0]?.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Profit</span>
                  <span className="font-semibold text-green-600">₦{businesses[0]?.netProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI</span>
                  <span className="font-semibold">{businesses[0]?.performance.roi}%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>

            {/* Filling Station */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    Filling Station
                  </CardTitle>
                  <Badge variant="secondary">4 Tanks</Badge>
                </div>
                <CardDescription>Fuel, offices, carwash, gas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-semibold">₦{businesses[1]?.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Profit</span>
                  <span className="font-semibold text-green-600">₦{businesses[1]?.netProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI</span>
                  <span className="font-semibold">{businesses[1]?.performance.roi}%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>

            {/* Equipment Rental */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Equipment
                  </CardTitle>
                  <Badge variant="outline">3 Units</Badge>
                </div>
                <CardDescription>Tipper, excavator, loader</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-semibold">₦{businesses[2]?.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Profit</span>
                  <span className="font-semibold text-green-600">₦{businesses[2]?.netProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI</span>
                  <span className="font-semibold">{businesses[2]?.performance.roi}%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Personal vs Business Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </div>
  );
};
