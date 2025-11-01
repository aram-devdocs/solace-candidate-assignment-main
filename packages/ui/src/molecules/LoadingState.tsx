import React from "react";
import { Text } from "../atoms/Text";
import { ARIA_LABELS } from "../constants/accessibility";

export interface LoadingStateProps {
  message?: string;
}

/**
 * LoadingState component for displaying loading messages
 * Uses aria-live for screen reader announcements
 *
 * @param message - Loading message to display
 */
export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="p-xl" role="status" aria-live="polite" aria-label={ARIA_LABELS.loadingRegion}>
      <Text as="p" variant="body" color="secondary">
        {message}
      </Text>
    </div>
  );
};
