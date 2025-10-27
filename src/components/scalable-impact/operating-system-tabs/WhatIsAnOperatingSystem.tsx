import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Monitor, Cpu, MessageSquare, Target } from "lucide-react";

export const WhatIsAnOperatingSystem: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Monitor className="w-6 h-6 text-blue-600" />
            What Is An Operating System?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed">
            Before we get into the actual building of your operating system, we should probably define exactly what we mean by an operating system.
          </p>
          <p className="leading-relaxed">
            Good chance that you generally know what a business operating system is. But when I realized we needed to upgrade our operating system, I didn't know exactly what an operating system was. So I just Googled "what is an operating system."
          </p>
          <p className="leading-relaxed">
            Of course, the definition that I ran across applied to <strong>computer operating systems</strong>. But when I looked closer, I realized that they can also apply to <strong>business operating systems</strong>.
          </p>
        </CardContent>
      </Card>

      {/* The Definition */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl">The Definition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg border-2 border-purple-300">
            <p className="text-2xl font-bold text-purple-900 mb-4 text-center">
              An operating system is...
            </p>
            <p className="text-xl leading-relaxed text-center text-slate-800">
              A set of <span className="font-bold text-purple-700">algorithms</span> and a <span className="font-bold text-blue-700">common language</span> that enables different components to communicate with one another in support of the <span className="font-bold text-green-700">desired outputs</span> of a machine.
            </p>
          </div>

          <Alert className="border-blue-200 bg-blue-50 mt-6">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              If you think about it, an operating system is basically <strong>algorithms</strong>—it's the source code that enables different components (keyboard, mouse, screen) to work together in support of whatever the desired output is (whatever the user is trying to do with a computer).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Three Components */}
      <Card className="border-2 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-xl">The Three Core Components</CardTitle>
          <p className="text-sm text-slate-600 mt-2">These three elements directly overlap with what every single business needs</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed text-slate-700 mb-6">
            If we take this definition and specifically the three different components, you'll see that they directly overlap to what every single business needs:
          </p>

          {/* Component 1: Algorithms */}
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-3 mb-3">
                <Cpu className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">1. Algorithms</h3>
                  <p className="text-lg font-semibold text-purple-700 mb-3">The Source Code of Your Business</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-base leading-relaxed mb-2">
                  <strong>What are the algorithms of a business?</strong>
                </p>
                <p className="text-base leading-relaxed text-slate-700">
                  Of course, the algorithms of a business are all the <strong>processes and standard operating procedures</strong>. All the documented systems that we have in place—that is the source code of the business.
                </p>
              </div>
              <div className="mt-3 text-sm text-purple-800 italic">
                💡 Examples: SOPs, playbooks, documented workflows, process libraries
              </div>
            </div>

            {/* Component 2: Common Language */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-3 mb-3">
                <MessageSquare className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">2. Common Language</h3>
                  <p className="text-lg font-semibold text-blue-700 mb-3">The User Interface of Your Business</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-base leading-relaxed mb-2">
                  <strong>What is the common language?</strong>
                </p>
                <p className="text-base leading-relaxed text-slate-700">
                  The common language is your <strong>communication and alignment</strong>. It's your dashboards, scorecards, and meeting rhythm. It's the user interface of your business.
                </p>
              </div>
              <div className="mt-3 text-sm text-blue-800 italic">
                💡 Examples: KPI dashboards, weekly meetings, scorecards, reporting cadences
              </div>
            </div>

            {/* Component 3: Desired Outputs */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start gap-3 mb-3">
                <Target className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-900 mb-2">3. Desired Outputs</h3>
                  <p className="text-lg font-semibold text-green-700 mb-3">Your Goals & Objectives</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-base leading-relaxed mb-2">
                  <strong>What are the desired outputs?</strong>
                </p>
                <p className="text-base leading-relaxed text-slate-700">
                  Obviously these are your <strong>goals and objectives</strong>. Every business knows you need to have goals, mission, vision—all that good stuff.
                </p>
              </div>
              <div className="mt-3 text-sm text-green-800 italic">
                💡 Examples: Annual goals, OKRs, mission statement, vision, strategic objectives
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Framework */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-xl text-amber-800">Your Operating System Framework</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed">
            By looking at the definition of a computer operating system, it absolutely informs what goes into a business operating system.
          </p>
          
          <Alert className="border-amber-300 bg-white">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-base">
              <strong>These three elements will form the foundation:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong className="text-purple-700">Algorithms</strong> (Processes & SOPs)</li>
                <li><strong className="text-blue-700">Common Language</strong> (Communication & Alignment)</li>
                <li><strong className="text-green-700">Desired Outputs</strong> (Goals & Objectives)</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="bg-white p-6 rounded-lg border-2 border-amber-300 mt-6">
            <p className="text-xl font-bold text-amber-900 text-center">
              This is the model, the framework, that we are going to be leveraging to build your operating system.
            </p>
          </div>

          <p className="text-center text-lg font-semibold text-amber-700 mt-6">
            Ready to build? Let's move to the next step! →
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatIsAnOperatingSystem;
