import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, DollarSign, Megaphone, Star, Target } from "lucide-react";

export const YourModel10: React.FC = () => {
  const [commonalities, setCommonalities] = useState('');
  const [bestOffer, setBestOffer] = useState('');
  const [findMore, setFindMore] = useState('');
  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-900 flex items-center gap-3">
            <Star className="w-7 h-7" />
            Your "Model 10"
          </CardTitle>
          <p className="text-purple-700 text-base mt-2">
            These are your 10 best customers—high lifetime value (LTV) + high advocacy. They're your blueprint for growth.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is Model 10 */}
          <div className="rounded-lg border-2 border-purple-300 bg-white p-6">
            <h3 className="font-bold text-lg text-purple-900 mb-3">What is a "Model 10" Customer?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your Model 10 are the customers who represent your ideal. They pay you well, they stay with you long, 
              and they tell others about you. If you could clone your customer base, you'd clone these 10.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* High LTV */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <DollarSign className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">High Lifetime Value (LTV)</h4>
                  <p className="text-xs text-green-700">
                    They either pay you a lot, buy frequently, or stay with you for a long time. 
                    These customers are profitable.
                  </p>
                </div>
              </div>

              {/* High Advocacy */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Megaphone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">High Advocacy</h4>
                  <p className="text-xs text-blue-700">
                    They refer others, leave reviews, and promote you without being asked. 
                    These customers are your marketing engine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-5">
            <h3 className="font-bold text-lg text-orange-900 mb-3">Why Your Model 10 Matters</h3>
            <div className="space-y-3 text-sm text-orange-800">
              <p>
                <strong>1. They show you who to target.</strong> Look at your Model 10. What do they have in common? 
                Same industry? Same problem? Same budget? That's your target market.
              </p>
              <p>
                <strong>2. They reveal your best offer.</strong> What did they buy? What problem did you solve for them? 
                Double down on that offer—it's proven.
              </p>
              <p>
                <strong>3. They become your referral engine.</strong> These customers will introduce you to others like them. 
                Ask them: "Who else do you know who has this problem?"
              </p>
            </div>
          </div>

          {/* How to Build Your Model 10 */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                How to Identify Your Model 10
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                <li>
                  <strong>List all your customers.</strong> Even if you only have 5, list them.
                </li>
                <li>
                  <strong>Rate each one:</strong>
                  <ul className="ml-6 mt-2 space-y-1 list-disc list-inside text-xs">
                    <li>How much revenue did they generate (or will they generate)?</li>
                    <li>How enthusiastic are they? (Did they give you a 9 or 10 on NPS?)</li>
                    <li>Would they refer you to others?</li>
                  </ul>
                </li>
                <li>
                  <strong>Pick your top 10.</strong> If you don't have 10 yet, pick your top 3-5 and aim to get more like them.
                </li>
                <li>
                  <strong>Study them.</strong> What do they have in common? Where did they come from? What problem did you solve?
                </li>
                <li>
                  <strong>Go find more of them.</strong> Now you know exactly who to target and where to find them.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-5">
            <h3 className="font-bold text-lg text-indigo-900 mb-2">Action Step</h3>
            <p className="text-sm text-indigo-800">
              Go back to the <strong>"Getting Your First 10"</strong> tab and fill in your Model 10 list. 
              Write down the names of your best customers. If you don't have 10 yet, list the ones you do have 
              and make it your mission to find more like them.
            </p>
          </div>

          {/* Reflection Exercise */}
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-teal-900">
                <Target className="w-5 h-5" />
                Model 10 Reflection Exercise
              </CardTitle>
              <p className="text-sm text-teal-700 mt-2">
                Answer these questions to clarify who your ideal customer is and where to find more.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="commonalities" className="text-sm font-medium text-teal-900">
                  1. What do your best customers have in common?
                </Label>
                <p className="text-xs text-teal-700 mb-2">
                  (Industry, size, problem, budget, location, behavior patterns?)
                </p>
                <Textarea
                  id="commonalities"
                  placeholder="Example: All are service-based businesses with 5-20 employees, struggling with client management, budget $500-2000/month..."
                  value={commonalities}
                  onChange={(e) => setCommonalities(e.target.value)}
                  className="mt-1 min-h-[100px] bg-white"
                />
              </div>

              <div>
                <Label htmlFor="best-offer" className="text-sm font-medium text-teal-900">
                  2. What specific offer/solution did they buy from you?
                </Label>
                <p className="text-xs text-teal-700 mb-2">
                  (What problem did you solve? What result did you deliver?)
                </p>
                <Textarea
                  id="best-offer"
                  placeholder="Example: They bought our 'Fast Start Package' that helped them automate their client onboarding process, saving them 10+ hours per week..."
                  value={bestOffer}
                  onChange={(e) => setBestOffer(e.target.value)}
                  className="mt-1 min-h-[100px] bg-white"
                />
              </div>

              <div>
                <Label htmlFor="find-more" className="text-sm font-medium text-teal-900">
                  3. Where can you find more customers like these?
                </Label>
                <p className="text-xs text-teal-700 mb-2">
                  (Communities, associations, referrals, marketing channels?)
                </p>
                <Textarea
                  id="find-more"
                  placeholder="Example: Industry Facebook groups, local chamber of commerce, LinkedIn groups for service business owners, asking current clients for referrals..."
                  value={findMore}
                  onChange={(e) => setFindMore(e.target.value)}
                  className="mt-1 min-h-[100px] bg-white"
                />
              </div>

              <div className="rounded-lg border-l-4 border-teal-600 bg-white p-4">
                <p className="text-sm font-semibold text-teal-900 mb-2">
                  🎯 Your Next Action:
                </p>
                <p className="text-sm text-teal-800">
                  Based on your answers above, you now have a clear picture of your ideal customer. 
                  Use this to focus your marketing, sales, and product development efforts on attracting more 
                  customers who look exactly like your Model 10.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourModel10;
