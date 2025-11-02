import React from "react";

export interface DegreeBadgeProps {
  /**
   * Degree name to display
   */
  degree: string;
  /**
   * Degree ID for filtering
   */
  degreeId: number;
  /**
   * Optional click handler for filtering
   */
  onClick?: (degreeId: number) => void; // eslint-disable-line no-unused-vars
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
 * @param degreeId - Degree ID for filtering
 * @param onClick - Optional click handler for filtering
 * @param clickable - Whether badge should appear clickable
 *
 * @example
 * ```tsx
 * <DegreeBadge
 *   degree="MD"
 *   degreeId={1}
 *   onClick={(degreeId) => addDegreeFilter(degreeId)}
 *   clickable={true}
 * />
 * ```
 */
export const DegreeBadge: React.FC<DegreeBadgeProps> = ({
  degree,
  degreeId,
  onClick,
  clickable = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-50 text-primary-700 border-primary-150 whitespace-nowrap";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-100 hover:border-primary-200 transition-colors"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(degreeId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(degreeId);
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
