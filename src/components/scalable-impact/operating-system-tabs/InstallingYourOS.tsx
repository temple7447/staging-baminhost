import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Users, Presentation, LayoutDashboard, Link as LinkIcon, Lightbulb, CheckCircle2 } from "lucide-react";
import type { OperatingSystemData } from "../OperatingSystemBuilder";

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onSave?: () => void;
}

export const InstallingYourOS: React.FC<Props> = ({ data, onDataChange, onSave }) => {
  const install = data.installationConfig || {
    clarityDayDate: '',
    sprintPlanningDate: '',
    leadershipTeam: '',
    allHandsDate: '',
    allHandsTime: '',
    osDashboardUrl: '',
    links: { clarityCompass: '', scorecard: '', valueEngines: '', playbookVault: '', hotCanvas: '' },
    checklist: { clarityDayDone: false, sprintPlanDone: false, allHandsDone: false, dashboardBuilt: false, sharedWithTeam: false },
    notes: ''
  };

  const updateInstall = (partial: Partial<typeof install>) => {
    onDataChange({
      ...data,
      installationConfig: { ...install, ...partial },
    });
  };

  const progress = useMemo(() => {
    const c = install.checklist || {};
    const total = 5;
    const done = [c.clarityDayDone, c.sprintPlanDone, c.allHandsDone, c.dashboardBuilt, c.sharedWithTeam].filter(Boolean).length;
    return Math.round((done / total) * 100);
  }, [install.checklist]);

  const setChecklist = (partial: Partial<NonNullable<typeof install.checklist>>) => {
    updateInstall({ checklist: { ...(install.checklist || {}), ...partial } });
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-2xl">Install Your Operating System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-emerald-200 bg-white">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <AlertDescription>
              Your OS won’t run unless it’s installed into the business. Do these three things: 1) 2‑day leadership offsite, 2) Company all‑hands, 3) Build and share the OS dashboard.
            </AlertDescription>
          </Alert>
          <div className="text-sm text-slate-600">Overall installation progress: <span className="font-semibold text-emerald-700">{progress}%</span></div>
        </CardContent>
      </Card>

      {/* Step 1: 2‑Day Strategic Planning (Leadership) */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CalendarDays className="w-5 h-5" /> Step 1 — 2‑Day Strategic Planning (Leadership Only)
            <Badge variant="outline" className="ml-2">Day 1: Clarity Day • Day 2: Quarterly Sprint</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="clarity-date">Clarity Day Date</Label>
              <Input id="clarity-date" type="date" value={install.clarityDayDate || ''} onChange={(e) => updateInstall({ clarityDayDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="sprint-date">Quarterly Sprint Planning Date</Label>
              <Input id="sprint-date" type="date" value={install.sprintPlanningDate || ''} onChange={(e) => updateInstall({ sprintPlanningDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="leaders">Leadership Attendees</Label>
              <Input id="leaders" placeholder="Comma-separated names/emails" value={install.leadershipTeam || ''} onChange={(e) => updateInstall({ leadershipTeam: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2 p-4 border rounded-md bg-slate-50">
            <div className="flex items-center gap-2">
              <Checkbox id="clarity-done" checked={install.checklist?.clarityDayDone || false} onCheckedChange={(c) => setChecklist({ clarityDayDone: Boolean(c) })} />
              <Label htmlFor="clarity-done">Clarity Day completed (3‑year target, purpose, core values, strategic anchors finalized)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="sprint-done" checked={install.checklist?.sprintPlanDone || false} onCheckedChange={(c) => setChecklist({ sprintPlanDone: Boolean(c) })} />
              <Label htmlFor="sprint-done">Quarterly sprint plan created (revenue focus, Northstar metrics, key initiatives)</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Company All‑Hands */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Presentation className="w-5 h-5 text-indigo-700" /> Step 2 — Company All‑Hands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ah-date">All‑Hands Date</Label>
              <Input id="ah-date" type="date" value={install.allHandsDate || ''} onChange={(e) => updateInstall({ allHandsDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="ah-time">All‑Hands Time</Label>
              <Input id="ah-time" type="time" value={install.allHandsTime || ''} onChange={(e) => updateInstall({ allHandsTime: e.target.value })} />
            </div>
            <div className="flex items-end">
              <Alert className="w-full border-indigo-200 bg-white">
                <AlertDescription className="text-sm">Share the Clarity Compass, Quarterly Sprint Plan, and Communication cadence.</AlertDescription>
              </Alert>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 border rounded-md bg-slate-50">
            <Checkbox id="ah-done" checked={install.checklist?.allHandsDone || false} onCheckedChange={(c) => setChecklist({ allHandsDone: Boolean(c) })} />
            <Label htmlFor="ah-done">All‑hands conducted and materials shared</Label>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: OS Dashboard */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <LayoutDashboard className="w-5 h-5" /> Step 3 — Build & Share the OS Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dash-url" className="flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Dashboard URL (Notion/Docs)</Label>
            <Input id="dash-url" placeholder="https://..." value={install.osDashboardUrl || ''} onChange={(e) => updateInstall({ osDashboardUrl: e.target.value })} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clarity-url">Clarity Compass Doc</Label>
              <Input id="clarity-url" placeholder="https://..." value={install.links?.clarityCompass || ''} onChange={(e) => updateInstall({ links: { ...(install.links||{}), clarityCompass: e.target.value } })} />
            </div>
            <div>
              <Label htmlFor="scorecard-url">Company Scorecard</Label>
              <Input id="scorecard-url" placeholder="https://..." value={install.links?.scorecard || ''} onChange={(e) => updateInstall({ links: { ...(install.links||{}), scorecard: e.target.value } })} />
            </div>
            <div>
              <Label htmlFor="ve-url">Value Engines</Label>
              <Input id="ve-url" placeholder="https://..." value={install.links?.valueEngines || ''} onChange={(e) => updateInstall({ links: { ...(install.links||{}), valueEngines: e.target.value } })} />
            </div>
            <div>
              <Label htmlFor="playbook-url">Playbook Vault</Label>
              <Input id="playbook-url" placeholder="https://..." value={install.links?.playbookVault || ''} onChange={(e) => updateInstall({ links: { ...(install.links||{}), playbookVault: e.target.value } })} />
            </div>
            <div>
              <Label htmlFor="hot-url">High Output Team Canvas</Label>
              <Input id="hot-url" placeholder="https://..." value={install.links?.hotCanvas || ''} onChange={(e) => updateInstall({ links: { ...(install.links||{}), hotCanvas: e.target.value } })} />
            </div>
          </div>

          <div className="space-y-2 p-4 border rounded-md bg-slate-50">
            <div className="flex items-center gap-2">
              <Checkbox id="dash-built" checked={install.checklist?.dashboardBuilt || false} onCheckedChange={(c) => setChecklist({ dashboardBuilt: Boolean(c) })} />
              <Label htmlFor="dash-built">Dashboard compiled (links in one place)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="shared" checked={install.checklist?.sharedWithTeam || false} onCheckedChange={(c) => setChecklist({ sharedWithTeam: Boolean(c) })} />
              <Label htmlFor="shared">Shared with entire team (appropriate permissions set)</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any logistics, facilitators, agenda links, etc." value={install.notes || ''} onChange={(e) => updateInstall({ notes: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={() => onSave?.()}>Save</Button>
        <Button variant={progress === 100 ? 'default' : 'outline'} disabled={progress !== 100} onClick={() => onDataChange({ ...data, isCompleted: true })}>
          <CheckCircle2 className="w-4 h-4 mr-1" /> Mark OS Installed & Complete
        </Button>
        {progress !== 100 && (
          <p className="text-xs text-slate-500">Complete all steps to enable completion.</p>
        )}
      </div>
    </div>
  );
};

export default InstallingYourOS;
