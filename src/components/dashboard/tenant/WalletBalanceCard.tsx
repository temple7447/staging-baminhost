import { Wallet, ArrowDownRight, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "./utils";

interface WalletBalanceCardProps {
  balance: number;
  isLoading: boolean;
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  isDepositing: boolean;
  isWithdrawing: boolean;
  isTransferring: boolean;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  isLoading,
  onDeposit,
  onWithdraw,
  onTransfer,
  isDepositing,
  isWithdrawing,
  isTransferring,
}) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
            <Wallet className="h-5 w-5" />
            <span className="text-sm font-medium">Wallet Balance</span>
          </div>
          {isLoading ? (
            <p className="text-3xl font-bold text-slate-900 dark:text-white">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(balance)}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={onDeposit} className="bg-green-600 hover:bg-green-700" disabled={isDepositing}>
            <ArrowDownRight className="h-4 w-4 mr-1" />
            {isDepositing ? "Depositing..." : "Deposit"}
          </Button>
          <Button size="sm" variant="outline" onClick={onWithdraw} disabled={isWithdrawing}>
            <ArrowUpRight className="h-4 w-4 mr-1" />
            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
          </Button>
          <Button size="sm" variant="outline" onClick={onTransfer} disabled={isTransferring}>
            <Send className="h-4 w-4 mr-1" />
            {isTransferring ? "Transferring..." : "Transfer"}
          </Button>
        </div>
      </div>
    </div>
  );
};
