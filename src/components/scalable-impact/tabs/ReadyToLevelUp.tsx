import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Trophy, ArrowRight, Lightbulb, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

const THINGS_NOT_TO_DO = [
  { 
    text: "Lease office space", 
    icon: "🏢", 
    reason: "You can sell and serve 10 customers from anywhere" 
  },
  { 
    text: "Hire employees", 
    icon: "👥", 
    reason: "You can probably do the first 10 all by yourself" 
  },
  { 
    text: "Buy expensive software", 
    icon: "💻", 
    reason: "Don't sign annual contracts before you even have leads" 
  },
  { 
    text: "Design a logo", 
    icon: "🎨", 
    reason: "Google your favorite brands' first logos - they were terrible too!" 
  },
  { 
    text: "Register trademarks and copyrights", 
    icon: "📜", 
    reason: "Make sure you have something worthy of protecting first" 
  },
  { 
    text: "Print business cards", 
    icon: "💳", 
    reason: "Hopefully this is obvious - focus on customers, not cards" 
  },
  { 
    text: "Build a multi-page website", 
    icon: "🌐", 
    reason: "A single page is enough. Don't build a blog before you have customers" 
  },
  { 
    text: "Organize your file cabinet", 
    icon: "📁", 
    reason: "You have nothing to file yet - don't even buy a file cabinet!" 
  },
  { 
    text: "Take personality tests", 
    icon: "🧠", 
    reason: "You don't need to discover your strengths - you need to sell and serve 10" 
  },
  { 
    text: "Hang motivational posters", 
    icon: "🖼️", 
    reason: "Don't 'love the grind' - get out there and grind!" 
  },
  { 
    text: "Argue with idiots on Twitter", 
    icon: "🐦", 
    reason: "This isn't about winning arguments - row your own boat, run your own race" 
  }
];

export const ReadyToLevelUp: React.FC<ReadyToLevelUpProps> = ({ data, onComplete }) => {
  const [showWhatNotToDo, setShowWhatNotToDo] = React.useState(false);
  
  const canProceed = data.isCompleted;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ready to Level Up?</CardTitle>
          <p className="text-muted-foreground">
            Check your progress and make sure you've completed all requirements before moving to Level 2.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Checklist Summary */}
          <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Level 1 Checklist Summary</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasMadeSale && data.hasReached10Customers ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${data.hasMadeSale && data.hasReached10Customers ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  Generate at least 10 sales
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasDeliveredPromise ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${data.hasDeliveredPromise ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  Deliver on your promises (happy customers)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasTenPromoters ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${data.hasTenPromoters ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  Generate at least 10 promoters (NPS ≥ 9)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasModel10List ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${data.hasModel10List ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  Make your "Model 10" list (High-LTV + High-Advocacy)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${data.hasTestimonials && data.testimonialText && data.testimonialText.trim().length >= 10 ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${data.hasTestimonials && data.testimonialText && data.testimonialText.trim().length >= 10 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  Document proof with testimonials
                </span>
              </li>
            </ul>
          </div>

          {/* Success or Incomplete Message */}
          {canProceed ? (
            <Alert className="border-green-200 bg-green-50 animate-in fade-in-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-3">
                  <div className="font-bold text-lg">🎉 Congratulations! You are now ready to scale!</div>
                  <p>
                    You have proven you have something people will pay for AND you can deliver on what you promised. 
                    You have the <strong>CLARITY</strong> and <strong>CONFIDENCE</strong> needed to scale your business.
                  </p>
                  <p className="text-sm italic">
                    "Congratulations! You are now ready to scale—because you have concrete proof of market fit."
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <div className="space-y-2">
                  <div className="font-bold">Not quite there yet...</div>
                  <p className="text-sm">
                    You must complete all requirements in the "Getting Your First 10" tab before you can proceed to Level 2. 
                    Go back and make sure you've checked everything off!
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* What NOT To Do */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setShowWhatNotToDo(!showWhatNotToDo)}
              className="w-full gap-2"
            >
              <X className="w-4 h-4 text-red-500" />
              {showWhatNotToDo ? 'Hide' : 'Show'} Things NOT To Do First
              {!showWhatNotToDo && <Badge variant="destructive" className="ml-2">Important!</Badge>}
            </Button>

            {showWhatNotToDo && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Things NOT To Do Before You Sell & Serve 10
                  </CardTitle>
                  <p className="text-red-700 text-sm">
                    Don't waste time on these until you've proven your business with 10 customers:
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {THINGS_NOT_TO_DO.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <div>
                          <div className="font-semibold text-red-800 text-sm">{item.text}</div>
                          <div className="text-xs text-red-600 mt-1">{item.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Badge variant="outline" className="bg-white text-gray-700">Level 1 of 7</Badge>
            <Button 
              onClick={onComplete}
              disabled={!canProceed}
              className={`gap-2 px-8 py-3 ${canProceed ? 'bg-green-600 hover:bg-green-700' : ''}`}
              size="lg"
            >
              {canProceed ? (
                <>
                  <Trophy className="w-5 h-5" />
                  I'm Ready to Scale! Continue to Level 2
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4" />
                  Complete All Requirements First
                </>
              )}
            </Button>
          </div>
          
          {!canProceed && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                You must complete all requirements in the "Getting Your First 10" tab to proceed
              </p>
              <p className="text-xs text-gray-500">
                Remember: Entrepreneurs launch businesses. Period. Get customers first, everything else is secondary!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyToLevelUp;
