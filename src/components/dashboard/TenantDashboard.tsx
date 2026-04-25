import { useState } from "react";
import {
  Home,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Receipt,
  Clock,
  DollarSign,
  FileText,
  Wrench,
  Lightbulb,
  Droplets,
  Shield,
  SprayCan,
  AirVent,
  Users,
  UserPlus,
  Truck,
  Package,
  Bell,
  FileWarning,
  Building,
  Key,
  CalendarDays,
  Phone,
  MessageSquare,
  Headphones,
  AlertTriangle,
  Zap,
  Trash2,
  Wifi,

  Download,
  Upload,
  Eye,
  ChevronRight,
  MapPin,
  Wallet,
  Activity,
  TrendingUp,
  CheckSquare,
  X,
  Camera,
  Video,
  Image,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Car
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { processPayment } from "@/services/paymentService";
import { generateReceiptPDF } from "@/utils/receiptGenerator";
import { useGetDashboardOverviewQuery, useGetMyBillingQuery, useInitiateRentPaymentMutation } from "@/services/estatesApi";

const tenantData = {
  tenant: {
    id: "tenant_001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+2349012345678",
    apartmentNumber: "Flat 4B",
    estateName: "Rose Garden Estate",
    leaseStatus: "active",
    leaseEndDate: "2026-12-31",
    monthlyRent: 250000,
    rentDueDay: 25,
    outstandingBalance: 0,
    nextPaymentDue: "2025-05-25"
  },
  paymentHistory: [
    { id: 1, month: "April 2025", amount: 250000, status: "paid", date: "2025-04-23", method: "Transfer" },
    { id: 2, month: "March 2025", amount: 250000, status: "paid", date: "2025-03-22", method: "Transfer" },
    { id: 3, month: "February 2025", amount: 250000, status: "paid", date: "2025-02-24", method: "Bank Deposit" },
    { id: 4, month: "January 2025", amount: 250000, status: "paid", date: "2025-01-23", method: "Transfer" }
  ],
  serviceCharges: [
    { id: 1, type: "Service Charge", month: "April 2025", amount: 15000, status: "paid", date: "2025-04-10" },
    { id: 2, type: "Service Charge", month: "March 2025", amount: 15000, status: "paid", date: "2025-03-10" },
    { id: 3, type: "Water Bill", month: "April 2025", amount: 5000, status: "pending" },
    { id: 4, type: "Electricity", month: "April 2025", amount: 12000, status: "pending" }
  ],
  maintenanceRequests: [
    {
      id: 1,
      title: "Leaking kitchen faucet",
      category: "plumbing",
      status: "in_progress",
      createdAt: "2025-04-15",
      assignedTo: "Mr. Adebayo",
      estimatedCompletion: "2025-04-25"
    },
    {
      id: 2,
      title: "AC not cooling properly",
      category: "ac_repair",
      status: "pending",
      createdAt: "2025-04-20",
      assignedTo: null,
      estimatedCompletion: null
    },
    {
      id: 3,
      title: "Broken bedroom lock",
      category: "security",
      status: "completed",
      createdAt: "2025-03-10",
      assignedTo: "Mr. Chidi",
      estimatedCompletion: "2025-03-12"
    }
  ],
  visitors: [
    {
      id: 1,
      name: "Michael Brown",
      phone: "+2348012345678",
      purpose: "Family Visit",
      expectedArrival: "2025-04-25",
      accessCode: "VST-2025-0425",
      status: "approved"
    },
    {
      id: 2,
      name: "Delivery - DHL",
      phone: "+2347000000000",
      purpose: "Package Delivery",
      expectedArrival: "2025-04-24",
      accessCode: "VST-2025-0424",
      status: "pending"
    }
  ],
  notices: [
    {
      id: 1,
      title: "Scheduled Water Shutdown",
      type: "important",
      date: "2025-04-28",
      content: "Water supply will be disrupted from 9AM to 5PM for maintenance work."
    },
    {
      id: 2,
      title: "Estate Security Update",
      type: "info",
      date: "2025-04-22",
      content: "New security protocols effective immediately. Please ensure all visitors register at the gate."
    },
    {
      id: 3,
      title: "Community Meeting",
      type: "event",
      date: "2025-05-01",
      content: "Monthly estate meeting holding at the clubhouse by 10AM."
    }
  ],
  documents: [
    { id: 1, name: "Lease Agreement", type: "lease", date: "2024-12-31" },
    { id: 2, name: "Move-in Checklist", type: "checklist", date: "2024-12-31" },
    { id: 3, name: "House Rules", type: "policy", date: "2024-12-31" }
  ],
  complaints: [
    {
      id: 1,
      title: "Excessive noise from 5B",
      category: "noise",
      status: "resolved",
      createdAt: "2025-03-15",
      response: "Warning issued to the resident."
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
    case "paid":
    case "completed":
    case "approved":
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700";
    case "pending":
    case "in_progress":
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700";
    case "expired":
    case "overdue":
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700";
    default:
      return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "plumbing":
      return Droplets;
    case "electrical":
      return Zap;
    case "ac_repair":
      return AirVent;
    case "security":
      return Shield;
    case "cleaning":
      return SprayCan;
    default:
      return Wrench;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const TenantDashboard: React.FC = () => {
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [visitorDialogOpen, setVisitorDialogOpen] = useState(false);
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({ title: "", category: "", description: "" });
  const [visitorForm, setVisitorForm] = useState({ name: "", phone: "", purpose: "" });
  const [paymentForm, setPaymentForm] = useState({ 
    type: "rent",
    amount: 0,
    method: "paystack",
    month: ""
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState<string | null>(null);

  // Fetch dashboard overview from API
  const { data: overviewData, isLoading: overviewLoading } = useGetDashboardOverviewQuery();
  const { data: billingData } = useGetMyBillingQuery();
  const [initiateRentPayment] = useInitiateRentPaymentMutation();

  // Get API data
  const apiUser = overviewData?.data?.user;
  const apiApartment = overviewData?.data?.data?.apartment;
  const apiBilling = overviewData?.data?.data?.billing;
  const apiPayments = overviewData?.data?.data?.payments;
  const billingItems = billingData?.data;

  // Calculate totals from billing
  const recurringTotal = billingItems?.recurring?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const oneTimeTotal = billingItems?.oneTime?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalDue = recurringTotal + oneTimeTotal;

  // Use API data or fallback to demo data
  const tenantInfo = apiApartment ? {
    name: apiApartment.tenantName,
    apartmentNumber: apiApartment.unit,
    estateName: apiApartment.estate,
    leaseStatus: apiApartment.status,
    leaseEndDate: apiApartment.nextDueDate,
    monthlyRent: apiApartment.rentAmount,
    rentDueDay: 25,
    outstandingBalance: apiBilling?.totalPending || 0,
    nextPaymentDue: apiApartment.nextDueDate,
    id: apiApartment.id,
    email: apiUser?.email || "",
    phone: authUser?.phone || "",
    serviceCharge: apiApartment.serviceChargeAmount,
  } : {
    name: authUser?.name || "Valued Tenant",
    apartmentNumber: "Flat 4B",
    estateName: "Rose Garden Estate",
    leaseStatus: "active",
    leaseEndDate: "2026-12-31",
    monthlyRent: 250000,
    rentDueDay: 25,
    outstandingBalance: 0,
    nextPaymentDue: "2025-05-25",
    id: "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
  };

  const displayName = tenantInfo?.name || authUser?.name || "Valued Tenant";
  const firstName = displayName?.split(" ")[0] || "Valued";
  const daysUntilRentDue = tenantInfo?.nextPaymentDue 
    ? Math.ceil((new Date(tenantInfo.nextPaymentDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 30;

  const handlePayRent = () => {
    setPaymentForm({ type: "rent", amount: tenantInfo.monthlyRent, method: "paystack", month: "Current Month" });
    setPaymentDialogOpen(true);
  };

  const handleProcessPayment = async () => {
    try {
      setIsProcessingPayment(true);
      
      // Validate form
      if (!paymentForm.amount || paymentForm.amount <= 0) {
        toast("Error: Please enter a valid amount");
        return;
      }

      toast("Processing: Payment in progress...");

      // Call the payment API based on type
      const paymentTypeMap: Record<string, string> = {
        'rent': 'rent',
        'service_charge': 'service_charge',
        'caution_fee': 'caution_fee',
        'legal_fee': 'legal_fee',
      };

      const result = await initiateRentPayment({
        amount: paymentForm.amount,
        paymentType: paymentTypeMap[paymentForm.type] || 'rent',
      }).unwrap();

      // If there's an authorization URL, open it (Paystack redirect)
      if (result.authorizationUrl) {
        window.location.href = result.authorizationUrl;
      } else {
        toast("Success: Payment received");
        setPaymentDialogOpen(false);
        setPaymentForm({ type: "rent", amount: 0, method: "paystack", month: "" });
      }
    } catch (error: any) {
      toast(error?.data?.message || "Error: Payment failed. Please try again");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleDownloadReceipt = async (paymentId: string) => {
    try {
      setDownloadingReceipt(paymentId);
      
      // Find the payment in history
      const payment = tenantData.paymentHistory.find(p => p.id.toString() === paymentId);
      if (!payment) {
        toast("Error: Receipt not found");
        return;
      }

      await generateReceiptPDF({
        receiptNumber: `RCP-${paymentId}-${Date.now()}`,
        date: payment.date,
        tenantName: tenantInfo.name,
        tenantEmail: tenantInfo.email,
        tenantPhone: tenantInfo.phone,
        apartmentNumber: tenantInfo.apartmentNumber,
        estateName: tenantInfo.estateName,
        amount: payment.amount,
        paymentType: 'rent',
        paymentMethod: payment.method,
        reference: `PAY-${paymentId}`,
        status: payment.status as any,
        month: payment.month,
      });

      toast("Success: Receipt downloaded");
    } catch (error) {
      toast("Error: Failed to download receipt");
    } finally {
      setDownloadingReceipt(null);
    }
  };

  const handleReportMaintenance = () => {
    setMaintenanceDialogOpen(true);
  };

  const handleSubmitMaintenance = () => {
    toast("Success: Request Submitted");
    setMaintenanceDialogOpen(false);
    setMaintenanceForm({ title: "", category: "", description: "" });
  };

  const handleGenerateVisitorPass = () => {
    setVisitorDialogOpen(true);
  };

  const handleSubmitVisitor = () => {
    toast("Success: Visitor Pass Generated");
    setVisitorDialogOpen(false);
    setVisitorForm({ name: "", phone: "", purpose: "" });
  };

  const handleSubmitComplaint = () => {
    toast("Success: Complaint Submitted");
    setComplaintDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap w-full gap-1 dashboard-tabs-list">
          <TabsTrigger value="overview">Home</TabsTrigger>
          <TabsTrigger value="payments">Rent</TabsTrigger>
          <TabsTrigger value="maintenance">Issues</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">Welcome back, {firstName}!</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Here's your home overview</CardDescription>
                </div>
                <Badge className={`${getStatusColor(tenantInfo.leaseStatus)} border`}>
                  {tenantInfo.leaseStatus === "active" ? "Active Lease" : "Lease Expiring"}
                </Badge>
              </div>
            </CardHeader>
<CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">Apartment</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tenantInfo.apartmentNumber}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tenantInfo.estateName}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                    <Key className="h-4 w-4" />
                    <span className="text-sm">Lease Ends</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatDate(tenantInfo.leaseEndDate)}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{tenantInfo.leaseStatus}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Next Due</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatDate(tenantInfo.nextPaymentDue)}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{daysUntilRentDue} days</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Total Due</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(totalDue)}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{billingItems?.recurring?.length || 0} recurring</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Button onClick={handlePayRent} className="h-16 flex flex-col items-center gap-1">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">Pay Rent</span>
                </Button>
                <Button onClick={handleReportMaintenance} variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <Wrench className="h-5 w-5" />
                  <span className="text-xs">Report Issue</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <Phone className="h-5 w-5" />
                  <span className="text-xs">Contact Landlord</span>
                </Button>
                <Button onClick={handleGenerateVisitorPass} variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <UserPlus className="h-5 w-5" />
                  <span className="text-xs">Visitor Pass</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">Recent Notices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenantData.notices.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{notice.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notice.content}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDate(notice.date)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">Maintenance Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenantData.maintenanceRequests.slice(0, 3).map((request) => {
                  const Icon = getCategoryIcon(request.category);
                  return (
                    <div key={request.id} className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <Icon className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{request.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {request.category.replace("_", " ")}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                            {request.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">Monthly Rent</CardTitle>
                <CardDescription>Current rent amount</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(tenantInfo.monthlyRent)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Due: {formatDate(tenantInfo.nextPaymentDue)}</p>
                <Button className="w-full mt-4" onClick={handlePayRent}>Pay Rent</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">Outstanding Balance</CardTitle>
                <CardDescription>Amount due</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(tenantInfo.outstandingBalance)}</p>
                {tenantInfo.outstandingBalance === 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">You're all caught up!</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">Service Charge</CardTitle>
                <CardDescription>Monthly service charge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(15000)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Due: {formatDate(tenantInfo.nextPaymentDue)}</p>
                <Button variant="outline" className="w-full mt-4">Pay Service Charge</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiPayments?.recentPayments?.length > 0 ? (
                  apiPayments.recentPayments.map((payment: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{payment.description || payment.type}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(payment.date)} • {payment.method || 'Transfer'}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No payment history yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-900 dark:text-white">Auto-Payment Setup</CardTitle>
                <CardDescription>Automatically pay rent on due date</CardDescription>
              </div>
              <Button variant="outline">Setup Auto-Pay</Button>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Submit Maintenance Request</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleReportMaintenance}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Your Requests</CardTitle>
              <CardDescription>{tenantData.maintenanceRequests.length} requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantData.maintenanceRequests.map((request) => {
                const Icon = getCategoryIcon(request.category);
                return (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{request.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Category: {request.category.replace("_", " ")} •{" "}
                              Submitted: {formatDate(request.createdAt)}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(request.status)}`}>
                            {request.status.replace("_", " ")}
                          </Badge>
                        </div>
                        {request.assignedTo && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm">
                              <span className="text-slate-500 dark:text-slate-400">Assigned Technician: </span>
                              <span className="font-medium">{request.assignedTo}</span>
                            </p>
                            {request.estimatedCompletion && (
                              <p className="text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Est. Completion: </span>
                                <span className="font-medium">{formatDate(request.estimatedCompletion)}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Generate Visitor Access</CardTitle>
              <CardDescription>Create temporary access codes for your visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateVisitorPass}>
                <Plus className="h-4 w-4 mr-2" />
                New Visitor Pass
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tenantData.visitors
                .filter((v) => v.status === "pending")
                .map((visitor) => (
                  <div key={visitor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{visitor.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {visitor.phone} • {visitor.purpose}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Visitor History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tenantData.visitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium">{visitor.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Expected: {formatDate(visitor.expectedArrival)} • {visitor.purpose}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(visitor.status)}`}>
                      {visitor.status}
                    </Badge>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{visitor.accessCode}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Estate Notices & Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantData.notices.map((notice) => (
                <div key={notice.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {notice.type === "important" ? (
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      ) : notice.type === "event" ? (
                        <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      ) : (
                        <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{notice.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{notice.content}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{formatDate(notice.date)}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{notice.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Your Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tenantData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(doc.date)}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Submit Complaint</CardTitle>
              <CardDescription>Report issues not related to maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setComplaintDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Complaint
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Complaint History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantData.complaints.map((complaint) => (
                <div key={complaint.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {complaint.category} • Submitted: {formatDate(complaint.createdAt)}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(complaint.status)}`}>{complaint.status}</Badge>
                  </div>
                  {complaint.response && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Response: </span>
                        {complaint.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Chat Support</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <Phone className="h-5 w-5" />
                  <span className="text-xs">Call Manager</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center gap-1">
                  <Headphones className="h-5 w-5" />
                  <span className="text-xs">Emergency</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg text-slate-900 dark:text-white">Water Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(5000)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Due: May 2025</p>
                <Button className="w-full mt-4" variant="outline">Pay Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg text-slate-900 dark:text-white">Electricity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(12000)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Due: May 2025</p>
                <Button className="w-full mt-4" variant="outline">Pay Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Trash2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <CardTitle className="text-lg text-slate-900 dark:text-white">Waste Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(2000)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Due: May 2025</p>
                <Button className="w-full mt-4" variant="outline">Pay Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Car className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg text-slate-900 dark:text-white">Generator Levy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(8000)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Due: May 2025</p>
                <Button className="w-full mt-4" variant="outline">Pay Now</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Utility Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tenantData.serviceCharges.map((charge) => (
                  <div key={charge.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium">{charge.type}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{charge.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(charge.amount)}</p>
                      <Badge className={`${getStatusColor(charge.status)}`}>{charge.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={maintenanceDialogOpen} onOpenChange={setMaintenanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Maintenance Request</DialogTitle>
            <DialogDescription>Describe the issue you need fixed</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Issue Title</Label>
              <Input
                placeholder="e.g., Leaking faucet in kitchen"
                value={maintenanceForm.title}
                onChange={(e) => setMaintenanceForm({ ...maintenanceForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={maintenanceForm.category}
                onValueChange={(value) => setMaintenanceForm({ ...maintenanceForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="ac_repair">AC Repair</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the issue in detail..."
                value={maintenanceForm.description}
                onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMaintenanceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitMaintenance}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={visitorDialogOpen} onOpenChange={setVisitorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Visitor Pass</DialogTitle>
            <DialogDescription>Create a temporary access code for your visitor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Visitor Name</Label>
              <Input
                placeholder="Enter visitor name"
                value={visitorForm.name}
                onChange={(e) => setVisitorForm({ ...visitorForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter phone number"
                value={visitorForm.phone}
                onChange={(e) => setVisitorForm({ ...visitorForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Purpose of Visit</Label>
              <Select
                value={visitorForm.purpose}
                onValueChange={(value) => setVisitorForm({ ...visitorForm, purpose: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family Visit">Family Visit</SelectItem>
                  <SelectItem value="Friend Visit">Friend Visit</SelectItem>
                  <SelectItem value="Package Delivery">Package Delivery</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVisitorDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitVisitor}>Generate Pass</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Complaint</DialogTitle>
            <DialogDescription>We're sorry you're experiencing issues</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Complaint Title</Label>
              <Input placeholder="e.g., Noise disturbance" />
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noise">Noise</SelectItem>
                  <SelectItem value="neighbor">Neighbor Issue</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Describe the issue in detail..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComplaintDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitComplaint}>Submit Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>Select your payment method and complete the transaction</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(paymentForm.amount)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Payment Type: <span className="font-semibold">{paymentForm.type.replace(/_/g, ' ').toUpperCase()}</span>
              </p>
            </div>

            {/* Payment Method Selection */}
            <div>
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div
                  onClick={() => setPaymentForm({ ...paymentForm, method: "wallet" })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentForm.method === "wallet"
                      ? "border-green-600 bg-green-50 dark:bg-green-900/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Wallet className={`h-6 w-6 mb-1 ${paymentForm.method === "wallet" ? "text-green-600" : "text-slate-500"}`} />
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">Wallet</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Instant pay</p>
                </div>
                <div
                  onClick={() => setPaymentForm({ ...paymentForm, method: "paystack" })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentForm.method === "paystack"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <CreditCard className={`h-6 w-6 mb-1 ${paymentForm.method === "paystack" ? "text-blue-600" : "text-slate-500"}`} />
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">Paystack</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Card, Transfer</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">
                A secure payment window will open after you click "Pay Now". Your payment is protected.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPaymentDialogOpen(false)}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleProcessPayment}
              disabled={isProcessingPayment || paymentForm.amount <= 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessingPayment ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay {formatCurrency(paymentForm.amount)}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};