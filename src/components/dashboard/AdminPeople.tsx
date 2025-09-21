import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DEMO_USERS, BUSINESSES } from "@/data/demoData";
import { Building, Users as UsersIcon, UserCog, Percent, TrendingUp } from "lucide-react";

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'vendor' | string;
  department?: string;
  hourlyRate?: number;
  commissionRate?: number;
  totalEarnings?: number;
}

const departmentToBusinessId: Record<string, 'estate' | 'filling_station' | 'equipment'> = {
  operations: 'estate',
  legal_security: 'estate',
  marketing: 'filling_station',
  sales: 'filling_station',
  delivery: 'equipment',
  financial: 'estate',
  fundraising: 'estate',
  automation: 'equipment',
};

function getAssignedBusiness(user: DemoUser) {
  const defaultBusiness = BUSINESSES[0];
  if (user.role === 'vendor') {
    // Roughly tie vendors to filling station for demo variety
    return BUSINESSES.find(b => b.id === 'filling_station') || defaultBusiness;
  }
  if (user.role === 'manager') {
    const mapped = user.department ? departmentToBusinessId[user.department] : undefined;
    return BUSINESSES.find(b => b.id === mapped) || defaultBusiness;
  }
  return defaultBusiness;
}

export const AdminPeople = () => {
  const managers = useMemo(
    () => (DEMO_USERS as DemoUser[]).filter((u) => u.role === 'manager'),
    []
  );
  const vendors = useMemo(
    () => (DEMO_USERS as DemoUser[]).filter((u) => u.role === 'vendor'),
    []
  );

  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<DemoUser | null>(null);

  const filteredManagers = managers.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredVendors = vendors.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase())
  );

  const openDetails = (user: DemoUser) => {
    setSelected(user);
    setDetailOpen(true);
  };

  const assigned = selected ? getAssignedBusiness(selected) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Input
          placeholder="Search managers or vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <CardTitle>Managers</CardTitle>
            </div>
            <Badge variant="outline">{filteredManagers.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredManagers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell className="capitalize">{u.department?.replace('_', ' ') || '—'}</TableCell>
                      <TableCell>{u.hourlyRate ? `₦${u.hourlyRate.toLocaleString()}/hr` : '—'}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openDetails(u)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              <CardTitle>Vendors</CardTitle>
            </div>
            <Badge variant="outline">{filteredVendors.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        {u.commissionRate != null ? (
                          <span>{u.commissionRate}%</span>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell>
                        {u.totalEarnings != null ? `₦${u.totalEarnings.toLocaleString()}` : '—'}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openDetails(u)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          {selected && assigned && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>
                  {selected.role === 'manager' ? 'Manager' : 'Vendor'} • {selected.email}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building className="h-4 w-4" /> Assigned Business
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="font-medium">{assigned.name}</div>
                    <div className="text-muted-foreground capitalize">{assigned.type.replace('_', ' ')}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                        <div className="font-semibold">₦{assigned.monthlyRevenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Net Profit</div>
                        <div className="font-semibold text-green-600">₦{assigned.netProfit.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Efficiency</span>
                        <span>{assigned.performance.efficiency}%</span>
                      </div>
                      <Progress value={assigned.performance.efficiency} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Percent className="h-3 w-3" /> ROI: {assigned.performance.roi}%
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Growth: {assigned.performance.growthRate}%
                      </Badge>
                    </div>

                    {selected.role === 'manager' && selected.hourlyRate != null && (
                      <div className="text-xs text-muted-foreground">
                        Hourly Rate: <span className="font-medium text-foreground">₦{selected.hourlyRate.toLocaleString()}/hr</span>
                      </div>
                    )}
                    {selected.role === 'vendor' && selected.commissionRate != null && (
                      <div className="text-xs text-muted-foreground">
                        Commission Rate: <span className="font-medium text-foreground">{selected.commissionRate}%</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
