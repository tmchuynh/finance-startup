import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex gap-1 items-center justify-center px-2 py-0.5 border aria-invalid:border-destructive focus-visible:border-ring aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 rounded-md w-fit font-medium text-xs whitespace-nowrap transition-[color,box-shadow] overflow-hidden [&>svg]:pointer-events-none shrink-0 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        accent:
          "border-transparent bg-accent text-accent-foreground [a&]:hover:bg-accent/90",
        outline:
          "border-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        ghost:
          "border-transparent bg-transparent text-foreground [a&]:hover:bg-accent/50 [a&]:hover:text-foreground/80",
        destructive:
          "border-transparent bg-destructive  [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        chart1:
          "border-transparent bg-chart-1 text-chart-1-foreground [a&]:hover:bg-chart1/90",
        chart2:
          "border-transparent bg-chart-2 text-chart-2-foreground [a&]:hover:bg-chart2/90",
        chart3:
          "border-transparent bg-chart-3 text-chart-3-foreground [a&]:hover:bg-chart3/90",
        chart4:
          "border-transparent bg-chart-4 text-chart-4-foreground [a&]:hover:bg-chart4/90",
        chart5:
          "border-transparent bg-chart-5 text-chart-5-foreground [a&]:hover:bg-chart5/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
