"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppLayout, NotFoundState } from "@repo/ui";
import { NAVIGATION_ITEMS } from "../constants/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppLayout
      navigationItems={NAVIGATION_ITEMS}
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
