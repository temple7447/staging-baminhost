import React from 'react';
import { Check } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const ProgressBar: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 border-b">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar Background */}
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((step, index) => {
            const colors = [
              'bg-red-500',
              'bg-orange-500', 
              'bg-yellow-500',
              'bg-green-500',
              'bg-blue-500',
              'bg-indigo-500',
              'bg-black'
            ];
            const isCompleted = step <= 5;
            
            return (
              <React.Fragment key={step}>
                <div className={`w-12 h-12 rounded-full ${colors[index]} flex items-center justify-center text-white font-bold text-lg`}>
                  {isCompleted ? <Check className="w-6 h-6" /> : step}
                </div>
                {index < 6 && (
                  <div className="flex-1 h-2 bg-gray-300 mx-2 rounded-full">
                    <div className={`h-full rounded-full ${
                      step <= 5 ? colors[index] : 'bg-gray-300'
                    }`} style={{ width: step <= 5 ? '100%' : '0%' }}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Step Labels and Checkboxes */}
        <div className="flex items-start justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map((step, index) => {
            const stepTitles = [
              'Get 10\nCustomers',
              'Automate\nGrowth',
              'Upgrade\nYour OS',
              '2X Your\nTake-Home',
              'Build Your\nBoard',
              'Expand\nWith M&A',
              'Hit Your\n"Number"'
            ];
            const isCompleted = step <= 5;
            
            return (
              <div key={step} className="flex flex-col items-center" style={{ width: '14.28%' }}>
                <div className="text-center mb-2">
                  <div className="text-xs font-medium text-gray-700 leading-tight whitespace-pre-line">
                    {stepTitles[index]}
                  </div>
                </div>
                <Checkbox 
                  checked={isCompleted} 
                  disabled 
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;