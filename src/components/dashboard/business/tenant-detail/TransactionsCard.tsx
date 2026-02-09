import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Receipt, Download, Mail, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLazyDownloadPaymentReceiptQuery, useResendPaymentReceiptMutation } from '@/services/estatesApi';
import { TableSkeleton } from '@/components/ui/skeletons';
import { PaymentCollectionDialog } from './PaymentCollectionDialog';

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

interface TransactionsCardProps {
  tenantId?: string;
  transactions: any[];
  isLoading: boolean;
  overview: any;
  tenant: any;
  billingData: any;
}

export const TransactionsCard = ({
  tenantId,
  transactions,
  isLoading,
  overview,
  tenant,
  billingData
}: TransactionsCardProps) => {
  const navigate = useNavigate();
  const [payOpen, setPayOpen] = useState(false);
  const [triggerDownload, { isFetching: isDownloading }] = useLazyDownloadPaymentReceiptQuery();
  const [resendEmail, { isLoading: isEmailing }] = useResendPaymentReceiptMutation();

  const handleDownload = async (paymentId: string) => {
    try {
      const result = await triggerDownload(paymentId).unwrap();
      const url = window.URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', result.filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast({ title: "Success", description: "Receipt download started." });
    } catch (error) {
      toast({ title: "Download Failed", description: "Could not generate PDF receipt.", variant: "destructive" });
    }
  };

  const handleEmail = async (paymentId: string) => {
    try {
      await resendEmail(paymentId).unwrap();
      toast({ title: "Email Sent", description: "Receipt has been resent to tenant email." });
    } catch (error) {
      toast({ title: "Email Failed", description: "Could not resend email receipt.", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Payments and charges</CardDescription>
          </div>
          <PaymentCollectionDialog
            tenantId={tenantId}
            overview={overview}
            tenant={tenant}
            billingData={billingData}
            open={payOpen}
            onOpenChange={setPayOpen}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton
            rows={4}
            columns={5}
            headers={["Date", "Type", "Status", "Amount", "Description"]}
          />
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{formatDate(t.date)}</TableCell>
                    <TableCell className="font-medium">{t.type}</TableCell>
                    <TableCell>{t.status || '—'}</TableCell>
                    <TableCell className="text-right">₦{t.amount.toLocaleString()}</TableCell>
                    <TableCell>{t.description || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => navigate(`/dashboard/payment/success?reference=${t.reference}`)}
                          title="View Receipt"
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                        {(t.status === 'completed' || t.status === 'success' || !t.status) && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDownload(t.reference || t.id)}
                              disabled={isDownloading}
                              title="Download PDF"
                            >
                              {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-4 w-4" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEmail(t.reference || t.id)}
                              disabled={isEmailing}
                              title="Resend Email"
                            >
                              {isEmailing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Mail className="h-4 w-4" />}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
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
  );
};
