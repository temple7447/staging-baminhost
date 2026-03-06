import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Sprout, 
  Store, 
  Settings, 
  Bell, 
  CircleDollarSign, 
  TrendingUp, 
  Combine, 
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  RefreshCw,
  CreditCard,
  FileText,
  BarChart3,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  PieChart,
  Target,
  Landmark
} from 'lucide-react';
import { useGetAllEstatesOverviewQuery } from '@/services/estatesApi';
import { useGetVendorsQuery } from '@/services/vendorsApi';
import { useNavigate } from 'react-router-dom';

export const AccountingManagement = () => {
  const navigate = useNavigate();
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useGetAllEstatesOverviewQuery();
  const { data: vendors, isLoading: vendorsLoading, refetch: refetchVendors } = useGetVendorsQuery();

  const handleRefresh = () => {
    refetchOverview();
    refetchVendors();
  };

  if (overviewLoading || vendorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const estateData = overview?.data;
  const vendorCount = vendors?.data?.length || 0;

  return (
    <div className="flex flex-col gap-6 p-1 md:p-1">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Combine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Accounting Management</h1>
            <p className="text-xs text-slate-500 font-medium">Global financial oversight across business units</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="gap-2 border-slate-200 dark:border-slate-800"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </Button>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-800">
            <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer relative">
              <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer" onClick={() => navigate('/dashboard/settings')}>
              <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-blue-500/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Managed Assets <Building className="w-3 h-3 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-900 dark:text-white">
                  {estateData?.units?.totalUnits || 0}
                </div>
                <div className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1">
                  Across {estateData?.estates?.totalEstates || 0} Estates
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-blue-500/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  30D Revenue <CircleDollarSign className="w-3 h-3 text-emerald-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">
                  ₦{(estateData?.revenue?.last30Days?.amount || 0).toLocaleString()}
                </div>
                <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {estateData?.revenue?.last30Days?.transactionCount || 0} Transactions
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900 dark:bg-blue-600/10 border-blue-700 dark:border-blue-500/20 shadow-sm overflow-hidden group hover:border-blue-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-blue-100 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  Global Net Yield <TrendingUp className="w-3 h-3 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-100 dark:text-white">
                  {Math.round((estateData?.units?.occupancyRate || 0) * 100)}%
                </div>
                <div className="mt-2 text-xs font-bold text-slate-400 dark:text-slate-500 font-normal">
                  Combined Occupancy Rate
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Unit Performance Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight underline decoration-blue-500/30 underline-offset-8">Unit Performance</h2>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">Real-time Stats</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Estate & Rentals */}
              <Card className="bg-white dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 rounded-xl">
                      <Building className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-md font-bold text-slate-900 dark:text-white">Estate & Rentals</CardTitle>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[10px] uppercase font-black tracking-widest">Active</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Due in 7D</div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">{estateData?.tenants?.dueSoon7Days || 0}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Due in 30D</div>
                      <div className="text-lg font-black text-blue-600 dark:text-blue-400">{estateData?.tenants?.dueSoon30Days || 0}</div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate('/dashboard/estate')} className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 font-bold rounded-lg transition-all border-none shadow-none">
                    View All Estates
                  </Button>
                </CardContent>
              </Card>

              {/* Vendor Marketplace */}
              <Card className="bg-white dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600/10 rounded-xl">
                      <Store className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-md font-bold text-slate-900 dark:text-white">Vendor Marketplace</CardTitle>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[10px] uppercase font-black tracking-widest">{vendorCount > 0 ? 'Scaling' : 'Empty'}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Vendors</div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">{vendorCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Active Services</div>
                      <div className="text-lg font-black text-purple-600 dark:text-purple-400">Multiple</div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate('/dashboard/people')} className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white text-slate-600 dark:text-slate-300 font-bold rounded-lg transition-all border-none shadow-none">
                    Manage Vendors
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Statements Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 dark:text-white tracking-tight underline decoration-emerald-500/30 underline-offset-8">Financial Statements</h2>
                <Badge variant="outline" className="bg-slate-800 dark:bg-slate-800 text-slate-300 dark:text-slate-400 font-mono">YTD Summary</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Income Statement */}
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-600/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-md font-bold text-slate-100">Income Statement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Revenue</span>
                      <span className="text-emerald-400 font-bold">₦{(estateData?.revenue?.yearToDate?.amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Operating Expenses</span>
                      <span className="text-red-400 font-bold">₦2,450,000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-slate-300">Net Income</span>
                      <span className="text-emerald-400">₦1,550,000</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-emerald-600 text-slate-100 font-bold">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Cash Flow */}
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800 hover:border-blue-500/50 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-xl">
                      <CircleDollarSign className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-md font-bold text-slate-100">Cash Flow</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Operating Cash Flow</span>
                      <span className="text-blue-400 font-bold">₦3,200,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Investing Cash Flow</span>
                      <span className="text-red-400 font-bold">-₦800,000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-slate-300">Net Cash Flow</span>
                      <span className="text-blue-400">₦2,400,000</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-blue-600 text-slate-100 font-bold">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Balance Sheet Summary */}
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800 hover:border-purple-500/50 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600/20 rounded-xl">
                      <Landmark className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-md font-bold text-slate-100">Balance Sheet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Assets</span>
                      <span className="text-purple-400 font-bold">₦15,500,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Liabilities</span>
                      <span className="text-red-400 font-bold">₦3,200,000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-slate-300">Net Equity</span>
                      <span className="text-purple-400">₦12,300,000</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-purple-600 text-slate-100 font-bold">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Accounts Management Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 dark:text-white tracking-tight underline decoration-orange-500/30 underline-offset-8">Accounts Management</h2>
                <Badge variant="outline" className="bg-slate-800 dark:bg-slate-800 text-slate-300 dark:text-slate-400 font-mono">Active Tracking</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accounts Receivable */}
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600/20 rounded-xl">
                      <CreditCard className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-md font-bold text-slate-100">Accounts Receivable</CardTitle>
                      <Badge className="bg-orange-500/10 text-orange-400 border-none text-[9px] uppercase font-black tracking-widest mt-1">Invoices Due</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 border-t border-slate-700 pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Current</div>
                      <div className="text-lg font-black text-orange-400">₦2.4M</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">30-60D</div>
                      <div className="text-lg font-black text-yellow-400">₦850K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">90+ D</div>
                      <div className="text-lg font-black text-red-400">₦320K</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-orange-600 text-slate-100 font-bold">
                    Manage Invoices
                  </Button>
                </CardContent>
              </Card>

              {/* Accounts Payable */}
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/20 rounded-xl">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <CardTitle className="text-md font-bold text-slate-100">Accounts Payable</CardTitle>
                      <Badge className="bg-red-500/10 text-red-400 border-none text-[9px] uppercase font-black tracking-widest mt-1">Bills Due</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 border-t border-slate-700 pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Current</div>
                      <div className="text-lg font-black text-emerald-400">₦1.2M</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">30-60D</div>
                      <div className="text-lg font-black text-blue-400">₦450K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">90+ D</div>
                      <div className="text-lg font-black text-slate-400">₦0</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-red-600 text-slate-100 font-bold">
                    Pay Bills
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Analysis Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 dark:text-white tracking-tight underline decoration-cyan-500/30 underline-offset-8">Financial Analysis</h2>
                <Badge variant="outline" className="bg-slate-800 dark:bg-slate-800 text-slate-300 dark:text-slate-400 font-mono">Metrics & Ratios</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Profit Margin', value: '42.3%', color: 'text-emerald-400', icon: Target },
                { label: 'ROI', value: '28.5%', color: 'text-blue-400', icon: BarChart3 },
                { label: 'Debt Ratio', value: '20.6%', color: 'text-amber-400', icon: TrendingDown },
                { label: 'Current Ratio', value: '4.84:1', color: 'text-purple-400', icon: PieChart },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <Card key={i} className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">{metric.label}</div>
                          <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
                        </div>
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Reconciliation & Audit Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 dark:text-white tracking-tight underline decoration-green-500/30 underline-offset-8">Reconciliation & Audit</h2>
                <Badge variant="outline" className="bg-slate-800 dark:bg-slate-800 text-slate-300 dark:text-slate-400 font-mono">Compliance Check</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600/20 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle className="text-md font-bold text-slate-100">Bank Reconciliation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Book Balance</span>
                      <span className="text-slate-100 font-bold">₦8,542,300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bank Balance</span>
                      <span className="text-slate-100 font-bold">₦8,542,300</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                      <span className="text-emerald-400">Status</span>
                      <span className="text-emerald-400">Reconciled</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-emerald-600 text-slate-100 font-bold">
                    View Transactions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600/20 rounded-xl">
                      <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <CardTitle className="text-md font-bold text-slate-100">Audit Trail</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Audit</span>
                      <span className="text-slate-100 font-bold">Mar 1, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Entries Logged</span>
                      <span className="text-slate-100 font-bold">2,453</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                      <span className="text-indigo-400">Status</span>
                      <span className="text-indigo-400">Active</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-slate-700 hover:bg-indigo-600 text-slate-100 font-bold">
                    View Audit Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tax & Compliance Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 dark:text-white tracking-tight underline decoration-pink-500/30 underline-offset-8">Tax & Compliance</h2>
                <Badge variant="outline" className="bg-slate-800 dark:bg-slate-800 text-slate-300 dark:text-slate-400 font-mono">Regulatory</Badge>
              </div>
            </div>

            <Card className="bg-slate-800 dark:bg-slate-900/30 border-slate-700 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Tax Summary</div>
                    <div className="text-2xl font-black text-slate-100 mb-2">₦847,500</div>
                    <div className="text-xs text-slate-400">YTD Tax Liability</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Compliance Status</div>
                    <div className="text-2xl font-black text-emerald-400 mb-2">100%</div>
                    <div className="text-xs text-slate-400">All Filings Current</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Next Filing</div>
                    <div className="text-sm font-black text-slate-100 mb-2">Q2 2026</div>
                    <div className="text-xs text-slate-400">In 45 days</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Deductions Available</div>
                    <div className="text-2xl font-black text-blue-400 mb-2">₦253,000</div>
                    <div className="text-xs text-slate-400">Current Period</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Audit & Pending */}
        <div className="flex flex-col gap-6">
          <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/60 pb-3 border-b border-slate-100 dark:border-slate-800/50 px-4">
              <CardTitle className="text-xs font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">Operational Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {[
                  { msg: 'System Audit', sub: 'Completed successfully', color: 'bg-emerald-500' },
                  { msg: 'Revenue Synced', sub: 'Last 30 days verified', color: 'bg-blue-500' },
                  { msg: 'Vendor Check', sub: 'All accounts active', color: 'bg-indigo-500' },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center gap-3 hover:bg-slate-700 dark:hover:bg-slate-700/50 transition-colors cursor-pointer text-slate-100 dark:text-white">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{item.msg}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-500">{item.sub}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-24 h-24 rotate-12" />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-black tracking-tight">Pending Payouts</h3>
              <div className="text-3xl font-black">
                {estateData?.payments?.pendingCount || 0}
              </div>
              <p className="text-xs text-blue-100 font-medium">Payments awaiting verification or batch processing.</p>
              <Button size="sm" variant="secondary" className="w-full font-black text-blue-600">
                Process Batch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
