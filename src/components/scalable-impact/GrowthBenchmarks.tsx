import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TrendingUp } from 'lucide-react';

interface GrowthOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  value: string;
}

const growthOptions: GrowthOption[] = [
  {
    id: 'hypergrowth',
    title: 'Hypergrowth',
    subtitle: '3X, 3X, 2X, 2X',
    description: '(VC-Funded...₦100M in 7 years)',
    value: '3x'
  },
  {
    id: 'rapid',
    title: 'Rapid Growth',
    subtitle: '2X, 2X, 75%, 50%',
    description: '(Early-Stage Growth)',
    value: '2x'
  },
  {
    id: 'steady',
    title: 'Steady Growth',
    subtitle: '25 - 50% YoY',
    description: '',
    value: '35%'
  },
  {
    id: 'mature',
    title: 'Mature Growth',
    subtitle: '10 - 20% YoY',
    description: '',
    value: '15%'
  }
];

interface GrowthBenchmarksProps {
  onGrowthSelect?: (growthType: string, value: string) => void;
  selectedGrowthType?: string;
}

export const GrowthBenchmarks: React.FC<GrowthBenchmarksProps> = ({ onGrowthSelect, selectedGrowthType = '' }) => {
  const [selectedGrowth, setSelectedGrowth] = useState<string>(selectedGrowthType);

  // Sync with parent state
  useEffect(() => {
    setSelectedGrowth(selectedGrowthType);
  }, [selectedGrowthType]);

  const handleGrowthSelect = (growthId: string, value: string) => {
    setSelectedGrowth(growthId);
    onGrowthSelect?.(growthId, value);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* Left Side - Growth Question */}
      <div className="relative bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-8 rounded-3xl shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <path
              d="M20,150 Q50,100 100,120 T180,100"
              stroke="url(#grad1)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M30,170 Q60,130 110,140 T190,120"
              stroke="#F59E0B"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,3"
              opacity="0.6"
            />
          </svg>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
            How much do you plan to grow?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            (It's time to determine your<br />
            3-Year Target "End Game"...)
          </p>
        </div>
      </div>

      {/* Right Side - Growth Benchmarks */}
      <Card className="p-8 bg-white shadow-lg rounded-3xl border-0">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-slate-800">Growth Benchmarks:</h3>
        </div>
        
        <div className="space-y-4">
          {growthOptions.map((option) => (
            <div key={option.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <Checkbox
                id={option.id}
                checked={selectedGrowth === option.id}
                onCheckedChange={() => handleGrowthSelect(option.id, option.value)}
                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex-1">
                <label htmlFor={option.id} className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold text-slate-800">
                      {option.title}:
                    </span>
                    <span className="text-lg font-bold text-slate-700">
                      {option.subtitle}
                    </span>
                  </div>
                  {option.description && (
                    <p className="text-slate-600 text-sm">
                      {option.description}
                    </p>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};