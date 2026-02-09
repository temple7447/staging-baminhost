import React from 'react';
import { Briefcase, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VendorType } from './types';

interface BusinessTypeSelectorProps {
  selectedType: VendorType;
  onTypeChange: (type: VendorType) => void;
}

const BUSINESS_TYPES = [
  {
    value: 'service' as const,
    label: 'Service Provider',
    description: 'Maintenance, cleaning, electrical, or consulting services.',
    icon: Briefcase
  },
  {
    value: 'product' as const,
    label: 'Product Seller',
    description: 'Industrial parts, construction materials, or office inventory.',
    icon: Store
  }
];

export const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BUSINESS_TYPES.map(({ value, label, description, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onTypeChange(value)}
          className={cn(
            'p-8 rounded-3xl border-2 transition-all duration-300 text-left group hover:shadow-xl',
            selectedType === value
              ? 'border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/10'
              : 'border-slate-100 bg-white hover:border-slate-300'
          )}
        >
          <div className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors',
            selectedType === value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
          )}>
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{label}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>
        </button>
      ))}
    </div>
  );
};
