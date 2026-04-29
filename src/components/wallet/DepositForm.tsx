import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { usePaystackDeposit } from '../../hooks/useWallet';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

/**
 * Component to initiate a Paystack deposit
 */
export const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const { initializeDeposit, isInitializing } = usePaystackDeposit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const depositAmount = parseInt(amount);
    if (depositAmount && depositAmount >= 100) {
      await initializeDeposit(depositAmount);
    }
  };

  const isValidAmount = amount && parseInt(amount) >= 100;

  return (
    <Card className="border-l-4 border-l-green-600">
      <CardHeader>
        <CardTitle>Make a Deposit</CardTitle>
        <CardDescription>
          Add funds to your wallet using Paystack (Minimum: ₦100)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="deposit-amount" className="text-sm font-medium">
              Deposit Amount (NGN)
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-700">₦</span>
              <Input
                id="deposit-amount"
                type="number"
                min="100"
                step="100"
                placeholder="Enter amount (minimum ₦100)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isInitializing}
                className="text-lg"
              />
            </div>
            {amount && parseInt(amount) < 100 && (
              <p className="text-xs text-red-600">Minimum deposit is ₦100</p>
            )}
          </div>

          {/* Paystack Only Notice */}
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-700" />
            <AlertDescription className="text-sm text-amber-800 ml-2">
              Deposits are processed securely through Paystack only.
            </AlertDescription>
          </Alert>

          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-800 ml-2">
              You will be redirected to Paystack to complete your payment securely.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValidAmount || isInitializing}
            className="w-full h-10 bg-green-600 hover:bg-green-700"
          >
            {isInitializing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Deposit ₦${amount || '0'}`
            )}
          </Button>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center">
            Your deposit will be credited to your wallet immediately after successful payment.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
