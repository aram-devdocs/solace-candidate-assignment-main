import React from "react";
import { Text } from "../atoms/Text";

export interface ErrorStateProps {
  error: string;
}

/**
 * ErrorState component for displaying error messages
 *
 * @param error - Error message to display
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="p-xl">
      <Text as="p" variant="body" color="error">
        Error: {error}
      </Text>
    </div>
  );
};
