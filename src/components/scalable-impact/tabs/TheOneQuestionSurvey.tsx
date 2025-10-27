import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, PlusCircle, AlertTriangle, Info, Trophy } from "lucide-react";

export const TheOneQuestionSurvey: React.FC = () => {
  const [npsResponses, setNpsResponses] = useState('');
  const [insights, setInsights] = useState('');
  const [promotersCount, setPromotersCount] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Selling AND Serving: How to Know You've Succeeded</CardTitle>
          <p className="text-blue-700 text-base mt-2">
            Level 1 is about both selling AND serving. But how do you make sure customers actually feel served?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            How do you make sure your customer actually feels good about doing business with you? How do you know 
            they're happy—not just that they bought, but that they were served?
          </p>
          <p className="text-gray-700">
            You need that <strong>clarity</strong> and <strong>confidence</strong>. Not just that you can sell it, 
            but that people are happy they were sold to, that they did business with you.
          </p>
          <Alert className="border-green-200 bg-green-50">
            <Info className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              <strong>The Answer:</strong> The One-Question Survey. Ask this after every single sale to confirm 
              someone said, "Yep, I was served. I'm really happy I did business with this person, with this company."
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Question Card */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-900 flex items-center gap-3">
            <MessageSquare className="w-7 h-7" />
            The One-Question Survey (Net Promoter Score)
          </CardTitle>
          <p className="text-emerald-700 text-base mt-2">
            This is one of the most well-known questions in all of customer experience.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-slate-200 bg-slate-50">
            <Info className="h-4 w-4 text-slate-600" />
            <AlertDescription className="text-slate-700 text-sm">
              <strong>Credit:</strong> This is the Net Promoter Score (NPS), developed by Bain & Company. 
              This is something you can and should ask.
            </AlertDescription>
          </Alert>
          {/* The Question */}
          <div className="rounded-lg bg-white border-2 border-emerald-300 p-6 text-center shadow-sm">
            <div className="text-sm uppercase tracking-wider text-emerald-700 mb-2">The Question</div>
            <p className="text-lg font-bold text-gray-900">
              "On a scale of 0–10, how likely are you to recommend my services to a friend or colleague?"
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Understanding the Scores</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Promoters */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp className="w-6 h-6 text-green-600" />
                    <Badge className="bg-green-600 text-white font-bold">9-10</Badge>
                  </div>
                  <h4 className="font-bold text-green-800 mb-2">Promoters</h4>
                  <p className="text-sm text-green-700">
                    These customers LOVE what you do. They'll refer you to others and buy again. 
                    This is your target—get 10 promoters!
                  </p>
                </CardContent>
              </Card>

              {/* Passives */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Minus className="w-6 h-6 text-yellow-600" />
                    <Badge className="bg-yellow-600 text-white font-bold">7-8</Badge>
                  </div>
                  <h4 className="font-bold text-yellow-800 mb-2">Passives</h4>
                  <p className="text-sm text-yellow-700">
                    Satisfied but not enthusiastic. They won't actively promote you, 
                    and they might switch to a competitor.
                  </p>
                </CardContent>
              </Card>

              {/* Detractors */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsDown className="w-6 h-6 text-red-600" />
                    <Badge className="bg-red-600 text-white font-bold">0-6</Badge>
                  </div>
                  <h4 className="font-bold text-red-800 mb-2">Detractors</h4>
                  <p className="text-sm text-red-700">
                    Unhappy customers who can damage your brand through negative word-of-mouth. 
                    Fix this or they'll hurt your growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
            <h3 className="font-bold text-lg text-blue-900 mb-3">Why This Question Matters</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>1. It measures true satisfaction.</strong> Asking "Did you like it?" gets polite answers. 
                Asking "Would you recommend it?" reveals what they really think.
              </p>
              <p>
                <strong>2. It predicts growth.</strong> Promoters generate word-of-mouth. Detractors create drag. 
                Your goal: 10 promoters who will champion your business.
              </p>
              <p>
                <strong>3. It's actionable.</strong> If someone gives you a 6, ask "What would make it a 10?" 
                Now you have real feedback to improve.
              </p>
            </div>
          </div>

          <Separator />

          {/* What To Do With Different Scores */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-900">What To Do Based on Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                <p className="font-bold text-red-900 mb-2">If you're getting 1s, 2s, 3s (Detractors):</p>
                <p className="text-sm text-red-800">
                  <strong>You have a problem. Fix it.</strong> Something is broken. Don't proceed until you fix it.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-600">
                <p className="font-bold text-yellow-900 mb-2">If you're getting 5s, 6s, 7s, 8s (Passives):</p>
                <p className="text-sm text-yellow-800 mb-2">
                  You're on the right track, but there's optimization to be done. <strong>Don't get offended or upset.</strong>
                </p>
                <div className="bg-yellow-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-yellow-900">The Follow-Up Question:</p>
                  <p className="text-sm text-yellow-800 italic">
                    "What would need to happen for this to be a 9 or a 10? What would need to happen for this 
                    experience to be a 10 experience for you?"
                  </p>
                </div>
                <p className="text-sm text-yellow-800 mt-2">
                  This feedback will inform and help you improve your offering so you can sell and serve 10 promoters.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-bold text-green-900 mb-2">If you're getting 9s and 10s (Promoters):</p>
                <p className="text-sm text-green-800">
                  <strong>Perfect!</strong> These are your promoters. Your goal is to get 10 of these.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* The Reality Check */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                The Reality: You May Need to Sell More Than 10
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-yellow-200 bg-yellow-50">
                <Info className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <p className="font-semibold mb-2">Let me be clear—definitely:</p>
                  <p className="text-sm">
                    You're <strong>NOT</strong> going to sell 10 people and get 10 promoters. It's highly improbable. 
                    You may not even get all 10 to answer this survey.
                  </p>
                </AlertDescription>
              </Alert>

              <p className="text-sm text-gray-700">
                <strong>You may need to sell 15, 20, even 100 customers before you truly sell and serve 10 promoters.</strong>
              </p>

              <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                <p className="text-sm text-purple-900 mb-3">
                  <strong>That's okay. That is okay.</strong> Because again, this is about getting confidence and clarity.
                </p>
                <p className="text-sm text-purple-800">
                  Once you have sold <strong>at least 10</strong>, and specifically once you have <strong>10 promoters</strong> 
                  (NPS score of 9 or better), then congratulations—you are ready to graduate from Level 1 to Level 2!
                </p>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <Trophy className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Your Goal:</strong> Sell and serve at least 10. How do we know we've served them? 
                  They've given us an NPS score of 9 or better. Once you have 10 promoters, you're ready for Level 2!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Separator />

          {/* Follow-Up Question Planning */}
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-lg text-teal-900">Plan Your Follow-Up Questions</CardTitle>
              <p className="text-sm text-teal-700 mt-2">
                For anyone who scores below 9, you need to ask follow-up questions to improve.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="follow-up" className="text-sm font-medium text-teal-900">
                  What will you ask customers who give you a 5, 6, 7, or 8?
                </Label>
                <Textarea
                  id="follow-up"
                  placeholder="Example:&#10;- What would need to happen for this to be a 10 for you?&#10;- What was missing from your experience?&#10;- If you could change one thing, what would it be?&#10;- What would make you enthusiastically recommend us to others?"
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                  className="mt-2 min-h-[120px] bg-white"
                />
              </div>
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  <strong>Remember:</strong> Don't get defensive. This feedback is gold. It tells you exactly how to improve 
                  so you can turn passives into promoters.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Separator />

          {/* Promoters Counter */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Count Your Promoters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="promoters-count" className="text-sm font-medium text-green-900">
                    How many promoters (9-10 scores) do you have so far?
                  </Label>
                  <Input
                    id="promoters-count"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={promotersCount}
                    onChange={(e) => setPromotersCount(e.target.value)}
                    className="mt-2 max-w-xs bg-white text-2xl font-bold h-16"
                  />
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">/</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-700">10</p>
                  <p className="text-xs text-green-600 mt-1">Goal</p>
                </div>
              </div>
              {promotersCount && parseInt(promotersCount) >= 10 && (
                <Alert className="border-green-300 bg-green-100 mt-4">
                  <Trophy className="h-5 w-5 text-green-700" />
                  <AlertDescription className="text-green-900 font-semibold">
                    🎉 Congratulations! You have {promotersCount} promoters! You're ready to move to Level 2!
                  </AlertDescription>
                </Alert>
              )}
              {promotersCount && parseInt(promotersCount) < 10 && parseInt(promotersCount) > 0 && (
                <Alert className="border-blue-200 bg-blue-50 mt-4">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    Great progress! You have {promotersCount} promoter{parseInt(promotersCount) > 1 ? 's' : ''}. 
                    Keep going—{10 - parseInt(promotersCount)} more to reach your goal!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Track Your NPS Responses */}
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
                <PlusCircle className="w-5 h-5" />
                Track Your NPS Responses
              </CardTitle>
              <p className="text-sm text-indigo-700 mt-2">
                Use this space to track your customer responses and identify patterns.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nps-responses" className="text-sm font-medium text-indigo-900">
                  Customer Responses (e.g., "John - 9", "Sarah - 10", "Mike - 7")
                </Label>
                <Textarea
                  id="nps-responses"
                  placeholder="Track your NPS responses here...&#10;Example:&#10;John Smith - 10 (Would recommend immediately!)&#10;Sarah Johnson - 9 (Great service, minor delay)&#10;Mike Davis - 7 (Good but could improve communication)"
                  value={npsResponses}
                  onChange={(e) => setNpsResponses(e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
                <p className="text-xs text-indigo-600 mt-1">
                  Tip: Record the score, name, and any feedback they give you.
                </p>
              </div>

              <div>
                <Label htmlFor="nps-insights" className="text-sm font-medium text-indigo-900">
                  What patterns are you seeing? What can you learn?
                </Label>
                <Textarea
                  id="nps-insights"
                  placeholder="Reflect on the responses...&#10;- What do promoters love most?&#10;- What concerns do passives/detractors have?&#10;- What improvements should you make?"
                  value={insights}
                  onChange={(e) => setInsights(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setNpsResponses('');
                    setInsights('');
                  }}
                >
                  Clear
                </Button>
                <p className="text-xs text-indigo-600 flex items-center">
                  💡 This data is for your reference. Don't forget to log responses in the "Getting Your First 10" tab!
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheOneQuestionSurvey;
