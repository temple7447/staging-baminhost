import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/providers/ToastProvider";

interface Transaction {
  id: number | string;
  date: string;
  description: string;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  status: string;
  reference: string;
}

interface TransactionsPanelProps {
  balance: number;
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
}

export const TransactionsPanel = ({ balance, transactions, formatCurrency, formatDate, getStatusColor }: TransactionsPanelProps) => {
  const { toast } = useToast();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [depositForm, setDepositForm] = useState({ amount: "", method: "bank_transfer" });
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", description: "" });
  const [transferForm, setTransferForm] = useState({ amount: "", recipient: "", recipientAccount: "", bank: "", description: "" });

  const handleOpenDeposit = () => {
    setDepositForm({ amount: "", method: "bank_transfer" });
    setDepositDialogOpen(true);
  };

  const handleOpenWithdraw = () => {
    setWithdrawForm({ amount: "", description: "" });
    setWithdrawDialogOpen(true);
  };

  const handleOpenTransfer = () => {
    setTransferForm({ amount: "", recipient: "", recipientAccount: "", bank: "", description: "" });
    setTransferDialogOpen(true);
  };

  const handleDeposit = () => {
    if (!depositForm.amount || parseFloat(depositForm.amount) <= 0) {
      toast("Error: Please enter a valid amount");
      return;
    }
    toast(`Success: ${formatCurrency(parseFloat(depositForm.amount))} deposited to wallet`);
    setDepositDialogOpen(false);
    setDepositForm({ amount: "", method: "bank_transfer" });
  };

  const handleWithdraw = () => {
    if (!withdrawForm.amount || parseFloat(withdrawForm.amount) <= 0) {
      toast("Error: Please enter a valid amount");
      return;
    }
    const amount = parseFloat(withdrawForm.amount);
    if (amount > balance) {
      toast("Error: Insufficient wallet balance");
      return;
    }
    toast(`Success: ${formatCurrency(amount)} withdrawn from wallet`);
    setWithdrawDialogOpen(false);
    setWithdrawForm({ amount: "", description: "" });
  };

  const handleTransfer = () => {
    if (!transferForm.amount || parseFloat(transferForm.amount) <= 0) {
      toast("Error: Please enter a valid amount");
      return;
    }
    if (!transferForm.recipient || !transferForm.recipientAccount) {
      toast("Error: Please fill in recipient details");
      return;
    }
    const amount = parseFloat(transferForm.amount);
    if (amount > balance) {
      toast("Error: Insufficient wallet balance");
      return;
    }
    toast(`Success: ${formatCurrency(amount)} transferred to ${transferForm.recipient}`);
    setTransferDialogOpen(false);
    setTransferForm({ amount: "", recipient: "", recipientAccount: "", bank: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your wallet and view transaction history</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Wallet Balance</CardTitle>
          <CardDescription>Your current wallet balance and quick actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Available Balance</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">{formatCurrency(balance)}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleOpenDeposit} className="bg-green-600 hover:bg-green-700">
                  <ArrowDownRight className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
                <Button variant="outline" onClick={handleOpenWithdraw}>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
                <Button variant="outline" onClick={handleOpenTransfer}>
                  <Send className="h-4 w-4 mr-2" />
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === "deposit" ? "bg-green-100 dark:bg-green-900/30" :
                    transaction.type === "withdraw" ? "bg-red-100 dark:bg-red-900/30" :
                    "bg-blue-100 dark:bg-blue-900/30"
                  }`}>
                    {transaction.type === "deposit" ? (
                      <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : transaction.type === "withdraw" ? (
                      <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(transaction.date)} • {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "deposit" ? "text-green-600 dark:text-green-400" :
                    "text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.type === "deposit" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge className={`${getStatusColor(transaction.status)}`}>{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit to Wallet</DialogTitle>
            <DialogDescription>Add funds to your wallet balance</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={depositForm.amount} onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })} />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={depositForm.method} onValueChange={(value) => setDepositForm({ ...depositForm, method: value })}>
                <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Debit/Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDepositDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeposit}>Deposit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw from Wallet</DialogTitle>
            <DialogDescription>Withdraw funds to your bank account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Available Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={withdrawForm.amount} onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="e.g., Withdrawal to bank account" value={withdrawForm.description} onChange={(e) => setWithdrawForm({ ...withdrawForm, description: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
            <DialogDescription>Send money to another user</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Available Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
            <div>
              <Label>Recipient Name</Label>
              <Input placeholder="Enter recipient name" value={transferForm.recipient} onChange={(e) => setTransferForm({ ...transferForm, recipient: e.target.value })} />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input placeholder="Enter account number" value={transferForm.recipientAccount} onChange={(e) => setTransferForm({ ...transferForm, recipientAccount: e.target.value })} />
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={transferForm.amount} onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTransferDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleTransfer}>Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
