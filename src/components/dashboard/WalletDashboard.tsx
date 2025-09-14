import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { WALLET_DATA, RECENT_TRANSACTIONS, calculateSplit } from "@/data/demoData";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PiggyBank,
  CreditCard,
  Settings
} from "lucide-react";

export const WalletDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [transactionFilter, setTransactionFilter] = useState("all");

  // Get wallet data based on user role
  const getWalletData = () => {
    const role = user?.role || 'owner';
    return WALLET_DATA[role as keyof typeof WALLET_DATA] || WALLET_DATA.owner;
  };

  const walletData = getWalletData();
  const transactions = RECENT_TRANSACTIONS;

  // Calculate allocation percentages
  const totalAllocations = walletData.allocations.investment + 
                          walletData.allocations.withdrawals + 
                          walletData.allocations.operations;

  const allocationPercentages = {
    investment: (walletData.allocations.investment / totalAllocations) * 100,
    withdrawals: (walletData.allocations.withdrawals / totalAllocations) * 100,
    operations: (walletData.allocations.operations / totalAllocations) * 100,
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilter === 'all') return true;
    return transaction.type === transactionFilter;
  });

  const getTransactionIcon = (type: string) => {
    return type === 'inflow' ? ArrowUpRight : ArrowDownRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'inflow' ? 'text-green-600' : 'text-red-600';
  };

  // Calculate recursive 50/30/20 split for each allocation
  const investmentSplit = calculateSplit(walletData.allocations.investment);
  const withdrawalsSplit = calculateSplit(walletData.allocations.withdrawals);
  const operationsSplit = calculateSplit(walletData.allocations.operations);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Universal Wallet</h1>
          <p className="text-muted-foreground">
            {user?.role === 'owner' ? 'Master' : user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Wallet - 50/30/20 Split Management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Transfer Funds</Button>
          <Button>Add Transaction</Button>
        </div>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{walletData.balance.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {walletData.pendingTransactions} pending transactions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Inflow</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₦{walletData.monthlyInflow.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Revenue & income</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Outflow</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₦{walletData.monthlyOutflow.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Expenses & investments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              walletData.monthlyInflow - walletData.monthlyOutflow > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ₦{(walletData.monthlyInflow - walletData.monthlyOutflow).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Monthly net position</div>
          </CardContent>
        </Card>
      </div>

      {/* 50/30/20 Allocation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            50/30/20 Fund Allocation
          </CardTitle>
          <CardDescription>Automated allocation of funds following the 50/30/20 rule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Investment Portfolio (50%) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Investment Portfolio
                  <Badge variant="default">50%</Badge>
                </CardTitle>
                <CardDescription>Growth & innovation focused</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Allocated</span>
                    <span className="font-semibold">₦{walletData.allocations.investment.toLocaleString()}</span>
                  </div>
                  <Progress value={allocationPercentages.investment} className="h-2" />
                </div>
                
                {/* Recursive 50/30/20 within Investment */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-sm font-medium">Recursive Split:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Investment (50%)</span>
                      <span>₦{investmentSplit.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withdrawals (30%)</span>
                      <span>₦{investmentSplit.withdrawals.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations (20%)</span>
                      <span>₦{investmentSplit.operations.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Withdrawals (30%) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  {user?.role === 'owner' ? 'Owner Withdrawals' : 'Profit Share'}
                  <Badge variant="secondary">30%</Badge>
                </CardTitle>
                <CardDescription>
                  {user?.role === 'owner' ? 'Pocket money & personal use' : 'Your profit allocation'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Allocated</span>
                    <span className="font-semibold">₦{walletData.allocations.withdrawals.toLocaleString()}</span>
                  </div>
                  <Progress value={allocationPercentages.withdrawals} className="h-2" />
                </div>
                
                {/* Recursive 50/30/20 within Withdrawals */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-sm font-medium">Recursive Split:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Investment (50%)</span>
                      <span>₦{withdrawalsSplit.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withdrawals (30%)</span>
                      <span>₦{withdrawalsSplit.withdrawals.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations (20%)</span>
                      <span>₦{withdrawalsSplit.operations.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operations Retainer (20%) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Operations Retainer
                  <Badge variant="outline">20%</Badge>
                </CardTitle>
                <CardDescription>System maintenance & operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Allocated</span>
                    <span className="font-semibold">₦{walletData.allocations.operations.toLocaleString()}</span>
                  </div>
                  <Progress value={allocationPercentages.operations} className="h-2" />
                </div>
                
                {/* Recursive 50/30/20 within Operations */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-sm font-medium">Recursive Split:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Investment (50%)</span>
                      <span>₦{operationsSplit.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withdrawals (30%)</span>
                      <span>₦{operationsSplit.withdrawals.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations (20%)</span>
                      <span>₦{operationsSplit.operations.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <TabsList>
              <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="allocations">Allocation History</TabsTrigger>
              <TabsTrigger value="transfers">Fund Transfers</TabsTrigger>
              <TabsTrigger value="settings">Wallet Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="recent-transactions" className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Input 
                  placeholder="Search transactions..." 
                  className="max-w-sm" 
                />
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md"
                >
                  <option value="all">All Transactions</option>
                  <option value="inflow">Inflows</option>
                  <option value="outflow">Outflows</option>
                </select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.slice(0, 10).map((transaction) => {
                      const Icon = getTransactionIcon(transaction.type);
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${getTransactionColor(transaction.type)}`} />
                              {transaction.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === 'inflow' ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
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