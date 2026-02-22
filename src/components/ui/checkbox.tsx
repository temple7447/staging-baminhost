import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCheckedChange?: (checked: boolean) => void }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(checked || false);

  React.useEffect(() => {
    setInternalChecked(checked || false);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setInternalChecked(isChecked);
    onCheckedChange?.(isChecked);
  };

  return (
    <div className="relative inline-flex items-center group">
      <input
        type="checkbox"
        ref={ref}
        checked={internalChecked}
        onChange={handleChange}
        className="peer absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
        {...props}
      />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background flex items-center justify-center transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          internalChecked ? "bg-primary text-primary-foreground" : "bg-transparent",
          className
        )}
      >
        {internalChecked && <Check className="h-3.5 w-3.5" />}
      </div>
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
