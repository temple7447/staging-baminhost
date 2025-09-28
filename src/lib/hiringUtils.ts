import { 
  TimeEntry, 
  TaskItem, 
  DelegationItem, 
  HourlyRateConfig, 
  ProductivityAnalysis,
  HiringTrigger,
  PowerWord 
} from '@/types/hiring';

// Time Tracking Utilities
export const calculateDuration = (startTime: Date, endTime: Date): number => {
  return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const calculateTimeValue = (duration: number, hourlyRate: number): number => {
  return (duration / 60) * hourlyRate;
};

// Hourly Rate Calculations
export const calculateHourlyRate = (weeklyIncome: number, workHoursPerWeek: number): number => {
  if (workHoursPerWeek === 0) return 0;
  return Math.round((weeklyIncome / workHoursPerWeek) * 100) / 100;
};

export const updateHourlyRateConfig = (
  weeklyIncome: number, 
  workHoursPerWeek: number
): HourlyRateConfig => {
  return {
    weeklyIncome,
    workHoursPerWeek,
    calculatedRate: calculateHourlyRate(weeklyIncome, workHoursPerWeek),
    lastUpdated: new Date()
  };
};

// Productivity Analysis
export const analyzeProductivity = (
  timeEntries: TimeEntry[],
  hourlyRate: number
): ProductivityAnalysis => {
  const totalMinutes = timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  const big5Minutes = timeEntries
    .filter(entry => entry.category === 'big5')
    .reduce((sum, entry) => sum + (entry.duration || 0), 0);
  const belowTheLineMinutes = timeEntries
    .filter(entry => entry.category === 'below-the-line')
    .reduce((sum, entry) => sum + (entry.duration || 0), 0);

  const totalHours = totalMinutes / 60;
  const big5Hours = big5Minutes / 60;
  const belowTheLineHours = belowTheLineMinutes / 60;
  const big5Percentage = totalHours > 0 ? (big5Hours / totalHours) * 100 : 0;
  const potentialSavings = belowTheLineHours * hourlyRate;

  let recommendedAction: ProductivityAnalysis['recommendedAction'] = 'continue-monitoring';
  
  if (big5Percentage < 30) {
    recommendedAction = 'hire-immediately';
  } else if (big5Percentage < 50) {
    recommendedAction = 'hire-soon';
  } else if (big5Percentage < 70) {
    recommendedAction = 'optimize-first';
  }

  return {
    totalHours,
    big5Hours,
    belowTheLineHours,
    big5Percentage,
    delegationCandidateHours: belowTheLineHours,
    potentialSavings,
    recommendedAction
  };
};

// Task Management Utilities
export const createTask = (
  title: string, 
  category: 'big5' | 'below-the-line', 
  description?: string
): TaskItem => {
  return {
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title,
    description,
    category,
    isCompleted: false,
    isDelegated: false,
    priority: 'medium',
    createdAt: new Date()
  };
};

export const createDelegationItem = (
  task: string,
  estimatedCost: number,
  urgency: DelegationItem['urgency'] = 'within-week',
  requiredSkills: string[] = []
): DelegationItem => {
  return {
    id: `delegation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    task,
    estimatedCost,
    urgency,
    requiredSkills,
    isDelegated: false,
    createdAt: new Date()
  };
};

// Hiring Trigger Utilities
export const evaluateHiringTriggers = (
  triggers: HiringTrigger[],
  productivityData: ProductivityAnalysis
): HiringTrigger[] => {
  return triggers.map(trigger => {
    let currentValue = 0;
    let isTriggered = false;

    switch (trigger.name) {
      case 'Below the Line Hours':
        currentValue = productivityData.belowTheLineHours;
        isTriggered = currentValue >= trigger.threshold;
        break;
      case 'Big 5 Percentage':
        currentValue = productivityData.big5Percentage;
        isTriggered = currentValue <= trigger.threshold;
        break;
      case 'Potential Savings':
        currentValue = productivityData.potentialSavings;
        isTriggered = currentValue >= trigger.threshold;
        break;
      default:
        currentValue = trigger.currentValue;
        isTriggered = trigger.isTriggered;
    }

    return {
      ...trigger,
      currentValue,
      isTriggered
    };
  });
};

// Job Description Utilities
export const generateJobDescriptionFromTasks = (
  delegationItems: DelegationItem[],
  roleTitle: string,
  department: string
) => {
  const responsibilities = delegationItems.map(item => item.task);
  const requiredSkills = Array.from(new Set(
    delegationItems.flatMap(item => item.requiredSkills)
  ));

  return {
    title: roleTitle,
    department,
    responsibilities,
    requiredSkills,
    estimatedWorkload: delegationItems.length,
    urgencyLevel: delegationItems.some(item => item.urgency === 'immediate') ? 'high' : 'medium'
  };
};

// Power Words Database
export const getPowerWordsByCategory = (category: PowerWord['category']): PowerWord[] => {
  const powerWordsDatabase: PowerWord[] = [
    {
      id: '1',
      word: 'Spearheaded',
      category: 'leadership',
      context: 'Leading initiatives and projects',
      examples: ['Spearheaded digital transformation initiative', 'Spearheaded team restructuring']
    },
    {
      id: '2',
      word: 'Optimized',
      category: 'achievement',
      context: 'Improving processes and efficiency',
      examples: ['Optimized workflow processes', 'Optimized resource allocation']
    },
    {
      id: '3',
      word: 'Collaborated',
      category: 'soft-skill',
      context: 'Working with teams and stakeholders',
      examples: ['Collaborated with cross-functional teams', 'Collaborated on strategic planning']
    },
    {
      id: '4',
      word: 'Implemented',
      category: 'action',
      context: 'Executing plans and solutions',
      examples: ['Implemented new CRM system', 'Implemented cost-reduction strategies']
    },
    {
      id: '5',
      word: 'Architected',
      category: 'technical',
      context: 'Designing technical solutions',
      examples: ['Architected scalable cloud infrastructure', 'Architected data pipeline']
    }
  ];

  return powerWordsDatabase.filter(word => word.category === category);
};

export const searchPowerWords = (query: string): PowerWord[] => {
  const powerWordsDatabase: PowerWord[] = getPowerWordsByCategory('action')
    .concat(getPowerWordsByCategory('achievement'))
    .concat(getPowerWordsByCategory('leadership'))
    .concat(getPowerWordsByCategory('technical'))
    .concat(getPowerWordsByCategory('soft-skill'));

  return powerWordsDatabase.filter(word =>
    word.word.toLowerCase().includes(query.toLowerCase()) ||
    word.context.toLowerCase().includes(query.toLowerCase())
  );
};

// Cost Benefit Analysis
export const calculateHiringROI = (
  belowTheLineHours: number,
  hourlyRate: number,
  proposedSalary: number,
  timeRecoveryPercentage: number = 80
): {
  monthlyCost: number;
  monthlyBenefit: number;
  monthlyROI: number;
  breakEvenMonths: number;
} => {
  const monthlyHours = belowTheLineHours * 4.33; // average weeks per month
  const monthlyBenefit = monthlyHours * hourlyRate * (timeRecoveryPercentage / 100);
  const monthlyCost = proposedSalary / 12;
  const monthlyROI = ((monthlyBenefit - monthlyCost) / monthlyCost) * 100;
  const breakEvenMonths = monthlyBenefit > 0 ? monthlyCost / monthlyBenefit : Infinity;

  return {
    monthlyCost,
    monthlyBenefit,
    monthlyROI,
    breakEvenMonths
  };
};

// Local Storage Utilities
export const STORAGE_KEYS = {
  TIME_ENTRIES: 'hiring_time_entries_v1',
  TASKS: 'hiring_tasks_v1',
  DELEGATION_ITEMS: 'hiring_delegation_items_v1',
  HOURLY_RATE_CONFIG: 'hiring_hourly_rate_config_v1',
  ORG_CHART: 'hiring_org_chart_v1',
  JOB_DESCRIPTIONS: 'hiring_job_descriptions_v1',
  CANDIDATES: 'hiring_candidates_v1',
  HALO_RESEARCH: 'hiring_halo_research_v1'
} as const;

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save to localStorage: ${key}`, error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed;
    }
  } catch (error) {
    console.warn(`Failed to load from localStorage: ${key}`, error);
  }
  return defaultValue;
};

// Date and Time Utilities
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getWeekRange = (date: Date = new Date()): { start: Date; end: Date } => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};