import type { NativeSelectProps } from "../ui/native-select";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Label } from "../ui/label";

interface FormSelectProps extends NativeSelectProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  error,
  helpText,
  required,
  options,
  placeholder,
  id,
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={selectId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-danger-primary">*</span>}
        </Label>
      )}

      <NativeSelect id={selectId} name={name} aria-invalid={!!error} {...props}>
        {placeholder && (
          <NativeSelectOption value="" disabled>
            {placeholder}
          </NativeSelectOption>
        )}
        {options.map((opt) => (
          <NativeSelectOption key={opt.value} value={opt.value}>
            {opt.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      {error && (
        <span className="text-xs text-danger-primary mt-1">{error}</span>
      )}
      {helpText && !error && (
        <span className="text-xs text-text-secondary mt-1">{helpText}</span>
      )}
    </div>
  );
};
