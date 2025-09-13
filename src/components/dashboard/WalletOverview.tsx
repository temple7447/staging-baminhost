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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current Balance */}
      <Card className="financial-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-2xl font-bold">
            {formatCurrency(walletData.balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            Across all accounts
          </p>
        </CardContent>
      </Card>

      {/* Monthly Inflow */}
      <Card className="financial-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Inflow</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-2xl font-bold text-success">
            +{formatCurrency(walletData.monthlyInflow)}
          </div>
          <p className="text-xs text-muted-foreground">
            Income this month
          </p>
        </CardContent>
      </Card>

      {/* Monthly Outflow */}
      <Card className="financial-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Outflow</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="financial-amount text-2xl font-bold text-destructive">
            -{formatCurrency(walletData.monthlyOutflow)}
          </div>
          <p className="text-xs text-muted-foreground">
            Expenses this month
          </p>
        </CardContent>
      </Card>

      {/* Net Flow */}
      <Card className="financial-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
          <div className={`h-2 w-2 rounded-full ${walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? 'bg-success' : 'bg-destructive'}`} />
        </CardHeader>
        <CardContent>
          <div className={`financial-amount text-2xl font-bold ${walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? 'text-success' : 'text-destructive'}`}>
            {walletData.monthlyInflow - walletData.monthlyOutflow >= 0 ? '+' : ''}{formatCurrency(walletData.monthlyInflow - walletData.monthlyOutflow)}
          </div>
          <p className="text-xs text-muted-foreground">
            This month's difference
          </p>
        </CardContent>
      </Card>
    </div>
  );
};