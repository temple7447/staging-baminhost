import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, TrendingUp, AlertTriangle, PiggyBank, ShieldCheck, Wallet } from "lucide-react";

export const CorePrinciplesOfProfitableScale: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl">Core Principles of Profitable Scale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-rose-300 bg-white">
            <Lightbulb className="h-5 w-5 text-rose-600" />
            <AlertDescription>
              You can’t outgrow a broken business model. Growth ≠ profit—<strong>growth eats profit</strong> without sound economics and cash discipline.
            </AlertDescription>
          </Alert>
          <p>
            Level 4 is about increasing profitability and doubling the owner’s take‑home so the business can fuel scale. Your business exists to serve you—and through you—everyone it impacts.
          </p>
        </CardContent>
      </Card>

      {/* Principle 1 */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wallet className="w-5 h-5 text-emerald-600" /> Principle 1 — Pay Yourself First</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <p>Owner compensation is not selfish; it’s a design constraint that forces healthy margins. If you “can’t afford” to pay yourself, you likely have an <strong>expense</strong> problem, not a revenue problem.</p>
        </CardContent>
      </Card>

      {/* Principle 2 */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /> Principle 2 — Set Expense Ratios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <p>Budgets aren’t failure—they’re how profits happen on purpose. Establish target % allocations by category so profit is baked in before the month starts.</p>
        </CardContent>
      </Card>

      {/* Principle 3 */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-600" /> Principle 3 — Build an Emergency Fund</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <p>Emergencies are inevitable; crises shouldn’t be. A cash buffer turns “that sucked” into “we’re fine” without layoffs or missed payroll.</p>
        </CardContent>
      </Card>

      {/* Principle 4 */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PiggyBank className="w-5 h-5 text-purple-600" /> Principle 4 — Sweep the Cash</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <p>Paper profits can lie; <strong>cash doesn’t</strong>. Use a cash‑sweep routine to route money to the right buckets and expose true liquidity weekly.</p>
          <Alert className="border-purple-200 bg-purple-50">
            <AlertTriangle className="h-5 w-5 text-purple-700" />
            <AlertDescription>Profitability without cash discipline leads to surprises. Cash management is the control surface of scale.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorePrinciplesOfProfitableScale;