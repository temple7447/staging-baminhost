import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, CheckCircle2, Target, ClipboardList, Users, CalendarDays, LayoutDashboard, Compass } from "lucide-react";
import type { OperatingSystemData } from "../OperatingSystemBuilder";

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onSave?: () => void;
}

export const ReadyToLevelUp: React.FC<Props> = ({ data, onDataChange, onSave }) => {
  const readiness = data.readinessChecklist || {};

  // Heuristics from existing config to pre-suggest completion
  const install = data.installationConfig || {};
  const scorecard = data.scorecardConfig || {};
  const meeting = data.meetingRhythmConfig || {};
  const outputs = data.desiredOutputsConfig || {};

  const suggestions = useMemo(() => {
    const hasVE = Boolean(data.valueEnginesNotes && data.valueEnginesNotes.trim() !== '');
    const hasPlaybooks = Boolean((data.playbookVaultNotes && data.playbookVaultNotes.trim() !== '') || install.links?.playbookVault);
    const hasAccountability = Boolean((data.hotCanvasNotes && data.hotCanvasNotes.trim() !== '') || install.links?.hotCanvas);
    const hasScorecard = Boolean((scorecard.northstar || []).some((n: any) => n?.name) && (scorecard.teams || []).length > 0);
    const hasMeeting = Boolean(meeting.weeklyTeamDay && meeting.monthlyReviewDay);
    const hasOffsites = Boolean(install.clarityDayDate && install.sprintPlanningDate);
    const hasClarityCompass = Boolean(outputs.purpose || install.links?.clarityCompass);
    const hasInstalled = Boolean(install.checklist?.clarityDayDone && install.checklist?.sprintPlanDone && install.checklist?.allHandsDone && install.checklist?.dashboardBuilt && install.checklist?.sharedWithTeam);
    return { hasVE, hasPlaybooks, hasAccountability, hasScorecard, hasMeeting, hasOffsites, hasClarityCompass, hasInstalled };
  }, [data.valueEnginesNotes, data.playbookVaultNotes, data.hotCanvasNotes, install.links, install.clarityDayDate, install.sprintPlanningDate, install.checklist, scorecard.northstar, scorecard.teams, meeting.weeklyTeamDay, meeting.monthlyReviewDay, outputs.purpose]);

  const setReady = (partial: Partial<NonNullable<typeof readiness>>) => {
    onDataChange({ ...data, readinessChecklist: { ...(readiness || {}), ...partial } });
  };

  const items = [
    { id: 'valueEngineDone', label: 'Mapped at least one complete Value Engine (Growth + Fulfillment)', icon: Target, suggested: suggestions.hasVE },
    { id: 'playbooksDone', label: 'Documented playbooks for each power stage (5–7, max 10)', icon: ClipboardList, suggested: suggestions.hasPlaybooks },
    { id: 'accountabilityDone', label: 'Assigned clear roles/accountability (High Output Team Canvas)', icon: Users, suggested: suggestions.hasAccountability },
    { id: 'scorecardBuilt', label: 'Built the company scorecard (≥3 Northstar + 3 metrics per team)', icon: ClipboardList, suggested: suggestions.hasScorecard },
    { id: 'meetingRhythmDefined', label: 'Defined the meeting rhythm (weekly team, monthly review, quarterly offsites)', icon: CalendarDays, suggested: suggestions.hasMeeting },
    { id: 'offsitesScheduled', label: 'Scheduled your first and next quarterly offsites (Clarity Day + Sprint)', icon: CalendarDays, suggested: suggestions.hasOffsites },
    { id: 'clarityCompassPublished', label: 'Built and published your Clarity Compass (purpose, anchors, 3‑year target, core values)', icon: Compass, suggested: suggestions.hasClarityCompass },
    { id: 'osInstalled', label: 'Installed OS (2‑day offsite, company all‑hands, OS dashboard built & shared)', icon: LayoutDashboard, suggested: suggestions.hasInstalled },
  ] as const;

  const completedCount = items.filter(i => readiness?.[i.id as keyof typeof readiness]).length;
  const allComplete = completedCount === items.length;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            Ready to Level Up?
            <Badge variant="outline" className="bg-white">Level 3 → Level 4</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-emerald-200 bg-white">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <AlertDescription>
              Check the boxes below. When all are complete, you’ve crossed the scalable line. Level 7 becomes a question of <strong>when</strong>, not <strong>if</strong>.
            </AlertDescription>
          </Alert>
          <div className="text-sm text-slate-600">Progress: <span className="font-semibold text-emerald-700">{completedCount} / {items.length}</span></div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="border">
        <CardContent className="p-4 space-y-3">
          {items.map(({ id, label, icon: Icon, suggested }) => (
            <div key={id} className="flex items-start gap-3 p-3 rounded-lg border bg-white">
              <Checkbox id={id} checked={Boolean(readiness?.[id as keyof typeof readiness])} onCheckedChange={(c) => setReady({ [id]: Boolean(c) } as any)} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
                </div>
                {suggested && !readiness?.[id as keyof typeof readiness] && (
                  <p className="text-xs text-emerald-700 mt-1">Looks done based on your entries. You can check this box.</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Complete */}
      <Card className="border-2 border-blue-200">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="text-slate-700">
            {allComplete ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-5 h-5" /> All set! You’re ready to level up to Level 4.
              </div>
            ) : (
              <div>Finish the remaining items to unlock Level 4.</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onSave?.()}>Save</Button>
            <Button disabled={!allComplete} onClick={() => onDataChange({ ...data, definedCommunication: true, documentedAlgorithms: true, clarifiedOutputs: true })}>
              Mark OS Milestones Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyToLevelUp;
