import { CreditCard, Calendar, AlertCircle, CheckCircle, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for Customer
const customerData = {
  customer: {
    name: "David Lee",
    accountNumber: "ACC-789456",
    totalBalance: 25400,
    currentDue: 3200,
    nextPaymentDate: '2024-02-01',
    creditLimit: 50000
  },
  installmentPlans: [
    {
      id: '1',
      name: 'Equipment Purchase - Phase 1',
      totalAmount: 15000,
      paidAmount: 9000,
      remainingAmount: 6000,
      monthlyPayment: 1500,
      nextDue: '2024-02-01',
      installmentsLeft: 4,
      status: 'active'
    },
    {
      id: '2',
      name: 'Service Package - Annual',
      totalAmount: 12000,
      paidAmount: 6000,
      remainingAmount: 6000,
      monthlyPayment: 1000,
      nextDue: '2024-02-15',
      installmentsLeft: 6,
      status: 'active'
    },
    {
      id: '3',
      name: 'Consultation Services',
      totalAmount: 5000,
      paidAmount: 5000,
      remainingAmount: 0,
      monthlyPayment: 833,
      nextDue: null,
      installmentsLeft: 0,
      status: 'completed'
    }
  ],
  paymentHistory: [
    { date: '2024-01-15', description: 'Equipment Purchase - Installment 6', amount: 1500, status: 'paid', penalty: 0 },
    { date: '2024-01-10', description: 'Service Package - Monthly Payment', amount: 1000, status: 'paid', penalty: 0 },
    { date: '2024-01-01', description: 'Equipment Purchase - Installment 5', amount: 1500, status: 'late', penalty: 75 },
    { date: '2023-12-15', description: 'Service Package - Monthly Payment', amount: 1000, status: 'paid', penalty: 0 }
  ],
  penalties: {
    totalPenalties: 150,
    activePenalties: 75,
    paidPenalties: 75
  }
};

export const CustomerDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'paid':
        return <Badge variant="default">Paid</Badge>;
      case 'late':
        return <Badge variant="destructive">Late</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'late':
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Calendar className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const creditUtilization = (customerData.customer.totalBalance / customerData.customer.creditLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Dashboard</h1>
          <p className="text-muted-foreground">Account overview and payment management</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Account Number</div>
          <div className="text-lg font-bold text-primary">{customerData.customer.accountNumber}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatCurrency(customerData.customer.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Outstanding amount
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Due</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-warning">
              {formatCurrency(customerData.customer.currentDue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Due by {formatDate(customerData.customer.nextPaymentDate)}
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-success">
              {formatCurrency(customerData.customer.creditLimit)}
            </div>
            <p className="text-xs text-muted-foreground">
              {creditUtilization.toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Penalties</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold text-destructive">
              {formatCurrency(customerData.penalties.activePenalties)}
            </div>
            <p className="text-xs text-muted-foreground">
              Late payment fees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="gap-2 h-auto p-4 flex-col">
              <CreditCard className="w-6 h-6" />
              <span>Make Payment</span>
              <span className="text-xs opacity-75">Pay current due amount</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Calendar className="w-6 h-6" />
              <span>Schedule Payment</span>
              <span className="text-xs opacity-75">Set up auto-pay</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Receipt className="w-6 h-6" />
              <span>Download Statement</span>
              <span className="text-xs opacity-75">Get monthly report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Installment Plans */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Active Installment Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerData.installmentPlans.map((plan) => (
              <div key={plan.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(plan.status)}
                    <div>
                      <h3 className="font-medium text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.status === 'active' ? `Next payment: ${formatDate(plan.nextDue)}` : 'Completed'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="financial-amount font-semibold">
                        {formatCurrency(plan.remainingAmount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        of {formatCurrency(plan.totalAmount)} remaining
                      </div>
                    </div>
                    {getStatusBadge(plan.status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {((plan.paidAmount / plan.totalAmount) * 100).toFixed(0)}% paid
                    </span>
                  </div>
                  <Progress value={(plan.paidAmount / plan.totalAmount) * 100} className="h-2" />
                </div>
                
                {plan.status === 'active' && (
                  <div className="mt-3 flex justify-between items-center p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div>
                      <div className="text-sm font-medium">Monthly Payment</div>
                      <div className="financial-amount text-lg font-bold text-primary">
                        {formatCurrency(plan.monthlyPayment)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{plan.installmentsLeft} payments left</div>
                      <Button size="sm" className="mt-1">
                        Pay Now
                      </Button>
                    </div>
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
          <CardTitle>Recent Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customerData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <div className="font-medium text-foreground">{payment.description}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(payment.date)}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`financial-amount font-semibold ${payment.status === 'paid' ? 'text-success' : 'text-destructive'}`}>
                      {formatCurrency(payment.amount)}
                    </div>
                    {payment.penalty > 0 && (
                      <div className="text-sm text-destructive">
                        +{formatCurrency(payment.penalty)} penalty
                      </div>
                    )}
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