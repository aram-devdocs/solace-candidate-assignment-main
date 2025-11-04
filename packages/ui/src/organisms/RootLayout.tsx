"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useNotificationDrawer, useProfileDropdown } from "@repo/hooks";
import type { FooterProps } from "../molecules/Footer";
import { Footer } from "../molecules/Footer";
import type { HeaderProps } from "../molecules/Header";
import { Header } from "../molecules/Header";
import { NavigationMenu } from "../molecules/NavigationMenu";
import { SkeletonAdvocateListTemplate } from "../templates/SkeletonAdvocateListTemplate";
import { NotificationDrawer } from "./NotificationDrawer";
import { ProfileDropdown } from "./ProfileDropdown";

/**
 * Props for the RootLayout component
 */
export interface RootLayoutProps {
  /**
   * Main page content
   */
  children: ReactNode;
  /**
   * Header configuration
   */
  header: HeaderProps;
  /**
   * Navigation items (deprecated - use renderNavigation instead)
   */
  navigation?: ReactNode;
  /**
   * Function to render navigation items with menu close callback
   */
  // eslint-disable-next-line no-unused-vars
  renderNavigation?: (onMenuClose: () => void) => ReactNode;
  /**
   * Navigation header content
   */
  navigationHeader?: ReactNode;
  /**
   * Navigation footer content
   */
  navigationFooter?: ReactNode;
  /**
   * Footer configuration
   */
  footer?: FooterProps;
  /**
   * Whether to show the navigation menu
   * @default true
   */
  showNavigation?: boolean;
  /**
   * Whether navigation is currently in progress (for loading state)
   */
  isNavigating?: boolean;
  /**
   * Callback to show toast notification (for demo UI actions)
   */
  onShowToast?: () => void;
}

/**
 * RootLayout component - complete page layout with header, navigation, and footer
 *
 * This component provides the page-level semantic structure with a single main element
 * that handles vertical scrolling for the entire page. Child content should not use
 * main elements to avoid invalid nested main elements.
 *
 * Scrolling Architecture:
 * - Uses h-screen flex column layout to fill viewport
 * - Main element handles all vertical scrolling with overflow-y-auto
 * - Prevents horizontal overflow with overflow-x-hidden
 * - Child templates should allow natural content flow without overflow controls
 *
 * @example
 * ```tsx
 * import { RootLayout, NavigationItem, FOOTER_COPYRIGHT } from "@repo/ui";
 * import { Home, MessageSquare } from "lucide-react";
 *
 * <RootLayout
 *   header={{
 *     logo: <Logo />,
 *     userInitials: "AH",
 *     onMenuClick: () => {},
 *   }}
 *   navigation={
 *     <>
 *       <NavigationItem icon={Home} label="Home" href="/" active />
 *       <NavigationItem icon={MessageSquare} label="Messages" href="/messages" />
 *     </>
 *   }
 *   footer={{
 *     copyright: FOOTER_COPYRIGHT
 *   }}
 * >
 *   <YourPageContent />
 * </RootLayout>
 * ```
 */
export function RootLayout({
  children,
  header,
  navigation,
  renderNavigation,
  navigationHeader,
  navigationFooter,
  footer,
  showNavigation = true,
  isNavigating = false,
  onShowToast,
}: RootLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notificationDrawer = useNotificationDrawer();
  const profileDropdown = useProfileDropdown();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNotificationsClick = () => {
    notificationDrawer.open();
    profileDropdown.close();
  };

  const handleMessagesClick = () => {
    // Messages navigation handled by Next.js routing
    // No toast needed - navigates to /messages
  };

  const handleProfileClick = () => {
    profileDropdown.toggle();
    notificationDrawer.close();
  };

  const handleAccountClick = () => {
    profileDropdown.close();
    if (onShowToast) {
      onShowToast();
    }
  };

  const handleLogoutClick = () => {
    profileDropdown.close();
    if (onShowToast) {
      onShowToast();
    }
  };

  const navigationContent = renderNavigation ? renderNavigation(handleMenuClose) : navigation;

  return (
    <div className="bg-secondary-50 flex h-screen flex-col">
      {/* Header with overlay */}
      <div
        className={`relative md:transform-none ${isMenuOpen ? "max-md:-translate-x-64" : ""}`}
        style={{
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* White overlay on header when menu is open */}
        <div
          className="pointer-events-none absolute inset-0 z-30 bg-white md:hidden"
          style={{
            opacity: isMenuOpen ? 0.4 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
        <div className="relative">
          <Header
            {...header}
            onMenuClick={() => setIsMenuOpen(true)}
            onMessagesClick={handleMessagesClick}
            onNotificationsClick={handleNotificationsClick}
            onProfileClick={handleProfileClick}
          />
          <div ref={profileDropdown.dropdownRef} className="absolute right-4 top-full md:right-6">
            <ProfileDropdown
              isOpen={profileDropdown.isOpen}
              onClose={profileDropdown.close}
              onAccountClick={handleAccountClick}
              onLogoutClick={handleLogoutClick}
            />
          </div>
        </div>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notificationDrawer.isOpen} onClose={notificationDrawer.close} />

      {/* Main content area with navigation */}
      <div className="relative flex flex-1 overflow-x-hidden">
        {/* Navigation sidebar */}
        {showNavigation && navigationContent && (
          <NavigationMenu
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            header={navigationHeader}
            footer={navigationFooter}
            onProfileClick={handleProfileClick}
            profileDropdownRef={profileDropdown.dropdownRef}
            profileDropdown={
              <ProfileDropdown
                isOpen={profileDropdown.isOpen}
                onClose={profileDropdown.close}
                onAccountClick={handleAccountClick}
                onLogoutClick={handleLogoutClick}
              />
            }
          >
            {navigationContent}
          </NavigationMenu>
        )}

        {/* Page content with push effect and overlay on mobile */}
        <div
          className={`relative flex w-full flex-1 flex-col md:transform-none ${
            isMenuOpen ? "max-md:-translate-x-64" : ""
          }`}
          style={{
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* White overlay when menu is open */}
          <div
            className="pointer-events-none absolute inset-0 z-30 bg-white md:hidden"
            style={{
              opacity: isMenuOpen ? 0.4 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <main className="w-full flex-1 overflow-y-auto overflow-x-hidden" role="main">
            <div className="mx-auto max-w-7xl">
              {isNavigating ? (
                <div className="animate-fadeIn">
                  <SkeletonAdvocateListTemplate />
                </div>
              ) : (
                children
              )}
            </div>
          </main>
          {/* Footer */}
          {footer && <Footer {...footer} />}
        </div>
      </div>
    </div>
  );
}
