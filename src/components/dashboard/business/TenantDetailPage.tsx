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
import { useGetTenantQuery, useInitiatePaymentMutation } from '@/services/estatesApi';
import { TenantDetailSkeleton, TableSkeleton, PropertyMediaSkeleton } from '@/components/ui/skeletons';
import { MediaUpload } from '@/components/ui/MediaUpload';
import { PropertyMediaDisplay } from '@/components/ui/PropertyMediaDisplay';
import { ComplaintSubmission } from '@/components/ui/ComplaintSubmission';

export const TenantDetailPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { data: detail, isLoading } = useGetTenantQuery(tenantId ? { id: tenantId as string, expand: 'history,transactions' } : ('' as unknown as { id: string }), { skip: !tenantId });
  const tenant = detail?.data?.tenant;
  const overview = detail?.data?.overview;
  const history = (detail && typeof (detail as { data?: { history?: { id: string; date: string; action: string; notes?: string }[] } }).data?.history !== 'undefined'
    ? ((detail as { data: { history: { id: string; date: string; action: string; notes?: string }[] } }).data.history)
    : []) as { id: string; date: string; action: string; notes?: string }[];
  const transactions = (detail && typeof (detail as { data?: { transactions?: { id: string; date: string; amount: number; type: string; status?: string; description?: string }[] } }).data?.transactions !== 'undefined'
    ? ((detail as { data: { transactions: { id: string; date: string; amount: number; type: string; status?: string; description?: string }[] } }).data.transactions)
    : []) as { id: string; date: string; amount: number; type: string; status?: string; description?: string }[];
  const historyLoading = isLoading && history.length === 0;
  const txLoading = isLoading && transactions.length === 0;

  // Payments state
  const [payOpen, setPayOpen] = useState(false);
  const [payType, setPayType] = useState<'deposit' | 'rent' | 'service-charge' | 'security-charge' | 'caution-fee' | 'legal-fee'>('rent');
  const [payAmount, setPayAmount] = useState('');
  const [payDesc, setPayDesc] = useState('');
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();

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
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 mb-1">
                <span>{overview?.name || tenant?.tenantName || `${tenant?.firstName || ''} ${tenant?.otherNames || ''} ${tenant?.surname || ''}`.trim() || '—'}</span>
                {(overview?.typeBadge || tenant?.tenantType) && <Badge variant="secondary">{overview?.typeBadge || tenant?.tenantType}</Badge>}
              </CardTitle>
              {(overview?.unit || tenant?.unitLabel) && <CardDescription>Unit: {overview?.unit || tenant?.unitLabel}</CardDescription>}
            </div>
            <ComplaintSubmission onSubmit={handleComplaintSubmit} />
          </div>
        </CardHeader>
        <CardContent>
          {!tenant ? (
            <div className="text-sm text-muted-foreground">Tenant not found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">ID</div>
                <div className="font-mono break-all">{tenant.id}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Email</div>
                <div>{tenant?.email || overview?.email || tenant?.tenantEmail || '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">WhatsApp</div>
                <div>{tenant?.whatsapp || tenant?.whatsappNumber || overview?.phone || tenant?.tenantPhone || '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Rent</div>
                <div>{typeof overview?.rent === 'number' ? `₦${overview.rent.toLocaleString()}` : (typeof tenant?.rentAmount === 'number' ? `₦${tenant.rentAmount.toLocaleString()}` : '—')}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Next Due</div>
                <div>{overview?.nextDue || tenant?.nextDueDate || '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Meter</div>
                <div>{overview?.meter || tenant?.electricMeterNumber || '—'}</div>
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
                      <TableCell>{h.date}</TableCell>
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
                    <Select value={payType} onValueChange={(v: any)=>setPayType(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="service-charge">Service Charge</SelectItem>
                        <SelectItem value="security-charge">Security Charge</SelectItem>
                        <SelectItem value="caution-fee">Caution Fee</SelectItem>
                        <SelectItem value="legal-fee">Legal Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Amount (₦)</Label>
                    <Input type="number" value={payAmount} onChange={(e)=>setPayAmount(e.target.value)} placeholder="e.g. 150000" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description (optional)</Label>
                    <Input value={payDesc} onChange={(e)=>setPayDesc(e.target.value)} placeholder="Custom description" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="ghost" onClick={()=>setPayOpen(false)}>Cancel</Button>
                    <Button
                      onClick={async()=>{
                        if (!tenantId) return;
                        const amt = Number(payAmount);
                        if (!Number.isFinite(amt) || amt <= 0) return;
                        try {
                          const res = await initiatePayment({ type: payType, body: { tenantId, amount: amt, description: payDesc || undefined } }).unwrap();
                          toast({ title: 'Payment initiated', description: res.message || 'Redirecting to checkout...' });
                          if (res?.data?.paymentLink) window.open(res.data.paymentLink, '_blank');
                          // Navigate to success tracking page using reference so user can verify after completing checkout
                          if (res?.data?.reference) {
                            const ref = res.data.reference;
                            navigate(`/dashboard/payment/success?reference=${encodeURIComponent(ref)}`);
                          }
                          setPayOpen(false);
                          setPayAmount('');
                          setPayDesc('');
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
                      <TableCell>{t.date}</TableCell>
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
