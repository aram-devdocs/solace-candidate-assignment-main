"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { useState } from "react";
import { IconButton } from "../atoms/IconButton";

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
}: NavigationMenuProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={onClose} />
      )}

      {/* Navigation sidebar */}
      <aside
        className={`
          border-primary-150 fixed
          left-0 top-0
          z-50
          flex
          h-screen flex-col
          border-r bg-white
          transition-all
          duration-300 md:sticky
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "w-20" : "w-64"}
        `.trim()}
      >
        {/* Header with collapse toggle */}
        <div className="border-secondary-200 flex items-center justify-between border-b p-4">
          <span
            className={`text-secondary-600 overflow-hidden whitespace-nowrap text-sm font-normal transition-opacity ${
              collapsed ? "pointer-events-none w-0 opacity-0" : "opacity-100"
            }`}
          >
            {header}
          </span>

          {/* Desktop: Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="border-primary-150 hover:bg-secondary-50 hidden h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full border transition-colors md:flex"
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            type="button"
          >
            {collapsed ? (
              <ChevronRight className="text-primary-150 pointer-events-none h-5 w-5" />
            ) : (
              <ChevronLeft className="text-primary-150 pointer-events-none h-5 w-5" />
            )}
          </button>

          {/* Mobile: Close button */}
          <IconButton
            icon={X}
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden"
            aria-label="Close menu"
          />
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="flex flex-col">
            {Children.map(children, (child, index) => {
              if (isValidElement(child)) {
                return (
                  <>
                    {cloneElement(child, { collapsed } as any)}
                    {index < Children.count(children) - 1 && (
                      <hr className="border-secondary-100 my-1" role="separator" />
                    )}
                  </>
                );
              }
              return child;
            })}
          </div>
        </nav>

        {/* Footer */}
        {footer && <div className="border-secondary-200 border-t p-4">{footer}</div>}
      </aside>
    </>
  );
}
