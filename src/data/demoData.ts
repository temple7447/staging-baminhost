export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'inflow' | 'outflow';
  portfolioType?: 'personal' | 'business';
  businessUnit?: string;
  status?: 'pending' | 'completed' | 'failed';
}

export interface WalletData {
  balance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  pendingTransactions: number;
  allocations: {
    investment: number; // 50%
    withdrawals: number; // 30%
    operations: number; // 20%
  };
}

export interface NetWorthData {
  total: number;
  monthlyChange: number;
  changePercentage: number;
  breakdown: {
    personal: number;
    business: number;
  };
  historical: {
    hourly: number[];
    daily: number[];
    monthly: number[];
    yearly: number[];
    threeYear: number[];
  };
}

export interface SplitData {
  needs: { allocated: number; spent: number; budget: number; };
  wants: { allocated: number; spent: number; budget: number; };
  savings: { allocated: number; spent: number; budget: number; };
}

export interface Property {
  id: string;
  location: string;
  type: 'flat' | 'office' | 'shop';
  rentAmount: number;
  tenantName: string;
  tenantType: 'old' | 'new';
  status: 'occupied' | 'vacant' | 'maintenance';
  lastPayment: string;
  nextDue: string;
  serviceCharge: number;
  cautionFee: number;
  legalFee: number;
}

export interface Business {
  id: string;
  name: string;
  type: 'estate' | 'filling_station' | 'equipment';
  monthlyRevenue: number;
  monthlyExpenses: number;
  netProfit: number;
  assets: any[];
  performance: {
    efficiency: number;
    roi: number;
    growthRate: number;
  };
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: 'police' | 'political' | 'security' | 'community' | 'vendor' | 'customer';
  isVendor: boolean;
  commissionRate?: number;
  totalCommissions?: number;
  relationship: string;
  notes: string;
}

export interface LibraryContent {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'video' | 'diagram';
  category: 'strategic' | 'operational' | 'technical' | 'training';
  targetAudience: ('super_admin' | 'admin' | 'manager' | 'vendor' | 'customer')[];
  content: string;
  tags: string[];
  crossReferences: string[];
  contradictions: string[];
  lastUpdated: string;
}

// Demo Users Data
export const DEMO_USERS = [
  {
    id: '1',
    email: 'ebami@eyituoyo.com',
    name: 'Ebami Eyituoyo',
    role: 'owner' as const,
    permissions: ['all'],
    workHours: { total: 8, active: 3 }, // 1/3rd rule
  },
  {
    id: '2',
    email: 'big7@eyituoyo.com',
    name: 'Big 7 Member',
    role: 'big7' as const,
    permissions: ['view_allocations', 'manage_portfolio'],
    profitShare: 15000,
  },
  // 8 Manager roles
  {
    id: '3',
    email: 'operations@eyituoyo.com',
    name: 'Operations Manager',
    role: 'manager' as const,
    department: 'operations',
    hourlyRate: 2500,
    permissions: ['manage_operations', 'view_reports'],
  },
  {
    id: '4',
    email: 'marketing@eyituoyo.com',
    name: 'Marketing Manager',
    role: 'manager' as const,
    department: 'marketing',
    hourlyRate: 2200,
    permissions: ['manage_marketing', 'view_analytics'],
  },
  {
    id: '5',
    email: 'sales@eyituoyo.com',
    name: 'Sales Manager',
    role: 'manager' as const,
    department: 'sales',
    hourlyRate: 2800,
    permissions: ['manage_sales', 'view_customers'],
  },
  {
    id: '6',
    email: 'delivery@eyituoyo.com',
    name: 'Delivery Manager',
    role: 'manager' as const,
    department: 'delivery',
    hourlyRate: 2000,
    permissions: ['manage_delivery', 'track_projects'],
  },
  {
    id: '7',
    email: 'financial@eyituoyo.com',
    name: 'Financial Manager',
    role: 'manager' as const,
    department: 'financial',
    hourlyRate: 3000,
    permissions: ['manage_finances', 'view_all_transactions'],
  },
  {
    id: '8',
    email: 'fundraising@eyituoyo.com',
    name: 'Fundraising Manager',
    role: 'manager' as const,
    department: 'fundraising',
    hourlyRate: 2600,
    permissions: ['manage_fundraising', 'view_investors'],
  },
  {
    id: '9',
    email: 'legal@eyituoyo.com',
    name: 'Legal & Security Manager',
    role: 'manager' as const,
    department: 'legal_security',
    hourlyRate: 3500,
    permissions: ['manage_legal', 'manage_security'],
  },
  {
    id: '10',
    email: 'automation@eyituoyo.com',
    name: 'Automation Manager',
    role: 'manager' as const,
    department: 'automation',
    hourlyRate: 4000,
    permissions: ['manage_automation', 'system_admin'],
  },
  // Vendor Users
  {
    id: '11',
    email: 'vendor@eyituoyo.com',
    name: 'Service Vendor',
    role: 'vendor' as const,
    department: 'external',
    commissionRate: 15,
    totalEarnings: 75000,
    permissions: ['upload_work', 'view_payments', 'track_commissions'],
  },
  {
    id: '12',
    email: 'contractor@eyituoyo.com',
    name: 'Building Contractor',
    role: 'vendor' as const,
    department: 'construction',
    commissionRate: 12,
    totalEarnings: 240000,
    permissions: ['manage_projects', 'submit_reports'],
  },
  // Customer Users
  {
    id: '13',
    email: 'customer@eyituoyo.com',
    name: 'Premium Customer',
    role: 'customer' as const,
    customerType: 'premium',
    totalSpent: 450000,
    activeContracts: 2,
    permissions: ['view_account', 'make_payments', 'track_projects'],
  },
  {
    id: '14',
    email: 'client@eyituoyo.com',
    name: 'Regular Client',
    role: 'customer' as const,
    customerType: 'regular',
    totalSpent: 125000,
    activeContracts: 1,
    permissions: ['view_account', 'make_payments'],
  },
];

// Net Worth Data
export const NET_WORTH_DATA: NetWorthData = {
  total: 52750000, // ₦52.75M
  monthlyChange: 1250000,
  changePercentage: 2.4,
  breakdown: {
    personal: 15750000,
    business: 37000000,
  },
  historical: {
    hourly: [52750000, 52751500, 52749800, 52752300],
    daily: [52750000, 52680000, 52820000, 52750000],
    monthly: [51500000, 51800000, 52100000, 52750000],
    yearly: [48000000, 50200000, 51800000, 52750000],
    threeYear: [42000000, 45000000, 48000000, 50200000, 51800000, 52750000],
  },
};

// Estate Portfolio Data (₦18M yearly)
export const ESTATE_PROPERTIES: Property[] = [
  // Balado Estate - 32 units
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `balado_${i + 1}`,
    location: `Balado Estate Unit ${i + 1}`,
    type: 'flat' as const,
    rentAmount: 45000,
    tenantName: `Tenant ${i + 1}`,
    tenantType: (i < 20 ? 'old' : 'new') as const,
    status: (i < 30 ? 'occupied' : 'vacant') as const,
    lastPayment: '2024-01-01',
    nextDue: '2024-02-01',
    serviceCharge: 5000,
    cautionFee: 90000,
    legalFee: 15000,
  })),
  // Oke Street - 2 units
  {
    id: 'oke_1',
    location: 'Oke Street Unit 1',
    type: 'flat',
    rentAmount: 65000,
    tenantName: 'Oke Tenant 1',
    tenantType: 'old',
    status: 'occupied',
    lastPayment: '2024-01-01',
    nextDue: '2024-02-01',
    serviceCharge: 7000,
    cautionFee: 130000,
    legalFee: 20000,
  },
  {
    id: 'oke_2',
    location: 'Oke Street Unit 2',
    type: 'flat',
    rentAmount: 65000,
    tenantName: 'Oke Tenant 2',
    tenantType: 'new',
    status: 'occupied',
    lastPayment: '2024-01-01',
    nextDue: '2024-02-01',
    serviceCharge: 7000,
    cautionFee: 130000,
    legalFee: 20000,
  },
  // Itskiri - 4 units
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `itskiri_${i + 1}`,
    location: `Itskiri Unit ${i + 1}`,
    type: 'flat' as const,
    rentAmount: 55000,
    tenantName: `Itskiri Tenant ${i + 1}`,
    tenantType: (i < 2 ? 'old' : 'new') as const,
    status: 'occupied' as const,
    lastPayment: '2024-01-01',
    nextDue: '2024-02-01',
    serviceCharge: 6000,
    cautionFee: 110000,
    legalFee: 18000,
  })),
];

// Business Data
export const BUSINESSES: Business[] = [
  {
    id: 'estate',
    name: 'Real Estate Portfolio',
    type: 'estate',
    monthlyRevenue: 1500000, // ₦18M/12
    monthlyExpenses: 300000,
    netProfit: 1200000,
    assets: ESTATE_PROPERTIES,
    performance: {
      efficiency: 85,
      roi: 24.5,
      growthRate: 12.3,
    },
  },
  {
    id: 'filling_station',
    name: 'Filling Station Business',
    type: 'filling_station',
    monthlyRevenue: 850000,
    monthlyExpenses: 420000,
    netProfit: 430000,
    assets: [
      {
        id: 'tank_1',
        type: 'fuel_tank',
        capacity: 33000,
        currentLevel: 28500,
        lastRefill: '2024-01-10',
        fuelType: 'Petrol',
      },
      {
        id: 'tank_2',
        type: 'fuel_tank',
        capacity: 33000,
        currentLevel: 31200,
        lastRefill: '2024-01-08',
        fuelType: 'Diesel',
      },
      {
        id: 'tank_3',
        type: 'fuel_tank',
        capacity: 33000,
        currentLevel: 15600,
        lastRefill: '2024-01-12',
        fuelType: 'Kerosene',
      },
      {
        id: 'tank_4',
        type: 'fuel_tank',
        capacity: 33000,
        currentLevel: 22800,
        lastRefill: '2024-01-09',
        fuelType: 'Premium',
      },
      {
        id: 'office_1',
        type: 'office_space',
        monthlyRent: 45000,
        tenant: 'Mini Mart',
        status: 'occupied',
      },
      {
        id: 'carwash',
        type: 'carwash',
        dailyRevenue: 8500,
        monthlyRevenue: 255000,
        status: 'operational',
      },
      {
        id: 'gas_station',
        type: 'gas_station',
        monthlyRevenue: 125000,
        cylindersInStock: 45,
        status: 'operational',
      },
    ],
    performance: {
      efficiency: 78,
      roi: 18.2,
      growthRate: 8.7,
    },
  },
  {
    id: 'equipment',
    name: 'Equipment Rental',
    type: 'equipment',
    monthlyRevenue: 320000,
    monthlyExpenses: 120000,
    netProfit: 200000,
    assets: [
      {
        id: 'tipper_1',
        type: 'tipper',
        model: 'Dangote Tipper',
        dailyRate: 25000,
        monthlyRevenue: 450000,
        status: 'available',
        lastService: '2024-01-05',
        nextService: '2024-04-05',
      },
      {
        id: 'excavator_1',
        type: 'excavator',
        model: 'CAT Excavator',
        dailyRate: 35000,
        monthlyRevenue: 630000,
        status: 'rented',
        currentClient: 'Construction Co.',
        rentEndDate: '2024-02-15',
      },
      {
        id: 'loader_1',
        type: 'self_loader',
        model: 'Self Loader',
        dailyRate: 28000,
        monthlyRevenue: 420000,
        status: 'maintenance',
        maintenanceEndDate: '2024-01-20',
      },
    ],
    performance: {
      efficiency: 92,
      roi: 22.8,
      growthRate: 15.4,
    },
  },
];

// Wallet Data for different user types
export const WALLET_DATA = {
  owner: {
    balance: 2850000,
    monthlyInflow: 3200000,
    monthlyOutflow: 1950000,
    pendingTransactions: 5,
    allocations: {
      investment: 1600000, // 50%
      withdrawals: 960000, // 30%
      operations: 640000, // 20%
    },
  },
  big7: {
    balance: 185000,
    monthlyInflow: 150000,
    monthlyOutflow: 85000,
    pendingTransactions: 2,
    allocations: {
      investment: 75000,
      withdrawals: 45000,
      operations: 30000,
    },
  },
  manager: {
    balance: 125000,
    monthlyInflow: 200000,
    monthlyOutflow: 145000,
    pendingTransactions: 3,
    allocations: {
      investment: 100000,
      withdrawals: 60000,
      operations: 40000,
    },
  },
  vendor: {
    balance: 85000,
    monthlyInflow: 120000,
    monthlyOutflow: 95000,
    pendingTransactions: 1,
    allocations: {
      investment: 60000,
      withdrawals: 36000,
      operations: 24000,
    },
  },
  customer: {
    balance: 45000,
    monthlyInflow: 350000,
    monthlyOutflow: 320000,
    pendingTransactions: 2,
    allocations: {
      investment: 175000,
      withdrawals: 105000,
      operations: 70000,
    },
  },
};

// Recent Transactions
export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Estate Rental Income - Balado',
    amount: 1440000,
    category: 'Business Income',
    type: 'inflow',
    portfolioType: 'business',
    businessUnit: 'estate',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Filling Station Revenue',
    amount: 850000,
    category: 'Business Income',
    type: 'inflow',
    portfolioType: 'business',
    businessUnit: 'filling_station',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Equipment Rental - Excavator',
    amount: 35000,
    category: 'Business Income',
    type: 'inflow',
    portfolioType: 'business',
    businessUnit: 'equipment',
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Owner Withdrawal - Personal',
    amount: -250000,
    category: 'Owner Withdrawal',
    type: 'outflow',
    portfolioType: 'personal',
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Operations - Estate Maintenance',
    amount: -85000,
    category: 'Operations',
    type: 'outflow',
    portfolioType: 'business',
    businessUnit: 'estate',
    status: 'completed',
  },
  {
    id: '6',
    date: '2024-01-10',
    description: 'Investment - T-Bills Purchase',
    amount: -500000,
    category: 'Investment',
    type: 'outflow',
    portfolioType: 'business',
    status: 'pending',
  },
];

// Personal Life Sub-Portfolios
export const PERSONAL_PORTFOLIOS = {
  food: {
    monthlyBudget: 120000,
    spent: 95000,
    category: 'needs',
    split: { investment: 60000, withdrawals: 36000, operations: 24000 },
  },
  healthcare: {
    monthlyBudget: 80000,
    spent: 65000,
    category: 'needs',
    split: { investment: 40000, withdrawals: 24000, operations: 16000 },
  },
  shelter: {
    monthlyBudget: 200000,
    spent: 180000,
    category: 'needs',
    split: { investment: 100000, withdrawals: 60000, operations: 40000 },
  },
  family: {
    monthlyBudget: 150000,
    spent: 120000,
    category: 'wants',
    split: { investment: 75000, withdrawals: 45000, operations: 30000 },
  },
  transport: {
    monthlyBudget: 100000,
    spent: 85000,
    category: 'needs',
    split: { investment: 50000, withdrawals: 30000, operations: 20000 },
  },
  education: {
    monthlyBudget: 75000,
    spent: 75000,
    category: 'savings',
    split: { investment: 37500, withdrawals: 22500, operations: 15000 },
  },
  selfBranding: {
    monthlyBudget: 90000,
    spent: 70000,
    category: 'wants',
    split: { investment: 45000, withdrawals: 27000, operations: 18000 },
  },
};

// CRM Contacts
export const CRM_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Inspector Johnson',
    email: 'johnson@police.gov',
    phone: '+234801234567',
    category: 'police',
    isVendor: true,
    commissionRate: 5,
    totalCommissions: 25000,
    relationship: 'Security Contact',
    notes: 'Reliable for estate security matters',
  },
  {
    id: '2',
    name: 'Hon. Williams',
    email: 'williams@lagosstate.gov',
    phone: '+234802345678',
    category: 'political',
    isVendor: false,
    relationship: 'Local Government Contact',
    notes: 'Helps with permits and approvals',
  },
  {
    id: '3',
    name: 'Chief Adebayo',
    email: 'adebayo@community.org',
    phone: '+234803456789',
    category: 'community',
    isVendor: true,
    commissionRate: 3,
    totalCommissions: 15000,
    relationship: 'Community Leader',
    notes: 'Mediates tenant disputes',
  },
  {
    id: '4',
    name: 'ABC Construction Ltd',
    email: 'info@abcconstruction.com',
    phone: '+234804567890',
    category: 'vendor',
    isVendor: true,
    commissionRate: 0,
    totalCommissions: 0,
    relationship: 'Equipment Rental Client',
    notes: 'Regular excavator rentals',
  },
];

// Library Content
export const LIBRARY_CONTENT: LibraryContent[] = [
  {
    id: '1',
    title: 'Strategic Decision Making Framework',
    type: 'text',
    category: 'strategic',
    targetAudience: ['owner'],
    content: 'Framework for making high-impact decisions using the 4% rule...',
    tags: ['strategy', 'decision-making', '4% rule'],
    crossReferences: ['2', '3'],
    contradictions: [],
    lastUpdated: '2024-01-10',
  },
  {
    id: '2',
    title: 'Time Management - 1/3rd Rule Implementation',
    type: 'video',
    category: 'strategic',
    targetAudience: ['owner'],
    content: 'Video guide on implementing the 1/3rd active time rule...',
    tags: ['time-management', '1/3rd rule', 'efficiency'],
    crossReferences: ['1'],
    contradictions: [],
    lastUpdated: '2024-01-08',
  },
  {
    id: '3',
    title: 'Hire Like a Boss - Complete System',
    type: 'text',
    category: 'operational',
    targetAudience: ['manager'],
    content: 'Complete hiring system with interviews, assessments...',
    tags: ['hiring', 'management', 'team-building'],
    crossReferences: ['4'],
    contradictions: [],
    lastUpdated: '2024-01-05',
  },
  {
    id: '4',
    title: 'Sell Like Crazy - Sales Framework',
    type: 'audio',
    category: 'operational',
    targetAudience: ['manager'],
    content: 'Audio course on advanced sales techniques...',
    tags: ['sales', 'customer-relations', 'revenue'],
    crossReferences: ['3'],
    contradictions: [],
    lastUpdated: '2024-01-03',
  },
];

// Helper function to calculate 50/30/20 splits
export const calculateSplit = (amount: number) => ({
  investment: amount * 0.5,
  withdrawals: amount * 0.3,
  operations: amount * 0.2,
});

// Helper function to calculate 4/20/80 rule
export const calculateEfficiency = (activities: any[]) => ({
  strategic: activities.filter(a => a.type === 'strategic').length / activities.length,
  managerial: activities.filter(a => a.type === 'managerial').length / activities.length,
  delegatable: activities.filter(a => a.type === 'delegatable').length / activities.length,
});