import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

export const TheOneQuestionSurvey: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-900 flex items-center gap-3">
            <MessageSquare className="w-7 h-7" />
            The One-Question Survey (NPS)
          </CardTitle>
          <p className="text-emerald-700 text-base mt-2">
            Ask this after every sale to confirm you truly served the customer.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {/* Action Steps */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="font-bold text-lg text-gray-900 mb-3">How to Use This</h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li>Ask every customer this question after they've received value (via email, text, or in person).</li>
              <li>Track the responses. Count how many give you 9 or 10.</li>
              <li>Follow up with anyone below 9: "What would it take to get you to a 10?"</li>
              <li>
                <strong>Don't proceed to scaling until you have at least 10 promoters.</strong> If you don't, 
                you're building on a weak foundation.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheOneQuestionSurvey;
