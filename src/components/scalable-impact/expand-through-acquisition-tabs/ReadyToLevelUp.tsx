import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

interface Props {
  isCompleted: boolean;
  onComplete: () => void;
  onSave?: () => void;
}

export const ReadyToLevelUp: React.FC<Props> = ({ isCompleted, onComplete, onSave }) => {
  const [state, setState] = React.useState({
    investor: false,
    dealTeam: false,
    criteria: false,
    targets5: false,
    outreach: false,
    closed: false,
  });
  const allDone = Object.values(state).every(Boolean);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ready to Level Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="investor" checked={state.investor} onCheckedChange={(c) => setState(s => ({ ...s, investor: Boolean(c) }))} />
              <label htmlFor="investor" className="text-sm cursor-pointer">Position yourself as an investor</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="dealTeam" checked={state.dealTeam} onCheckedChange={(c) => setState(s => ({ ...s, dealTeam: Boolean(c) }))} />
              <label htmlFor="dealTeam" className="text-sm cursor-pointer">Assemble your “Deal Team”</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="criteria" checked={state.criteria} onCheckedChange={(c) => setState(s => ({ ...s, criteria: Boolean(c) }))} />
              <label htmlFor="criteria" className="text-sm cursor-pointer">Determine acquisition criteria</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="targets5" checked={state.targets5} onCheckedChange={(c) => setState(s => ({ ...s, targets5: Boolean(c) }))} />
              <label htmlFor="targets5" className="text-sm cursor-pointer">Identify ≥ 5 potential acquisition targets</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="outreach" checked={state.outreach} onCheckedChange={(c) => setState(s => ({ ...s, outreach: Boolean(c) }))} />
              <label htmlFor="outreach" className="text-sm cursor-pointer">Complete target owner outreach</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="closed" checked={state.closed} onCheckedChange={(c) => setState(s => ({ ...s, closed: Boolean(c) }))} />
              <label htmlFor="closed" className="text-sm cursor-pointer">Close and integrate your first expansion acquisition</label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onSave}>Save</Button>
            <Button disabled={!allDone || isCompleted} onClick={onComplete}>
              <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Step Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
