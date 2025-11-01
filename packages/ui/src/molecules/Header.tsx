"use client";

import { Bell, Menu, MessageSquare, User } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "../atoms/Avatar";
import { IconButton } from "../atoms/IconButton";

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
   * User avatar image URL
   */
  userAvatarSrc?: string;
  /**
   * User initials for avatar fallback
   */
  userInitials?: string;
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
 *   userInitials="AH"
 *   messageCount={3}
 * />
 * ```
 */
export function Header({
  logo,
  onMenuClick,
  onMessagesClick,
  onNotificationsClick,
  onProfileClick,
  userAvatarSrc,
  userInitials,
  messageCount,
  notificationCount,
}: HeaderProps) {
  return (
    <header className="bg-primary-700 w-full text-white shadow-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-4">
          <IconButton
            icon={Menu}
            variant="primary"
            onClick={onMenuClick}
            className="hover:bg-primary-800 bg-transparent md:hidden"
            aria-label="Open menu"
          />
          {logo && <div className="flex-shrink-0">{logo}</div>}
        </div>

        {/* Right: Actions + Profile */}
        <div className="flex items-center gap-3">
          {/* Messages */}
          <div className="relative">
            <IconButton
              icon={MessageSquare}
              variant="primary"
              onClick={onMessagesClick}
              className="hover:bg-primary-800 bg-transparent"
              aria-label="Messages"
            />
            {messageCount && messageCount > 0 ? (
              <span className="bg-error-600 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {messageCount > 9 ? "9+" : messageCount}
              </span>
            ) : null}
          </div>

          {/* Notifications */}
          <div className="relative">
            <IconButton
              icon={Bell}
              variant="primary"
              onClick={onNotificationsClick}
              className="hover:bg-primary-800 bg-transparent"
              aria-label="Notifications"
            />
            {notificationCount && notificationCount > 0 ? (
              <span className="bg-error-600 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            ) : null}
          </div>

          {/* User Profile */}
          <button
            onClick={onProfileClick}
            className="hover:bg-primary-800 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            aria-label="User profile"
          >
            {userAvatarSrc || userInitials ? (
              <Avatar
                src={userAvatarSrc}
                initials={userInitials}
                size="sm"
                className="border-2 border-white"
              />
            ) : (
              <User className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
