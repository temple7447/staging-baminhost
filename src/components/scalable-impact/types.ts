export interface FinancialTarget {
  revenue: string;
  profit: string;
  profitPercentage: string;
  value: string;
  valueMultiplier: string;
}

export interface StartingPoint {
  currentRevenue: string;
  currentProfit: string;
  currentProfitability: string;
  currentValuation: string;
  assessmentDate: string;
  revenueSource: string;
  businessStage: string;
}

export interface EndingPoint {
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

export interface WhyStatement {
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

export interface HowStatement {
  action1: string;
  action2: string;
  action3: string;
  action4: string;
  action5: string;
}

export interface TakingActionItems {
  currentAction1: string;
  currentAction2: string;
  currentAction3: string;
}