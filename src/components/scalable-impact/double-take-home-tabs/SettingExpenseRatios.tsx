import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, Calculator, AlertTriangle } from "lucide-react";

interface Category {
  name: string;
  targetPct: number; // percent of revenue
  actual: number; // last month amount
}

export const SettingExpenseRatios: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("");
  const [targetProfitPct, setTargetProfitPct] = useState<string>("20");
  const [categories, setCategories] = useState<Category[]>([
    { name: 'People', targetPct: 25, actual: 0 },
    { name: 'COGS/Direct Costs', targetPct: 20, actual: 0 },
    { name: 'Sales & Marketing', targetPct: 12, actual: 0 },
    { name: 'Tools & Technology', targetPct: 5, actual: 0 },
    { name: 'Facilities', targetPct: 4, actual: 0 },
    { name: 'G&A', targetPct: 9, actual: 0 },
    { name: 'R&D', targetPct: 5, actual: 0 },
    { name: 'Merchant Fees', targetPct: 3, actual: 0 },
  ]);

  const revenue = parseFloat(monthlyRevenue || "0");
  const profitPct = parseFloat(targetProfitPct || "0");

  const totals = useMemo(() => {
    const sumTargets = categories.reduce((s, c) => s + (isNaN(c.targetPct) ? 0 : c.targetPct), 0);
    const targetSpendPct = Math.max(0, 100 - (isNaN(profitPct) ? 0 : profitPct));
    const pctDelta = targetSpendPct - sumTargets;
    const targetAmounts = categories.map(c => ({ name: c.name, target: (revenue * (c.targetPct || 0)) / 100, actual: c.actual }));
    const actualTotal = categories.reduce((s, c) => s + (isNaN(c.actual) ? 0 : c.actual), 0);
    const targetTotal = (revenue * sumTargets) / 100;
    const profitTargetAmount = (revenue * (isNaN(profitPct) ? 0 : profitPct)) / 100;
    const overUnder = actualTotal - targetTotal; // positive = over by this amount
    return { sumTargets, targetSpendPct, pctDelta, targetAmounts, actualTotal, targetTotal, profitTargetAmount, overUnder };
  }, [categories, profitPct, revenue]);

  const updateCategory = (idx: number, partial: Partial<Category>) => {
    setCategories(prev => prev.map((c, i) => (i === idx ? { ...c, ...partial } : c)));
  };
  const addCategory = () => setCategories(prev => [...prev, { name: '', targetPct: 0, actual: 0 }]);
  const removeCategory = (idx: number) => setCategories(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-2xl">Set Expense Ratios (Budget on Purpose)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-blue-300 bg-white">
            <Lightbulb className="h-5 w-5 text-blue-700" />
            <AlertDescription>
              Expenses expand to fill “allowed” revenue. Decide profit <strong>first</strong>; give every remaining dollar a job.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Analyzer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> Expense Ratio Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rev">Monthly revenue</Label>
              <Input id="rev" type="number" min="0" step="0.01" placeholder="e.g., 8300000" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="profit">Target profit margin (%)</Label>
              <Input id="profit" type="number" min="0" max="100" step="1" placeholder="20" value={targetProfitPct} onChange={(e) => setTargetProfitPct(e.target.value)} />
            </div>
            <div className="bg-slate-50 border rounded-md p-3">
              <div className="text-sm text-slate-600">Spendable pool (%)</div>
              <div className={`text-xl font-bold ${totals.pctDelta === 0 ? 'text-emerald-700' : totals.pctDelta < 0 ? 'text-rose-700' : 'text-amber-700'}`}>{Math.max(0, 100 - (isNaN(profitPct) ? 0 : profitPct))}%</div>
              <div className="text-xs text-slate-500">Targets total: {totals.sumTargets}% (delta {totals.pctDelta}%)</div>
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((c, idx) => (
              <div key={`cat-${idx}`} className="grid md:grid-cols-12 gap-3 items-end p-3 border rounded-md">
                <div className="md:col-span-4">
                  <Label htmlFor={`name-${idx}`}>Category</Label>
                  <Input id={`name-${idx}`} placeholder="e.g., People" value={c.name} onChange={(e) => updateCategory(idx, { name: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`pct-${idx}`}>Target %</Label>
                  <Input id={`pct-${idx}`} type="number" step="0.1" value={String(c.targetPct)} onChange={(e) => updateCategory(idx, { targetPct: parseFloat(e.target.value || '0') })} />
                </div>
                <div className="md:col-span-3">
                  <Label className="flex items-center justify-between" htmlFor={`actual-${idx}`}>
                    <span>Actual last month</span>
                    <span className="text-xs text-slate-500">Target ₦{((revenue * (c.targetPct || 0)) / 100).toLocaleString(undefined,{maximumFractionDigits:0})}</span>
                  </Label>
                  <Input id={`actual-${idx}`} type="number" step="0.01" value={String(c.actual)} onChange={(e) => updateCategory(idx, { actual: parseFloat(e.target.value || '0') })} />
                </div>
                <div className="md:col-span-2 text-sm">
                  <div className="text-slate-600">Over/(Under)</div>
                  {(() => {
                    const target = (revenue * (c.targetPct || 0)) / 100;
                    const diff = (c.actual || 0) - target;
                    return <div className={`font-semibold ${diff>0?'text-rose-700':diff<0?'text-emerald-700':'text-slate-700'}`}>{diff.toLocaleString(undefined,{maximumFractionDigits:0})}</div>;
                  })()}
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <Button variant="destructive" onClick={() => removeCategory(idx)}>Remove</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addCategory}>Add Category</Button>
          </div>

          <div className="p-4 border rounded-md bg-slate-50">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-600">Target spend total</div>
                <div className="font-semibold">₦{totals.targetTotal.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
              </div>
              <div>
                <div className="text-slate-600">Actual spend total</div>
                <div className="font-semibold">₦{totals.actualTotal.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
              </div>
              <div>
                <div className="text-slate-600">Profit target (amount)</div>
                <div className="font-semibold">₦{totals.profitTargetAmount.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
              </div>
            </div>
            {totals.pctDelta !== 0 && (
              <Alert className="mt-3 border-amber-300 bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
                <AlertDescription>Adjust category targets: spend targets + profit must equal 100%.</AlertDescription>
              </Alert>
            )}
            {totals.overUnder > 0 && (
              <Alert className="mt-3 border-rose-300 bg-rose-50">
                <AlertTriangle className="h-5 w-5 text-rose-700" />
                <AlertDescription>You overspent by ₦{totals.overUnder.toLocaleString(undefined,{maximumFractionDigits:0})} vs target last month. Reallocate or cut.</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-indigo-200 bg-indigo-50">
        <Lightbulb className="h-5 w-5 text-indigo-700" />
        <AlertDescription>Profit must be determined ahead of time. Next: build your emergency fund so surprises don’t force bad decisions.</AlertDescription>
      </Alert>
    </div>
  );
};

export default SettingExpenseRatios;
