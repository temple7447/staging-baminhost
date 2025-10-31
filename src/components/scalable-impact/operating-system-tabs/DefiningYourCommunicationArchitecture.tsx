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
import { Lightbulb, Quote, CalendarDays, ClipboardList, Users } from "lucide-react";
import type { OperatingSystemData } from "../OperatingSystemBuilder";

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onSave?: () => void;
}

export const DefiningYourCommunicationArchitecture: React.FC<Props> = ({ data, onDataChange, onSave }) => {
  const scorecard = data.scorecardConfig || { evergreen: ['', '', ''], northstar: [{ name: '', monthlyTarget: '' }, { name: '', monthlyTarget: '' }, { name: '', monthlyTarget: '' }], teams: [], manualPolicyAcknowledged: false, weeklyTracking: true };
  const meeting = data.meetingRhythmConfig || { quarterlyPlanningDate: '', monthlyReviewDay: '', weeklyTeamDay: '', weeklyTeamTime: '', allHandsFrequency: '', allHandsDay: '', allHandsTime: '', notes: '' };

  const updateScorecard = (partial: Partial<typeof scorecard>) => {
    onDataChange({
      ...data,
      scorecardConfig: { ...scorecard, ...partial },
      // Keep legacy flat fields in sync for backwards compatibility
      commonLanguage: 'Scorecards and Meeting Rhythm defined',
      scorecards: JSON.stringify({ ...scorecard, ...partial }),
    });
  };

  const updateMeeting = (partial: Partial<typeof meeting>) => {
    const next = { ...meeting, ...partial };
    onDataChange({
      ...data,
      meetingRhythmConfig: next,
      meetingRhythm: `Quarterly: ${next.quarterlyPlanningDate || 'TBD'} | Monthly review day: ${next.monthlyReviewDay || 'TBD'} | Weekly team: ${next.weeklyTeamDay || 'TBD'} ${next.weeklyTeamTime || ''} | All-hands: ${next.allHandsFrequency || 'none'} ${next.allHandsDay || ''} ${next.allHandsTime || ''}`.trim(),
    });
  };

  const canMarkComplete = useMemo(() => {
    const hasEvergreen = (scorecard.evergreen || []).some(v => v && v.trim() !== '');
    const hasNorthstar = (scorecard.northstar || []).some(v => v.name && v.name.trim() !== '');
    const hasTeamMetric = (scorecard.teams || []).some(t => t.name && t.metrics && t.metrics.some(m => m && m.trim() !== ''));
    const hasMeetingBasics = Boolean(meeting.weeklyTeamDay && meeting.weeklyTeamTime && meeting.monthlyReviewDay);
    return scorecard.manualPolicyAcknowledged && hasEvergreen && hasNorthstar && hasTeamMetric && hasMeetingBasics;
  }, [scorecard, meeting]);

  const addTeam = () => {
    const teams = [...(scorecard.teams || []), { name: '', metrics: ['', '', ''] }];
    updateScorecard({ teams });
  };

  const removeTeam = (idx: number) => {
    const teams = (scorecard.teams || []).filter((_, i) => i !== idx);
    updateScorecard({ teams });
  };

  const updateTeam = (idx: number, partial: { name?: string; metrics?: string[] }) => {
    const teams = (scorecard.teams || []).map((t, i) => (i === idx ? { ...t, ...partial } : t));
    updateScorecard({ teams });
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">Define Your Communication Architecture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-blue-200 bg-white">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              Perhaps the CEO's most important operational responsibility is the <strong>designing and implementing of the communication architecture</strong> for the company. Without it, ideas stagnate and the company degrades.
            </AlertDescription>
          </Alert>
          <p>
            Your communication architecture has two parts: <strong>Company Scorecards</strong> and a <strong>Meeting Rhythm</strong>. Below, configure both and save.
          </p>
        </CardContent>
      </Card>

      {/* Company Scorecard Setup */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ClipboardList className="w-5 h-5" /> Company Scorecard
            <Badge variant="outline" className="ml-2">Keep it simple. Track weekly. Manual input is a feature.</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Evergreen Metrics */}
          <div className="space-y-2">
            <h4 className="font-semibold">Evergreen Metrics (up to 3)</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {[0,1,2].map((i) => (
                <div key={`ev-${i}`} className="space-y-1">
                  <Label htmlFor={`ev-${i}`}>Metric {i+1}</Label>
                  <Input id={`ev-${i}`} placeholder="e.g., Revenue" value={scorecard.evergreen?.[i] || ''} onChange={(e) => {
                    const next = [...(scorecard.evergreen || ['', '', ''])];
                    next[i] = e.target.value;
                    updateScorecard({ evergreen: next });
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Northstar Metrics */}
          <div className="space-y-2">
            <h4 className="font-semibold">Northstar Metrics for this 90-day sprint (up to 3)</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {[0,1,2].map((i) => (
                <div key={`ns-${i}`} className="space-y-1 p-3 border rounded-md">
                  <Label htmlFor={`ns-name-${i}`}>Metric {i+1} Name</Label>
                  <Input id={`ns-name-${i}`} placeholder="e.g., Qualified leads/week" value={scorecard.northstar?.[i]?.name || ''} onChange={(e) => {
                    const next = [...(scorecard.northstar || [{name:'',monthlyTarget:''},{name:'',monthlyTarget:''},{name:'',monthlyTarget:''}])];
                    next[i] = { ...(next[i]||{ name:'', monthlyTarget:''}), name: e.target.value };
                    updateScorecard({ northstar: next });
                  }} />
                  <Label htmlFor={`ns-target-${i}`} className="mt-2">Monthly Target (optional)</Label>
                  <Input id={`ns-target-${i}`} placeholder="e.g., 400" value={scorecard.northstar?.[i]?.monthlyTarget || ''} onChange={(e) => {
                    const next = [...(scorecard.northstar || [{name:'',monthlyTarget:''},{name:'',monthlyTarget:''},{name:'',monthlyTarget:''}])];
                    next[i] = { ...(next[i]||{ name:'', monthlyTarget:''}), monthlyTarget: e.target.value };
                    updateScorecard({ northstar: next });
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Team Metrics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Team Metrics (each team selects up to 3 that bubble up)</h4>
              <Button variant="outline" onClick={addTeam}>Add Team</Button>
            </div>
            <div className="space-y-4">
              {(scorecard.teams || []).map((team, idx) => (
                <div key={`team-${idx}`} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-slate-500" />
                    <div className="flex-1">
                      <Label htmlFor={`team-name-${idx}`}>Team Name</Label>
                      <Input id={`team-name-${idx}`} placeholder="e.g., Marketing" value={team.name || ''} onChange={(e) => updateTeam(idx, { name: e.target.value })} />
                    </div>
                    <Button variant="destructive" onClick={() => removeTeam(idx)}>Remove</Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[0,1,2].map((m) => (
                      <div key={`team-${idx}-m-${m}`} className="space-y-1">
                        <Label htmlFor={`team-${idx}-metric-${m}`}>Metric {m+1}</Label>
                        <Input id={`team-${idx}-metric-${m}`} placeholder="e.g., MQLs, Tickets resolved" value={(team.metrics?.[m]) || ''} onChange={(e) => {
                          const next = [...(team.metrics || ['', '', ''])];
                          next[m] = e.target.value;
                          updateTeam(idx, { metrics: next });
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-2 p-4 border rounded-md bg-slate-50">
            <div className="flex items-center gap-2">
              <Checkbox id="weekly-tracking" checked={scorecard.weeklyTracking ?? true} onCheckedChange={(c) => updateScorecard({ weeklyTracking: Boolean(c) })} />
              <Label htmlFor="weekly-tracking">Track leading metrics weekly</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="manual-policy" checked={scorecard.manualPolicyAcknowledged || false} onCheckedChange={(c) => updateScorecard({ manualPolicyAcknowledged: Boolean(c) })} />
              <Label htmlFor="manual-policy">I acknowledge that manual input & color status selection is a feature (owners must interact with their numbers)</Label>
            </div>
            <Alert className="border-amber-200 bg-amber-50 mt-2">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-sm">Keep the scorecard simple: up to 3 evergreen, 3 northstar, and 3 per team.</AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Rhythm Setup */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CalendarDays className="w-5 h-5" /> Meeting Rhythm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="quarterly-date">Next Quarterly Planning (2 days)</Label>
              <Input id="quarterly-date" type="date" value={meeting.quarterlyPlanningDate || ''} onChange={(e) => updateMeeting({ quarterlyPlanningDate: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Monthly Business Review Day</Label>
              <Select value={meeting.monthlyReviewDay || ''} onValueChange={(v) => updateMeeting({ monthlyReviewDay: v })}>
                <SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger>
                <SelectContent>
                  {[...Array(28)].map((_, i) => (
                    <SelectItem key={`d-${i+1}`} value={`${i+1}`}>{i+1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Weekly Team Meeting - Day</Label>
              <Select value={meeting.weeklyTeamDay || ''} onValueChange={(v) => updateMeeting({ weeklyTeamDay: v })}>
                <SelectTrigger><SelectValue placeholder="Select day of week" /></SelectTrigger>
                <SelectContent>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="weekly-time">Weekly Team Meeting - Time</Label>
              <Input id="weekly-time" type="time" value={meeting.weeklyTeamTime || ''} onChange={(e) => updateMeeting({ weeklyTeamTime: e.target.value })} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>All-Hands Frequency</Label>
              <Select value={meeting.allHandsFrequency || ''} onValueChange={(v) => updateMeeting({ allHandsFrequency: v as any })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>All-Hands Day</Label>
              <Select value={meeting.allHandsDay || ''} onValueChange={(v) => updateMeeting({ allHandsDay: v })}>
                <SelectTrigger><SelectValue placeholder="Select day of week" /></SelectTrigger>
                <SelectContent>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                    <SelectItem key={`ah-${d}`} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="ah-time">All-Hands Time</Label>
              <Input id="ah-time" type="time" value={meeting.allHandsTime || ''} onChange={(e) => updateMeeting({ allHandsTime: e.target.value })} />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Any details about cadence, agendas, who attends, etc." value={meeting.notes || ''} onChange={(e) => updateMeeting({ notes: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={() => onSave?.()}>Save</Button>
        <Button variant={canMarkComplete ? 'default' : 'outline'} disabled={!canMarkComplete} onClick={() => onDataChange({ ...data, isCompleted: true })}>
          Mark OS as Complete
        </Button>
        {!canMarkComplete && (
          <p className="text-xs text-slate-500">Fill required basics (some metrics, weekly team cadence, monthly review, and acknowledge manual policy) to enable completion.</p>
        )}
      </div>
    </div>
  );
};

export default DefiningYourCommunicationArchitecture;
