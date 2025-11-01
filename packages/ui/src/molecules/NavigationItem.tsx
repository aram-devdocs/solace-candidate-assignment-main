import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the NavigationItem component
 */
export interface NavigationItemProps extends ComponentPropsWithoutRef<"a"> {
  /**
   * The Lucide icon component to render
   */
  icon: LucideIcon;
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
 * import { Home } from "lucide-react";
 * import { NavigationItem } from "@repo/ui";
 *
 * <NavigationItem
 *   icon={Home}
 *   label="Home"
 *   href="/dashboard"
 *   active={true}
 * />
 * ```
 */
export function NavigationItem({
  icon: IconComponent,
  label,
  active = false,
  collapsed = false,
  className = "",
  ...props
}: NavigationItemProps) {
  const baseClasses =
    "flex items-center gap-3 px-4 py-3 transition-colors rounded-md text-sm font-medium no-underline";
  const textClasses = active ? "text-secondary-900" : "text-secondary-600 hover:text-secondary-900";
  const iconClasses = active ? "w-6 h-6 flex-shrink-0" : "w-6 h-6 flex-shrink-0 text-secondary-600";

  return (
    <a className={`${baseClasses} ${textClasses} ${className}`.trim()} {...props}>
      {active ? (
        <div className="relative h-6 w-6 flex-shrink-0">
          <IconComponent
            className="absolute inset-0 h-6 w-6"
            style={{
              stroke: "url(#icon-gradient)",
              fill: "none",
            }}
          />
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d5049" />
                <stop offset="40%" stopColor="#3d6b5e" />
                <stop offset="70%" stopColor="#4a7c68" />
                <stop offset="90%" stopColor="#8b7355" />
                <stop offset="100%" stopColor="#a67c52" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ) : (
        <IconComponent className={iconClasses} />
      )}
      <span className={collapsed ? "hidden" : ""}>{label}</span>
    </a>
  );
}
