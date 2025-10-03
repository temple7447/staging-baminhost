import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Building, 
  Crown, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  Save,
  Bell,
  Check,
  ArrowRight,
  Calculator
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import scalableImpactProgressService, { 
  type ScalableImpactProgress, 
  type LevelProgress,
  type ProgressBenchmark
} from "@/services/scalableImpactProgressService";

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

interface FinancialTarget {
  revenue: string;
  profit: string;
  profitPercentage: string;
  value: string;
  valueMultiplier: string;
}

interface StartingPoint {
  currentRevenue: string;
  currentProfit: string;
  currentProfitability: string;
  currentValuation: string;
  assessmentDate: string;
  revenueSource: string;
  businessStage: string;
}

interface EndingPoint {
  targetRevenue: string;
  targetProfit: string;
  targetValuation: string;
  timeframe: '3-year' | '5-year' | '10-year';
  growthStrategy: 'double-in-three' | 'top-to-bottom' | 'custom';
  benchmarks: {
    year1Revenue: string;
    year2Revenue: string;
    year3Revenue: string;
  };
}

interface WhyStatement {
  me: {
    personalGoals: string;
    motivation: string;
    skillsDevelopment: string;
    personalWhy: string;
  };
  us: {
    teamVision: string;
    companyMission: string;
    culturalValues: string;
    collectiveWhy: string;
  };
  them: {
    customerImpact: string;
    marketProblem: string;
    socialContribution: string;
    externalWhy: string;
  };
}

interface HowStatement {
  action1: string;
  action2: string;
  action3: string;
  action4: string;
  action5: string;
}

interface TakingActionItems {
  currentAction1: string;
  currentAction2: string;
  currentAction3: string;
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Top Progress Section */}
      <div className="bg-gray-100 p-6 border-b">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar Background */}
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((step, index) => {
              const colors = [
                'bg-red-500',
                'bg-orange-500', 
                'bg-yellow-500',
                'bg-green-500',
                'bg-blue-500',
                'bg-indigo-500',
                'bg-black'
              ];
              const isCompleted = step <= 5;
              
              return (
                <React.Fragment key={step}>
                  <div className={`w-12 h-12 rounded-full ${colors[index]} flex items-center justify-center text-white font-bold text-lg`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : step}
                  </div>
                  {index < 6 && (
                    <div className="flex-1 h-2 bg-gray-300 mx-2 rounded-full">
                      <div className={`h-full rounded-full ${
                        step <= 5 ? colors[index] : 'bg-gray-300'
                      }`} style={{ width: step <= 5 ? '100%' : '0%' }}></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Step Labels and Checkboxes */}
          <div className="flex items-start justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((step, index) => {
              const stepTitles = [
                'Get 10\nCustomers',
                'Automate\nGrowth',
                'Upgrade\nYour OS',
                '2X Your\nTake-Home',
                'Build Your\nBoard',
                'Expand\nWith M&A',
                'Hit Your\n"Number"'
              ];
              const isCompleted = step <= 5;
              
              return (
                <div key={step} className="flex flex-col items-center" style={{ width: '14.28%' }}>
                  <div className="text-center mb-2">
                    <div className="text-xs font-medium text-gray-700 leading-tight whitespace-pre-line">
                      {stepTitles[index]}
                    </div>
                  </div>
                  <Checkbox 
                    checked={isCompleted} 
                    disabled 
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Financial Targets Section - Exact replica of the design */}
      <div className="flex flex-col lg:flex-row bg-white border border-gray-300 overflow-hidden" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* WHAT Section - Green sidebar */}
        <div className="bg-green-500 flex items-center justify-center p-4 lg:p-6 min-h-[60px] lg:min-h-[400px]">
          <div className="transform lg:-rotate-90 text-white font-bold text-lg lg:text-xl tracking-wider">
            WHAT
          </div>
        </div>

        {/* CURRENT Section */}
        <div className="flex-1 border-r border-gray-300">
          {/* Header */}
          <div className="bg-gray-100 text-center py-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-700">CURRENT</h2>
          </div>
          
          {/* Content */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Revenue */}
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Revenue</div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">₦</span>
                <Input
                  value={currentTarget.revenue}
                  onChange={(e) => setCurrentTarget(prev => ({ ...prev, revenue: e.target.value }))}
                  placeholder="1,000,000"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-48"
                />
              </div>
            </div>
            
            {/* Profit Row */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-sm text-gray-600 mb-1">Profit</div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">₦</span>
                  <Input
                    value={currentTarget.profit}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, profit: e.target.value }))}
                    placeholder="150,000"
                    className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-32"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Input
                    value={currentTarget.profitPercentage}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                    placeholder="15"
                    className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                  />
                  <span className="text-2xl lg:text-3xl font-bold text-blue-600">%</span>
                </div>
              </div>
            </div>
            
            {/* Value Row */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-sm text-gray-600 mb-1">Value</div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">₦</span>
                  <Input
                    value={currentTarget.value}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="375,000"
                    className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-32"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Input
                    value={currentTarget.valueMultiplier}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                    placeholder="2.5"
                    className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                  />
                  <span className="text-2xl lg:text-3xl font-bold text-blue-600">x</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Section */}
        <div className="flex items-center justify-center bg-green-500 p-4">
          <ArrowRight className="w-8 h-8 text-white" />
        </div>

        {/* 3-YEAR TARGET Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-100 text-center py-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-700">3-YEAR TARGET</h2>
          </div>
          
          {/* Content */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Revenue */}
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Revenue</div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">₦</span>
                <Input
                  value={yearTarget.revenue}
                  onChange={(e) => setYearTarget(prev => ({ ...prev, revenue: e.target.value }))}
                  placeholder="5,000,000"
                  className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-48"
                />
              </div>
            </div>
            
            {/* Profit Row */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-sm text-gray-600 mb-1">Profit</div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">₦</span>
                  <Input
                    value={yearTarget.profit}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, profit: e.target.value }))}
                    placeholder="1,000,000"
                    className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-32"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Input
                    value={yearTarget.profitPercentage}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                    placeholder="20"
                    className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                  />
                  <span className="text-2xl lg:text-3xl font-bold text-blue-600">%</span>
                </div>
              </div>
            </div>
            
            {/* Value Row */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-sm text-gray-600 mb-1">Value</div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">₦</span>
                  <Input
                    value={yearTarget.value}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="7,500,000"
                    className="text-center text-xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-32"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Input
                    value={yearTarget.valueMultiplier}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                    placeholder="7.5"
                    className="text-center text-2xl lg:text-3xl font-bold border-0 bg-transparent text-blue-600 focus:bg-white focus:border focus:border-blue-300 w-16"
                  />
                  <span className="text-2xl lg:text-3xl font-bold text-blue-600">x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Relationship Indicator */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Current Summary */}
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Position</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Revenue: <span className="font-medium text-green-600">₦{currentTarget.revenue}</span></div>
                  <div className="text-sm text-gray-600">Profit: <span className="font-medium text-green-600">₦{currentTarget.profit} ({currentTarget.profitPercentage}%)</span></div>
                  <div className="text-sm text-gray-600">Value: <span className="font-medium text-green-600">₦{currentTarget.value}</span></div>
                </div>
              </div>

              {/* Growth Arrow and Calculations */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight className="w-8 h-8 text-green-600" />
                  <div className="bg-white rounded-lg px-3 py-2 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {(() => {
                          const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
                          const targetRev = parseFloat(yearTarget.revenue.replace(/,/g, '')) || 0;
                          const growthRate = currentRev > 0 ? ((targetRev / currentRev - 1) * 100).toFixed(1) : '0';
                          return `${growthRate}% Growth`;
                        })()} 
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">3-Year Journey</div>
              </div>

              {/* Target Summary */}
              <div className="text-center lg:text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3-Year Target</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Revenue: <span className="font-medium text-blue-600">₦{yearTarget.revenue}</span></div>
                  <div className="text-sm text-gray-600">Profit: <span className="font-medium text-blue-600">₦{yearTarget.profit} ({yearTarget.profitPercentage}%)</span></div>
                  <div className="text-sm text-gray-600">Value: <span className="font-medium text-blue-600">₦{yearTarget.value}</span></div>
                </div>
              </div>
            </div>

            {/* Growth Insights */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="text-lg font-bold text-green-600">
                    {(() => {
                      const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
                      const targetRev = parseFloat(yearTarget.revenue.replace(/,/g, '')) || 0;
                      const multiplier = currentRev > 0 ? (targetRev / currentRev).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Revenue Growth</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="text-lg font-bold text-blue-600">
                    {(() => {
                      const currentProfit = parseFloat(currentTarget.profit.replace(/,/g, '')) || 0;
                      const targetProfit = parseFloat(yearTarget.profit.replace(/,/g, '')) || 0;
                      const multiplier = currentProfit > 0 ? (targetProfit / currentProfit).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Profit Growth</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <div className="text-lg font-bold text-purple-600">
                    {(() => {
                      const currentValue = parseFloat(currentTarget.value.replace(/,/g, '')) || 0;
                      const targetValue = parseFloat(yearTarget.value.replace(/,/g, '')) || 0;
                      const multiplier = currentValue > 0 ? (targetValue / currentValue).toFixed(1) : '0';
                      return `${multiplier}x`;
                    })()} 
                  </div>
                  <div className="text-xs text-gray-600">Value Growth</div>
                </div>
              </div>
            </div>

            {/* Smart Target Actions */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={calculateSmartTargets} 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Smart Targets
                </Button>
                <div className="text-xs text-gray-500 text-center">
                  Generate 3-year targets based on 40% annual growth
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Financial Targets Button */}
      <div className="flex justify-center py-4">
        <Button onClick={saveFinancialGoals} size="lg" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4" />
          Save Financial Targets
        </Button>
      </div>

      {/* WHY Section - Editable input fields with exact design */}
      <div className="py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row bg-white border border-gray-300 overflow-hidden" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* WHY Section - Green sidebar */}
          <div className="bg-green-500 flex items-center justify-center p-4 lg:p-6 min-h-[60px] lg:min-h-[300px]">
            <div className="transform lg:-rotate-90 text-white font-bold text-lg lg:text-xl tracking-wider">
              WHY
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 border-l border-gray-300">
            {/* ME Column */}
            <div className="border-r border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">ME</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <Input
                    value={whyStatement.me.personalGoals}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      me: { ...prev.me, personalGoals: e.target.value }
                    }))}
                    placeholder="Exit the day-to-day"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <Input
                    value={whyStatement.me.motivation}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      me: { ...prev.me, motivation: e.target.value }
                    }))}
                    placeholder="Build dream home"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <Input
                    value={whyStatement.me.skillsDevelopment}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      me: { ...prev.me, skillsDevelopment: e.target.value }
                    }))}
                    placeholder="₦1M in passive investments"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <Input
                    value={whyStatement.me.personalWhy}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      me: { ...prev.me, personalWhy: e.target.value }
                    }))}
                    placeholder="Travel one month every year"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                  />
                </div>
              </div>
            </div>

            {/* US Column */}
            <div className="border-r border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">US</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <Input
                    value={whyStatement.us.teamVision}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      us: { ...prev.us, teamVision: e.target.value }
                    }))}
                    placeholder="Fund kids' college"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <textarea
                    value={whyStatement.us.companyMission}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      us: { ...prev.us, companyMission: e.target.value }
                    }))}
                    placeholder="Distribute ₦1M in profit sharing to team"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[60px]"
                    rows={3}
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <textarea
                    value={whyStatement.us.culturalValues}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      us: { ...prev.us, culturalValues: e.target.value }
                    }))}
                    placeholder="Buy a vacation property"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* THEM Column */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">THEM</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <textarea
                    value={whyStatement.them.customerImpact}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      them: { ...prev.them, customerImpact: e.target.value }
                    }))}
                    placeholder="Become a 6-figure donor"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                    rows={2}
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <textarea
                    value={whyStatement.them.marketProblem}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      them: { ...prev.them, marketProblem: e.target.value }
                    }))}
                    placeholder="Volunteer an hour a week"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                    rows={2}
                  />
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <textarea
                    value={whyStatement.them.socialContribution}
                    onChange={(e) => setWhyStatement(prev => ({
                      ...prev,
                      them: { ...prev.them, socialContribution: e.target.value }
                    }))}
                    placeholder="Serve on association board"
                    className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                    rows={2}
                  />
                </div>
              </div>
              {/* Red underline */}
              <div className="mt-4 relative">
                <div className="h-1 bg-red-500 rounded-full" style={{ width: '80%', margin: '0 auto' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save WHY Statement Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={() => {
            saveStepData();
            toast({
              title: "WHY Statement Saved! 🎯",
              description: "Your personal, team, and community goals have been saved.",
            });
          }} size="lg" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4" />
            Save WHY Statement
          </Button>
        </div>
      </div>

      {/* HOW Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-xl font-bold">HOW</CardTitle>
            <p className="text-green-100 text-sm mt-1">Strategic Action Items</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              {/* Green sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"></div>
              
              <div className="space-y-4 ml-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <Input
                    value={howStatement.action1}
                    onChange={(e) => setHowStatement(prev => ({ ...prev, action1: e.target.value }))}
                    placeholder="e.g., Test new acquisition funnel"
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <Input
                    value={howStatement.action2}
                    onChange={(e) => setHowStatement(prev => ({ ...prev, action2: e.target.value }))}
                    placeholder="e.g., Find a new traffic agency"
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <Input
                    value={howStatement.action3}
                    onChange={(e) => setHowStatement(prev => ({ ...prev, action3: e.target.value }))}
                    placeholder="e.g., Hire and onboard an operations manager"
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <Input
                    value={howStatement.action4}
                    onChange={(e) => setHowStatement(prev => ({ ...prev, action4: e.target.value }))}
                    placeholder="e.g., Launch an employee training program"
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <Input
                    value={howStatement.action5}
                    onChange={(e) => setHowStatement(prev => ({ ...prev, action5: e.target.value }))}
                    placeholder="e.g., Upgrade tech stack"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Save HOW Statement Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={() => {
            saveStepData();
            toast({
              title: "HOW Statement Saved! ⚙️",
              description: "Your strategic action items have been saved.",
            });
          }} size="lg" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4" />
            Save Action Plan
          </Button>
        </div>
      </div>

      {/* Taking Action Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader className="bg-red-600 text-white text-center">
            <CardTitle className="text-xl font-bold">TAKING ACTION</CardTitle>
            <p className="text-red-100 text-sm mt-1">Current Active Initiatives</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="current-action-1" className="text-sm font-medium text-gray-700">Current Priority Action 1</Label>
              <Input
                id="current-action-1"
                value={takingActionItems.currentAction1}
                onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction1: e.target.value }))}
                placeholder="What are you actively working on right now?"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="current-action-2" className="text-sm font-medium text-gray-700">Current Priority Action 2</Label>
              <Input
                id="current-action-2"
                value={takingActionItems.currentAction2}
                onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction2: e.target.value }))}
                placeholder="What's your second priority this week?"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="current-action-3" className="text-sm font-medium text-gray-700">Current Priority Action 3</Label>
              <Input
                id="current-action-3"
                value={takingActionItems.currentAction3}
                onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction3: e.target.value }))}
                placeholder="What else are you focusing on this week?"
                className="mt-1"
              />
            </div>
            
            {/* Save Taking Action Button */}
            <div className="flex justify-center mt-6">
              <Button onClick={() => {
                saveStepData();
                toast({
                  title: "Taking Action Saved! 🎨",
                  description: "Your current action items have been saved.",
                });
              }} size="lg" className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4" />
                Save Current Actions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

   

      {/* Footer with Brand */}
      <div className="px-6 py-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">© The Scalable Company</p>
      </div>
    </div>
  );
};

export default ScalableImpactPlanner;