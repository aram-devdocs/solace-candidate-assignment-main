import React from "react";

export interface FormsEmptyStateProps {
  className?: string;
}

/**
 * Empty state component for forms page
 *
 * Displays message when no forms exist
 *
 * @param className - Optional additional CSS classes
 */
export const FormsEmptyState: React.FC<FormsEmptyStateProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <p className="text-base text-neutral-900">You do not currently have any forms...</p>
    </div>
  );
};
