import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  RefreshCw,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign
} from "lucide-react";

export const SpinningTheFlywheel: React.FC = () => {
  const [month1Revenue, setMonth1Revenue] = useState('');
  const [month2Revenue, setMonth2Revenue] = useState('');
  const [month3Revenue, setMonth3Revenue] = useState('');
  const [believesTo100k, setBelievesTo100k] = useState(false);

  const meetsRevenue = 
    Number(month1Revenue) >= 10000 && 
    Number(month2Revenue) >= 10000 && 
    Number(month3Revenue) >= 10000;

  const meetsAllCriteria = meetsRevenue && believesTo100k;

  const flywheelSteps = [
    { number: 1, action: 'Map', description: 'Map your growth engine', icon: Target, color: 'blue' },
    { number: 2, action: 'Measure', description: 'Measure by stage', icon: TrendingUp, color: 'green' },
    { number: 3, action: 'Identify', description: 'Identify the bottleneck', icon: AlertTriangle, color: 'orange' },
    { number: 4, action: 'Optimize', description: 'Execute 3 projects to optimize', icon: Zap, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900 flex items-center gap-2">
            <RefreshCw className="w-7 h-7" />
            Spinning The Flywheel
          </CardTitle>
          <p className="text-indigo-700 text-base mt-2">
            This is what produces that up-and-to-the-right scalable growth.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Now that you've mapped and learned to optimize your growth engine, it's time to actually <strong>get the flywheel spinning</strong>. 
            Let me show you what that means visually.
          </p>
        </CardContent>
      </Card>

      {/* The Flywheel Process Visualization */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">The Flywheel Process</CardTitle>
          <p className="text-sm text-green-700 mt-2">
            Repeat this cycle every 90 days. This is what gets your flywheel spinning.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Flow */}
          <div className="bg-white rounded-lg border-2 border-green-300 p-6">
            <div className="space-y-4">
              {flywheelSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === flywheelSteps.length - 1;
                
                return (
                  <div key={step.number}>
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-${step.color}-600 text-white rounded-full flex items-center justify-center font-bold`}>
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 text-${step.color}-600`} />
                          <h3 className="font-bold text-gray-900 text-lg">{step.action}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="ml-6 my-2">
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Feedback Loop Arrow */}
            <div className="mt-6 pt-6 border-t-2 border-dashed border-green-300">
              <div className="flex items-center gap-3 text-green-800">
                <RefreshCw className="w-6 h-6" />
                <p className="font-semibold text-sm">
                  Feed it back in. Update your growth engine. Repeat every 90 days.
                </p>
              </div>
            </div>
          </div>

          <Alert className="border-purple-300 bg-purple-100">
            <Zap className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-purple-900">
              <strong>The Cycle:</strong> Map → Measure → Identify → Optimize → Map → Measure → Identify → Optimize. 
              Always updating, always improving the existing growth engine. <strong>This is the flywheel.</strong>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* The Big Secret */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">The Big Secret</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border-l-4 border-orange-500 p-5 rounded">
            <p className="text-gray-700 mb-3">
              The secret is <strong>NOT</strong> "let's create a new growth engine." That's called random acts of marketing. 
              That's what gets you in the chop.
            </p>
            <p className="text-orange-900 font-bold text-lg">
              If you want predictable GROWTH (not just predictable sales), you need to spin the flywheel.
            </p>
          </div>

          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-900 text-sm">
              <strong>Avoid the trap:</strong> Don't keep creating new engines. Spin the one you have. 
              Map → Measure → Identify → Optimize. Repeat.
            </AlertDescription>
          </Alert>

          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
            <p className="text-green-900 font-semibold mb-2">
              Stick to ONE growth engine.
            </p>
            <p className="text-sm text-gray-700">
              If you focus on just one growth engine—map it, measure it, identify the bottleneck, optimize it—you will get that spinning. 
              You will have a growth engine directly responsible for <strong>at least seven figures in annual revenue</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* The 1-10-3 Rule */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">The 1-10-3 Rule</CardTitle>
          <p className="text-blue-700 text-base mt-2">
            Don't launch additional growth engines until you meet these criteria.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rule Explanation */}
          <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-blue-900 mb-1">ONE</h3>
                <p className="text-sm text-gray-600">Growth Engine</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-green-900 mb-1">$10,000</h3>
                <p className="text-sm text-gray-600">Per Month Minimum</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-purple-900 mb-1">3 MONTHS</h3>
                <p className="text-sm text-gray-600">In a Row</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>One growth engine</strong> generating <strong>at least $10,000/month</strong> for <strong>at least 3 months in a row</strong>.
              </p>
              <p className="text-xs text-gray-700">
                This wasn't a one-off launch. Not a random campaign. Not getting lucky. Not a podcast pump. 
                This is $10,000/month <strong>directly attributed to that one growth engine</strong> at least 3 months in a row.
              </p>
            </div>
          </div>

          {/* Revenue Tracking Inputs */}
          <div className="bg-white border-2 border-green-300 rounded-lg p-5">
            <h3 className="font-bold text-green-900 text-lg mb-4">Track Your Progress</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your monthly revenue from your ONE growth engine:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium">Month 1 Revenue</Label>
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
                <Label className="text-sm font-medium">Month 2 Revenue</Label>
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
                <Label className="text-sm font-medium">Month 3 Revenue</Label>
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

            <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded">
              <input
                type="checkbox"
                id="believes100k"
                checked={believesTo100k}
                onChange={(e) => setBelievesTo100k(e.target.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="believes100k" className="text-sm font-medium cursor-pointer">
                  I believe this growth engine can scale to at least $100,000/month
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  Through optimization (mapping, measuring, identifying, optimizing), can this engine go from $10k/month to $100k/month?
                </p>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          {meetsRevenue && believesTo100k && (
            <Alert className="border-green-300 bg-green-50 animate-in fade-in">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <AlertDescription className="text-green-900">
                <p className="font-bold text-lg mb-2">🎉 Congratulations! You're ready to level up!</p>
                <p className="text-sm">
                  You've met the 1-10-3 rule. You can now let optimization efforts take place (baked into your process) 
                  and you're ready for <strong>Level 3</strong>.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {meetsRevenue && !believesTo100k && (
            <Alert className="border-yellow-300 bg-yellow-50">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <AlertDescription className="text-yellow-900 text-sm">
                <strong>Almost there!</strong> You're hitting $10k/month for 3 months, but ask yourself: 
                Can this engine scale to $100k/month? If not, keep optimizing.
              </AlertDescription>
            </Alert>
          )}

          {!meetsRevenue && (
            <Alert className="border-blue-300 bg-blue-50">
              <Target className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-900 text-sm">
                <strong>Keep spinning the flywheel.</strong> Continue the cycle: Map → Measure → Identify → Optimize. 
                Focus on getting your ONE engine to $10k/month for 3 consecutive months.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* The Why Behind $10k */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Why $10,000/month?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            You might be thinking: "Ryan, $10,000/month is not a million a year." You're right!
          </p>
          <div className="bg-white border-l-4 border-purple-500 p-5 rounded">
            <p className="text-purple-900 font-semibold mb-3">
              That's why you need to believe that growth engine can scale to at least <strong>$100,000/month</strong> in direct annual sales.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              If that growth engine can scale from <strong>$10k/month to $100k/month</strong> through optimization—by mapping, measuring, 
              identifying, and optimizing, by getting that flywheel spinning faster and faster—that's when you're ready to level up.
            </p>
          </div>

          <Alert className="border-green-300 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-900 text-sm">
              <strong>The goal:</strong> Once it's spinning fast enough ($10k/month × 3 months), you can let optimization efforts take place. 
              That's baked into your process. That's when you're ready for Level 3.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Final Message */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <RefreshCw className="w-6 h-6" />
            Keep The Flywheel Spinning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border-2 border-green-300 rounded-lg p-5">
            <p className="text-green-900 font-bold text-lg mb-3">
              Map → Measure → Identify → Optimize
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Repeat every 90 days. Always updating. Always improving. This produces that up-and-to-the-right scalable growth.
            </p>
            <p className="text-sm text-gray-700">
              Until you have ONE growth engine generating $10k/month for 3 months in a row (and you believe it can hit $100k/month), 
              keep all your focus here. <strong>This is how you win.</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpinningTheFlywheel;
