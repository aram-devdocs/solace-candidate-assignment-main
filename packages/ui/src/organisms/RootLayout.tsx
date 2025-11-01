"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { FooterProps } from "../molecules/Footer";
import { Footer } from "../molecules/Footer";
import type { HeaderProps } from "../molecules/Header";
import { Header } from "../molecules/Header";
import { NavigationMenu } from "../molecules/NavigationMenu";

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
   * Navigation items
   */
  navigation?: ReactNode;
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
}

/**
 * RootLayout component - complete page layout with header, navigation, and footer
 *
 * @example
 * ```tsx
 * import { RootLayout, NavigationItem } from "@repo/ui";
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
 *     copyright: "© 2024 Solace Health"
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
  navigationHeader,
  navigationFooter,
  footer,
  showNavigation = true,
}: RootLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-secondary-50 flex min-h-screen flex-col">
      {/* Header */}
      <Header {...header} onMenuClick={() => setIsMenuOpen(true)} />

      {/* Main content area with navigation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation sidebar */}
        {showNavigation && navigation && (
          <NavigationMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            header={navigationHeader}
            footer={navigationFooter}
          >
            {navigation}
          </NavigationMenu>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Footer */}
      {footer && <Footer {...footer} />}
    </div>
  );
}
