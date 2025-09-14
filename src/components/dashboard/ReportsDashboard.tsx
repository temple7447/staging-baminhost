import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { NET_WORTH_DATA, BUSINESSES, WALLET_DATA, RECENT_TRANSACTIONS } from "@/data/demoData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BarChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  Clock
} from "lucide-react";

export const ReportsDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const businesses = BUSINESSES;
  const netWorth = NET_WORTH_DATA;
  const walletData = WALLET_DATA.owner;

  // Calculate quarterly metrics
  const currentQuarter = {
    revenue: businesses.reduce((sum, b) => sum + (b.monthlyRevenue * 3), 0),
    expenses: businesses.reduce((sum, b) => sum + (b.monthlyExpenses * 3), 0),
    profit: businesses.reduce((sum, b) => sum + (b.netProfit * 3), 0),
    roi: businesses.reduce((sum, b) => sum + b.performance.roi, 0) / businesses.length,
    efficiency: businesses.reduce((sum, b) => sum + b.performance.efficiency, 0) / businesses.length,
    growthRate: businesses.reduce((sum, b) => sum + b.performance.growthRate, 0) / businesses.length,
  };

  // Calculate time allocation efficiency (4/20/80 rule)
  const timeAllocationData = {
    strategic: { allocated: 4, actual: 6, target: 4 }, // Owner + Managers strategic work
    managerial: { allocated: 20, actual: 22, target: 20 }, // Manager operational activities  
    delegatable: { allocated: 80, actual: 72, target: 80 }, // Automatable tasks
  };

  // ROI by business unit
  const roiData = businesses.map(business => ({
    name: business.name,
    roi: business.performance.roi,
    revenue: business.monthlyRevenue * 3, // Quarterly
    profit: business.netProfit * 3,
    efficiency: business.performance.efficiency,
    growth: business.performance.growthRate
  }));

  // Portfolio allocation efficiency
  const allocationEfficiency = {
    investment: {
      allocated: walletData.allocations.investment,
      utilized: walletData.allocations.investment * 0.95,
      performance: 24.5 // ROI percentage
    },
    withdrawals: {
      allocated: walletData.allocations.withdrawals,
      utilized: walletData.allocations.withdrawals * 0.88,
      performance: 12.3 // Satisfaction/utility score
    },
    operations: {
      allocated: walletData.allocations.operations,
      utilized: walletData.allocations.operations * 0.92,
      performance: 87.4 // Efficiency score
    }
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'monthly': return 'This Month';
      case 'quarterly': return 'Q1 2024';
      case 'yearly': return '2024';
      default: return 'Current Period';
    }
  };

  const getMetricColor = (value: number, target: number, isPercentage = false) => {
    const threshold = isPercentage ? 0.9 : 0.95;
    if (value >= target * threshold) return 'text-green-600';
    if (value >= target * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Quarterly reporting, ROI tracking & efficiency measurements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Period and Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-input rounded-md"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
            <option value="3-year">3-Year</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-input rounded-md"
          >
            <option value="all">All Metrics</option>
            <option value="financial">Financial Only</option>
            <option value="efficiency">Efficiency Only</option>
            <option value="growth">Growth Only</option>
          </select>
        </div>
        <Badge variant="outline" className="ml-auto">
          {getPeriodLabel(selectedPeriod)}
        </Badge>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{currentQuarter.revenue.toLocaleString()}</div>
            <div className="text-xs text-green-600">+12.3% from last quarter</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{currentQuarter.profit.toLocaleString()}</div>
            <div className="text-xs text-green-600">ROI: {currentQuarter.roi.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentQuarter.efficiency.toFixed(1)}%</div>
            <Progress value={currentQuarter.efficiency} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{currentQuarter.growthRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Quarterly average</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive Analytics Dashboard</CardTitle>
          <CardDescription>Deep dive into business performance and efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financial" className="space-y-4">
            <TabsList>
              <TabsTrigger value="financial">Financial Performance</TabsTrigger>
              <TabsTrigger value="efficiency">4/20/80 Efficiency</TabsTrigger>
              <TabsTrigger value="portfolio">50/30/20 Portfolio</TabsTrigger>
              <TabsTrigger value="time-allocation">Time Allocation</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-6">
              {/* ROI by Business Unit */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI Performance by Business Unit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roiData.map((business, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{business.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              ₦{business.revenue.toLocaleString()} revenue
                            </span>
                            <Badge variant={business.roi > 20 ? "default" : business.roi > 15 ? "secondary" : "destructive"}>
                              {business.roi}% ROI
                            </Badge>
                          </div>
                        </div>
                        <Progress value={business.roi * 2} className="h-2" />
                        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                          <span>Profit: ₦{business.profit.toLocaleString()}</span>
                          <span>Efficiency: {business.efficiency}%</span>
                          <span>Growth: +{business.growth}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Trends */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quarterly Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Q4 2023</span>
                        <span>₦6,850,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Q1 2024</span>
                        <span className="font-bold">₦{currentQuarter.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Growth</span>
                        <span>+{((currentQuarter.revenue - 6850000) / 6850000 * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profit Margin Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Gross Margin</span>
                        <span className="font-bold">{((currentQuarter.profit / currentQuarter.revenue) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operating Expenses</span>
                        <span>₦{currentQuarter.expenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Net Profit</span>
                        <span>₦{currentQuarter.profit.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="efficiency" className="space-y-6">
              {/* 4/20/80 Rule Implementation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">4/20/80 Efficiency Rule Analysis</CardTitle>
                  <CardDescription>Strategic vs Managerial vs Delegatable task distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(timeAllocationData).map(([category, data]) => (
                      <div key={category} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">
                            {category} Tasks ({data.target}% target)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={getMetricColor(data.actual, data.target, true)}>
                              {data.actual}%
                            </span>
                            {data.actual > data.target ? (
                              <TrendingUp className="h-4 w-4 text-red-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={(data.actual / 100) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Current: {data.actual}%</span>
                            <span>Target: {data.target}%</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {category === 'strategic' && "High-impact decisions by Owner + Managers"}
                          {category === 'managerial' && "Operational activities managed by team"}
                          {category === 'delegatable' && "Automatable and routine tasks"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Efficiency by Business Unit */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Unit Efficiency Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {businesses.map((business, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{business.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ₦{business.monthlyRevenue.toLocaleString()} monthly revenue
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{business.performance.efficiency}%</div>
                          <div className="text-xs text-muted-foreground">efficiency</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              {/* 50/30/20 Portfolio Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">50/30/20 Portfolio Allocation Performance</CardTitle>
                  <CardDescription>Investment, Withdrawals, and Operations allocation efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(allocationEfficiency).map(([type, data]) => (
                      <div key={type} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">
                            {type} ({type === 'investment' ? '50%' : type === 'withdrawals' ? '30%' : '20%'})
                          </span>
                          <div className="text-right">
                            <div className="font-bold">₦{data.allocated.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {data.performance}% {type === 'investment' ? 'ROI' : 
                               type === 'withdrawals' ? 'satisfaction' : 'efficiency'}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={(data.utilized / data.allocated) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Utilized: ₦{data.utilized.toLocaleString()}</span>
                            <span>{((data.utilized / data.allocated) * 100).toFixed(1)}% utilization</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recursive Allocation Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recursive Allocation Deep Dive</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <PieChart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Recursive 50/30/20 Analysis</h3>
                    <p className="text-muted-foreground">
                      Detailed breakdown of recursive allocations within each portfolio segment
                    </p>
                    <Button className="mt-4">View Detailed Breakdown</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="time-allocation" className="space-y-6">
              {/* Owner Time Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Owner Time Allocation - 1/3rd Rule</CardTitle>
                  <CardDescription>8-hour workday with 3-hour active time monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Work Hours</span>
                          <span className="font-bold">8 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Time (1/3rd)</span>
                          <span className="font-bold text-blue-600">3 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Passive/Oversight</span>
                          <span className="font-bold text-gray-600">5 hours</span>
                        </div>
                      </div>
                      <Progress value={37.5} className="h-3" />
                      <div className="text-xs text-muted-foreground">
                        1/3rd active time rule implemented for approvals and strategic oversight
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm font-medium">Today's Time Distribution:</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Strategic Decisions</span>
                          <span>1.2 hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Approvals</span>
                          <span>0.8 hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monitoring</span>
                          <span>1.0 hrs</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total Active</span>
                          <span>3.0 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manager Time Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manager Time Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 border rounded">
                        <div className="text-lg font-bold">8</div>
                        <div className="text-xs text-muted-foreground">Operations</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-lg font-bold">8</div>
                        <div className="text-xs text-muted-foreground">Marketing</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-lg font-bold">8</div>
                        <div className="text-xs text-muted-foreground">Sales</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-lg font-bold">8</div>
                        <div className="text-xs text-muted-foreground">Others</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      All managers allocated 8 hours/day with dedicated operational slots
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
          <CardDescription>Generate and manage reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Generate Quarterly Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ROI Analysis Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Allocation Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Efficiency Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};