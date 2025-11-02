import React from "react";

export interface SpecialtyBadgeProps {
  /**
   * Specialty text to display
   */
  specialty: string;
  /**
   * Specialty ID for filtering
   */
  specialtyId: number;
  /**
   * Optional click handler for filtering
   */
  onClick?: (specialtyId: number) => void; // eslint-disable-line no-unused-vars
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
 * SpecialtyBadge component for displaying specialties
 * Can be made clickable to add filters automatically
 *
 * @param specialty - Specialty name to display
 * @param specialtyId - Specialty ID for filtering
 * @param onClick - Optional click handler for filtering
 * @param clickable - Whether badge should appear clickable
 *
 * @example
 * ```tsx
 * <SpecialtyBadge
 *   specialty="PTSD"
 *   specialtyId={1}
 *   onClick={(specialtyId) => addSpecialtyFilter(specialtyId)}
 *   clickable={true}
 * />
 * ```
 */
export const SpecialtyBadge: React.FC<SpecialtyBadgeProps> = ({
  specialty,
  specialtyId,
  onClick,
  clickable = false,
  isActive = false,
  className = "",
}) => {
  const baseClasses = isActive
    ? "inline-flex items-center gap-1 justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-600 text-white border-primary-700 whitespace-nowrap shadow-sm"
    : "inline-flex items-center gap-1 justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-50 text-primary-700 border-primary-200 whitespace-nowrap shadow-xs";

  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-200 hover:border-primary-300 hover:shadow-sm active:bg-primary-300 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(specialtyId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(specialtyId);
    }
  };

  if (clickable && onClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${clickableClasses} ${className}`.trim()}
        aria-label={`Filter by ${specialty}`}
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
        {specialty}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{specialty}</span>;
};
