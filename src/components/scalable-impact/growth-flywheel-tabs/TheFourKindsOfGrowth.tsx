import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, Activity, Minus, Lightbulb, Target, Zap } from "lucide-react";

export const TheFourKindsOfGrowth: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('');
  const [notes, setNotes] = useState('');

  const growthPatterns = [
    {
      id: 'spike',
      name: 'The Spike',
      subtitle: 'The One-Hit Wonder',
      icon: TrendingDown,
      color: 'red',
      description: 'You launch, sales spike up, and then sales come right back down and flatten out somewhere around zero immediately following launch.',
      example: 'You finally finished your product, got your first 10, and then have not been able to repeat it ever since.',
      feeling: 'You\'ve tasted success but can\'t repeat it. It\'s painful.'
    },
    {
      id: 'chop',
      name: 'The Chop',
      subtitle: 'Unpredictable Sales',
      icon: Activity,
      color: 'orange',
      description: 'You launch successfully, but then it fades. So you try something different. Facebook ads, then webinars, then affiliate promotions, SEO... You don\'t know what\'s working.',
      example: 'Sales are unpredictable. You\'re practicing random acts of marketing.',
      feeling: 'You feel like a wacky wavy inflatable tube man, flailing around. Everything works, everything stops working, nothing compounds.'
    },
    {
      id: 'flatline',
      name: 'The Flatline',
      subtitle: 'Stalled Growth',
      icon: Minus,
      color: 'yellow',
      description: 'Growth is just generally stalled. Your sales might be "predictable" but predictably bad or predictably on a downturn.',
      example: 'You wish you had predictable sales, but what if your sales are predictably stalled?',
      feeling: 'Growth has stopped. You\'re stuck.'
    },
    {
      id: 'ramp',
      name: 'The Ramp',
      subtitle: 'Predictable Growth',
      icon: TrendingUp,
      color: 'green',
      description: 'Your actions and activities compound. You do something this month and it works, and next month it works better and better.',
      example: 'You have the flywheel effect. Once spinning, it goes faster and faster, building and compounding upon itself.',
      feeling: 'This is the goal. Predictable, repeatable, scalable growth.'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      red: isSelected ? 'border-red-500 bg-red-50' : 'border-red-200',
      orange: isSelected ? 'border-orange-500 bg-orange-50' : 'border-orange-200',
      yellow: isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-yellow-200',
      green: isSelected ? 'border-green-500 bg-green-50' : 'border-green-200'
    };
    return colors[color as keyof typeof colors] || '';
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600'
    };
    return colors[color as keyof typeof colors] || '';
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Build a Growth Flywheel</CardTitle>
          <p className="text-blue-700 text-base mt-2">
            Shift from one-off sales to predictable, repeatable, and scalable sales.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Now that you've confirmed you have something people want to buy and that you can fulfill on your promises, 
            it's time to get your sales and marketing flywheel spinning so that customers don't just happen randomly—they happen <strong>consistently and predictably</strong>.
          </p>
        </CardContent>
      </Card>

      {/* The One-Hit Wonder Story */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Pop Quiz: What Do These Bands Have in Common?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center">
            {['The Knack', 'Tommy Tone', 'Mr. Big', 'Sir Mix-a-Lot', 'Los Del Rio', 'Right Said Fred'].map((band) => (
              <div key={band} className="bg-white border border-purple-200 rounded-lg p-3">
                <p className="text-sm font-medium text-purple-900">{band}</p>
              </div>
            ))}
          </div>
          
          <Alert className="border-purple-300 bg-white">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-purple-900">
              <strong>They were all one-hit wonders.</strong> They had one amazing hit that rocketed to the top of the charts 
              and never repeated that success again. They didn't figure out a way to predictably and consistently generate hit after hit.
            </AlertDescription>
          </Alert>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-900 font-semibold">
              The goal of Level 2 is to make sure your business is NOT a one-hit wonder.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* The Four Kinds of Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Which Best Describes Your Growth Right Now?</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            What does the growth for your business look like right now?
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={selectedPattern} onValueChange={setSelectedPattern}>
            <div className="space-y-4">
              {growthPatterns.map((pattern) => {
                const Icon = pattern.icon;
                const isSelected = selectedPattern === pattern.id;
                
                return (
                  <div
                    key={pattern.id}
                    className={`rounded-lg border-2 p-5 cursor-pointer transition-all ${getColorClasses(pattern.color, isSelected)}`}
                    onClick={() => setSelectedPattern(pattern.id)}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value={pattern.id} id={pattern.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`w-6 h-6 ${getIconColor(pattern.color)}`} />
                          <div>
                            <Label htmlFor={pattern.id} className="text-lg font-bold cursor-pointer">
                              {pattern.name}
                            </Label>
                            <p className={`text-sm font-medium ${getIconColor(pattern.color)}`}>
                              {pattern.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>What it looks like:</strong> {pattern.description}
                        </p>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Example:</strong> {pattern.example}
                        </p>
                        
                        <p className="text-xs italic text-gray-600">
                          {pattern.feeling}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {selectedPattern && (
            <div className="mt-4">
              <Label htmlFor="notes" className="text-sm font-medium">
                Reflection: Why does this describe your current situation?
              </Label>
              <p className="text-xs text-gray-600 mb-2">
                What specific experiences led you to choose this pattern?
              </p>
              <Textarea
                id="notes"
                placeholder="Example: I launched a course last year that sold well initially, but then sales dropped to almost nothing. I've been trying Facebook ads, webinars, and email marketing, but nothing has been consistent..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          )}

          {selectedPattern && selectedPattern !== 'ramp' && (
            <Alert className="border-blue-300 bg-blue-50">
              <Target className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>You're in the right place.</strong> If you answered anything other than "The Ramp," this is exactly where you need to be. 
                We're going to systemize your sales process so growth becomes predictable, repeatable, and scalable.
              </AlertDescription>
            </Alert>
          )}

          {selectedPattern === 'ramp' && (
            <Alert className="border-green-300 bg-green-50">
              <Zap className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-900">
                <strong>Excellent!</strong> You're experiencing the ramp. Now let's make sure you can maintain and optimize it 
                by building a proper growth engine.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* The Goal: Systemized Growth */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            The Goal: Systemized Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border-2 border-green-300 rounded-lg p-5">
            <p className="text-gray-700 mb-3">
              At this level, the goal isn't just to launch (you already did that). The goal isn't merely to grow or get as many sales as possible.
            </p>
            <p className="text-green-900 font-bold text-lg mb-3">
              The goal is <strong>systemized growth</strong>.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build systems that produce customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build systems that produce revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build systems that produce growth</span>
              </li>
            </ul>
          </div>

          <Alert className="border-orange-300 bg-orange-50">
            <Lightbulb className="h-5 w-5 text-orange-600" />
            <AlertDescription className="text-orange-900 text-sm">
              <strong>Not random acts of marketing:</strong> Flailing around like a wacky wavy inflatable tube man might make some money, 
              but that's not what we're after. We're after that growth curve. We're after that growth ramp.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Growth Engine */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-900">You Only Need ONE Growth Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border-2 border-indigo-300 rounded-lg p-5">
            <p className="text-indigo-900 font-bold text-lg mb-3">
              Write this down: You only need <strong>ONE</strong> growth engine to break through the seven-figure sales barrier.
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Making the leap from six figures to seven figures is about doing <strong>one thing extremely well</strong>. 
              Having one way of attracting and converting:
            </p>
            <div className="flex items-center justify-center gap-2 text-center py-3 bg-indigo-50 rounded">
              <span className="font-semibold text-indigo-900">Leads → Prospects → Customers → Raving Fans</span>
            </div>
          </div>

          <Alert className="border-purple-300 bg-purple-100">
            <Target className="h-5 w-5 text-purple-700" />
            <AlertDescription className="text-purple-900">
              <strong>Focus on one.</strong> Until you have a growth engine that can be responsible for <strong>seven figures a year</strong> 
              ($1M+ in annual revenue) directly attributed to that one engine, you're not going to build a second one. 
              We'll focus on one and one only.
            </AlertDescription>
          </Alert>

          <div className="text-center py-4">
            <p className="text-sm text-gray-600 italic">
              "This discussion begs the question: What is a growth engine? That's exactly what we'll answer in the next tabs."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheFourKindsOfGrowth;
