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
    ArrowRight
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

export const VendorManagement: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: vendorsData, isLoading, isError } = useGetVendorsQuery();
    const [updateStatus] = useUpdateVendorStatusMutation();
    const [deleteVendor] = useDeleteVendorMutation();

    const vendors = vendorsData?.data || [];

    // Filter logic
    const filteredVendors = vendors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || v.type === categoryFilter;
        const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

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
                        onClick={() => navigate('/dashboard/vendor-onboarding')}
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
                                className="bg-transparent border-none outline-none text-sm w-full font-medium"
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
                                    <TableRow key={vendor.id || vendor._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
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
                                            <span className="text-sm font-semibold text-slate-600 capitalize">{vendor.type || 'N/A'}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-sm font-medium text-slate-600">{vendor.categories?.[0] || vendor.specialization || 'General'}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            {getStatusBadge(vendor.status || (vendor.isActive ? 'approved' : 'pending'))}
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="text-sm font-medium text-slate-500">
                                                {new Date(vendor.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-5 pr-6 text-right">
                                            <Button variant="link" className="text-blue-600 font-bold hover:no-underline group">
                                                Review Application <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                            </Button>
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

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between pb-8 px-1">
                <div className="text-sm text-slate-500 font-medium">
                    Showing <span className="text-slate-900">1</span> to <span className="text-slate-900">{filteredVendors.length}</span> of <span className="text-slate-900">{vendors.length}</span> vendors
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0" disabled><Clock className="w-4 h-4 rotate-180" /></Button>
                    <Button variant="solid" className="bg-blue-600 text-white rounded-lg h-9 w-9 p-0">1</Button>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0">2</Button>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0">3</Button>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0"><ArrowRight className="w-4 h-4" /></Button>
                </div>
            </div>
        </div>
    );
};
