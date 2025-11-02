import React from "react";

export interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountClick: () => void;
  onLogoutClick: () => void;
}

/**
 * Dropdown menu component for user profile actions
 *
 * Displays Account and Logout options below the profile avatar.
 *
 * Note: This is a pure presentational component. Use useProfileDropdown hook
 * from @repo/hooks for state management, click outside detection, and escape key handling.
 * Pass the dropdownRef from the hook to a parent container element.
 *
 * @param isOpen - Controls dropdown visibility
 * @param onClose - Callback when dropdown should close (not used in component, handled by hook)
 * @param onAccountClick - Callback when Account option is clicked
 * @param onLogoutClick - Callback when Logout option is clicked
 */
export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onAccountClick,
  onLogoutClick,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="mt-xs absolute right-0 top-full z-50 w-52 rounded-lg border border-neutral-200 bg-white shadow-lg"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="py-sm">
        <button
          type="button"
          onClick={onAccountClick}
          className="gap-md px-lg py-md flex w-full items-center text-left text-sm text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
          role="menuitem"
        >
          <svg
            className="text-primary-700 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Account</span>
        </button>

        <button
          type="button"
          onClick={onLogoutClick}
          className="gap-md px-lg py-md flex w-full items-center text-left text-sm text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
          role="menuitem"
        >
          <svg
            className="text-primary-700 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
