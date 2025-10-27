import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Info } from "lucide-react";

export const TheProblemWithProductMarketFit: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">The Problem with "Product-Market Fit"</CardTitle>
          <p className="text-muted-foreground">
            Before you scale, you must confirm two essential things about your business.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Two Requirements */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirement 1 */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-bold text-lg text-blue-800">1. You have something people want to</span>
                    <Badge className="ml-2 bg-blue-600 text-white font-bold">BUY</Badge>
                  </div>
                </div>
                <p className="text-sm text-blue-700">
                  Does anybody actually want what you're selling? Even one, two, three... ultimately we want to get it to 10.
                </p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800 italic">
                    This isn't about whether your friends think it's a good idea. It's about whether strangers will PAY you real money for it.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirement 2 */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                  <div>
                    <span className="font-bold text-lg text-green-800">2. You are able to</span>
                    <Badge className="ml-2 bg-green-600 text-white font-bold">DELIVER</Badge>
                  </div>
                </div>
                <p className="text-sm text-green-700">
                  Can you actually deliver on the promises you make? We want customers to be HAPPY they bought from you.
                </p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 italic">
                    It's not enough to make a sale. You need to deliver so well that they would buy again and tell others.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why this matters */}
          <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-slate-900">Why Product-Market Fit Can Be Misleading</h3>
                <p className="text-sm text-slate-700">
                  Many entrepreneurs obsess over "product-market fit" as a theoretical concept. They conduct surveys, 
                  build MVPs, and iterate endlessly without ever making a real sale.
                </p>
                <p className="text-sm text-slate-700">
                  <strong>The truth:</strong> You don't know if you have product-market fit until you've sold to real customers 
                  and delivered real value. Everything else is just guessing.
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-slate-400">
                  <p className="text-sm font-semibold text-slate-900">
                    The best way to find product-market fit? Sell and serve 10 customers. 
                    You'll learn more from those 10 than from 100 strategy sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheProblemWithProductMarketFit;
