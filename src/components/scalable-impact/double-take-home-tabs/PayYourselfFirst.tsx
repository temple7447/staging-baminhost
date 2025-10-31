import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, Wallet, TrendingUp } from "lucide-react";

export const PayYourselfFirst: React.FC = () => {
  const [monthlyLiving, setMonthlyLiving] = useState<string>("");
  const [savingsPct, setSavingsPct] = useState<string>("15");
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [commit, setCommit] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");

  const recSalary = useMemo(() => {
    const living = parseFloat(monthlyLiving || "0");
    const pct = parseFloat(savingsPct || "0") / 100;
    if (isNaN(living) || isNaN(pct)) return 0;
    return Math.max(0, living * (1 + pct));
  }, [monthlyLiving, savingsPct]);

  const gap = useMemo(() => {
    const cur = parseFloat(currentSalary || "0");
    if (isNaN(cur)) return recSalary;
    return recSalary - cur;
  }, [currentSalary, recSalary]);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wallet className="w-6 h-6 text-emerald-700" /> Pay Yourself First
            <Badge variant="outline" className="bg-white ml-2">Scared money doesn’t scale</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-emerald-300 bg-white">
            <Lightbulb className="h-5 w-5 text-emerald-700" />
            <AlertDescription>
              Founders must pay a <strong>livable, motivating wage</strong>. Starving the owner starves the business of focus and courage.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Owner Salary Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="living">Monthly living expenses</Label>
              <Input id="living" type="number" min="0" step="0.01" placeholder="e.g., 1000000" value={monthlyLiving} onChange={(e) => setMonthlyLiving(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="savings">Savings + investing (%)</Label>
              <Input id="savings" type="number" min="0" step="1" placeholder="15" value={savingsPct} onChange={(e) => setSavingsPct(e.target.value)} />
            </div>
            <div className="bg-slate-50 border rounded-md p-3">
              <div className="text-sm text-slate-600">Recommended monthly salary</div>
              <div className="text-xl font-bold text-emerald-700">{recSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="current">Current monthly salary</Label>
              <Input id="current" type="number" min="0" step="0.01" placeholder="e.g., 600000" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} />
            </div>
            <div className="bg-white border rounded-md p-3">
              <div className="text-sm text-slate-600">Gap to close</div>
              <div className={`text-xl font-bold ${gap > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>{gap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="text-sm text-slate-600">
              Benchmark tip: sanity‑check with market data for CEOs at your size. Pay at or above a fair market wage.
            </div>
          </div>

          <div className="p-4 border rounded-md bg-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="commit" checked={commit} onCheckedChange={(c) => setCommit(Boolean(c))} />
              <Label htmlFor="commit">I commit to paying myself a salary at least equal to the recommendation</Label>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start">Start date</Label>
                <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="md:col-span-2 flex items-end">
                <Button className="ml-auto" disabled={!commit || !startDate}>Schedule Salary Start</Button>
              </div>
            </div>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <TrendingUp className="h-5 w-5 text-blue-700" />
            <AlertDescription>
              If you “can’t afford” your salary, the problem is likely <strong>expense mix</strong>. Next: set expense ratios so profit is baked in.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayYourselfFirst;
