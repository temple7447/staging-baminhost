import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2,
  Trophy,
  Target,
  BarChart3,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Rocket
} from "lucide-react";

export const ReadyToLevelUpFlywheel: React.FC = () => {
  const [hasMapped, setHasMapped] = useState(false);
  const [hasScorecard, setHasScorecard] = useState(false);
  const [has90DayCadence, setHas90DayCadence] = useState(false);
  const [month1Revenue, setMonth1Revenue] = useState('');
  const [month2Revenue, setMonth2Revenue] = useState('');
  const [month3Revenue, setMonth3Revenue] = useState('');

  const meetsRevenue = 
    Number(month1Revenue) >= 10000 && 
    Number(month2Revenue) >= 10000 && 
    Number(month3Revenue) >= 10000;

  const allCheckboxes = hasMapped && hasScorecard && has90DayCadence;
  const canLevelUp = allCheckboxes && meetsRevenue;

  const checklistItems = [
    {
      id: 'mapped',
      title: 'Map Your Growth Engine',
      description: 'You\'ve mapped your growth engine. You know the stages from awareness to purchase.',
      checked: hasMapped,
      setChecked: setHasMapped,
      icon: Target,
      color: 'blue'
    },
    {
      id: 'scorecard',
      title: 'Build a Metrics Scorecard',
      description: 'Track the performance of each stage. You know where the machine might be breaking down.',
      checked: hasScorecard,
      setChecked: setHasScorecard,
      icon: BarChart3,
      color: 'green'
    },
    {
      id: 'cadence',
      title: 'Establish 90-Day Optimization Cadence',
      description: 'Check in weekly, but start a new optimization sprint every 90 days. Identify bottleneck, pick 3 projects, execute.',
      checked: has90DayCadence,
      setChecked: setHas90DayCadence,
      icon: Calendar,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900">Ready to Level Up from Level 2 to Level 3?</CardTitle>
          <p className="text-indigo-700 text-base mt-2">
            Check the boxes. Confirm you've done the work. Ascend to Level 3.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Once you have one growth engine generating at least <strong>$10,000/month</strong> in sales for at least <strong>3 months in a row</strong> 
            (and you believe it can scale to $100k/month), you're ready to level up from Level 2 to Level 3.
          </p>
        </CardContent>
      </Card>

      {/* The Checklist */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">The Level 2 Checklist</CardTitle>
          <p className="text-sm text-green-700 mt-2">
            Have you completed these core steps?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {checklistItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white border-2 border-green-300 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => item.setChecked(e.target.checked)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={item.id} className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`bg-${item.color}-600`}>{index + 1}</Badge>
                          <Icon className={`w-5 h-5 text-${item.color}-600`} />
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </label>
                    </div>
                  </div>
                  {item.checked && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}

          {allCheckboxes && (
            <Alert className="border-green-300 bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-900 text-sm">
                <strong>Great!</strong> You've mapped, measured, and established your 90-day cadence. 
                This is how you go from $10k/month to $100k/month through optimization—without building lots of new stuff.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* The 1-10-3 Rule Validation */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Confirm: The 1-10-3 Rule</CardTitle>
          <p className="text-sm text-blue-700 mt-2">
            One growth engine, $10,000/month, three months in a row.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm">
            Can you point to your growth engine and say: <strong>"This is generating at least $10,000/month, and it's done it for at least 3 months in a row"?</strong>
          </p>

          <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
            <h3 className="font-bold text-blue-900 mb-4">Enter Your Monthly Revenue:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Month 1</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={month1Revenue}
                    onChange={(e) => setMonth1Revenue(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Month 2</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={month2Revenue}
                    onChange={(e) => setMonth2Revenue(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Month 3</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={month3Revenue}
                    onChange={(e) => setMonth3Revenue(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            {meetsRevenue ? (
              <Alert className="border-green-300 bg-green-50 mt-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-900 text-sm">
                  <strong>✅ You meet the revenue requirement!</strong> At least $10k/month for 3 months in a row.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-yellow-300 bg-yellow-50 mt-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-900 text-sm">
                  Keep spinning the flywheel. You need $10k/month or more for 3 consecutive months.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* What Happens Next */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border-l-4 border-orange-500 p-5 rounded">
            <p className="text-gray-700 mb-3">
              Moving to Level 3 <strong>doesn't mean you stop optimizing</strong>. It means the process of optimization, 
              the process of spinning your growth flywheel, <strong>is installed</strong>.
            </p>
            <p className="text-orange-900 font-semibold mb-2">
              You and your team know how to do this.
            </p>
            <p className="text-sm text-gray-700">
              Growth is going to happen. It may not happen overnight—you may not hit growth targets immediately—but what you'll see is 
              your growth begins to <strong>compound</strong>. Month after month, it goes up. Month after month, your flywheel spins faster and faster.
            </p>
          </div>

          <Alert className="border-purple-300 bg-purple-100">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-purple-900 text-sm">
              <strong>The result:</strong> All these sales, all this revenue, all these customers start to become a strain on your operations. 
              That's a GOOD thing (it means there's motion), but it also means you need to upgrade your operating systems.
            </AlertDescription>
          </Alert>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-amber-900 font-semibold mb-2">
                  Your business held together by duct tape, bubble gum, and hope is going to start to pull apart.
                </p>
                <p className="text-sm text-gray-700">
                  That's good (motion is happening!) but bad (if we don't upgrade our operating systems, the machine will rattle apart). 
                  This is the problem for Level 3 → Level 4, which we'll cover next.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Status Card */}
      {canLevelUp ? (
        <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900 flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              Congratulations! You're Ready to Ascend!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white border-2 border-green-400 rounded-lg p-6">
              <p className="text-green-900 font-bold text-xl mb-3">
                ✅ You are ascending from Level 2 to Level 3!
              </p>
              <p className="text-gray-700 mb-3">
                You can point to your growth engine and say: <strong>"This is my growth engine, and it is generating at least $10,000/month, 
                and it's done it for at least 3 months in a row."</strong>
              </p>
              <div className="flex items-center gap-2 text-green-800 bg-green-100 border border-green-300 rounded p-4">
                <Rocket className="w-6 h-6" />
                <p className="font-semibold">
                  That's where I'll see you next. Welcome to Level 3.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Not Quite Ready Yet...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              You need to complete all the checklist items AND meet the 1-10-3 rule before you can level up.
            </p>
            
            <div className="space-y-2 text-sm">
              {!allCheckboxes && (
                <Alert className="border-yellow-300 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-900">
                    <strong>Complete the checklist:</strong> Make sure you've mapped your engine, built your scorecard, and established your 90-day cadence.
                  </AlertDescription>
                </Alert>
              )}
              {!meetsRevenue && (
                <Alert className="border-orange-300 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-900">
                    <strong>Meet the 1-10-3 rule:</strong> One growth engine, $10k/month, 3 months in a row.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="mt-4 bg-white border border-blue-300 rounded p-4">
              <p className="text-sm text-blue-900">
                <strong>Keep spinning the flywheel:</strong> Map → Measure → Identify → Optimize. Repeat every 90 days. You'll get there!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReadyToLevelUpFlywheel;
