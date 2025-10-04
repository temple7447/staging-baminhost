import React from 'react';
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface FinancialTarget {
  revenue: string;
  profit: string;
  profitPercentage: string;
  value: string;
  valueMultiplier: string;
}

interface FinancialTargetsProps {
  currentTarget: FinancialTarget;
  setCurrentTarget: React.Dispatch<React.SetStateAction<FinancialTarget>>;
  yearTarget: FinancialTarget;
  setYearTarget: React.Dispatch<React.SetStateAction<FinancialTarget>>;
}

const FinancialTargets: React.FC<FinancialTargetsProps> = ({
  currentTarget,
  setCurrentTarget,
  yearTarget,
  setYearTarget
}) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white border border-gray-300 overflow-hidden" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* WHAT Section - Green sidebar */}
      <div className="bg-green-500 flex items-center justify-center p-4 lg:p-6 min-h-[60px] lg:min-h-[400px]">
        <div className="transform lg:-rotate-90 text-white font-bold text-lg lg:text-xl tracking-wider">
          WHAT
        </div>
      </div>

      {/* CURRENT Section */}
      <div className="flex-1 border-r border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 text-center py-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-700">CURRENT</h2>
        </div>
        
        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Revenue */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">₦</span>
              <Input
                value={currentTarget.revenue}
                onChange={(e) => setCurrentTarget(prev => ({ ...prev, revenue: e.target.value }))}
                placeholder="1,000,000"
                className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-56"
              />
            </div>
          </div>
          
          {/* Profit Row */}
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="text-sm text-gray-600 mb-1">Profit</div>
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">₦</span>
                <Input
                  value={currentTarget.profit}
                  onChange={(e) => setCurrentTarget(prev => ({ ...prev, profit: e.target.value }))}
                  placeholder="150,000"
                  className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-40"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Input
                  value={currentTarget.profitPercentage}
                  onChange={(e) => setCurrentTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                  placeholder="15"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                />
                <span className="text-2xl lg:text-3xl font-bold text-blue-600">%</span>
              </div>
            </div>
          </div>
          
          {/* Value Row */}
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="text-sm text-gray-600 mb-1">Value</div>
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">₦</span>
                <Input
                  value={currentTarget.value}
                  onChange={(e) => setCurrentTarget(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="375,000"
                  className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-40"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Input
                  value={currentTarget.valueMultiplier}
                  onChange={(e) => setCurrentTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                  placeholder="2.5"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                />
                <span className="text-2xl lg:text-3xl font-bold text-blue-600">x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Section */}
      <div className="flex items-center justify-center bg-green-500 p-4">
        <ArrowRight className="w-8 h-8 text-white" />
      </div>

      {/* 3-YEAR TARGET Section */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gray-100 text-center py-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-700">3-YEAR TARGET</h2>
        </div>
        
        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Revenue */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">₦</span>
              <Input
                value={yearTarget.revenue}
                onChange={(e) => setYearTarget(prev => ({ ...prev, revenue: e.target.value }))}
                placeholder="5,000,000"
                className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-56"
              />
            </div>
          </div>
          
          {/* Profit Row */}
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="text-sm text-gray-600 mb-1">Profit</div>
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">₦</span>
                <Input
                  value={yearTarget.profit}
                  onChange={(e) => setYearTarget(prev => ({ ...prev, profit: e.target.value }))}
                  placeholder="1,000,000"
                  className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-40"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Input
                  value={yearTarget.profitPercentage}
                  onChange={(e) => setYearTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                  placeholder="20"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                />
                <span className="text-2xl lg:text-3xl font-bold text-blue-600">%</span>
              </div>
            </div>
          </div>
          
          {/* Value Row */}
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="text-sm text-gray-600 mb-1">Value</div>
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">₦</span>
                <Input
                  value={yearTarget.value}
                  onChange={(e) => setYearTarget(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="7,500,000"
                  className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-40"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Input
                  value={yearTarget.valueMultiplier}
                  onChange={(e) => setYearTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                  placeholder="7.5"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                />
                <span className="text-2xl lg:text-3xl font-bold text-blue-600">x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTargets;