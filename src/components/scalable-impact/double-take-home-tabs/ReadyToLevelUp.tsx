import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import type { DoubleTakeHomeData } from "../DoubleYourTakeHome";

interface Props {
  data: DoubleTakeHomeData;
  onDataChange: (d: DoubleTakeHomeData) => void;
  isCompleted: boolean;
  onComplete: () => void;
  onSave?: () => void;
}

export const ReadyToLevelUp: React.FC<Props> = ({ data, onDataChange, isCompleted, onComplete, onSave }) => {
  const ready = data.readiness || {};
  const set = (partial: Partial<NonNullable<typeof ready>>) => onDataChange({ ...data, readiness: { ...(ready || {}), ...partial } });
  const items: { id: keyof NonNullable<typeof ready>; label: string }[] = [
    { id: 'payYourself', label: 'Paying yourself at least living expenses + 15%' },
    { id: 'expenseRatios', label: 'Expense ratios and budget defined (profit decided first)' },
    { id: 'emergencyFund', label: 'Emergency fund 3–6 months + 1× OpEx in operating' },
    { id: 'cashSweepSetup', label: 'Cash sweep accounts set up and monthly sweep scheduled' },
  ];
  const completed = items.filter(i => ready[i.id]).length;
  const allComplete = completed === items.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ready to Level Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {items.map(i => (
              <div key={String(i.id)} className="flex items-start gap-3 p-3 border rounded-md bg-white">
                <Checkbox id={String(i.id)} checked={Boolean(ready[i.id])} onCheckedChange={(c) => set({ [i.id]: Boolean(c) } as any)} />
                <label htmlFor={String(i.id)} className="text-sm cursor-pointer">{i.label}</label>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onSave}>Save</Button>
            <Button disabled={!allComplete || isCompleted} onClick={onComplete}>
              <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Step Complete
            </Button>
            <span className="text-sm text-slate-600">{completed} / {items.length} complete</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyToLevelUp;
