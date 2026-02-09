import { Badge } from '@/components/ui/badge';

interface PricingInfoRowProps {
  overview: any;
  tenant: any;
}

export const PricingInfoRow = ({ overview, tenant }: PricingInfoRowProps) => {
  if (!overview && !tenant) return null;

  const rent = overview?.rent ?? tenant?.rentAmount;
  const serviceCharge = overview?.serviceCharge ?? overview?.serviceChargeMonthly;
  const cautionFee = overview?.cautionFee;
  const legalFee = overview?.legalFee;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-500 uppercase">Pricing:</span>
      
      {typeof rent === 'number' && (
        <Badge variant="secondary" className="text-xs">
          Rent: ₦{rent.toLocaleString()}
        </Badge>
      )}
      
      {typeof serviceCharge === 'number' && (
        <Badge variant="secondary" className="text-xs">
          Service: ₦{serviceCharge.toLocaleString()}
        </Badge>
      )}
      
      {typeof cautionFee === 'number' && (
        <Badge variant="secondary" className="text-xs">
          Caution: ₦{cautionFee.toLocaleString()}
        </Badge>
      )}
      
      {typeof legalFee === 'number' && (
        <Badge variant="secondary" className="text-xs">
          Legal: ₦{legalFee.toLocaleString()}
        </Badge>
      )}
    </div>
  );
};
