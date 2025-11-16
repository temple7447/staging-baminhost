import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetEstateQuery, useGetEstateTenantsQuery, useCreateEstateTenantMutation, useGetEstateOverviewQuery, useCreateEstateUnitMutation, useGetEstateVacantUnitsQuery, useDeleteTenantMutation, useClearEstateUnitTenantMutation } from '@/services/estatesApi';
import { toast } from '@/components/ui/use-toast';
import { EstateDetailSkeleton, TableSkeleton } from '@/components/ui/skeletons';

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
};

export const EstateDetailPage = () => {
  const { estateId } = useParams();
  const navigate = useNavigate();
  
  // All useState hooks must be called before any conditional returns
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [tenantSearch, setTenantSearch] = useState('');
  // Add Tenant form state
  const [addOpen, setAddOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantType, setTenantType] = useState<'new' | 'existing' | 'renewal' | 'transfer'>('new');
  const [entryDate, setEntryDate] = useState('');
  const [durationMonths, setDurationMonths] = useState('');

  // Add Unit form state
  const [unitOpen, setUnitOpen] = useState(false);
  const [newUnitLabel, setNewUnitLabel] = useState('');
  const [newUnitPrice, setNewUnitPrice] = useState('');
  const [newUnitServiceCharge, setNewUnitServiceCharge] = useState('');
  const [newUnitCautionFee, setNewUnitCautionFee] = useState('');
  const [newUnitLegalFee, setNewUnitLegalFee] = useState('');
  const [newUnitMeter, setNewUnitMeter] = useState('');
  const [newUnitDesc, setNewUnitDesc] = useState('');
  const [newUnitFeatures, setNewUnitFeatures] = useState<{ name: string; value: string }[]>([]);

  // API hooks
  const { data: estate, isLoading, isError: estateError, error: estateErrObj, refetch: refetchEstate } = useGetEstateQuery(estateId as string, { skip: !estateId });
  const { data: overviewData, isLoading: overviewLoading, isError: overviewError } = useGetEstateOverviewQuery(estateId as string, { skip: !estateId });
  const { data: tenants, isLoading: tenantsLoading, isError: tenantsError } = useGetEstateTenantsQuery({ estateId: estateId as string, page, limit, search: tenantSearch || undefined }, { skip: !estateId });
  const { data: vacantUnits } = useGetEstateVacantUnitsQuery(estateId as string, { skip: !estateId });
  const [createTenant, { isLoading: creating }] = useCreateEstateTenantMutation();
  const [createUnit, { isLoading: savingUnit }] = useCreateEstateUnitMutation();
  const [deleteTenant, { isLoading: deletingTenant }] = useDeleteTenantMutation();
  const [clearUnitTenant, { isLoading: clearingUnit }] = useClearEstateUnitTenantMutation();

  console.log(estate,estateId,  isLoading, "you are here");
  // Show full page skeleton while main estate data is loading
  if (isLoading) {
    return <EstateDetailSkeleton />;
  }
  // If estate failed to load, show a friendly error with retry
  if (estateError || !estate) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-semibold mb-2">Failed to load estate</h1>
        <p className="text-muted-foreground mb-4">Please check the estate ID or try again.</p>
        <Button onClick={() => refetchEstate()}>Retry</Button>
      </div>
    );
  }

  const submitTenant = async () => {
    if (!estateId || !tenantName.trim() || !selectedUnitId) return;
    try {
      const duration = Number(durationMonths);
      await createTenant({ estateId, body: {
        unitId: selectedUnitId,
        tenantName: tenantName.trim(),
        tenantEmail: tenantEmail || undefined,
        tenantPhone: tenantPhone || undefined,
        tenantType,
        entryDate: entryDate || undefined,
        durationMonths: Number.isFinite(duration) && duration > 0 ? duration : undefined,
        // nextDueDate will be computed by the backend when durationMonths is provided
      }}).unwrap();
      toast({ title: 'Tenant added' });
      setAddOpen(false);
      setSelectedUnitId(''); setTenantName(''); setTenantEmail(''); setTenantPhone(''); setTenantType('new'); setEntryDate(''); setDurationMonths('');
    } catch (e) {
      toast({ title: 'Failed to add tenant', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estate Overview</h1>
          <p className="text-muted-foreground">Details and tenants</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard/estate')}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{overviewData?.data?.estate?.name || estate?.name || '—'}</span>
            {typeof (overviewData?.data?.estate?.totalUnits ?? estate?.totalUnits) === 'number' && (
              <Badge variant="secondary">{(overviewData?.data?.estate?.totalUnits ?? estate?.totalUnits) as number} units</Badge>
            )}
          </CardTitle>
          {overviewData?.data?.estate?.createdAt && (
            <CardDescription>Created: {new Date(overviewData.data.estate.createdAt).toLocaleDateString()}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {!overviewData ? (
            <div className="text-sm text-muted-foreground">{overviewError ? 'Failed to load overview.' : 'No overview.'}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Occupancy</CardTitle>
                  <CardDescription>Total vs. occupied</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {(() => {
                      const r = overviewData.data.occupancy.occupancyRate;
                      if (typeof r !== 'number' || Number.isNaN(r)) return '—';
                      const pct = Math.round(r * 100);
                      return `${pct}%`;
                    })()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {overviewData.data.occupancy.occupiedUnits}/{overviewData.data.occupancy.totalUnits} occupied, {overviewData.data.occupancy.vacantUnits} vacant
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Upcoming Billing</CardTitle>
                  <CardDescription>Due soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{overviewData.data.billing.upcomingDueCount}</div>
                  <div className="text-xs text-muted-foreground">tenants with upcoming due</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Last 30 days</CardTitle>
                  <CardDescription>Revenue & transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">₦{overviewData.data.billing.last30d.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{overviewData.data.billing.last30d.transactions} transactions</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>All tenants in this estate</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search tenants..."
                value={tenantSearch}
                onChange={(e) => {
                  setTenantSearch(e.target.value);
                  setPage(1);
                }}
                className="w-48"
              />
              <Dialog open={unitOpen} onOpenChange={setUnitOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Unit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Unit</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                    <div className="grid gap-2">
                      <Label>Unit label</Label>
                      <Input value={newUnitLabel} onChange={(e)=>setNewUnitLabel(e.target.value)} placeholder="e.g. Flat 2B" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Monthly price (₦)</Label>
                      <Input type="number" value={newUnitPrice} onChange={(e)=>setNewUnitPrice(e.target.value)} placeholder="e.g. 80000" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Service charge (monthly,  a5)</Label>
                      <Input type="number" value={newUnitServiceCharge} onChange={(e)=>setNewUnitServiceCharge(e.target.value)} placeholder="e.g. 5000" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Caution fee (₦)</Label>
                      <Input type="number" value={newUnitCautionFee} onChange={(e)=>setNewUnitCautionFee(e.target.value)} placeholder="e.g. 50000" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Legal fee (₦)</Label>
                      <Input type="number" value={newUnitLegalFee} onChange={(e)=>setNewUnitLegalFee(e.target.value)} placeholder="e.g. 30000" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Meter number (optional)</Label>
                      <Input value={newUnitMeter} onChange={(e)=>setNewUnitMeter(e.target.value)} placeholder="e.g. MTR-123456" />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                      <Label>Unit description (optional)</Label>
                      <Input value={newUnitDesc} onChange={(e)=>setNewUnitDesc(e.target.value)} placeholder="2-bedroom flat upstairs" />
                    </div>
                    <div className="md:col-span-2 grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label>Features (optional)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={()=>setNewUnitFeatures(f=>[...f,{ name:'', value:'' }])}>Add Feature</Button>
                      </div>
                      <div className="grid gap-2">
                        {newUnitFeatures.length === 0 ? (
                          <div className="text-sm text-muted-foreground">No features added.</div>
                        ) : (
                          newUnitFeatures.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                              <Input className="md:col-span-2" placeholder="Feature name (e.g. Bedrooms)" value={f.name} onChange={(e)=>{
                                const v = e.target.value; setNewUnitFeatures(arr=>arr.map((it,i)=>i===idx?{...it,name:v}:it));
                              }} />
                              <Input className="md:col-span-2" placeholder="Value (e.g. 2)" value={f.value} onChange={(e)=>{
                                const v = e.target.value; setNewUnitFeatures(arr=>arr.map((it,i)=>i===idx?{...it,value:v}:it));
                              }} />
                              <Button type="button" variant="ghost" onClick={()=>setNewUnitFeatures(arr=>arr.filter((_,i)=>i!==idx))}>Remove</Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={()=>setUnitOpen(false)}>Cancel</Button>
                    <Button onClick={async()=>{
                      if (!estateId) return;
                      const label = newUnitLabel.trim();
                      const price = Number(newUnitPrice);
                      const serviceCharge = Number(newUnitServiceCharge);
                      const cautionFee = Number(newUnitCautionFee);
                      const legalFee = Number(newUnitLegalFee);
                      if (!label || !Number.isFinite(price) || price <= 0) return;
                      try {
                        await createUnit({ 
                          estateId, 
                          body: { 
                            label, 
                            monthlyPrice: price, 
                            serviceChargeMonthly: Number.isFinite(serviceCharge) && serviceCharge > 0 ? serviceCharge : undefined,
                            cautionFee: Number.isFinite(cautionFee) && cautionFee > 0 ? cautionFee : undefined,
                            legalFee: Number.isFinite(legalFee) && legalFee > 0 ? legalFee : undefined,
                            meterNumber: newUnitMeter || undefined, 
                            description: newUnitDesc || undefined, 
                            features: newUnitFeatures
                              .filter(f=>f.name.trim() && f.value.trim())
                              .map(f=>({ name: f.name.trim(), value: f.value.trim() })),
                          } 
                        }).unwrap();
                        toast({ title: 'Unit added' });
                        setUnitOpen(false);
                        setNewUnitLabel('');
                        setNewUnitPrice('');
                        setNewUnitServiceCharge('');
                        setNewUnitCautionFee('');
                        setNewUnitLegalFee('');
                        setNewUnitMeter('');
                        setNewUnitDesc('');
                        setNewUnitFeatures([]);
                      } catch (e) {
                        toast({ title: 'Failed to add unit', variant: 'destructive' });
                      }
                    }} disabled={savingUnit}>{savingUnit ? 'Saving...' : 'Save'}</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button>Add Tenant</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Tenant</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                    <div className="grid gap-2">
                      <Label>Unit</Label>
                      <Select value={selectedUnitId} onValueChange={(v)=>setSelectedUnitId(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder={vacantUnits?.data?.length ? 'Select unit' : 'No vacant units'} />
                        </SelectTrigger>
                        <SelectContent>
                          {(vacantUnits?.data ?? []).map((u)=> (
                            <SelectItem key={u.unitId} value={u.unitId}>{u.label} — ₦{u.monthlyPrice.toLocaleString()}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Tenant name</Label>
                      <Input value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Tenant email</Label>
                      <Input type="email" value={tenantEmail} onChange={(e) => setTenantEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Tenant phone</Label>
                      <Input type="tel" value={tenantPhone} onChange={(e) => setTenantPhone(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Tenant type</Label>
                      <Select value={tenantType} onValueChange={(v: 'new' | 'existing' | 'renewal' | 'transfer') => setTenantType(v)}>
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
                      <Label>Entry date</Label>
                      <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Duration (months)</Label>
                      <Input
                        type="number"
                        min={1}
                        value={durationMonths}
                        onChange={(e) => setDurationMonths(e.target.value)}
                        placeholder="e.g. 4"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={submitTenant} disabled={creating}>
                      {creating ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tenantsLoading ? (
            <TableSkeleton 
              rows={5}
              columns={7}
              headers={["Unit", "Tenant", "Rent", "Meter", "Status", "Next Due", "WhatsApp"]}
            />
          ) : tenantsError ? (
            <div className="text-sm text-destructive">Failed to load tenants.</div>
          ) : tenants && ((Array.isArray(tenants) ? tenants.length : (tenants.data?.length || 0)) > 0) ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Meter</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(Array.isArray(tenants) ? tenants : tenants.data).map((t) => (
                    <TableRow key={(t.id || t._id) as string}>
                      <TableCell>{t.unitLabel || '—'}</TableCell>
                      <TableCell className="font-medium">
                        <button className="underline text-primary" onClick={()=>navigate(`/dashboard/tenant/${(t.id || t._id) as string}`)}>
                          {t.tenantName || `${t.firstName || ''} ${t.otherNames || ''} ${t.surname || ''}`.trim() || '—'}
                        </button>
                      </TableCell>
                      <TableCell>{typeof t.rentAmount === 'number' ? `₦${t.rentAmount.toLocaleString()}` : '—'}</TableCell>
                      <TableCell>{t.electricMeterNumber || '—'}</TableCell>
                      <TableCell>{t.status || '—'}</TableCell>
                      <TableCell>{t.nextDueDate ? formatDate(t.nextDueDate as string) : '—'}</TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">
                          {t.whatsapp || t.whatsappNumber || t.tenantPhone || '—'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/dashboard/tenant/${(t.id || t._id) as string}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={clearingUnit || !estateId}
                            onClick={async () => {
                              if (!estateId) return;
                              const unitId = ((t as any).unit && (t as any).unit._id)
                                || (t as any).unitId
                                || undefined;
                              if (!unitId) {
                                toast({ title: 'No unitId found for this tenant', variant: 'destructive' });
                                return;
                              }
                              try {
                                await clearUnitTenant({
                                  estateId: estateId as string,
                                  unitId,
                                }).unwrap();
                                toast({ title: 'Unit vacated, tenant cleared' });
                              } catch (e) {
                                toast({ title: 'Failed to vacate unit', variant: 'destructive' });
                              }
                            }}
                          >
                            {clearingUnit ? 'Vacating...' : 'Vacate Unit'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No tenants found.</div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-muted-foreground">
              Page {Array.isArray(tenants) ? page : (tenants?.page ?? page)} of {Array.isArray(tenants) ? '-' : (tenants?.total && tenants?.limit ? Math.ceil(tenants.total / tenants.limit) : '-')}
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={()=>setPage(p=>p+1)} disabled={!Array.isArray(tenants) && tenants?.total ? page * (tenants?.limit ?? limit) >= tenants.total : false}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
