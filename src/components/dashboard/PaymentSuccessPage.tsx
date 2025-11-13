import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerifyPaymentQuery } from '@/services/estatesApi';

export const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Paystack may return reference or trxref; support both
  const reference = params.get('reference') || params.get('trxref') || '';
  const { data, isLoading, isError, refetch } = useVerifyPaymentQuery(reference, { skip: !reference });

  useEffect(() => {
    // If there is no reference, try to parse from hash or path (fallback)
    if (!reference) {
      const hashRef = new URLSearchParams(location.hash.replace(/^#\/?/, '')).get('reference');
      if (hashRef) {
        const sp = new URLSearchParams(params);
        sp.set('reference', hashRef);
        navigate({ search: sp.toString() }, { replace: true });
      }
    }
  }, [reference, location.hash, navigate, params]);

  const title = isLoading
    ? 'Verifying payment...'
    : isError
    ? 'Verification failed'
    : data?.success
    ? 'Payment successful'
    : 'Verification incomplete';

  const description = isLoading
    ? 'Please wait while we verify your payment and trigger the 50/30/20 distribution.'
    : isError
    ? 'We could not verify this payment. You can retry or contact support.'
    : data?.message || 'Your payment has been verified.';

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/overview')}>Go to Dashboard</Button>
          <Button onClick={() => navigate(-1)}>Back</Button>
          {isError && (
            <Button onClick={() => refetch()}>Retry Verification</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
