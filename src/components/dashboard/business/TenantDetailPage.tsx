import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useGetTenantQuery, useGetTenantBillingQuery, useInitiatePaymentMutation, useUpdateTenantMutation, useUpdateEstateUnitMutation, useShiftTenantDueDateMutation, useSendTenantReceiptMutation } from '@/services/estatesApi';
import { TenantDetailSkeleton, TableSkeleton, PropertyMediaSkeleton } from '@/components/ui/skeletons';
import { MediaUpload } from '@/components/ui/MediaUpload';
import { PropertyMediaDisplay } from '@/components/ui/PropertyMediaDisplay';
import { ComplaintSubmission } from '@/components/ui/ComplaintSubmission';

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    // Fallback to original value if parsing fails
    return value;
  }
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const TenantDetailPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { data: detail, isLoading } = useGetTenantQuery(tenantId ? { id: tenantId as string, expand: 'history,transactions' } : ('' as unknown as { id: string }), { skip: !tenantId });
  const { data: billingData } = useGetTenantBillingQuery(tenantId as string, { skip: !tenantId });
  const tenant = detail?.data?.tenant;
  const overview = detail?.data?.overview;
  const [updateTenant, { isLoading: updatingTenant }] = useUpdateTenantMutation();
  const [updateUnit, { isLoading: updatingUnit }] = useUpdateEstateUnitMutation();
  
  // Map history from API response structure to frontend format
  const history = (detail?.data?.history || []).map((h: any) => ({
    id: h.createdAt || String(Math.random()),
    date: h.createdAt,
    action: h.event || 'Unknown',
    notes: h.note || ''
  }));
  
  // Map transactions from API response
  const transactions = (detail?.data?.transactions || []).map((t: any) => ({
    id: t._id || t.id || String(Math.random()),
    date: t.createdAt || t.date,
    amount: t.amount || 0,
    type: t.type || 'Unknown',
    status: t.status,
    description: t.description || t.note || ''
  }));
  
  const historyLoading = isLoading && history.length === 0;
  const txLoading = isLoading && transactions.length === 0;

  const billingItems = billingData?.data?.items ?? [];
  const getBillingItemForType = (
    type: 'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee'
  ) => {
    switch (type) {
      case 'rent':
        return billingItems.find((i) => i.code === 'rent');
      case 'service-charge':
        return billingItems.find((i) => i.code === 'service_charge');
      case 'caution-fee':
        return billingItems.find((i) => i.code === 'caution_fee');
      case 'legal-fee':
        return billingItems.find((i) => i.code === 'legal_fee');
      default:
        return undefined;
    }
  };

  // Payments state
  const [payOpen, setPayOpen] = useState(false);
  const [editTenantOpen, setEditTenantOpen] = useState(false);
  const [editPricingOpen, setEditPricingOpen] = useState(false);

  // Tenant edit state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editType, setEditType] = useState<'new' | 'existing' | 'renewal' | 'transfer'>('new');
  const [editRent, setEditRent] = useState('');
  const [editEntryDate, setEditEntryDate] = useState('');
  const [editNextDue, setEditNextDue] = useState('');
  const [editMeter, setEditMeter] = useState('');

  // Unit pricing edit state
  const [editMonthlyPrice, setEditMonthlyPrice] = useState('');
  const [editServiceCharge, setEditServiceCharge] = useState('');
  const [editCautionFee, setEditCautionFee] = useState('');
  const [editLegalFee, setEditLegalFee] = useState('');
  const [payType, setPayType] = useState<'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee'>('rent');
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();

  // Shift due date state
  const [shiftDueDateOpen, setShiftDueDateOpen] = useState(false);
  const [months, setMonths] = useState('');
  const [shiftDueDate, { isLoading: shiftingDueDate }] = useShiftTenantDueDateMutation();
  const [sendReceipt, { isLoading: sendingReceipt }] = useSendTenantReceiptMutation();

  // Mock property media state (replace with actual API call)
  const [propertyMedia, setPropertyMedia] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  const handleMediaUpload = async (files: any[]) => {
    // Handle the uploaded files (integrate with your API)
    console.log('Uploaded files:', files);
    // For demo, we'll simulate adding to the media list
    const newMedia = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: file.preview, // In real app, this would be the uploaded URL
      type: file.type,
      filename: file.file.name,
      uploadedAt: new Date().toISOString()
    }));
    setPropertyMedia(prev => [...prev, ...newMedia]);
  };

  const handleComplaintSubmit = (complaint: any) => {
    // Handle the submitted complaint (integrate with your API)
    console.log('Complaint submitted:', complaint);
    // In a real app, you would send this to your API
    // Example: await submitComplaintMutation({ tenantId, complaint }).unwrap();
  };

  // Extract media from tenant history
  const getHistoryMedia = () => {
    const movedInEntries = history.filter(h => h.action === 'moved_in' || (h as any).event === 'moved_in');
    const photos: { url: string; public_id: string }[] = [];
    const videos: { url: string; public_id: string }[] = [];

    movedInEntries.forEach(entry => {
      const meta = (entry as any).meta;
      if (meta?.photos) {
        photos.push(...meta.photos);
      }
      if (meta?.videos) {
        videos.push(...meta.videos);
      }
    });

    return { photos, videos };
  };

  const historyMedia = getHistoryMedia();

  // Show full page skeleton while main data is loading
  if (isLoading && !tenant) {
    return <TenantDetailSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenant Overview</h1>
          <p className="text-muted-foreground">Profile, history, and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={editTenantOpen}
            onOpenChange={(open) => {
              setEditTenantOpen(open);
              if (open && tenant) {
                setEditName(overview?.name || tenant.tenantName || '');
                setEditEmail(tenant.email || overview?.email || tenant.tenantEmail || '');
                setEditPhone(tenant.whatsapp || tenant.whatsappNumber || overview?.phone || tenant.tenantPhone || '');
                setEditType((tenant.tenantType as any) || 'new');
                setEditRent(tenant.rentAmount != null ? String(tenant.rentAmount) : '');
                setEditEntryDate((tenant as any).entryDate || '');
                setEditNextDue(tenant.nextDueDate || (overview as any)?.nextDue || '');
                setEditMeter(overview?.meter || tenant.electricMeterNumber || '');
              }
            }}
          >
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

      {/* Enhanced Tenant Overview Header */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 text-white">
              <CardTitle className="flex items-center gap-3 mb-2 text-2xl">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  {(overview?.name || tenant?.tenantName || '')?.charAt(0)?.toUpperCase() || 'T'}
                </div>
                <div>
                  <div>{overview?.name || tenant?.tenantName || 'Unknown Tenant'}</div>
                  {(overview?.unit || tenant?.unitLabel) && (
                    <div className="text-sm font-normal text-blue-100 mt-1">
                      Unit: {overview?.unit || tenant?.unitLabel}
                    </div>
                  )}
                </div>
              </CardTitle>
              <div className="flex gap-2 mt-3">
                {(overview?.typeBadge || tenant?.tenantType) && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {overview?.typeBadge || tenant?.tenantType}
                  </Badge>
                )}
                <Badge 
                  className={
                    overview?.status === 'occupied' || tenant?.status === 'occupied'
                      ? "bg-emerald-500/80 text-white hover:bg-emerald-600"
                      : "bg-amber-500/80 text-white hover:bg-amber-600"
                  }
                >
                  {overview?.status || tenant?.status || 'Unknown'}
                </Badge>
              </div>
            </div>
            <ComplaintSubmission onSubmit={handleComplaintSubmit} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div>
              <div className="text-blue-100 text-xs uppercase tracking-wider mb-1">Email</div>
              <div className="font-medium">{tenant?.email || overview?.email || tenant?.tenantEmail || '—'}</div>
            </div>
            <div>
              <div className="text-blue-100 text-xs uppercase tracking-wider mb-1">Phone</div>
              <div className="font-medium">{tenant?.whatsapp || tenant?.whatsappNumber || overview?.phone || tenant?.tenantPhone || '—'}</div>
            </div>
            <div>
              <div className="text-blue-100 text-xs uppercase tracking-wider mb-1">Electric Meter</div>
              <div className="font-medium font-mono">{overview?.meter || tenant?.electricMeterNumber || '—'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monthly Rent</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ₦{typeof overview?.rent === 'number' ? overview.rent.toLocaleString() : (typeof tenant?.rentAmount === 'number' ? tenant.rentAmount.toLocaleString() : '0')}
                  </p>
                  {overview?.rentIncreased ? (
                    <Badge variant="outline" className="text-[10px] bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50 py-0 h-4">
                      Increased
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 py-0 h-4">
                      Standard
                    </Badge>
                  )}
                </div>
                {overview?.rentIncreased && overview?.storedRent && (
                  <p className="text-[10px] text-slate-400 line-through mt-1">Was ₦{overview.storedRent.toLocaleString()}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Paid</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  ₦{detail?.data?.financialSummary?.totalPaid?.toLocaleString() || '0'}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {detail?.data?.financialSummary?.totalPayments || 0} transactions
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Next Due Date</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                  {formatDate((overview as any)?.nextDue || tenant?.nextDueDate)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  {detail?.data?.financialSummary?.pendingPayments || 0}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Outstanding</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Move-in Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatDate(tenant?.entryDate || tenant?.createdAt)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Entry Date</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {tenant?.estate?.name || 'N/A'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Property</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lease Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {tenant?.entryDate && tenant?.nextDueDate 
                    ? `${Math.ceil((new Date(tenant.nextDueDate).getTime() - new Date(tenant.entryDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months`
                    : 'Ongoing'
                  }
                </p>
                <div className="flex flex-col text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>Entry: {formatDate(tenant?.entryDate)}</span>
                  <span>Expiry: {formatDate(tenant?.nextDueDate)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pricing Breakdown</CardTitle>
              <CardDescription>Rent and associated fees</CardDescription>
            </div>
            <Dialog
              open={editPricingOpen}
              onOpenChange={(open) => {
                setEditPricingOpen(open);
                if (open && (overview || tenant)) {
                  const o: any = overview || {};
                  setEditMonthlyPrice(o.unitMonthlyPrice != null ? String(o.unitMonthlyPrice) : '');
                  setEditServiceCharge(o.serviceChargeMonthly != null ? String(o.serviceChargeMonthly) : '');
                  setEditCautionFee(o.cautionFee != null ? String(o.cautionFee) : '');
                  setEditLegalFee(o.legalFee != null ? String(o.legalFee) : '');
                }
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
                      const unitId = (tenant && (tenant as any).unit && (tenant as any).unit._id) || (detail as any)?.data?.unit?._id;
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
          </div>
        </CardHeader>
        <CardContent>
          {!overview && !tenant ? (
            <div className="text-sm text-muted-foreground">No pricing info.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Rent (tenant)</div>
                <div>{typeof (overview?.rent ?? tenant?.rentAmount) === 'number'
                  ? `₦${(overview?.rent ?? tenant?.rentAmount)!.toLocaleString()}`
                  : '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Service charge (monthly)</div>
                <div>{typeof overview?.serviceChargeMonthly === 'number'
                  ? `₦${overview.serviceChargeMonthly.toLocaleString()}`
                  : '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Caution fee</div>
                <div>{typeof overview?.cautionFee === 'number'
                  ? `₦${overview.cautionFee.toLocaleString()}`
                  : '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Legal fee</div>
                <div>{typeof overview?.legalFee === 'number'
                  ? `₦${overview.legalFee.toLocaleString()}`
                  : '—'}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Property Media</CardTitle>
              <CardDescription>Initial property state documentation</CardDescription>
            </div>
            <MediaUpload
              tenantId={tenantId}
              onUpload={handleMediaUpload}
              maxImages={12}
              maxVideos={1}
            />
          </div>
        </CardHeader>
        <CardContent>
          <PropertyMediaDisplay
            media={propertyMedia}
            historyMedia={historyMedia}
            isLoading={mediaLoading}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tenancy History</CardTitle>
          <CardDescription>Lifecycle events for this tenant</CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <TableSkeleton
              rows={3}
              columns={3}
              headers={["Date", "Action", "Notes"]}
            />
          ) : history && history.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell>{formatDate(h.date)}</TableCell>
                      <TableCell className="font-medium">{h.action}</TableCell>
                      <TableCell>{h.notes || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No history.</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Payments and charges</CardDescription>
            </div>
            <Dialog open={payOpen} onOpenChange={setPayOpen}>
              <DialogTrigger asChild>
                <Button>Collect Payment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Collect Payment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label>Payment type</Label>
                    <Select value={payType} onValueChange={(v: any) => setPayType(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="service-charge">Service Charge</SelectItem>
                        <SelectItem value="security-charge">Security Charge</SelectItem>
                        <SelectItem value="caution-fee">Caution Fee</SelectItem>
                        <SelectItem value="legal-fee">Legal Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="ghost" onClick={() => setPayOpen(false)}>Cancel</Button>
                    <Button
                      onClick={async () => {
                        if (!tenantId) return;
                        const item = getBillingItemForType(payType);
                        if (!item) {
                          toast({ title: 'Billing info not available for this payment type', variant: 'destructive' });
                          return;
                        }
                        const amt = item.amount;
                        try {
                          const res = await initiatePayment({ type: payType, body: { tenantId, amount: amt, description: item.label } }).unwrap();
                          toast({ title: 'Payment initiated', description: res.message || 'Redirecting to checkout...' });
                          if (res?.data?.paymentLink) window.open(res.data.paymentLink, '_blank');
                          // Navigate to success tracking page using reference so user can verify after completing checkout
                          if (res?.data?.reference) {
                            const ref = res.data.reference;
                            navigate(`/dashboard/payment/success?reference=${encodeURIComponent(ref)}`);
                          }
                          setPayOpen(false);
                        } catch (e) {
                          toast({ title: 'Failed to initiate payment', variant: 'destructive' });
                        }
                      }}
                      disabled={paying}
                    >
                      {paying ? 'Processing...' : 'Proceed to Pay'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {txLoading ? (
            <TableSkeleton
              rows={4}
              columns={5}
              headers={["Date", "Type", "Status", "Amount", "Description"]}
            />
          ) : transactions && transactions.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{formatDate(t.date)}</TableCell>
                      <TableCell className="font-medium">{t.type}</TableCell>
                      <TableCell>{t.status || '—'}</TableCell>
                      <TableCell className="text-right">₦{t.amount.toLocaleString()}</TableCell>
                      <TableCell>{t.description || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No transactions.</div>
          )}
        </CardContent>
      </Card>


    </div>
  );
};
