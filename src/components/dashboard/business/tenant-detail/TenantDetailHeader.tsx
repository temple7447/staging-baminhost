import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useUpdateTenantMutation, useSendTenantReceiptMutation, useUpdateEstateUnitMutation } from '@/services/estatesApi';

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

interface TenantDetailHeaderProps {
  tenantId?: string;
  tenant: any;
  overview: any;
}

export const TenantDetailHeader = ({ tenantId, tenant, overview }: TenantDetailHeaderProps) => {
  const navigate = useNavigate();
  const [updateTenant, { isLoading: updatingTenant }] = useUpdateTenantMutation();
  const [sendReceipt, { isLoading: sendingReceipt }] = useSendTenantReceiptMutation();
  const [updateUnit, { isLoading: updatingUnit }] = useUpdateEstateUnitMutation();

  // Tenant edit state
  const [editTenantOpen, setEditTenantOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editType, setEditType] = useState<'new' | 'existing' | 'renewal' | 'transfer'>('new');
  const [editRent, setEditRent] = useState('');
  const [editEntryDate, setEditEntryDate] = useState('');
  const [editNextDue, setEditNextDue] = useState('');
  const [editMeter, setEditMeter] = useState('');

  // Pricing edit state
  const [editPricingOpen, setEditPricingOpen] = useState(false);
  const [editMonthlyPrice, setEditMonthlyPrice] = useState('');
  const [editServiceCharge, setEditServiceCharge] = useState('');
  const [editCautionFee, setEditCautionFee] = useState('');
  const [editLegalFee, setEditLegalFee] = useState('');

  const handleEditTenantOpen = () => {
    if (tenant) {
      setEditName(overview?.name || tenant.tenantName || '');
      setEditEmail(tenant.email || overview?.email || tenant.tenantEmail || '');
      setEditPhone(tenant.whatsapp || tenant.whatsappNumber || overview?.phone || tenant.tenantPhone || '');
      setEditType((tenant.tenantType as any) || 'new');
      setEditRent(tenant.rentAmount != null ? String(tenant.rentAmount) : '');
      setEditEntryDate((tenant as any).entryDate || '');
      setEditNextDue(tenant.nextDueDate || (overview as any)?.nextDue || '');
      setEditMeter(overview?.meter || tenant.electricMeterNumber || '');
    }
  };

  const handleEditPricingOpen = () => {
    if (overview || tenant) {
      const o: any = overview || {};
      setEditMonthlyPrice(o.unitMonthlyPrice != null ? String(o.unitMonthlyPrice) : '');
      setEditServiceCharge(o.serviceChargeMonthly != null ? String(o.serviceChargeMonthly) : '');
      setEditCautionFee(o.cautionFee != null ? String(o.cautionFee) : '');
      setEditLegalFee(o.legalFee != null ? String(o.legalFee) : '');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Tenant Overview</h1>
        <p className="text-muted-foreground">Profile, history, and transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={editTenantOpen} onOpenChange={(open) => {
          setEditTenantOpen(open);
          if (open) handleEditTenantOpen();
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit Tenant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tenant</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-sm">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Phone / WhatsApp</Label>
                <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Tenant type</Label>
                <Select value={editType} onValueChange={(v: any) => setEditType(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">new</SelectItem>
                    <SelectItem value="existing">existing</SelectItem>
                    <SelectItem value="renewal">renewal</SelectItem>
                    <SelectItem value="transfer">transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Rent amount (₦)</Label>
                <Input type="number" value={editRent} onChange={(e) => setEditRent(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Entry date</Label>
                <Input type="date" value={editEntryDate} onChange={(e) => setEditEntryDate(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Next due date</Label>
                <Input type="date" value={editNextDue} onChange={(e) => setEditNextDue(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Meter</Label>
                <Input value={editMeter} onChange={(e) => setEditMeter(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setEditTenantOpen(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  if (!tenantId) return;
                  try {
                    const rentNum = Number(editRent);
                    await updateTenant({
                      tenantId: tenantId as string,
                      tenantName: editName || undefined,
                      tenantEmail: editEmail || undefined,
                      tenantPhone: editPhone || undefined,
                      tenantType: editType,
                      rentAmount: Number.isFinite(rentNum) && rentNum > 0 ? rentNum : undefined,
                      entryDate: editEntryDate || undefined,
                      nextDueDate: editNextDue || undefined,
                      electricMeterNumber: editMeter || undefined,
                    } as any).unwrap();
                    toast({ title: 'Tenant updated' });
                    setEditTenantOpen(false);
                  } catch (e) {
                    toast({ title: 'Failed to update tenant', variant: 'destructive' });
                  }
                }}
                disabled={updatingTenant}
              >
                {updatingTenant ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={editPricingOpen}
          onOpenChange={(open) => {
            setEditPricingOpen(open);
            if (open) handleEditPricingOpen();
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit Pricing</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Unit Pricing</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-sm">
              <div className="grid gap-2">
                <Label>Unit monthly price (₦)</Label>
                <Input type="number" value={editMonthlyPrice} onChange={(e) => setEditMonthlyPrice(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Service charge (monthly, ₦)</Label>
                <Input type="number" value={editServiceCharge} onChange={(e) => setEditServiceCharge(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Caution fee (₦)</Label>
                <Input type="number" value={editCautionFee} onChange={(e) => setEditCautionFee(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Legal fee (₦)</Label>
                <Input type="number" value={editLegalFee} onChange={(e) => setEditLegalFee(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setEditPricingOpen(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  const unitId = (tenant && (tenant as any).unit && (tenant as any).unit._id) || (overview as any)?._id;
                  if (!unitId) {
                    toast({ title: 'No unitId available for this tenant', variant: 'destructive' });
                    return;
                  }
                  try {
                    const price = Number(editMonthlyPrice);
                    const svc = Number(editServiceCharge);
                    const caution = Number(editCautionFee);
                    const legal = Number(editLegalFee);
                    await updateUnit({
                      unitId,
                      body: {
                        monthlyPrice: Number.isFinite(price) && price > 0 ? price : undefined,
                        serviceChargeMonthly: Number.isFinite(svc) && svc >= 0 ? svc : undefined,
                        cautionFee: Number.isFinite(caution) && caution >= 0 ? caution : undefined,
                        legalFee: Number.isFinite(legal) && legal >= 0 ? legal : undefined,
                      },
                    }).unwrap();
                    toast({ title: 'Unit pricing updated' });
                    setEditPricingOpen(false);
                  } catch (e) {
                    toast({ title: 'Failed to update pricing', variant: 'destructive' });
                  }
                }}
                disabled={updatingUnit}
              >
                {updatingUnit ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            if (!tenantId) return;
            try {
              const result = await sendReceipt(tenantId).unwrap();
              toast({
                title: 'Receipt Sent',
                description: result.message || 'Receipt has been sent to tenant email.'
              });
            } catch (e: any) {
              toast({
                title: 'Failed to Send Receipt',
                description: e?.data?.message || 'An error occurred while sending the receipt.',
                variant: 'destructive'
              });
            }
          }}
          disabled={sendingReceipt}
        >
          {sendingReceipt ? 'Sending...' : 'Send Receipt'}
        </Button>

        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
};
