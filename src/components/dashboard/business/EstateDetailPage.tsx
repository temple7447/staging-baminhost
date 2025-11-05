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
import { useGetEstateQuery, useGetEstateTenantsQuery, useCreateEstateTenantMutation, useGetEstateOverviewQuery } from '@/services/estatesApi';
import { toast } from '@/components/ui/use-toast';
import { EstateDetailSkeleton, TableSkeleton } from '@/components/ui/skeletons';

export const EstateDetailPage = () => {
  const { estateId } = useParams();
  const navigate = useNavigate();
  
  // All useState hooks must be called before any conditional returns
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [tenantSearch, setTenantSearch] = useState('');
  // Add Tenant form state
  const [addOpen, setAddOpen] = useState(false);
  const [unitLabel, setUnitLabel] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [tenantType, setTenantType] = useState<'new' | 'existing' | 'renewal' | 'transfer'>('new');
  const [meter, setMeter] = useState('');
  const [nextDue, setNextDue] = useState('');

  // API hooks
  const { data: estate, isLoading } = useGetEstateQuery(estateId as string, { skip: !estateId });
  const { data: overviewData, isLoading: overviewLoading } = useGetEstateOverviewQuery(estateId as string, { skip: !estateId });
  const { data: tenants, isLoading: tenantsLoading } = useGetEstateTenantsQuery({ estateId: estateId as string, page, limit, search: tenantSearch || undefined }, { skip: !estateId });
  const [createTenant, { isLoading: creating }] = useCreateEstateTenantMutation();

  // Show full page skeleton while main data is loading
  if (isLoading || overviewLoading) {
    return <EstateDetailSkeleton />;
  }

  const submitTenant = async () => {
    if (!estateId || !tenantName.trim() || !unitLabel.trim() || !rentAmount) return;
    try {
      await createTenant({ estateId, body: {
        unitLabel: unitLabel.trim(),
        tenantName: tenantName.trim(),
        tenantEmail: tenantEmail || undefined,
        tenantPhone: tenantPhone || undefined,
        rentAmount: Number(rentAmount),
        tenantType,
        electricMeterNumber: meter || undefined,
        nextDueDate: nextDue || undefined,
        status: 'occupied',
      }}).unwrap();
      toast({ title: 'Tenant added' });
      setAddOpen(false);
      setUnitLabel(''); setTenantName(''); setTenantEmail(''); setTenantPhone(''); setRentAmount(''); setTenantType('new'); setMeter(''); setNextDue('');
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
            <div className="text-sm text-muted-foreground">No overview.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Occupancy</CardTitle>
                  <CardDescription>Total vs. occupied</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{overviewData.data.occupancy.occupancyRate}%</div>
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
                      <Label>Unit label</Label>
                      <Input value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} placeholder="e.g. Unit 12" />
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
                      <Label>Rent amount (₦)</Label>
                      <Input type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} />
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
                      <Label>Electric meter number</Label>
                      <Input value={meter} onChange={(e) => setMeter(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Next due date</Label>
                      <Input type="date" value={nextDue} onChange={(e) => setNextDue(e.target.value)} />
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
              headers={["Unit", "Tenant", "Rent", "Meter", "Status", "Next Due", "Contact"]}
            />
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
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(Array.isArray(tenants) ? tenants : tenants.data).map((t) => (
                    <TableRow key={(t.id || t._id) as string}>
                      <TableCell>{t.unitLabel || '—'}</TableCell>
                      <TableCell className="font-medium">
                        <button className="underline text-primary" onClick={()=>navigate(`/dashboard/tenant/${(t.id || t._id) as string}`)}>
                          {t.tenantName}
                        </button>
                      </TableCell>
                      <TableCell>{typeof t.rentAmount === 'number' ? `₦${t.rentAmount.toLocaleString()}` : '—'}</TableCell>
                      <TableCell>{t.electricMeterNumber || '—'}</TableCell>
                      <TableCell>{t.status || '—'}</TableCell>
                      <TableCell>{t.nextDueDate || '—'}</TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <div>{t.tenantEmail || '—'}</div>
                          <div>{t.tenantPhone || '—'}</div>
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
