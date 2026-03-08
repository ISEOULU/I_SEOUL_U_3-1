import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input">;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-auto w-full px-2.5 py-2 text-sm font-sans text-text-primary border border-border-strong rounded-sm bg-bg-primary transition-[color,box-shadow] focus:border-brand-primary outline-none disabled:bg-bg-tertiary disabled:cursor-not-allowed",
        "aria-invalid:border-danger-primary focus:aria-invalid:border-danger-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
