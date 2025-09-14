import { useState } from "react";
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Receipt, 
  Upload,
  Download,
  Eye,
  Clock,
  DollarSign,
  FileText,
  CheckSquare,
  X,
  Camera,
  Video,
  Image,
  Play
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";

// Enhanced Customer Demo Data
const customerData = {
  customer: {
    id: "cus_123",
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+234901234567",
    accountNumber: "ACC-789456",
    walletBalance: 450000,
    totalContracts: 3,
    activeContracts: 2,
    completedProjects: 8,
    totalBalance: 580000,
    currentDue: 72000,
    creditLimit: 1500000,
    nextPaymentDate: "2024-02-15"
  },
  
  // Active Contracts with Payment Options and Delivery Tracking
  contracts: [
    {
      id: "contract_001",
      projectName: "Estate Property Maintenance",
      vendorName: "ABC Construction Ltd",
      vendorId: "ven_789",
      totalAmount: 1200000,
      paymentOption: "installment",
      
      // Installment Details
      upfrontDeposit: 480000, // 40%
      remainingBalance: 720000,
      interestRate: 0.20, // 20% annual
      balanceWithInterest: 864000, // 720000 + 20%
      monthlyPayment: 72000, // 864000 / 12 months
      paymentsRemaining: 8,
      nextPaymentDue: "2024-02-15",
      latePenaltyPerDay: 300,
      cancellationFee: 240000, // 20% of contract value
      
      // Delivery Stages (1/3rd, 1/3rd, 1/3rd)
      deliveryStages: [
        {
          stage: 1,
          name: "Foundation & Planning",
          amount: 400000, // 1/3rd
          status: "completed",
          vendorProofUploads: [
            {
              id: "proof_001",
              type: "photo",
              fileName: "foundation_progress.jpg",
              uploadDate: "2024-01-20",
              description: "Foundation work completed as per specifications"
            },
            {
              id: "proof_002", 
              type: "video",
              fileName: "foundation_walkthrough.mp4",
              uploadDate: "2024-01-21",
              description: "Video walkthrough of completed foundation work"
            }
          ],
          customerAcknowledged: true,
          acknowledgedDate: "2024-01-22",
          customerNotes: "Foundation work looks excellent. Approved for payment release.",
          paymentReleased: true,
          paymentReleaseDate: "2024-01-22"
        },
        {
          stage: 2,
          name: "Structure & Roofing",
          amount: 400000,
          status: "in_progress",
          vendorProofUploads: [
            {
              id: "proof_003",
              type: "photo",
              fileName: "roofing_progress.jpg",
              uploadDate: "2024-02-10",
              description: "Roofing 80% completed, awaiting customer review"
            }
          ],
          customerAcknowledged: false,
          acknowledgedDate: null,
          customerNotes: null,
          paymentReleased: false,
          paymentReleaseDate: null
        },
        {
          stage: 3,
          name: "Finishing & Handover",
          amount: 400000,
          status: "pending",
          vendorProofUploads: [],
          customerAcknowledged: false,
          acknowledgedDate: null,
          customerNotes: null,
          paymentReleased: false,
          paymentReleaseDate: null
        }
      ],
      
      status: "active",
      startDate: "2024-01-15",
      expectedCompletionDate: "2024-04-15",
      escrowAccount: "OPAY_ESC_001",
      escrowBalance: 864000
    },
    
    {
      id: "contract_002", 
      projectName: "Equipment Rental - Excavator",
      vendorName: "Heavy Equipment Rentals",
      vendorId: "ven_456",
      totalAmount: 800000,
      paymentOption: "one_time",
      
      // One-time Payment Details
      upfrontDeposit: 800000, // 100%
      remainingBalance: 0,
      interestRate: 0,
      balanceWithInterest: 0,
      monthlyPayment: 0,
      paymentsRemaining: 0,
      nextPaymentDue: null,
      latePenaltyPerDay: 0,
      cancellationFee: 160000, // 20% of contract value
      
      // Delivery Stages
      deliveryStages: [
        {
          stage: 1,
          name: "Equipment Delivery & Setup",
          amount: 266667, // 1/3rd
          status: "completed",
          vendorProofUploads: [
            {
              id: "proof_004",
              type: "photo",
              fileName: "equipment_delivered.jpg",
              uploadDate: "2024-02-01",
              description: "Excavator delivered and set up on site"
            }
          ],
          customerAcknowledged: true,
          acknowledgedDate: "2024-02-01",
          customerNotes: "Equipment delivered in perfect condition.",
          paymentReleased: true,
          paymentReleaseDate: "2024-02-01"
        },
        {
          stage: 2,
          name: "Operation & Maintenance",
          amount: 266667,
          status: "completed",
          vendorProofUploads: [
            {
              id: "proof_005",
              type: "document",
              fileName: "maintenance_log.pdf",
              uploadDate: "2024-02-08",
              description: "Weekly maintenance and operation logs"
            }
          ],
          customerAcknowledged: true,
          acknowledgedDate: "2024-02-09",
          customerNotes: "Equipment working perfectly, maintenance up to standard.",
          paymentReleased: true,
          paymentReleaseDate: "2024-02-09"
        },
        {
          stage: 3,
          name: "Project Completion & Return",
          amount: 266666,
          status: "in_progress",
          vendorProofUploads: [],
          customerAcknowledged: false,
          acknowledgedDate: null,
          customerNotes: null,
          paymentReleased: false,
          paymentReleaseDate: null
        }
      ],
      
      status: "active",
      startDate: "2024-02-01",
      expectedCompletionDate: "2024-02-28",
      escrowAccount: "OPAY_ESC_002", 
      escrowBalance: 266666
    }
  ],
  
  // Payment History
  paymentHistory: [
    {
      id: "pay_001",
      contractId: "contract_001",
      date: "2024-01-15",
      description: "Estate Maintenance - Upfront Deposit (40%)",
      amount: 480000,
      type: "deposit",
      status: "completed",
      method: "bank_transfer",
      penalty: 0
    },
    {
      id: "pay_002",
      contractId: "contract_001", 
      date: "2024-01-22",
      description: "Stage 1 Payment Release to Vendor",
      amount: 400000,
      type: "stage_payment",
      status: "released_to_vendor",
      method: "escrow_release",
      penalty: 0
    },
    {
      id: "pay_003",
      contractId: "contract_001",
      date: "2024-02-15",
      description: "Monthly Installment Payment",
      amount: 72000,
      type: "installment",
      status: "overdue",
      method: "auto_debit",
      penalty: 900, // 3 days × ₦300
      daysOverdue: 3
    },
    {
      id: "pay_004",
      contractId: "contract_002",
      date: "2024-02-01",
      description: "Equipment Rental - Full Payment",
      amount: 800000,
      type: "full_payment",
      status: "completed",
      method: "wallet_debit",
      penalty: 0
    }
  ],
  
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
  penalties: {
    totalPenalties: 150,
    activePenalties: 75,
    paidPenalties: 75
  }
};

export const CustomerDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNaira = (amount: number) => {
    return `₦${formatCurrency(amount)}`;
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-amount text-2xl font-bold">
              {formatNaira(customerData.customer.totalBalance)}
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
              {formatNaira(customerData.customer.currentDue)}
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
              {formatNaira(customerData.customer.creditLimit)}
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
              {formatNaira(customerData.penalties.activePenalties)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Button className="gap-2 h-auto p-3 md:p-4 flex-col text-xs md:text-sm">
              <CreditCard className="w-6 h-6" />
              <span>Make Payment</span>
              <span className="text-xs opacity-75">Pay current due amount</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-3 md:p-4 flex-col text-xs md:text-sm">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              <span>Schedule Payment</span>
              <span className="text-xs opacity-75 hidden md:block">Set up auto-pay</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-3 md:p-4 flex-col text-xs md:text-sm">
              <Receipt className="w-5 h-5 md:w-6 md:h-6" />
              <span>Download Statement</span>
              <span className="text-xs opacity-75 hidden md:block">Get monthly report</span>
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
                <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {getStatusIcon(plan.status)}
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm md:text-base">{plan.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {plan.status === 'active' ? `Next payment: ${formatDate(plan.nextDue)}` : 'Completed'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <div className="financial-amount font-semibold text-sm md:text-base">
                        {formatNaira(plan.remainingAmount)}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        of {formatNaira(plan.totalAmount)} remaining
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
                  <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-primary/5 border border-primary/20 gap-3">
                    <div>
                      <div className="text-xs md:text-sm font-medium">Monthly Payment</div>
                      <div className="financial-amount text-base md:text-lg font-bold text-primary">
                        {formatNaira(plan.monthlyPayment)}
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <div className="text-xs md:text-sm font-medium">{plan.installmentsLeft} payments left</div>
                      <Button size="sm" className="mt-1 w-full sm:w-auto">
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
              <div key={index} className="flex flex-col sm:flex-row items-start justify-between p-3 rounded-lg border border-border gap-3">
                <div className="flex items-start space-x-3 flex-1">
                  {getStatusIcon(payment.status)}
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm md:text-base">{payment.description}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{formatDate(payment.date)}</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <div className={`financial-amount font-semibold text-sm md:text-base ${payment.status === 'paid' ? 'text-success' : 'text-destructive'}`}>
                      {formatNaira(payment.amount)}
                    </div>
                    {payment.penalty > 0 && (
                      <div className="text-xs md:text-sm text-destructive">
                        +{formatNaira(payment.penalty)} penalty
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