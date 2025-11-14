"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "../atoms/IconButton";
import { GoudNetworkLogo } from "../atoms/GoudNetworkLogo";

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /**
   * Logo content (text or image)
   */
  logo?: ReactNode;
  /**
   * Callback when hamburger menu is clicked
   */
  onMenuClick?: () => void;
  /**
   * Callback when messages icon is clicked
   */
  onMessagesClick?: () => void;
  /**
   * Callback when notifications icon is clicked
   */
  onNotificationsClick?: () => void;
  /**
   * Callback when user profile is clicked
   */
  onProfileClick?: () => void;
  /**
   * Number of unread messages
   */
  messageCount?: number;
  /**
   * Number of unread notifications
   */
  notificationCount?: number;
}

/**
 * Header component - top navigation bar with logo, actions, and user profile
 *
 * @example
 * ```tsx
 * import { Header } from "@repo/ui";
 *
 * <Header
 *   logo={<img src="/logo.svg" alt="Logo" />}
 *   onMenuClick={() => setMenuOpen(true)}
 *   onMessagesClick={() => navigate('/messages')}
 *   onNotificationsClick={() => navigate('/notifications')}
 *   onProfileClick={() => navigate('/profile')}
 *   messageCount={3}
 * />
 * ```
 */
export function Header({
  logo = <GoudNetworkLogo width={140} height={24} />,
  onMenuClick,
  onMessagesClick,
  onNotificationsClick,
  onProfileClick,
  messageCount,
  notificationCount,
}: HeaderProps) {
  return (
    <header className="bg-primary-700 w-full text-white shadow-md">
      <div className="h-header flex items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          {logo && <div className="flex-shrink-0">{logo}</div>}
        </div>

        {/* Right: Actions + Profile (desktop) / Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {/* Messages */}
          <div className="relative">
            <a
              href="/messages"
              onClick={onMessagesClick}
              className="hover:bg-primary-600 h-icon-md w-icon-md flex items-center justify-center rounded-md transition-colors"
              aria-label="Messages"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-2xl text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M13 8H7" />
                <path d="M17 12H7" />
              </svg>
            </a>
            {messageCount && messageCount > 0 ? (
              <span className="bg-error-600 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {messageCount > 9 ? "9+" : messageCount}
              </span>
            ) : null}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={onNotificationsClick}
              className="hover:bg-primary-600 h-icon-md w-icon-md flex items-center justify-center rounded-md transition-colors"
              aria-label="Notifications"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-2xl text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
            {notificationCount && notificationCount > 0 ? (
              <span className="bg-error-600 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            ) : null}
          </div>

          {/* Hamburger Menu (mobile only) - replaces profile avatar position */}
          <IconButton
            icon={Menu}
            variant="primary"
            onClick={onMenuClick}
            className="hover:bg-primary-800 bg-transparent md:hidden"
            aria-label="Open menu"
          />

          {/* User Profile (desktop only) */}
          <button
            onClick={onProfileClick}
            className="bg-primary-600 h-icon-md w-icon-md hidden items-center justify-center rounded-full transition-transform hover:scale-110 md:flex"
            aria-label="User profile"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.61523 20.3073C4.61523 17.7583 7.92144 15.6919 11.9999 15.6919C16.0783 15.6919 19.3845 17.7583 19.3845 20.3073"
                stroke="white"
                strokeWidth="2.00107"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12.0002 12.9232C14.5492 12.9232 16.6155 10.8568 16.6155 8.30777C16.6155 5.75876 14.5492 3.69238 12.0002 3.69238C9.45114 3.69238 7.38477 5.75876 7.38477 8.30777C7.38477 10.8568 9.45114 12.9232 12.0002 12.9232Z"
                stroke="white"
                strokeWidth="2.00107"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
