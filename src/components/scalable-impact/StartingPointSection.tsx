import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  DollarSign, 
  Calculator,
  Info,
  CheckCircle2,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { 
  getValuationMultiple, 
  formatCurrency, 
  parseCurrency,
  determineBusinessStage,
  type ValuationResult 
} from './valuationUtils';

interface StartingPointData {
  currentRevenue: string;
  currentProfit: string;
  currentProfitMargin: string;
  currentValuation: string;
  assessmentDate: string;
  revenueSource: string;
  businessStage: 'owner-dependent' | 'professionalized';
}

interface StartingPointSectionProps {
  data: StartingPointData;
  onDataChange: (data: StartingPointData) => void;
  onComplete: () => void;
}

export const StartingPointSection: React.FC<StartingPointSectionProps> = ({
  data,
  onDataChange,
  onComplete
}) => {
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Calculate business valuation whenever profit or revenue changes
  useEffect(() => {
    const revenue = parseCurrency(data.currentRevenue);
    const profit = parseCurrency(data.currentProfit);
    
    if (profit > 0 && revenue > 0) {
      setIsCalculating(true);
      
      // Determine business stage automatically
      const stage = determineBusinessStage(revenue, profit);
      const result = getValuationMultiple(profit, stage);
      
      setValuationResult(result);
      
      // Update business stage in data
      if (data.businessStage !== stage) {
        onDataChange({
          ...data,
          businessStage: stage,
          currentValuation: formatCurrency(result.value)
        });
      } else {
        onDataChange({
          ...data,
          currentValuation: formatCurrency(result.value)
        });
      }
      
      // Auto-calculate profit margin
      const margin = Math.round((profit / revenue) * 100);
      if (data.currentProfitMargin !== `${margin}%`) {
        onDataChange({
          ...data,
          currentProfitMargin: `${margin}%`,
          currentValuation: formatCurrency(result.value)
        });
      }
      
      setIsCalculating(false);
      setShowCalculation(true);
    } else {
      setValuationResult(null);
      setShowCalculation(false);
    }
  }, [data.currentRevenue, data.currentProfit]);

  const handleInputChange = (field: keyof StartingPointData, value: string) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  const isComplete = () => {
    return data.currentRevenue && data.currentProfit && valuationResult;
  };

  const handleComplete = () => {
    if (isComplete()) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-6 h-6" />
            Step 2: Determine Your Starting Point
          </CardTitle>
          <div className="text-slate-600 space-y-2">
            <p className="leading-relaxed">
              <strong>Important:</strong> If we're going to look to go somewhere and we have a map, 
              the map is only helpful to the extent that you know where you are starting from.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Don't overthink it.</strong> Use estimates if needed - this is for you to get 
                  a clear picture of your starting point.
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Revenue Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <Label className="text-base font-semibold text-green-800">
                1. Current Annual Revenue
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-revenue" className="text-sm font-medium">
                How much revenue does your business generate per year?
              </Label>
              <Input
                id="current-revenue"
                placeholder="e.g., ₦1,000,000 or 1M"
                value={data.currentRevenue}
                onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-600">
                💡 Look at your previous 12 months or use a run rate from last month
              </p>
            </div>
          </div>

          <Separator />

          {/* Profit Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-green-600" />
              <Label className="text-base font-semibold text-green-800">
                2. Current Annual Profit
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-profit" className="text-sm font-medium">
                How much profit do you make? (After you get paid your salary)
              </Label>
              <Input
                id="current-profit"
                placeholder="e.g., ₦150,000 or 150K"
                value={data.currentProfit}
                onChange={(e) => handleInputChange('currentProfit', e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-600">
                💡 This should be after everyone including you gets paid salary - the free cash that could be distributed
              </p>
            </div>
            
            {/* Auto-calculated profit margin */}
            {data.currentProfitMargin && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Profit Margin:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {data.currentProfitMargin}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {parseInt(data.currentProfitMargin) >= 20 ? 
                    "✅ Healthy profit margin (20%+ is standard)" : 
                    parseInt(data.currentProfitMargin) >= 10 ?
                    "⚠️ Moderate profit margin (could be improved)" :
                    "🔴 Low profit margin (focus on efficiency)"}
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Valuation Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-green-600" />
              <Label className="text-base font-semibold text-green-800">
                3. Current Business Value
              </Label>
            </div>
            
            {showCalculation && valuationResult ? (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span><strong>Calculated Business Value:</strong></span>
                        <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                          {formatCurrency(valuationResult.value)}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span>Valuation Method:</span>
                          <span className="font-medium">{valuationResult.type} Multiple</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multiple Used:</span>
                          <span className="font-medium">{valuationResult.multiple}x ({valuationResult.range})</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Business Stage:</span>
                          <span className="font-medium capitalize">{data.businessStage.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <p className="text-xs mt-2 italic">
                        {valuationResult.explanation}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* SDE Multiple Reference Table */}
                {data.businessStage === 'owner-dependent' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-slate-800 mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      SDE Multiple Reference (Owner-Dependent Businesses)
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="font-semibold text-slate-600">SDE Range</div>
                      <div className="font-semibold text-slate-600">Multiple</div>
                      <div className="font-semibold text-slate-600">Business Value</div>
                      
                      <div>₦0 - ₦50K</div>
                      <div>1.0 - 1.25x</div>
                      <div>₦50K - ₦62K</div>
                      
                      <div>₦50K - ₦75K</div>
                      <div>1.1 - 1.6x</div>
                      <div>₦82K - ₦135K</div>
                      
                      <div className={parseCurrency(data.currentProfit) >= 75000 && parseCurrency(data.currentProfit) <= 100000 ? 'bg-green-100 font-semibold' : ''}>
                        ₦75K - ₦100K
                      </div>
                      <div className={parseCurrency(data.currentProfit) >= 75000 && parseCurrency(data.currentProfit) <= 100000 ? 'bg-green-100 font-semibold' : ''}>
                        2.0 - 2.7x
                      </div>
                      <div className={parseCurrency(data.currentProfit) >= 75000 && parseCurrency(data.currentProfit) <= 100000 ? 'bg-green-100 font-semibold' : ''}>
                        ₦200K - ₦270K
                      </div>
                      
                      <div className={parseCurrency(data.currentProfit) >= 100000 && parseCurrency(data.currentProfit) <= 200000 ? 'bg-green-100 font-semibold' : ''}>
                        ₦100K - ₦200K
                      </div>
                      <div className={parseCurrency(data.currentProfit) >= 100000 && parseCurrency(data.currentProfit) <= 200000 ? 'bg-green-100 font-semibold' : ''}>
                        2.5 - 3.0x
                      </div>
                      <div className={parseCurrency(data.currentProfit) >= 100000 && parseCurrency(data.currentProfit) <= 200000 ? 'bg-green-100 font-semibold' : ''}>
                        ₦500K - ₦600K
                      </div>
                      
                      <div>₦200K - ₦500K</div>
                      <div>3.0 - 4.0x</div>
                      <div>₦1.5M - ₦2M</div>
                      
                      <div>₦500K+</div>
                      <div>3.25 - 4.25x</div>
                      <div>₦3.25M - ₦4.25M</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Remember:</strong> This is just an estimate to help you understand your starting point. 
                    Actual value depends on many factors including market conditions and buyer interest.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Enter your revenue and profit above to calculate your business value</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleComplete}
              disabled={!isComplete()}
              className="gap-2 px-8 py-3"
              size="lg"
            >
              {isComplete() ? 
                <>Continue to Step 3 <ArrowRight className="w-4 h-4" /></> :
                'Complete Your Starting Point'
              }
            </Button>
          </div>
          
          {!isComplete() && (
            <p className="text-center text-sm text-gray-600">
              Fill in your current revenue and profit to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StartingPointSection;