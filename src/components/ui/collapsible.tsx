import * as React from "react";
import { cn } from "@/lib/utils";

const CollapsibleContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({ isOpen: false, setIsOpen: () => {} });

const Collapsible = ({ 
  open, 
  defaultOpen, 
  onOpenChange, 
  children, 
  className 
}: { 
  open?: boolean; 
  defaultOpen?: boolean; 
  onOpenChange?: (open: boolean) => void; 
  children: React.ReactNode;
  className?: string;
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const isOpen = open !== undefined ? open : internalOpen;

  const setIsOpen = (val: boolean) => {
    if (open === undefined) setInternalOpen(val);
    onOpenChange?.(val);
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={cn("w-full", className)}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(CollapsibleContext);
  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      data-state={isOpen ? "open" : "closed"}
      className={className}
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = React.useContext(CollapsibleContext);
  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      data-state="open"
      className={cn("overflow-hidden transition-all animate-in fade-in duration-200", className)}
      {...props}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
