import React from "react";
import { ErrorState } from "./ErrorState";

export interface ErrorBoundaryFallbackProps {
  error: Error;
  errorDetails?: string;
  onRetry: () => void;
  showDetails?: boolean;
}

/**
 * ErrorBoundaryFallback component for displaying error boundary fallback UI
 *
 * This is a presentational component that shows error information.
 * For the actual error boundary logic, use ErrorBoundary from @repo/hooks.
 *
 * @param error - The error that was caught
 * @param errorDetails - Optional detailed error information
 * @param onRetry - Callback to retry after error
 * @param showDetails - Whether to show error details toggle
 *
 * @example
 * <ErrorBoundaryFallback
 *   error={error}
 *   errorDetails={errorInfo.componentStack}
 *   onRetry={retry}
 *   showDetails={true}
 * />
 */
export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  errorDetails,
  onRetry,
  showDetails = true,
}) => {
  return (
    <ErrorState
      error={error.message || "An unexpected error occurred"}
      errorDetails={errorDetails}
      onRetry={onRetry}
      retryLabel="Reload"
      showDetailsToggle={showDetails}
    />
  );
};
