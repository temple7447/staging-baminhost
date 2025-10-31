import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Target, Heart, Shield } from "lucide-react";
import type { OperatingSystemData } from "../OperatingSystemBuilder";

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onSave?: () => void;
}

export const ClarifyingYourDesiredOutputs: React.FC<Props> = ({ data, onDataChange, onSave }) => {
  const outputs = data.desiredOutputsConfig || {
    threeYear: { revenue: '', profit: '', valuation: '' },
    purpose: { contribution: '', impact: '', statement: '' },
    coreValues: [{ value: '', type: 'core' as const }],
    strategicAnchors: [''],
  };

  const updateOutputs = (partial: Partial<typeof outputs>) => {
    const next = { ...outputs, ...partial };
    onDataChange({
      ...data,
      desiredOutputsConfig: next,
      desiredOutputs: JSON.stringify(next),
    });
  };

  // Auto-generate purpose statement
  const purposeStatement = useMemo(() => {
    const c = outputs.purpose?.contribution?.trim();
    const i = outputs.purpose?.impact?.trim();
    if (!c && !i) return '';
    if (c && i) return `To ${c} so that ${i}.`;
    if (c) return `To ${c}.`;
    return `${i}.`;
  }, [outputs.purpose?.contribution, outputs.purpose?.impact]);

  useEffect(() => {
    const next = { ...outputs.purpose, statement: purposeStatement };
    updateOutputs({ purpose: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purposeStatement]);

  const addCoreValue = () => {
    updateOutputs({ coreValues: [...(outputs.coreValues || []), { value: '', type: 'core' }] });
  };
  const updateCoreValue = (idx: number, partial: { value?: string; type?: 'core' | 'aspirational' | 'accidental' | 'permission' }) => {
    const list = (outputs.coreValues || []).map((cv, i) => (i === idx ? { ...cv, ...partial } : cv));
    updateOutputs({ coreValues: list });
  };
  const removeCoreValue = (idx: number) => {
    const list = (outputs.coreValues || []).filter((_, i) => i !== idx);
    updateOutputs({ coreValues: list.length ? list : [{ value: '', type: 'core' }] });
  };

  const addAnchor = () => updateOutputs({ strategicAnchors: [...(outputs.strategicAnchors || []), ''] });
  const updateAnchor = (idx: number, v: string) => {
    const list = [...(outputs.strategicAnchors || [])];
    list[idx] = v;
    updateOutputs({ strategicAnchors: list });
  };
  const removeAnchor = (idx: number) => {
    const list = (outputs.strategicAnchors || []).filter((_, i) => i !== idx);
    updateOutputs({ strategicAnchors: list.length ? list : [''] });
  };

  const canComplete = useMemo(() => {
    const has3Y = Boolean(outputs.threeYear?.revenue || outputs.threeYear?.profit || outputs.threeYear?.valuation);
    const hasPurpose = Boolean(outputs.purpose?.contribution && outputs.purpose?.impact);
    const hasCore = (outputs.coreValues || []).some(cv => (cv.type === 'core') && cv.value && cv.value.trim() !== '');
    const hasAnchors = (outputs.strategicAnchors || []).some(a => a && a.trim() !== '');
    return has3Y && hasPurpose && hasCore && hasAnchors;
  }, [outputs]);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-2xl">Clarify Your Desired Outputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-emerald-200 bg-white">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <AlertDescription>
              We do this last so goals are informed by real systems and data, not hope. Define your 3-year target, company purpose, true core values, and strategic anchors.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Three-Year Target */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5" /> Three-Year Target (12 quarters)
            <Badge variant="outline" className="ml-2">Selfish, measurable milestone</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="rev">Target Revenue</Label>
            <Input id="rev" placeholder="e.g., ₦1,000,000,000" value={outputs.threeYear?.revenue || ''} onChange={(e) => updateOutputs({ threeYear: { ...outputs.threeYear, revenue: e.target.value } })} />
          </div>
          <div>
            <Label htmlFor="profit">Target Profit</Label>
            <Input id="profit" placeholder="e.g., ₦200,000,000" value={outputs.threeYear?.profit || ''} onChange={(e) => updateOutputs({ threeYear: { ...outputs.threeYear, profit: e.target.value } })} />
          </div>
          <div>
            <Label htmlFor="valuation">Target Valuation</Label>
            <Input id="valuation" placeholder="e.g., ₦3,000,000,000" value={outputs.threeYear?.valuation || ''} onChange={(e) => updateOutputs({ threeYear: { ...outputs.threeYear, valuation: e.target.value } })} />
          </div>
        </CardContent>
      </Card>

      {/* Company Purpose */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="w-5 h-5 text-indigo-700" /> Company Purpose (Contribution + Impact)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contrib">Contribution (What we do)</Label>
              <Input id="contrib" placeholder="e.g., help entrepreneurs scale themselves" value={outputs.purpose?.contribution || ''} onChange={(e) => updateOutputs({ purpose: { ...outputs.purpose, contribution: e.target.value } })} />
            </div>
            <div>
              <Label htmlFor="impact">Impact (Why it matters)</Label>
              <Input id="impact" placeholder="e.g., so they can scale their companies" value={outputs.purpose?.impact || ''} onChange={(e) => updateOutputs({ purpose: { ...outputs.purpose, impact: e.target.value } })} />
            </div>
          </div>
          <div>
            <Label htmlFor="statement">Purpose Statement</Label>
            <Textarea id="statement" value={outputs.purpose?.statement || ''} onChange={(e) => updateOutputs({ purpose: { ...outputs.purpose, statement: e.target.value } })} />
            <p className="text-xs text-slate-500 mt-1">Tip: We auto-generate “To [contribution] so that [impact].” Feel free to edit.</p>
          </div>
        </CardContent>
      </Card>

      {/* Core Values */}
      <Card className="border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl">Core Values (natural, inherent, positive, differentiated)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(outputs.coreValues || []).map((cv, idx) => (
            <div key={`cv-${idx}`} className="grid md:grid-cols-6 gap-3 items-end p-3 border rounded-md bg-white">
              <div className="md:col-span-4">
                <Label htmlFor={`cv-${idx}`}>Value</Label>
                <Input id={`cv-${idx}`} placeholder="e.g., Make the complex simple" value={cv.value} onChange={(e) => updateCoreValue(idx, { value: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Type</Label>
                <Select value={cv.type || 'core'} onValueChange={(v) => updateCoreValue(idx, { type: v as any })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="aspirational">Aspirational</SelectItem>
                    <SelectItem value="accidental">Accidental</SelectItem>
                    <SelectItem value="permission">Permission to Play</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-6 flex gap-2">
                <Button variant="outline" onClick={addCoreValue}>Add</Button>
                <Button variant="destructive" onClick={() => removeCoreValue(idx)}>Remove</Button>
              </div>
            </div>
          ))}
          <Alert className="border-amber-300 bg-amber-50">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm">Purge "permission to play" (e.g., honesty), acknowledge aspirational/accidental separately. Aim for 5–7 true core values.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Strategic Anchors */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5" /> Strategic Anchors (your defensible advantages)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(outputs.strategicAnchors || []).map((a, idx) => (
            <div key={`an-${idx}`} className="flex gap-3 items-end">
              <div className="flex-1">
                <Label htmlFor={`an-${idx}`}>Anchor {idx + 1}</Label>
                <Input id={`an-${idx}`} placeholder="e.g., Framework/model creation, owned media, centralized ops" value={a} onChange={(e) => updateAnchor(idx, e.target.value)} />
              </div>
              <Button variant="outline" onClick={addAnchor}>Add</Button>
              <Button variant="destructive" onClick={() => removeAnchor(idx)}>Remove</Button>
            </div>
          ))}
          <Alert className="border-blue-200 bg-blue-50">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm">Use anchors as your framework for saying no. Choose 3–5 themes you’re truly better at than competitors.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={() => onSave?.()}>Save</Button>
        <Button variant={canComplete ? 'default' : 'outline'} disabled={!canComplete} onClick={() => onDataChange({ ...data, clarifiedOutputs: true })}>
          Mark Outputs Clarified
        </Button>
        {!canComplete && (<p className="text-xs text-slate-500">Fill 3-year target, contribution + impact, at least one core value (type: core), and at least one strategic anchor.</p>)}
      </div>
    </div>
  );
};

export default ClarifyingYourDesiredOutputs;
