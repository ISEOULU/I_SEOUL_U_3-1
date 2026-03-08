import React from "react";
import { Input } from "../ui/input";
import type { InputProps } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  error,
  helpText,
  required,
  id,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-danger-primary">*</span>}
        </Label>
      )}

      <Input id={inputId} name={name} aria-invalid={!!error} {...props} />

      {error && (
        <span className="text-xs text-danger-primary mt-1">{error}</span>
      )}
      {helpText && !error && (
        <span className="text-xs text-text-secondary mt-1">{helpText}</span>
      )}
    </div>
  );
};
