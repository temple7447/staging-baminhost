import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, HandCoins, Users, Sparkles } from "lucide-react";

export const CompensatingYourBoardMembers: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-2xl">Compensating Your Board Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-amber-300 bg-white">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <AlertDescription>
              Avoid giving equity for advisory services. Pay fairly for time, reciprocate with peers, barter when suitable, and use "access to the room" strategically.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1 flex items-center gap-2"><HandCoins className="w-4 h-4 text-amber-700" /> Flat Fee (Recommended)</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Mentors: often ₦ (equivalent of) $5k on the low end; $15–$20k/yr typical for access + periodic sessions.</li>
                <li>Strategics: may be higher for short, specialized seasons (e.g., legal, logistics, M&A).</li>
                <li>Even if someone offers to serve for free, consider paying something—compensated time shows up.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-sky-700" /> Peer Reciprocation</h4>
              <p className="text-sm">Peers typically don’t require payment—reciprocate by serving on each other’s boards or via a mastermind model.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-semibold mb-1">Barter for Services</h4>
                <p className="text-sm">Exchange specific expertise for advisory participation when cash isn’t the best currency for both parties.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-semibold mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-700" /> Access to the Room</h4>
                <p className="text-sm">Top names may waive/discount fees to sit with other top names—short‑term. Ensure the room is truly valuable.</p>
              </div>
            </div>
          </div>

          <Alert className="border-amber-300 bg-amber-50">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <AlertDescription>
              Rule of thumb: pay mentors and influencers; reciprocate with peers; use strategics surgically. Equity for advisors is rarely necessary—or wise.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompensatingYourBoardMembers;
