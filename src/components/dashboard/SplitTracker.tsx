import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SplitData {
  needs: { allocated: number; spent: number; budget: number };
  wants: { allocated: number; spent: number; budget: number };
  savings: { allocated: number; spent: number; budget: number };
}

interface SplitTrackerProps {
  monthlyIncome: number;
  splitData: SplitData;
}

export const SplitTracker = ({ monthlyIncome, splitData }: SplitTrackerProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (spent: number, budget: number) => {
    return budget > 0 ? (spent / budget) * 100 : 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress <= 70) return "bg-success";
    if (progress <= 90) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card className="financial-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>50/30/20 Budget Split</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({formatCurrency(monthlyIncome)} monthly income)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Needs - 50% */}
        <div className="split-section-needs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-destructive">Needs (50%)</h3>
            <div className="text-sm">
              <span className="financial-amount">{formatCurrency(splitData.needs.spent)}</span>
              <span className="text-muted-foreground"> / {formatCurrency(splitData.needs.budget)}</span>
            </div>
          </div>
          <Progress 
            value={calculateProgress(splitData.needs.spent, splitData.needs.budget)} 
            className="h-3"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            Housing, utilities, groceries, minimum debt payments
          </div>
        </div>

        {/* Wants - 30% */}
        <div className="split-section-wants">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-warning">Wants (30%)</h3>
            <div className="text-sm">
              <span className="financial-amount">{formatCurrency(splitData.wants.spent)}</span>
              <span className="text-muted-foreground"> / {formatCurrency(splitData.wants.budget)}</span>
            </div>
          </div>
          <Progress 
            value={calculateProgress(splitData.wants.spent, splitData.wants.budget)} 
            className="h-3"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            Entertainment, dining out, hobbies, non-essential shopping
          </div>
        </div>

        {/* Savings - 20% */}
        <div className="split-section-savings">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-success">Savings & Debt (20%)</h3>
            <div className="text-sm">
              <span className="financial-amount">{formatCurrency(splitData.savings.spent)}</span>
              <span className="text-muted-foreground"> / {formatCurrency(splitData.savings.budget)}</span>
            </div>
          </div>
          <Progress 
            value={calculateProgress(splitData.savings.spent, splitData.savings.budget)} 
            className="h-3"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            Emergency fund, retirement, investments, extra debt payments
          </div>
        </div>
      </CardContent>
    </Card>
  );
};