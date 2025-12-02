import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DEMO_USERS, BUSINESSES } from "@/data/demoData";
import { Building, Users as UsersIcon, UserCog, MoreVertical, UserPlus, Shield, CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGetBusinessOwnersQuery, useUpdateBusinessOwnerMutation, useUpdateBusinessOwnerStatusMutation, useDeleteBusinessOwnerMutation } from "@/services/authApi";
import { useGetEstatesQuery } from "@/services/estatesApi";
import { BusinessOwnerOnboarding } from "./BusinessOwnerOnboarding";
import { toast } from "@/components/ui/use-toast";
import type { BusinessOwner } from "@/types/auth";

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
    return BUSINESSES.find(b => b.id === 'filling_station') || defaultBusiness;
  }
  if (user.role === 'manager') {
    const mapped = user.department ? departmentToBusinessId[user.department] : undefined;
    return BUSINESSES.find(b => b.id === mapped) || defaultBusiness;
  }
  return defaultBusiness;
}

export const AdminPeople = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

  // Business Owners (from API)
  const { data: businessOwnersData, isLoading: businessOwnersLoading } = useGetBusinessOwnersQuery(undefined, {
    skip: !isSuperAdmin,
  });
  const { data: estatesPage } = useGetEstatesQuery({ page: 1, limit: 100 });
  const [updateBusinessOwner, { isLoading: updating }] = useUpdateBusinessOwnerMutation();
  const [updateBusinessOwnerStatus, { isLoading: togglingStatus }] = useUpdateBusinessOwnerStatusMutation();
  const [deleteBusinessOwner, { isLoading: deleting }] = useDeleteBusinessOwnerMutation();

  // Managers and Vendors (from demo data)
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

  // Business Owner Edit State
  const [editOpen, setEditOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<BusinessOwner | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEstateIds, setEditEstateIds] = useState<string[]>([]);

  // Status Toggle State
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusOwner, setStatusOwner] = useState<BusinessOwner | null>(null);

  const businessOwners = businessOwnersData?.data ?? [];
  const estates = estatesPage?.data ?? [];

  const filteredBusinessOwners = businessOwners.filter(
    (bo) =>
      bo.name.toLowerCase().includes(search.toLowerCase()) ||
      bo.email.toLowerCase().includes(search.toLowerCase())
  );
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

  const openEdit = (owner: BusinessOwner) => {
    setEditingOwner(owner);
    setEditName(owner.name);
    setEditEmail(owner.email);
    setEditPhone(owner.phone);
    setEditEstateIds(owner.assignedEstates.map((e) => e._id));
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editingOwner) return;
    try {
      await updateBusinessOwner({
        id: editingOwner._id,
        data: {
          name: editName.trim(),
          email: editEmail.trim(),
          phone: editPhone.trim(),
          estateIds: editEstateIds,
        },
      }).unwrap();
      toast({ title: "Business owner updated successfully" });
      setEditOpen(false);
    } catch (error: any) {
      toast({
        title: "Failed to update business owner",
        description: error?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const openStatusToggle = (owner: BusinessOwner) => {
    setStatusOwner(owner);
    setStatusOpen(true);
  };

  const handleStatusToggle = async () => {
    if (!statusOwner) return;
    try {
      await updateBusinessOwnerStatus({
        id: statusOwner._id,
        isActive: !statusOwner.isActive,
      }).unwrap();
      toast({
        title: `Business owner ${!statusOwner.isActive ? 'activated' : 'deactivated'} successfully`,
      });
      setStatusOpen(false);
    } catch (error: any) {
      toast({
        title: "Failed to update status",
        description: error?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (ownerId: string) => {
    try {
      await deleteBusinessOwner(ownerId).unwrap();
      toast({ title: "Business owner deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Failed to delete business owner",
        description: error?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const toggleEstateSelection = (estateId: string) => {
    setEditEstateIds((prev) =>
      prev.includes(estateId) ? prev.filter((id) => id !== estateId) : [...prev, estateId]
    );
  };

  const assigned = selected ? getAssignedBusiness(selected) : null;

  const defaultTab = isSuperAdmin ? "business-owners" : "managers";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">People Management</h1>
          <p className="text-muted-foreground">Manage business owners, managers, and vendors</p>
        </div>
        {isSuperAdmin && <BusinessOwnerOnboarding />}
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          {isSuperAdmin && (
            <TabsTrigger value="business-owners">
              <Shield className="h-4 w-4 mr-2" />
              Business Owners ({filteredBusinessOwners.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="managers">
            <UserCog className="h-4 w-4 mr-2" />
            Managers ({filteredManagers.length})
          </TabsTrigger>
          <TabsTrigger value="vendors">
            <UsersIcon className="h-4 w-4 mr-2" />
            Vendors ({filteredVendors.length})
          </TabsTrigger>
        </TabsList>

        {/* Business Owners Tab */}
        {isSuperAdmin && (
          <TabsContent value="business-owners">
            <Card>
              <CardHeader>
                <CardTitle>Business Owners</CardTitle>
                <CardDescription>Manage business owners and their assigned estates</CardDescription>
              </CardHeader>
              <CardContent>
                {businessOwnersLoading ? (
                  <div className="text-sm text-muted-foreground">Loading business owners...</div>
                ) : filteredBusinessOwners.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No business owners found.</div>
                ) : (
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Assigned Estates</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBusinessOwners.map((owner) => (
                          <TableRow key={owner._id}>
                            <TableCell className="font-medium">{owner.name}</TableCell>
                            <TableCell>{owner.email}</TableCell>
                            <TableCell>{owner.phone}</TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                {owner.assignedEstates.map((estate) => (
                                  <Badge key={estate._id} variant="secondary" className="text-xs">
                                    {estate.name}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={owner.isActive ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                                {owner.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                {owner.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {owner.lastLogin
                                ? new Date(owner.lastLogin).toLocaleDateString()
                                : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEdit(owner)}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openStatusToggle(owner)}>
                                    {owner.isActive ? (
                                      <>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Deactivate
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Activate
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                        <span className="text-destructive">Delete</span>
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Business Owner?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete {owner.name}. Their assigned estates will not be deleted.
                                          This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDelete(owner._id)}
                                          className="bg-destructive hover:bg-destructive/90"
                                        >
                                          {deleting ? "Deleting..." : "Delete"}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Managers Tab */}
        <TabsContent value="managers">
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
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors">
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
        </TabsContent>
      </Tabs>

      {/* Manager/Vendor Detail Dialog */}
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

      {/* Edit Business Owner Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Business Owner</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Estate Selection */}
            <div className="grid gap-2">
              <Label>Assigned Estates</Label>
              <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                <div className="space-y-3">
                  {estates.map((estate) => (
                    <div
                      key={estate.id}
                      className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => toggleEstateSelection(estate.id)}
                    >
                      <Checkbox
                        checked={editEstateIds.includes(estate.id)}
                        onCheckedChange={() => toggleEstateSelection(estate.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{estate.name}</div>
                        {estate.description && (
                          <div className="text-xs text-muted-foreground">{estate.description}</div>
                        )}
                      </div>
                      {typeof estate.totalUnits === 'number' && (
                        <Badge variant="secondary" className="text-xs">
                          {estate.totalUnits} units
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={updating}>
                {updating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Toggle Dialog */}
      <AlertDialog open={statusOpen} onOpenChange={setStatusOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusOwner?.isActive ? 'Deactivate' : 'Activate'} Business Owner?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {statusOwner?.isActive
                ? `This will deactivate ${statusOwner?.name}. They will not be able to access the system.`
                : `This will activate ${statusOwner?.name}. They will be able to access the system again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusToggle} disabled={togglingStatus}>
              {togglingStatus ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
