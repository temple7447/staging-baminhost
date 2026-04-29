import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";

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
  onTransactionComplete?: () => void;
}

export const TransactionsPanel = ({ balance, transactions, formatCurrency, formatDate, getStatusColor, onTransactionComplete }: TransactionsPanelProps) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [depositForm, setDepositForm] = useState({ amount: "", method: "bank_transfer" });
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", accountName: "", accountNumber: "", bankName: "" });
  const [transferForm, setTransferForm] = useState({ amount: "", recipientEmail: "", recipientType: "user" as "user" | "estate", recipientId: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenDeposit = () => {
    setDepositForm({ amount: "", method: "bank_transfer" });
    setDepositDialogOpen(true);
  };

  const handleOpenWithdraw = () => {
    setWithdrawForm({ amount: "", accountName: "", accountNumber: "", bankName: "" });
    setWithdrawDialogOpen(true);
  };

  const handleOpenTransfer = () => {
    setTransferForm({ amount: "", recipientEmail: "", recipientType: "user", recipientId: "" });
    setTransferDialogOpen(true);
  };

  const handleDeposit = async () => {
    if (!depositForm.amount || parseFloat(depositForm.amount) <= 0) {
      toast("Please enter a valid amount", "error");
      return;
    }
    const token = getToken();
    if (!token) {
      toast("Not authenticated", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wallet/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: "deposit", amount: parseFloat(depositForm.amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deposit failed");
      toast(`${formatCurrency(parseFloat(depositForm.amount))} deposited to wallet`, "success");
      setDepositDialogOpen(false);
      onTransactionComplete?.();
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawForm.amount || parseFloat(withdrawForm.amount) <= 0) {
      toast("Please enter a valid amount", "error");
      return;
    }
    const amount = parseFloat(withdrawForm.amount);
    if (amount > balance) {
      toast("Insufficient wallet balance", "error");
      return;
    }
    if (!withdrawForm.accountName || !withdrawForm.accountNumber || !withdrawForm.bankName) {
      toast("Please fill in all bank details", "error");
      return;
    }
    const token = getToken();
    if (!token) {
      toast("Not authenticated", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wallet/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          type: "withdraw",
          amount,
          bankDetails: {
            accountName: withdrawForm.accountName,
            accountNumber: withdrawForm.accountNumber,
            bankName: withdrawForm.bankName,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Withdrawal failed");
      toast(`${formatCurrency(amount)} withdrawal request submitted`, "success");
      setWithdrawDialogOpen(false);
      onTransactionComplete?.();
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferForm.amount || parseFloat(transferForm.amount) <= 0) {
      toast("Please enter a valid amount", "error");
      return;
    }
    if (!transferForm.recipientEmail) {
      toast("Please enter recipient email", "error");
      return;
    }
    const amount = parseFloat(transferForm.amount);
    if (amount > balance) {
      toast("Insufficient wallet balance", "error");
      return;
    }
    const token = getToken();
    if (!token) {
      toast("Not authenticated", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wallet/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          type: "transfer",
          amount,
          recipientEmail: transferForm.recipientEmail,
          recipientType: transferForm.recipientType,
          ...(transferForm.recipientType === "estate" && transferForm.recipientId ? { recipientId: transferForm.recipientId } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Transfer failed");
      toast(`${formatCurrency(amount)} transferred to ${transferForm.recipientEmail}`, "success");
      setTransferDialogOpen(false);
      onTransactionComplete?.();
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
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
            {transactions.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
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
              ))
            )}
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
            <Button variant="outline" onClick={() => setDepositDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleDeposit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw from Wallet</DialogTitle>
            <DialogDescription>Withdraw funds to your bank account. Withdrawals require admin approval.</DialogDescription>
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
              <Label>Account Name</Label>
              <Input placeholder="Enter account name" value={withdrawForm.accountName} onChange={(e) => setWithdrawForm({ ...withdrawForm, accountName: e.target.value })} />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input placeholder="Enter account number" value={withdrawForm.accountNumber} onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })} />
            </div>
            <div>
              <Label>Bank Name</Label>
              <Input placeholder="Enter bank name" value={withdrawForm.bankName} onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleWithdraw} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
            <DialogDescription>Send money to another user or estate wallet</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Available Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
            <div>
              <Label>Recipient Type</Label>
              <Select value={transferForm.recipientType} onValueChange={(value: "user" | "estate") => setTransferForm({ ...transferForm, recipientType: value })}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="estate">Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recipient Email</Label>
              <Input type="email" placeholder="Enter recipient email" value={transferForm.recipientEmail} onChange={(e) => setTransferForm({ ...transferForm, recipientEmail: e.target.value })} />
            </div>
            {transferForm.recipientType === "estate" && (
              <div>
                <Label>Estate ID</Label>
                <Input placeholder="Enter estate ID" value={transferForm.recipientId} onChange={(e) => setTransferForm({ ...transferForm, recipientId: e.target.value })} />
              </div>
            )}
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={transferForm.amount} onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTransferDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleTransfer} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
