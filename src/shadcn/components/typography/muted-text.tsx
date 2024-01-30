import { cn } from "@/shadcn/utils";
import { HTMLAttributes, forwardRef } from "react";

export const MutedText = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MutedText.displayName = "MutedText";
