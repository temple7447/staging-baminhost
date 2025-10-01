import { api } from './api';
import scalableImpactNotificationService from './scalableImpactNotificationService';

export interface ProgressBenchmark {
  id: string;
  levelId: number;
  benchmarkType: string;
  description: string;
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  lastUpdated: string;
  dataSource: string; // e.g., 'wallet', 'big5', 'crm', etc.
}

export interface LevelProgress {
  levelId: number;
  title: string;
  completed: boolean;
  completionDate?: string;
  benchmarks: ProgressBenchmark[];
  overallProgress: number; // 0-100
}

export interface ScalableImpactProgress {
  userId: string;
  currentLevel: number;
  levels: LevelProgress[];
  lastAssessment: string;
}

// Define benchmarks for each level
export const LEVEL_BENCHMARKS: Record<number, ProgressBenchmark[]> = {
  1: [
    {
      id: 'level1_revenue',
      levelId: 1,
      benchmarkType: 'revenue_milestone',
      description: 'Generate first $1000 in revenue',
      targetValue: 1000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    },
    {
      id: 'level1_business_plan',
      levelId: 1,
      benchmarkType: 'business_documentation',
      description: 'Complete personal business plan',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'big5'
    },
    {
      id: 'level1_financial_tracking',
      levelId: 1,
      benchmarkType: 'system_setup',
      description: 'Establish basic financial tracking',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  2: [
    {
      id: 'level2_team_hire',
      levelId: 2,
      benchmarkType: 'team_growth',
      description: 'Hire first team member',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'contacts'
    },
    {
      id: 'level2_crm_system',
      levelId: 2,
      benchmarkType: 'system_setup',
      description: 'Implement basic CRM system',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'contacts'
    },
    {
      id: 'level2_monthly_revenue',
      levelId: 2,
      benchmarkType: 'revenue_milestone',
      description: 'Achieve $10,000 monthly revenue',
      targetValue: 10000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  3: [
    {
      id: 'level3_processes',
      levelId: 3,
      benchmarkType: 'business_documentation',
      description: 'Document core business processes',
      targetValue: 5,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'library'
    },
    {
      id: 'level3_team_size',
      levelId: 3,
      benchmarkType: 'team_growth',
      description: 'Build team of 5+ members',
      targetValue: 5,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'contacts'
    },
    {
      id: 'level3_annual_revenue',
      levelId: 3,
      benchmarkType: 'revenue_milestone',
      description: 'Reach $100,000 annual revenue',
      targetValue: 100000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  4: [
    {
      id: 'level4_brand_presence',
      levelId: 4,
      benchmarkType: 'marketing_milestone',
      description: 'Establish strong brand presence',
      targetValue: 1000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'contacts'
    },
    {
      id: 'level4_automation',
      levelId: 4,
      benchmarkType: 'system_setup',
      description: 'Implement automated systems',
      targetValue: 3,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'assistant'
    },
    {
      id: 'level4_revenue',
      levelId: 4,
      benchmarkType: 'revenue_milestone',
      description: 'Achieve $500,000 annual revenue',
      targetValue: 500000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  5: [
    {
      id: 'level5_product_lines',
      levelId: 5,
      benchmarkType: 'business_expansion',
      description: 'Launch 3+ product/service lines',
      targetValue: 3,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'portfolio'
    },
    {
      id: 'level5_market_expansion',
      levelId: 5,
      benchmarkType: 'business_expansion',
      description: 'Expand to new markets',
      targetValue: 2,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'reports'
    },
    {
      id: 'level5_revenue',
      levelId: 5,
      benchmarkType: 'revenue_milestone',
      description: 'Reach $1M+ annual revenue',
      targetValue: 1000000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  6: [
    {
      id: 'level6_recognition',
      levelId: 6,
      benchmarkType: 'market_position',
      description: 'Achieve industry recognition',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'reports'
    },
    {
      id: 'level6_partnerships',
      levelId: 6,
      benchmarkType: 'business_partnerships',
      description: 'Build strategic partnerships',
      targetValue: 3,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'contacts'
    },
    {
      id: 'level6_revenue',
      levelId: 6,
      benchmarkType: 'revenue_milestone',
      description: 'Generate $10M+ annual revenue',
      targetValue: 10000000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'wallet'
    }
  ],
  7: [
    {
      id: 'level7_ma_preparation',
      levelId: 7,
      benchmarkType: 'exit_strategy',
      description: 'Prepare for acquisition/merger',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'reports'
    },
    {
      id: 'level7_legacy_systems',
      levelId: 7,
      benchmarkType: 'system_sustainability',
      description: 'Build sustainable legacy systems',
      targetValue: 1,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'portfolio'
    },
    {
      id: 'level7_wealth_creation',
      levelId: 7,
      benchmarkType: 'wealth_milestone',
      description: 'Create generational wealth',
      targetValue: 50000000,
      currentValue: 0,
      isCompleted: false,
      lastUpdated: new Date().toISOString(),
      dataSource: 'personal-portfolios'
    }
  ]
};

class ScalableImpactProgressService {
  private progressCache: Map<string, ScalableImpactProgress> = new Map();

  // Get user's current progress
  async getUserProgress(userId: string): Promise<ScalableImpactProgress> {
    try {
      // Check cache first
      if (this.progressCache.has(userId)) {
        return this.progressCache.get(userId)!;
      }

      const response = await api.get(`/scalable-impact/progress/${userId}`);
      const progress = response.data;
      
      // Cache the result
      this.progressCache.set(userId, progress);
      return progress;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      // Return default progress if API fails
      return this.initializeDefaultProgress(userId);
    }
  }

  // Initialize default progress for new users
  private initializeDefaultProgress(userId: string): ScalableImpactProgress {
    const levels: LevelProgress[] = [];
    
    for (let i = 1; i <= 7; i++) {
      levels.push({
        levelId: i,
        title: this.getLevelTitle(i),
        completed: false,
        benchmarks: LEVEL_BENCHMARKS[i] || [],
        overallProgress: 0
      });
    }

    const defaultProgress: ScalableImpactProgress = {
      userId,
      currentLevel: 1,
      levels,
      lastAssessment: new Date().toISOString()
    };

    this.progressCache.set(userId, defaultProgress);
    return defaultProgress;
  }

  // Update benchmark progress from external data sources
  async updateBenchmarkProgress(
    userId: string, 
    benchmarkId: string, 
    currentValue: number, 
    dataSource: string
  ): Promise<void> {
    try {
      const progress = await this.getUserProgress(userId);
      
      // Find and update the benchmark
      for (const level of progress.levels) {
        const benchmark = level.benchmarks.find(b => b.id === benchmarkId);
        if (benchmark) {
          const wasCompleted = benchmark.isCompleted;
          benchmark.currentValue = currentValue;
          benchmark.lastUpdated = new Date().toISOString();
          benchmark.isCompleted = currentValue >= benchmark.targetValue;
          
          // Send benchmark completion notification if just completed
          if (!wasCompleted && benchmark.isCompleted) {
            await scalableImpactNotificationService.sendBenchmarkNotification(
              userId,
              benchmark.id,
              benchmark.description,
              level.levelId
            );
          }
          
          // Send milestone notification for significant progress
          if (benchmark.targetValue > 1000 && currentValue >= benchmark.targetValue * 0.5 && currentValue < benchmark.targetValue) {
            await scalableImpactNotificationService.sendMilestoneNotification(
              userId,
              benchmark.description,
              currentValue,
              benchmark.targetValue
            );
          }
          
          // Recalculate level progress
          await this.recalculateLevelProgress(userId, level.levelId);
          break;
        }
      }

      // Update cache
      this.progressCache.set(userId, progress);
      
      // Save to backend
      await api.put(`/scalable-impact/progress/${userId}`, progress);
    } catch (error) {
      console.error('Error updating benchmark progress:', error);
    }
  }

  // Recalculate progress for a specific level
  async recalculateLevelProgress(userId: string, levelId: number): Promise<void> {
    const progress = await this.getUserProgress(userId);
    const level = progress.levels.find(l => l.levelId === levelId);
    
    if (!level) return;

    // Calculate overall progress for the level
    const completedBenchmarks = level.benchmarks.filter(b => b.isCompleted).length;
    level.overallProgress = (completedBenchmarks / level.benchmarks.length) * 100;
    
    // Check if level is completed
    const wasCompleted = level.completed;
    level.completed = level.overallProgress === 100;
    
    // If level just completed, update completion date and unlock next level
    if (!wasCompleted && level.completed) {
      level.completionDate = new Date().toISOString();
      
      // Update current level if this is the next sequential level
      if (levelId === progress.currentLevel) {
        progress.currentLevel = Math.min(levelId + 1, 7);
      }
      
      // Trigger notification
      this.triggerLevelCompletionNotification(userId, levelId);
    }

    progress.lastAssessment = new Date().toISOString();
    this.progressCache.set(userId, progress);
  }

  // Assess progress from all dashboard data sources
  async assessAllProgress(userId: string): Promise<void> {
    try {
      // This would typically fetch data from various dashboard sources
      const dashboardData = await this.fetchAllDashboardData(userId);
      
      // Update benchmarks based on dashboard data
      await this.updateFromWalletData(userId, dashboardData.wallet);
      await this.updateFromBig5Data(userId, dashboardData.big5);
      await this.updateFromContactsData(userId, dashboardData.contacts);
      await this.updateFromLibraryData(userId, dashboardData.library);
      await this.updateFromPortfolioData(userId, dashboardData.portfolio);
      await this.updateFromReportsData(userId, dashboardData.reports);
      
    } catch (error) {
      console.error('Error assessing all progress:', error);
    }
  }

  // Fetch data from all dashboard sources
  private async fetchAllDashboardData(userId: string): Promise<any> {
    // This would make parallel API calls to all dashboard endpoints
    const [wallet, big5, contacts, library, portfolio, reports] = await Promise.allSettled([
      api.get(`/wallet/${userId}`),
      api.get(`/big5/${userId}`),
      api.get(`/contacts/${userId}`),
      api.get(`/library/${userId}`),
      api.get(`/portfolio/${userId}`),
      api.get(`/reports/${userId}`)
    ]);

    return {
      wallet: wallet.status === 'fulfilled' ? wallet.value.data : null,
      big5: big5.status === 'fulfilled' ? big5.value.data : null,
      contacts: contacts.status === 'fulfilled' ? contacts.value.data : null,
      library: library.status === 'fulfilled' ? library.value.data : null,
      portfolio: portfolio.status === 'fulfilled' ? portfolio.value.data : null,
      reports: reports.status === 'fulfilled' ? reports.value.data : null
    };
  }

  // Update benchmarks from wallet data
  private async updateFromWalletData(userId: string, walletData: any): Promise<void> {
    if (!walletData) return;

    const totalRevenue = walletData.totalRevenue || 0;
    const monthlyRevenue = walletData.monthlyRevenue || 0;
    
    // Update revenue-based benchmarks
    await this.updateBenchmarkProgress(userId, 'level1_revenue', totalRevenue, 'wallet');
    await this.updateBenchmarkProgress(userId, 'level2_monthly_revenue', monthlyRevenue, 'wallet');
    await this.updateBenchmarkProgress(userId, 'level3_annual_revenue', totalRevenue, 'wallet');
    await this.updateBenchmarkProgress(userId, 'level4_revenue', totalRevenue, 'wallet');
    await this.updateBenchmarkProgress(userId, 'level5_revenue', totalRevenue, 'wallet');
    await this.updateBenchmarkProgress(userId, 'level6_revenue', totalRevenue, 'wallet');
  }

  // Update benchmarks from contacts/CRM data
  private async updateFromContactsData(userId: string, contactsData: any): Promise<void> {
    if (!contactsData) return;

    const teamSize = contactsData.teamMembers?.length || 0;
    const partnerships = contactsData.partnerships?.length || 0;
    
    await this.updateBenchmarkProgress(userId, 'level2_team_hire', teamSize, 'contacts');
    await this.updateBenchmarkProgress(userId, 'level3_team_size', teamSize, 'contacts');
    await this.updateBenchmarkProgress(userId, 'level6_partnerships', partnerships, 'contacts');
  }

  // Update benchmarks from Big5 data
  private async updateFromBig5Data(userId: string, big5Data: any): Promise<void> {
    if (!big5Data) return;

    const businessPlanCompleted = big5Data.businessPlan?.completed ? 1 : 0;
    await this.updateBenchmarkProgress(userId, 'level1_business_plan', businessPlanCompleted, 'big5');
  }

  // Update benchmarks from library data
  private async updateFromLibraryData(userId: string, libraryData: any): Promise<void> {
    if (!libraryData) return;

    const processDocuments = libraryData.processDocuments?.length || 0;
    await this.updateBenchmarkProgress(userId, 'level3_processes', processDocuments, 'library');
  }

  // Update benchmarks from portfolio data
  private async updateFromPortfolioData(userId: string, portfolioData: any): Promise<void> {
    if (!portfolioData) return;

    const productLines = portfolioData.productLines?.length || 0;
    await this.updateBenchmarkProgress(userId, 'level5_product_lines', productLines, 'portfolio');
  }

  // Update benchmarks from reports data
  private async updateFromReportsData(userId: string, reportsData: any): Promise<void> {
    if (!reportsData) return;

    const marketExpansion = reportsData.markets?.length || 0;
    await this.updateBenchmarkProgress(userId, 'level5_market_expansion', marketExpansion, 'reports');
  }

  // Trigger completion notification
  private async triggerLevelCompletionNotification(userId: string, levelId: number): Promise<void> {
    try {
      const levelTitle = this.getLevelTitle(levelId);
      await scalableImpactNotificationService.sendLevelCompletionNotification(
        userId, 
        levelId, 
        levelTitle
      );
    } catch (error) {
      console.error('Error sending completion notification:', error);
    }
  }

  // Get level title by ID
  private getLevelTitle(levelId: number): string {
    const titles: Record<number, string> = {
      1: "Solopreneur",
      2: "Startup Growth", 
      3: "Small Year Or Team-Home",
      4: "Scale Your Brand",
      5: "Build Your Empire",
      6: "10 Million Year",
      7: "Legacy With M&A"
    };
    return titles[levelId] || `Level ${levelId}`;
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache(): void {
    this.progressCache.clear();
  }
}

export const scalableImpactProgressService = new ScalableImpactProgressService();
export default scalableImpactProgressService;