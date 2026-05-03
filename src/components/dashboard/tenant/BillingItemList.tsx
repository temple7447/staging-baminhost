import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "./utils";

interface BillingItem {
  code: string;
  label: string;
  amount: number;
  frequency: string;
}

interface BillingItemListProps {
  items: BillingItem[];
  selectedItems: string[];
  onToggleItem: (code: string) => void;
  disabledItem?: string;
  disabledCondition?: (code: string) => boolean;
}

export const BillingItemList: React.FC<BillingItemListProps> = ({
  items,
  selectedItems,
  onToggleItem,
  disabledItem,
  disabledCondition,
}) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.code}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedItems.includes(item.code)}
              onCheckedChange={() => onToggleItem(item.code)}
              disabled={disabledCondition ? disabledCondition(item.code) : disabledItem && !selectedItems.includes(disabledItem)}
            />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}
                {item.code === "service_charge" && " (Required with Rent)"}
              </p>
            </div>
          </div>
          <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(item.amount)}</p>
        </div>
      ))}
    </div>
  );
};
