import React from "react";

export interface ToastProps {
  id: string;
  variant: "info" | "success" | "warning" | "error";
  message: string;
  description?: string;
  duration?: number;
  onDismiss?: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast notification component for displaying feedback to users
 *
 * @param id - Unique identifier for the toast
 * @param variant - Visual style variant (info, success, warning, error)
 * @param message - Primary message to display
 * @param description - Optional secondary description text
 * @param duration - Auto-dismiss duration in milliseconds (0 for persistent)
 * @param onDismiss - Callback when toast is dismissed
 * @param action - Optional action button configuration
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, variant, message, description, onDismiss, action }, ref) => {
    const variantClasses = {
      info: "bg-primary-50 border-primary-300 text-primary-900 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-100",
      success:
        "bg-success-50 border-success-300 text-success-900 dark:bg-success-900 dark:border-success-700 dark:text-success-100",
      warning:
        "bg-accent-50 border-accent-300 text-accent-900 dark:bg-accent-800 dark:border-accent-600 dark:text-accent-100",
      error:
        "bg-error-50 border-error-300 text-error-900 dark:bg-error-900 dark:border-error-700 dark:text-error-100",
    };

    const iconClasses = {
      info: "text-primary-600 dark:text-primary-400",
      success: "text-success-600 dark:text-success-400",
      warning: "text-accent-600 dark:text-accent-400",
      error: "text-error-600 dark:text-error-400",
    };

    const buttonClasses = {
      info: "text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200",
      success:
        "text-success-700 hover:text-success-800 dark:text-success-300 dark:hover:text-success-200",
      warning:
        "text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200",
      error: "text-error-700 hover:text-error-800 dark:text-error-300 dark:hover:text-error-200",
    };

    const icons = {
      info: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      success: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      warning: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      error: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={`${variantClasses[variant]} p-md animate-slideInRight min-w-[280px] max-w-md rounded-lg border-2 shadow-lg`}
      >
        <div className="gap-sm flex items-start">
          <div className={`${iconClasses[variant]} mt-xs flex-shrink-0`}>{icons[variant]}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{message}</p>
            {description && <p className="mt-xs text-xs opacity-90">{description}</p>}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={`${buttonClasses[variant]} mt-sm rounded text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              >
                {action.label}
              </button>
            )}
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={() => onDismiss(id)}
              aria-label="Dismiss notification"
              className={`${iconClasses[variant]} flex-shrink-0 rounded hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";
