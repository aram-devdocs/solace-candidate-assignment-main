import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the Icon component
 */
export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  /**
   * The Lucide icon component to render
   */
  icon: LucideIcon;
  /**
   * Size variant for the icon
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Color variant for the icon
   * @default "default"
   */
  color?: "default" | "primary" | "secondary" | "error" | "success";
}

const SIZE_CLASSES = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const COLOR_CLASSES = {
  default: "text-secondary-700",
  primary: "text-primary-600",
  secondary: "text-secondary-500",
  error: "text-error-600",
  success: "text-success-600",
};

/**
 * Icon component - wraps Lucide icons with consistent sizing and theming
 *
 * @example
 * ```tsx
 * import { Home } from "lucide-react";
 * import { Icon } from "@repo/ui";
 *
 * <Icon icon={Home} size="md" color="primary" />
 * ```
 */
export function Icon({
  icon: LucideIconComponent,
  size = "md",
  color = "default",
  className = "",
  ...props
}: IconProps) {
  const sizeClass = SIZE_CLASSES[size];
  const colorClass = COLOR_CLASSES[color];

  return (
    <LucideIconComponent className={`${sizeClass} ${colorClass} ${className}`.trim()} {...props} />
  );
}
