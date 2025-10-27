import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Trophy, ArrowRight, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

interface ReadyToLevelUpProps {
  data: Level1Data;
  onComplete: () => void;
}

export const ReadyToLevelUp: React.FC<ReadyToLevelUpProps> = ({ data, onComplete }) => {
  
  const canProceed = data.isCompleted;

  return (
    <div className="space-y-6">
      {/* Opening Message */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900">Are You Ready to Level Up?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-5 rounded">
            <p className="text-orange-900 font-semibold text-base mb-2">
              Level 1 is the easiest... but it's also the hardest.
            </p>
            <p className="text-orange-800 text-sm">
              Whether it's easy or hard, it doesn't matter. <strong>It just needs to get done.</strong> If you want to build a scalable company, 
              if you want to hit Level 7, <strong>it starts here. Sell and serve 10.</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* The Three Checkboxes */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">Here Are the Boxes You Need to Check:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Box 1: 10 Sales */}
          <div className="rounded-lg border border-green-300 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-1">Get 10 Sales (At Least)</h3>
                <p className="text-gray-700 text-sm">
                  You'll probably need 20-30+ to get 10 promoters, but those <strong>first 10 sales</strong> are where it all begins.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: 10 Promoters */}
          <div className="rounded-lg border border-blue-300 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-1">Generate at Least 10 Promoters</h3>
                <p className="text-gray-700 text-sm">
                  At least 10 people gave you a score of <strong>9 or 10</strong> on your one-question survey.
                </p>
              </div>
            </div>
          </div>

          {/* Box 3: Model 10 List */}
          <div className="rounded-lg border border-purple-300 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 mb-1">Make Your Model 10 List</h3>
                <p className="text-gray-700 text-sm">
                  List your best customers with <strong>high lifetime value + high advocacy</strong>. They love you and refer others.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Checklist Summary */}
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasMadeSale && data.hasReached10Customers ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${data.hasMadeSale && data.hasReached10Customers ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                At least 10 sales
              </span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasTenPromoters ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${data.hasTenPromoters ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                At least 10 promoters (NPS ≥ 9)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasModel10List ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${data.hasModel10List ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                Model 10 list written down
              </span>
            </li>
          </ul>

          {/* Success or Incomplete Message */}
          {canProceed ? (
            <Alert className="border-green-300 bg-green-50">
              <Trophy className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-900">
                <p className="font-bold text-base mb-1">✅ Congratulations! You are ready to level up from Level 1.</p>
                <p className="text-sm">
                  You've proven you have something people will pay for AND you can deliver. You have the clarity and confidence to scale.
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">
                Complete all requirements in the "Getting Your First 10" tab first.
              </AlertDescription>
            </Alert>
          )}


          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onComplete}
              disabled={!canProceed}
              className={`gap-2 ${canProceed ? 'bg-green-600 hover:bg-green-700' : ''}`}
              size="lg"
            >
              {canProceed ? (
                <>
                  <Trophy className="w-5 h-5" />
                  Continue to Level 2
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                'Complete All Requirements First'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyToLevelUp;
