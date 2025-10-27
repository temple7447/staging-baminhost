import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, CheckCircle2 } from "lucide-react";

export interface OperatingSystemData {
  // Diagnosis
  plansLoose?: boolean;
  workChaotic?: boolean;
  teamNeedsDirection?: boolean;
  meetingsWaste?: boolean;
  lowProfit?: boolean;
  burnedOut?: boolean;
  notes?: string;

  // 3-Step plan progress
  documentedAlgorithms?: boolean;
  definedCommunication?: boolean;
  clarifiedOutputs?: boolean;
  valueEnginesNotes?: string;
  playbookVaultNotes?: string;
  hotCanvasNotes?: string;
  clarityCompassNotes?: string;

  // Core OS model
  algorithms?: string; // processes, SOPs library link/notes
  commonLanguage?: string; // dashboards, scorecards, meeting rhythm
  desiredOutputs?: string; // goals, OKRs, mission/vision

  // Basics to install
  meetingRhythm?: string; // weekly, monthly, quarterly cadence
  scorecards?: string; // list of scorecards/KPIs
  sopBacklog?: string; // list of SOPs to document next

  isCompleted?: boolean;
}

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onComplete: () => void;
  onSave?: () => void;
}

export const OperatingSystemBuilder: React.FC<Props> = ({ data, onDataChange, onComplete, onSave }) => {
  const checkedCount = [
    data.plansLoose,
    data.workChaotic,
    data.teamNeedsDirection,
    data.meetingsWaste,
    data.lowProfit,
    data.burnedOut
  ].filter(Boolean).length;

  const complete = Boolean(
    (data.algorithms && data.algorithms.trim().length > 0) &&
    (data.commonLanguage && data.commonLanguage.trim().length > 0) &&
    (data.desiredOutputs && data.desiredOutputs.trim().length > 0) &&
    (data.meetingRhythm && data.meetingRhythm.trim().length > 0) &&
    (data.scorecards && data.scorecards.trim().length > 0)
  );

  useEffect(() => {
    if (data.isCompleted !== complete) {
      onDataChange({ ...data, isCompleted: complete });
    }
  }, [complete]);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Level 3: Upgrade Your Operating System
            <Badge variant="outline" className="bg-white">Make the business run without you</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-700 space-y-2">
          <Alert className="border-amber-200 bg-white">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              Most companies stall because they run on a "You OS". This step replaces it with a scalable operating system: Algorithms (SOPs), Common Language (dashboards & meetings), Desired Outputs (goals).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle>Does your OS need an upgrade?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-2">
            {[{k:'plansLoose', t:'Plans are loosely defined and rarely followed'},
              {k:'workChaotic', t:'Work is chaotic; only fires get addressed'},
              {k:'teamNeedsDirection', t:'Team needs constant direction; confusion on priorities'},
              {k:'meetingsWaste', t:'Meetings feel like a waste of time'},
              {k:'lowProfit', t:'Profits are low even as sales grow'},
              {k:'burnedOut', t:'You feel burned out or trapped'}].map((item) => (
              <label key={item.k} className="flex items-center gap-2 border rounded p-2">
                <Checkbox checked={(data as any)[item.k] || false} onCheckedChange={(v)=>onDataChange({ ...data, [item.k]: Boolean(v) })} />
                <span className="text-sm">{item.t}</span>
              </label>
            ))}
          </div>
          <Textarea placeholder="Add context / examples" value={data.notes || ''} onChange={(e)=>onDataChange({ ...data, notes: e.target.value })} />
          <div className="text-xs text-slate-600">Checked: {checkedCount} / 6</div>
        </CardContent>
      </Card>

      {/* Upgrading your OS: 3 steps overview */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrading your OS: 3-step overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded border p-3 bg-white">
            <div className="font-semibold">Order matters:</div>
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>Document the set of algorithms (your source code).</li>
              <li>Define the communication architecture (scorecards + meeting rhythm).</li>
              <li>Clarify desired outputs (goals) so people and systems align.</li>
            </ol>
            <div className="text-xs text-slate-600 mt-2">We do goals last because better systems raise what’s possible.</div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <label className="flex items-start gap-2 border rounded p-3">
              <Checkbox checked={!!data.documentedAlgorithms} onCheckedChange={(v)=>onDataChange({ ...data, documentedAlgorithms: Boolean(v) })} />
              <div>
                <div className="font-semibold">Algorithms documented</div>
                <div className="text-xs text-slate-600">Value Engines • Playbooks • High Output Team Canvas</div>
                <Textarea placeholder="Notes (e.g., links to Value Engines / Playbook Vault / HOT Canvas)" value={data.valueEnginesNotes || ''} onChange={(e)=>onDataChange({ ...data, valueEnginesNotes: e.target.value })} />
              </div>
            </label>
            <label className="flex items-start gap-2 border rounded p-3">
              <Checkbox checked={!!data.definedCommunication} onCheckedChange={(v)=>onDataChange({ ...data, definedCommunication: Boolean(v) })} />
              <div>
                <div className="font-semibold">Communication architecture defined</div>
                <div className="text-xs text-slate-600">Scorecards • Dashboards • Meeting rhythm</div>
                <Textarea placeholder="Notes (scorecard list, cadence)" value={data.playbookVaultNotes || ''} onChange={(e)=>onDataChange({ ...data, playbookVaultNotes: e.target.value })} />
              </div>
            </label>
            <label className="flex items-start gap-2 border rounded p-3">
              <Checkbox checked={!!data.clarifiedOutputs} onCheckedChange={(v)=>onDataChange({ ...data, clarifiedOutputs: Boolean(v) })} />
              <div>
                <div className="font-semibold">Desired outputs clarified</div>
                <div className="text-xs text-slate-600">Clarity Compass: mission • values • anchors • goals</div>
                <Textarea placeholder="Notes (Clarity Compass draft link/summary)" value={data.clarityCompassNotes || ''} onChange={(e)=>onDataChange({ ...data, clarityCompassNotes: e.target.value })} />
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* What is an OS */}
      <Card>
        <CardHeader>
          <CardTitle>What is an Operating System?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="border rounded p-3">
              <div className="text-xs font-semibold text-slate-500 mb-1">Algorithms</div>
              <div className="text-sm font-bold mb-2">Processes & SOPs</div>
              <Textarea placeholder="Link or list your core processes and SOPs" value={data.algorithms || ''} onChange={(e)=>onDataChange({ ...data, algorithms: e.target.value })} />
            </div>
            <div className="border rounded p-3">
              <div className="text-xs font-semibold text-slate-500 mb-1">Common Language</div>
              <div className="text-sm font-bold mb-2">Dashboards • Scorecards • Meeting rhythm</div>
              <Textarea placeholder="Define dashboards/KPIs and meeting cadence (weekly, monthly, quarterly)" value={data.commonLanguage || ''} onChange={(e)=>onDataChange({ ...data, commonLanguage: e.target.value })} />
            </div>
            <div className="border rounded p-3">
              <div className="text-xs font-semibold text-slate-500 mb-1">Desired Outputs</div>
              <div className="text-sm font-bold mb-2">Goals & Objectives</div>
              <Textarea placeholder="Company goals (annual/quarterly), mission/vision, top outcomes" value={data.desiredOutputs || ''} onChange={(e)=>onDataChange({ ...data, desiredOutputs: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Install basics */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Install your basic OS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Meeting rhythm (e.g., Weekly team sync; Monthly metrics; Quarterly planning)" value={data.meetingRhythm || ''} onChange={(e)=>onDataChange({ ...data, meetingRhythm: e.target.value })} />
          <Textarea placeholder="Scorecards/KPIs to track weekly (by team)" value={data.scorecards || ''} onChange={(e)=>onDataChange({ ...data, scorecards: e.target.value })} />
          <Textarea placeholder="Next 5 SOPs to document (SOP backlog)" value={data.sopBacklog || ''} onChange={(e)=>onDataChange({ ...data, sopBacklog: e.target.value })} />

          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary">OS Draft</Badge>
            <div className="flex gap-2">
              {onSave && <Button variant="outline" onClick={onSave}>Save</Button>}
              <Button onClick={onComplete} disabled={!complete} className={`${complete ? 'bg-green-600 hover:bg-green-700' : ''}`}>Mark Step Complete</Button>
            </div>
          </div>

          {complete && (
            <Alert className="mt-3 border-green-200 bg-white">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">Great! Your scalable OS is defined. Keep refining SOPs, dashboards, and cadence to reduce founder dependency.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatingSystemBuilder;
