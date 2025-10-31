import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Banknote, ArrowDownToDot, Percent } from "lucide-react";

interface SinkingFund { name: string; target: number; balance: number; priority: number; }

export const TheCashSweepWaterfall: React.FC = () => {
  // Baselines and balances
  const [monthlyOpEx, setMonthlyOpEx] = useState<string>("");
  const [operatingBalance, setOperatingBalance] = useState<string>("");
  const [taxPct, setTaxPct] = useState<string>("0");
  const [taxBalance, setTaxBalance] = useState<string>("");
  const [efBalance, setEfBalance] = useState<string>("");
  const [sweepBalance, setSweepBalance] = useState<string>("");
  const [newCash, setNewCash] = useState<string>("");

  // Sinking funds
  const [funds, setFunds] = useState<SinkingFund[]>([
    { name: 'Year-end Bonuses', target: 0, balance: 0, priority: 1 },
    { name: 'Annual Software Contracts', target: 0, balance: 0, priority: 2 },
  ]);

  const opEx = parseFloat(monthlyOpEx || '0');
  const opBal = parseFloat(operatingBalance || '0');
  const taxRate = parseFloat(taxPct || '0') / 100;
  const taxBal = parseFloat(taxBalance || '0');
  const efBal = parseFloat(efBalance || '0');
  const sweepBal = parseFloat(sweepBalance || '0');
  const inflow = parseFloat(newCash || '0');

  const oneMonthBaseline = opEx; // required minimum in operating

  type StepAlloc = { label: string; amount: number };

  const simulation = useMemo(() => {
    let remainingInflow = isNaN(inflow) ? 0 : inflow;
    const steps: StepAlloc[] = [];

    // 1) Taxes on inflow
    const toTax = Math.max(0, Math.round(remainingInflow * (isNaN(taxRate) ? 0 : taxRate)));
    if (toTax > 0) {
      steps.push({ label: 'Taxes set-aside', amount: toTax });
      remainingInflow -= toTax;
    }

    // 2) Ensure operating baseline (1 month OpEx)
    const opShort = Math.max(0, oneMonthBaseline - opBal);
    const toOperating = Math.min(remainingInflow, opShort);
    if (toOperating > 0) {
      steps.push({ label: 'Top up Operating to 1× OpEx', amount: toOperating });
      remainingInflow -= toOperating;
    }

    // 3) Emergency Fund
    // Rule: <3 months => 100% to EF. 3-6 months => 50% EF. >=6 months => 0% EF here
    const monthsInEF = opEx > 0 ? efBal / opEx : 0;
    if (remainingInflow > 0) {
      if (monthsInEF < 3) {
        steps.push({ label: 'Emergency Fund (to 3 months)', amount: remainingInflow });
        remainingInflow = 0;
      } else if (monthsInEF >= 3 && monthsInEF < 6) {
        const toEf = Math.floor(remainingInflow * 0.5);
        if (toEf > 0) steps.push({ label: 'Emergency Fund (3→6 months, 50%)', amount: toEf });
        remainingInflow -= toEf;
      }
    }

    // 4) Sweep pool (whatever remains)
    if (remainingInflow > 0) {
      steps.push({ label: 'Sweep Account (free cash pool)', amount: remainingInflow });
      remainingInflow = 0;
    }

    // 5) From sweep to sinking funds (by priority)
    // Use current sweep balance + any simulated new sweep allocation
    const sweepAdded = steps.filter(s => s.label.startsWith('Sweep')).reduce((s, a) => s + a.amount, 0);
    let allocatable = sweepBal + sweepAdded;
    const sortedFunds = [...funds].sort((a, b) => a.priority - b.priority);
    const fundAllocs: { name: string; amount: number }[] = [];
    for (const f of sortedFunds) {
      const need = Math.max(0, f.target - f.balance);
      if (need <= 0) continue;
      const give = Math.min(allocatable, need);
      if (give > 0) {
        fundAllocs.push({ name: f.name, amount: give });
        allocatable -= give;
      }
      if (allocatable <= 0) break;
    }

    return { steps, fundAllocs };
  }, [inflow, taxRate, oneMonthBaseline, opBal, opEx, efBal, sweepBal, funds]);

  const addFund = () => setFunds(prev => [...prev, { name: '', target: 0, balance: 0, priority: prev.length + 1 }]);
  const updateFund = (idx: number, partial: Partial<SinkingFund>) => setFunds(prev => prev.map((f, i) => (i === idx ? { ...f, ...partial } : f)));
  const removeFund = (idx: number) => setFunds(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Banknote className="w-6 h-6 text-purple-700" /> The Cash Sweep Waterfall
            <Badge variant="outline" className="bg-white ml-2">P&Ls can lie; cash doesn’t</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-purple-300 bg-white">
            <Lightbulb className="h-5 w-5 text-purple-700" />
            <AlertDescription>
              Each month, sweep cash above 1× OpEx from Operating → Taxes → Emergency Fund → Sweep → Sinking Funds/Investments/Distributions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Setup & Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="opex">Monthly OpEx (baseline)</Label>
              <Input id="opex" type="number" min="0" step="0.01" placeholder="e.g., 5000000" value={monthlyOpEx} onChange={(e) => setMonthlyOpEx(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="opbal">Operating balance</Label>
              <Input id="opbal" type="number" min="0" step="0.01" value={operatingBalance} onChange={(e) => setOperatingBalance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="taxpct" className="flex items-center gap-1">Tax set‑aside % <Percent className="w-3 h-3" /></Label>
              <Input id="taxpct" type="number" min="0" max="100" step="1" placeholder="e.g., 15" value={taxPct} onChange={(e) => setTaxPct(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="taxbal">Tax account balance</Label>
              <Input id="taxbal" type="number" min="0" step="0.01" value={taxBalance} onChange={(e) => setTaxBalance(e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="efbal">Emergency fund balance</Label>
              <Input id="efbal" type="number" min="0" step="0.01" value={efBalance} onChange={(e) => setEfBalance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="sweepbal">Sweep account balance</Label>
              <Input id="sweepbal" type="number" min="0" step="0.01" value={sweepBalance} onChange={(e) => setSweepBalance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="inflow">New cash to sweep (this run)</Label>
              <Input id="inflow" type="number" min="0" step="0.01" placeholder="e.g., 3000000" value={newCash} onChange={(e) => setNewCash(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinking Funds */}
      <Card>
        <CardHeader>
          <CardTitle>Sinking Funds (large anticipated expenses)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {funds.map((f, idx) => (
            <div key={`fund-${idx}`} className="grid md:grid-cols-12 gap-3 items-end p-3 border rounded-md">
              <div className="md:col-span-4">
                <Label htmlFor={`fname-${idx}`}>Name</Label>
                <Input id={`fname-${idx}`} value={f.name} onChange={(e) => updateFund(idx, { name: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`fprio-${idx}`}>Priority</Label>
                <Input id={`fprio-${idx}`} type="number" min="1" step="1" value={String(f.priority)} onChange={(e) => updateFund(idx, { priority: parseInt(e.target.value || '1', 10) })} />
              </div>
              <div className="md:col-span-3">
                <Label htmlFor={`ftarget-${idx}`}>Target amount</Label>
                <Input id={`ftarget-${idx}`} type="number" min="0" step="0.01" value={String(f.target)} onChange={(e) => updateFund(idx, { target: parseFloat(e.target.value || '0') })} />
              </div>
              <div className="md:col-span-3">
                <Label htmlFor={`fbalance-${idx}`}>Current balance</Label>
                <Input id={`fbalance-${idx}`} type="number" min="0" step="0.01" value={String(f.balance)} onChange={(e) => updateFund(idx, { balance: parseFloat(e.target.value || '0') })} />
              </div>
              <div className="md:col-span-12 flex justify-end">
                <Button variant="destructive" onClick={() => removeFund(idx)}>Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addFund}>Add Sinking Fund</Button>
        </CardContent>
      </Card>

      {/* Simulation */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ArrowDownToDot className="w-5 h-5" /> This Sweep Allocation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {simulation.steps.length === 0 ? (
              <div className="text-sm text-slate-600">No allocations yet. Enter balances and a new cash amount.</div>
            ) : (
              simulation.steps.map((s, i) => (
                <div key={`step-${i}`} className="flex items-center justify-between p-2 border rounded-md bg-white">
                  <div className="text-sm text-slate-700">{s.label}</div>
                  <div className="font-semibold">₦{s.amount.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                </div>
              ))
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">From Sweep → Sinking Funds</div>
            {simulation.fundAllocs.length === 0 ? (
              <div className="text-sm text-slate-600">No sinking fund allocations this run.</div>
            ) : (
              simulation.fundAllocs.map((f, i) => (
                <div key={`alloc-${i}`} className="flex items-center justify-between p-2 border rounded-md bg-slate-50">
                  <div className="text-sm text-slate-700">{f.name}</div>
                  <div className="font-semibold">₦{f.amount.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-purple-200 bg-purple-50">
        <Lightbulb className="h-5 w-5 text-purple-700" />
        <AlertDescription>Do sweeps monthly (after rent + first payroll). Fill Operating 1× OpEx → EF to 3–6 mo → Sweep → Funds/Investments/Distributions.</AlertDescription>
      </Alert>
    </div>
  );
};

export default TheCashSweepWaterfall;
