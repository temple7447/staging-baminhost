import { useParams } from 'react-router-dom';
import { useGetTenantQuery, useGetTenantBillingQuery } from '@/services/estatesApi';
import { TenantDetailSkeleton } from '@/components/ui/skeletons';
import { TenantDetailHeader } from './tenant-detail/TenantDetailHeader';
import { TenantOverviewCard } from './tenant-detail/TenantOverviewCard';
import { FinancialSummaryCards } from './tenant-detail/FinancialSummaryCards';
import { AdditionalInfoRow } from './tenant-detail/AdditionalInfoRow';
import { PricingBreakdownCard } from './tenant-detail/PricingBreakdownCard';
import { PropertyMediaCard } from './tenant-detail/PropertyMediaCard';
import { TenancyHistoryCard } from './tenant-detail/TenancyHistoryCard';
import { TransactionsCard } from './tenant-detail/TransactionsCard';

export const TenantDetailPage = () => {
  const { tenantId } = useParams();
  const { data: detail, isLoading } = useGetTenantQuery(
    tenantId ? { id: tenantId as string, expand: 'history,transactions' } : ('' as unknown as { id: string }),
    { skip: !tenantId }
  );
  const { data: billingData } = useGetTenantBillingQuery(tenantId as string, { skip: !tenantId });

  const tenant = detail?.data?.tenant;
  const overview = detail?.data?.overview;

  // Map history from API response structure to frontend format
  const history = (((detail?.data as any)?.history) || []).map((h: any) => ({
    id: h.createdAt || String(Math.random()),
    date: h.createdAt,
    action: h.event || 'Unknown',
    notes: h.note || ''
  }));

  // Map transactions from API response
  const transactions = (((detail?.data as any)?.transactions) || []).map((t: any) => ({
    id: t._id || t.id || String(Math.random()),
    date: t.createdAt || t.date,
    amount: t.amount || 0,
    type: t.type || 'Unknown',
    status: t.status,
    description: t.description || t.note || '',
    reference: t.reference || t.trxref || t._id || t.id
  }));

  const historyLoading = isLoading && history.length === 0;
  const txLoading = isLoading && transactions.length === 0;

  // Show full page skeleton while main data is loading
  if (isLoading && !tenant) {
    return <TenantDetailSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header with action buttons */}
      <TenantDetailHeader tenantId={tenantId} tenant={tenant} overview={overview} />

      {/* Tenant Overview Card */}
      <TenantOverviewCard overview={overview} tenant={tenant} />

      {/* Financial Summary Cards */}
      <FinancialSummaryCards overview={overview} tenant={tenant} detail={detail} />

      {/* Additional Information Row */}
      <AdditionalInfoRow tenant={tenant} overview={overview} />

      {/* Pricing Breakdown Card */}
      <PricingBreakdownCard overview={overview} tenant={tenant} detail={detail} />

      {/* Property Media Card */}
      <PropertyMediaCard tenantId={tenantId} history={history} />

      {/* Tenancy History Card */}
      <TenancyHistoryCard history={history} isLoading={historyLoading} />

      {/* Transactions Card */}
      <TransactionsCard
        tenantId={tenantId}
        transactions={transactions}
        isLoading={txLoading}
        overview={overview}
        tenant={tenant}
        billingData={billingData}
      />
    </div>
  );
};
