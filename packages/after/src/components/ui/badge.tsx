import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold font-[Arial,sans-serif] leading-none whitespace-nowrap transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white",
        secondary: "bg-neutral-tertiary text-white",
        success: "bg-success-primary text-white",
        danger: "bg-danger-primary text-white",
        warning: "bg-warning-primary text-white",
        info: "bg-info-primary text-white",
      },
      size: {
        sm: "px-1 text-[10px] min-h-4",
        md: "px-2 text-xs min-h-5",
        lg: "px-2.5 text-sm min-h-6",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      pill: false,
    },
  },
);

function Badge({
  className,
  variant = "primary",
  size = "md",
  pill = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-pill={pill}
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    />
  );
}

export { Badge };
