import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Shield, Landmark } from "lucide-react";

export const WhatIsABoardOfAdvisors: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-2xl">What Is a Board of Advisors?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Don’t confuse a <strong>Board of Advisors</strong> with a <strong>Board of Directors</strong>. You likely want an advisory board at this stage.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-emerald-600" /> Board of Advisors</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Offers <strong>insight and advice</strong></li>
                <li><strong>Advocates for the founder/CEO</strong></li>
                <li>No fiduciary responsibility to the company</li>
                <li>Primary goal: support the CEO’s success and growth</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Landmark className="w-4 h-4 text-teal-600" /> Board of Directors</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Provides <strong>governance and oversight</strong></li>
                <li><strong>Advocates for shareholders</strong></li>
                <li>Fiduciary duties (duty of care, etc.)—with real consequences</li>
                <li>Hires/compensates/fires the CEO if needed</li>
              </ul>
            </div>
          </div>
          <Alert className="border-emerald-300 bg-white">
            <Lightbulb className="h-5 w-5 text-emerald-700" />
            <AlertDescription>
              Directors may be required at later stages (or by investors). For Level 5, build an <strong>advisory</strong> board—there to support you as CEO.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatIsABoardOfAdvisors;
