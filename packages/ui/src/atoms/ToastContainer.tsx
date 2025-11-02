import React from "react";
import { createPortal } from "react-dom";
import { Toast, type ToastProps } from "./Toast";

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

/**
 * Container component for managing and displaying a stack of toast notifications
 *
 * Uses React Portal to render toasts at the document root level, ensuring they
 * appear above all other content regardless of DOM hierarchy.
 *
 * @param toasts - Array of toast configurations to display
 * @param position - Screen position for the toast stack (default: top-right)
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = "top-right",
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const positionClasses = {
    "top-right": "top-xl right-xl",
    "top-left": "top-xl left-xl",
    "bottom-right": "bottom-xl right-xl",
    "bottom-left": "bottom-xl left-xl",
    "top-center": "top-xl left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-xl left-1/2 -translate-x-1/2",
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`${positionClasses[position]} gap-sm pointer-events-none fixed z-50 flex flex-col`}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>,
    document.body
  );
};
