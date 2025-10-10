import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Users, 
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  X,
  Lightbulb,
  Trophy,
  ShoppingCart,
  Heart
} from "lucide-react";

interface Level1Data {
  hasMadeSale: boolean;
  hasDeliveredPromise: boolean;
  hasReached10Customers: boolean;
  hasTestimonials: boolean;
  customerList: string;
  salesProof: string;
  isCompleted: boolean;
}

interface Level1FirstTenCustomersProps {
  data: Level1Data;
  onDataChange: (data: Level1Data) => void;
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

export const Level1FirstTenCustomers: React.FC<Level1FirstTenCustomersProps> = ({
  data,
  onDataChange,
  onComplete
}) => {
  const [showWhatNotToDo, setShowWhatNotToDo] = useState(false);

  const handleCheckboxChange = (field: keyof Level1Data, value: boolean) => {
    const newData = {
      ...data,
      [field]: value
    };
    
    // Check if all requirements are met
    const isCompleted = newData.hasMadeSale && 
                       newData.hasDeliveredPromise && 
                       newData.hasReached10Customers && 
                       newData.hasTestimonials;
    
    onDataChange({
      ...newData,
      isCompleted
    });
  };

  const handleTextChange = (field: keyof Level1Data, value: string) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  const canProceed = data.hasMadeSale && data.hasDeliveredPromise && data.hasReached10Customers && data.hasTestimonials;

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl text-pink-900">
            <Target className="w-8 h-8" />
            Level 1: Sell & Serve 10 Customers
            <Badge className="bg-red-500 text-white">DO THIS FIRST!</Badge>
          </CardTitle>
          <div className="text-slate-700 space-y-3">
            <p className="text-lg font-medium">
              🚨 <strong>WARNING:</strong> Do NOT skip this step! Many entrepreneurs want to perfect everything before selling. Don't fall into that trap!
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>True Story:</strong> I met an entrepreneur with a brilliant idea, beautiful website, and solid team. 
                  When I asked "How many sales have you made?" they said "Zero - we want everything perfect before we launch so we can scale immediately." 
                  <em>That person was a want-entrepreneur, not a real entrepreneur.</em>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* The Goal */}
          <Alert className="border-green-200 bg-green-50">
            <Trophy className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="space-y-2">
                <div className="font-bold text-lg">THE GOAL:</div>
                <p className="text-base">
                  Sell and serve at least 10 customers so you have the <strong>CLARITY</strong> and <strong>CONFIDENCE</strong> you need to scale!
                </p>
                <p className="text-sm italic">
                  If you've made just ONE sale, you're orders of magnitude further than someone who just comes up with ideas (even with domain names, websites, and office space).
                </p>
              </div>
            </AlertDescription>
          </Alert>

          <Separator />

          {/* Before You Scale Requirements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <Label className="text-xl font-bold text-gray-800">
                Before you scale, you must confirm...
              </Label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Requirement 1 */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                    <span className="font-bold text-lg text-blue-800">1. You have something people want to</span>
                    <Badge className="bg-blue-600 text-white font-bold">BUY</Badge>
                  </div>
                  <p className="text-sm text-blue-700">
                    Does anybody actually want what you're selling? Even one, two, three... ultimately we want to get it to 10.
                  </p>
                </CardContent>
              </Card>

              {/* Requirement 2 */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-lg text-green-800">2. You are able to</span>
                    <Badge className="bg-green-600 text-white font-bold">DELIVER</Badge>
                  </div>
                  <p className="text-sm text-green-700">
                    Can you actually deliver on the promises you make? We want customers to be HAPPY they bought from you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Interactive Checklist */}
          <div className="space-y-4">
            <Label className="text-xl font-bold text-gray-800">
              Complete This Checklist (All required to proceed):
            </Label>

            <div className="space-y-4">
              {/* Checklist Items */}
              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Checkbox
                  id="made-sale"
                  checked={data.hasMadeSale}
                  onCheckedChange={(checked) => handleCheckboxChange('hasMadeSale', checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="made-sale" className="font-semibold cursor-pointer">
                    I have made at least 1 actual sale
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Real money exchanged hands. Someone paid you for your product or service.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Checkbox
                  id="delivered-promise"
                  checked={data.hasDeliveredPromise}
                  onCheckedChange={(checked) => handleCheckboxChange('hasDeliveredPromise', checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="delivered-promise" className="font-semibold cursor-pointer">
                    I have delivered on my promise and the customer was happy
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    You fulfilled what you promised. The customer got value and was satisfied.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Checkbox
                  id="reached-10"
                  checked={data.hasReached10Customers}
                  onCheckedChange={(checked) => handleCheckboxChange('hasReached10Customers', checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="reached-10" className="font-semibold cursor-pointer">
                    I have reached 10 paying, satisfied customers
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    You've successfully sold to and served 10 different customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Checkbox
                  id="has-testimonials"
                  checked={data.hasTestimonials}
                  onCheckedChange={(checked) => handleCheckboxChange('hasTestimonials', checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="has-testimonials" className="font-semibold cursor-pointer">
                    I have testimonials, referrals, or feedback from actual buyers
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    You have proof that customers were happy and would recommend you.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Details */}
            {canProceed && (
              <div className="space-y-4 pt-4 border-t">
                <Label className="text-lg font-bold text-gray-800">
                  Optional: Tell us about your success (for motivation!)
                </Label>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="customer-list" className="text-sm font-medium">
                      Brief description of your customers or customer types:
                    </Label>
                    <Textarea
                      id="customer-list"
                      placeholder="e.g., Local restaurants, small business owners, fitness enthusiasts..."
                      value={data.customerList}
                      onChange={(e) => handleTextChange('customerList', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sales-proof" className="text-sm font-medium">
                      What evidence do you have of success? (testimonials, reviews, referrals):
                    </Label>
                    <Textarea
                      id="sales-proof"
                      placeholder="e.g., 5-star Google reviews, customer referred 3 friends, testimonial: 'This saved me 10 hours a week'..."
                      value={data.salesProof}
                      onChange={(e) => handleTextChange('salesProof', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* What NOT To Do First */}
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

          {/* Success Message */}
          {canProceed && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-2">
                  <div className="font-bold text-lg">🎉 Congratulations! You are now ready to SCALE!</div>
                  <p>
                    You have proven you have something people will pay for AND you can deliver on what you promised. 
                    You have the <strong>CLARITY</strong> and <strong>CONFIDENCE</strong> needed to scale your business.
                  </p>
                  <p className="text-sm italic">
                    Progress, not perfection! Now let's build your scaling plan.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={onComplete}
              disabled={!canProceed}
              className={`gap-2 px-8 py-3 ${canProceed ? 'bg-green-600 hover:bg-green-700' : ''}`}
              size="lg"
            >
              {canProceed ? (
                <>
                  <Trophy className="w-5 h-5" />
                  I'm Ready to Scale! Continue to Scale Level Confirmation
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
                You must complete all 4 requirements above to proceed
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

export default Level1FirstTenCustomers;