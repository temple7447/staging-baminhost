import React from 'react';
import { CloudIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CategoryBadges } from './CategoryBadges';
import { BUSINESS_CATEGORIES, PRICING_TYPES } from './config';
import type { VendorFormData, PricingType } from './types';

interface CatalogPricingStepProps {
  formData: VendorFormData;
  onCategoryChange: (categories: string[]) => void;
  onPricingTypeChange: (type: PricingType) => void;
  onPricingRateChange: (rate: string) => void;
}

export const CatalogPricingStep: React.FC<CatalogPricingStepProps> = ({
  formData,
  onCategoryChange,
  onPricingTypeChange,
  onPricingRateChange
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Catalog & Pricing</h2>
        <p className="text-slate-500 mt-2">Define what you sell and how you bill.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700">Primary Categories (Select all that apply)</Label>
          <CategoryBadges
            categories={formData.categories}
            availableCategories={BUSINESS_CATEGORIES}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2 border-r border-slate-100 pr-6">
            <Label className="text-sm font-bold text-slate-700">Pricing Model</Label>
            <div className="flex items-center gap-3">
              <Select
                value={formData.pricingType}
                onValueChange={(v) => onPricingTypeChange(v as PricingType)}
              >
                <SelectTrigger className="w-[140px] h-12 bg-slate-50/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRICING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                <Input
                  placeholder="Rate"
                  className="h-12 pl-8 bg-slate-50/50 rounded-xl"
                  value={formData.pricingRate}
                  onChange={(e) => onPricingRateChange(e.target.value)}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tight">
              Average Rate for standard tasks
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700">Portfolio / Photos</Label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/30 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
              <CloudIcon className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
              <div className="text-sm font-bold text-slate-600 group-hover:text-blue-700">
                Drag & drop work images
              </div>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                PNG, JPG up to 10MB (max 5 files)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
