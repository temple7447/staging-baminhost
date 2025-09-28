// Strategic Hiring System Types

export interface TimeEntry {
  id: string;
  task: string;
  category: 'big5' | 'below-the-line';
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  hourlyRate?: number;
  value?: number; // calculated based on duration and rate
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'big5' | 'below-the-line';
  isCompleted: boolean;
  isDelegated: boolean;
  delegatedTo?: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  completedAt?: Date;
}

export interface DelegationItem {
  id: string;
  task: string;
  description?: string;
  estimatedCost: number;
  urgency: 'immediate' | 'within-week' | 'within-month';
  requiredSkills: string[];
  isDelegated: boolean;
  delegatedTo?: string;
  createdAt: Date;
}

export interface HourlyRateConfig {
  weeklyIncome: number;
  workHoursPerWeek: number;
  calculatedRate: number;
  lastUpdated: Date;
}

// Strategic Hiring Planner Types
export interface HiringTrigger {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  currentValue: number;
  isTriggered: boolean;
  description: string;
}

export interface OrgChartRole {
  id: string;
  title: string;
  department: string;
  level: number;
  parentId?: string;
  isVacant: boolean;
  estimatedSalary?: number;
  requiredSkills: string[];
  responsibilities: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface JobDescription {
  id: string;
  roleId: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salaryRange: {
    min: number;
    max: number;
  };
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  culturalAttributes: string[];
  benefits: string[];
  workArrangement: 'remote' | 'hybrid' | 'onsite';
  createdAt: Date;
  isPublished: boolean;
}

// Candidate Management Types
export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  appliedFor: string; // job description ID
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage: string;
  notes: CandidateNote[];
  skills: string[];
  experience: number; // years
  expectedSalary?: number;
  appliedAt: Date;
  lastUpdated: Date;
}

export interface CandidateNote {
  id: string;
  content: string;
  type: 'general' | 'interview' | 'screening' | 'reference';
  createdAt: Date;
  createdBy: string;
}

export interface HaloResearch {
  id: string;
  roleId: string;
  sources: ResearchSource[];
  painPoints: string[];
  customerLanguage: string[];
  marketInsights: string[];
  competitorAnalysis: string[];
  createdAt: Date;
}

export interface ResearchSource {
  id: string;
  name: string;
  type: 'social-media' | 'forum' | 'review-site' | 'survey' | 'interview' | 'other';
  url?: string;
  findings: string[];
  priority: number;
}

export interface PowerWord {
  id: string;
  word: string;
  category: 'action' | 'achievement' | 'leadership' | 'technical' | 'soft-skill';
  context: string;
  examples: string[];
}

// Analytics and Reporting
export interface HiringMetrics {
  timeToHire: number; // days
  costPerHire: number;
  applicantCount: number;
  interviewToHireRatio: number;
  sourceEffectiveness: Record<string, number>;
  qualityOfHire: number;
  retentionRate: number;
}

export interface ProductivityAnalysis {
  totalHours: number;
  big5Hours: number;
  belowTheLineHours: number;
  big5Percentage: number;
  delegationCandidateHours: number;
  potentialSavings: number;
  recommendedAction: 'hire-immediately' | 'hire-soon' | 'optimize-first' | 'continue-monitoring';
}