import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Target, AlertTriangle, Trophy, Rocket, Lightbulb, Pen } from "lucide-react";

export const DoThisFirst: React.FC = () => {
  const [commitment, setCommitment] = useState('');
  const [agreedToStart, setAgreedToStart] = useState(false);
  return (
    <div className="space-y-6">
      <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-pink-600" />
            <CardTitle className="text-2xl text-pink-900">
              Do This First!
              <Badge className="ml-3 bg-red-500 text-white">MANDATORY</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Opening statement */}
          <div className="text-slate-700 space-y-4">
            <p className="text-lg font-semibold">
              Now that you know your number—you're clear on what Level 7 is going to look like for you—we need to chart a path and walk through all seven levels, starting from the beginning.
            </p>
            <p className="text-base">
              We're going to start at <strong>Level 1: Sell and Serve 10 Customers.</strong>
            </p>
          </div>

          <Separator />

          {/* Warning about skipping */}
          <Alert className="border-l-4 border-red-400 bg-red-50">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <p className="font-bold mb-2">⚠️ A lot of people skip this step. Don't be one of them!</p>
              <p className="text-sm">
                I'm glad you're here watching this lesson. The reality is that many entrepreneurs skip this part. 
                Let me tell you a cautionary tale about why you want to make sure you actually do this first.
              </p>
            </AlertDescription>
          </Alert>
            
          {/* The Story */}
          <Card className="border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-900">The "Want-Entrepreneur" Story</CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800 space-y-3">
              <p className="text-sm">
                I was speaking at an event when someone approached me—a really sharp, brilliant entrepreneur with:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>A great idea</li>
                <li>A beautiful website</li>
                <li>The makings of a solid team</li>
                <li>A product that seemed like a no-brainer</li>
              </ul>
              <p className="text-sm mt-3">
                They were seeking advice and funding. There was just one really big problem...
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-yellow-600">
                <p className="font-bold text-yellow-900">When I asked, "How many sales have you made?"</p>
                <p className="text-sm italic mt-2">
                  Their response made me throw up a little in my mouth: <strong>"Zero. We haven't made any sales yet. 
                  We want to make sure everything is perfect so that when we launch, we're able to scale."</strong>
                </p>
              </div>
              <p className="text-sm mt-4">
                Did you catch that? They were waiting for perfection before launching. That person was a <strong>want-entrepreneur</strong>, 
                not a real entrepreneur. Because <strong className="text-lg">entrepreneurs launch businesses. Period.</strong>
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* The Typical Launch Plan */}
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-blue-900">The Typical (Wrong) Launch Plan</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">Tell me if this sounds familiar:</p>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1️⃣ Get a brilliant new business idea → <strong>Get excited!</strong></li>
              <li>2️⃣ Buy the domain name → <strong>Woo! The business already exists!</strong></li>
              <li>3️⃣ Start researching exotic cars → <strong>We're gonna be so rich!</strong></li>
              <li>4️⃣ Come up with MORE ideas → <strong>Avoid the scary part: actually launching</strong></li>
            </ol>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                Most entrepreneurs love the idea phase. They love buying domain names. But they never actually 
                launch because that's the scary part.
              </p>
            </div>
          </div>

          <Separator />

          {/* If you made one sale */}
          <Alert className="border-green-200 bg-green-50">
            <Trophy className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <p className="font-bold text-lg mb-2">If you've made just ONE sale...</p>
              <p className="text-sm">
                You are <strong>orders of magnitude further</strong> in this journey than somebody who merely comes up with ideas—
                even if they got the domain name, built a pretty website, or got office space.
              </p>
            </AlertDescription>
          </Alert>

          <Separator />

          {/* The Two Things to Confirm */}
          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-5">
            <h3 className="font-bold text-lg text-purple-900 mb-4">Before You Can Scale, Confirm These Two Things:</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border-l-4 border-purple-600">
                <p className="font-bold text-purple-900 mb-2">1. You have something that people want to BUY</p>
                <p className="text-sm text-purple-800">
                  Does anybody actually want what you're selling? Even one, two, three... ultimately, we want to get it to 10.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border-l-4 border-purple-600">
                <p className="font-bold text-purple-900 mb-2">2. You are able to actually DELIVER on your promise</p>
                <p className="text-sm text-purple-800">
                  Level 1 is <strong>sell AND serve</strong>. Not just sell. We want to make sure that when we sell, 
                  our customers are happy that they bought.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* The Goal */}
          <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-7 h-7 text-indigo-600" />
              <div className="text-xs font-bold uppercase tracking-widest text-indigo-700">The Goal</div>
            </div>
            <div className="text-xl font-extrabold text-indigo-900 mb-4">
              Sell and serve 10 customers so that you have the CLARITY and CONFIDENCE you need to scale.
            </div>
            <p className="text-sm text-indigo-800">
              These two words are so important: <strong className="text-base">Clarity and Confidence</strong>. 
              These are the two things you need if you're going to succeed and scale to Level 2 and beyond.
            </p>
          </div>

          {/* Commitment Section */}
          <Card className="border-rose-200 bg-rose-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-rose-900">
                <Pen className="w-5 h-5" />
                Make Your Commitment
              </CardTitle>
              <p className="text-sm text-rose-700 mt-2">
                Write down your commitment to completing Level 1. Make it real by putting it in writing.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="commitment" className="text-sm font-medium text-rose-900">
                  I commit to selling and serving 10 customers by:
                </Label>
                <Textarea
                  id="commitment"
                  placeholder="Write your commitment here...\n\nExample:\n'I commit to getting my first 10 customers by December 31st. I will focus on solving [specific problem] for [specific customer type]. I will not waste time on logos, office space, or perfecting my website until I have proven this with real customers.'\n\nTarget Date: _________\nFirst 3 Customers I Will Reach Out To: _________"
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                  className="mt-2 min-h-[150px] bg-white"
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-rose-300">
                <Checkbox
                  id="agreed-to-start"
                  checked={agreedToStart}
                  onCheckedChange={(checked) => setAgreedToStart(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreed-to-start" className="text-sm cursor-pointer text-rose-900">
                  <strong>I understand:</strong> I will NOT move to Level 2 until I have completed Level 1. 
                  I will focus on getting 10 customers FIRST before worrying about scaling, systems, or perfection.
                </Label>
              </div>

              {agreedToStart && commitment.trim().length > 20 && (
                <Alert className="border-green-200 bg-green-50">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 text-sm">
                    <strong>Excellent!</strong> You've made your commitment. Now go make it happen. 
                    Head to the <strong>"Getting Your First 10"</strong> tab to start your checklist.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Final message */}
          <Alert className="border-slate-200 bg-slate-50">
            <AlertDescription className="text-slate-700">
              <p className="font-semibold mb-2">Ready to get started?</p>
              <p className="text-sm">
                Head to the <strong>"Getting Your First 10"</strong> tab to complete your Level 1 checklist. 
                Let's get you both clarity and confidence.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoThisFirst;
