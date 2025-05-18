import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCamelCaseToTitle } from "@/lib/utils/format";

interface NumberInputProps {
  field: string;
  state: Record<string, any>;
  setState: (value: any) => void;
  defaultValue?: number; // Optional default when input is empty
  placeholder?: string;
  className?: string;
  label?: string; // Optional custom label
  step?: number; // Optional step value for the input
}

export function NumberInput({
  field,
  state,
  setState,
  defaultValue = 0,
  placeholder = "0",
  className = "",
  step = 0.01,
  label,
}: NumberInputProps) {
  return (
    <div key={field}>
      <Label htmlFor={field}>{label || formatCamelCaseToTitle(field)}</Label>
      <Input
        id={field}
        step={step}
        min={0}
        type="number"
        placeholder={placeholder}
        className={`mt-2 ${className}`}
        value={state[field as keyof typeof state]}
        onChange={(e) =>
          setState({
            ...state,
            [field]: parseFloat(e.target.value) || defaultValue,
          })
        }
      />
    </div>
  );
}
