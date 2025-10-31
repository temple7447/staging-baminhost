import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, UserRound, Briefcase, CheckCircle2 } from "lucide-react";

export const ClosingYourFirstAcquisition: React.FC = () => {
  const [investorPositioned, setInvestorPositioned] = useState(false);
  const [dealTeamMentor, setDealTeamMentor] = useState('');
  const [dealTeamAttorney, setDealTeamAttorney] = useState('');
  const [criteria, setCriteria] = useState('');
  const [targets, setTargets] = useState<string[]>(['', '', '', '', '']);
  const [outreachDone, setOutreachDone] = useState(false);
  const [integrationNotes, setIntegrationNotes] = useState('');

  const targetsCount = useMemo(() => targets.filter(t => (t || '').trim() !== '').length, [targets]);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl">Closing Your First Acquisition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-fuchsia-300 bg-white">
            <Lightbulb className="h-5 w-5 text-fuchsia-700" />
            <AlertDescription>
              This is a high‑level walkthrough—enough to get moving. When ready, go deep with specialized M&A training and advisors.
            </AlertDescription>
          </Alert>

          {/* Step 1: Position as Investor */}
          <div className="p-4 border rounded-md bg-white space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="investor" checked={investorPositioned} onCheckedChange={(c) => setInvestorPositioned(Boolean(c))} />
              <Label htmlFor="investor">Position yourself as an investor (update bio/LinkedIn; tell your network you’re looking)</Label>
            </div>
          </div>

          {/* Step 2: Deal Team */}
          <div className="p-4 border rounded-md bg-white space-y-3">
            <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-pink-700" /><span className="font-semibold">Assemble your Deal Team</span></div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="mentor">Mentor / M&A advisor</Label>
                <Input id="mentor" placeholder="Name / Firm" value={dealTeamMentor} onChange={(e) => setDealTeamMentor(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="attorney">Attorney (transactions experience)</Label>
                <Input id="attorney" placeholder="Name / Firm" value={dealTeamAttorney} onChange={(e) => setDealTeamAttorney(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Step 3: Criteria */}
          <div className="p-4 border rounded-md bg-white space-y-2">
            <Label htmlFor="criteria" className="font-semibold">Determine acquisition criteria</Label>
            <Textarea id="criteria" placeholder="What are you buying? (leads/media, team, higher‑margin line, market share, geography, EV arbitrage...)" value={criteria} onChange={(e) => setCriteria(e.target.value)} />
          </div>

          {/* Step 4: Targets */}
          <div className="p-4 border rounded-md bg-white space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Identify ≥ 5 potential targets (asset or company)</Label>
              <span className={`text-sm ${targetsCount>=5?'text-emerald-700':'text-slate-500'}`}>{targetsCount}/5</span>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {targets.map((t, i) => (
                <Input key={`t-${i}`} placeholder={`Target ${i+1}`} value={t} onChange={(e) => setTargets(prev => prev.map((x, idx) => idx===i? e.target.value : x))} />
              ))}
            </div>
          </div>

          {/* Step 5: Outreach */}
          <div className="p-4 border rounded-md bg-white space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="outreach" checked={outreachDone} onCheckedChange={(c) => setOutreachDone(Boolean(c))} />
              <Label htmlFor="outreach">Complete target owner outreach</Label>
            </div>
          </div>

          {/* Step 6: Integration Plan */}
          <div className="p-4 border rounded-md bg-white space-y-2">
            <Label htmlFor="integration" className="font-semibold">Close & integrate plan (what happens Day 1–90?)</Label>
            <Textarea id="integration" placeholder="How you’ll plug customers, team, ops, and systems into your OS and flywheel" value={integrationNotes} onChange={(e) => setIntegrationNotes(e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClosingYourFirstAcquisition;
