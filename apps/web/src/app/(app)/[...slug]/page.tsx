"use client";

import { useRouter } from "next/navigation";
import { NotFoundState } from "@repo/ui";

/**
 * Catch-all route for undefined pages
 * Renders 404 state within AppLayout
 */
export default function CatchAll() {
  const router = useRouter();

  return (
    <div className="p-8">
      <NotFoundState
        title="Page Not Found"
        message="The page you're looking for doesn't exist yet. We're still building out this feature."
        actionText="Go to Home"
        onAction={() => router.push("/")}
      />
    </div>
  );
}
