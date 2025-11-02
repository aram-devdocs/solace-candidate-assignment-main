"use client";

import type { ReactNode, ReactElement } from "react";
import { useNavigation, type NavigationItem as NavItem } from "@repo/hooks";
import { HomeIcon } from "../atoms/HomeIcon";
import { MessagesIcon } from "../atoms/MessagesIcon";
import { NotesIcon } from "../atoms/NotesIcon";
import { FormsIcon } from "../atoms/FormsIcon";
import { HealthInsuranceIcon } from "../atoms/HealthInsuranceIcon";
import { HelpIcon } from "../atoms/HelpIcon";
import { SolaceLogo } from "../atoms/SolaceLogo";
import { RootLayout } from "../organisms/RootLayout";
import { NavigationItem } from "../molecules/NavigationItem";
import { FOOTER_COPYRIGHT_WITH_RIGHTS } from "../constants/footer";

/**
 * Map of icon names to custom icon components
 */
const ICON_MAP: Record<string, ReactElement> = {
  Home: <HomeIcon />,
  MessageSquare: <MessagesIcon />,
  FileText: <NotesIcon />,
  Clipboard: <FormsIcon />,
  Heart: <HealthInsuranceIcon />,
  HelpCircle: <HelpIcon />,
};

/**
 * Props for AppLayout
 */
export interface AppLayoutProps {
  /**
   * Page content
   */
  children: ReactNode;
  /**
   * Navigation items configuration
   */
  navigationItems: NavItem[];
  /**
   * Current pathname for active detection (from Next.js usePathname() or similar)
   */
  currentPath: string;
  /**
   * Logo component or text
   */
  logo?: ReactNode;
  /**
   * Number of unread messages
   */
  messageCount?: number;
  /**
   * Number of unread notifications
   */
  notificationCount?: number;
  /**
   * Callback when messages icon is clicked
   */
  onMessagesClick?: () => void;
  /**
   * Callback when notifications icon is clicked
   */
  onNotificationsClick?: () => void;
  /**
   * Callback when user profile is clicked
   */
  onProfileClick?: () => void;
  /**
   * Footer links
   */
  footerLinks?: Array<{ label: string; href: string }>;
  /**
   * Footer copyright text
   */
  footerCopyright?: string;
  /**
   * Whether navigation is currently in progress (for loading state)
   */
  isNavigating?: boolean;
  /**
   * Callback when navigation state should be updated
   */
  onNavigationStart?: () => void;
  /**
   * Callback to show toast notification (for demo UI actions)
   */
  onShowToast?: () => void;
}

/**
 * AppLayout template - complete application layout with navigation
 *
 * Uses useNavigation hook to manage active state detection
 * Renders RootLayout with proper configuration
 *
 * @example
 * ```tsx
 * import { usePathname } from "next/navigation";
 * import { AppLayout } from "@repo/ui";
 *
 * const navigationItems = [
 *   { icon: "Home", label: "Home", href: "/" },
 *   { icon: "MessageSquare", label: "Messages", href: "/messages" },
 * ];
 *
 * const pathname = usePathname();
 *
 * <AppLayout
 *   navigationItems={navigationItems}
 *   currentPath={pathname}
 *   logo={<Logo />}
 * >
 *   <YourPageContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({
  children,
  navigationItems,
  currentPath,
  logo = <SolaceLogo width={86} height={24} />,
  messageCount,
  notificationCount,
  onMessagesClick,
  onNotificationsClick,
  onProfileClick,
  footerLinks,
  footerCopyright = FOOTER_COPYRIGHT_WITH_RIGHTS,
  isNavigating = false,
  onNavigationStart,
  onShowToast,
}: AppLayoutProps) {
  const { items } = useNavigation(navigationItems, currentPath);

  const handleNavigationClick = (onMenuClose?: () => void) => {
    if (onMenuClose) {
      onMenuClose();
    }
    if (onNavigationStart) {
      onNavigationStart();
    }
  };

  // Render navigation items as a function that accepts menu close callback
  const renderNavigation = (onMenuClose?: () => void) =>
    items.map((item) => {
      const iconElement = ICON_MAP[item.icon];
      if (!iconElement) {
        console.warn(`Icon "${item.icon}" not found in ICON_MAP`);
        return null;
      }

      return (
        <NavigationItem
          key={item.href}
          icon={iconElement}
          label={item.label}
          href={item.href}
          active={item.active}
          onClick={() => handleNavigationClick(onMenuClose)}
        />
      );
    });

  return (
    <RootLayout
      header={{
        logo,
        messageCount,
        notificationCount,
        onMessagesClick,
        onNotificationsClick,
        onProfileClick,
      }}
      renderNavigation={renderNavigation}
      navigationHeader="MENU"
      footer={{
        links: footerLinks,
        copyright: footerCopyright,
      }}
      isNavigating={isNavigating}
      onShowToast={onShowToast}
    >
      {children}
    </RootLayout>
  );
}
