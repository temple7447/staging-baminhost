import React from 'react';
import { BusinessTypeSelector } from './BusinessTypeSelector';
import type { VendorType } from './types';

interface BusinessTypeStepProps {
  selectedType: VendorType;
  onTypeChange: (type: VendorType) => void;
}

export const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Select Business Category</h2>
        <p className="text-slate-500 mt-2">How will you be contributing to the ecosystem?</p>
      </div>

      <BusinessTypeSelector selectedType={selectedType} onTypeChange={onTypeChange} />
    </div>
  );
};
