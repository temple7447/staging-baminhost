import * as React from "react";
import { cn } from "@/lib/utils";

const AvatarContext = React.createContext<{ srcLoaded: boolean; setSrcLoaded: (loaded: boolean) => void }>({
  srcLoaded: false,
  setSrcLoaded: () => {},
});

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [srcLoaded, setSrcLoaded] = React.useState(false);
  return (
    <AvatarContext.Provider value={{ srcLoaded, setSrcLoaded }}>
      <div
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      />
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, onLoad, onError, ...props }, ref) => {
  const { setSrcLoaded } = React.useContext(AvatarContext);
  
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setSrcLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setSrcLoaded(false);
    onError?.(e);
  };

  return (
    <img
      ref={ref}
      src={src}
      onLoad={handleLoad}
      onError={handleError}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { srcLoaded } = React.useContext(AvatarContext);
  
  if (srcLoaded) return null;

  return (
    <div
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
