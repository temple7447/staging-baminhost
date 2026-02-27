import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useUpdateEstateUnitMutation } from '@/services/estatesApi';
import { Badge } from '@/components/ui/badge';

interface PricingBreakdownCardProps {
  overview: any;
  tenant: any;
  detail: any;
}

export const PricingBreakdownCard = ({ overview, tenant, detail }: PricingBreakdownCardProps) => {
  const [updateUnit, { isLoading: updatingUnit }] = useUpdateEstateUnitMutation();
  const [editPricingOpen, setEditPricingOpen] = useState(false);
  const [editMonthlyPrice, setEditMonthlyPrice] = useState('');
  const [editServiceCharge, setEditServiceCharge] = useState('');
  const [editCautionFee, setEditCautionFee] = useState('');
  const [editLegalFee, setEditLegalFee] = useState('');

  const handleEditPricingOpen = () => {
    if (overview || tenant) {
      const o: any = overview || {};
      setEditMonthlyPrice(o.unitMonthlyPrice != null ? String(o.unitMonthlyPrice) : '');
      setEditServiceCharge(o.serviceChargeMonthly != null ? String(o.serviceChargeMonthly) : '');
      setEditCautionFee(o.cautionFee != null ? String(o.cautionFee) : '');
      setEditLegalFee(o.legalFee != null ? String(o.legalFee) : '');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pricing Breakdown</CardTitle>
            <CardDescription>Rent and associated fees</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog
              open={editPricingOpen}
              onOpenChange={(open) => {
                setEditPricingOpen(open);
                if (open) handleEditPricingOpen();
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit Fees</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Unit Pricing</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-sm">
                  <div className="grid gap-2">
                    <Label>Unit monthly price (₦)</Label>
                    <Input type="number" value={editMonthlyPrice} onChange={(e) => setEditMonthlyPrice(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Service charge (monthly, ₦)</Label>
                    <Input type="number" value={editServiceCharge} onChange={(e) => setEditServiceCharge(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Caution fee (₦)</Label>
                    <Input type="number" value={editCautionFee} onChange={(e) => setEditCautionFee(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Legal fee (₦)</Label>
                    <Input type="number" value={editLegalFee} onChange={(e) => setEditLegalFee(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setEditPricingOpen(false)}>Cancel</Button>
                  <Button
                    onClick={async () => {
                      const unitId = (tenant && (tenant as any).unit && (tenant as any).unit._id) || (detail as any)?.data?.unit?._id;
                      if (!unitId) {
                        toast({ title: 'No unitId available for this tenant', variant: 'destructive' });
                        return;
                      }
                      try {
                        const price = Number(editMonthlyPrice);
                        const svc = Number(editServiceCharge);
                        const caution = Number(editCautionFee);
                        const legal = Number(editLegalFee);
                        await updateUnit({
                          unitId,
                          body: {
                            monthlyPrice: Number.isFinite(price) && price > 0 ? price : undefined,
                            serviceChargeMonthly: Number.isFinite(svc) && svc >= 0 ? svc : undefined,
                            cautionFee: Number.isFinite(caution) && caution >= 0 ? caution : undefined,
                            legalFee: Number.isFinite(legal) && legal >= 0 ? legal : undefined,
                          },
                        }).unwrap();
                        toast({ title: 'Unit pricing updated' });
                        setEditPricingOpen(false);
                      } catch (e) {
                        toast({ title: 'Failed to update pricing', variant: 'destructive' });
                      }
                    }}
                    disabled={updatingUnit}
                  >
                    {updatingUnit ? 'Saving...' : 'Save changes'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!overview && !tenant ? (
          <div className="text-sm text-muted-foreground">No pricing info.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Rent (tenant)</div>
              <div>{typeof (overview?.rent ?? tenant?.rentAmount) === 'number'
                ? `₦${(overview?.rent ?? tenant?.rentAmount)!.toLocaleString()}`
                : '—'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Service charge (monthly)</div>
              <div className="flex items-center gap-2">
                <span>{typeof (overview?.serviceCharge ?? overview?.serviceChargeMonthly) === 'number'
                  ? `₦${(overview?.serviceCharge ?? overview?.serviceChargeMonthly)!.toLocaleString()}`
                  : '—'}</span>
                {overview?.serviceChargeIncreased && (
                  <Badge variant="outline" className="text-[8px] bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50 px-1 h-3">
                    Up
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Caution fee</div>
              <div>{typeof overview?.cautionFee === 'number'
                ? `₦${overview.cautionFee.toLocaleString()}`
                : '—'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Legal fee</div>
              <div>{typeof overview?.legalFee === 'number'
                ? `₦${overview.legalFee.toLocaleString()}`
                : '—'}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
