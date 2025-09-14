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
    // Format large numbers with appropriate suffixes
    const absAmount = Math.abs(amount);
    
    if (absAmount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    } else if (absAmount >= 1000) {
      return `₦${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₦${amount.toLocaleString()}`;
    }
  };

  return (
    <Card className="financial-card-elevated h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Net Worth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="financial-amount text-2xl sm:text-3xl font-bold text-foreground break-words">
            {formatCurrency(totalNetWorth)}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success flex-shrink-0" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive flex-shrink-0" />
            )}
            <span className={`text-xs sm:text-sm font-medium break-words ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{formatCurrency(monthlyChange)} ({changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(1)}%)
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};