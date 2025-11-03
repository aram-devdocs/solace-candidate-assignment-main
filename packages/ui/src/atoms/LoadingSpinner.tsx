import React from "react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * LoadingSpinner component for indicating loading states
 *
 * Displays an animated circular spinner using design tokens.
 *
 * @param size - Size variant (sm, md, lg) - default: md
 * @param className - Additional CSS classes
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 dark:border-primary-700 dark:border-t-primary-400 animate-spin rounded-full ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
