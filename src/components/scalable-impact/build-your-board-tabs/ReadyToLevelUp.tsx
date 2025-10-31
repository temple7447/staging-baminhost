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
  const [state, setState] = React.useState({ mentor: false, peers: false, attended: false, applied: false });
  const allDone = state.mentor && state.peers && state.attended; // applied is optional

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ready to Level Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="mentor" checked={state.mentor} onCheckedChange={(c) => setState(s => ({ ...s, mentor: Boolean(c) }))} />
              <label htmlFor="mentor" className="text-sm cursor-pointer">Identified a worthy mentor or mentorship program</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="peers" checked={state.peers} onCheckedChange={(c) => setState(s => ({ ...s, peers: Boolean(c) }))} />
              <label htmlFor="peers" className="text-sm cursor-pointer">Secured 3–5 peers for your advisory group</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="attended" checked={state.attended} onCheckedChange={(c) => setState(s => ({ ...s, attended: Boolean(c) }))} />
              <label htmlFor="attended" className="text-sm cursor-pointer">Attended an advisory board meeting (yours or a peer’s)</label>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-white">
              <Checkbox id="applied" checked={state.applied} onCheckedChange={(c) => setState(s => ({ ...s, applied: Boolean(c) }))} />
              <label htmlFor="applied" className="text-sm cursor-pointer">Optional: applied to a mentorship program to accelerate</label>
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

export default ReadyToLevelUp;
