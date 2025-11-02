import React from "react";

export interface DegreeBadgeProps {
  /**
   * Degree name to display
   */
  degree: string;
  /**
   * Optional click handler for filtering
   */
  onClick?: (degree: string) => void; // eslint-disable-line no-unused-vars
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
 * DegreeBadge component for displaying degrees
 * Can be made clickable to add filters automatically
 *
 * @param degree - Degree name to display
 * @param onClick - Optional click handler for filtering
 * @param clickable - Whether badge should appear clickable
 *
 * @example
 * ```tsx
 * <DegreeBadge
 *   degree="MD"
 *   onClick={(degree) => addDegreeFilter(degree)}
 *   clickable={true}
 * />
 * ```
 */
export const DegreeBadge: React.FC<DegreeBadgeProps> = ({
  degree,
  onClick,
  clickable = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full border bg-primary-50 text-primary-700 border-primary-150";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-100 hover:border-primary-200 transition-colors"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(degree);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(degree);
    }
  };

  if (clickable && onClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${clickableClasses} ${className}`.trim()}
        aria-label={`Filter by ${degree}`}
      >
        {degree}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{degree}</span>;
};
