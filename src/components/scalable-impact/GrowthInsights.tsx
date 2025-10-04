import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Save } from "lucide-react";

interface FinancialTarget {
  revenue: string;
  profit: string;
  profitPercentage: string;
  value: string;
  valueMultiplier: string;
}

interface GrowthInsightsProps {
  currentTarget: FinancialTarget;
  yearTarget: FinancialTarget;
  onCalculateSmartTargets: () => void;
  onSaveFinancialGoals: () => void;
}

const GrowthInsights: React.FC<GrowthInsightsProps> = ({
  currentTarget,
  yearTarget,
  onCalculateSmartTargets,
  onSaveFinancialGoals
}) => {
  return (
    <>
      {/* Growth Relationship Indicator */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Current Summary */}
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Position</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Revenue: <span className="font-medium text-green-600">₦{currentTarget.revenue}</span></div>
                  <div className="text-sm text-gray-600">Profit: <span className="font-medium text-green-600">₦{currentTarget.profit} ({currentTarget.profitPercentage}%)</span></div>
                  <div className="text-sm text-gray-600">Value: <span className="font-medium text-green-600">₦{currentTarget.value}</span></div>
                </div>
              </div>

              {/* Growth Arrow and Calculations */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight className="w-8 h-8 text-green-600" />
                  <div className="bg-white rounded-lg px-3 py-2 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {(() => {
                          const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
                          const targetRev = parseFloat(yearTarget.revenue.replace(/,/g, '')) || 0;
                          const growthRate = currentRev > 0 ? ((targetRev / currentRev - 1) * 100).toFixed(1) : '0';
                          return `${growthRate}% Growth`;
                        })()} 
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">3-Year Journey</div>
              </div>

              {/* Target Summary */}
              <div className="text-center lg:text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3-Year Target</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Revenue: <span className="font-medium text-blue-600">₦{yearTarget.revenue}</span></div>
                  <div className="text-sm text-gray-600">Profit: <span className="font-medium text-blue-600">₦{yearTarget.profit} ({yearTarget.profitPercentage}%)</span></div>
                  <div className="text-sm text-gray-600">Value: <span className="font-medium text-blue-600">₦{yearTarget.value}</span></div>
                </div>
              </div>
            </div>

            {/* Growth Insights */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="text-lg font-bold text-green-600">
                    {(() => {
                      const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
                      const targetRev = parseFloat(yearTarget.revenue.replace(/,/g, '')) || 0;
                      const multiplier = currentRev > 0 ? (targetRev / currentRev).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Revenue Growth</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="text-lg font-bold text-blue-600">
                    {(() => {
                      const currentProfit = parseFloat(currentTarget.profit.replace(/,/g, '')) || 0;
                      const targetProfit = parseFloat(yearTarget.profit.replace(/,/g, '')) || 0;
                      const multiplier = currentProfit > 0 ? (targetProfit / currentProfit).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Profit Growth</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <div className="text-lg font-bold text-purple-600">
                    {(() => {
                      const currentValue = parseFloat(currentTarget.value.replace(/,/g, '')) || 0;
                      const targetValue = parseFloat(yearTarget.value.replace(/,/g, '')) || 0;
                      const multiplier = currentValue > 0 ? (targetValue / currentValue).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Value Growth</div>
                </div>
              </div>
            </div>

            {/* Smart Target Actions */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={onCalculateSmartTargets} 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Smart Targets
                </Button>
                <div className="text-xs text-gray-500 text-center">
                  Generate 3-year targets based on 40% annual growth
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Financial Targets Button */}
      <div className="flex justify-center py-4">
        <Button onClick={onSaveFinancialGoals} size="lg" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4" />
          Save Financial Targets
        </Button>
      </div>
    </>
  );
};

export default GrowthInsights;