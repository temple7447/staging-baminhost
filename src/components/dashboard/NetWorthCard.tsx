import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NetWorthCardProps {
  totalNetWorth: number;
  monthlyChange: number;
  changePercentage: number;
}

export const NetWorthCard = ({ totalNetWorth, monthlyChange, changePercentage }: NetWorthCardProps) => {
  const isPositive = monthlyChange >= 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="financial-card-elevated">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Net Worth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="financial-amount text-3xl font-bold text-foreground">
            {formatCurrency(totalNetWorth)}
          </div>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{formatCurrency(monthlyChange)} ({changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(1)}%)
            </span>
            <span className="text-sm text-muted-foreground">this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};