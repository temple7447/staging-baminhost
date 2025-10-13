import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  TrendingUp, 
  Rocket,
  Calculator,
  Info,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import { 
  GROWTH_BENCHMARKS,
  calculateGrowthTargets,
  getValuationMultiple,
  formatCurrency, 
  parseCurrency,
  determineBusinessStage,
  type GrowthBenchmark,
  type ValuationResult
} from './valuationUtils';

interface EndGameData {
  targetRevenue: string;
  targetProfit: string;
  targetValuation: string;
  timeframe: '3-year';
  growthStrategy: string;
  selectedBenchmark: string;
  targetProfitMargin: string;
}

interface StartingPointData {
  currentRevenue: string;
  currentProfit: string;
  currentProfitMargin: string;
  currentValuation: string;
  businessStage: 'owner-dependent' | 'professionalized';
}

interface EndGameSectionProps {
  data: EndGameData;
  startingPoint: StartingPointData;
  onDataChange: (data: EndGameData) => void;
  onComplete: () => void;
}

export const EndGameSection: React.FC<EndGameSectionProps> = ({
  data,
  startingPoint,
  onDataChange,
  onComplete
}) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<GrowthBenchmark | null>(null);
  const [calculatedTargets, setCalculatedTargets] = useState<any>(null);
  const [targetValuation, setTargetValuation] = useState<ValuationResult | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (data.selectedBenchmark) {
      const benchmark = GROWTH_BENCHMARKS.find(b => b.id === data.selectedBenchmark);
      if (benchmark) {
        setSelectedBenchmark(benchmark);
        calculateTargets(benchmark);
      }
    }
  }, [data.selectedBenchmark, startingPoint]);

  const calculateTargets = (benchmark: GrowthBenchmark) => {
    const currentRevenue = parseCurrency(startingPoint.currentRevenue);
    const currentProfit = parseCurrency(startingPoint.currentProfit);
    
    if (currentRevenue > 0 && currentProfit > 0) {
      const targets = calculateGrowthTargets(
        currentRevenue, 
        currentProfit, 
        benchmark,
        0.20 // Default 20% profit margin target
      );
      
      setCalculatedTargets(targets);
      
      // Calculate future business valuation
      // For businesses reaching $1M+ profit, they become professionalized
      const futureStage = targets.targetProfit >= 1000000 ? 'professionalized' : 'owner-dependent';
      const valuation = getValuationMultiple(targets.targetProfit, futureStage);
      setTargetValuation(valuation);
      
      // Update data
      onDataChange({
        ...data,
        targetRevenue: formatCurrency(targets.targetRevenue),
        targetProfit: formatCurrency(targets.targetProfit),
        targetValuation: formatCurrency(valuation.value),
        targetProfitMargin: `${Math.round(targets.targetProfitMargin * 100)}%`,
        growthStrategy: benchmark.name
      });
      
      setShowComparison(true);
    }
  };

  const handleBenchmarkSelect = (benchmarkId: string) => {
    const benchmark = GROWTH_BENCHMARKS.find(b => b.id === benchmarkId);
    if (benchmark) {
      onDataChange({
        ...data,
        selectedBenchmark: benchmarkId
      });
    }
  };

  const isComplete = () => {
    return data.selectedBenchmark && calculatedTargets && targetValuation;
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
            <Target className="w-6 h-6" />
            Step 3: Determine Your End Game
          </CardTitle>
          <div className="text-slate-600 space-y-2">
            <p className="leading-relaxed">
              <strong>3-Year Target:</strong> We recommend setting a three-year target. 
              One year isn't enough time for significant growth, while 5-10 years is too long for entrepreneurial businesses.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Three years is the sweet spot:</strong> Long enough for significant transformation, 
                  short enough to stay focused and realistic.
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Growth Benchmark Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <Label className="text-base font-semibold text-yellow-800">
                Choose Your Growth Benchmark
              </Label>
            </div>
            
            <RadioGroup
              value={data.selectedBenchmark}
              onValueChange={handleBenchmarkSelect}
              className="space-y-3"
            >
              {GROWTH_BENCHMARKS.map((benchmark) => {
                const isRecommended = benchmark.id === 'double-3-years' || benchmark.id === 'top-to-bottom';
                const isTooAggressive = benchmark.id === 'hypergrowth' || benchmark.id === 'rapid';
                
                return (
                  <div
                    key={benchmark.id}
                    className={`
                      relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer
                      ${data.selectedBenchmark === benchmark.id
                        ? 'border-yellow-400 bg-yellow-50 shadow-lg ring-2 ring-offset-2 ring-yellow-300'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }
                      ${isRecommended ? 'ring-1 ring-green-300' : ''}
                      ${isTooAggressive ? 'opacity-75' : ''}
                    `}
                    onClick={() => handleBenchmarkSelect(benchmark.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center">
                        <RadioGroupItem
                          value={benchmark.id}
                          id={`benchmark-${benchmark.id}`}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${data.selectedBenchmark === benchmark.id ? 'bg-yellow-100' : 'bg-gray-100'}
                          `}>
                            {benchmark.id === 'hypergrowth' && <Rocket className="w-5 h-5 text-purple-600" />}
                            {benchmark.id === 'rapid' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                            {benchmark.id === 'steady' && <Target className="w-5 h-5 text-green-600" />}
                            {benchmark.id === 'mature' && <Calculator className="w-5 h-5 text-gray-600" />}
                            {benchmark.id === 'double-3-years' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                            {benchmark.id === 'top-to-bottom' && <Target className="w-5 h-5 text-orange-600" />}
                          </div>
                          
                          <div>
                            <Label 
                              htmlFor={`benchmark-${benchmark.id}`}
                              className={`font-semibold cursor-pointer flex items-center gap-2 ${
                                data.selectedBenchmark === benchmark.id ? 'text-yellow-800' : 'text-gray-800'
                              }`}
                            >
                              {benchmark.name}
                              {isRecommended && <Badge className="bg-green-500 text-white text-xs">Recommended</Badge>}
                              {isTooAggressive && <Badge variant="outline" className="text-red-600 border-red-300 text-xs">Aggressive</Badge>}
                            </Label>
                            <p className={`text-sm mt-1 ${
                              data.selectedBenchmark === benchmark.id ? 'text-gray-700' : 'text-gray-600'
                            }`}>
                              {benchmark.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 italic">
                              {benchmark.recommendedFor}
                            </p>
                          </div>
                        </div>
                        
                        {/* Special messaging for key benchmarks */}
                        {benchmark.id === 'double-3-years' && (
                          <div className="pl-13 bg-green-50 rounded-lg p-3 mt-2">
                            <p className="text-sm text-green-800">
                              <strong>Minimum Growth Standard:</strong> Just 26% year-over-year growth is enough to double in 3 years. 
                              Very achievable for most businesses!
                            </p>
                          </div>
                        )}
                        
                        {benchmark.id === 'top-to-bottom' && (
                          <div className="pl-13 bg-orange-50 rounded-lg p-3 mt-2">
                            <p className="text-sm text-orange-800">
                              <strong>The Stretch Goal:</strong> Transform today's revenue ({formatCurrency(parseCurrency(startingPoint.currentRevenue))}) 
                              into tomorrow's profit. This is what we work towards with our clients.
                            </p>
                          </div>
                        )}
                        
                        {isTooAggressive && (
                          <div className="pl-13 bg-red-50 rounded-lg p-3 mt-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 inline mr-2" />
                            <span className="text-sm text-red-800">
                              Usually requires significant outside funding - not recommended for bootstrapped businesses.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <Separator />

          {/* Calculated Results */}
          {showComparison && calculatedTargets && targetValuation && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-yellow-600" />
                <Label className="text-base font-semibold text-yellow-800">
                  Your 3-Year Targets
                </Label>
              </div>

              {/* Current vs Target Comparison */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Current State */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-700 flex items-center gap-2">
                      📊 Current (Starting Point)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {formatCurrency(parseCurrency(startingPoint.currentRevenue))}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {formatCurrency(parseCurrency(startingPoint.currentProfit))}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit Margin:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {startingPoint.currentProfitMargin}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Business Value:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {startingPoint.currentValuation}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Target State */}
                <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-yellow-700 flex items-center gap-2">
                      🎯 3-Year Target
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <Badge className="bg-yellow-500 text-white">
                        {formatCurrency(calculatedTargets.targetRevenue)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit:</span>
                      <Badge className="bg-yellow-500 text-white">
                        {formatCurrency(calculatedTargets.targetProfit)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit Margin:</span>
                      <Badge className="bg-yellow-500 text-white">
                        {Math.round(calculatedTargets.targetProfitMargin * 100)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Business Value:</span>
                      <Badge className="bg-yellow-500 text-white">
                        {formatCurrency(targetValuation.value)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Multipliers */}
              <Alert className="border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <div className="space-y-2">
                    <div className="font-semibold">Growth Impact over 3 years:</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Revenue Growth:</span> {calculatedTargets.revenueGrowth.toFixed(1)}x
                      </div>
                      <div>
                        <span className="font-medium">Profit Growth:</span> {calculatedTargets.profitGrowth.toFixed(1)}x
                      </div>
                      <div>
                        <span className="font-medium">Value Growth:</span> {(targetValuation.value / parseCurrency(startingPoint.currentValuation)).toFixed(1)}x
                      </div>
                      <div>
                        <span className="font-medium">Valuation Method:</span> {targetValuation.type}
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Special messaging for professionalized businesses */}
              {targetValuation.type === 'EBITDA' && startingPoint.businessStage === 'owner-dependent' && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    <div className="space-y-2">
                      <div className="font-semibold">🚀 Professionalization Bonus!</div>
                      <p className="text-sm">
                        By reaching ₦{formatCurrency(calculatedTargets.targetProfit)} in profit, your business becomes 
                        <strong> professionalized</strong> and gets valued using EBITDA multiples instead of SDE multiples. 
                        This means <strong>3.3-7.5x higher valuations</strong> than owner-dependent businesses!
                      </p>
                      <p className="text-xs">
                        This is the power of building systems, processes, and a business that runs without you.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Life-changing value message */}
              {targetValuation.value >= 5000000 && (
                <Alert className="border-purple-200 bg-purple-50">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-700">
                    <div className="space-y-2">
                      <div className="font-semibold">💎 Life-Changing Opportunity</div>
                      <p className="text-sm">
                        {formatCurrency(targetValuation.value)} isn't just money - it's <strong>life-changing wealth</strong>. 
                        This can literally change your family tree and shift the direction of future generations.
                      </p>
                      <p className="text-xs italic">
                        "How do we get it? Following the playbook, going top to bottom and professionalizing 
                        the organization by ascending through the 7 levels of scale."
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleComplete}
              disabled={!isComplete()}
              className="gap-2 px-8 py-3"
              size="lg"
            >
              {isComplete() ? 
                <>Continue to Step 4 <ArrowRight className="w-4 h-4" /></> :
                'Select Your Growth Benchmark'
              }
            </Button>
          </div>
          
          {!isComplete() && (
            <p className="text-center text-sm text-gray-600">
              Choose a growth benchmark to see your 3-year targets
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EndGameSection;