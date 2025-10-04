import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface GrowthJourneyProps {
  selectedGrowthValue?: string;
  selectedGrowthType?: string;
}

export const GrowthJourney: React.FC<GrowthJourneyProps> = ({ 
  selectedGrowthValue,
  selectedGrowthType 
}) => {
  const getGrowthLabel = (type: string) => {
    switch (type) {
      case 'hypergrowth':
        return 'Hypergrowth Path';
      case 'rapid':
        return 'Rapid Growth Path';
      case 'steady':
        return 'Steady Growth Path';
      case 'mature':
        return 'Mature Growth Path';
      default:
        return '3-Year Journey';
    }
  };

  const getDisplayValue = (value: string) => {
    // Convert the growth value to a more meaningful display
    if (value === '3x') return '+300% Growth';
    if (value === '2x') return '+200% Growth';
    if (value === '35%') return '+35% YoY';
    if (value === '15%') return '+15% YoY';
    return value;
  };

  if (!selectedGrowthValue && !selectedGrowthType) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowRight className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-lg font-bold text-green-800">
                  {getDisplayValue(selectedGrowthValue || '')}
                </span>
              </div>
              <p className="text-green-700 text-sm font-medium mt-1">
                {getGrowthLabel(selectedGrowthType || '')}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-green-600 text-sm font-medium">Target Timeline</p>
            <p className="text-green-800 text-lg font-semibold">3 Years</p>
          </div>
        </div>
      </div>
    </div>
  );
};