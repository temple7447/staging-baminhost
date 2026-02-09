import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useUpdateTenantMutation, useShiftTenantDueDateMutation, useSendTenantReceiptMutation } from '@/services/estatesApi';

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
  const [shiftDueDate, { isLoading: shiftingDueDate }] = useShiftTenantDueDateMutation();
  const [sendReceipt, { isLoading: sendingReceipt }] = useSendTenantReceiptMutation();

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

  // Shift due date state
  const [shiftDueDateOpen, setShiftDueDateOpen] = useState(false);
  const [months, setMonths] = useState('');

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

        <Dialog open={shiftDueDateOpen} onOpenChange={(open) => {
          setShiftDueDateOpen(open);
          if (!open) {
            setMonths('');
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Shift Date</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shift Tenant Due Date</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="text-sm text-muted-foreground">
                Enter the number of months to pay for both rent and service charges. The due date will be shifted forward accordingly.
              </div>
              <div className="grid gap-2">
                <Label>Number of Months *</Label>
                <Input
                  type="number"
                  min="1"
                  max="24"
                  placeholder="e.g., 12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Applies to both rent and service charges</p>
              </div>
              {months && (
                <div className="p-3 bg-muted rounded-md text-sm">
                  <div className="font-medium mb-1">Payment Summary:</div>
                  <div>• <span className="font-bold">{months} month{Number(months) > 1 ? 's' : ''}</span> of rent</div>
                  <div>• <span className="font-bold">{months} month{Number(months) > 1 ? 's' : ''}</span> of service charges</div>
                  <div className="mt-2 text-xs">Due date will shift forward by {months} month{Number(months) > 1 ? 's' : ''}</div>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShiftDueDateOpen(false)}>Cancel</Button>
                <Button
                  onClick={async () => {
                    if (!tenantId) return;
                    const monthsNum = Number(months);

                    if (!months) {
                      toast({
                        title: 'Validation Error',
                        description: 'Please enter the number of months to pay.',
                        variant: 'destructive'
                      });
                      return;
                    }

                    if (!Number.isInteger(monthsNum) || monthsNum < 1 || monthsNum > 24) {
                      toast({
                        title: 'Validation Error',
                        description: 'Months must be a whole number between 1 and 24.',
                        variant: 'destructive'
                      });
                      return;
                    }

                    try {
                      const result = await shiftDueDate({
                        tenantId: tenantId as string,
                        payload: {
                          rentMonths: monthsNum,
                          serviceMonths: monthsNum
                        }
                      }).unwrap();

                      toast({
                        title: 'Due Date Shifted Successfully',
                        description: `New due date: ${formatDate(result.data.newDueDate)}. Shifted by ${result.data.totalMonthsShifted} month(s).`
                      });
                      setShiftDueDateOpen(false);
                      setMonths('');
                    } catch (e: any) {
                      toast({
                        title: 'Failed to Shift Due Date',
                        description: e?.data?.message || 'An error occurred while shifting the due date.',
                        variant: 'destructive'
                      });
                    }
                  }}
                  disabled={shiftingDueDate}
                >
                  {shiftingDueDate ? 'Processing...' : 'Shift Due Date'}
                </Button>
              </div>
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
