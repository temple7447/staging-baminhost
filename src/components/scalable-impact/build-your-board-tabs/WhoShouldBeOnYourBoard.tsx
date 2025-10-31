import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Users, Star } from "lucide-react";

export const WhoShouldBeOnYourBoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl">Who Should Be On Your Board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Aim for a mix of <strong>mentors</strong> and <strong>peers</strong> (heavier on peers), with optional <strong>strategics</strong> and an <strong>influencer</strong> to attract talent.
          </p>

          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1">Mentors (fewer)</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Have been where you want to go; know what you don’t know</li>
                <li>Challenge your endgame, close skills gaps, open networks</li>
                <li>Provide accountability—you won’t want to disappoint them</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1">Peers (more)</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>In-the-trenches problem solving—what worked last week</li>
                <li>Process “shiny objects” and keep focus</li>
                <li>Commiserate losses; celebrate wins in a safe place</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-semibold mb-1">Strategics (optional)</h4>
                <p className="text-sm">Specialized expertise (legal, logistics, etc.) for a season to execute key strategy.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-semibold mb-1 flex items-center gap-2"><Star className="w-4 h-4 text-amber-600" /> Influencer (optional)</h4>
                <p className="text-sm">A known name to attract others—acts like a “bug light” for great advisors.</p>
              </div>
            </div>
          </div>

          <Alert className="border-pink-200 bg-white">
            <Lightbulb className="h-5 w-5 text-pink-700" />
            <AlertDescription>
              Target a 4–7:1 ratio of peers to mentors. The right mentor is the ultimate shortcut—often helps recruit the rest.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoShouldBeOnYourBoard;
