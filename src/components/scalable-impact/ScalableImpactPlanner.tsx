import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle2,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

// Import step components
import { StepNavigator } from './StepNavigator';
import { Level1FirstTenCustomers } from './Level1FirstTenCustomers';
import { ScaleLevelConfirmation } from './ScaleLevelConfirmation';
import { StartingPointSection } from './StartingPointSection';
import { EndGameSection } from './EndGameSection';
import WhySection from './WhySection';
import HowSection from './HowSection';
import TakingActionSection from './TakingActionSection';

// Import shared types
import type { 
  StartingPoint, 
  EndingPoint, 
  WhyStatement, 
  HowStatement, 
  TakingActionItems 
} from './types';

const ScalableImpactPlanner: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Step navigation state (limited to initial 2 steps on this page)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false]);
  
  // Step 1: Level 1 - First 10 Customers (MANDATORY GATING STEP)
  const [level1Data, setLevel1Data] = useState({
    hasMadeSale: false,
    hasDeliveredPromise: false,
    hasReached10Customers: false,
    hasTestimonials: false,
    customerList: '',
    salesProof: '',
    isCompleted: false
  });
  
  // Step 2: Scale Level Confirmation
  const [selectedScaleLevel, setSelectedScaleLevel] = useState<number>(0);
  
  // Step 2: Starting Point  
  const [startingPoint, setStartingPoint] = useState<StartingPoint>({
    currentRevenue: '',
    currentProfit: '',
    currentProfitability: '',
    currentValuation: '',
    assessmentDate: '',
    revenueSource: '',
    businessStage: 'startup'
  });
  
  // Step 2: Starting Point (new format for component)
  const [startingPointData, setStartingPointData] = useState({
    currentRevenue: '',
    currentProfit: '',
    currentProfitMargin: '',
    currentValuation: '',
    assessmentDate: '',
    revenueSource: '',
    businessStage: 'owner-dependent' as 'owner-dependent' | 'professionalized'
  });
  
  // Step 3: Ending Point (new format for component)
  const [endGameData, setEndGameData] = useState({
    targetRevenue: '',
    targetProfit: '',
    targetValuation: '',
    timeframe: '3-year' as '3-year',
    growthStrategy: '',
    selectedBenchmark: '',
    targetProfitMargin: ''
  });
  
  // Step 3: Ending Point (old format for compatibility)
  const [endingPoint, setEndingPoint] = useState<EndingPoint>({
    targetRevenue: '',
    targetProfit: '',
    targetValuation: '',
    timeframe: '3-year',
    growthStrategy: 'double-in-three',
    benchmarks: {
      year1Revenue: '',
      year2Revenue: '',
      year3Revenue: ''
    }
  });
  
  // Step 4: WHY Statement
  const [whyStatement, setWhyStatement] = useState<WhyStatement>({
    me: {
      personalGoals: 'Exit the day-to-day',
      motivation: 'Build dream home',
      skillsDevelopment: '₦1M in passive investments',
      personalWhy: 'Travel one month every year'
    },
    us: {
      teamVision: "Fund kids' college",
      companyMission: 'Distribute ₦1M in profit sharing to team',
      culturalValues: 'Buy a vacation property',
      collectiveWhy: ''
    },
    them: {
      customerImpact: 'Become a 6-figure donor',
      marketProblem: 'Volunteer an hour a week',
      socialContribution: 'Serve on association board',
      externalWhy: ''
    }
  });
  
  // Step 5: HOW Statement (Focus 5)
  const [howStatement, setHowStatement] = useState<HowStatement>({
    action1: '',
    action2: '',
    action3: '',
    action4: '',
    action5: ''
  });
  
  // Step 6: Taking Action
  const [takingActionItems, setTakingActionItems] = useState<TakingActionItems>({
    currentAction1: '',
    currentAction2: '',
    currentAction3: ''
  });

  // Local storage utilities
  const saveToLocalStorage = (key: string, data: any) => {
    if (user?.id) {
      const userKey = `${key}_${user.id}`;
      localStorage.setItem(userKey, JSON.stringify(data));
    }
  };

  const loadFromLocalStorage = (key: string) => {
    if (user?.id) {
      const userKey = `${key}_${user.id}`;
      const saved = localStorage.getItem(userKey);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    if (user?.id) {
      const savedStep = loadFromLocalStorage('scalable_impact_current_step');
      const savedCompleted = loadFromLocalStorage('scalable_impact_completed_steps');
      const savedLevel1 = loadFromLocalStorage('scalable_impact_level1_data');
      const savedScaleLevel = loadFromLocalStorage('scalable_impact_scale_level');
      const savedStarting = loadFromLocalStorage('scalable_impact_starting');
      const savedStartingData = loadFromLocalStorage('scalable_impact_starting_data');
      const savedEnding = loadFromLocalStorage('scalable_impact_ending');
      const savedEndGameData = loadFromLocalStorage('scalable_impact_endgame_data');
      const savedWhy = loadFromLocalStorage('scalable_impact_why');
      const savedHow = loadFromLocalStorage('scalable_impact_how');
      const savedTakingAction = loadFromLocalStorage('scalable_impact_taking_action');
      
      if (savedStep) setCurrentStep(savedStep);
      if (savedCompleted) setCompletedSteps(savedCompleted);
      if (savedLevel1) setLevel1Data(savedLevel1);
      if (savedScaleLevel) setSelectedScaleLevel(savedScaleLevel);
      if (savedStarting) setStartingPoint(savedStarting);
      if (savedStartingData) setStartingPointData(savedStartingData);
      if (savedEnding) setEndingPoint(savedEnding);
      if (savedEndGameData) setEndGameData(savedEndGameData);
      if (savedWhy) setWhyStatement(savedWhy);
      if (savedHow) setHowStatement(savedHow);
      if (savedTakingAction) setTakingActionItems(savedTakingAction);
    }
  }, [user?.id]);

  // Auto-save data whenever it changes
  useEffect(() => {
    if (user?.id) {
      saveToLocalStorage('scalable_impact_current_step', currentStep);
      saveToLocalStorage('scalable_impact_completed_steps', completedSteps);
      saveToLocalStorage('scalable_impact_level1_data', level1Data);
      saveToLocalStorage('scalable_impact_scale_level', selectedScaleLevel);
      saveToLocalStorage('scalable_impact_starting', startingPoint);
      saveToLocalStorage('scalable_impact_starting_data', startingPointData);
      saveToLocalStorage('scalable_impact_ending', endingPoint);
      saveToLocalStorage('scalable_impact_endgame_data', endGameData);
      saveToLocalStorage('scalable_impact_why', whyStatement);
      saveToLocalStorage('scalable_impact_how', howStatement);
      saveToLocalStorage('scalable_impact_taking_action', takingActionItems);
    }
  }, [currentStep, completedSteps, level1Data, selectedScaleLevel, startingPoint, startingPointData, endingPoint, endGameData, whyStatement, howStatement, takingActionItems, user?.id]);

  // Step navigation handlers
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleStepComplete = (stepIndex: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = true;
    setCompletedSteps(newCompletedSteps);
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      handleStepComplete(currentStep - 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step-specific handlers
  const handleLevel1Complete = () => {
    if (level1Data.isCompleted) {
      handleNextStep();
      toast({
        title: "Level 1 Complete! 🏆",
        description: "You've proven your business with 10 customers. Ready to scale!",
      });
    }
  };

  const handleStep2Complete = () => {
    if (selectedScaleLevel > 0) {
      handleNextStep();
      toast({
        title: "Scale Level Confirmed! 🎯",
        description: `Starting from Level ${selectedScaleLevel}. Let's determine your current numbers.`,
      });
    }
  };

  const handleStep3Complete = () => {
    handleNextStep();
    toast({
      title: "Starting Point Established! 📊",
      description: "Great! Now let's set your 3-year targets.",
    });
  };

  const handleStep4Complete = () => {
    handleNextStep();
    toast({
      title: "End Game Defined! 🎯",
      description: "Excellent! Now let's codify your WHY.",
    });
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Level1FirstTenCustomers
            data={level1Data}
            onDataChange={setLevel1Data}
            onComplete={handleLevel1Complete}
          />
        );
      
      case 2:
        return (
          <ScaleLevelConfirmation
            selectedLevel={selectedScaleLevel}
            onLevelChange={setSelectedScaleLevel}
            onComplete={handleStep2Complete}
          />
        );
      
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Invalid step</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 -mx-6 mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Scalable Impact Planner</CardTitle>
          <span className="text-sm text-muted-foreground">Steps 1–2</span>
        </div>
      </div>

      {/* Step Navigator */}
      <StepNavigator 
        currentStep={currentStep}
        onStepChange={handleStepChange}
        completedSteps={completedSteps}
        visibleStepIds={[1, 2]}
      />

      {/* Current Step Content */}
      <div className="mb-6">
        {renderStepContent()}
      </div>

      {/* Navigation Controls */}
      <Card className="bg-card border">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </Button>
            
            <div className="text-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Step {currentStep} of 7
              </Badge>
              <p className="text-sm text-gray-600 mt-1">
                Progress: {Math.round((completedSteps.filter(Boolean).length / Math.max(1, completedSteps.length)) * 100)}%
              </p>
            </div>
            
            <Button 
              onClick={handleNextStep}
              disabled={
                currentStep === 2 || 
                (currentStep === 1 && !level1Data.isCompleted) ||
                (currentStep === 2 && selectedScaleLevel === 0)
              }
              className="gap-2"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Alert */}
      {completedSteps.every(Boolean) && (
        <Alert className="mt-6 border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            <strong>Congratulations! 🎉</strong> You've completed all 7 steps of your Scalable Impact Plan. 
            From Level 1 foundation to your action plan, you're ready to scale systematically!
          </AlertDescription>
        </Alert>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© The Scalable Company - Helping entrepreneurs scale systematically</p>
      </div>
    </div>
  );
};

export default ScalableImpactPlanner;