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

interface StepNavigatorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  completedSteps: boolean[];
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  isClickable: (currentStep: number, completedSteps: boolean[]) => boolean;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sell & Serve 10 Customers",
    description: "Prove your business with first 10 customers",
    icon: Target,
    color: "bg-pink-500",
    isClickable: () => true
  },
  {
    id: 2,
    title: "Confirm Your Scale Level",
    description: "Where are you in the 7 levels of scale?",
    icon: TrendingUp,
    color: "bg-blue-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 2 || completedSteps[0]
  },
  {
    id: 3,
    title: "Determine Your Starting Point",
    description: "Current revenue, profit & business value",
    icon: AlertTriangle,
    color: "bg-green-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 3 || completedSteps[1]
  },
  {
    id: 4,
    title: "Determine Your End Game",
    description: "Set your 3-year target numbers",
    icon: Heart,
    color: "bg-yellow-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 4 || completedSteps[2]
  },
  {
    id: 5,
    title: "Codify Your WHY (THEM)",
    description: "What impact will you make?",
    icon: Users,
    color: "bg-red-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 5 || completedSteps[3]
  },
  {
    id: 6,
    title: "Focus 5",
    description: "5 key actions for next 3-6 months",
    icon: Users,
    color: "bg-purple-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 6 || completedSteps[4]
  },
  {
    id: 7,
    title: "Create Your Action Plan",
    description: "Weekly priorities & taking action",
    icon: Zap,
    color: "bg-orange-500",
    isClickable: (currentStep, completedSteps) => currentStep >= 7 || completedSteps[5]
  }
];

export const StepNavigator: React.FC<StepNavigatorProps> = ({ 
  currentStep, 
  onStepChange, 
  completedSteps 
}) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Scalable Impact Planner Steps
          </h2>
          <Badge variant="outline" className="bg-white text-blue-700">
            Step {currentStep} of 7
          </Badge>
        </div>
        
        {/* Mobile/Small screens - vertical layout */}
        <div className="block md:hidden space-y-3">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = completedSteps[index];
            const isCurrent = currentStep === step.id;
            const isClickable = step.isClickable(currentStep, completedSteps);
            
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
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${isCurrent ? 'bg-white text-blue-600' : 
                      isCompleted ? 'bg-green-100 text-green-600' : 
                      'bg-gray-100 text-gray-600'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{step.id}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${isCurrent ? 'text-white' : ''}`}>
                      {step.title}
                    </div>
                    <div className={`text-xs mt-1 ${
                      isCurrent ? 'text-blue-100' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Large screens - horizontal layout with better spacing */}
        <div className="hidden md:grid md:grid-cols-7 gap-1 lg:gap-2">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = completedSteps[index];
            const isCurrent = currentStep === step.id;
            const isClickable = step.isClickable(currentStep, completedSteps);
            
            return (
              <div key={step.id} className="relative">
                <Button
                  variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                  className={`
                    w-full h-auto p-2 lg:p-3 flex flex-col items-center gap-1 lg:gap-2 transition-all duration-200 min-h-[100px] lg:min-h-[120px]
                    ${isCurrent ? 'ring-2 ring-blue-500 shadow-lg' : ''}
                    ${isCompleted ? 'bg-green-50 border-green-200 text-green-800' : ''}
                    ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  `}
                  onClick={() => isClickable && onStepChange(step.id)}
                  disabled={!isClickable}
                >
                  <div className={`
                    w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${isCurrent ? 'bg-white text-blue-600' : 
                      isCompleted ? 'bg-green-100 text-green-600' : 
                      'bg-gray-100 text-gray-600'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />
                    ) : (
                      <span className="font-bold text-sm lg:text-lg">{step.id}</span>
                    )}
                  </div>
                  
                  <div className="text-center px-1">
                    <div className={`font-semibold text-[10px] lg:text-xs leading-tight ${isCurrent ? 'text-white' : ''}`}>
                      {step.title}
                    </div>
                    <div className={`text-[9px] lg:text-xs mt-1 leading-tight ${
                      isCurrent ? 'text-blue-100' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-500'
                    }`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                      {step.description}
                    </div>
                  </div>
                </Button>
                
                {/* Arrow connector for larger screens */}
                {index < steps.length - 1 && (
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
            <span className="text-sm font-bold text-blue-600">
              {Math.round((completedSteps.filter(Boolean).length / 7) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.filter(Boolean).length / 7) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepNavigator;