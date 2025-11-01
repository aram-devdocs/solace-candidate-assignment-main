import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { cloneElement } from "react";

/**
 * Props for the NavigationItem component
 */
export interface NavigationItemProps extends ComponentPropsWithoutRef<"a"> {
  /**
   * The icon component to render (accepts custom icon components with active prop)
   */
  icon: ReactElement<{ active?: boolean }>;
  /**
   * Label text for the navigation item
   */
  label: string;
  /**
   * Whether this navigation item is currently active
   * @default false
   */
  active?: boolean;
  /**
   * Whether the navigation is in collapsed state
   * @default false
   */
  collapsed?: boolean;
}

/**
 * NavigationItem component - individual navigation link with icon and label
 *
 * @example
 * ```tsx
 * import { HomeIcon, NavigationItem } from "@repo/ui";
 *
 * <NavigationItem
 *   icon={<HomeIcon />}
 *   label="Home"
 *   href="/dashboard"
 *   active={true}
 * />
 * ```
 */
export function NavigationItem({
  icon,
  label,
  active = false,
  collapsed = false,
  className = "",
  ...props
}: NavigationItemProps) {
  const baseClasses =
    "flex items-center gap-3 px-4 py-3 transition-colors rounded-md text-sm font-normal no-underline";
  const textClasses = active ? "text-success-600" : "text-secondary-600 hover:text-secondary-900";

  return (
    <a className={`${baseClasses} ${textClasses} ${className}`.trim()} {...props}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
        {cloneElement(icon, { active })}
      </div>
      <span className={collapsed ? "hidden" : ""}>{label}</span>
    </a>
  );
}
