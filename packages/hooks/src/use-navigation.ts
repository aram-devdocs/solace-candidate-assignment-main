"use client";

/**
 * Navigation item configuration
 */
export interface NavigationItem {
  /**
   * Icon name from lucide-react (e.g., "Home", "MessageSquare")
   */
  icon: string;
  /**
   * Display label for the navigation item
   */
  label: string;
  /**
   * Route path
   */
  href: string;
}

/**
 * Hook for managing navigation state and active detection
 * Framework-agnostic - requires current pathname to be passed in
 *
 * @param items - Array of navigation items
 * @param currentPath - Current pathname (from Next.js usePathname() or similar)
 * @returns Navigation items with active state
 *
 * @example
 * ```tsx
 * // Next.js
 * import { usePathname } from "next/navigation";
 * const pathname = usePathname();
 * const { items } = useNavigation(navigationItems, pathname);
 *
 * // React Router
 * import { useLocation } from "react-router-dom";
 * const { pathname } = useLocation();
 * const { items } = useNavigation(navigationItems, pathname);
 * ```
 */
export function useNavigation(items: NavigationItem[], currentPath: string) {
  const itemsWithActive = items.map((item) => ({
    ...item,
    active: currentPath === item.href,
  }));

  return {
    items: itemsWithActive,
    currentPath,
  };
}
