import React from 'react';
import { StepIndicator } from './StepIndicator';
import { SupportCard } from './SupportCard';
import type { StepConfig } from './types';

interface OnboardingSidebarProps {
  currentStep: number;
  steps: StepConfig[];
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">Vendor Onboarding</h1>
        <p className="text-sm text-slate-500 font-medium">Join our ecosystem of trusted partners.</p>
      </div>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <SupportCard />
    </div>
  );
};
