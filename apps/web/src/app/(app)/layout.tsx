"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@repo/ui";
import { useToast } from "@repo/hooks";
import { NAVIGATION_ITEMS } from "../../constants/navigation";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

/**
 * Application Layout - wraps all app pages with navigation and layout
 *
 * Uses AppLayout template with navigation configuration
 * Automatically detects active navigation based on current pathname
 * Manages navigation state for smooth transitions with skeleton loading
 */
export default function ApplicationLayout({ children }: ApplicationLayoutProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigationStart = () => {
    setIsNavigating(true);
  };

  const handleShowDemoToast = () => {
    showToast({
      variant: "info",
      message: "Demo UI Only",
      description: "This feature is not functional in the demo",
      duration: 3000,
    });
  };

  return (
    <AppLayout
      navigationItems={NAVIGATION_ITEMS}
      currentPath={pathname}
      messageCount={3}
      notificationCount={5}
      isNavigating={isNavigating}
      onNavigationStart={handleNavigationStart}
      onShowToast={handleShowDemoToast}
    >
      {children}
    </AppLayout>
  );
}
