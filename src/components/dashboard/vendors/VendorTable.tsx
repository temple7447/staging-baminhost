import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreVertical, Pencil, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import type { Vendor } from '@/services/vendorsApi';

interface VendorTableProps {
  vendors: Vendor[];
  isLoading?: boolean;
  onEdit: (vendor: Vendor) => void;
  onStatusToggle: (vendor: Vendor) => void;
  onDelete: (vendorId: string, vendorName: string) => void;
}

export const VendorTable: React.FC<VendorTableProps> = ({
  vendors,
  isLoading = false,
  onEdit,
  onStatusToggle,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading vendors...</div>;
  }

  if (vendors.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No vendors found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Business</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor._id}>
            <TableCell className="font-medium">{vendor.name}</TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>
              {vendor.businessName || vendor.specialization || '—'}
            </TableCell>
            <TableCell>
              <Badge variant={vendor.isActive ? 'default' : 'destructive'} className="flex items-center gap-1 w-fit">
                {vendor.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {vendor.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(vendor)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusToggle(vendor)}>
                    {vendor.isActive ? (
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
                          This will permanently delete {vendor.name}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(vendor._id, vendor.name)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete
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
  );
};
