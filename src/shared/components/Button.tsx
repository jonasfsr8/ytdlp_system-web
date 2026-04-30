import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useState, useEffect } from "react";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export function Button({ children, variant = "primary", isLoading = false, disabled, ...props }: ButtonProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading])

  return (
    <button
      className={`button button--${variant}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? `Serving metadata${dots}` : children}
    </button>
  );
}
