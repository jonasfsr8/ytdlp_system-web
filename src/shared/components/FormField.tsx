import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
}

type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;
type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<{ label: string; value: string }>;
    placeholder?: string;
  };

export function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input className="field__control" {...props} />
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  error,
  options,
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="field__control" {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}
