import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WalletCardProps {
  label: string;
  value: number;
  percentage?: number;
  showProgress?: boolean;
  centered?: boolean;
  variant?: "default" | "summary";
}

export const WalletCard = ({
  label,
  value,
  percentage,
  showProgress = false,
  centered = false,
  variant = "default",
}: WalletCardProps) => {
  if (variant === "summary") {
    return (
      <div className="text-center p-3 bg-slate-700 rounded border border-slate-600">
        <div className="text-sm font-medium text-slate-100">{label}</div>
        <div className="text-xl font-bold mt-1 text-white">
          ₦{value.toLocaleString()}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-100">{label}</span>
        {percentage !== undefined && (
          <Badge variant="outline">{percentage}%</Badge>
        )}
      </div>
      <div className="text-2xl font-bold text-white">
        ₦{value.toLocaleString()}
      </div>
      {showProgress && percentage !== undefined && (
        <Progress value={percentage} className="mt-2 h-1" />
      )}
    </div>
  );
};
