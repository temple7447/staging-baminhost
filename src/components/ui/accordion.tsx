import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  activeItems: string[];
  toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple";
    value?: string | string[];
    onValueChange?: (value: any) => void;
    defaultValue?: string | string[];
  }
>(({ type = "single", value, onValueChange, defaultValue, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return [];
  });

  const activeItems = value !== undefined ? (Array.isArray(value) ? value : [value]) : internalValue;

  const toggleItem = React.useCallback((itemValue: string) => {
    let nextValue: string[];
    if (type === "single") {
      nextValue = activeItems.includes(itemValue) ? [] : [itemValue];
    } else {
      nextValue = activeItems.includes(itemValue)
        ? activeItems.filter((i) => i !== itemValue)
        : [...activeItems, itemValue];
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(type === "single" ? nextValue[0] : nextValue);
  }, [activeItems, type, value, onValueChange]);

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn("border-b", className)} {...props} data-item-value={value} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const itemValue = (props as any)["data-item-value"] || (props as any).value || ""; // Fallback for various patterns
  
  // Find the closest AccordionItem to get the value
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (triggerRef.current) {
      const item = triggerRef.current.closest("[data-item-value]");
      if (item) setValue(item.getAttribute("data-item-value") || "");
    }
  }, []);

  const isOpen = context?.activeItems.includes(value);

  return (
    <div className="flex">
      <button
        ref={(node) => {
          (triggerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onClick={() => context?.toggleItem(value)}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (contentRef.current) {
      const item = contentRef.current.closest("[data-item-value]");
      if (item) setValue(item.getAttribute("data-item-value") || "");
    }
  }, []);

  const isOpen = context?.activeItems.includes(value);

  return (
    <div
      ref={(node) => {
        (contentRef as any).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
      }}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all animate-in fade-in duration-200",
        isOpen ? "block" : "hidden",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
