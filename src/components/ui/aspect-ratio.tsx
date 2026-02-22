import * as React from "react";
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ratio?: number }
>(({ className, ratio = 1, style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      aspectRatio: ratio.toString(),
    }}
    className={cn("w-full overflow-hidden", className)}
    {...props}
  />
));
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
