import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetTenantQuery } from '@/services/estatesApi';

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
          <CardTitle className="flex items-center justify-between">
            <span>{overview?.name || tenant?.tenantName || '—'}</span>
            {(overview?.typeBadge || tenant?.tenantType) && <Badge variant="secondary">{overview?.typeBadge || tenant?.tenantType}</Badge>}
          </CardTitle>
          {(overview?.unit || tenant?.unitLabel) && <CardDescription>Unit: {overview?.unit || tenant?.unitLabel}</CardDescription>}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : !tenant ? (
            <div className="text-sm text-muted-foreground">Tenant not found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">ID</div>
                <div className="font-mono break-all">{tenant.id}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Email</div>
                <div>{overview?.email || tenant?.tenantEmail || '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div>{overview?.phone || tenant?.tenantPhone || '—'}</div>
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
          <CardTitle>Tenancy History</CardTitle>
          <CardDescription>Lifecycle events for this tenant</CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="text-sm text-muted-foreground">Loading history...</div>
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
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Payments and charges</CardDescription>
        </CardHeader>
        <CardContent>
          {txLoading ? (
            <div className="text-sm text-muted-foreground">Loading transactions...</div>
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
