import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

export default function Select({ label, error, options, placeholder, id, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="br-field">
      <label className="br-label" htmlFor={selectId}>
        {label}
      </label>

      <div className="br-select-wrapper">
        <select
          {...props}
          id={selectId}
          className={["br-select", error ? "br-select-error" : ""].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          defaultValue=""
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="br-select-arrow" aria-hidden="true">
          <ChevronDown />
        </span>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="br-error" role="alert">{error}</p>
      )}
    </div>
  );
}