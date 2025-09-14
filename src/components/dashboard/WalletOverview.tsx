import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WalletData {
  balance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  pendingTransactions: number;
}

interface WalletOverviewProps {
  walletData: WalletData;
}

export const WalletOverview = ({ walletData }: WalletOverviewProps) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Current Balance */}
      <Card className="financial-card min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-2">Current Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-lg sm:text-xl lg:text-2xl font-bold truncate">
            {formatCurrency(walletData.balance)}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            Across all accounts
          </p>
        </CardContent>
      </Card>

      {/* Monthly Inflow */}
      <Card className="financial-card min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-2">Monthly Inflow</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-success flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-lg sm:text-xl lg:text-2xl font-bold text-success truncate">
            +{formatCurrency(walletData.monthlyInflow)}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            Income this month
          </p>
        </CardContent>
      </Card>

      {/* Monthly Outflow */}
      <Card className="financial-card min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-2">Monthly Outflow</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-destructive flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-lg sm:text-xl lg:text-2xl font-bold text-destructive truncate">
            -{formatCurrency(walletData.monthlyOutflow)}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            Expenses this month
          </p>
        </CardContent>
      </Card>

      {/* Net Flow */}
      <Card className="financial-card min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-2">Net Flow</CardTitle>
          <div className={`h-2 w-2 rounded-full flex-shrink-0 ${walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? 'bg-success' : 'bg-destructive'}`} />
        </CardHeader>
        <CardContent>
          <div className={`financial-amount text-lg sm:text-xl lg:text-2xl font-bold truncate ${walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? 'text-success' : 'text-destructive'}`}>
            {walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? '+' : ''}{formatCurrency(walletData.monthlyInflow - walletData.monthlyOutflow)}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            This month's difference
          </p>
        </CardContent>
      </Card>
    </div>
  );
};