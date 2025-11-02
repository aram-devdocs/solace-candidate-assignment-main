import React from "react";

export interface MessageThreadListEmptyStateProps {
  className?: string;
}

/**
 * Empty state component for message thread list
 *
 * Displays empty state message when no message threads exist
 *
 * @param className - Optional additional CSS classes
 */
export const MessageThreadListEmptyState: React.FC<MessageThreadListEmptyStateProps> = ({
  className = "",
}) => {
  return (
    <div className={`px-md py-lg text-sm text-neutral-600 ${className}`}>
      Your message threads will appear here once you match with your first patient.
    </div>
  );
};
