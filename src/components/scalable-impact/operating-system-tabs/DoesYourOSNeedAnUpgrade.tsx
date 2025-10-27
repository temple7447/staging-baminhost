import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";

export const DoesYourOSNeedAnUpgrade: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const diagnosticQuestions = [
    { id: 'plans', text: 'Plans are loosely defined and rarely followed' },
    { id: 'chaos', text: 'Work is chaotic and nothing important ever seems to get done aside from the things that are on fire' },
    { id: 'direction', text: 'Team members need to be constantly told what to do and no one seems to know what the heck is going on' },
    { id: 'meetings', text: 'Meetings feel like a total waste of time' },
    { id: 'profit', text: 'Profits are low even on higher sales' },
    { id: 'burnout', text: "You're burned out and feeling ready to quit" }
  ];

  const handleCheck = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            Does Your Operating System Need An Upgrade?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed">
            Welcome to what is probably the most important module in this entire program. If there is one thing that holds most businesses back, it is this:
          </p>
          <Alert className="border-amber-300 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-base font-semibold">
              The thing that holds you back is <span className="underline">you</span>. You are the bottleneck.
            </AlertDescription>
          </Alert>
          <p className="leading-relaxed">
            That's why at this stage, it is critical that we upgrade our business operating system. This module is going to be a big one, and that's because there's a lot to do—but it's all very important. The work you do here will quite possibly mean the difference between you stalling out or you scaling to level seven.
          </p>
        </CardContent>
      </Card>

      {/* The Core Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">The Core Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-amber-500">
            <p className="text-xl font-semibold mb-3">Do you run your business or does your business run you?</p>
            <p className="text-base">Do you own your business or does your business own you?</p>
          </div>
          <p className="leading-relaxed">
            Think about that for a minute. When you show up for work on Monday, are you deciding what's going to happen or does your business and the people around you decide that for you?
          </p>
        </CardContent>
      </Card>

      {/* The U Operating System */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">The "U" Operating System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-blue-200 bg-blue-50">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-base font-semibold">
              Most businesses are running on a "U Operating System" instead of a scalable operating system.
            </AlertDescription>
          </Alert>
          <p className="leading-relaxed">
            We call it that because <strong>you are the operating system and the operating system is you</strong>. Tell me if any of this sounds familiar:
          </p>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg">
              <h4 className="font-semibold mb-2">🌍 In the Beginning...</h4>
              <p className="text-sm leading-relaxed">
                When you first launched your business, a U operating system was all that you needed. You had the idea. You built it. You made it. You brought it to market. You were enough to birth this beautiful little planet orbiting around you called your business.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg">
              <h4 className="font-semibold mb-2">🌟 The Physics of Growth</h4>
              <p className="text-sm leading-relaxed">
                Just like in planetary physics, little things orbit around big things. Moons orbit planets, planets orbit suns. In the beginning when your business was little, you had no issues keeping that business in orbit.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-5 rounded-lg">
              <h4 className="font-semibold mb-2">⚠️ Then Something Happened</h4>
              <p className="text-sm leading-relaxed">
                Your business went from being this little thing to something a lot bigger. At some point it was no longer you keeping the business in orbit—you began swirling around your business. Because little things orbit around big things.
              </p>
            </div>
          </div>

          <Alert className="border-green-200 bg-green-50 mt-4">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <AlertDescription>
              <strong>Here's the encouragement:</strong> If you're feeling this right now, you're only feeling it because you've been successful. Your business would only be pulling you around if it had grown to a point that it was able to do it. You've done a lot of the right things!
            </AlertDescription>
          </Alert>

          <p className="leading-relaxed mt-4">
            That being said, if currently you're feeling <strong>stressed</strong> because the weight of the entire company rests on your shoulders, or <strong>exhausted</strong> because you have nine different jobs and on any given day you're asked to do seven of them, or <strong>trapped</strong> in a business you can never escape because you <em>are</em> the business and the business is you—when this happens, that is when we reach the point of burnout. The entrepreneurial equivalent of the "blue screen of death."
          </p>
        </CardContent>
      </Card>

      {/* The Big Lesson */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-700">The Big Lesson</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <p className="text-xl font-bold text-purple-800 mb-3">Growth is not enough.</p>
            <p className="leading-relaxed">
              Yes, growth is essential. Growth will always be a critical aspect of scale. But growth alone is not enough. The reality is that we simply cannot outgrow our own inefficiencies.
            </p>
          </div>
          <Alert className="border-purple-200 bg-white">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-base font-semibold">
              We must have systems if we want to sustain and scale our growth.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Diagnostic Checklist */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <CardTitle className="text-xl">System Overload Diagnostic</CardTitle>
          <p className="text-sm text-slate-600 mt-2">Check the boxes that apply to you to diagnose if you're experiencing system overload:</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {diagnosticQuestions.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <Checkbox
                  id={item.id}
                  checked={checkedItems[item.id] || false}
                  onCheckedChange={(checked) => handleCheck(item.id, checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor={item.id}
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {item.text}
                </label>
              </div>
            ))}
          </div>

          {checkedCount > 0 && (
            <Alert className={`mt-6 ${checkedCount >= 3 ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'}`}>
              <AlertTriangle className={`h-5 w-5 ${checkedCount >= 3 ? 'text-red-600' : 'text-yellow-600'}`} />
              <AlertDescription>
                <strong>You checked {checkedCount} item{checkedCount !== 1 ? 's' : ''}.</strong>
                {checkedCount >= 3 ? (
                  <span> Your operating system definitely needs an upgrade. But here's the good news: you are not broken, your business is not broken. You're in the right place because the solution to all of these is the same.</span>
                ) : (
                  <span> Your operating system could benefit from an upgrade. The good news is you're in the right place to fix this.</span>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* The Solution */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-700">The Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed font-semibold">
            We need to replace that U operating system that got you where you are now with a truly scalable operating system that has the ability to scale with your business as your business grows and keep everything in orbit.
          </p>
          <div className="bg-white p-6 rounded-lg border-2 border-green-300">
            <p className="text-xl font-bold text-green-800 mb-2">Our Goal:</p>
            <p className="text-lg leading-relaxed">
              Install an upgraded business operating system so that your company can run and scale <strong>without you</strong>.
            </p>
          </div>
          <p className="text-center text-lg font-semibold text-green-700 mt-6">
            Now that you know why you need an operating system, let's get started! →
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoesYourOSNeedAnUpgrade;
