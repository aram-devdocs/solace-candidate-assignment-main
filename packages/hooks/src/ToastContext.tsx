import React, { createContext, useState, useCallback, useRef, useEffect } from "react";

export interface ToastOptions {
  variant: "info" | "success" | "warning" | "error";
  message: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastData extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toasts: ToastData[];
  showToast: (_options: ToastOptions) => string;
  dismissToast: (_id: string) => void;
  clearAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DEFAULT_DURATION = 5000;
const MAX_TOASTS = 5;

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
}

/**
 * Provider component for toast notification system
 *
 * Manages a queue of toast notifications with automatic dismissal, maximum limits,
 * and cleanup on unmount. Place this at the root of your application.
 *
 * @param children - Child components that can use the toast context
 * @param maxToasts - Maximum number of toasts to display at once (default: 5)
 * @param defaultDuration - Default auto-dismiss duration in ms (default: 5000, 0 for persistent)
 *
 * @example
 * <ToastProvider maxToasts={3} defaultDuration={3000}>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = MAX_TOASTS,
  defaultDuration = DEFAULT_DURATION,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timerRefs.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRefs.current.delete(id);
    }
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
    timerRefs.current.forEach((timer) => clearTimeout(timer));
    timerRefs.current.clear();
  }, []);

  const showToast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const duration = options.duration !== undefined ? options.duration : defaultDuration;

      const newToast: ToastData = {
        ...options,
        id,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          const removedToast = updated.shift();
          if (removedToast) {
            const timer = timerRefs.current.get(removedToast.id);
            if (timer) {
              clearTimeout(timer);
              timerRefs.current.delete(removedToast.id);
            }
          }
        }
        return updated;
      });

      if (duration > 0) {
        const timer = setTimeout(() => {
          dismissToast(id);
        }, duration);
        timerRefs.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, maxToasts, dismissToast]
  );

  useEffect(() => {
    return () => {
      timerRefs.current.forEach((timer) => clearTimeout(timer));
      timerRefs.current.clear();
    };
  }, []);

  const value: ToastContextValue = {
    toasts,
    showToast,
    dismissToast,
    clearAll,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
