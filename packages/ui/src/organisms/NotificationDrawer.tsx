import React from "react";
import { NotificationEmptyState } from "../molecules/NotificationEmptyState";

export interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Slide-out drawer component for displaying notifications
 *
 * Renders a drawer panel that slides in from the right with an overlay.
 * Includes close button and empty state for notifications.
 *
 * Note: This is a pure presentational component. Use useNotificationDrawer hook
 * from @repo/hooks for state management, body scroll lock, and escape key handling.
 *
 * @param isOpen - Controls drawer visibility
 * @param onClose - Callback when drawer is closed (via overlay or close button)
 */
export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-neutral-900 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`dark:bg-secondary-900 fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-drawer-title"
      >
        <div className="px-lg py-md dark:border-secondary-700 flex items-center justify-between border-b border-neutral-200">
          <h2
            id="notification-drawer-title"
            className="dark:text-secondary-100 font-serif text-2xl font-light text-neutral-900"
          >
            Notifications
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-xs focus:ring-primary-500 dark:focus:ring-primary-400 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2"
            aria-label="Close notifications"
          >
            <svg
              className="h-6 w-6"
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
        </div>

        <div className="flex-1 overflow-y-auto">
          <NotificationEmptyState />
        </div>
      </div>
    </>
  );
};
