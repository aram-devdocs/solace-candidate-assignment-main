"use client";

import { ToastProvider, useToast, ErrorBoundary } from "@repo/hooks";
import { ToastContainer, ErrorBoundaryFallback } from "@repo/ui";

function ToastRenderer() {
  const { toasts } = useToast();
  return <ToastContainer toasts={toasts} position="bottom-right" />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo, retry) => {
        const showDetails = process.env.NODE_ENV === "development";
        const errorDetails = showDetails
          ? `${error.toString()}\n\nComponent Stack:${errorInfo.componentStack}`
          : undefined;

        return (
          <ErrorBoundaryFallback
            error={error}
            errorDetails={errorDetails}
            onRetry={retry}
            showDetails={showDetails}
          />
        );
      }}
      onError={(error, errorInfo) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Application Error:", error);
          console.error("Error Info:", errorInfo);
        }
      }}
    >
      <ToastProvider maxToasts={5} defaultDuration={5000}>
        {children}
        <ToastRenderer />
      </ToastProvider>
    </ErrorBoundary>
  );
}
