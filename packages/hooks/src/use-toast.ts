import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import type { ToastOptions } from "./ToastContext";

/**
 * Hook for accessing toast notification functionality
 *
 * Provides methods to show, dismiss, and clear toast notifications.
 * Must be used within a ToastProvider component.
 *
 * @returns Toast context methods and state
 * @throws Error if used outside of ToastProvider
 *
 * @example
 * const { showToast, dismissToast, clearAll } = useToast();
 *
 * // Show a success toast
 * showToast({
 *   variant: "success",
 *   message: "Profile saved successfully"
 * });
 *
 * // Show an error toast with action
 * showToast({
 *   variant: "error",
 *   message: "Failed to save",
 *   description: "Network error occurred",
 *   action: {
 *     label: "Retry",
 *     onClick: () => saveProfile()
 *   }
 * });
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export type { ToastOptions };
