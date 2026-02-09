import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StepConfig } from './types';

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="space-y-2">
      {steps.map((s) => {
        const Icon = s.icon;
        const isPast = currentStep > s.id;
        const isActive = currentStep === s.id;

        return (
          <div
            key={s.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-2xl transition-all',
              isActive ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-60'
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              isPast ? 'bg-green-100 text-green-600' :
                isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' :
                  'bg-slate-100 text-slate-500'
            )}>
              {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Step {s.id}</span>
              <span className={cn('text-xs font-bold', isActive ? 'text-slate-900' : 'text-slate-600')}>
                {s.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
