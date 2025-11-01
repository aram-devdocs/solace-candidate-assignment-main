import React from "react";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  variant?: "h1" | "h2" | "h3" | "body" | "small";
  color?: "default" | "error" | "secondary";
}

/**
 * Text component for typography with semantic variants
 *
 * @param as - HTML element to render (h1, h2, h3, p, span)
 * @param variant - Typography variant (h1, h2, h3, body, small)
 * @param color - Text color variant
 * @param props - Standard HTML attributes
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as = "p", variant = "body", color = "default", className = "", children, ...props }, ref) => {
    const Component = as;

    const variantClasses = {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-xl font-semibold",
      body: "text-base",
      small: "text-sm",
    };

    const colorClasses = {
      default: "text-secondary-900",
      error: "text-error-600",
      secondary: "text-secondary-600",
    };

    return (
      <Component
        ref={ref as any}
        className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
