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
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-100 text-primary-800 border-primary-250 whitespace-nowrap";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-150 hover:border-primary-300 transition-colors"
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
      >
        {city}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{city}</span>;
};
