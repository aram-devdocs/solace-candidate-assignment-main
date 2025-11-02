"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { FooterProps } from "../molecules/Footer";
import { Footer } from "../molecules/Footer";
import type { HeaderProps } from "../molecules/Header";
import { Header } from "../molecules/Header";
import { NavigationMenu } from "../molecules/NavigationMenu";
import { SkeletonAdvocateListTemplate } from "../templates/SkeletonAdvocateListTemplate";

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
}

/**
 * RootLayout component - complete page layout with header, navigation, and footer
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
 *   <main>Your page content</main>
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
}: RootLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
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
        <Header {...header} onMenuClick={() => setIsMenuOpen(true)} />
      </div>

      {/* Main content area with navigation */}
      <div className="relative flex flex-1 overflow-y-auto overflow-x-hidden">
        {/* Navigation sidebar */}
        {showNavigation && navigationContent && (
          <NavigationMenu
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            header={navigationHeader}
            footer={navigationFooter}
            onProfileClick={header.onProfileClick}
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
          <main className="w-full flex-1 overflow-y-auto overflow-x-hidden">
            {isNavigating ? (
              <div className="animate-fadeIn">
                <SkeletonAdvocateListTemplate />
              </div>
            ) : (
              children
            )}
          </main>
          {/* Footer */}
          {footer && <Footer {...footer} />}
        </div>
      </div>
    </div>
  );
}
