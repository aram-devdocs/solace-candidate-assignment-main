import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the NotFoundState component
 */
export interface NotFoundStateProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Custom title for the not found state
   * @default "Page Not Found"
   */
  title?: string;
  /**
   * Custom message for the not found state
   * @default "The page you're looking for doesn't exist."
   */
  message?: string;
  /**
   * Optional action button text
   */
  actionText?: string;
  /**
   * Optional action button click handler
   */
  onAction?: () => void;
}

/**
 * NotFoundState component - displays a user-friendly 404 error message
 *
 * @example
 * ```tsx
 * import { NotFoundState } from "@repo/ui";
 *
 * <NotFoundState
 *   title="Page Not Found"
 *   message="The page you're looking for doesn't exist."
 *   actionText="Go Home"
 *   onAction={() => router.push("/")}
 * />
 * ```
 */
export function NotFoundState({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist.",
  actionText = "Go Home",
  onAction,
  className = "",
  ...props
}: NotFoundStateProps) {
  return (
    <div
      className={`min-h-section-min flex flex-col items-center justify-center px-4 py-12 ${className}`.trim()}
      {...props}
    >
      <div className="max-w-md text-center">
        <h1 className="text-secondary-300 mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-secondary-900 mb-2 text-2xl font-semibold">{title}</h2>
        <p className="text-secondary-600 mb-6">{message}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="bg-primary-700 hover:bg-primary-800 rounded-md px-6 py-3 font-medium text-white transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
