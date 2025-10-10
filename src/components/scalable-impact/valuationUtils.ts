// Business valuation utility functions based on SDE and EBITDA multiples

// SDE Multiple Table (based on Seller's Discretionary Earnings)
// For owner-dependent businesses
export const SDE_MULTIPLES = {
  50000: { min: 1.0, max: 1.25, avg: 1.125 }, // $0-$50K SDE
  75000: { min: 1.1, max: 1.6, avg: 1.35 },  // $50K-$75K SDE
  100000: { min: 2.0, max: 2.7, avg: 2.35 }, // $75K-$100K SDE
  200000: { min: 2.5, max: 3.0, avg: 2.75 }, // $100K-$200K SDE
  500000: { min: 3.0, max: 4.0, avg: 3.5 }, // $200K-$500K SDE
  1000000: { min: 3.25, max: 4.25, avg: 3.75 } // $500K-$1M SDE
};

// EBITDA Multiple Table (for professionalized businesses)
// EBITDA = 3.3-7.5x higher than SDE because the company is professionalized
export const EBITDA_MULTIPLES = {
  999000: { avg: 4.0 },    // $0K-$999K EBITDA
  4999000: { avg: 6.0 },   // $1M-$4.99M EBITDA  
  9999000: { avg: 6.3 },   // $5M-$9.99M EBITDA
  24999000: { avg: 7.0 },  // $10M-$24.99M EBITDA
  49999000: { avg: 8.1 },  // $25M-$49.99M EBITDA
  Infinity: { avg: 10.0 }   // $50M+ EBITDA
};

export interface ValuationResult {
  value: number;
  multiple: number;
  type: 'SDE' | 'EBITDA';
  range?: string;
  explanation: string;
}

// Calculate appropriate multiple based on earnings and business stage
export const getValuationMultiple = (
  earnings: number, 
  stage: 'owner-dependent' | 'professionalized' = 'owner-dependent'
): ValuationResult => {
  
  if (stage === 'owner-dependent') {
    // Use SDE multiples for smaller, owner-dependent businesses
    const thresholds = Object.keys(SDE_MULTIPLES).map(Number).sort((a, b) => a - b);
    
    for (const threshold of thresholds) {
      if (earnings <= threshold) {
        const data = SDE_MULTIPLES[threshold as keyof typeof SDE_MULTIPLES];
        return {
          value: Math.round(earnings * data.avg),
          multiple: data.avg,
          type: 'SDE',
          range: `${data.min}x - ${data.max}x`,
          explanation: `Owner-dependent business using SDE (Seller's Discretionary Earnings) multiples`
        };
      }
    }
    
    // Default to highest SDE multiple
    return {
      value: Math.round(earnings * 3.75),
      multiple: 3.75,
      type: 'SDE',
      range: '3.25x - 4.25x',
      explanation: `Large owner-dependent business using highest SDE multiple`
    };
    
  } else {
    // Use EBITDA multiples for professionalized businesses
    const thresholds = Object.keys(EBITDA_MULTIPLES).map(Number).sort((a, b) => a - b);
    
    for (const threshold of thresholds) {
      if (earnings <= threshold) {
        const data = EBITDA_MULTIPLES[threshold as keyof typeof EBITDA_MULTIPLES];
        return {
          value: Math.round(earnings * data.avg),
          multiple: data.avg,
          type: 'EBITDA',
          range: `~${data.avg}x avg`,
          explanation: `Professionalized business using EBITDA multiples (3.3-7.5x higher than SDE)`
        };
      }
    }
    
    // Default to highest EBITDA multiple
    return {
      value: Math.round(earnings * 10.0),
      multiple: 10.0,
      type: 'EBITDA',
      range: '~10.0x avg',
      explanation: `Large professionalized business using highest EBITDA multiple`
    };
  }
};

// Determine business stage based on revenue and profit characteristics
export const determineBusinessStage = (revenue: number, profit: number): 'owner-dependent' | 'professionalized' => {
  // If profit > $1M and revenue > $10M, likely professionalized
  // Also factor in profit margins - higher margins with scale suggest systems
  const profitMargin = profit / revenue;
  
  if (profit >= 1000000 && revenue >= 10000000 && profitMargin >= 0.15) {
    return 'professionalized';
  }
  
  return 'owner-dependent';
};

// Growth benchmark calculations
export interface GrowthBenchmark {
  id: string;
  name: string;
  description: string;
  yearlyGrowthRates: number[];
  totalMultiplier: number;
  recommendedFor: string;
}

export const GROWTH_BENCHMARKS: GrowthBenchmark[] = [
  {
    id: 'hypergrowth',
    name: 'Hypergrowth: 3X, 3X, 2X',
    description: 'VC-Funded...₦100M in 7 years',
    yearlyGrowthRates: [3.0, 3.0, 2.0], // Triple, triple, double
    totalMultiplier: 18.0, // 3 * 3 * 2
    recommendedFor: 'Venture-backed companies with significant funding'
  },
  {
    id: 'rapid',
    name: 'Rapid Growth: 2X, 2X, 75%',
    description: 'Early-Stage Growth',
    yearlyGrowthRates: [2.0, 2.0, 1.75], // Double, double, 75%
    totalMultiplier: 7.0, // 2 * 2 * 1.75
    recommendedFor: 'Early-stage businesses with strong product-market fit'
  },
  {
    id: 'steady',
    name: 'Steady Growth: 25-50% YoY',
    description: 'Sustainable expansion',
    yearlyGrowthRates: [1.375, 1.375, 1.375], // ~37.5% average
    totalMultiplier: 2.6, // 1.375^3
    recommendedFor: 'Established businesses focusing on sustainable growth'
  },
  {
    id: 'mature',
    name: 'Mature Growth: 10-20% YoY', 
    description: 'Established business growth',
    yearlyGrowthRates: [1.15, 1.15, 1.15], // 15% average
    totalMultiplier: 1.52, // 1.15^3
    recommendedFor: 'Mature businesses in stable markets'
  },
  {
    id: 'double-3-years',
    name: 'Double in 3 Years: 26% YoY',
    description: 'Can you really DOUBLE in 3 years?',
    yearlyGrowthRates: [1.26, 1.26, 1.26], // 26% compounded
    totalMultiplier: 2.0, // Exactly double
    recommendedFor: 'Minimum growth standard for scaling businesses'
  },
  {
    id: 'top-to-bottom',
    name: 'Top to Bottom',
    description: 'Transform current revenue into future profit',
    yearlyGrowthRates: [], // Special calculation
    totalMultiplier: 0, // Will be calculated separately
    recommendedFor: 'Ambitious entrepreneurs ready for significant transformation'
  }
];

// Calculate 3-year targets based on growth benchmark
export const calculateGrowthTargets = (
  currentRevenue: number,
  currentProfit: number,
  benchmark: GrowthBenchmark,
  targetProfitMargin: number = 0.20
) => {
  if (benchmark.id === 'top-to-bottom') {
    // Special case: current revenue becomes target profit
    const targetProfit = currentRevenue;
    const targetRevenue = targetProfit / targetProfitMargin;
    
    return {
      targetRevenue: Math.round(targetRevenue),
      targetProfit: Math.round(targetProfit),
      targetProfitMargin: targetProfitMargin,
      revenueGrowth: (targetRevenue / currentRevenue),
      profitGrowth: (targetProfit / currentProfit)
    };
  }
  
  // Standard growth calculation
  const revenueMultiplier = benchmark.totalMultiplier;
  const profitMultiplier = revenueMultiplier * 1.2; // Profit grows faster due to efficiency gains
  
  const targetRevenue = Math.round(currentRevenue * revenueMultiplier);
  const targetProfit = Math.round(currentProfit * profitMultiplier);
  const calculatedMargin = targetProfit / targetRevenue;
  
  return {
    targetRevenue,
    targetProfit,
    targetProfitMargin: Math.round(calculatedMargin * 100) / 100,
    revenueGrowth: revenueMultiplier,
    profitGrowth: profitMultiplier
  };
};

// Format currency for display
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`;
  } else {
    return `₦${amount.toLocaleString()}`;
  }
};

// Parse currency input (handles various formats)
export const parseCurrency = (input: string): number => {
  // Remove currency symbols, commas, and spaces
  const cleaned = input.replace(/[₦,$\s]/g, '');
  
  // Handle K/M suffixes
  if (cleaned.toLowerCase().includes('k')) {
    return parseFloat(cleaned.replace(/k/i, '')) * 1000;
  } else if (cleaned.toLowerCase().includes('m')) {
    return parseFloat(cleaned.replace(/m/i, '')) * 1000000;
  }
  
  return parseFloat(cleaned) || 0;
};