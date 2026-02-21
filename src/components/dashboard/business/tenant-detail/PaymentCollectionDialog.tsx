import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/use-toast';
import { useInitiatePaymentMutation, useManualRecordPaymentMutation } from '@/services/estatesApi';

interface PaymentCollectionDialogProps {
  tenantId?: string;
  overview: any;
  tenant: any;
  billingData: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentCollectionDialog = ({
  tenantId,
  overview,
  tenant,
  billingData,
  open,
  onOpenChange
}: PaymentCollectionDialogProps) => {
  const navigate = useNavigate();
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();
  const [recordManualPayment, { isLoading: recordingManual }] = useManualRecordPaymentMutation();

  // Online (Paystack) state
  const [payType, setPayType] = useState<'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee' | 'initial'>('rent');
  const [payMonths, setPayMonths] = useState('12');

  // Manual record state
  const [manualAmount, setManualAmount] = useState('');
  const [manualMethod, setManualMethod] = useState<'bank_transfer' | 'cash' | 'check'>('bank_transfer');
  const [manualType, setManualType] = useState('rent');
  const [manualMonths, setManualMonths] = useState('12');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualDesc, setManualDesc] = useState('');
  const [manualNotes, setManualNotes] = useState('');

  const billingItems = billingData?.data?.items ?? [];
  const getBillingItemForType = (
    type: 'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee'
  ) => {
    switch (type) {
      case 'rent':
        return billingItems.find((i: any) => i.code === 'rent');
      case 'service-charge':
        return billingItems.find((i: any) => i.code === 'service_charge');
      case 'caution-fee':
        return billingItems.find((i: any) => i.code === 'caution_fee');
      case 'legal-fee':
        return billingItems.find((i: any) => i.code === 'legal_fee');
      default:
        return undefined;
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      // Reset forms
      setManualAmount('');
      setPayMonths('12');
      setManualMonths('12');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Collect Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Collect Payment</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online">Online (Paystack)</TabsTrigger>
            <TabsTrigger value="manual">Manual (Offline)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="online" className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Payment type</Label>
              <Select value={payType} onValueChange={(v: any) => setPayType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent (Bundles Service Charge)</SelectItem>
                  <SelectItem value="service-charge">Standalone Service Charge</SelectItem>
                  <SelectItem value="initial">Initial (Caution, Legal, etc.)</SelectItem>
                  <SelectItem value="deposit">Security Deposit</SelectItem>
                  <SelectItem value="security-charge">Security Charge</SelectItem>
                  <SelectItem value="caution-fee">Caution Fee</SelectItem>
                  <SelectItem value="legal-fee">Legal Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {payType === 'rent' && (
              <div className="grid gap-2">
                <Label>Duration (Months)</Label>
                <Select value={payMonths} onValueChange={(v) => setPayMonths(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Automatically bundles service charge for this period.</p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  if (!tenantId) return;
                  
                  let amt = 0;
                  let desc = "";
                  
                  if (payType === 'rent') {
                    const months = Number(payMonths) || 1;
                    const monthlyRent = overview?.rent || tenant?.rentAmount || 0;
                    const monthlyService = overview?.serviceCharge || 0;
                    amt = (monthlyRent + monthlyService) * months;
                    desc = `${months} months Rent + Service Charge`;
                  } else {
                    const item = getBillingItemForType(payType as any);
                    amt = item?.amount || 0;
                    desc = item?.label || payType;
                  }

                  try {
                    const res = await initiatePayment({ 
                      type: payType as any, 
                      body: { 
                        tenantId, 
                        amount: amt, 
                        description: desc,
                        durationMonths: payType === 'rent' ? Number(payMonths) : undefined
                      } 
                    }).unwrap();
                    toast({ title: 'Payment initiated', description: res.message || 'Redirecting to checkout...' });
                    if (res?.data?.paymentLink) window.open(res.data.paymentLink, '_blank');
                    if (res?.data?.reference) {
                      navigate(`/dashboard/payment/success?reference=${encodeURIComponent(res.data.reference)}`);
                    }
                    handleOpenChange(false);
                  } catch (e) {
                    toast({ title: 'Failed to initiate payment', variant: 'destructive' });
                  }
                }}
                disabled={paying}
              >
                {paying ? 'Processing...' : 'Generate Payment Link'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Amount (₦)</Label>
                <Input 
                  type="number" 
                  placeholder="720000" 
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Method</Label>
                <Select value={manualMethod} onValueChange={(v: any) => setManualMethod(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={manualType} onValueChange={(v: any) => setManualType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="service_charge">Service Charge</SelectItem>
                    <SelectItem value="bundle">Rent + Service Bundle</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Duration (Months)</Label>
                <Select value={manualMonths} onValueChange={(v) => setManualMonths(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Payment Date</Label>
              <Input 
                type="date" 
                value={manualDate}
                onChange={(e) => setManualDate(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Input 
                placeholder="Admin manually recorded..." 
                value={manualDesc}
                onChange={(e) => setManualDesc(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Notes</Label>
              <Textarea 
                placeholder="Reference confirmed..." 
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
                className="h-20"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  if (!tenantId || !manualAmount) {
                    toast({ title: 'Please fill required fields', variant: 'destructive' });
                    return;
                  }
                  try {
                    await recordManualPayment({
                      tenantId,
                      paymentType: manualType,
                      amount: Number(manualAmount),
                      paymentMethod: manualMethod,
                      durationMonths: Number(manualMonths),
                      paymentDate: manualDate,
                      description: manualDesc,
                      notes: manualNotes
                    }).unwrap();
                    toast({ title: 'Payment recorded', description: 'Due date has been updated.' });
                    handleOpenChange(false);
                  } catch (e) {
                    toast({ title: 'Failed to record payment', variant: 'destructive' });
                  }
                }}
                disabled={recordingManual}
              >
                {recordingManual ? 'Recording...' : 'Record Payment'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
