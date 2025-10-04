import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Building, 
  Crown, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import scalableImpactProgressService, { 
  type ScalableImpactProgress, 
  type LevelProgress,
  type ProgressBenchmark
} from "@/services/scalableImpactProgressService";

// Import separate components
import ProgressBar from './ProgressBar';
import FinancialTargets from './FinancialTargets';
import GrowthInsights from './GrowthInsights';
import WhySection from './WhySection';
import HowSection from './HowSection';
import TakingActionSection from './TakingActionSection';

// Import shared types
import type { 
  FinancialTarget, 
  StartingPoint, 
  EndingPoint, 
  WhyStatement, 
  HowStatement, 
  TakingActionItems 
} from './types';

interface ScaleLevel {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: any;
  completed: boolean;
  locked: boolean;
  requirements: string[];
}

const ScalableImpactPlanner: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userNumber, setUserNumber] = useState<string>('');
  const [currentTarget, setCurrentTarget] = useState<FinancialTarget>({
    revenue: '1,000,000',
    profit: '150,000',
    profitPercentage: '15',
    value: '375,000',
    valueMultiplier: '2.5'
  });
  const [yearTarget, setYearTarget] = useState<FinancialTarget>({
    revenue: '5,000,000',
    profit: '1,000,000',
    profitPercentage: '20',
    value: '7,500,000',
    valueMultiplier: '7.5'
  });
  
  // Progress tracking state - Initialize with default structure to prevent null errors
  const [progressData, setProgressData] = useState<ScalableImpactProgress | null>(() => {
    if (typeof window !== 'undefined' && user?.id) {
      // Try to load from localStorage immediately
      const saved = localStorage.getItem(`scalable_impact_progress_${user.id}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fall through to default
        }
      }
    }
    
    // Default progress structure
    return {
      userId: user?.id || '',
      currentLevel: 1,
      levels: Array.from({ length: 7 }, (_, i) => ({
        levelId: i + 1,
        title: `Level ${i + 1}`,
        completed: false,
        benchmarks: [],
        overallProgress: 0
      })),
      lastAssessment: new Date().toISOString()
    };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAssessing, setIsAssessing] = useState(false);
  const [lastAssessmentTime, setLastAssessmentTime] = useState<string>('');
  
  // New step states
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [startingPoint, setStartingPoint] = useState<StartingPoint>({
    currentRevenue: '',
    currentProfit: '',
    currentProfitability: '',
    currentValuation: '',
    assessmentDate: '',
    revenueSource: '',
    businessStage: 'startup'
  });
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
  
  const [howStatement, setHowStatement] = useState<HowStatement>({
    action1: '',
    action2: '',
    action3: '',
    action4: '',
    action5: ''
  });
  
  const [takingActionItems, setTakingActionItems] = useState<TakingActionItems>({
    currentAction1: '',
    currentAction2: '',
    currentAction3: ''
  });

  // Local storage utility functions
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

  // Load all data from localStorage on component mount
  useEffect(() => {
    if (user?.id) {
      loadAllStoredData();
      loadProgressData();
    }
  }, [user?.id]);

  const loadAllStoredData = () => {
    // Load stored step data
    const savedStep = loadFromLocalStorage('scalable_impact_step');
    if (savedStep) setCurrentStep(savedStep);

    // Load starting point
    const savedStarting = loadFromLocalStorage('scalable_impact_starting');
    if (savedStarting) setStartingPoint(savedStarting);

    // Load ending point
    const savedEnding = loadFromLocalStorage('scalable_impact_ending');
    if (savedEnding) setEndingPoint(savedEnding);

    // Load why statement
    const savedWhy = loadFromLocalStorage('scalable_impact_why');
    if (savedWhy) setWhyStatement(savedWhy);
    
    // Load how statement
    const savedHow = loadFromLocalStorage('scalable_impact_how');
    if (savedHow) setHowStatement(savedHow);
    
    // Load taking action items
    const savedTakingAction = loadFromLocalStorage('scalable_impact_taking_action');
    if (savedTakingAction) setTakingActionItems(savedTakingAction);

    // Load financial targets
    const savedCurrent = loadFromLocalStorage('scalable_impact_current_target');
    if (savedCurrent) setCurrentTarget(savedCurrent);

    const savedYear = loadFromLocalStorage('scalable_impact_year_target');
    if (savedYear) setYearTarget(savedYear);
  };

  // Auto-save functions
  const saveStepData = () => {
    saveToLocalStorage('scalable_impact_step', currentStep);
    saveToLocalStorage('scalable_impact_starting', startingPoint);
    saveToLocalStorage('scalable_impact_ending', endingPoint);
    saveToLocalStorage('scalable_impact_why', whyStatement);
    saveToLocalStorage('scalable_impact_how', howStatement);
    saveToLocalStorage('scalable_impact_taking_action', takingActionItems);
    saveToLocalStorage('scalable_impact_current_target', currentTarget);
    saveToLocalStorage('scalable_impact_year_target', yearTarget);
    if (progressData) {
      saveToLocalStorage('scalable_impact_progress', progressData);
    }
  };

  // Auto-save whenever data changes
  useEffect(() => {
    if (user?.id) {
      saveStepData();
    }
  }, [currentStep, startingPoint, endingPoint, whyStatement, howStatement, takingActionItems, currentTarget, yearTarget, progressData, user?.id]);

  const loadProgressData = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const progress = await scalableImpactProgressService.getUserProgress(user.id);
      setProgressData(progress);
      setLastAssessmentTime(progress.lastAssessment);
    } catch (error) {
      console.error('Error loading progress data:', error);
      // Create default progress data if API fails
      const defaultProgress = {
        userId: user.id,
        currentLevel: 1,
        levels: Array.from({ length: 7 }, (_, i) => ({
          levelId: i + 1,
          title: `Level ${i + 1}`,
          completed: false,
          benchmarks: [],
          overallProgress: 0
        })),
        lastAssessment: new Date().toISOString()
      };
      setProgressData(defaultProgress);
      setLastAssessmentTime(new Date().toISOString());
      
      toast({
        title: "Using Offline Mode",
        description: "Progress tracking will work with local data only.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get scale level configuration
  const getScaleLevelConfig = (levelId: number) => {
    const configs = {
      1: {
        title: "Solopreneur",
        description: "Individual contributor with direct customer service",
        color: "bg-red-500",
        icon: Users
      },
      2: {
        title: "Startup Growth",
        description: "Small team with systematic customer acquisition",
        color: "bg-orange-500",
        icon: TrendingUp
      },
      3: {
        title: "Small Year Or Team-Home",
        description: "Established processes with consistent revenue streams",
        color: "bg-yellow-500",
        icon: Building
      },
      4: {
        title: "Scale Your Brand",
        description: "Brand recognition with scalable business model",
        color: "bg-green-500",
        icon: Crown
      },
      5: {
        title: "Build Your Empire",
        description: "Multiple revenue streams with market dominance",
        color: "bg-blue-500",
        icon: Building
      },
      6: {
        title: "10 Million Year",
        description: "Industry leadership with significant market impact",
        color: "bg-indigo-500",
        icon: Target
      },
      7: {
        title: "Legacy With M&A",
        description: "Exit strategy with lasting impact and wealth creation",
        color: "bg-purple-500",
        icon: Zap
      }
    };
    return configs[levelId as keyof typeof configs];
  };

  // Check if user can progress to next level
  const canProgressToLevel = (levelId: number): boolean => {
    if (levelId === 1) return true; // First level is always available
    if (!progressData) return false;
    
    const previousLevel = progressData.levels.find(level => level.levelId === levelId - 1);
    return previousLevel?.completed || false;
  };

  // Assess all progress from dashboard data
  const assessAllProgress = async () => {
    if (!user?.id) return;
    
    try {
      setIsAssessing(true);
      toast({
        title: "Assessing Progress",
        description: "Checking your progress across all dashboard activities...",
      });

      await scalableImpactProgressService.assessAllProgress(user.id);
      await loadProgressData(); // Refresh the data

      toast({
        title: "Progress Updated! 🎯",
        description: "Your progress has been updated based on your latest dashboard activities.",
      });
    } catch (error) {
      console.error('Error assessing progress:', error);
      toast({
        title: "Assessment Error",
        description: "Failed to assess your progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAssessing(false);
    }
  };

  // Check specific level progress
  const checkLevelProgress = (levelId: number) => {
    if (!progressData) return;
    
    const level = progressData.levels.find(l => l.levelId === levelId);
    if (!level) return;

    const config = getScaleLevelConfig(levelId);
    if (!canProgressToLevel(levelId)) {
      toast({
        title: "Level Locked 🔒",
        description: "Complete the previous level first before accessing this one.",
        variant: "destructive"
      });
      return;
    }

    const completedBenchmarks = level.benchmarks.filter(b => b.isCompleted).length;
    const totalBenchmarks = level.benchmarks.length;
    
    toast({
      title: `${config?.title} Progress`,
      description: `${completedBenchmarks}/${totalBenchmarks} requirements completed (${level.overallProgress.toFixed(1)}%)`,
    });
  };

  // Save financial goals
  const saveFinancialGoals = () => {
    saveStepData();
    toast({
      title: "Goals Saved! 💾",
      description: "Your financial targets have been saved successfully.",
    });
  };

  // Calculate smart targets based on current values
  const calculateSmartTargets = () => {
    const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
    const currentProfit = parseFloat(currentTarget.profit.replace(/,/g, '')) || 0;
    const currentValue = parseFloat(currentTarget.value.replace(/,/g, '')) || 0;

    if (currentRev === 0) {
      toast({
        title: "Enter Current Values First",
        description: "Please enter your current revenue to generate smart targets.",
        variant: "destructive"
      });
      return;
    }

    // Calculate 3-year targets with 40-50% annual growth (aggressive but achievable)
    const growthMultiplier = 3.5; // Approximately 40% annual growth compounded
    const targetRevenue = Math.round(currentRev * growthMultiplier);
    const targetProfit = Math.round(currentProfit * growthMultiplier * 1.2); // Slightly higher profit growth
    const targetValue = Math.round(currentValue * growthMultiplier * 2); // Higher value multiple
    const targetProfitPercentage = Math.min(parseFloat(currentTarget.profitPercentage) + 5, 25); // Improve margins by 5%

    setYearTarget({
      revenue: targetRevenue.toLocaleString(),
      profit: targetProfit.toLocaleString(),
      profitPercentage: targetProfitPercentage.toString(),
      value: targetValue.toLocaleString(),
      valueMultiplier: '7.5'
    });

    toast({
      title: "Smart Targets Generated! 🎢",
      description: "3-year targets calculated based on aggressive but achievable 40% annual growth.",
    });
  };

  // Calculate growth benchmarks
  const calculateBenchmarks = (currentRevenue: number, targetRevenue: number, strategy: string) => {
    let year1, year2, year3;
    
    if (strategy === 'double-in-three') {
      // Double in 3 years = ~26% annual growth
      year1 = currentRevenue * 1.26;
      year2 = year1 * 1.26;
      year3 = year2 * 1.26;
    } else if (strategy === 'top-to-bottom') {
      // Linear growth from current to target
      const yearlyIncrease = (targetRevenue - currentRevenue) / 3;
      year1 = currentRevenue + yearlyIncrease;
      year2 = currentRevenue + (yearlyIncrease * 2);
      year3 = targetRevenue;
    } else {
      // Custom - equal distribution
      const totalGrowth = targetRevenue - currentRevenue;
      year1 = currentRevenue + (totalGrowth * 0.3);
      year2 = currentRevenue + (totalGrowth * 0.6);
      year3 = targetRevenue;
    }

    return {
      year1Revenue: Math.round(year1).toString(),
      year2Revenue: Math.round(year2).toString(),
      year3Revenue: Math.round(year3).toString()
    };
  };

  // Auto-calculate benchmarks when values change
  useEffect(() => {
    if (startingPoint.currentRevenue && endingPoint.targetRevenue) {
      const current = parseFloat(startingPoint.currentRevenue) || 0;
      const target = parseFloat(endingPoint.targetRevenue) || 0;
      if (current > 0 && target > current) {
        const newBenchmarks = calculateBenchmarks(current, target, endingPoint.growthStrategy);
        setEndingPoint(prev => ({ ...prev, benchmarks: newBenchmarks }));
      }
    }
  }, [startingPoint.currentRevenue, endingPoint.targetRevenue, endingPoint.growthStrategy]);

  // Step navigation
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
      saveToLocalStorage('scalable_impact_step', step);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Validation functions
  const isStep2Valid = () => {
    return startingPoint.currentRevenue && 
           startingPoint.currentProfit && 
           startingPoint.currentValuation;
  };

  const isStep3Valid = () => {
    return endingPoint.targetRevenue && 
           endingPoint.targetProfit && 
           endingPoint.targetValuation;
  };

  const isStep4Valid = () => {
    return whyStatement.me.personalWhy && 
           whyStatement.us.collectiveWhy && 
           whyStatement.them.externalWhy;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-600">Loading your Scalable Impact progress...</p>
        </div>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-8 h-8 mx-auto text-red-600" />
          <p className="text-gray-600">Failed to load progress data.</p>
          <Button onClick={loadProgressData}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Save handlers for child components
  const handleSaveWhy = () => {
    saveStepData();
    toast({
      title: "WHY Statement Saved! 🎯",
      description: "Your personal, team, and community goals have been saved.",
    });
  };

  const handleSaveHow = () => {
    saveStepData();
    toast({
      title: "HOW Statement Saved! ⚙️",
      description: "Your strategic action items have been saved.",
    });
  };

  const handleSaveTakingAction = () => {
    saveStepData();
    toast({
      title: "Taking Action Saved! 🎨",
      description: "Your current action items have been saved.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Financial Targets Section */}
      <FinancialTargets
        currentTarget={currentTarget}
        setCurrentTarget={setCurrentTarget}
        yearTarget={yearTarget}
        setYearTarget={setYearTarget}
      />

      {/* Growth Insights and Smart Targets */}
      <GrowthInsights
        currentTarget={currentTarget}
        yearTarget={yearTarget}
        onCalculateSmartTargets={calculateSmartTargets}
        onSaveFinancialGoals={saveFinancialGoals}
      />

      {/* WHY Section */}
      <WhySection
        whyStatement={whyStatement}
        setWhyStatement={setWhyStatement}
        onSave={handleSaveWhy}
      />

      {/* HOW Section */}
      <HowSection
        howStatement={howStatement}
        setHowStatement={setHowStatement}
        onSave={handleSaveHow}
      />

      {/* Taking Action Section */}
      <TakingActionSection
        takingActionItems={takingActionItems}
        setTakingActionItems={setTakingActionItems}
        onSave={handleSaveTakingAction}
      />

   

      {/* Footer with Brand */}
      <div className="px-6 py-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">© The Scalable Company</p>
      </div>
    </div>
  );
};

export default ScalableImpactPlanner;