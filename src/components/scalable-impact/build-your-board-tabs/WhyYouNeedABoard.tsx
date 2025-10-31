import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Users } from "lucide-react";

export const WhyYouNeedABoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl">Why You Need a Board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Welcome to Level 5. At this stage, scale makes “flying solo” dangerous. Entrepreneurship is lonely—and <strong>you don’t know what you don’t know</strong>. A Board of Advisors gives you insight, accountability, and support so you don’t fly blind.
          </p>
          <Alert className="border-indigo-300 bg-white">
            <Lightbulb className="h-5 w-5 text-indigo-700" />
            <AlertDescription>
              You reached a point where <em>not knowing</em> is no longer okay—and <em>not knowing what you don’t know</em> is risky. A board fixes that.
            </AlertDescription>
          </Alert>
          <ul className="list-disc ml-5 space-y-2">
            <li>Mentorship and peer support when stakes are high</li>
            <li>Objective perspective and pattern recognition you lack internally</li>
            <li>Accountability to the priorities that actually move the business</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhyYouNeedABoard;
