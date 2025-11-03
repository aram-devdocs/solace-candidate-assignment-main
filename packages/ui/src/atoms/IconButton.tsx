import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

/**
 * Props for the IconButton component
 */
export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  /**
   * The Lucide icon component to render
   */
  icon: LucideIcon;
  /**
   * Visual variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "ghost";
  /**
   * Size variant for the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the button should be circular
   * @default true
   */
  circular?: boolean;
}

const VARIANT_CLASSES = {
  primary: "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-200",
  secondary:
    "bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-400 border border-primary-700 dark:border-primary-500 hover:bg-primary-100 dark:hover:bg-secondary-800 active:bg-primary-100 dark:active:bg-secondary-800",
  ghost: "bg-transparent text-primary-700 hover:bg-primary-100 active:bg-primary-200",
};

const SIZE_CLASSES = {
  sm: "h-icon-sm w-icon-sm",
  md: "h-icon-md w-icon-md",
  lg: "h-icon-lg w-icon-lg",
};

const ICON_SIZE_CLASSES = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

/**
 * IconButton component - circular or square button containing only an icon
 *
 * @example
 * ```tsx
 * import { Bell } from "lucide-react";
 * import { IconButton } from "@repo/ui";
 *
 * <IconButton icon={Bell} variant="primary" size="md" />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: IconComponent,
      variant = "primary",
      size = "md",
      circular = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const variantClass = VARIANT_CLASSES[variant];
    const sizeClass = SIZE_CLASSES[size];
    const iconSizeClass = ICON_SIZE_CLASSES[size];
    const shapeClass = circular ? "rounded-full" : "rounded-md";

    return (
      <button
        ref={ref}
        type="button"
        className={`inline-flex aspect-square items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-50 ${shapeClass} ${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        <IconComponent className={iconSizeClass} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
