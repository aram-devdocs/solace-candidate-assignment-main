import type { NavigationItem } from "@repo/hooks";

/**
 * Application-wide navigation configuration
 * Defines the main navigation menu items used throughout the app
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { icon: "Home", label: "Home", href: "/" },
  { icon: "MessageSquare", label: "Messages", href: "/messages" },
  { icon: "FileText", label: "Notes", href: "/notes" },
  { icon: "Clipboard", label: "Forms", href: "/forms" },
  { icon: "Heart", label: "Health Insurance", href: "/health-insurance" },
  { icon: "HelpCircle", label: "Help", href: "/help" },
];
