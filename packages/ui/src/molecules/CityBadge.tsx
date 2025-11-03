import React from "react";

export interface CityBadgeProps {
  /**
   * City name to display
   */
  city: string;
  /**
   * City ID for filtering
   */
  cityId: number;
  /**
   * Optional click handler for filtering
   */
  onClick?: (cityId: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Whether the badge is clickable
   */
  clickable?: boolean;
  /**
   * Whether this filter is currently active
   */
  isActive?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * CityBadge component for displaying cities
 * Can be made clickable to add filters automatically
 *
 * @param city - City name to display
 * @param cityId - City ID for filtering
 * @param onClick - Optional click handler for filtering
 * @param clickable - Whether badge should appear clickable
 *
 * @example
 * ```tsx
 * <CityBadge
 *   city="Boston"
 *   cityId={1}
 *   onClick={(cityId) => addCityFilter(cityId)}
 *   clickable={true}
 * />
 * ```
 */
export const CityBadge: React.FC<CityBadgeProps> = ({
  city,
  cityId,
  onClick,
  clickable = false,
  isActive = false,
  className = "",
}) => {
  const baseClasses = isActive
    ? "inline-flex items-center gap-1 justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-600 text-white border-primary-700 dark:bg-primary-500 dark:text-white dark:border-primary-600 whitespace-nowrap shadow-sm"
    : "inline-flex items-center gap-1 justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-100 text-primary-800 border-primary-250 dark:bg-primary-800 dark:text-primary-300 dark:border-primary-700 whitespace-nowrap shadow-xs";

  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-200 hover:border-primary-300 dark:hover:bg-primary-700 dark:hover:border-primary-600 hover:shadow-sm active:bg-primary-300 dark:active:bg-primary-600 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-1"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(cityId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(cityId);
    }
  };

  if (clickable && onClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${clickableClasses} ${className}`.trim()}
        aria-label={`Filter by ${city}`}
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
        {city}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{city}</span>;
};
