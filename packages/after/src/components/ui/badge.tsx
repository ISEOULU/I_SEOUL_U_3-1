import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold font-sans leading-none whitespace-nowrap rounded-[3px] text-white",
  {
    variants: {
      type: {
        primary: "bg-blue-600",
        secondary: "bg-gray-500",
        success: "bg-green-600",
        danger: "bg-red-600",
        warning: "bg-orange-600",
        info: "bg-blue-500",
      },
      size: {
        small: "px-1 text-[0.625rem] h-4",
        medium: "px-2 text-xs h-5",
        large: "px-2.5 text-[0.8125rem] h-6",
      },
      pill: {
        true: "rounded-[10px]",
      },
    },
    defaultVariants: {
      type: "primary",
      size: "medium",
      pill: false,
    },
  }
)

function Badge({
  className,
  type = "primary",
  size = "medium",
  pill = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-type={type}
      className={cn(badgeVariants({ type, size, pill }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
