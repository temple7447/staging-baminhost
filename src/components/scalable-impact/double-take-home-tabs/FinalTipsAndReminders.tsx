import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Slash, HandCoins } from "lucide-react";

export const FinalTipsAndReminders: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Final Tips & Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <ul className="list-disc ml-5 space-y-2">
            <li>Never assume growth will save the day. Growth often <strong>eats</strong> profit. Fix expenses first.</li>
            <li>Do <strong>not</strong> cut your salary to make ratios work—protect the owner; scared money doesn’t scale.</li>
            <li>Save customer‑facing cuts for last. Prioritize customers → team → perks/offices.</li>
            <li>Avoid debt for operations. Don’t borrow to cover payroll or ongoing burn. If used, align debt to productive assets with clear ROI.</li>
            <li>“If you can’t buy it twice, you can’t afford it.” Build funds first; then buy.</li>
          </ul>
          <Alert className="border-amber-300 bg-amber-50">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <AlertDescription>
              Get your 1× OpEx operating buffer, 3–6 months EF, expense ratios, and monthly cash sweeps in place. That’s how take‑home doubles and stays doubled.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalTipsAndReminders;
