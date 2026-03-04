import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    UserPlus,
    ArrowRight,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    useGetVendorsQuery,
    useUpdateVendorStatusMutation,
    useDeleteVendorMutation
} from '@/services/vendorsApi';
import { TableSkeleton } from '@/components/ui/skeletons';
import { toast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils";
import { AddVendorModal } from './AddVendorModal';
import { DeleteVendorDialog } from './DeleteVendorDialog';

export const VendorManagement: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(20);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState<{ id: string; name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: vendorsData, isLoading, isError } = useGetVendorsQuery({
        page: currentPage,
        limit: pageSize
    });

    const [updateStatus] = useUpdateVendorStatusMutation();
    const [deleteVendorMutation] = useDeleteVendorMutation();

    const vendors = vendorsData?.data || [];
    const totalPages = vendorsData?.pagination?.totalPages || 1;
    const totalVendors = vendorsData?.total || 0;

    const handleDeleteVendor = async () => {
        if (!vendorToDelete) return;

        setIsDeleting(true);
        try {
            await deleteVendorMutation(vendorToDelete.id).unwrap();
            toast({
                title: "Vendor Deactivated",
                description: `${vendorToDelete.name} has been deactivated successfully.`
            });
            setDeleteDialogOpen(false);
            setVendorToDelete(null);
        } catch (err: any) {
            toast({
                title: "Deactivation Failed",
                description: err?.data?.message || "Failed to deactivate vendor. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const openDeleteDialog = (id: string, name: string) => {
        setVendorToDelete({ id, name });
        setDeleteDialogOpen(true);
    };

    // Filter logic
    const filteredVendors = vendors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (v.businessName || '').toLowerCase().includes(searchTerm.toLowerCase());

        // Since 'type' is not in the list response, we'll match against specialization or categories if they exist
        const matchesCategory = categoryFilter === 'all' ||
            (v.specialization || '').toLowerCase().includes(categoryFilter.toLowerCase());

        const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</Badge>;
            case 'pending':
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 gap-1.5"><Clock className="w-3.5 h-3.5" /> Pending</Badge>;
            case 'suspended':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Suspended</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 p-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Vendor Management</h1>
                    <p className="text-slate-500 mt-1">Manage, approve, and track your business partners.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="hidden md:flex gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-500/20"
                        onClick={() => setIsAddVendorModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" /> Add New Vendor
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-0">+12%</Badge>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-slate-900">{vendors.length}</div>
                            <div className="text-sm text-slate-500 font-medium mt-1">Total Vendors</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 border-0">8 urgent</Badge>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-slate-900">
                                {vendors.filter(v => v.status === 'pending').length}
                            </div>
                            <div className="text-sm text-slate-500 font-medium mt-1">Pending Approvals</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 border-0">Rating 4.8</Badge>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-slate-900">156</div>
                            <div className="text-sm text-slate-500 font-medium mt-1">Top Performing</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <Card className="border-slate-200/60 shadow-md shadow-slate-200/20 overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-1 items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 max-w-md focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search across vendors..."
                                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-900 placeholder:text-slate-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[160px] h-10 rounded-xl bg-white border-slate-200 shadow-sm font-medium">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent borderRadius="xl">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="service">Services</SelectItem>
                                    <SelectItem value="product">Products</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px] h-10 rounded-xl bg-white border-slate-200 shadow-sm font-medium">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent borderRadius="xl">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="p-8">
                            <TableSkeleton rows={5} columns={6} />
                        </div>
                    ) : filteredVendors.length > 0 ? (
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-slate-100 hover:bg-transparent">
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4 pl-6">Vendor Name</TableHead>
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">Type</TableHead>
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">Category</TableHead>
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">Status</TableHead>
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">Registration Date</TableHead>
                                    <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4 pr-6 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVendors.map((vendor) => (
                                    <TableRow key={vendor._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="py-5 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm",
                                                    vendor.status === 'approved' ? "bg-blue-50 text-blue-600" :
                                                        vendor.status === 'pending' ? "bg-amber-50 text-amber-600" :
                                                            "bg-slate-100 text-slate-600"
                                                )}>
                                                    {vendor.name.charAt(0).toUpperCase()}
                                                    {vendor.name.split(' ')[1]?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{vendor.name}</div>
                                                    <div className="text-xs text-slate-500 font-medium">{vendor.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-sm font-semibold text-slate-700 capitalize">Vendor</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-sm font-medium text-slate-700">{vendor.specialization || 'General'}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            {getStatusBadge(vendor.status || (vendor.isActive ? 'approved' : 'pending'))}
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-sm font-medium text-slate-700">
                                                {new Date(vendor.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-5 pr-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="link" 
                                                    className="text-blue-600 font-bold hover:no-underline group"
                                                >
                                                    Review <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => openDeleteDialog(vendor._id, vendor.name)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No vendors found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mt-1">
                                {searchTerm ? `We couldn't find any vendors matching "${searchTerm}"` : "Get started by adding your first business partner."}
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6 font-bold"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear Search
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between pb-8 px-1">
                <div className="text-sm text-slate-600 font-medium">
                    Showing <span className="text-slate-900 font-semibold">{vendors.length > 0 ? ((currentPage - 1) * pageSize) + 1 : 0}</span> to <span className="text-slate-900 font-semibold">{Math.min(currentPage * pageSize, totalVendors)}</span> of <span className="text-slate-900 font-semibold">{totalVendors}</span> vendors
                </div>
                <div className="flex items-center gap-1">
                    {/* Previous Button */}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg h-9 w-9 p-0" 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </Button>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                            <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "solid" : "outline"}
                                size="sm"
                                className={cn(
                                    "rounded-lg h-9 w-9 p-0 text-sm font-semibold",
                                    currentPage === pageNum 
                                        ? "bg-blue-600 text-white border-blue-600" 
                                        : "hover:bg-slate-100"
                                )}
                                onClick={() => handlePageClick(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}

                    {/* Show ellipsis if needed */}
                    {totalPages > 5 && currentPage > 3 && (
                        <span className="text-slate-400 px-2">...</span>
                    )}

                    {/* Next Button */}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg h-9 w-9 p-0" 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Add Vendor Modal */}
            <AddVendorModal 
              open={isAddVendorModalOpen} 
              onOpenChange={setIsAddVendorModalOpen} 
            />

            {/* Delete Vendor Dialog */}
            <DeleteVendorDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              vendorName={vendorToDelete?.name || ''}
              onConfirm={handleDeleteVendor}
              isLoading={isDeleting}
            />
        </div>
    );
};
