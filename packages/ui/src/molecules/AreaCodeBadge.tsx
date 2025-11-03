import React from "react";

export interface AreaCodeBadgeProps {
  /**
   * The area code to display (e.g., "555")
   */
  areaCode: string;
  /**
   * Whether the badge is clickable
   */
  clickable?: boolean;
  /**
   * Whether this filter is currently active
   */
  isActive?: boolean;
  /**
   * Callback when badge is clicked
   */
  onClick?: (areaCode: string) => void; // eslint-disable-line no-unused-vars
}

/**
 * AreaCodeBadge component for displaying phone area codes
 * Displays area code in parentheses format: (555)
 * Can be clickable to add as a filter
 *
 * @param areaCode - The area code to display
 * @param clickable - Whether the badge should be clickable
 * @param onClick - Callback when badge is clicked (for filtering)
 *
 * @example
 * ```tsx
 * <AreaCodeBadge
 *   areaCode="555"
 *   clickable={true}
 *   onClick={(code) => addAreaCodeFilter(code)}
 * />
 * ```
 */
export const AreaCodeBadge: React.FC<AreaCodeBadgeProps> = ({
  areaCode,
  clickable = false,
  isActive = false,
  onClick,
}) => {
  const baseClasses = isActive
    ? "inline-flex items-center gap-1 px-sm py-xs rounded-full text-sm font-medium bg-primary-600 text-white border border-primary-700 dark:bg-primary-500 dark:text-white dark:border-primary-600 whitespace-nowrap shadow-sm"
    : "inline-flex items-center gap-1 px-sm py-xs rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-700 dark:text-primary-200 whitespace-nowrap shadow-xs";

  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-200 hover:text-primary-900 dark:hover:bg-primary-600 dark:hover:text-primary-100 hover:shadow-sm active:bg-primary-300 dark:active:bg-primary-500 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-1"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(areaCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(areaCode);
    }
  };

  if (clickable) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${clickableClasses}`.trim()}
        aria-label={`Filter by area code ${areaCode}`}
        aria-pressed={isActive}
      >
        {isActive && (
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!isActive && clickable && (
          <svg
            className="h-3 w-3 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        )}
        ({areaCode})
      </button>
    );
  }

  return <span className={baseClasses}>({areaCode})</span>;
};
