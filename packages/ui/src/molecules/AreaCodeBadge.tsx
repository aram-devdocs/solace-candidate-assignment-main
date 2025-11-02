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
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center px-sm py-xs rounded-full text-sm font-medium bg-primary-100 text-primary-800";
  const clickableClasses = clickable
    ? "cursor-pointer hover:bg-primary-200 hover:text-primary-900 hover:shadow-sm active:bg-primary-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
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
        className={`${baseClasses} ${clickableClasses}`}
        aria-label={`Filter by area code ${areaCode}`}
      >
        ({areaCode})
      </button>
    );
  }

  return <span className={baseClasses}>({areaCode})</span>;
};
