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
  Bell
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

const ScalableImpactPlanner: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userNumber, setUserNumber] = useState<string>('');
  const [currentTarget, setCurrentTarget] = useState<FinancialTarget>({
    revenue: '',
    profit: '',
    profitPercentage: '',
    value: '',
    valueMultiplier: ''
  });
  const [yearTarget, setYearTarget] = useState<FinancialTarget>({
    revenue: '',
    profit: '',
    profitPercentage: '',
    value: '',
    valueMultiplier: ''
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
      personalGoals: '',
      motivation: '',
      skillsDevelopment: '',
      personalWhy: ''
    },
    us: {
      teamVision: '',
      companyMission: '',
      culturalValues: '',
      collectiveWhy: ''
    },
    them: {
      customerImpact: '',
      marketProblem: '',
      socialContribution: '',
      externalWhy: ''
    }
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
  }, [currentStep, startingPoint, endingPoint, whyStatement, currentTarget, yearTarget, progressData, user?.id]);

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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">What is your number</h1>
          <p className="text-xl text-gray-600">The Scalable Impact Planner</p>
          <p className="max-w-3xl mx-auto text-gray-700">
            Entrepreneurs should define their 'number'—a financial or business goal that represents their success. 
            The Scalable Impact Planner helps align their goal with their vision and create a concrete plan to achieve it.
          </p>
        </div>
        
        {/* Step Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isCompleted = (
                (step === 1) ||
                (step === 2 && isStep2Valid()) ||
                (step === 3 && isStep2Valid() && isStep3Valid()) ||
                (step === 4 && isStep2Valid() && isStep3Valid() && isStep4Valid())
              );
              const stepTitles = {
                1: "Define Your Number",
                2: "Starting Point",
                3: "Ending Point", 
                4: "Codify Your Why"
              };
              
              return (
                <React.Fragment key={step}>
                  <div 
                    onClick={() => goToStep(step)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                      isActive ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 ${
                      isCompleted ? 'bg-green-500 border-green-500' :
                      isActive ? 'bg-blue-500 border-blue-500' :
                      'bg-gray-400 border-gray-400'
                    }`}>
                      {isCompleted && step !== currentStep ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {stepTitles[step as keyof typeof stepTitles]}
                    </span>
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        {/* Progress Assessment Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bell className="w-4 h-4" />
            <span>Current Level: <strong>Level {progressData?.currentLevel || 1}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>Last Assessment: {new Date(lastAssessmentTime).toLocaleDateString()}</span>
          </div>
          <Button 
            onClick={assessAllProgress} 
            disabled={isAssessing}
            size="sm"
            className="flex items-center gap-2"
          >
            {isAssessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Assess Progress
          </Button>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="space-y-8">
          {/* Financial Goals Section - Step 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WHAT Section - Current State */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-xl font-bold">WHAT</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-revenue">Revenue</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <Input
                    id="current-revenue"
                    value={currentTarget.revenue}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, revenue: e.target.value }))}
                    placeholder="Enter current revenue"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-profit">Profit</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <Input
                      id="current-profit"
                      value={currentTarget.profit}
                      onChange={(e) => setCurrentTarget(prev => ({ ...prev, profit: e.target.value }))}
                      placeholder="Profit amount"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="current-profit-percent">Profit %</Label>
                  <Input
                    id="current-profit-percent"
                    value={currentTarget.profitPercentage}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                    placeholder="Percentage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-value">Value</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <Input
                      id="current-value"
                      value={currentTarget.value}
                      onChange={(e) => setCurrentTarget(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="Business value"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="current-multiplier">x</Label>
                  <Input
                    id="current-multiplier"
                    value={currentTarget.valueMultiplier}
                    onChange={(e) => setCurrentTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                    placeholder="Multiplier"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TARGET Section - Future Goal */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-xl font-bold">5-10 YEAR TARGET</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="target-revenue">Revenue</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <Input
                    id="target-revenue"
                    value={yearTarget.revenue}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, revenue: e.target.value }))}
                    placeholder="Target revenue"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target-profit">Profit</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <Input
                      id="target-profit"
                      value={yearTarget.profit}
                      onChange={(e) => setYearTarget(prev => ({ ...prev, profit: e.target.value }))}
                      placeholder="Target profit"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="target-profit-percent">Profit %</Label>
                  <Input
                    id="target-profit-percent"
                    value={yearTarget.profitPercentage}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, profitPercentage: e.target.value }))}
                    placeholder="Percentage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target-value">Value</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <Input
                      id="target-value"
                      value={yearTarget.value}
                      onChange={(e) => setYearTarget(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="Target value"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="target-multiplier">x</Label>
                  <Input
                    id="target-multiplier"
                    value={yearTarget.valueMultiplier}
                    onChange={(e) => setYearTarget(prev => ({ ...prev, valueMultiplier: e.target.value }))}
                    placeholder="Multiplier"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Save Goals Button */}
      <div className="flex justify-center">
        <Button onClick={saveFinancialGoals} size="lg" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Financial Goals
        </Button>
      </div>
        </div>
      )}

      {/* Step 2: Starting Point */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-blue-600 text-white text-center">
              <CardTitle className="text-2xl">Step 2: Determine Your Starting Point</CardTitle>
              <p className="text-blue-100 mt-2">
                Assess your current revenue, profitability, and business valuation to establish your baseline.
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Financial Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Current Financial Metrics</h3>
                  
                  <div>
                    <Label htmlFor="current-revenue">Annual Revenue</Label>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <Input
                        id="current-revenue"
                        value={startingPoint.currentRevenue}
                        onChange={(e) => setStartingPoint(prev => ({ ...prev, currentRevenue: e.target.value }))}
                        placeholder="Enter annual revenue"
                        type="number"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="current-profit">Annual Profit</Label>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <Input
                        id="current-profit"
                        value={startingPoint.currentProfit}
                        onChange={(e) => setStartingPoint(prev => ({ ...prev, currentProfit: e.target.value }))}
                        placeholder="Enter annual profit"
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="current-profitability">Profitability %</Label>
                    <Input
                      id="current-profitability"
                      value={startingPoint.currentProfitability}
                      onChange={(e) => setStartingPoint(prev => ({ ...prev, currentProfitability: e.target.value }))}
                      placeholder="Profit margin percentage"
                      type="number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="current-valuation">Current Business Valuation</Label>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <Input
                        id="current-valuation"
                        value={startingPoint.currentValuation}
                        onChange={(e) => setStartingPoint(prev => ({ ...prev, currentValuation: e.target.value }))}
                        placeholder="Estimated business value"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Context */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Business Context</h3>
                  
                  <div>
                    <Label htmlFor="revenue-source">Primary Revenue Source</Label>
                    <Input
                      id="revenue-source"
                      value={startingPoint.revenueSource}
                      onChange={(e) => setStartingPoint(prev => ({ ...prev, revenueSource: e.target.value }))}
                      placeholder="e.g., Product sales, Services, SaaS"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business-stage">Business Stage</Label>
                    <select
                      id="business-stage"
                      value={startingPoint.businessStage}
                      onChange={(e) => setStartingPoint(prev => ({ ...prev, businessStage: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="idea">Idea Stage</option>
                      <option value="startup">Startup</option>
                      <option value="growth">Growth Stage</option>
                      <option value="expansion">Expansion</option>
                      <option value="maturity">Mature Business</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="assessment-date">Assessment Date</Label>
                    <Input
                      id="assessment-date"
                      type="date"
                      value={startingPoint.assessmentDate}
                      onChange={(e) => setStartingPoint(prev => ({ ...prev, assessmentDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Key Insights</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Revenue represents your annual earnings from all sources</li>
                  <li>• Profitability shows how much you retain after expenses</li>
                  <li>• Valuation estimates what your business could sell for today</li>
                  <li>• Be honest - this baseline determines your growth trajectory</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Ending Point */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-purple-600 text-white text-center">
              <CardTitle className="text-2xl">Step 3: Determine Your Ending Point</CardTitle>
              <p className="text-purple-100 mt-2">
                Define your three-year growth targets and choose your strategy: 'Double in Three' or 'Top to Bottom'.
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">3-Year Targets</h3>
                  
                  <div>
                    <Label htmlFor="target-revenue">Target Annual Revenue</Label>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <Input
                        id="target-revenue"
                        value={endingPoint.targetRevenue}
                        onChange={(e) => setEndingPoint(prev => ({ ...prev, targetRevenue: e.target.value }))}
                        placeholder="Revenue goal in 3 years"
                        type="number"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="target-profit">Target Annual Profit</Label>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <Input
                        id="target-profit"
                        value={endingPoint.targetProfit}
                        onChange={(e) => setEndingPoint(prev => ({ ...prev, targetProfit: e.target.value }))}
                        placeholder="Profit goal in 3 years"
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="target-valuation">Target Business Valuation</Label>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <Input
                        id="target-valuation"
                        value={endingPoint.targetValuation}
                        onChange={(e) => setEndingPoint(prev => ({ ...prev, targetValuation: e.target.value }))}
                        placeholder="Business value goal"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                {/* Growth Strategy */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Growth Strategy</h3>
                  
                  <div>
                    <Label>Timeframe</Label>
                    <select
                      value={endingPoint.timeframe}
                      onChange={(e) => setEndingPoint(prev => ({ ...prev, timeframe: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="3-year">3 Years</option>
                      <option value="5-year">5 Years</option>
                      <option value="10-year">10 Years</option>
                    </select>
                  </div>

                  <div>
                    <Label>Growth Approach</Label>
                    <select
                      value={endingPoint.growthStrategy}
                      onChange={(e) => setEndingPoint(prev => ({ ...prev, growthStrategy: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="double-in-three">Double in Three (~26% annual growth)</option>
                      <option value="top-to-bottom">Top to Bottom (Linear growth)</option>
                      <option value="custom">Custom Strategy</option>
                    </select>
                  </div>

                  {/* Growth Benchmarks */}
                  {endingPoint.benchmarks.year1Revenue && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">📊 Growth Benchmarks</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Year 1:</span>
                          <span className="font-medium">${parseInt(endingPoint.benchmarks.year1Revenue).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year 2:</span>
                          <span className="font-medium">${parseInt(endingPoint.benchmarks.year2Revenue).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year 3:</span>
                          <span className="font-medium">${parseInt(endingPoint.benchmarks.year3Revenue).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Strategy Explanations */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Strategy Guide</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• <strong>Double in Three:</strong> Aggressive 26% annual growth - requires significant investment</li>
                  <li>• <strong>Top to Bottom:</strong> Steady linear growth - more predictable and manageable</li>
                  <li>• <strong>Custom:</strong> Create your own growth trajectory based on market conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Codify Your Why */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="bg-green-600 text-white text-center">
              <CardTitle className="text-2xl">Step 4: Codify Your Why</CardTitle>
              <p className="text-green-100 mt-2">
                Connect your business goals to a deeper purpose—ME, US, THEM—to avoid burnout and stay inspired.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ME Section */}
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-green-600 text-white text-center">
                    <CardTitle className="text-xl font-bold">ME</CardTitle>
                    <p className="text-green-100 text-sm">Personal Purpose</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="personal-goals">Personal Goals</Label>
                      <Input
                        id="personal-goals"
                        value={whyStatement.me.personalGoals}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          me: { ...prev.me, personalGoals: e.target.value }
                        }))}
                        placeholder="What do you want to achieve personally?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="motivation">Core Motivation</Label>
                      <Input
                        id="motivation"
                        value={whyStatement.me.motivation}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          me: { ...prev.me, motivation: e.target.value }
                        }))}
                        placeholder="What drives you daily?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="skills-development">Skills Development</Label>
                      <Input
                        id="skills-development"
                        value={whyStatement.me.skillsDevelopment}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          me: { ...prev.me, skillsDevelopment: e.target.value }
                        }))}
                        placeholder="What skills do you want to master?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="personal-why">Your Personal Why</Label>
                      <textarea
                        id="personal-why"
                        value={whyStatement.me.personalWhy}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          me: { ...prev.me, personalWhy: e.target.value }
                        }))}
                        placeholder="Why is this business journey important to you?"
                        className="w-full p-2 border border-gray-300 rounded-md h-20 resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* US Section */}
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-green-600 text-white text-center">
                    <CardTitle className="text-xl font-bold">US</CardTitle>
                    <p className="text-green-100 text-sm">Team & Company Purpose</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="team-vision">Team Vision</Label>
                      <Input
                        id="team-vision"
                        value={whyStatement.us.teamVision}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          us: { ...prev.us, teamVision: e.target.value }
                        }))}
                        placeholder="What's your shared vision?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company-mission">Company Mission</Label>
                      <Input
                        id="company-mission"
                        value={whyStatement.us.companyMission}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          us: { ...prev.us, companyMission: e.target.value }
                        }))}
                        placeholder="What is your company's mission?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cultural-values">Cultural Values</Label>
                      <Input
                        id="cultural-values"
                        value={whyStatement.us.culturalValues}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          us: { ...prev.us, culturalValues: e.target.value }
                        }))}
                        placeholder="What values define your culture?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="collective-why">Collective Why</Label>
                      <textarea
                        id="collective-why"
                        value={whyStatement.us.collectiveWhy}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          us: { ...prev.us, collectiveWhy: e.target.value }
                        }))}
                        placeholder="Why does this matter to your team?"
                        className="w-full p-2 border border-gray-300 rounded-md h-20 resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* THEM Section */}
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-green-600 text-white text-center">
                    <CardTitle className="text-xl font-bold">THEM</CardTitle>
                    <p className="text-green-100 text-sm">Customer & Market Purpose</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="customer-impact">Customer Impact</Label>
                      <Input
                        id="customer-impact"
                        value={whyStatement.them.customerImpact}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          them: { ...prev.them, customerImpact: e.target.value }
                        }))}
                        placeholder="How do you improve customers' lives?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="market-problem">Market Problem</Label>
                      <Input
                        id="market-problem"
                        value={whyStatement.them.marketProblem}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          them: { ...prev.them, marketProblem: e.target.value }
                        }))}
                        placeholder="What problem are you solving?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="social-contribution">Social Contribution</Label>
                      <Input
                        id="social-contribution"
                        value={whyStatement.them.socialContribution}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          them: { ...prev.them, socialContribution: e.target.value }
                        }))}
                        placeholder="How do you contribute to society?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="external-why">External Why</Label>
                      <textarea
                        id="external-why"
                        value={whyStatement.them.externalWhy}
                        onChange={(e) => setWhyStatement(prev => ({
                          ...prev,
                          them: { ...prev.them, externalWhy: e.target.value }
                        }))}
                        placeholder="Why does the world need your business?"
                        className="w-full p-2 border border-gray-300 rounded-md h-20 resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Statement Summary */}
              {(whyStatement.me.personalWhy || whyStatement.us.collectiveWhy || whyStatement.them.externalWhy) && (
                <div className="mt-8 bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">🎯 Your Complete Why Statement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {whyStatement.me.personalWhy && (
                      <div>
                        <h4 className="font-medium text-green-700">Personal Why:</h4>
                        <p className="text-sm text-green-600 italic">"{whyStatement.me.personalWhy}"</p>
                      </div>
                    )}
                    {whyStatement.us.collectiveWhy && (
                      <div>
                        <h4 className="font-medium text-green-700">Team Why:</h4>
                        <p className="text-sm text-green-600 italic">"{whyStatement.us.collectiveWhy}"</p>
                      </div>
                    )}
                    {whyStatement.them.externalWhy && (
                      <div>
                        <h4 className="font-medium text-green-700">World Why:</h4>
                        <p className="text-sm text-green-600 italic">"{whyStatement.them.externalWhy}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step Navigation Buttons */}
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Button 
          onClick={prevStep} 
          disabled={currentStep === 1}
          variant="outline"
          className="flex items-center gap-2"
        >
          ← Previous Step
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
        </div>
        
        <Button 
          onClick={nextStep} 
          disabled={currentStep === 4}
          className="flex items-center gap-2"
        >
          Next Step →
        </Button>
      </div>

      <Separator />

      {/* Scale Levels Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your Scalable Impact Journey</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Entrepreneurs must confirm their current level of scale without skipping steps. Even if some advanced tasks are done, 
            all prior levels must be completed first. The Scalable Impact Planner provides clarity on progress.
          </p>
        </div>

        {/* Show loading or progress data */}
        {!progressData ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="text-gray-600">Loading your progress data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Indicator */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {progressData?.levels?.map((level, index) => {
            const config = getScaleLevelConfig(level.levelId);
            const isLocked = level.levelId > (progressData?.currentLevel || 1);
            return (
              <React.Fragment key={level.levelId}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  level.completed ? 'bg-green-500' : 
                  isLocked ? 'bg-gray-400' : 
                  config?.color || 'bg-gray-500'
                }`}>
                  {level.completed ? <CheckCircle2 className="w-6 h-6" /> : level.levelId}
                </div>
                {index < (progressData?.levels?.length || 7) - 1 && (
                  <div className={`w-8 h-1 ${
                    level.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Scale Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {progressData?.levels?.map((level) => {
            const config = getScaleLevelConfig(level.levelId);
            const Icon = config?.icon || Target;
            const isLocked = level.levelId > (progressData?.currentLevel || 1);
            const canAccess = canProgressToLevel(level.levelId);
            
            return (
              <Card key={level.levelId} className={`relative transition-all duration-300 ${
                level.completed ? 'border-green-500 bg-green-50' :
                isLocked ? 'border-gray-300 bg-gray-50 opacity-60' :
                'border-blue-300 bg-blue-50 hover:shadow-lg'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      config?.color || 'bg-gray-500'
                    }`}>
                      {level.completed ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <Badge variant={level.completed ? "default" : isLocked ? "secondary" : "outline"}>
                      Level {level.levelId}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{config?.title || level.title}</CardTitle>
                  <p className="text-sm text-gray-600">{config?.description}</p>
                  
                  {/* Progress Bar */}
                  {level.overallProgress > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{level.overallProgress.toFixed(1)}%</span>
                      </div>
                      <Progress value={level.overallProgress} className="h-2" />
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Benchmarks List */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">Benchmarks:</h4>
                    {level.benchmarks?.map((benchmark, index) => (
                      <div key={benchmark.id} className="flex items-start space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          benchmark.isCompleted ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <span className="text-gray-600">{benchmark.description}</span>
                          {benchmark.targetValue > 1 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {benchmark.currentValue.toLocaleString()} / {benchmark.targetValue.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level.levelId}`}
                        checked={level.completed}
                        disabled={true}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <Label 
                        htmlFor={`level-${level.levelId}`} 
                        className={`text-sm ${level.completed ? 'text-green-700 font-medium' : 'text-gray-600'}`}
                      >
                        {level.completed ? 'Completed' : 'In Progress'}
                      </Label>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={level.completed ? "outline" : isLocked ? "secondary" : "default"}
                      onClick={() => checkLevelProgress(level.levelId)}
                      disabled={isLocked}
                      className="w-full"
                    >
                      {level.completed ? 'View Details' : isLocked ? 'Locked' : 'Check Progress'}
                    </Button>
                  </div>
                </CardContent>

                {/* Level Status Indicator */}
                {isLocked && (
                  <div className="absolute top-2 right-2">
                    <AlertTriangle className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                {level.completed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                )}
                
                {/* Completion Date */}
                {level.completed && level.completionDate && (
                  <div className="absolute bottom-2 right-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Completed {new Date(level.completionDate).toLocaleDateString()}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
          </>
        )}
      </div>

      {/* Bottom Section - ME, US, THEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* ME Section */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-600 text-white text-center">
            <CardTitle className="text-xl font-bold">ME</CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[200px]">
            <p className="text-gray-600 text-center italic">
              Personal goals, skills development, and individual contribution to the business growth.
            </p>
          </CardContent>
        </Card>

        {/* US Section */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-600 text-white text-center">
            <CardTitle className="text-xl font-bold">US</CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[200px]">
            <p className="text-gray-600 text-center italic">
              Team collaboration, shared objectives, and collective efforts toward business success.
            </p>
          </CardContent>
        </Card>

        {/* THEM Section */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-600 text-white text-center">
            <CardTitle className="text-xl font-bold">THEM</CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[200px]">
            <p className="text-gray-600 text-center italic">
              Customer needs, market demands, and external stakeholder expectations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call-to-Action Section */}
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Scale Your Impact?</h3>
          <p className="mb-6 text-green-100">
            Start with Level 1 and work your way up systematically. Each level builds on the previous one.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">
            Begin Your Journey
          </Button>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important:</strong> The system will automatically track your progress across all dashboard activities. 
          Checkboxes will be marked automatically when you complete the required benchmarks from your other dashboard tools.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ScalableImpactPlanner;