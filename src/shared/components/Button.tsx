import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export function Button({ children, variant = "primary", isLoading = false, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
