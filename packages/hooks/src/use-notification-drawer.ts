/* eslint-disable no-undef */
import { useState, useEffect } from "react";

/**
 * Hook for managing notification drawer state
 *
 * Handles open/close state and body scroll lock
 *
 * @returns Drawer state and control functions
 *
 * @example
 * const { isOpen, open, close } = useNotificationDrawer();
 *
 * <button onClick={open}>Open Notifications</button>
 * <NotificationDrawer isOpen={isOpen} onClose={close} />
 */
export function useNotificationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleEscape = (event: Event) => {
      const keyboardEvent = event as globalThis.KeyboardEvent;
      if (keyboardEvent.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}
