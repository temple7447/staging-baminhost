import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, ShieldCheck } from "lucide-react";

export const BuildingYourEmergencyFund: React.FC = () => {
  const [monthlyOpEx, setMonthlyOpEx] = useState<string>("");
  const [operatingBalance, setOperatingBalance] = useState<string>("");
  const [efBalance, setEfBalance] = useState<string>("");
  const [targetMonths, setTargetMonths] = useState<string>("6");
  const [starterMet, setStarterMet] = useState<boolean>(false);

  const opEx = parseFloat(monthlyOpEx || "0");
  const opBal = parseFloat(operatingBalance || "0");
  const efBal = parseFloat(efBalance || "0");
  const tMonths = parseFloat(targetMonths || "0");

  const calc = useMemo(() => {
    const starterNeeded = Math.max(0, opEx - opBal);
    const monthsCovered = opEx > 0 ? (efBal / opEx) : 0;
    const totalNeeded = Math.max(0, (opEx * tMonths) - efBal);
    const suggestedMonthsToGoal = 6; // default plan horizon
    const monthlyContribution = suggestedMonthsToGoal > 0 ? Math.max(0, totalNeeded / suggestedMonthsToGoal) : 0;
    return { starterNeeded, monthsCovered, totalNeeded, monthlyContribution };
  }, [opEx, opBal, efBal, tMonths]);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ShieldCheck className="w-6 h-6 text-amber-700" /> Build Your Emergency Fund
            <Badge variant="outline" className="bg-white ml-2">3–6 months operating expenses</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-amber-300 bg-white">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <AlertDescription>
              Emergencies are inevitable; crises aren’t. A buffer prevents panic decisions (bad-fit clients, slash pricing, gut experience).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Planner */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Fund Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="opex">Avg monthly operating expenses</Label>
              <Input id="opex" type="number" min="0" step="0.01" placeholder="e.g., 5000000" value={monthlyOpEx} onChange={(e) => setMonthlyOpEx(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="opbal">Operating account balance</Label>
              <Input id="opbal" type="number" min="0" step="0.01" placeholder="e.g., 6000000" value={operatingBalance} onChange={(e) => setOperatingBalance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="efbal">Emergency fund balance (separate)</Label>
              <Input id="efbal" type="number" min="0" step="0.01" placeholder="e.g., 4000000" value={efBalance} onChange={(e) => setEfBalance(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="months">Target months</Label>
              <Input id="months" type="number" min="3" max="12" step="1" placeholder="6" value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 bg-slate-50 border rounded-md p-3">
            <div>
              <div className="text-sm text-slate-600">Starter 1‑month needed (in operating)</div>
              <div className={`text-xl font-bold ${calc.starterNeeded>0?'text-rose-700':'text-emerald-700'}`}>₦{calc.starterNeeded.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">EF months covered now (separate)</div>
              <div className="text-xl font-bold text-slate-800">{calc.monthsCovered.toFixed(1)} mo</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">To reach target (amount)</div>
              <div className="text-xl font-bold text-slate-800">₦{calc.totalNeeded.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
            </div>
          </div>

          <div className="p-4 border rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="starter" checked={starterMet} onCheckedChange={(c) => setStarterMet(Boolean(c))} />
              <Label htmlFor="starter">I maintain a minimum of 1 month OpEx in the operating account at all times</Label>
            </div>
            <div className="text-sm text-slate-600">Suggested monthly contribution to EF (reach goal in ~6 months): <span className="font-semibold text-emerald-700">₦{calc.monthlyContribution.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
            <div className="text-xs text-slate-500">Keep EF in a separate savings/MM account (even a different bank) to avoid accidental spend.</div>
            <div className="flex gap-2">
              <Button className="ml-auto">Record Transfer Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingYourEmergencyFund;
