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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// Demo data removed - using only API data
import { Building, Users as UsersIcon, UserCog, MoreVertical, UserPlus, Shield, CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGetBusinessOwnersQuery, useUpdateBusinessOwnerMutation, useUpdateBusinessOwnerStatusMutation, useDeleteBusinessOwnerMutation, useGetManagersQuery, useUpdateManagerMutation, useUpdateManagerStatusMutation, useDeleteManagerMutation } from "@/services/authApi";
import { useGetEstatesQuery } from "@/services/estatesApi";
import { useGetVendorsQuery, useUpdateVendorMutation, useUpdateVendorStatusMutation, useDeleteVendorMutation } from "@/services/vendorsApi";
import { useGetBusinessTypesQuery } from "@/services/businessTypesApi";
import { BusinessOwnerOnboarding } from "./BusinessOwnerOnboarding";
import { VendorOnboarding } from "./VendorOnboarding";
import { ManagerOnboarding } from "./ManagerOnboarding";
import { toast } from "@/components/ui/use-toast";
import type { BusinessOwner, Manager } from "@/types/auth";
import type { Vendor } from "@/services/vendorsApi";

interface VendorDisplay {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'vendor' | string;
  isApiVendor?: boolean;
  isActive?: boolean;
  businessType?: string;
  businessName?: string;
  specialization?: string;
  phone?: string;
}



// Demo business assignment removed - using only API data

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

  // Vendors (from API)
  const { data: vendorsData, isLoading: vendorsLoading } = useGetVendorsQuery();
  const { data: businessTypesData } = useGetBusinessTypesQuery({ activeOnly: true });
  const [updateVendor, { isLoading: updatingVendor }] = useUpdateVendorMutation();
  const [updateVendorStatus, { isLoading: togglingVendorStatus }] = useUpdateVendorStatusMutation();
  const [deleteVendor, { isLoading: deletingVendor }] = useDeleteVendorMutation();

  // Managers (from API)
  const { data: managersData, isLoading: managersLoading } = useGetManagersQuery();
  const [updateManager, { isLoading: updatingManager }] = useUpdateManagerMutation();
  const [updateManagerStatus, { isLoading: togglingManagerStatus }] = useUpdateManagerStatusMutation();
  const [deleteManager, { isLoading: deletingManager }] = useDeleteManagerMutation();

  // Use API vendors only
  const apiVendors = vendorsData?.data ?? [];
  const allVendors = useMemo(() => {
    // Convert API vendors to match VendorDisplay interface for display
    const convertedApiVendors = apiVendors.map((v: any) => ({
      id: v.id || v._id || '',
      name: v.name,
      email: v.email,
      role: 'vendor' as const,
      isApiVendor: true,
      isActive: v.isActive,
      businessType: v.businessType,
      businessName: v.businessName,
      specialization: v.specialization,
      phone: v.phone,
    }));
    return convertedApiVendors;
  }, [apiVendors]);

  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<VendorDisplay | null>(null);

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

  // Vendor Status Toggle State
  const [vendorStatusOpen, setVendorStatusOpen] = useState(false);
  const [statusVendor, setStatusVendor] = useState<Vendor | null>(null);

  // Vendor Edit State
  const [editVendorOpen, setEditVendorOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [editVendorName, setEditVendorName] = useState('');
  const [editVendorEmail, setEditVendorEmail] = useState('');
  const [editVendorPhone, setEditVendorPhone] = useState('');
  const [editVendorBusinessTypeId, setEditVendorBusinessTypeId] = useState('');
  const [editVendorBusinessName, setEditVendorBusinessName] = useState('');
  const [editVendorSpecialization, setEditVendorSpecialization] = useState('');

  // Manager Edit State
  const [editManagerOpen, setEditManagerOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [editManagerName, setEditManagerName] = useState('');
  const [editManagerEmail, setEditManagerEmail] = useState('');
  const [editManagerPhone, setEditManagerPhone] = useState('');
  const [editManagerEstateIds, setEditManagerEstateIds] = useState<string[]>([]);

  // Manager Status Toggle State
  const [managerStatusOpen, setManagerStatusOpen] = useState(false);
  const [statusManager, setStatusManager] = useState<Manager | null>(null);

  const businessOwners = businessOwnersData?.data ?? [];
  const estates = estatesPage?.data ?? [];
  const businessTypes = businessTypesData?.data ?? [];
  const managers = managersData?.data ?? [];

  const filteredBusinessOwners = businessOwners.filter(
    (bo) =>
      bo.name.toLowerCase().includes(search.toLowerCase()) ||
      bo.email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredManagers = managers.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredVendors = allVendors.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase())
  );

  const openDetails = (user: VendorDisplay) => {
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

  // Vendor handlers
  const openVendorStatusToggle = (vendor: Vendor) => {
    setStatusVendor(vendor);
    setVendorStatusOpen(true);
  };

  const handleVendorStatusToggle = async () => {
    if (!statusVendor) return;
    try {
      await updateVendorStatus({
        id: statusVendor.id || statusVendor._id || '',
        isActive: !statusVendor.isActive,
      }).unwrap();
      toast({
        title: `Vendor ${!statusVendor.isActive ? 'activated' : 'deactivated'} successfully`,
      });
      setVendorStatusOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to update vendor status',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const openVendorEdit = (vendor: any) => {
    setEditingVendor(vendor);
    setEditVendorName(vendor.name);
    setEditVendorEmail(vendor.email);
    setEditVendorPhone(vendor.phone || '');
    setEditVendorBusinessTypeId(vendor.businessTypeId || '');
    setEditVendorBusinessName(vendor.businessName || '');
    setEditVendorSpecialization(vendor.specialization || '');
    setEditVendorOpen(true);
  };

  const handleVendorEdit = async () => {
    if (!editingVendor) return;
    try {
      await updateVendor({
        id: editingVendor.id || editingVendor._id || '',
        data: {
          name: editVendorName.trim(),
          email: editVendorEmail.trim(),
          phone: editVendorPhone.trim(),
          businessTypeId: editVendorBusinessTypeId || undefined,
          businessName: editVendorBusinessName.trim(),
          specialization: editVendorSpecialization.trim(),
        },
      }).unwrap();
      toast({ title: 'Vendor updated successfully' });
      setEditVendorOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to update vendor',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleVendorDelete = async (vendorId: string) => {
    try {
      await deleteVendor(vendorId).unwrap();
      toast({ title: 'Vendor deleted successfully' });
    } catch (error: any) {
      toast({
        title: 'Failed to delete vendor',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  // Manager handlers
  const openManagerEdit = (manager: Manager) => {
    setEditingManager(manager);
    setEditManagerName(manager.name);
    setEditManagerEmail(manager.email);
    setEditManagerPhone(manager.phone);
    setEditManagerEstateIds(manager.assignedEstates.map((e) => e._id));
    setEditManagerOpen(true);
  };

  const handleManagerEdit = async () => {
    if (!editingManager) return;
    try {
      await updateManager({
        id: editingManager._id,
        data: {
          name: editManagerName.trim(),
          email: editManagerEmail.trim(),
          phone: editManagerPhone.trim(),
          estateIds: editManagerEstateIds,
        },
      }).unwrap();
      toast({ title: 'Manager updated successfully' });
      setEditManagerOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to update manager',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const openManagerStatusToggle = (manager: Manager) => {
    setStatusManager(manager);
    setManagerStatusOpen(true);
  };

  const handleManagerStatusToggle = async () => {
    if (!statusManager) return;
    try {
      await updateManagerStatus({
        id: statusManager._id,
        isActive: !statusManager.isActive,
      }).unwrap();
      toast({
        title: `Manager ${!statusManager.isActive ? 'activated' : 'deactivated'} successfully`,
      });
      setManagerStatusOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to update manager status',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleManagerDelete = async (managerId: string) => {
    try {
      await deleteManager(managerId).unwrap();
      toast({ title: 'Manager deleted successfully' });
    } catch (error: any) {
      toast({
        title: 'Failed to delete manager',
        description: error?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const toggleManagerEstateSelection = (estateId: string) => {
    setEditManagerEstateIds((prev) =>
      prev.includes(estateId) ? prev.filter((id) => id !== estateId) : [...prev, estateId]
    );
  };

  // Demo assignment removed
  const assigned = null;

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
              <div className="flex items-center gap-2">
                <Badge variant="outline">{filteredManagers.length}</Badge>
                <ManagerOnboarding />
              </div>
            </CardHeader>
            <CardContent>
              {managersLoading ? (
                <div className="text-sm text-muted-foreground">Loading managers...</div>
              ) : filteredManagers.length === 0 ? (
                <div className="text-sm text-muted-foreground">No managers found.</div>
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
                      {filteredManagers.map((manager) => (
                        <TableRow key={manager._id}>
                          <TableCell className="font-medium">{manager.name}</TableCell>
                          <TableCell>{manager.email}</TableCell>
                          <TableCell>{manager.phone}</TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {manager.assignedEstates.map((estate) => (
                                <Badge key={estate._id} variant="secondary" className="text-xs">
                                  {estate.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={manager.isActive ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                              {manager.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              {manager.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {manager.lastLogin
                              ? new Date(manager.lastLogin).toLocaleDateString()
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
                                <DropdownMenuItem onClick={() => openManagerEdit(manager)}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openManagerStatusToggle(manager)}>
                                  {manager.isActive ? (
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
                                      <AlertDialogTitle>Delete Manager?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete {manager.name}. Their assigned estates will not be deleted.
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleManagerDelete(manager._id)}
                                        className="bg-destructive hover:bg-destructive/90"
                                      >
                                        {deletingManager ? "Deleting..." : "Delete"}
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

        {/* Vendors Tab */}
        <TabsContent value="vendors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                <CardTitle>Vendors</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{filteredVendors.length}</Badge>
                <VendorOnboarding />
              </div>
            </CardHeader>
            <CardContent>
              {vendorsLoading ? (
                <div className="text-sm text-muted-foreground">Loading vendors...</div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVendors.map((v: any) => (
                        <TableRow key={v.id}>
                          <TableCell className="font-medium">{v.name}</TableCell>
                          <TableCell>{v.email}</TableCell>
                          <TableCell>
                            {v.businessName || v.businessType ? (
                              <div className="text-sm">
                                {v.businessName && <div>{v.businessName}</div>}
                                {v.businessType && <div className="text-muted-foreground text-xs">{v.businessType}</div>}
                              </div>
                            ) : (
                              '—'
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={v.isActive ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                              {v.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              {v.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openVendorEdit(v)}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openVendorStatusToggle(v)}>
                                  {v.isActive ? (
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
                                      <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete {v.name}. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleVendorDelete(v.id)}
                                        className="bg-destructive hover:bg-destructive/90"
                                      >
                                        {deletingVendor ? "Deleting..." : "Delete"}
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

              {/* Assigned Business and Performance cards removed - demo data only */}
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

      {/* Edit Vendor Dialog */}
      <Dialog open={editVendorOpen} onOpenChange={setEditVendorOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>Update vendor information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-vendor-name">Full Name</Label>
              <Input
                id="edit-vendor-name"
                value={editVendorName}
                onChange={(e) => setEditVendorName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-vendor-email">Email</Label>
              <Input
                id="edit-vendor-email"
                type="email"
                value={editVendorEmail}
                onChange={(e) => setEditVendorEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-vendor-phone">Phone</Label>
              <Input
                id="edit-vendor-phone"
                type="tel"
                value={editVendorPhone}
                onChange={(e) => setEditVendorPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-vendor-business-type">Business Type</Label>
              <Select value={editVendorBusinessTypeId} onValueChange={setEditVendorBusinessTypeId}>
                <SelectTrigger id="edit-vendor-business-type">
                  <SelectValue placeholder="Select business type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-vendor-business-name">Business Name</Label>
                <Input
                  id="edit-vendor-business-name"
                  value={editVendorBusinessName}
                  onChange={(e) => setEditVendorBusinessName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-vendor-specialization">Specialization</Label>
                <Input
                  id="edit-vendor-specialization"
                  value={editVendorSpecialization}
                  onChange={(e) => setEditVendorSpecialization(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditVendorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVendorEdit} disabled={updatingVendor}>
              {updatingVendor ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vendor Status Toggle Dialog */}
      <AlertDialog open={vendorStatusOpen} onOpenChange={setVendorStatusOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusVendor?.isActive ? 'Deactivate' : 'Activate'} Vendor?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {statusVendor?.isActive
                ? `This will deactivate ${statusVendor?.name}. They will not be able to access the system.`
                : `This will activate ${statusVendor?.name}. They will be able to access the system again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleVendorStatusToggle} disabled={togglingVendorStatus}>
              {togglingVendorStatus ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Manager Dialog */}
      <Dialog open={editManagerOpen} onOpenChange={setEditManagerOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Manager</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-manager-name">Full Name</Label>
                <Input
                  id="edit-manager-name"
                  value={editManagerName}
                  onChange={(e) => setEditManagerName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-manager-email">Email</Label>
                <Input
                  id="edit-manager-email"
                  type="email"
                  value={editManagerEmail}
                  onChange={(e) => setEditManagerEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-manager-phone">Phone</Label>
                <Input
                  id="edit-manager-phone"
                  type="tel"
                  value={editManagerPhone}
                  onChange={(e) => setEditManagerPhone(e.target.value)}
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
                      onClick={() => toggleManagerEstateSelection(estate.id)}
                    >
                      <Checkbox
                        checked={editManagerEstateIds.includes(estate.id)}
                        onCheckedChange={() => toggleManagerEstateSelection(estate.id)}
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
              <Button variant="outline" onClick={() => setEditManagerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleManagerEdit} disabled={updatingManager}>
                {updatingManager ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manager Status Toggle Dialog */}
      <AlertDialog open={managerStatusOpen} onOpenChange={setManagerStatusOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusManager?.isActive ? 'Deactivate' : 'Activate'} Manager?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {statusManager?.isActive
                ? `This will deactivate ${statusManager?.name}. They will not be able to access the system.`
                : `This will activate ${statusManager?.name}. They will be able to access the system again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleManagerStatusToggle} disabled={togglingManagerStatus}>
              {togglingManagerStatus ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
