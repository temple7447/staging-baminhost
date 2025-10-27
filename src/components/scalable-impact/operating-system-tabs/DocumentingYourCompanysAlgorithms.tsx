import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, FileText, Users, Cpu, ArrowRight, CheckCircle, AlertTriangle, BarChart3, Cog, Target } from "lucide-react";

export const DocumentingYourCompanysAlgorithms: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Cpu className="w-6 h-6 text-purple-600" />
            Documenting Your Company's Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed">
            Documenting your set of algorithms is the <strong>foundation of your business operating system</strong>. It truly is the source code of your business.
          </p>
          <Alert className="border-purple-200 bg-white">
            <FileText className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-base">
              There are <strong>three components</strong> that make up any set of algorithms in any business.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Three Components Overview */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl">The Three Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">1. Map Value Engines</h3>
              </div>
              <p className="text-sm text-slate-700">
                Visual representation of how your company creates value in the marketplace.
              </p>
            </div>

            <div className="bg-gradient-to-b from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900">2. Document Playbooks</h3>
              </div>
              <p className="text-sm text-slate-700">
                Critical checklists and standard operating procedures that make your business run.
              </p>
            </div>

            <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-900">3. Assign Accountability</h3>
              </div>
              <p className="text-sm text-slate-700">
                Clear areas of accountability for who operates each system and process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component 1: Value Engines */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Component 1: Map Your Value Engines
            {completedSteps.valueEngines && <CheckCircle className="w-5 h-5 text-green-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-base">
              <strong>Goal:</strong> Visually document how your company creates value so that we can optimize and scale. You cannot optimize what you have not first documented.
            </AlertDescription>
          </Alert>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <p className="text-lg font-semibold mb-3 text-blue-900">The Most Important Question:</p>
            <p className="text-xl italic text-center bg-blue-50 p-4 rounded-lg border">
              "Where is value truly created in our business? How do we as a company deliver value to the marketplace?"
            </p>
            <p className="text-sm mt-3 text-slate-600">
              This is probably the most important question any business can ask. We are all in business because we deliver value over and above what we ask for in return.
            </p>
          </div>

          {/* Three Value Engine Types */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">The Three Value Engine Types:</h4>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-emerald-50 to-green-100 p-4 rounded-lg border-l-4 border-emerald-500">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <h5 className="font-bold text-emerald-900">1. Growth Engine</h5>
                </div>
                <p className="text-sm text-slate-700">
                  Visualizes how customers happen—the process your company goes through to attract and convert leads into customers. <strong>(You already have this!)</strong>
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Cog className="w-5 h-5 text-purple-600" />
                  <h5 className="font-bold text-purple-900">2. Fulfillment Engine</h5>
                </div>
                <p className="text-sm text-slate-700 mb-2">
                  Maps how you go about delivering the promised value. Once the sale is made, this is how we fulfill it.
                </p>
                <p className="text-xs text-slate-600 italic">
                  Examples: Warehouse fulfillment, software onboarding, clinic visits, surgery procedures, etc.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h5 className="font-bold text-blue-900">3. Innovation Engine</h5>
                </div>
                <p className="text-sm text-slate-700">
                  Documents how you create, update, and improve your offerings. <em>(Optional for now—focus on the first two)</em>
                </p>
              </div>
            </div>
          </div>

          {/* Mapping Process */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4">📝 Mapping Your Fulfillment Engine (6 Steps):</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p><strong>Identify the engine:</strong> Map the fulfillment engine for the product sold in your growth engine</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p><strong>Define start & end:</strong> Starts with the sale, ends with 10-star customer experience/delight</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p><strong>Brainstorm tasks:</strong> "Then what? Then what?" until you bridge start to end</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <p><strong>Add gateways:</strong> Decision diamonds turned on angle, connect with directional lines</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                <p><strong>Stakeholder review:</strong> Bring everyone in—"What did we miss?" Great for training!</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                <p><strong>Finalize (optional):</strong> Create flowchart tool version (most stay as post-it photos!)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
            <h4 className="font-bold text-lg text-green-800 mb-2">🎯 Your Action Step:</h4>
            <p className="text-base mb-3">
              Map the fulfillment engine for the growth engine you created in the last session. This completes your first <strong>Value Engine</strong>!
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Remember: Growth Engine + Fulfillment Engine = Value Engine</p>
              <p className="text-xs text-slate-600">This is performing "Level 1 at scale"—making both selling and serving scalable.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="value-engines"
              checked={completedSteps.valueEngines || false}
              onCheckedChange={() => handleStepComplete('valueEngines')}
            />
            <label htmlFor="value-engines" className="text-sm font-medium cursor-pointer">
              I have mapped my fulfillment engine to complete my first value engine
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Component 2: Company Playbooks */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6 text-green-600" />
            Component 2: Document Company Playbooks
            {completedSteps.playbooks && <CheckCircle className="w-5 h-5 text-green-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h4 className="font-semibold text-lg mb-2">What is a Company Playbook?</h4>
            <p className="text-base">
              A set of actionable step-by-step checklists that document the individual tasks that must be completed, as well as the order/sequence those tasks must be completed in, to execute a repeatable process or project.
            </p>
          </div>

          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-base">
              <strong>Critical Truth:</strong> Most literature says "document everything"—this is wrong! You actually don't need to create that many playbooks. You just need to document the <strong>most critical things</strong>.
            </AlertDescription>
          </Alert>

          {/* Best Practices */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">🎯 Playbook Creation Best Practices:</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-bold text-blue-900 mb-2">1. Define Done Before You Document</h5>
                  <p className="text-sm text-slate-700">Everyone must agree on the triggering and ending event. Know exactly where it starts and ends.</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-bold text-purple-900 mb-2">2. Every Playbook Must Have an Owner</h5>
                  <p className="text-sm text-slate-700">The person who does the task should document and maintain it. <strong>You should NOT be documenting everything!</strong></p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h5 className="font-bold text-orange-900 mb-2">3. Document While You Do</h5>
                  <p className="text-sm text-slate-700">Don't shut down for a month to document everything. Do the work, then document immediately while it's fresh.</p>
                </div>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-200">
                <h5 className="font-bold text-red-900 mb-3">❌ DON'T Document Everything!</h5>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>• Creates massive, unusable documentation library</p>
                  <p>• Nobody will find or use anything</p>
                  <p>• Won't get updated, will gather digital dust</p>
                  <p>• Giant waste of time</p>
                </div>
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-sm font-semibold text-green-700">✅ Instead: Document only the truly critical stages</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Identify Critical Stages */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-300">
            <h4 className="font-bold text-lg mb-3">🔍 How to Identify What's Critical:</h4>
            <p className="mb-3">Go back to your value engines and identify the <strong>"Power Stages"</strong>:</p>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-orange-900 mb-2">Power Stage Definition:</p>
              <p className="text-sm text-slate-700">
                A step/stage that is <strong>make or break</strong> for the entire value creation process. If you get this right, everything works. If you get it wrong, everything fails miserably.
              </p>
            </div>
            <Alert className="border-orange-200 bg-white mt-4">
              <Lightbulb className="h-5 w-5 text-orange-600" />
              <AlertDescription>
                <strong>Rule:</strong> Any value engine will have 3-5, maybe up to 7 power stages. So if you have one value engine, you only need 3-7 total playbooks!
              </AlertDescription>
            </Alert>
          </div>

          {/* Documentation Process */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4">📋 The Documentation Process (6 Steps):</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p><strong>Do it:</strong> Don't start documenting until you're actually doing the task</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p><strong>Document while doing:</strong> Real-time or immediately after (5-9 steps max!)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p><strong>Do it again:</strong> Follow your own steps like a "mindless drone" to find gaps</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <p><strong>Field test:</strong> Hand it to a non-expert to test (no curse of knowledge)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                <p><strong>Tweak & optimize:</strong> Based on field test feedback and questions</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-color text-xs font-bold flex-shrink-0">6</span>
                <p><strong>Deploy & integrate:</strong> Make available to everyone who needs it (even Google Docs works!)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
            <h4 className="font-bold text-lg text-green-800 mb-2">🎯 Your Action Step:</h4>
            <p className="text-base">
              Create a checklist for each of the power stages within the value engine you just mapped. Start your <strong>Playbook Vault</strong>!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="playbooks"
              checked={completedSteps.playbooks || false}
              onCheckedChange={() => handleStepComplete('playbooks')}
            />
            <label htmlFor="playbooks" className="text-sm font-medium cursor-pointer">
              I have created playbooks for the power stages in my value engine
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Component 3: Assign Accountability */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6 text-orange-600" />
            Component 3: Assign Clear Areas of Accountability
            {completedSteps.accountability && <CheckCircle className="w-5 h-5 text-green-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <AlertDescription className="text-base">
              <strong>The Reality:</strong> People make mistakes. When they do, they either point fingers ("It wasn't my fault!") or say "That's not my job." We need to eliminate both forever.
            </AlertDescription>
          </Alert>

          <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
            <h4 className="font-semibold text-lg mb-3">The Solution: High Output Team Canvas</h4>
            <p className="mb-3">Clearly documents who is responsible for what. But we start with the WHAT, not the WHO.</p>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">❌ Don't Start With People (Job Descriptions)</p>
              <p className="text-xs text-slate-600 mb-3">"Bob does all these things" - Job descriptions describe what people supposedly do, and half the time they're wrong.</p>
              
              <p className="text-sm font-semibold mb-2">✅ Start With Critical Activities</p>
              <p className="text-xs text-slate-600">Assign accountability for steps, stages, tasks, and activities that are truly critical (i.e., show up on value engines).</p>
            </div>
          </div>

          {/* High Output Team Canvas Process */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4">🗂️ Building Your High Output Team Canvas:</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold mb-2">Canvas Structure (Excel/Google Sheets):</h5>
                <div className="text-sm text-slate-700 space-y-1">
                  <p>• Team member names</p>
                  <p>• Teams they're on</p>
                  <p>• Direct reports</p>
                  <p>• <strong>Critical Accountability Bullets</strong> (the key section!)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h5 className="font-semibold mb-2">The Process:</h5>
                <div className="text-sm space-y-2">
                  <p><strong>1.</strong> Start with blank accountability bullets</p>
                  <p><strong>2.</strong> Go through each value engine stage by stage</p>
                  <p><strong>3.</strong> Ask: "Who does this particular stage?"</p>
                  <p><strong>4.</strong> Add that responsibility to their accountability bullets</p>
                  <p><strong>5.</strong> Continue until every critical stage is assigned</p>
                </div>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50 mt-4">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> You can add other responsibilities later, but start with value engine stages. We want to emphasize and prioritize the most critical work first.
              </AlertDescription>
            </Alert>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-300">
            <h4 className="font-bold text-lg text-orange-800 mb-2">🎯 Your Action Step:</h4>
            <p className="text-base">
              Assign clear areas of accountability for every task and activity in the value engine you just mapped. Let the value engines inform the accountability!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="accountability"
              checked={completedSteps.accountability || false}
              onCheckedChange={() => handleStepComplete('accountability')}
            />
            <label htmlFor="accountability" className="text-sm font-medium cursor-pointer">
              I have assigned clear accountability for every stage in my value engine
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Completion */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">Congratulations!</h3>
            <p className="text-lg text-slate-700">
              Once you complete all three components, you have officially created the <strong>set of algorithms</strong> for your business operating system.
            </p>
            <div className="bg-white p-6 rounded-lg border-2 border-green-300">
              <p className="text-xl font-bold text-green-900 mb-2">This is a big deal!</p>
              <p className="text-base text-slate-700">
                The source code of your business is written. Now that we have the source code of our business, it's time to begin building out the <strong>user interface</strong>.
              </p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-green-700">
              Ready for the next step: Communication Architecture! →
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentingYourCompanysAlgorithms;
