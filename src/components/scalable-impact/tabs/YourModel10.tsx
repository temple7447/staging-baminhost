import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  DollarSign, 
  Megaphone, 
  Star, 
  Target, 
  AlertTriangle, 
  Info, 
  Trophy, 
  List, 
  TrendingUp,
  MessageSquare,
  MapPin,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

export const YourModel10: React.FC = () => {
  const [model10List, setModel10List] = useState('');
  const [commonalities, setCommonalities] = useState('');
  const [bestOffer, setBestOffer] = useState('');
  const [findMore, setFindMore] = useState('');
  const [messaging, setMessaging] = useState('');
  const [whereHangOut, setWhereHangOut] = useState('');
  const [problemSolved, setProblemSolved] = useState('');
  const [resultsAchieved, setResultsAchieved] = useState('');
  const [refinedTarget, setRefinedTarget] = useState('');
  const [evolutionNotes, setEvolutionNotes] = useState('');
  
  // Count names in the list (split by comma or newline)
  const countNames = () => {
    if (!model10List.trim()) return 0;
    const names = model10List.split(/[,\n]+/).filter(name => name.trim().length > 0);
    return names.length;
  };
  
  const namesCount = countNames();
  
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Make Your Model 10 List</CardTitle>
          <p className="text-blue-700 text-base mt-2">
            Once you have 10 promoters, list them by name. These are the customers you'll keep in mind as you scale.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Once you have sold and served 10, you've got those 10 promoters. What I want you to do is actually <strong>make a list of them</strong>. 
            I want you to actually list them out <strong>by name</strong>. This is what we call your <strong>Model 10</strong>.
          </p>
          <Alert className="border-indigo-200 bg-indigo-50">
            <Info className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-indigo-800 text-sm">
              <strong>Why by name?</strong> When you go to Level 2 and begin building the growth flywheel, you need specific people 
              in mind. Not abstract ideas—actual customers with names.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Model 10 List Input */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <List className="w-6 h-6" />
            Your Model 10 List
          </CardTitle>
          <p className="text-sm text-green-700 mt-2">
            List your 10 promoters by name. If you have more than 10, choose the best 10.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="model10-list" className="text-sm font-medium text-green-900">
              List Your Model 10 Customers by Name
            </Label>
            <p className="text-xs text-green-700 mb-2">
              Enter one name per line or separate with commas. Be specific—use actual customer names.
            </p>
            <Textarea
              id="model10-list"
              placeholder="Example:&#10;John Smith&#10;Sarah Johnson&#10;Mike Davis&#10;Emily Chen&#10;David Rodriguez&#10;...or: John Smith, Sarah Johnson, Mike Davis..."
              value={model10List}
              onChange={(e) => setModel10List(e.target.value)}
              className="mt-2 min-h-[200px] bg-white font-mono"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-green-600">
                💡 Tip: You should be able to rattle these off by name if anyone asks.
              </p>
              <Badge variant={namesCount >= 10 ? "default" : "outline"} className={namesCount >= 10 ? "bg-green-600" : ""}>
                {namesCount} / 10 customers
              </Badge>
            </div>
          </div>

          {namesCount >= 10 && (
            <Alert className="border-green-300 bg-green-100">
              <Trophy className="h-5 w-5 text-green-700" />
              <AlertDescription className="text-green-900">
                <strong>✅ Perfect!</strong> You have your Model 10 list. You should know these names by heart. 
                If anyone asks "Who are your Model 10?" you should be able to rattle them off.
              </AlertDescription>
            </Alert>
          )}

          {namesCount > 0 && namesCount < 10 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Info className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">
                You have {namesCount} customer{namesCount > 1 ? 's' : ''} listed. Add {10 - namesCount} more to complete your Model 10. 
                If you don't have 10 yet, list the ones you have and make it your mission to get more like them.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Why This Matters for Level 2 */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Why This Matters for Level 2</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Now that you have your 10 promoters, when we go to <strong>Level 2</strong> and we're building the flywheel, 
            you need to actually have those 10 people in mind. You need to go back and study them. 
            Figure out what they have in common, where do they all hang out, what do they all want, 
            what problem did you solve for all of them, and what results did they all get.
          </p>
          <Alert className="border-purple-300 bg-purple-100">
            <TrendingUp className="h-5 w-5 text-purple-700" />
            <AlertDescription className="text-purple-900">
              <strong>Level 2 Strategy:</strong> You'll reverse-engineer your Model 10 to understand exactly who to target, 
              where to find them, and what to say. This is how you scale predictably.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* Messaging Insights Section */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Study Your Model 10: Key Insights
          </CardTitle>
          <p className="text-sm text-orange-700 mt-2">
            To scale, you need to understand your Model 10 deeply. Answer these questions based on your list.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Messaging that Worked */}
          <div>
            <Label htmlFor="messaging" className="text-sm font-medium text-orange-900 flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              What messaging worked with these 10 customers?
            </Label>
            <p className="text-xs text-orange-600 mb-2">
              What words, phrases, or angles resonated? What did you say that got them to buy?
            </p>
            <Textarea
              id="messaging"
              placeholder="Example: I talked about how they could save 10 hours a week without hiring more staff. The phrase 'get your time back' really resonated."
              value={messaging}
              onChange={(e) => setMessaging(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>

          {/* Where They Hang Out */}
          <div>
            <Label htmlFor="whereHangOut" className="text-sm font-medium text-orange-900 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Where do these customers hang out?
            </Label>
            <p className="text-xs text-orange-600 mb-2">
              What platforms, communities, groups, or places do they spend time in? (Online or offline)
            </p>
            <Textarea
              id="whereHangOut"
              placeholder="Example: Facebook groups for small business owners, local Chamber of Commerce meetings, Instagram following productivity coaches."
              value={whereHangOut}
              onChange={(e) => setWhereHangOut(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>

          {/* Problem Solved */}
          <div>
            <Label htmlFor="problemSolved" className="text-sm font-medium text-orange-900 flex items-center gap-1">
              <Target className="w-4 h-4" />
              What problem did you solve for all of them?
            </Label>
            <p className="text-xs text-orange-600 mb-2">
              What's the common thread? What pain point do they all share that you addressed?
            </p>
            <Textarea
              id="problemSolved"
              placeholder="Example: They all struggled with managing their schedules and were constantly overwhelmed with admin tasks."
              value={problemSolved}
              onChange={(e) => setProblemSolved(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>

          {/* Results Achieved */}
          <div>
            <Label htmlFor="resultsAchieved" className="text-sm font-medium text-orange-900 flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              What results did they all get?
            </Label>
            <p className="text-xs text-orange-600 mb-2">
              What outcomes, transformations, or wins did they experience? Be specific.
            </p>
            <Textarea
              id="resultsAchieved"
              placeholder="Example: They freed up 8-12 hours per week, felt less stressed, and could finally focus on growing their business instead of just managing it."
              value={resultsAchieved}
              onChange={(e) => setResultsAchieved(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Best Offer Section */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-900 flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Your Best Offer Based on Model 10
          </CardTitle>
          <p className="text-sm text-indigo-700 mt-2">
            Based on your Model 10, what's the best offer you can create or refine?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Your Model 10 will help you identify what offer works best. Look at what you sold them, 
            what they valued most, and how you packaged it. This is your foundation for scaling.
          </p>
          <div>
            <Label htmlFor="bestOffer" className="text-sm font-medium text-indigo-900">
              Describe your best offer based on your Model 10
            </Label>
            <p className="text-xs text-indigo-600 mb-2">
              What do you sell, how is it packaged, and why does it work for these customers?
            </p>
            <Textarea
              id="bestOffer"
              placeholder="Example: A 90-day 1:1 coaching program focused on automating business operations. $3,000 package. Works because it delivers fast wins and personal support."
              value={bestOffer}
              onChange={(e) => setBestOffer(e.target.value)}
              className="mt-2 min-h-[120px] bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Focus and Narrowing the Market */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Focus and Narrow Your Market
          </CardTitle>
          <p className="text-sm text-red-700 mt-2">
            Your Model 10 list is not static. As you learn and grow, you'll refine who you serve.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            You might find that of your first 10, maybe 7 are really similar and those are the ones you want more of. 
            <strong>Your Model 10 list might change</strong>. You might drop 3 and add 3 new ones as you get clearer on who you serve best.
          </p>
          <Alert className="border-amber-300 bg-amber-50">
            <Lightbulb className="h-5 w-5 text-amber-700" />
            <AlertDescription className="text-amber-900 text-sm">
              <strong>It's okay to get more specific!</strong> If you notice a pattern (e.g., 7 out of 10 are female entrepreneurs in health & wellness), 
              lean into that. Your Model 10 helps you narrow your market and messaging.
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="refinedTarget" className="text-sm font-medium text-red-900">
              Based on your Model 10, who is your refined target market?
            </Label>
            <p className="text-xs text-red-600 mb-2">
              After studying your Model 10, what patterns do you see? Who do you really serve best?
            </p>
            <Textarea
              id="refinedTarget"
              placeholder="Example: Female entrepreneurs in health & wellness, ages 30-50, running businesses between $50K-$250K/year, looking to scale without burning out."
              value={refinedTarget}
              onChange={(e) => setRefinedTarget(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Evolution and Next Steps */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Your Model 10 Will Evolve
          </CardTitle>
          <p className="text-sm text-purple-700 mt-2">
            As you grow, your Model 10 list will change. That's normal and healthy.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            When you get to <strong>Level 2 (100 customers)</strong>, you'll have a much clearer picture of who you serve best. 
            You might update your Model 10 list to reflect the absolute best customers you've worked with.
          </p>
          <Alert className="border-purple-300 bg-purple-100">
            <Lightbulb className="h-5 w-5 text-purple-700" />
            <AlertDescription className="text-purple-900 text-sm">
              <strong>This is your foundation for scale.</strong> Use this Model 10 list as your North Star. 
              When making decisions about offers, marketing, or partnerships, ask: "Would this attract more of my Model 10?"
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="evolutionNotes" className="text-sm font-medium text-purple-900">
              Notes on how your Model 10 has evolved or might evolve
            </Label>
            <p className="text-xs text-purple-600 mb-2">
              As you learn more, what adjustments will you make? Who might you add or remove from your Model 10?
            </p>
            <Textarea
              id="evolutionNotes"
              placeholder="Example: I started serving everyone, but now I see my Model 10 are all agencies with 10-50 employees. I'll focus on that niche moving forward."
              value={evolutionNotes}
              onChange={(e) => setEvolutionNotes(e.target.value)}
              className="mt-2 min-h-[100px] bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Final Reflection and Action Steps */}
      <Card className="border-teal-200 bg-teal-50">
        <CardHeader>
          <CardTitle className="text-xl text-teal-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Your Model 10 Action Plan
          </CardTitle>
          <p className="text-sm text-teal-700 mt-2">
            Commit to using your Model 10 as the foundation for your growth strategy.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-teal-300 bg-white p-5">
            <h3 className="font-bold text-lg text-teal-900 mb-3">Action Steps:</h3>
            <ol className="space-y-2 text-sm text-teal-800 list-decimal list-inside">
              <li>Complete your Model 10 list by name (above).</li>
              <li>Study your Model 10 and answer all the insight questions.</li>
              <li>Identify patterns: What do they have in common?</li>
              <li>Refine your target market based on these patterns.</li>
              <li>Create or refine your best offer based on what worked for them.</li>
              <li>When you move to Level 2, use this as your roadmap for scaling.</li>
            </ol>
          </div>

          <Alert className="border-green-300 bg-green-50">
            <Trophy className="h-5 w-5 text-green-700" />
            <AlertDescription className="text-green-900">
              <strong>Remember:</strong> These 10 people are your blueprint. If you can get 10, you can get 100. 
              If you can get 100, you can build a scalable, sustainable business.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourModel10;
