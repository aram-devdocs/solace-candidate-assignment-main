/* eslint-disable no-undef */
import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Hook for managing profile dropdown state
 *
 * Handles open/close state, click outside detection, and escape key
 *
 * @returns Dropdown state, control functions, and ref for the dropdown element
 *
 * @example
 * const { isOpen, open, close, toggle, dropdownRef } = useProfileDropdown();
 *
 * <button onClick={toggle}>Profile</button>
 * <ProfileDropdown ref={dropdownRef} isOpen={isOpen} onClose={close} />
 */
export function useProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<globalThis.HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: Event) => {
      const mouseEvent = event as globalThis.MouseEvent;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(mouseEvent.target as globalThis.Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: Event) => {
      const keyboardEvent = event as globalThis.KeyboardEvent;
      if (keyboardEvent.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
    dropdownRef: dropdownRef as RefObject<globalThis.HTMLDivElement>,
  };
}
