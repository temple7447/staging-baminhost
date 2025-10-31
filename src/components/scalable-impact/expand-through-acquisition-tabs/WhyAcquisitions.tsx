import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, ArrowRight, Users, BarChart3, Globe, Wrench, Sparkles } from "lucide-react";

export const WhyAcquisitions: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50">
        <CardHeader>
          <CardTitle className="text-2xl">Why Acquisitions?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Most companies eventually hit an organic growth ceiling (market saturation, product expiration, team constraints, geographic limits). Acquisitions add options.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-violet-700" /> Add Leads & Channels</h4>
              <p className="text-sm">Acquire communities, media, or distribution (e.g., newsletters) instead of building from scratch.</p>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Wrench className="w-4 h-4 text-purple-700" /> Acqui‑hire Talent</h4>
              <p className="text-sm">Bolt on a capable team and know‑how to expand without stalling the core business.</p>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-700" /> Increase Market Share / Margins</h4>
              <p className="text-sm">Roll‑ups to grow share; buy higher‑margin product lines to lift profitability.</p>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-700" /> Amplify Enterprise Value</h4>
              <p className="text-sm">Strategic deals can arbitrage valuation multiples pre‑raise or pre‑exit.</p>
            </div>
          </div>
          <Alert className="border-violet-300 bg-white">
            <Lightbulb className="h-5 w-5 text-violet-700" />
            <AlertDescription>
              Acquisitions can be the fastest, “easiest,” and least risky path—because you’re buying real customers, revenue, and teams you can diligence.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhyAcquisitions;
