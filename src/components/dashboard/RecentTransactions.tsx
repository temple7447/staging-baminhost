import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'inflow' | 'outflow';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'income':
        return 'default';
      case 'needs':
        return 'destructive';
      case 'wants':
        return 'secondary';
      case 'savings':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="financial-card">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${transaction.type === 'inflow' ? 'bg-success/10' : 'bg-neutral/10'}`}>
                  {transaction.type === 'inflow' ? (
                    <ArrowDownLeft className="w-4 h-4 text-success" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant={getCategoryBadgeVariant(transaction.category)}>
                  {transaction.category}
                </Badge>
                <div className={`financial-amount font-semibold ${transaction.type === 'inflow' ? 'text-success' : 'text-foreground'}`}>
                  {transaction.type === 'inflow' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};