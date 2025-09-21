import { RECENT_TRANSACTIONS } from "@/data/demoData";
import { RecentTransactions } from "./RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export const SuperAdminTransactions = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" /> Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A consolidated list of the most recent inflows and outflows across business and personal portfolios.
          </p>
        </CardContent>
      </Card>

      <RecentTransactions transactions={RECENT_TRANSACTIONS} />
    </div>
  );
};
