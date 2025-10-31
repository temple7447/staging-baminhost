import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, CalendarDays, BarChart3, Megaphone } from "lucide-react";

export const RunningABoardMeeting: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-2xl">Running a Board (Advisory) Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Advisory boards are informal compared to directors. Focus on cadence and substance—not ceremony.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-700" /> Cadence</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Peers: meet every 2 weeks (at least monthly) or it fades.</li>
                <li>Mentor(s): at least monthly—ideally facilitating a mastermind.</li>
                <li>Strategics: ad‑hoc for critical decisions.</li>
                <li>Influencers: occasional visibility and introductions.</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-700" /> Agenda (60–90 min)</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Scorecard snapshot: Northstar + key team metrics</li>
                <li>Highlights and Lowlights since last meeting</li>
                <li>Top 1–3 bottlenecks or decisions—ask for targeted help</li>
                <li>Commitments to next actions; owners and dates</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="font-semibold mb-1 flex items-center gap-2"><Megaphone className="w-4 h-4 text-purple-700" /> Format</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>No Robert’s Rules needed—be honest, open, data‑driven.</li>
                <li>Share materials 24–48 hours in advance (scorecards, updates).</li>
                <li>Document decisions and owners; circulate 1‑page recap.</li>
              </ul>
            </div>
          </div>
          <Alert className="border-blue-300 bg-white">
            <Lightbulb className="h-5 w-5 text-blue-700" />
            <AlertDescription>
              If you consistently share numbers, call out highs/lows, and make clear asks, you’re running an effective advisory board—without bureaucracy.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunningABoardMeeting;
