import React from "react";
import { Text } from "../atoms/Text";

export interface LoadingStateProps {
  message?: string;
}

/**
 * LoadingState component for displaying loading messages
 *
 * @param message - Loading message to display
 */
export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="p-xl">
      <Text as="p" variant="body" color="secondary">
        {message}
      </Text>
    </div>
  );
};
