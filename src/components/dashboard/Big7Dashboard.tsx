import { TrendingUp, Users, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AdminPeople } from "./AdminPeople";

// Mock data for Big 7 member
const big7Data = {
  member: {
    name: "Sarah Johnson",
    allocation: 14.28, // 1/7th of ownership
    monthlyProfit: 12500,
    totalInvestment: 175000,
    profitShare: 8750
  },
  portfolio: {
    totalValue: 2450000,
    monthlyGrowth: 3.2,
    allocation: {
      stocks: 45,
      bonds: 25,
      realEstate: 20,
      crypto: 10
    }
  },
  performance: {
    ytdReturn: 18.5,
    monthlyReturn: 2.1,
    quarterlyReturn: 7.8
  }
};

export const Big7Dashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Big 7 Dashboard</h1>
          <p className="text-muted-foreground">Your allocation and profit share overview</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Your Ownership</div>
          <div className="text-2xl font-bold text-primary">{formatPercentage(big7Data.member.allocation)}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Profit Share</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-success">
              {formatCurrency(big7Data.member.profitShare)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {formatCurrency(big7Data.member.monthlyProfit)} total profit
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatCurrency(big7Data.member.totalInvestment)}
            </div>
            <p className="text-xs text-muted-foreground">
              Your contributed capital
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatCurrency(big7Data.portfolio.totalValue * (big7Data.member.allocation / 100))}
            </div>
            <p className="text-xs text-muted-foreground">
              Your share of total portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-success">
              +{formatPercentage(big7Data.performance.ytdReturn)}
            </div>
            <p className="text-xs text-muted-foreground">
              Year to date performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stocks</span>
                <span className="financial-amount">{big7Data.portfolio.allocation.stocks}%</span>
              </div>
              <Progress value={big7Data.portfolio.allocation.stocks} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Bonds</span>
                <span className="financial-amount">{big7Data.portfolio.allocation.bonds}%</span>
              </div>
              <Progress value={big7Data.portfolio.allocation.bonds} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Real Estate</span>
                <span className="financial-amount">{big7Data.portfolio.allocation.realEstate}%</span>
              </div>
              <Progress value={big7Data.portfolio.allocation.realEstate} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cryptocurrency</span>
                <span className="financial-amount">{big7Data.portfolio.allocation.crypto}%</span>
              </div>
              <Progress value={big7Data.portfolio.allocation.crypto} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-success-light/10 to-success-light/5 border border-success-light/20">
              <div className="text-sm text-muted-foreground">Monthly Return</div>
              <div className="text-2xl font-bold text-success">+{formatPercentage(big7Data.performance.monthlyReturn)}</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary-light/10 to-primary-light/5 border border-primary-light/20">
              <div className="text-sm text-muted-foreground">Quarterly Return</div>
              <div className="text-2xl font-bold text-primary">+{formatPercentage(big7Data.performance.quarterlyReturn)}</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-warning-light/10 to-warning-light/5 border border-warning-light/20">
              <div className="text-sm text-muted-foreground">Portfolio Growth</div>
              <div className="text-2xl font-bold text-warning">+{formatPercentage(big7Data.portfolio.monthlyGrowth)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4/20/80 Rule Implementation */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>4/20/80 Investment Rule</CardTitle>
          <p className="text-sm text-muted-foreground">
            4% emergency fund, 20% growth investments, 80% stable returns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-destructive-light/10 to-destructive-light/5 border border-destructive-light/20">
              <div className="text-sm font-medium text-destructive">Emergency Fund (4%)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency((big7Data.member.totalInvestment * 0.04))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Liquid assets</div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-warning-light/10 to-warning-light/5 border border-warning-light/20">
              <div className="text-sm font-medium text-warning">Growth Investments (20%)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency((big7Data.member.totalInvestment * 0.20))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">High-risk, high-reward</div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-success-light/10 to-success-light/5 border border-success-light/20">
              <div className="text-sm font-medium text-success">Stable Returns (80%)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency((big7Data.member.totalInvestment * 0.80))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Conservative investments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Managers and Vendors */}
      <AdminPeople />
    </div>
  );
};
