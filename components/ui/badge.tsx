import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-100 text-brand-700",
        secondary: "bg-steel-100 text-steel-700",
        success: "bg-success-100 text-success-600",
        warning: "bg-warning-100 text-warning-600",
        destructive: "bg-critical-100 text-critical-700",
        accent: "bg-accent-100 text-accent-700",
        outline: "border border-border text-steel-700",
        dot: "pl-2",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

function Badge({ className, variant, dot, dotColor, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("inline-block w-1.5 h-1.5 rounded-full", dotColor ?? "bg-current")}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
