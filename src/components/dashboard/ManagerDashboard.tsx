import { Users, Target, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for Manager
const managerData = {
  manager: {
    name: "Mike Wilson",
    role: "Senior Manager",
    teamSize: 12,
    monthlyTargets: 85000,
    achieved: 78500
  },
  team: [
    { name: "Alex Chen", role: "Sales Rep", performance: 95, target: 15000, achieved: 14250 },
    { name: "Maria Garcia", role: "Account Manager", performance: 88, target: 12000, achieved: 10560 },
    { name: "James Smith", role: "Business Dev", performance: 102, target: 18000, achieved: 18360 },
    { name: "Lisa Wang", role: "Sales Rep", performance: 76, target: 14000, achieved: 10640 },
  ],
  waterfallDistribution: {
    totalRevenue: 78500,
    managerShare: 15700, // 20%
    teamShare: 47100, // 60% 
    companyShare: 15700 // 20%
  },
  roleMetrics: {
    "Sales Rep": { count: 6, avgPerformance: 87 },
    "Account Manager": { count: 3, avgPerformance: 91 },
    "Business Dev": { count: 2, avgPerformance: 94 },
    "Team Lead": { count: 1, avgPerformance: 89 }
  }
};

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 100) return "default";
    if (performance >= 85) return "secondary";
    if (performance >= 70) return "outline";
    return "destructive";
  };

  const achievementRate = (managerData.manager.achieved / managerData.manager.monthlyTargets) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
          <p className="text-muted-foreground">Team performance and waterfall distribution</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Team Size</div>
          <div className="text-2xl font-bold text-primary">{managerData.manager.teamSize}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatCurrency(managerData.manager.monthlyTargets)}
            </div>
            <p className="text-xs text-muted-foreground">
              Team revenue goal
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achieved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-success">
              {formatCurrency(managerData.manager.achieved)}
            </div>
            <p className="text-xs text-muted-foreground">
              {achievementRate.toFixed(1)}% of target
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Share</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-primary">
              {formatCurrency(managerData.waterfallDistribution.managerShare)}
            </div>
            <p className="text-xs text-muted-foreground">
              20% waterfall distribution
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {achievementRate.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall team achievement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hire Like a Boss Call to Action */}
      <Card className="financial-card bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border-blue-500/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Hire Like a Boss</h3>
                <p className="text-sm text-muted-foreground italic">"You're not paying people to be on your team. You're buying back your own time."</p>
              </div>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
              onClick={() => navigate('/dashboard/strategic-hiring-planner')}
            >
              Open Hiring Planner <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Team Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {managerData.team.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="financial-amount font-semibold">
                      {formatCurrency(member.achieved)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatCurrency(member.target)}
                    </div>
                  </div>
                  <Badge variant={getPerformanceBadge(member.performance)}>
                    {member.performance}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waterfall Distribution & Role Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Waterfall Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Revenue sharing: 60% team, 20% manager, 20% company
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Team Share (60%)</span>
                <span className="financial-amount font-bold text-success">
                  {formatCurrency(managerData.waterfallDistribution.teamShare)}
                </span>
              </div>
              <Progress value={60} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Manager Share (20%)</span>
                <span className="financial-amount font-bold text-primary">
                  {formatCurrency(managerData.waterfallDistribution.managerShare)}
                </span>
              </div>
              <Progress value={20} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Company Share (20%)</span>
                <span className="financial-amount font-bold text-muted-foreground">
                  {formatCurrency(managerData.waterfallDistribution.companyShare)}
                </span>
              </div>
              <Progress value={20} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Role Distribution (8 Roles)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(managerData.roleMetrics).map(([role, metrics]) => (
              <div key={role} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium">{role}</div>
                  <div className="text-sm text-muted-foreground">
                    {metrics.count} member{metrics.count > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">
                    {metrics.avgPerformance}% avg
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 1/3rd Rule Implementation */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>1/3rd Investment Rule</CardTitle>
          <p className="text-sm text-muted-foreground">
            1/3 personal needs, 1/3 business growth, 1/3 future investments
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary-light/10 to-primary-light/5 border border-primary-light/20">
              <div className="text-sm font-medium text-primary">Personal Needs (1/3)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency(managerData.waterfallDistribution.managerShare / 3)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Living expenses & savings</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-success-light/10 to-success-light/5 border border-success-light/20">
              <div className="text-sm font-medium text-success">Business Growth (1/3)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency(managerData.waterfallDistribution.managerShare / 3)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Team development & tools</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-warning-light/10 to-warning-light/5 border border-warning-light/20">
              <div className="text-sm font-medium text-warning">Future Investments (1/3)</div>
              <div className="financial-amount text-xl font-bold mt-1">
                {formatCurrency(managerData.waterfallDistribution.managerShare / 3)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Long-term growth opportunities</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};