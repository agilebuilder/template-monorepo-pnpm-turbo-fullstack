import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 视觉风格变体 */
  variant?: "primary" | "secondary";
  children?: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "ui-button ui-button--primary",
  secondary: "ui-button ui-button--secondary",
};

export function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={variantStyles[variant]} {...rest}>
      {children}
    </button>
  );
}
