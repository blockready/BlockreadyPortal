import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "br-button",
    variant === "secondary" ? "br-button-secondary" : "",
    fullWidth ? "br-button-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} disabled={disabled || loading} className={classes}>
      {loading ? (
        <>
          <span className="br-spinner" aria-hidden="true" />
          Loading…
        </>
      ) : (
        children
      )}
    </button>
  );
}