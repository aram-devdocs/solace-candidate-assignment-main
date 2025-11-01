"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { useState } from "react";

/**
 * Props for the NavigationMenu component
 */
export interface NavigationMenuProps {
  /**
   * Navigation items to display
   */
  children: ReactNode;
  /**
   * Whether the menu is open (for mobile)
   * @default false
   */
  isOpen?: boolean;
  /**
   * Callback when menu close is requested (mobile)
   */
  onClose?: () => void;
  /**
   * Menu header content (e.g., "MENU" text)
   */
  header?: ReactNode;
  /**
   * Footer content for the menu
   */
  footer?: ReactNode;
  /**
   * Callback when profile is clicked (mobile menu only)
   */
  onProfileClick?: () => void;
}

/**
 * NavigationMenu component - responsive sidebar navigation
 * - Desktop: Collapsible sidebar
 * - Mobile: Slide-out drawer
 *
 * @example
 * ```tsx
 * import { NavigationMenu, NavigationItem } from "@repo/ui";
 * import { Home, MessageSquare } from "lucide-react";
 *
 * <NavigationMenu header="MENU">
 *   <NavigationItem icon={Home} label="Home" href="/" active />
 *   <NavigationItem icon={MessageSquare} label="Messages" href="/messages" />
 * </NavigationMenu>
 * ```
 */
export function NavigationMenu({
  children,
  isOpen = false,
  onClose,
  header = "MENU",
  footer,
  onProfileClick,
}: NavigationMenuProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Navigation sidebar */}
      <aside
        className={`
          md:border-primary-150
          fixed
          right-0
          top-0
          z-50
          flex h-screen
          flex-shrink-0
          flex-col
          bg-white
          md:sticky md:left-0 md:right-auto md:border-r md:shadow-none
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          ${collapsed ? "w-20" : "w-64"}
        `.trim()}
        style={{
          boxShadow: isOpen ? "-8px 0 24px -4px rgba(0, 0, 0, 0.15)" : "none",
          transition: "transform 0.3s ease-in-out, width 0.3s ease-in-out",
          willChange: "transform, width",
        }}
      >
        {/* Mobile: Close Menu button */}
        <div className="p-4 md:hidden">
          <button
            onClick={onClose}
            className="border-primary-700 hover:bg-secondary-50 flex w-full items-center justify-between rounded-md border px-6 py-3 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <span className="text-primary-700 text-base font-semibold">Close Menu</span>
            <X className="text-primary-700 h-5 w-5" />
          </button>
        </div>

        {/* Desktop: Header with collapse toggle */}
        <div className="hidden p-4 md:flex md:items-center md:justify-between">
          <span
            className={`text-secondary-600 overflow-hidden whitespace-nowrap text-sm font-semibold transition-opacity ${
              collapsed ? "pointer-events-none w-0 opacity-0" : "opacity-100"
            }`}
          >
            {header}
          </span>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="border-primary-150 hover:bg-secondary-50 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full border transition-colors"
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            type="button"
          >
            {collapsed ? (
              <ChevronRight className="text-primary-700 pointer-events-none h-5 w-5" />
            ) : (
              <ChevronLeft className="text-primary-700 pointer-events-none h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="flex flex-col">
            {Children.map(children, (child, index) => {
              if (isValidElement<{ collapsed?: boolean }>(child)) {
                return (
                  <>
                    {cloneElement(child, { collapsed })}
                    {index < Children.count(children) - 1 && (
                      <hr className="border-secondary-100 my-1" role="separator" />
                    )}
                  </>
                );
              }
              return child;
            })}

            {/* Mobile: Profile avatar as navigation row (no divider, no text) */}
            <button
              onClick={onProfileClick}
              className="flex items-center gap-3 rounded-md px-4 py-3 transition-colors md:hidden"
              aria-label="User profile"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <div className="bg-primary-600 hover:bg-primary-700 flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.61523 20.3073C4.61523 17.7583 7.92144 15.6919 11.9999 15.6919C16.0783 15.6919 19.3845 17.7583 19.3845 20.3073"
                      stroke="white"
                      strokeWidth="2.00107"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M12.0002 12.9232C14.5492 12.9232 16.6155 10.8568 16.6155 8.30777C16.6155 5.75876 14.5492 3.69238 12.0002 3.69238C9.45114 3.69238 7.38477 5.75876 7.38477 8.30777C7.38477 10.8568 9.45114 12.9232 12.0002 12.9232Z"
                      stroke="white"
                      strokeWidth="2.00107"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </nav>

        {/* Footer */}
        {footer && <div className="border-secondary-200 border-t p-4">{footer}</div>}
      </aside>
    </>
  );
}
