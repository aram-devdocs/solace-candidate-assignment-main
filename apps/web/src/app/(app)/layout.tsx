"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@repo/ui";
import { NAVIGATION_ITEMS } from "../../constants/navigation";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

/**
 * Application Layout - wraps all app pages with navigation and layout
 *
 * Uses AppLayout template with navigation configuration
 * Automatically detects active navigation based on current pathname
 */
export default function ApplicationLayout({ children }: ApplicationLayoutProps) {
  const pathname = usePathname();

  return (
    <AppLayout
      navigationItems={NAVIGATION_ITEMS}
      currentPath={pathname}
      messageCount={3}
      notificationCount={5}
    >
      {children}
    </AppLayout>
  );
}
