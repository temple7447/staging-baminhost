import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Info, Target, Users, Gift, HandHeart, HelpCircle, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Level1Data {
  hasMadeSale: boolean;
  hasDeliveredPromise: boolean;
  hasReached10Customers: boolean;
  hasTestimonials: boolean;
  hasTenPromoters: boolean;
  hasModel10List: boolean;
  promotersCount?: number;
  npsNotes?: string;
  model10List?: string;
  customerList: string;
  salesProof: string;
  testimonialText?: string;
  testimonialFileName?: string;
  isCompleted: boolean;
}

interface GettingYourFirst10Props {
  data: Level1Data;
  onDataChange: (data: Level1Data) => void;
}

export const GettingYourFirst10: React.FC<GettingYourFirst10Props> = ({ data, onDataChange }) => {
  // 5-Step Process State
  const [step1Problem, setStep1Problem] = useState('');
  const [step2Market, setStep2Market] = useState('');
  const [step3ValueInAdvance, setStep3ValueInAdvance] = useState('');
  const [step4OfferToHelp, setStep4OfferToHelp] = useState('');
  const [step5WhatElse, setStep5WhatElse] = useState('');

  const computeIsCompleted = (d: Level1Data) => {
    const hasTestimonialText = d.testimonialText ? d.testimonialText.trim().length >= 10 : false;
    return (
      d.hasMadeSale &&
      d.hasDeliveredPromise &&
      d.hasReached10Customers &&
      d.hasTestimonials &&
      d.hasTenPromoters &&
      d.hasModel10List &&
      hasTestimonialText
    );
  };

  const handleCheckboxChange = (field: keyof Level1Data, value: boolean) => {
    const newData = {
      ...data,
      [field]: value
    };
    onDataChange({
      ...newData,
      isCompleted: computeIsCompleted(newData)
    });
  };

  const handleTextChange = (field: keyof Level1Data, value: any) => {
    const newData = { ...data, [field]: value } as Level1Data;
    onDataChange({
      ...newData,
      isCompleted: computeIsCompleted(newData)
    });
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Getting Your First 10 Customers</CardTitle>
          <p className="text-blue-700 text-base mt-2">
            A simple 5-step process that works every single time—no matter what you're selling.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-yellow-200 bg-yellow-50">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-sm">
              <strong>Important:</strong> Sales and marketing truly deserve a course all their own (check out digitalmarketer.com). 
              But here's a simple process to get your first 10 that just flat out works.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The 5-Step Process */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-900">The 5-Step Process to Your First 10</CardTitle>
          <p className="text-sm text-indigo-700 mt-2">
            Follow these steps and document your strategy below.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Define the Problem */}
          <div className="bg-white p-5 rounded-lg border-l-4 border-indigo-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
                1
              </div>
              <Target className="w-6 h-6 text-indigo-600" />
              <h3 className="font-bold text-lg text-indigo-900">Define the Problem You Solve</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Be problem-first, not product-first. What specific problem do you solve? Write it down. 
              Make sure it's a common problem that other people would say "Yes, that IS a problem."
            </p>
            <div>
              <Label htmlFor="step1-problem" className="text-sm font-medium">
                What problem do you solve?
              </Label>
              <Textarea
                id="step1-problem"
                placeholder="Example: Small business owners struggle to manage client communication across multiple channels, leading to missed messages and lost revenue."
                value={step1Problem}
                onChange={(e) => setStep1Problem(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>

          {/* Step 2: Define Ideal Market */}
          <div className="bg-white p-5 rounded-lg border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                2
              </div>
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-blue-900">Define Your Ideal Market</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Your ideal market must have 3 things:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4 ml-4">
              <li><strong>1. They have the problem</strong> (and they KNOW they have it)</li>
              <li><strong>2. They have the means to pay</strong> (they can afford your solution)</li>
              <li><strong>3. They are targetable/reachable</strong> (you know where they hang out)</li>
            </ul>
            <Alert className="border-green-200 bg-green-50 mb-4">
              <Info className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 text-xs">
                Remember: We're only looking for 10. Don't worry if it's a small group—that's perfect for starting!
              </AlertDescription>
            </Alert>
            <div>
              <Label htmlFor="step2-market" className="text-sm font-medium">
                Who is your ideal market? (Be specific!)
              </Label>
              <Textarea
                id="step2-market"
                placeholder="Example: Service-based business owners (consultants, coaches, agencies) with 1-5 employees, revenue $100k-$500k/year, active on LinkedIn, members of local business associations."
                value={step2Market}
                onChange={(e) => setStep2Market(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>
          </div>

          {/* Step 3: Deliver Value in Advance (Optional) */}
          <div className="bg-white p-5 rounded-lg border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">
                3
              </div>
              <Gift className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-lg text-purple-900">Deliver Value in Advance <Badge variant="outline">Optional</Badge></h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              If the problem is bad enough and there's not much competition, you can skip this. But if you're in a competitive market 
              or people have been burned before, build trust by showing up and delivering real value FIRST.
            </p>
            <div className="bg-purple-100 p-3 rounded mb-4">
              <p className="text-xs text-purple-800">
                <strong>Examples:</strong> Join online communities and help for free, offer to speak at associations, 
                create helpful content, do a free first consultation, solve a small problem at no charge.
              </p>
            </div>
            <div>
              <Label htmlFor="step3-value" className="text-sm font-medium">
                How will you deliver value in advance? (Optional but recommended)
              </Label>
              <Textarea
                id="step3-value"
                placeholder="Example: I'll join 3 Facebook groups where my ideal customers hang out and answer questions for free for 2 weeks. I'll also offer a free 15-minute audit call where I identify their top 3 problems."
                value={step3ValueInAdvance}
                onChange={(e) => setStep3ValueInAdvance(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>

          {/* Step 4: Offer to Help */}
          <div className="bg-white p-5 rounded-lg border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold">
                4
              </div>
              <HandHeart className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-lg text-green-900">Offer to Help</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Once you've delivered value or found your ideal market, simply ask: <strong>"Do you want some help with that?"</strong>
            </p>
            <div className="bg-green-100 p-4 rounded mb-4">
              <p className="text-sm font-semibold text-green-900 mb-2">The Magic Close:</p>
              <p className="text-sm text-green-800 italic">
                "Do you want some help with that?" is one of the best closes you can use. Show up, point out the problem, 
                work with people, then simply ask if they want help. It works.
              </p>
            </div>
            <div>
              <Label htmlFor="step4-offer" className="text-sm font-medium">
                How will you offer to help? What's your pitch?
              </Label>
              <Textarea
                id="step4-offer"
                placeholder="Example: After showing them the 3 problems I identified, I'll ask 'Would you like some help fixing these?' Then explain my $500/month package that includes..."
                value={step4OfferToHelp}
                onChange={(e) => setStep4OfferToHelp(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>

          {/* Step 5: Ask What Else? */}
          <div className="bg-white p-5 rounded-lg border-l-4 border-orange-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white font-bold">
                5
              </div>
              <HelpCircle className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-lg text-orange-900">Ask "What Else?"</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Ask what else you can do for two reasons:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4 ml-4">
              <li><strong>1. Additional revenue</strong> - In the early days, you need it</li>
              <li><strong>2. Product ideas</strong> - They'll tell you what else they need that you should be offering</li>
            </ul>
            <div>
              <Label htmlFor="step5-whatelse" className="text-sm font-medium">
                What will you ask? How will you discover additional needs?
              </Label>
              <Textarea
                id="step5-whatelse"
                placeholder="Example: At the end of each engagement, I'll ask 'What else are you struggling with that I might be able to help with?' and 'If I could wave a magic wand and solve one more problem for you, what would it be?'"
                value={step5WhatElse}
                onChange={(e) => setStep5WhatElse(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Ruthie's Pet-Sitting Case Study */}
      <Card className="border-pink-200 bg-pink-50">
        <CardHeader>
          <CardTitle className="text-lg text-pink-900">📖 Real Case Study: Ruthie's Pet-Sitting Business</CardTitle>
          <p className="text-sm text-pink-700 mt-2">
            This process works at ALL levels. Here's proof from a summer pet-sitting business.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg space-y-3">
            <div>
              <p className="font-semibold text-sm text-pink-900">Step 1: The Problem</p>
              <p className="text-sm text-gray-700">
                Neighbors with small pets (gerbils, rabbits, etc.) couldn't board them when going on summer trips. 
                Nobody to watch their animals.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-pink-900">Step 2: Ideal Market</p>
              <p className="text-sm text-gray-700">
                • People in our neighborhood with pets ✓<br/>
                • They have the money (nice neighborhood) ✓<br/>
                • Targetable (neighborhood Facebook group, Next Door, bike-able distance) ✓
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-pink-900">Step 3: Value in Advance</p>
              <p className="text-sm text-gray-700">
                Free first visit: "I'll come by, meet your pet, make sure they're comfortable with me. Totally free."
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-pink-900">Step 4: Offer to Help</p>
              <p className="text-sm text-gray-700">
                "Can I take care of Fluffy while you're on your trip?" Close rate: ~100%
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-pink-900">Step 5: What Else?</p>
              <p className="text-sm text-gray-700">
                Customers kept saying: "While you're here, could you also water my plants?" Added plant watering for extra $5.
              </p>
            </div>
          </div>
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              <strong>The Result:</strong> This process just works. The clients told her exactly what she needed to offer!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* Forget Scalability Section */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-lg text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Forget Scalability (For Now)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-800">
            When I explain this process, people often ask: <em>"But HOW do I do it? Should I buy Facebook ads? Do SEO? Send cold emails?"</em>
          </p>
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <p className="font-bold text-base mb-2">It doesn't actually matter at this stage.</p>
              <p className="text-sm">
                People say: "Yeah, I know I can get 10, but it won't be scalable. If I just email people or ask for referrals, 
                yeah I could get 10, but then what?"
              </p>
            </AlertDescription>
          </Alert>
          <div className="bg-white p-5 rounded-lg border-l-4 border-red-600">
            <p className="font-bold text-lg text-red-900 mb-3">✍️ Write This Down:</p>
            <p className="text-base font-bold text-red-900 mb-3">
              FORGET SCALABILITY. Just sell and serve 10 customers.
            </p>
            <p className="text-sm text-gray-700 mb-3">
              At this point, it's not about building a scalable sales and marketing process. That will come later. 
              That's literally Level 2. Right now, it's just about getting your first 10 customers so you can build clarity and confidence.
            </p>
            <div className="bg-red-100 p-4 rounded mt-4">
              <p className="text-sm text-red-900 font-semibold mb-2">Getting your first 10 is NOT a question of ABILITY.</p>
              <p className="text-sm text-red-800">
                If I took your favorite pet hostage (which I would never do!) and said you can't get them back until you sell 10 people, 
                you would figure it out. If you had to do one-on-one outreach, dress up in a gorilla suit and spin a sign on the corner—
                you would do it and you'd do a good job serving them.
              </p>
            </div>
            <p className="text-sm text-gray-700 mt-4 font-semibold">
              This is simply a question of WILL. I'm removing all constraints. I don't care how non-scalable your process is. 
              I simply want you to get 10.
            </p>
          </div>
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-sm">
              <strong>Warning:</strong> People who say "I won't launch until it's perfect" or "I won't execute because it's not scalable" 
              are usually just making excuses. They're more afraid of failing than excited about achieving their Level 7 life.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* Checklist Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Level 1 Checklist</CardTitle>
          <p className="text-muted-foreground">
            Complete ALL requirements below to prove you have a viable business and unlock Level 2.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Checklist Items (existing checkboxes) */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="made-sale"
                checked={data.hasMadeSale}
                onCheckedChange={(checked) => handleCheckboxChange('hasMadeSale', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="made-sale" className="font-semibold cursor-pointer">
                    I have made at least 1 actual sale
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">A customer paid you real money (not a free trial or promise).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Real money exchanged hands. Someone paid you for your product or service.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="delivered-promise"
                checked={data.hasDeliveredPromise}
                onCheckedChange={(checked) => handleCheckboxChange('hasDeliveredPromise', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="delivered-promise" className="font-semibold cursor-pointer">
                    I have delivered on my promise and the customer was happy
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">Delivery completed, customer confirmed satisfaction.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You fulfilled what you promised. The customer got value and was satisfied.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="reached-10"
                checked={data.hasReached10Customers}
                onCheckedChange={(checked) => handleCheckboxChange('hasReached10Customers', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reached-10" className="font-semibold cursor-pointer">
                    I have reached 10 paying, satisfied customers
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">10 unique customers (not repeated transactions).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You've successfully sold to and served 10 different customers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-testimonials"
                checked={data.hasTestimonials}
                onCheckedChange={(checked) => handleCheckboxChange('hasTestimonials', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-testimonials" className="font-semibold cursor-pointer">
                    I have testimonials, referrals, or feedback from actual buyers
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">A sentence from a real buyer, screenshot, or public review.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You have proof that customers were happy and would recommend you.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-ten-promoters"
                checked={data.hasTenPromoters}
                onCheckedChange={(checked) => handleCheckboxChange('hasTenPromoters', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-ten-promoters" className="font-semibold cursor-pointer">
                    I have at least 10 promoters (NPS 9–10)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">Ask: "On a scale of 0–10, how likely are you to recommend us?" Count 9s and 10s.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <span>Promoters (9–10):</span>
                  <Input
                    type="number"
                    min={0}
                    value={data.promotersCount ?? ''}
                    onChange={(e) => handleTextChange('promotersCount' as any, String(e.target.value))}
                    className="h-8 w-24"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-model10"
                checked={data.hasModel10List}
                onCheckedChange={(checked) => handleCheckboxChange('hasModel10List', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-model10" className="font-semibold cursor-pointer">
                    I have created my "Model 10" list (high LTV + high advocacy)
                  </Label>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  List your 10 best customers by name.
                </p>
                <Textarea
                  placeholder="List your 10 best customers by name (comma or newline separated)"
                  value={data.model10List || ''}
                  onChange={(e) => handleTextChange('model10List', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Documentation Section */}
          <div className="space-y-4 pt-4 border-t">
            <Label className="text-lg font-bold text-gray-800">
              Document Your Proof (at least one short testimonial is required):
            </Label>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="testimonial-text" className="text-sm font-medium">
                  Short testimonial or proof (required)
                </Label>
                <Textarea
                  id="testimonial-text"
                  placeholder="e.g., 'This saved me 10 hours a week' — Ada, bakery owner"
                  value={data.testimonialText || ''}
                  onChange={(e) => handleTextChange('testimonialText', e.target.value)}
                  className="mt-1"
                />
                {!data.testimonialText || data.testimonialText.trim().length < 10 ? (
                  <p className="text-xs text-red-600 mt-1">Please enter at least 10 characters to proceed.</p>
                ) : (
                  <p className="text-xs text-green-700 mt-1">Looks good.</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="testimonial-file" className="text-sm font-medium">
                  Optional screenshot or file
                </Label>
                <input
                  id="testimonial-file"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleTextChange('testimonialFileName', file ? file.name : '');
                  }}
                  className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {data.testimonialFileName && (
                  <p className="text-xs text-gray-600 mt-1">Selected: {data.testimonialFileName}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="customer-list" className="text-sm font-medium">
                Briefly describe your 10 customers and what you learned (optional)
              </Label>
              <Textarea
                id="customer-list"
                placeholder="Who did you serve, what did you sell, what did you learn?"
                value={data.customerList}
                onChange={(e) => handleTextChange('customerList', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Success Message */}
          {data.isCompleted && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>🎉 Congratulations!</strong> You've completed Level 1. You have the clarity and confidence to scale. 
                Head to the "Ready to Level Up" tab!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GettingYourFirst10;
