import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { calculateSplit } from "@/data/consolidatedDemoData";
import { useGetGlobalWalletSummaryQuery } from "@/services/walletApi";
import { WalletCard } from "./WalletCard";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PiggyBank,
  CreditCard,
  Settings,
  Loader,
  AlertCircle
} from "lucide-react";

export const WalletDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [transactionFilter, setTransactionFilter] = useState("all");
  
  // Fetch global wallet summary from API
  const { data: walletResponse, isLoading: walletLoading, error: walletError } = useGetGlobalWalletSummaryQuery();
  const globalWalletData = walletResponse?.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Universal Wallet</h1>
          <p className="text-muted-foreground">
            Global wallet management across all 3 engines - 50/30/20 Split Management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Transfer Funds</Button>
          <Button>Add Transaction</Button>
        </div>
      </div>

      {/* Global Wallet Summary - 3 Engines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Global Wallet Summary
          </CardTitle>
          <CardDescription>Aggregated wallet data across all 3 engines (Growth, Fulfillment, Innovation)</CardDescription>
        </CardHeader>
        <CardContent>
          {walletLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading wallet summary...</span>
            </div>
          ) : walletError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-semibold">Error loading wallet data</p>
              <p className="text-sm mt-1">Unable to fetch global wallet summary. Please try refreshing.</p>
            </div>
          ) : globalWalletData ? (
            <div className="space-y-6">
              {/* Growth Engine */}
              <div className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Growth Engine</h3>
                    <p className="text-sm text-muted-foreground">Primary revenue & scaling focus</p>
                  </div>
                  <Badge className="bg-blue-900 text-blue-100">{globalWalletData.growthEngine.percentage}% Allocation</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WalletCard
                    label={globalWalletData.growthEngine.marketing.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.growthEngine.marketing.balance}
                    percentage={globalWalletData.growthEngine.marketing.percentage}
                    showProgress
                  />
                  <WalletCard
                    label={globalWalletData.growthEngine.operations.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.growthEngine.operations.balance}
                    percentage={globalWalletData.growthEngine.operations.percentage}
                    showProgress
                  />
                  <WalletCard
                    label={globalWalletData.growthEngine.savings.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.growthEngine.savings.balance}
                    percentage={globalWalletData.growthEngine.savings.percentage}
                    showProgress
                  />
                </div>
                <div className="mt-4 flex justify-between items-center p-3 bg-slate-700 rounded">
                  <span className="font-medium">Growth Engine Total</span>
                  <span className="text-lg font-bold text-blue-700">₦{globalWalletData.growthEngine.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Fulfillment Engine */}
              <div className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Fulfillment Engine</h3>
                    <p className="text-sm text-muted-foreground">Service delivery & execution</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{globalWalletData.fulfillmentEngine.percentage}% Allocation</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WalletCard
                    label={globalWalletData.fulfillmentEngine.marketing.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.fulfillmentEngine.marketing.balance}
                    percentage={globalWalletData.fulfillmentEngine.marketing.percentage}
                    showProgress
                  />
                  <WalletCard
                    label={globalWalletData.fulfillmentEngine.operations.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.fulfillmentEngine.operations.balance}
                    percentage={globalWalletData.fulfillmentEngine.operations.percentage}
                    showProgress
                  />
                  <WalletCard
                    label="Family Savings"
                    value={globalWalletData.fulfillmentEngine.savings.balance}
                    percentage={globalWalletData.fulfillmentEngine.savings.percentage}
                    showProgress
                  />
                </div>
                <div className="mt-4 flex justify-between items-center p-3 bg-slate-700 rounded">
                  <span className="font-medium">Fulfillment Engine Total</span>
                  <span className="text-lg font-bold text-green-700">₦{globalWalletData.fulfillmentEngine.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Innovation Engine */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Innovation Engine</h3>
                    <p className="text-sm text-muted-foreground">Research, development & experimentation</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">{globalWalletData.innovationEngine.percentage}% Allocation</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WalletCard
                    label={globalWalletData.innovationEngine.marketing.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.innovationEngine.marketing.balance}
                    percentage={globalWalletData.innovationEngine.marketing.percentage}
                    showProgress
                  />
                  <WalletCard
                    label={globalWalletData.innovationEngine.operations.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.innovationEngine.operations.balance}
                    percentage={globalWalletData.innovationEngine.operations.percentage}
                    showProgress
                  />
                  <WalletCard
                    label={globalWalletData.innovationEngine.savings.name.split(' ').slice(-1)[0]}
                    value={globalWalletData.innovationEngine.savings.balance}
                    percentage={globalWalletData.innovationEngine.savings.percentage}
                    showProgress
                  />
                </div>
                <div className="mt-4 flex justify-between items-center p-3 bg-slate-700 rounded">
                  <span className="font-medium">Innovation Engine Total</span>
                  <span className="text-lg font-bold text-purple-700">₦{globalWalletData.innovationEngine.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Global Summary */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Global Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <WalletCard
                    label="Total Balance"
                    value={globalWalletData.summary.totalBalance}
                    variant="summary"
                  />
                  <WalletCard
                    label="Total Received"
                    value={globalWalletData.summary.totalReceived}
                    variant="summary"
                  />
                  <WalletCard
                    label="Total Marketing"
                    value={globalWalletData.summary.totalMarketing}
                    variant="summary"
                  />
                  <WalletCard
                    label="Total Operations"
                    value={globalWalletData.summary.totalOperations}
                    variant="summary"
                  />
                  <WalletCard
                    label="Total Savings"
                    value={globalWalletData.summary.totalSavings}
                    variant="summary"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No wallet data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions & Management */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>View and manage all wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent-transactions" className="space-y-4">
            <TabsList className="dashboard-tabs-list">
              <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="allocations">Allocation History</TabsTrigger>
              <TabsTrigger value="transfers">Fund Transfers</TabsTrigger>
              <TabsTrigger value="settings">Wallet Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="recent-transactions" className="space-y-4">
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Recent Transactions</h3>
                <p className="text-muted-foreground">Transaction history coming soon - API integration in progress</p>
                <Button className="mt-4">Refresh Data</Button>
              </div>
            </TabsContent>

            <TabsContent value="allocations" className="space-y-4">
              <div className="text-center py-8">
                <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Allocation History</h3>
                <p className="text-muted-foreground">Track historical 50/30/20 allocations and performance</p>
                <Button className="mt-4">View Full History</Button>
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Transfer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Transfer To</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="">Select recipient...</option>
                        <option value="investment">Investment Portfolio</option>
                        <option value="operations">Operations Fund</option>
                        <option value="big7">Big 7 Member</option>
                        <option value="manager">Manager Wallet</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input type="number" placeholder="Enter amount..." />
                    </div>
                    <Button className="w-full">Initiate Transfer</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pending Transfers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <div>
                          <div className="font-medium">To Investment</div>
                          <div className="text-sm text-muted-foreground">₦500,000</div>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">No other pending transfers</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="text-center py-8">
                <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Wallet Settings</h3>
                <p className="text-muted-foreground">Configure wallet preferences, notifications, and security</p>
                <Button className="mt-4">Open Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};