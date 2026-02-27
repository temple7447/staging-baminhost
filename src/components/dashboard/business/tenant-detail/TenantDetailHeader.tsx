import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useUpdateTenantMutation } from '@/services/estatesApi';

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

interface TenantDetailHeaderProps {
  tenantId?: string;
  tenant: any;
  overview: any;
}

export const TenantDetailHeader = ({ tenantId, tenant, overview }: TenantDetailHeaderProps) => {
  const navigate = useNavigate();
  const [updateTenant, { isLoading: updatingTenant }] = useUpdateTenantMutation();

  // Tenant edit state
  const [editTenantOpen, setEditTenantOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editType, setEditType] = useState<'new' | 'existing' | 'renewal' | 'transfer'>('new');



  const handleEditTenantOpen = () => {
    if (tenant) {
      setEditName(overview?.name || tenant.tenantName || '');
      setEditEmail(tenant.email || overview?.email || tenant.tenantEmail || '');
      setEditPhone(tenant.whatsapp || tenant.whatsappNumber || overview?.phone || tenant.tenantPhone || '');
      setEditType((tenant.tenantType as any) || 'new');
    }
  };



  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Tenant Overview</h1>
        <p className="text-muted-foreground">Profile, history, and transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={editTenantOpen} onOpenChange={(open) => {
          setEditTenantOpen(open);
          if (open) handleEditTenantOpen();
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit Tenant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tenant</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-sm">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name"
                  disabled={false}
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email"
                  type="email" 
                  disabled={false}
                  value={editEmail} 
                  onChange={(e) => setEditEmail(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone / WhatsApp</Label>
                <Input 
                  id="edit-phone"
                  disabled={false}
                  value={editPhone} 
                  onChange={(e) => setEditPhone(e.target.value)} 
                />
              </div>


            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setEditTenantOpen(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  if (!tenantId) return;
                  try {
                    await updateTenant({
                      tenantId: tenantId as string,
                      tenantName: editName || undefined,
                      tenantEmail: editEmail || undefined,
                      tenantPhone: editPhone || undefined,
                      tenantType: editType,
                    } as any).unwrap();
                    toast({ title: 'Tenant updated' });
                    setEditTenantOpen(false);
                  } catch (e) {
                    toast({ title: 'Failed to update tenant', variant: 'destructive' });
                  }
                }}
                disabled={updatingTenant}
              >
                {updatingTenant ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
};
