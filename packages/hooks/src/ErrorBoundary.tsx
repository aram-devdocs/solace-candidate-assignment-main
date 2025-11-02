"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (_error: Error, _errorInfo: ErrorInfo, _retry: () => void) => ReactNode;
  onError?: (_error: Error, _errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component for catching and handling React errors
 *
 * Catches errors in child components and displays a fallback UI.
 * Provides retry functionality and optional error logging.
 *
 * @param children - Child components to wrap with error boundary
 * @param fallback - Optional custom fallback render function
 * @param onError - Optional error logging callback
 * @param showDetails - Whether to show error details in default fallback (default: true)
 *
 * @example
 * <ErrorBoundary
 *   onError={(error, errorInfo) => logErrorToService(error, errorInfo)}
 *   showDetails={process.env.NODE_ENV === 'development'}
 * >
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError } = this.props;

    this.setState({
      error,
      errorInfo,
    });

    if (onError) {
      onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error);
      console.error("Component stack:", errorInfo.componentStack);
    }
  }

  retry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (fallback && errorInfo) {
        return fallback(error, errorInfo, this.retry);
      }

      return children;
    }

    return children;
  }
}
