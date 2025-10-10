import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  
  // Growth benchmark state
  const [selectedGrowthType, setSelectedGrowthType] = useState<string>('');
  const [businessStage, setBusinessStage] = useState<any>('owner-dependent');

  // SDE Multiple Table (based on Seller's Discretionary Earnings)
  const SDE_MULTIPLES = {
    50000: { min: 1.0, max: 1.25, avg: 1.125 }, // $0-$50K SDE
    75000: { min: 1.1, max: 1.6, avg: 1.35 },  // $50K-$75K SDE
    100000: { min: 2.0, max: 2.7, avg: 2.35 }, // $75K-$100K SDE
    200000: { min: 2.5, max: 3.0, avg: 2.75 }, // $100K-$200K SDE
    500000: { min: 3.3, max: 4.0, avg: 3.65 }, // $200K-$500K SDE
    1000000: { min: 3.25, max: 4.25, avg: 3.75 } // $500K-$1M SDE
  };

  // EBITDA Multiple Table (for professionalized businesses)
  const EBITDA_MULTIPLES = {
    999000: { avg: 3.9 },    // $0K-$999K EBITDA
    4990000: { avg: 5.5 },   // $1M-$4.99M EBITDA
    9990000: { avg: 6.1 },   // $5M-$9.99M EBITDA
    24990000: { avg: 7.0 },  // $10M-$24.99M EBITDA
    49990000: { avg: 8.1 },  // $25M-$49.99M EBITDA
    Infinity: { avg: 9.2 }   // $50M+ EBITDA
  };

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
    
    // Load growth selection
    const savedGrowth = loadFromLocalStorage('scalable_impact_growth_type');
    if (savedGrowth) setSelectedGrowthType(savedGrowth);
    
    // Load business stage
    const savedStage = loadFromLocalStorage('scalable_impact_business_stage');
    if (savedStage) setBusinessStage(savedStage);
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
    saveToLocalStorage('scalable_impact_growth_type', selectedGrowthType);
    saveToLocalStorage('scalable_impact_business_stage', businessStage);
    if (progressData) {
      saveToLocalStorage('scalable_impact_progress', progressData);
    }
  };

  // Auto-save whenever data changes
  useEffect(() => {
    if (user?.id) {
      saveStepData();
    }
  }, [currentStep, startingPoint, endingPoint, whyStatement, howStatement, takingActionItems, currentTarget, yearTarget, selectedGrowthType, businessStage, progressData, user?.id]);

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

  // Calculate appropriate multiple based on earnings and business stage
  const getValuationMultiple = (earnings: number, stage: 'owner-dependent' | 'professionalized' = businessStage) => {
    const earningsUSD = earnings; // Assuming input is already in USD equivalent
    
    if (stage === 'owner-dependent') {
      // Use SDE multiples
      const thresholds = Object.keys(SDE_MULTIPLES).map(Number).sort((a, b) => a - b);
      for (const threshold of thresholds) {
        if (earningsUSD <= threshold) {
          return {
            multiple: SDE_MULTIPLES[threshold as keyof typeof SDE_MULTIPLES].avg,
            type: 'SDE',
            range: `${SDE_MULTIPLES[threshold as keyof typeof SDE_MULTIPLES].min}x - ${SDE_MULTIPLES[threshold as keyof typeof SDE_MULTIPLES].max}x`
          };
        }
      }
      return { multiple: 3.75, type: 'SDE', range: '3.25x - 4.25x' }; // Default to highest SDE
    } else {
      // Use EBITDA multiples (3.3-7.5x higher than SDE)
      const thresholds = Object.keys(EBITDA_MULTIPLES).map(Number).sort((a, b) => a - b);
      for (const threshold of thresholds) {
        if (earningsUSD <= threshold) {
          return {
            multiple: EBITDA_MULTIPLES[threshold as keyof typeof EBITDA_MULTIPLES].avg,
            type: 'EBITDA',
            range: `~${EBITDA_MULTIPLES[threshold as keyof typeof EBITDA_MULTIPLES].avg}x avg`
          };
        }
      }
      return { multiple: 9.2, type: 'EBITDA', range: '~9.2x avg' }; // Default to highest EBITDA
    }
  };

  // Determine business stage based on revenue and profit characteristics
  const determineBusinessStage = (revenue: number, profit: number): 'owner-dependent' | 'professionalized' => {
    // If profit > $250K and revenue > $1M, likely professionalized
    // Also factor in profit margins - higher margins with scale suggest systems
    const profitMargin = profit / revenue;
    
    if (profit > 250000 && revenue > 1000000 && profitMargin > 0.15) {
      return 'professionalized';
    }
    return 'owner-dependent';
  };

  // Calculate business value using proper multiples
  const calculateBusinessValue = (profit: number, stage?: 'owner-dependent' | 'professionalized') => {
    const valuationData = getValuationMultiple(profit, stage);
    return {
      value: Math.round(profit * valuationData.multiple),
      multiple: valuationData.multiple,
      type: valuationData.type,
      range: valuationData.range
    };
  };

  // Get scale level configuration based on the 7 Levels of Scale framework
  const getScaleLevelConfig = (levelId: number) => {
    const configs = {
      1: {
        title: "Sell & Serve 10 Customers",
        description: "Focus on proving product-market fit by making and fulfilling 10 sales before any scaling—essential for traction.",
        color: "bg-pink-500",
        icon: Target,
        transcriptExplanation: "This is your foundation. Before you think about scaling, you need to prove that people actually want what you're selling. Get 10 real customers paying real money."
      },
      2: {
        title: "Build a Growth Flywheel",
        description: "Shift from one-off sales to predictable growth via a 'growth flywheel' (leads → customers → revenue loop).",
        color: "bg-yellow-500",
        icon: TrendingUp,
        transcriptExplanation: "Stop relying on random sales. Build a systematic process: consistent lead generation → convert leads to customers → happy customers generate more leads. This creates momentum."
      },
      3: {
        title: "Upgrade Your Business OS",
        description: "Address operational chaos from growth; upgrade your 'business operating system' (processes, tools) to handle scale. Crossing the 'Scalable Line' here means your business has the capacity for true scalability.",
        color: "bg-orange-500",
        icon: Building,
        transcriptExplanation: "This is the make-or-break level. Growth creates chaos. You need systems, processes, and tools that work without you. Cross the 'Scalable Line' - where your business can grow without breaking."
      },
      4: {
        title: "Double Your Take-Home",
        description: "Prioritize cash flow by making your business a 'cash-generating machine'—pay yourself more consistently to avoid burnout and fuel sustainability.",
        color: "bg-green-500",
        icon: Crown,
        transcriptExplanation: "Now that you have systems, focus on profitability. Your business should pay YOU well. If you're not making good money, you'll burn out. Make it a cash-generating machine."
      },
      5: {
        title: "Build Your Board",
        description: "Assemble an advisory board of mentors/peers for guidance on non-playbook challenges; essential after core systems are solid.",
        color: "bg-blue-500",
        icon: Users,
        transcriptExplanation: "You've built a profitable, systematic business. Now you need wisdom for the bigger challenges ahead. Surround yourself with people who've been where you're going."
      },
      6: {
        title: "Expand with Acquisitions",
        description: "Break organic growth ceilings via acquisitions (talent, assets, or full businesses)—the fastest way to accelerate beyond limits.",
        color: "bg-purple-500",
        icon: Target,
        transcriptExplanation: "Organic growth has limits. To break through growth ceilings, you need to acquire - talent, assets, or entire businesses. This is how you accelerate beyond natural limits."
      },
      7: {
        title: "Hit Your Number (and live the 'Level 7 Life')",
        description: "Achieve your personal 'number' (e.g., revenue goal), gaining 'optionality'—choose to reset goals, exit, or enjoy freedom without external threats.",
        color: "bg-gray-500",
        icon: Zap,
        transcriptExplanation: "You've hit your number - the revenue, profit, or valuation goal you set out to achieve. Now you have optionality: keep growing, sell the business, or just enjoy the freedom you've created."
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

  // Calculate targets based on selected growth benchmark
  const calculateTargetsFromGrowth = (growthType: string, currentRev: number, currentProfit: number, currentValue: number) => {
    let revenueMultiplier: number;
    let profitMultiplier: number;
    let profitMarginIncrease: number;
    
    switch (growthType) {
      case 'hypergrowth':
        // 3X, 3X, 2X, 2X = ~36X over 4 years, ~9X over 3 years
        revenueMultiplier = 9;
        profitMultiplier = 12; // Higher profit growth for hypergrowth
        profitMarginIncrease = 8;
        break;
      case 'rapid':
        // 2X, 2X, 75%, 50% = ~10.5X over 4 years, ~5.25X over 3 years
        revenueMultiplier = 5;
        profitMultiplier = 6;
        profitMarginIncrease = 5;
        break;
      case 'steady':
        // 25-50% YoY = ~2.4X over 3 years (37.5% average)
        revenueMultiplier = 2.4;
        profitMultiplier = 2.8;
        profitMarginIncrease = 3;
        break;
      case 'mature':
        // 10-20% YoY = ~1.73X over 3 years (15% average)
        revenueMultiplier = 1.7;
        profitMultiplier = 1.9;
        profitMarginIncrease = 2;
        break;
      case 'double-3-years':
        // 26% YoY = 2X in 3 years
        revenueMultiplier = 2.0;
        profitMultiplier = 2.2;
        profitMarginIncrease = 3;
        break;
      case 'double-2-years':
      case 'double-2-years-mom':
        // 40% YoY or 3% MoM = 2X in 2 years, extrapolated to 3 years = ~2.8X
        revenueMultiplier = 2.8;
        profitMultiplier = 3.2;
        profitMarginIncrease = 4;
        break;
      default:
        return;
    }
    
    const targetRevenue = Math.round(currentRev * revenueMultiplier);
    const targetProfit = Math.round(currentProfit * profitMultiplier);
    const currentProfitPercentage = parseFloat(currentTarget.profitPercentage) || 15;
    const targetProfitPercentage = Math.min(currentProfitPercentage + profitMarginIncrease, 30);
    
    // Determine current and target business stages
    const currentStage = determineBusinessStage(currentRev, currentProfit);
    const targetStage = determineBusinessStage(targetRevenue, targetProfit);
    
    // Calculate values using appropriate multiples
    const currentValuation = calculateBusinessValue(currentProfit, currentStage);
    const targetValuation = calculateBusinessValue(targetProfit, targetStage);
    
    // Calculate value multiplier for display
    const newValueMultiplier = targetValuation.multiple;
    
    return {
      revenue: targetRevenue.toLocaleString(),
      profit: targetProfit.toLocaleString(),
      profitPercentage: targetProfitPercentage.toString(),
      value: targetValuation.value.toLocaleString(),
      valueMultiplier: newValueMultiplier.toFixed(1),
      // Additional data for insights
      valuationInsight: {
        currentStage,
        targetStage,
        currentMultiple: currentValuation.multiple,
        targetMultiple: targetValuation.multiple,
        currentType: currentValuation.type,
        targetType: targetValuation.type,
        multipleExpansion: targetValuation.multiple / currentValuation.multiple
      }
    };
  };
  
  // Handle growth selection from GrowthBenchmarks component
  const handleGrowthSelect = (growthType: string, value: string) => {
    setSelectedGrowthType(growthType);
    
    const currentRev = parseFloat(currentTarget.revenue.replace(/,/g, '')) || 0;
    const currentProfit = parseFloat(currentTarget.profit.replace(/,/g, '')) || 0;
    const currentValue = parseFloat(currentTarget.value.replace(/,/g, '')) || 0;
    
    if (currentRev === 0) {
      toast({
        title: "Enter Current Values First",
        description: "Please enter your current revenue and values to calculate targets.",
        variant: "destructive"
      });
      return;
    }
    
    const newTargets = calculateTargetsFromGrowth(growthType, currentRev, currentProfit, currentValue);
    if (newTargets) {
      // Update financial targets
      setYearTarget({
        revenue: newTargets.revenue,
        profit: newTargets.profit,
        profitPercentage: newTargets.profitPercentage,
        value: newTargets.value,
        valueMultiplier: newTargets.valueMultiplier
      });
      
      const growthNames = {
        hypergrowth: 'Hypergrowth (3X, 3X, 2X, 2X)',
        rapid: 'Rapid Growth (2X, 2X, 75%, 50%)',
        steady: 'Steady Growth (25-50% YoY)',
        mature: 'Mature Growth (10-20% YoY)',
        'double-3-years': 'Double in 3 Years (26% YoY)',
        'double-2-years': 'Double in 2 Years (40% YoY)',
        'double-2-years-mom': 'Double in 2 Years (3% MoM)'
      };
      
      // Enhanced toast with valuation insights
      if (newTargets.valuationInsight) {
        const insight = newTargets.valuationInsight;
        const stageTransition = insight.currentStage !== insight.targetStage 
          ? ` | Stage: ${insight.currentStage} → ${insight.targetStage}` 
          : '';
        
        toast({
          title: "3-Year Targets Updated! 🚀",
          description: `${growthNames[growthType as keyof typeof growthNames]} | Multiple: ${insight.currentMultiple.toFixed(1)}x (${insight.currentType}) → ${insight.targetMultiple.toFixed(1)}x (${insight.targetType})${stageTransition}`,
        });
      } else {
        toast({
          title: "3-Year Targets Updated! 🚀",
          description: `Targets calculated based on ${growthNames[growthType as keyof typeof growthNames]} benchmark.`,
        });
      }
    }
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
    const targetProfitPercentage = Math.min(parseFloat(currentTarget.profitPercentage) + 5, 25); // Improve margins by 5%
    
    // Determine current and target business stages
    const currentStage = determineBusinessStage(currentRev, currentProfit);
    const targetStage = determineBusinessStage(targetRevenue, targetProfit);
    
    // Calculate values using appropriate multiples
    const targetValuation = calculateBusinessValue(targetProfit, targetStage);

    setYearTarget({
      revenue: targetRevenue.toLocaleString(),
      profit: targetProfit.toLocaleString(),
      profitPercentage: targetProfitPercentage.toString(),
      value: targetValuation.value.toLocaleString(),
      valueMultiplier: targetValuation.multiple.toFixed(1)
    });

    toast({
      title: "Smart Targets Generated! 🎢",
      description: `40% annual growth targets using ${targetValuation.type} multiples (${targetValuation.multiple.toFixed(1)}x)`,
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
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Progress Bar */}
      <ProgressBar />
      
      {/* Growth Strategy Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Select Your Growth Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="growth-select" className="text-base font-medium">
              How much do you plan to grow over the next 3 years?
            </Label>
            <Select 
              value={selectedGrowthType} 
              onValueChange={(value) => handleGrowthSelect(value, value)}
            >
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose your growth benchmark" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hypergrowth">
                  <div className="flex flex-col">
                    <span className="font-semibold">Hypergrowth: 3X, 3X, 2X, 2X</span>
                    <span className="text-sm text-gray-500">(VC-Funded...₦100M in 7 years)</span>
                  </div>
                </SelectItem>
                <SelectItem value="rapid">
                  <div className="flex flex-col">
                    <span className="font-semibold">Rapid Growth: 2X, 2X, 75%, 50%</span>
                    <span className="text-sm text-gray-500">(Early-Stage Growth)</span>
                  </div>
                </SelectItem>
                <SelectItem value="steady">
                  <div className="flex flex-col">
                    <span className="font-semibold">Steady Growth: 25 - 50% YoY</span>
                  </div>
                </SelectItem>
                <SelectItem value="mature">
                  <div className="flex flex-col">
                    <span className="font-semibold">Mature Growth: 10 - 20% YoY</span>
                  </div>
                </SelectItem>
                <SelectItem value="double-3-years">
                  <div className="flex flex-col">
                    <span className="font-semibold">Double in 3 Years: 26% YoY</span>
                    <span className="text-sm text-gray-500">Can you really DOUBLE in 3 years?</span>
                  </div>
                </SelectItem>
                <SelectItem value="double-2-years">
                  <div className="flex flex-col">
                    <span className="font-semibold">Double in 2 Years: 40% YoY</span>
                    <span className="text-sm text-gray-500">Aggressive 2X growth target</span>
                  </div>
                </SelectItem>
                <SelectItem value="double-2-years-mom">
                  <div className="flex flex-col">
                    <span className="font-semibold">Double in 2 Years: 3% MoM</span>
                    <span className="text-sm text-gray-500">Month-over-month compounding</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {/* Business Stage Selector */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Business Stage (affects valuation multiples):</Label>
              <Select value={businessStage} onValueChange={setBusinessStage}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner-dependent">
                    <div className="flex flex-col">
                      <span className="font-semibold">Owner-Dependent Business</span>
                      <span className="text-sm text-gray-500">Uses SDE multiples (1.0x - 4.25x)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="professionalized">
                    <div className="flex flex-col">
                      <span className="font-semibold">Professionalized Business</span>
                      <span className="text-sm text-gray-500">Uses EBITDA multiples (3.9x - 9.2x+)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedGrowthType && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-2">
                  <span className="font-medium">Growth Strategy:</span> {{
                    hypergrowth: 'Hypergrowth (3X, 3X, 2X, 2X) - VC-Funded trajectory',
                    rapid: 'Rapid Growth (2X, 2X, 75%, 50%) - Early-stage growth',
                    steady: 'Steady Growth (25-50% YoY) - Sustainable expansion',
                    mature: 'Mature Growth (10-20% YoY) - Established business growth',
                    'double-3-years': 'Double in 3 Years (26% YoY) - Can you really DOUBLE?',
                    'double-2-years': 'Double in 2 Years (40% YoY) - Aggressive 2X target',
                    'double-2-years-mom': 'Double in 2 Years (3% MoM) - Month-over-month compounding'
                  }[selectedGrowthType]}
                </p>
                <p className="text-sm text-blue-600">
                  <span className="font-medium">Valuation Method:</span> {businessStage === 'owner-dependent' ? 'SDE (Seller\'s Discretionary Earnings)' : 'EBITDA (Earnings Before Interest, Taxes, Depreciation & Amortization)'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
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