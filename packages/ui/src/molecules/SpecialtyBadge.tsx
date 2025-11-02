import React from "react";

export interface SpecialtyBadgeProps {
  /**
   * Specialty text to display
   */
  specialty: string;
  /**
   * Optional click handler for filtering
   */
  onClick?: (specialty: string) => void; // eslint-disable-line no-unused-vars
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
 * SpecialtyBadge component for displaying specialties
 * Can be made clickable to add filters automatically
 *
 * @param specialty - Specialty name to display
 * @param onClick - Optional click handler for filtering
 * @param clickable - Whether badge should appear clickable
 *
 * @example
 * ```tsx
 * <SpecialtyBadge
 *   specialty="PTSD"
 *   onClick={(specialty) => addSpecialtyFilter(specialty)}
 *   clickable={true}
 * />
 * ```
 */
export const SpecialtyBadge: React.FC<SpecialtyBadgeProps> = ({
  specialty,
  onClick,
  clickable = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full border bg-primary-50 text-primary-700 border-primary-200";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-100 hover:border-primary-300 transition-colors"
    : "";

  const handleClick = (): void => {
    if (clickable && onClick) {
      onClick(specialty);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(specialty);
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
      >
        {specialty}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{specialty}</span>;
};
