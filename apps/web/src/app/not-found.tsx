"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppLayout, NotFoundState } from "@repo/ui";

const navigationItems = [
  { icon: "Home", label: "Home", href: "/" },
  { icon: "MessageSquare", label: "Messages", href: "/messages" },
  { icon: "FileText", label: "Documents", href: "/documents" },
  { icon: "Clipboard", label: "Tasks", href: "/tasks" },
  { icon: "Heart", label: "Wellness", href: "/wellness" },
  { icon: "HelpCircle", label: "Help", href: "/help" },
];

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppLayout
      navigationItems={navigationItems}
      currentPath={pathname}
      userInitials="AH"
      messageCount={3}
      notificationCount={5}
    >
      <div className="p-8">
        <NotFoundState
          title="Page Not Found"
          message="The page you're looking for doesn't exist yet. We're still building out this feature."
          actionText="Go to Home"
          onAction={() => router.push("/")}
        />
      </div>
    </AppLayout>
  );
}
