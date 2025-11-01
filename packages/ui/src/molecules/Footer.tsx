import type { ReactNode } from "react";

/**
 * Props for the Footer component
 */
export interface FooterProps {
  /**
   * Links to display in the footer
   */
  links?: Array<{
    label: string;
    href: string;
  }>;
  /**
   * Copyright text
   */
  copyright?: ReactNode;
  /**
   * Additional content to display
   */
  children?: ReactNode;
}

/**
 * Footer component - bottom page footer with links and copyright
 *
 * @example
 * ```tsx
 * import { Footer } from "@repo/ui";
 *
 * <Footer
 *   links={[
 *     { label: "Privacy Policy", href: "/privacy" },
 *     { label: "Terms of Service", href: "/terms" },
 *   ]}
 *   copyright="© 2024 Solace Health. All rights reserved."
 * />
 * ```
 */
export function Footer({ links, copyright, children }: FooterProps) {
  return (
    <footer className="border-secondary-200 w-full border-t bg-white">
      <div className="px-4 py-6 md:px-6">
        {/* Custom content */}
        {children}

        {/* Links */}
        {links && links.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-secondary-600 hover:text-primary-700 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        {copyright && <div className="text-secondary-500 text-sm">{copyright}</div>}
      </div>
    </footer>
  );
}
