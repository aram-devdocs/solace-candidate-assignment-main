"use client";

import React, { useState } from "react";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { ARIA_LABELS, A11Y_ROLES } from "../constants/accessibility";

export interface ErrorStateProps {
  error: string;
  errorDetails?: string;
  onRetry?: () => void;
  retryLabel?: string;
  showDetailsToggle?: boolean;
}

/**
 * ErrorState component for displaying error messages with optional retry and details
 * Uses role="alert" for immediate screen reader announcements
 *
 * @param error - Primary error message to display
 * @param errorDetails - Optional detailed error information (technical details, stack trace, etc.)
 * @param onRetry - Optional callback to retry the failed operation
 * @param retryLabel - Label for retry button (default: "Try Again")
 * @param showDetailsToggle - Whether to show a toggle for error details (default: true if errorDetails provided)
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  errorDetails,
  onRetry,
  retryLabel = "Try Again",
  showDetailsToggle = Boolean(errorDetails),
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-xl" role={A11Y_ROLES.alert} aria-label={ARIA_LABELS.errorRegion}>
      <div className="gap-md mx-auto flex max-w-2xl flex-col items-center justify-center">
        <div className="gap-sm text-error-600 dark:text-error-400 flex items-center">
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="text-center">
          <Text as="h2" variant="h3" color="error" className="mb-sm">
            Something went wrong
          </Text>
          <Text as="p" variant="body" className="text-secondary-700 dark:text-secondary-300">
            {error}
          </Text>
        </div>

        {onRetry && (
          <div className="gap-sm flex">
            <Button variant="primary" onClick={onRetry}>
              {retryLabel}
            </Button>
          </div>
        )}

        {showDetailsToggle && errorDetails && (
          <div className="w-full">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-300 rounded text-sm underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-expanded={showDetails}
            >
              {showDetails ? "Hide" : "Show"} error details
            </button>

            {showDetails && (
              <div className="mt-md p-md bg-error-50 border-error-200 dark:bg-error-900 dark:border-error-700 rounded-lg border-2">
                <pre className="text-error-900 dark:text-error-100 whitespace-pre-wrap break-words text-xs">
                  {errorDetails}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
