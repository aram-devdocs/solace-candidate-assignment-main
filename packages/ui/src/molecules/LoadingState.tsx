import React from "react";
import { Text } from "../atoms/Text";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { ARIA_LABELS } from "../constants/accessibility";

export interface LoadingStateProps {
  message?: string;
  variant?: "spinner" | "skeleton";
  skeletonRows?: number;
}

/**
 * LoadingState component for displaying loading states
 * Uses aria-live for screen reader announcements
 *
 * @param message - Loading message to display (default: "Loading...")
 * @param variant - Display variant: spinner or skeleton (default: "spinner")
 * @param skeletonRows - Number of skeleton rows to display when variant is "skeleton" (default: 5)
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  variant = "spinner",
  skeletonRows = 5,
}) => {
  if (variant === "skeleton") {
    return (
      <div className="p-xl" role="status" aria-live="polite" aria-label={ARIA_LABELS.loadingRegion}>
        <div className="space-y-md">
          {Array.from({ length: skeletonRows }).map((_, index) => (
            <div
              key={index}
              className="from-secondary-100 via-secondary-200 to-secondary-100 dark:from-secondary-700 dark:via-secondary-800 dark:to-secondary-700 animate-shimmer h-12 rounded-lg bg-gradient-to-r bg-[length:2000px_100%]"
            />
          ))}
        </div>
        <span className="sr-only">{message}</span>
      </div>
    );
  }

  return (
    <div className="p-xl" role="status" aria-live="polite" aria-label={ARIA_LABELS.loadingRegion}>
      <div className="gap-md flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <Text as="p" variant="body" color="secondary">
          {message}
        </Text>
      </div>
    </div>
  );
};
