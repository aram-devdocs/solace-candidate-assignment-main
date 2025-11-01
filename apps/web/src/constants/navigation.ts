import type { NavigationItem } from "@repo/hooks";

/**
 * Application-wide navigation configuration
 * Defines the main navigation menu items used throughout the app
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { icon: "Home", label: "Home", href: "/" },
  { icon: "MessageSquare", label: "Messages", href: "/messages" },
  { icon: "FileText", label: "Documents", href: "/documents" },
  { icon: "Clipboard", label: "Tasks", href: "/tasks" },
  { icon: "Heart", label: "Wellness", href: "/wellness" },
  { icon: "HelpCircle", label: "Help", href: "/help" },
];
