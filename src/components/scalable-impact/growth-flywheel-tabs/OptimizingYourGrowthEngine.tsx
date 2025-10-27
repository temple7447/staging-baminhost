import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Target, 
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Zap,
  BarChart3,
  Filter,
  Wrench
} from "lucide-react";

export const OptimizingYourGrowthEngine: React.FC = () => {
  // Scorecard state
  const [scorecardRows, setScorecardRows] = useState<Array<{
    stage: string;
    metric: string;
    target: string;
    current: string;
  }>>([{ stage: '', metric: '', target: '', current: '' }]);

  // Bottleneck state
  const [bottleneckStage, setBottleneckStage] = useState('');
  const [bottleneckReason, setBottleneckReason] = useState('');

  // Projects state
  const [projects, setProjects] = useState<Array<{
    title: string;
    impact: string;
    owner: string;
  }>>([{ title: '', impact: '', owner: '' }, { title: '', impact: '', owner: '' }, { title: '', impact: '', owner: '' }]);

  const addScorecardRow = () => {
    setScorecardRows([...scorecardRows, { stage: '', metric: '', target: '', current: '' }]);
  };

  const updateScorecardRow = (index: number, field: keyof typeof scorecardRows[0], value: string) => {
    const newRows = [...scorecardRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setScorecardRows(newRows);
  };

  const updateProject = (index: number, field: keyof typeof projects[0], value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const optimizationOrder = [
    {
      number: 1,
      title: 'Add New Offerings at the End',
      description: 'Can we sell customers more stuff? Make customers worth more by increasing AOV or LTV.',
      example: 'Add an upsell, cross-sell, or continuity program after initial purchase',
      principle: '"There\'s no such thing as a traffic problem, only offer problems. He or she who can spend the most to acquire a customer wins."',
      color: 'green'
    },
    {
      number: 2,
      title: 'Add New Channels',
      description: 'Pour more fuel onto the fire. Can we just invest more budget into what\'s working?',
      example: 'Increase ad spend, add another paid channel, scale what works',
      caveat: 'Only do this if you can afford it and if there\'s no major break in the middle of your engine.',
      color: 'blue'
    },
    {
      number: 3,
      title: 'Test New Entry Points',
      description: 'Don\'t break the whole engine—just test something new in one spot.',
      example: 'Shift from webinars to on-demand demos, update your lead magnet, refresh outdated special reports',
      color: 'purple'
    },
    {
      number: 4,
      title: 'New Growth Engines for Existing Products',
      description: 'If one engine is tired, create a new way to sell the same product.',
      example: 'Keep the product, build a different acquisition path',
      color: 'orange'
    },
    {
      number: 5,
      title: 'New Products for Existing Engines',
      description: 'Launch new products leveraging EXISTING proven growth engines.',
      example: 'Refresh the product but use the same acquisition process that already works',
      note: 'Always leverage existing before creating new!',
      color: 'amber'
    },
    {
      number: 6,
      title: 'New Products + New Engines (Last Resort)',
      description: 'Completely new product in a completely new way to a new audience.',
      warning: 'DO NOT START HERE! This is what entrepreneurs want to do when the flywheel stops spinning. Resist!',
      principle: '"That day will come. That day is not today."',
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900">Optimize Your Growth Engine</CardTitle>
          <p className="text-indigo-700 text-base mt-2">
            Turn your growth engine into a growth flywheel.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Now that your growth engine is mapped, it's time to optimize it. You've been mapping <strong>what IS</strong>—now it's time to say: 
            "Where can we optimize? What steps are missing? Where are customers getting stuck?"
          </p>
          <Alert className="border-purple-300 bg-purple-100">
            <Zap className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-purple-900">
              <strong>Once it's visualized, optimization becomes easy.</strong> You can look at your flowchart and spot exactly where you need to improve. 
              This is when growth engines become growth flywheels.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The 3 Steps */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">The 3 Steps to Optimization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Measure */}
          <div className="bg-white border-l-4 border-green-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 text-lg mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Measure
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Measure the performance of <strong>each growth engine stage</strong>. Build a <strong>growth scorecard</strong>—assign metrics to every stage.
                </p>
                <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-gray-700">
                  <p className="mb-2"><strong>Not vanity metrics</strong>—track by stage:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Paid ads: Click-through rate, cost per click</li>
                    <li>Landing page: Conversion rate</li>
                    <li>Email sequence: Open rate, click rate</li>
                    <li>Each stage gets a metric</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Identify */}
          <div className="bg-white border-l-4 border-blue-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Identify the Bottleneck
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Once you have your scorecard, it becomes <strong>very clear</strong> where the problem is. "This is the bottleneck. This is where it's locking up."
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900">
                  Sometimes you don't even need a scorecard—you just know. But scorecards make it crystal clear.
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Execute */}
          <div className="bg-white border-l-4 border-purple-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 text-lg mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Execute Projects
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Pick <strong>THREE projects per quarter</strong> (per 90-day sprint) that optimize the bottleneck stage.
                </p>
                <Alert className="border-purple-300 bg-purple-50">
                  <Lightbulb className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-900 text-xs">
                    <strong>Why three?</strong> Forces focus. Prioritizes impact over activity. It's the max a team can execute while maintaining existing obligations. 
                    A man who chases multiple rabbits catches none.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Build Your Scorecard */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Step 1: Build Your Growth Scorecard
          </CardTitle>
          <p className="text-sm text-orange-700 mt-2">
            Track each stage of your growth engine. Assign metrics to every post-it note.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {scorecardRows.map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Stage (e.g., LP opt-in)"
                  value={row.stage}
                  onChange={(e) => updateScorecardRow(index, 'stage', e.target.value)}
                />
                <Input
                  placeholder="Metric (e.g., CVR %)"
                  value={row.metric}
                  onChange={(e) => updateScorecardRow(index, 'metric', e.target.value)}
                />
                <Input
                  placeholder="Target"
                  value={row.target}
                  onChange={(e) => updateScorecardRow(index, 'target', e.target.value)}
                />
                <Input
                  placeholder="Current"
                  value={row.current}
                  onChange={(e) => updateScorecardRow(index, 'current', e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addScorecardRow}>
            + Add metric
          </Button>
        </CardContent>
      </Card>

      {/* Identify Bottleneck */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Step 2: Identify Your Bottleneck Stage
          </CardTitle>
          <p className="text-sm text-red-700 mt-2">
            Where is your growth engine locking up? Where are customers getting stuck?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Which stage is the bottleneck?</Label>
            <Input
              placeholder="Example: Landing page conversion"
              value={bottleneckStage}
              onChange={(e) => setBottleneckStage(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Why is it stuck?</Label>
            <Textarea
              placeholder="Example: Traffic is good, but landing page isn't converting. CTR is 2.5%, industry average is 5-8%. Copy might be weak, offer unclear."
              value={bottleneckReason}
              onChange={(e) => setBottleneckReason(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Execute 3 Projects */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Step 3: Pick Your 3 Projects for This Quarter
          </CardTitle>
          <p className="text-sm text-purple-700 mt-2">
            Three projects per 90-day sprint to unblock and optimize the bottleneck stage.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-300 bg-amber-50">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-900 text-sm">
              <strong>Rule:</strong> Max 3 initiatives per quarter. If you want to do more, you need more teams. 
              Three is the max a team can handle while maintaining existing work.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-white border-2 border-purple-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-purple-600">Project {index + 1}</Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-medium">Project Title</Label>
                    <Input
                      placeholder="Example: Rewrite LP headline"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Expected Impact</Label>
                    <Input
                      placeholder="Example: +3% CVR"
                      value={project.impact}
                      onChange={(e) => updateProject(index, 'impact', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Owner</Label>
                    <Input
                      placeholder="Example: Sarah (marketing)"
                      value={project.owner}
                      onChange={(e) => updateProject(index, 'owner', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Order of Optimization */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">The Order of Optimization</CardTitle>
          <p className="text-sm text-blue-700 mt-2">
            When choosing your 3 projects, follow this order. Start with #1, only move down if necessary.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {optimizationOrder.map((item) => {
            const getBorderColor = (color: string) => {
              const colors: Record<string, string> = {
                green: 'border-green-500',
                blue: 'border-blue-500',
                purple: 'border-purple-500',
                orange: 'border-orange-500',
                amber: 'border-amber-500',
                red: 'border-red-500'
              };
              return colors[color] || 'border-gray-500';
            };

            const getBgColor = (color: string) => {
              const colors: Record<string, string> = {
                green: 'bg-green-50',
                blue: 'bg-blue-50',
                purple: 'bg-purple-50',
                orange: 'bg-orange-50',
                amber: 'bg-amber-50',
                red: 'bg-red-50'
              };
              return colors[color] || 'bg-gray-50';
            };

            const getNumberBg = (color: string) => {
              const colors: Record<string, string> = {
                green: 'bg-green-600',
                blue: 'bg-blue-600',
                purple: 'bg-purple-600',
                orange: 'bg-orange-600',
                amber: 'bg-amber-600',
                red: 'bg-red-600'
              };
              return colors[color] || 'bg-gray-600';
            };

            return (
              <div key={item.number} className={`border-l-4 ${getBorderColor(item.color)} ${getBgColor(item.color)} p-4 rounded`}>
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 ${getNumberBg(item.color)} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                    {item.example && (
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Example:</strong> {item.example}
                      </p>
                    )}
                    {item.caveat && (
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Caveat:</strong> {item.caveat}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Note:</strong> {item.note}
                      </p>
                    )}
                    {item.warning && (
                      <Alert className="border-red-300 bg-red-100 mt-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-900 text-xs">
                          <strong>WARNING:</strong> {item.warning}
                        </AlertDescription>
                      </Alert>
                    )}
                    {item.principle && (
                      <p className="text-xs italic text-gray-600 mt-2 pl-3 border-l-2 border-gray-300">
                        {item.principle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Final Message */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Work With What Is
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            When optimizing, there are tactical things you can do—split testing, tweaks, improvements. But the principle is: 
            <strong> Try to work with what IS.</strong>
          </p>
          <div className="bg-white border-2 border-green-300 rounded-lg p-5">
            <p className="text-green-900 font-semibold mb-2">
              Work within the post-it notes and stages that already exist.
            </p>
            <p className="text-sm text-gray-700">
              Don't scrap the whole thing. There's a lot of value and a lot of gold there. Optimize existing stages before creating entirely new ones.
            </p>
          </div>

          <Alert className="border-blue-300 bg-blue-50">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900 text-sm">
              <strong>This is how growth engines become growth flywheels.</strong> Measure by stage. Identify the bottleneck. 
              Execute 3 projects per quarter. Repeat every 90 days. The flywheel spins faster and faster.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizingYourGrowthEngine;
