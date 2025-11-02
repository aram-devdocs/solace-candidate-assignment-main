import React from "react";

export interface NotificationEmptyStateProps {
  className?: string;
}

/**
 * Empty state component for notifications drawer
 *
 * Displays "What's New?" section when there are no notifications to show.
 *
 * @param className - Optional additional CSS classes
 */
export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`px-lg py-3xl flex flex-col items-center justify-center text-center ${className}`}
    >
      <h2 className="font-serif text-2xl font-light text-neutral-900">What&apos;s New?</h2>
      <p className="mt-md text-sm text-neutral-600">View notifications from the past 30 days.</p>
    </div>
  );
};
