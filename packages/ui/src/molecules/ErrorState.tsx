import React from "react";
import { Text } from "../atoms/Text";
import { ARIA_LABELS, A11Y_ROLES } from "../constants/accessibility";

export interface ErrorStateProps {
  error: string;
}

/**
 * ErrorState component for displaying error messages
 * Uses role="alert" for immediate screen reader announcements
 *
 * @param error - Error message to display
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="p-xl" role={A11Y_ROLES.alert} aria-label={ARIA_LABELS.errorRegion}>
      <Text as="p" variant="body" color="error">
        Error: {error}
      </Text>
    </div>
  );
};
