import { Upload, CheckCircle, Clock, DollarSign, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for Vendor
const vendorData = {
  vendor: {
    name: "Alice Brown",
    company: "BuildTech Solutions",
    totalEarnings: 45800,
    monthlyEarnings: 8200,
    completedProjects: 23,
    activeProjects: 4
  },
  projects: [
    { 
      id: '1', 
      name: 'Office Renovation Phase 2', 
      status: 'in_progress', 
      progress: 75, 
      value: 15000, 
      deadline: '2024-02-15',
      proofRequired: true
    },
    { 
      id: '2', 
      name: 'HVAC System Installation', 
      status: 'pending_approval', 
      progress: 100, 
      value: 8500, 
      deadline: '2024-01-20',
      proofRequired: true
    },
    { 
      id: '3', 
      name: 'Security System Upgrade', 
      status: 'approved', 
      progress: 100, 
      value: 12000, 
      deadline: '2024-01-10',
      proofRequired: false
    },
    { 
      id: '4', 
      name: 'Parking Lot Maintenance', 
      status: 'in_progress', 
      progress: 30, 
      value: 6500, 
      deadline: '2024-02-28',
      proofRequired: true
    }
  ],
  payments: [
    { date: '2024-01-15', description: 'Security System - Final Payment', amount: 12000, status: 'paid' },
    { date: '2024-01-10', description: 'HVAC Installation - Progress Payment', amount: 4250, status: 'paid' },
    { date: '2024-01-05', description: 'Office Renovation - Milestone 2', amount: 7500, status: 'paid' },
    { date: '2024-01-20', description: 'HVAC Installation - Final Payment', amount: 4250, status: 'pending' }
  ]
};

export const VendorDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'pending_approval':
        return <Badge variant="outline">Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'paid':
        return <Badge variant="default">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending_approval':
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Project management and proof of work submissions</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Active Projects</div>
          <div className="text-2xl font-bold text-primary">{vendorData.vendor.activeProjects}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-success">
              {formatCurrency(vendorData.vendor.monthlyEarnings)}
            </div>
            <p className="text-xs text-muted-foreground">
              This month's income
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatCurrency(vendorData.vendor.totalEarnings)}
            </div>
            <p className="text-xs text-muted-foreground">
              All-time earnings
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-primary">
              {vendorData.vendor.completedProjects}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-warning">
              {vendorData.vendor.activeProjects}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working on
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card className="financial-card">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Active Projects</CardTitle>
          <Button size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Proof of Work
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorData.projects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(project.status)}
                    <div>
                      <h3 className="font-medium text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDate(project.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="financial-amount font-semibold">
                        {formatCurrency(project.value)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Project value
                      </div>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                {project.proofRequired && project.progress === 100 && project.status === 'pending_approval' && (
                  <div className="mt-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-warning">
                        Proof of work required for final approval
                      </span>
                    </div>
                  </div>
                )}
                
                {project.status === 'in_progress' && (
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Submit Progress Report
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Files
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vendorData.payments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <div className="font-medium text-foreground">{payment.description}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(payment.date)}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`financial-amount font-semibold ${payment.status === 'paid' ? 'text-success' : 'text-warning'}`}>
                    {formatCurrency(payment.amount)}
                  </div>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};