"use client";

import type { ReactNode } from "react";
import {
  Home,
  MessageSquare,
  FileText,
  Clipboard,
  Heart,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { useNavigation, type NavigationItem as NavItem } from "@repo/hooks";
import { RootLayout } from "../organisms/RootLayout";
import { NavigationItem } from "../molecules/NavigationItem";

/**
 * Map of icon names to Lucide icon components
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  MessageSquare,
  FileText,
  Clipboard,
  Heart,
  HelpCircle,
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
   * User initials for avatar
   */
  userInitials?: string;
  /**
   * User avatar image URL
   */
  userAvatarSrc?: string;
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
 *   userInitials="AH"
 * >
 *   <YourPageContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({
  children,
  navigationItems,
  currentPath,
  logo = <div className="text-xl font-bold text-white">Solace</div>,
  userInitials,
  userAvatarSrc,
  messageCount,
  notificationCount,
  onMessagesClick,
  onNotificationsClick,
  onProfileClick,
  footerLinks,
  footerCopyright = "© 2024 Solace Health. All rights reserved.",
}: AppLayoutProps) {
  const { items } = useNavigation(navigationItems, currentPath);

  // Render navigation items with proper icons
  const navigation = items.map((item) => {
    const IconComponent = ICON_MAP[item.icon];
    if (!IconComponent) {
      console.warn(`Icon "${item.icon}" not found in ICON_MAP`);
      return null;
    }

    return (
      <NavigationItem
        key={item.href}
        icon={IconComponent}
        label={item.label}
        href={item.href}
        active={item.active}
      />
    );
  });

  return (
    <RootLayout
      header={{
        logo,
        userInitials,
        userAvatarSrc,
        messageCount,
        notificationCount,
        onMessagesClick,
        onNotificationsClick,
        onProfileClick,
      }}
      navigation={navigation}
      navigationHeader="MENU"
      footer={{
        links: footerLinks,
        copyright: footerCopyright,
      }}
    >
      {children}
    </RootLayout>
  );
}
