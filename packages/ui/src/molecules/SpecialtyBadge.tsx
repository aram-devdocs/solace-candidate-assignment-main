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
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium rounded-full border bg-primary-50 text-primary-700 border-primary-200 whitespace-nowrap";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-100 hover:border-primary-300 transition-colors"
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
      >
        {specialty}
      </button>
    );
  }

  return <span className={`${baseClasses} ${className}`.trim()}>{specialty}</span>;
};
