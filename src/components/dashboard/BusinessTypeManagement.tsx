import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Plus, Loader2, MoreVertical, Pencil, Trash2, Briefcase, CheckCircle, XCircle } from 'lucide-react';
import {
    useGetBusinessTypesQuery,
    useCreateBusinessTypeMutation,
    useUpdateBusinessTypeMutation,
    useDeleteBusinessTypeMutation,
} from '@/services/businessTypesApi';
import { toast } from '@/components/ui/use-toast';
import type { BusinessType } from '@/services/businessTypesApi';

export const BusinessTypeManagement = () => {
    const { data: businessTypesData, isLoading } = useGetBusinessTypesQuery({ activeOnly: false });
    const [createBusinessType, { isLoading: creating }] = useCreateBusinessTypeMutation();
    const [updateBusinessType, { isLoading: updating }] = useUpdateBusinessTypeMutation();
    const [deleteBusinessType, { isLoading: deleting }] = useDeleteBusinessTypeMutation();

    // Create/Edit Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<BusinessType | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const businessTypes = businessTypesData?.data || [];

    const resetForm = () => {
        setName('');
        setDescription('');
        setEditingType(null);
    };

    const handleOpenDialog = (type?: BusinessType) => {
        if (type) {
            setEditingType(type);
            setName(type.name);
            setDescription(type.description || '');
        } else {
            resetForm();
        }
        setDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Please enter a business type name',
                variant: 'destructive',
            });
            return;
        }

        try {
            if (editingType) {
                // Update existing business type
                await updateBusinessType({
                    id: editingType._id,
                    data: {
                        name: name.trim(),
                        description: description.trim() || undefined,
                    },
                }).unwrap();
                toast({ title: 'Business type updated successfully' });
            } else {
                // Create new business type
                await createBusinessType({
                    name: name.trim(),
                    description: description.trim() || undefined,
                }).unwrap();
                toast({ title: 'Business type created successfully' });
            }
            resetForm();
            setDialogOpen(false);
        } catch (error: any) {
            toast({
                title: editingType ? 'Failed to update business type' : 'Failed to create business type',
                description: error?.data?.message || 'An error occurred',
                variant: 'destructive',
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBusinessType(id).unwrap();
            toast({ title: 'Business type deleted successfully' });
        } catch (error: any) {
            toast({
                title: 'Failed to delete business type',
                description: error?.data?.message || 'An error occurred',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Business Types</h1>
                    <p className="text-muted-foreground">Manage business types for vendor categorization</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Business Type
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingType ? 'Edit Business Type' : 'Create Business Type'}</DialogTitle>
                            <DialogDescription>
                                {editingType
                                    ? 'Update the business type information'
                                    : 'Add a new business type for vendor categorization'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Plumbing"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description (Optional)</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="e.g., Plumbing and water-related services"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        resetForm();
                                        setDialogOpen(false);
                                    }}
                                    disabled={creating || updating}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={creating || updating}>
                                    {(creating || updating) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    {editingType ? (updating ? 'Updating...' : 'Update') : creating ? 'Creating...' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Business Types
                            </CardTitle>
                            <CardDescription>Categorize vendors by their business type</CardDescription>
                        </div>
                        <Badge variant="outline">{businessTypes.length}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading business types...
                        </div>
                    ) : businessTypes.length === 0 ? (
                        <div className="text-center py-8">
                            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                            <p className="text-lg font-medium">No business types yet</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Create your first business type to categorize vendors
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-md border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {businessTypes.map((type) => (
                                        <TableRow key={type._id}>
                                            <TableCell className="font-medium">{type.name}</TableCell>
                                            <TableCell className="max-w-md">
                                                {type.description || <span className="text-muted-foreground">—</span>}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={type.isActive ? 'default' : 'secondary'} className="flex items-center gap-1 w-fit">
                                                    {type.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                                    {type.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(type.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleOpenDialog(type)}>
                                                            <Pencil className="h-4 w-4 mr-2" />
                                                            Edit
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
                                                                    <AlertDialogTitle>Delete Business Type?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will deactivate "{type.name}". Vendors with this business type will not be
                                                                        affected. This action can be reversed by contacting support.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(type._id)}
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        {deleting ? 'Deleting...' : 'Delete'}
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
        </div>
    );
};
