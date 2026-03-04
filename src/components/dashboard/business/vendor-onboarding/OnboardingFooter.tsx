import React from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingFooterProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevious,
  onNext,
  canGoPrevious
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="p-6 md:px-12 bg-white border-t border-slate-100 flex items-center justify-between rounded-b-3xl">
      <Button
        variant="ghost"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="gap-2 font-bold text-slate-500"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </Button>
      <div className="flex items-center gap-3">
        <Button
          onClick={onNext}
          disabled={isSubmitting}
          className={cn(
            'min-w-[140px] h-12 rounded-xl font-bold shadow-lg transition-all',
            isLastStep
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              : 'bg-slate-900 hover:bg-black text-white'
          )}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isLastStep ? (
            'Onboard Vendor'
          ) : (
            <>Next Step <ChevronRight className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </div>
    </div>
  );
};
