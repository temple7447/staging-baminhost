import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Lightbulb, TrendingUp, Zap } from "lucide-react";

export interface GrowthFlywheelData {
  growthPattern: 'spike' | 'chop' | 'flatline' | 'ramp' | '';
  notes?: string;

  // Pre-work inventory
  flagshipOffers: string;
  awarenessChannels: string;
  engageReengage: string;
  leadMagnets: string;
  microCommitments: string;
  ahaMoments: string;

  // Engine mapping
  focusFlagship: string;
  triggeringEvents: string; // awareness used here
  endingEvent: string;
  stepsOutline: string; // "then what happens" outline

  // Optimization
  scorecard?: { stage: string; metric: string; target?: string; current?: string }[];
  bottleneckStage?: string;
  bottleneckNotes?: string;
  projects?: { title: string; impact?: string; owner?: string }[];
  cadenceStart?: string; // ISO date string

  // Level-up readiness (1-10-3)
  month1Revenue?: string;
  month2Revenue?: string;
  month3Revenue?: string;
  believesTo100k?: boolean;

  isCompleted?: boolean;
}

interface Props {
  data: GrowthFlywheelData;
  onDataChange: (data: GrowthFlywheelData) => void;
  onComplete: () => void;
  onSave?: () => void;
}

export const GrowthFlywheelBuilder: React.FC<Props> = ({ data, onDataChange, onComplete, onSave }) => {
  // compute completion
  const isComplete = Boolean(
    data.growthPattern &&
    data.focusFlagship?.trim() &&
    data.triggeringEvents?.trim() &&
    data.stepsOutline?.trim().length >= 20 &&
    (data.projects && data.projects.filter(p=>p.title && p.title.trim()).length >= 3)
  );

  useEffect(() => {
    if (data.isCompleted !== isComplete) {
      onDataChange({ ...data, isCompleted: isComplete });
    }
  }, [isComplete]);

  const selectPattern = (pattern: GrowthFlywheelData['growthPattern']) => {
    onDataChange({ ...data, growthPattern: pattern });
  };

  const addScoreRow = () => {
    const next = [...(data.scorecard || []), { stage: '', metric: '', target: '', current: '' }];
    onDataChange({ ...data, scorecard: next });
  };

  const ensureProjectRows = () => {
    const arr = (data.projects || []).slice(0, 3);
    while (arr.length < 3) arr.push({ title: '', impact: '', owner: '' });
    return arr;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Level 2: Build a Growth Flywheel
            <Badge variant="outline" className="bg-white">Predictable, repeatable, scalable sales</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-indigo-200 bg-white">
            <Lightbulb className="h-4 w-4 text-indigo-600" />
            <AlertDescription>
              You only need one growth engine to break seven figures. Focus on one path that consistently turns awareness → leads → customers → promoters.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Four Kinds of Growth */}
      <Card>
        <CardHeader>
          <CardTitle>The Four Kinds of Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-3">
            {[{k:'spike',t:'Spike (One‑hit wonder)'},{k:'chop',t:'Chop (Unpredictable sales)'},{k:'flatline',t:'Flatline (Stalled growth)'},{k:'ramp',t:'Ramp (Scalable growth)'}].map((item) => (
              <button
                key={item.k}
                onClick={() => selectPattern(item.k as any)}
                className={`border rounded-lg p-3 text-sm text-left hover:bg-muted ${data.growthPattern===item.k ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                title={item.t}
              >
                <div className="font-semibold">{item.t}</div>
                {data.growthPattern===item.k && (
                  <div className="mt-1 inline-flex items-center gap-1 text-green-700 text-xs">
                    <CheckCircle2 className="w-3 h-3"/> Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre-work inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pre‑work: Build your asset inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Core flagship offers (+ post‑sale value)</Label>
              <Textarea value={data.flagshipOffers} onChange={(e)=>onDataChange({...data, flagshipOffers:e.target.value})} placeholder="e.g., Implementation package; ongoing success program"/>
            </div>
            <div>
              <Label>Awareness channels in use today</Label>
              <Textarea value={data.awarenessChannels} onChange={(e)=>onDataChange({...data, awarenessChannels:e.target.value})} placeholder="e.g., Facebook Ads, referrals, trade shows"/>
            </div>
            <div>
              <Label>Content & follow‑up to engage/re‑engage</Label>
              <Textarea value={data.engageReengage} onChange={(e)=>onDataChange({...data, engageReengage:e.target.value})} placeholder="e.g., 7‑part email series, pillar post, retargeting video"/>
            </div>
            <div>
              <Label>Lead magnets (gated value)</Label>
              <Textarea value={data.leadMagnets} onChange={(e)=>onDataChange({...data, leadMagnets:e.target.value})} placeholder="e.g., Calculator, whitepaper, webinar"/>
            </div>
            <div>
              <Label>Micro‑commitments (time or $$)</Label>
              <Textarea value={data.microCommitments} onChange={(e)=>onDataChange({...data, microCommitments:e.target.value})} placeholder="e.g., Free assessment, discovery call, low‑ticket book"/>
            </div>
            <div>
              <Label>Aha moments (signal they’ll buy)</Label>
              <Textarea value={data.ahaMoments} onChange={(e)=>onDataChange({...data, ahaMoments:e.target.value})} placeholder="e.g., Uses feature X; downloads Y within 7 days"/>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map your first engine */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Map your first growth engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>Flagship to focus on (one)</Label>
              <Input value={data.focusFlagship} onChange={(e)=>onDataChange({...data, focusFlagship:e.target.value})} placeholder="Which core offer is this engine selling?"/>
            </div>
            <div>
              <Label>Ending event</Label>
              <Input value={data.endingEvent} onChange={(e)=>onDataChange({...data, endingEvent:e.target.value})} placeholder="e.g., Purchase: Implementation package"/>
            </div>
          </div>
          <div>
            <Label>Triggering awareness events used for THIS engine</Label>
            <Textarea value={data.triggeringEvents} onChange={(e)=>onDataChange({...data, triggeringEvents:e.target.value})} placeholder="e.g., Referral → Landing page; FB ad → Webinar opt‑in"/>
          </div>
          <div>
            <Label>Then what happens? Outline the steps and decision points</Label>
            <Textarea value={data.stepsOutline} onChange={(e)=>onDataChange({...data, stepsOutline:e.target.value})} placeholder="Awareness → LP → Lead magnet → Email sequence → Micro‑commitment → Sales call → Offer → Close. If no, retarget; if yes, onboarding." rows={6}/>
          </div>

          {/* Optimization: Measure, Identify, Execute */}
          <div className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Optimize your engine: Measure → Identify → Execute</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Scorecard */}
                <div>
                  <div className="text-sm font-semibold mb-2">Stage scorecard (track by stage)</div>
                  <div className="space-y-2">
                    {(data.scorecard || []).map((row, idx) => (
                      <div key={idx} className="grid md:grid-cols-4 gap-2">
                        <Input placeholder="Stage (e.g., LP opt‑in)" value={row.stage} onChange={(e)=>{
                          const next = [...(data.scorecard||[])]; next[idx] = { ...row, stage: e.target.value }; onDataChange({ ...data, scorecard: next });
                        }}/>
                        <Input placeholder="Metric (e.g., CVR %)" value={row.metric} onChange={(e)=>{ const next=[...(data.scorecard||[])]; next[idx]={...row, metric:e.target.value}; onDataChange({...data, scorecard: next}); }}/>
                        <Input placeholder="Target" value={row.target||''} onChange={(e)=>{ const next=[...(data.scorecard||[])]; next[idx]={...row, target:e.target.value}; onDataChange({...data, scorecard: next}); }}/>
                        <Input placeholder="Current" value={row.current||''} onChange={(e)=>{ const next=[...(data.scorecard||[])]; next[idx]={...row, current:e.target.value}; onDataChange({...data, scorecard: next}); }}/>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addScoreRow}>Add metric</Button>
                  </div>
                </div>

                {/* Bottleneck */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Bottleneck stage</Label>
                    <Input value={data.bottleneckStage || ''} onChange={(e)=>onDataChange({...data, bottleneckStage: e.target.value})} placeholder="Where is it stuck?"/>
                  </div>
                  <div>
                    <Label>Why is it stuck?</Label>
                    <Input value={data.bottleneckNotes || ''} onChange={(e)=>onDataChange({...data, bottleneckNotes: e.target.value})} placeholder="Short diagnosis"/>
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <div className="text-sm font-semibold mb-2">Pick 3 projects for this 90‑day sprint</div>
                  <div className="space-y-2">
                    {ensureProjectRows().map((p, idx) => (
                      <div key={idx} className="grid md:grid-cols-3 gap-2">
                        <Input placeholder={`Project ${idx+1} title`} value={p.title} onChange={(e)=>{
                          const arr = ensureProjectRows(); arr[idx] = { ...arr[idx], title: e.target.value }; onDataChange({ ...data, projects: arr });
                        }}/>
                        <Input placeholder="Expected impact" value={p.impact||''} onChange={(e)=>{ const arr=ensureProjectRows(); arr[idx]={...arr[idx], impact:e.target.value}; onDataChange({...data, projects: arr}); }}/>
                        <Input placeholder="Owner" value={p.owner||''} onChange={(e)=>{ const arr=ensureProjectRows(); arr[idx]={...arr[idx], owner:e.target.value}; onDataChange({...data, projects: arr}); }}/>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* One-10-3 rule & readiness */}
            <Card>
              <CardHeader>
                <CardTitle>One‑10‑3 Rule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-slate-700">Do not add new engines until one engine is producing ≥ $10,000/mo for 3 months in a row and you believe it can scale to ≥ $100,000/mo.</div>
                <div className="grid md:grid-cols-4 gap-2">
                  <Input type="number" placeholder="Month 1 revenue ($)" value={data.month1Revenue||''} onChange={(e)=>onDataChange({...data, month1Revenue: e.target.value})}/>
                  <Input type="number" placeholder="Month 2 revenue ($)" value={data.month2Revenue||''} onChange={(e)=>onDataChange({...data, month2Revenue: e.target.value})}/>
                  <Input type="number" placeholder="Month 3 revenue ($)" value={data.month3Revenue||''} onChange={(e)=>onDataChange({...data, month3Revenue: e.target.value})}/>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={!!data.believesTo100k} onChange={(e)=>onDataChange({...data, believesTo100k: e.target.checked})} />
                    <span className="text-sm">I believe this engine can reach $100k/mo</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  Readiness: {Number(data.month1Revenue||0) >= 10000 && Number(data.month2Revenue||0) >= 10000 && Number(data.month3Revenue||0) >= 10000 && data.believesTo100k ? 'Ready to level up to Level 3' : 'Keep optimizing before adding new engines'}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary" className="gap-1"><TrendingUp className="w-3 h-3"/> Growth Engine Draft</Badge>
            <div className="flex gap-2">
              {onSave && <Button variant="outline" onClick={onSave}>Save</Button>}
              <Button onClick={onComplete} disabled={!isComplete} className={`${isComplete ? 'bg-green-600 hover:bg-green-700' : ''}`}>
                Mark Step Complete
              </Button>
            </div>
          </div>

          {isComplete && (
            <Alert className="mt-3 border-green-200 bg-green-50">
              <Zap className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">Great work. Your first growth engine is mapped and an optimization sprint is set. Iterate this every 90 days to spin the flywheel.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthFlywheelBuilder;
