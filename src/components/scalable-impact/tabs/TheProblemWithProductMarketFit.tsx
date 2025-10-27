import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Target, Lightbulb, TrendingDown, CheckCircle2, X, Pen, Trophy } from "lucide-react";

export const TheProblemWithProductMarketFit: React.FC = () => {
  const [currentSalesCount, setCurrentSalesCount] = useState('');
  const [pricePoint, setPricePoint] = useState('');
  const [clarityNotes, setClarityNotes] = useState('');
  const [confidenceNotes, setConfidenceNotes] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [whereAreYou, setWhereAreYou] = useState('not-started');
  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7" />
            The Problem with "Product-Market Fit"
          </CardTitle>
          <p className="text-orange-700 text-base mt-2">
            You've probably heard about it in startup books. Here's why it's not as helpful as you think.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is PMF */}
          <div className="text-slate-700 space-y-3">
            <p className="text-base">
              If you read any startup literature, you'll come across the phrase <strong>"product-market fit."</strong> 
              It was coined by Marc Andreessen, and it's advice given to all entrepreneurs: achieve product-market fit 
              before you scale.
            </p>
            <p className="text-base">
              The idea is simple: make sure your product is a fit for the market. Don't scale until you achieve it. 
              <strong className="text-orange-900"> In concept, it sounds fine. But here's the problem...</strong>
            </p>
          </div>

          <Separator />

          {/* The Problems with PMF */}
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-5">
            <h3 className="font-bold text-lg text-red-900 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              Three Major Problems with Product-Market Fit
            </h3>
            <div className="space-y-4">
              {/* Problem 1 */}
              <div className="p-4 bg-white rounded-lg border-l-4 border-red-600">
                <p className="font-bold text-red-900 mb-2">1. It's Too Subjective</p>
                <p className="text-sm text-red-800 mb-3">
                  Product-market fit is just a concept—it's highly subjective. I tried to find a definition that 
                  everybody agreed on. I even posted on Twitter: "What does everyone agree product-market fit is?"
                </p>
                <div className="bg-red-100 p-3 rounded text-xs text-red-800 space-y-1">
                  <p>• Some said: "It's when you have a certain number of sales"</p>
                  <p>• Others said: "It's when the market is pulling you"</p>
                  <p>• More said: "You just know when you have it"</p>
                </div>
                <p className="text-sm text-red-800 mt-3 italic">
                  The answers were as diverse as could be. None of this is helpful!
                </p>
              </div>

              {/* Problem 2 */}
              <div className="p-4 bg-white rounded-lg border-l-4 border-red-600">
                <p className="font-bold text-red-900 mb-2">2. It's a Moving Target</p>
                <p className="text-sm text-red-800">
                  Product-market fit, once achieved, can be lost almost as quickly as you find it. Markets are always 
                  changing as you scale. What was a fit for this market is not a fit here.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <p className="text-xs text-red-700 italic">
                    You could spend months chasing something you can't define, then lose it anyway.
                  </p>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="p-4 bg-white rounded-lg border-l-4 border-red-600">
                <p className="font-bold text-red-900 mb-2">3. It's Not Actionable</p>
                <p className="text-sm text-red-800">
                  People chase after a concept they aren't really sure what it is. Even if they decide "Yay, I made it!" 
                  there's a good chance they'll lose it and have to start over again.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* The Better Way */}
          <Alert className="border-blue-200 bg-blue-50">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <p className="font-bold text-lg mb-2">We Need Something Simpler</p>
              <p className="text-sm">
                The concept of product-market fit could be helpful—feel free to read up on it. But for Level 1, 
                we need something <strong>objective</strong>, <strong>measurable</strong>, and <strong>actionable</strong>.
              </p>
            </AlertDescription>
          </Alert>

          <Separator />

          {/* Why 10 */}
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <h3 className="font-bold text-2xl text-green-900">Why 10 Customers?</h3>
            </div>
            <p className="text-base text-green-800 mb-4">
              What we've found time and time again is that once you have sold and served <strong>10 people</strong>, 
              10 seems to be the magic number.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-green-900 mb-2">
                  <strong>I don't care what your price point is.</strong> Whether you're selling something for ₦20 
                  or ₦20,000—in general, you're going to need to get 10.
                </p>
                <p className="text-sm text-green-800">
                  That's the first critical mass of feedback and opinion you need to know: <em>"We're good. We're comfortable to scale."</em>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Reason 1 */}
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="font-bold text-green-900">It's Objective</p>
                  </div>
                  <p className="text-sm text-green-800">
                    You <strong>know</strong> if you've sold and served 10. No ambiguity. No guessing. 
                    It's a clear, measurable standard.
                  </p>
                </div>

                {/* Reason 2 */}
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="font-bold text-green-900">It's Enough</p>
                  </div>
                  <p className="text-sm text-green-800">
                    10 customers may not sustain a business long-term, but it's enough to give you 
                    <strong> clarity and confidence.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Clarity and Confidence */}
          <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-6">
            <h3 className="font-bold text-xl text-indigo-900 mb-4">What 10 Customers Give You:</h3>
            
            <div className="space-y-4">
              {/* Clarity */}
              <div className="bg-white p-5 rounded-lg">
                <p className="font-bold text-lg text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> CLARITY
                </p>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li>• <strong>Who your market is</strong> — You understand who really wants this product</li>
                  <li>• <strong>What challenges you solve</strong> — You know the pain points you address</li>
                  <li>• <strong>How to message</strong> — You've learned what resonates with buyers</li>
                </ul>
              </div>

              {/* Confidence */}
              <div className="bg-white p-5 rounded-lg">
                <p className="font-bold text-lg text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💪</span> CONFIDENCE
                </p>
                <p className="text-sm text-indigo-800 mb-3">
                  Confidence to know that yes, people want what you have to offer. You're offering something of value—
                  not merely because they bought it, but because <strong>they told you it's great.</strong>
                </p>
                <div className="bg-indigo-100 p-4 rounded-lg border-l-4 border-indigo-600">
                  <p className="text-sm text-indigo-900 font-semibold mb-2">
                    This confidence is what you'll need in the dark times:
                  </p>
                  <p className="text-xs text-indigo-800">
                    When you roll out to a different market and face rejection... When you launch something you 
                    thought would work but doesn't... You can look back and say:
                  </p>
                  <p className="text-sm text-indigo-900 font-bold mt-3 italic">
                    "But you know what? I sold and served 10. And if there's 10, then there's 100. 
                    If there's 100, there's 1,000. And if there's 1,000, there is 10,000."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Where Are You Now Assessment */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
                <Target className="w-5 h-5" />
                Where Are You Right Now?
              </CardTitle>
              <p className="text-sm text-purple-700 mt-2">
                Let's assess your current position on the journey to 10 customers.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Current Status */}
              <div>
                <Label className="text-sm font-medium text-purple-900 mb-3 block">
                  What's your current status?
                </Label>
                <RadioGroup value={whereAreYou} onValueChange={setWhereAreYou}>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                    <RadioGroupItem value="not-started" id="not-started" />
                    <Label htmlFor="not-started" className="cursor-pointer text-sm">
                      Haven't started yet - Still in idea/planning phase
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                    <RadioGroupItem value="1-5" id="1-5" />
                    <Label htmlFor="1-5" className="cursor-pointer text-sm">
                      Made 1-5 sales - Just getting started
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                    <RadioGroupItem value="6-9" id="6-9" />
                    <Label htmlFor="6-9" className="cursor-pointer text-sm">
                      Made 6-9 sales - Almost there!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                    <RadioGroupItem value="10-plus" id="10-plus" />
                    <Label htmlFor="10-plus" className="cursor-pointer text-sm">
                      Made 10+ sales - Ready to scale!
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Sales count and price */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sales-count" className="text-sm font-medium text-purple-900">
                    How many sales have you made so far?
                  </Label>
                  <Input
                    id="sales-count"
                    type="number"
                    min="0"
                    placeholder="e.g., 3"
                    value={currentSalesCount}
                    onChange={(e) => setCurrentSalesCount(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="price-point" className="text-sm font-medium text-purple-900">
                    What's your average price point?
                  </Label>
                  <Input
                    id="price-point"
                    type="text"
                    placeholder="e.g., ₦5,000 or $100"
                    value={pricePoint}
                    onChange={(e) => setPricePoint(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
              </div>

              {/* Target date */}
              <div>
                <Label htmlFor="target-date" className="text-sm font-medium text-purple-900">
                  By what date do you commit to getting your first 10 customers?
                </Label>
                <Input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="mt-2 bg-white max-w-xs"
                />
                <p className="text-xs text-purple-600 mt-1">
                  Be realistic but ambitious. This is your accountability date.
                </p>
              </div>

              {/* Progress message */}
              {whereAreYou === 'not-started' && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 text-sm">
                    <strong>Time to start!</strong> Don't wait for perfection. Go make that first sale today. 
                    Even if it's to a friend or family member, get that first win under your belt.
                  </AlertDescription>
                </Alert>
              )}

              {whereAreYou === '1-5' && currentSalesCount && parseInt(currentSalesCount) > 0 && (
                <Alert className="border-blue-200 bg-blue-50">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    <strong>Great progress!</strong> You've made {currentSalesCount} sale{parseInt(currentSalesCount) > 1 ? 's' : ''}. 
                    You're on your way. Keep the momentum going—{10 - parseInt(currentSalesCount)} more to go!
                  </AlertDescription>
                </Alert>
              )}

              {whereAreYou === '6-9' && currentSalesCount && parseInt(currentSalesCount) >= 6 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <CheckCircle2 className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800 text-sm">
                    <strong>You're so close!</strong> You've proven people want what you offer. 
                    Just {10 - parseInt(currentSalesCount)} more customer{(10 - parseInt(currentSalesCount)) > 1 ? 's' : ''} to hit the magic number!
                  </AlertDescription>
                </Alert>
              )}

              {whereAreYou === '10-plus' && (
                <Alert className="border-green-200 bg-green-50">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 text-sm">
                    <strong>🎉 Congratulations!</strong> You've hit 10+ customers. You have the clarity and confidence to scale. 
                    Head to the "Getting Your First 10" tab to document your achievement!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Reflection Exercise */}
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-teal-900">
                <Pen className="w-5 h-5" />
                Clarity & Confidence Reflection
              </CardTitle>
              <p className="text-sm text-teal-700 mt-2">
                Use this space to think about what clarity and confidence will mean for YOUR business.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="clarity-notes" className="text-sm font-medium text-teal-900">
                  What CLARITY do you need from your first 10 customers?
                </Label>
                <p className="text-xs text-teal-700 mb-2">
                  (Who is your market? What messaging works? What problems do they have?)
                </p>
                <Textarea
                  id="clarity-notes"
                  placeholder="Example: I need to understand if small business owners (5-20 employees) in the service industry are my real target, or if I should focus on retail. I also need to know if 'save time' or 'increase revenue' resonates more in my messaging."
                  value={clarityNotes}
                  onChange={(e) => setClarityNotes(e.target.value)}
                  className="mt-1 min-h-[120px] bg-white"
                />
              </div>

              <div>
                <Label htmlFor="confidence-notes" className="text-sm font-medium text-teal-900">
                  What CONFIDENCE do you hope to gain from your first 10 customers?
                </Label>
                <p className="text-xs text-teal-700 mb-2">
                  (What doubts do you have now? What do you need to believe about your business?)
                </p>
                <Textarea
                  id="confidence-notes"
                  placeholder="Example: I need to believe that people will actually pay for this solution and not just say 'that's a nice idea.' I need proof that I can deliver real results and that customers will be happy they bought from me."
                  value={confidenceNotes}
                  onChange={(e) => setConfidenceNotes(e.target.value)}
                  className="mt-1 min-h-[120px] bg-white"
                />
              </div>

              <div className="rounded-lg border-l-4 border-teal-600 bg-white p-4">
                <p className="text-sm font-semibold text-teal-900 mb-2">
                  💡 Remember:
                </p>
                <p className="text-sm text-teal-800">
                  If there's 10, then there's 100. If there's 100, there's 1,000. And if there's 1,000, there is 10,000.
                  Your first 10 customers are the foundation of everything that comes after.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Final message */}
          <Alert className="border-slate-200 bg-slate-50">
            <AlertDescription className="text-slate-700">
              <p className="font-semibold mb-2">Now that you understand WHY 10...</p>
              <p className="text-sm">
                Head to the <strong>"Getting Your First 10"</strong> tab to start your checklist. 
                Let's get you those first 10 customers.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheProblemWithProductMarketFit;
