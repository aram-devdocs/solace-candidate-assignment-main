import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the Badge component
 */
export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  /**
   * Visual variant of the badge
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary" | "success" | "error";
  /**
   * Size variant of the badge
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

const VARIANT_CLASSES = {
  default: "bg-secondary-100 text-secondary-700 border-secondary-200",
  primary: "bg-primary-100 text-primary-700 border-primary-200",
  secondary: "bg-secondary-100 text-secondary-600 border-secondary-200",
  success: "bg-success-100 text-success-700 border-success-200",
  error: "bg-error-100 text-error-700 border-error-200",
};

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

/**
 * Badge component - displays small status indicators or labels
 *
 * @example
 * ```tsx
 * import { Badge } from "@repo/ui";
 *
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" size="sm">Active</Badge>
 * ```
 */
export function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border font-medium ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
