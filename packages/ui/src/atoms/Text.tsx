import React from "react";

type TextElement = "h1" | "h2" | "h3" | "p" | "span";

export interface TextProps {
  as?: TextElement;
  variant?: "h1" | "h2" | "h3" | "body" | "small";
  color?: "default" | "error" | "secondary";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Text component for typography with semantic variants
 * Does not support ref forwarding to maintain type safety across polymorphic elements
 *
 * @param as - HTML element to render (h1, h2, h3, p, span)
 * @param variant - Typography variant (h1, h2, h3, body, small)
 * @param color - Text color variant
 * @param props - Standard HTML attributes
 */
export function Text({
  as = "p",
  variant = "body",
  color = "default",
  className = "",
  children,
  ...props
}: TextProps & Omit<React.HTMLAttributes<HTMLElement>, keyof TextProps>) {
  const Component = as;

  const variantClasses = {
    h1: "text-3xl font-bold font-serif",
    h2: "text-2xl font-semibold font-serif",
    h3: "text-xl font-semibold font-serif",
    body: "text-base font-sans",
    small: "text-sm font-sans",
  };

  const colorClasses = {
    default: "text-secondary-900",
    error: "text-error-600",
    secondary: "text-secondary-600",
  };

  return (
    <Component
      className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
