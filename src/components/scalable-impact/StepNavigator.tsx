import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Target,
  TrendingUp,
  AlertTriangle,
  Heart,
  Users,
  Zap
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface StepNavigatorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  completedSteps: boolean[];
  visibleStepIds?: number[];
}

interface Step {
  id: number;
  title: string; // full title
  shortTitle: string; // short label version
  description: string;
  icon: any;
  color: string;
  isClickable: (currentStep: number, completedSteps: boolean[]) => boolean;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Get 10 Customers",
    shortTitle: "10 Customers",
    description: "Prove your business with first 10 customers",
    icon: Target,
    color: "bg-slate-500",
    isClickable: () => true
  },
  {
    id: 2,
    title: "Build a Growth Flywheel",
    shortTitle: "Growth Flywheel",
    description: "Create predictable revenue systems",
    icon: TrendingUp,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 2 || completedSteps[0]
  },
  {
    id: 3,
    title: "Upgrade Your OS",
    shortTitle: "Upgrade OS",
    description: "Professionalize your business operations",
    icon: AlertTriangle,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 3 || completedSteps[1]
  },
  {
    id: 4,
    title: "Double Your Take-Home",
    shortTitle: "Double Take-Home",
    description: "Turn the business into a cash machine",
    icon: Heart,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 4 || completedSteps[2]
  },
  {
    id: 5,
    title: "Build Your Board",
    shortTitle: "Build Board",
    description: "Add advisors and accountability",
    icon: Users,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 5 || completedSteps[3]
  },
  {
    id: 6,
    title: "Complete an Acquisition",
    shortTitle: "Acquisition",
    description: "Expand capacity or market share",
    icon: Users,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 6 || completedSteps[4]
  },
  {
    id: 7,
    title: "Hit Your Number",
    shortTitle: "Hit Number",
    description: "Reach your Level 7 Life target",
    icon: Zap,
    color: "bg-slate-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 7 || completedSteps[5]
  }
];

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  onStepChange,
  completedSteps,
  visibleStepIds
}) => {
  const visibleSteps = visibleStepIds ? steps.filter(s => visibleStepIds.includes(s.id)) : steps;
  const currentIndex = Math.max(0, visibleSteps.findIndex(s => s.id === currentStep));
  const safeCompleted = completedSteps.slice(0, visibleSteps.length);
  const completedCount = safeCompleted.filter(Boolean).length;
  return (
    <Card className="mb-4 bg-card border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Scalable Impact Planner Steps
          </h2>
          <Badge variant="outline" className="bg-white text-slate-700 flex items-center gap-1">
            ✓ {completedCount} / {visibleSteps.length}
          </Badge>
        </div>

        {/* Mobile/Small screens - vertical layout */}
        <div className="block md:hidden space-y-3">
          {visibleSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = safeCompleted[index];
            const isCurrent = currentStep === step.id;
            const isClickable = step.isClickable(currentStep, safeCompleted);

            return (
              <div key={step.id} className="relative">
                <Button
                  variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                  className={`
                    w-full h-auto p-3 flex items-center gap-3 transition-all duration-200 text-left
                    ${isCurrent ? 'ring-2 ring-blue-500 shadow-lg' : ''}
                    ${isCompleted ? 'bg-green-50 border-green-200 text-green-800' : ''}
                    ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                  `}
                  onClick={() => isClickable && onStepChange(step.id)}
                  disabled={!isClickable}
                  title={`${step.title} — ${step.description}`}
                >
                  <Checkbox
                    checked={isCompleted}
                    readOnly
                    className="w-5 h-5 data-[state=checked]:bg-slate-700 data-[state=checked]:border-slate-700"
                  />
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${isCurrent ? 'text-white' : ''}`}>
                      {step.shortTitle}
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Large screens - horizontal layout with better spacing */}
        <div className={`hidden md:grid gap-1 lg:gap-2`} style={{ gridTemplateColumns: `repeat(${visibleSteps.length}, minmax(0, 1fr))` }}>
          {visibleSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = safeCompleted[index];
            const isCurrent = currentStep === step.id;
            const isClickable = step.isClickable(currentStep, safeCompleted);

            return (
              <div key={step.id} className="relative">
                <Button
                  variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                  className={`
                    w-full h-auto p-2 lg:p-3 flex flex-col items-center gap-1 lg:gap-2 transition-all duration-200 min-h-[100px] lg:min-h-[120px]
                    ${isCurrent ? 'ring-2 ring-slate-500 shadow-lg' : ''}
                    ${isCompleted ? 'bg-slate-50 border-slate-200 text-slate-800' : ''}
                    ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  `}
                  onClick={() => isClickable && onStepChange(step.id)}
                  disabled={!isClickable}
                  title={`${step.title} — ${step.description}`}
                >
                  <Checkbox
                    checked={isCompleted}
                    readOnly
                    className="w-5 h-5 data-[state=checked]:bg-slate-700 data-[state=checked]:border-slate-700"
                  />
                  <div className="text-center px-1">
                    <div className={`font-semibold text-[10px] lg:text-xs leading-tight ${isCurrent ? 'text-white' : ''}`}>
                      {step.shortTitle}
                    </div>
                  </div>
                </Button>

                {/* Arrow connector for larger screens */}
                {index < visibleSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-1.5 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-slate-700">
              {Math.round((completedSteps.filter(Boolean).length / 7) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-slate-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.filter(Boolean).length / 7) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepNavigator;