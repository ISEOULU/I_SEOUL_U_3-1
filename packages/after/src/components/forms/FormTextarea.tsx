import type { TextareaProps } from "../ui/textarea";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface FormTextareaProps extends TextareaProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  error,
  helpText,
  required,
  id,
  ...props
}) => {
  const textareaId = id || name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={textareaId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-danger-primary">*</span>}
        </Label>
      )}

      <Textarea id={textareaId} name={name} aria-invalid={!!error} {...props} />

      {error && (
        <span className="text-xs text-danger-primary mt-1">{error}</span>
      )}
      {helpText && !error && (
        <span className="text-xs text-text-secondary mt-1">{helpText}</span>
      )}
    </div>
  );
};
