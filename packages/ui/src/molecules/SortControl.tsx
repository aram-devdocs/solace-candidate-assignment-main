import React from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { SortDirection } from "@repo/utils";

export interface SortControlProps {
  /**
   * Whether this column is currently sorted
   */
  isActive: boolean;
  /**
   * Current sort direction (only relevant if isActive)
   */
  direction?: SortDirection;
  /**
   * Callback when sort is toggled
   */
  onToggle: () => void;
  /**
   * Label for the sortable column
   */
  label: string;
  /**
   * Whether to show label text or just icon
   */
  showLabel?: boolean;
}

/**
 * SortControl component for table column headers
 * Shows sort indicator and handles sort toggling
 *
 * @param isActive - Whether this column is actively sorted
 * @param direction - Sort direction (asc or desc)
 * @param onToggle - Handler for toggling sort
 * @param label - Column label text
 * @param showLabel - Whether to show label (default: true)
 *
 * @example
 * ```tsx
 * <SortControl
 *   isActive={sortColumn === "firstName"}
 *   direction={sortDirection}
 *   onToggle={() => handleSort("firstName")}
 *   label="First Name"
 * />
 * ```
 */
export const SortControl: React.FC<SortControlProps> = ({
  isActive,
  direction,
  onToggle,
  label,
  showLabel = true,
}) => {
  const getSortIcon = (): React.ReactNode => {
    if (!isActive) {
      return <ArrowUpDown className="text-secondary-400 h-4 w-4" />;
    }

    if (direction === "asc") {
      return <ArrowUp className="text-primary-700 h-4 w-4" />;
    }

    return <ArrowDown className="text-primary-700 h-4 w-4" />;
  };

  const getAriaLabel = (): string => {
    if (!isActive) {
      return `Sort by ${label}`;
    }
    if (direction === "asc") {
      return `${label} sorted ascending, click to sort descending`;
    }
    return `${label} sorted descending, click to remove sort`;
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="gap-xs hover:text-primary-700 flex items-center font-medium transition-colors"
      aria-label={getAriaLabel()}
    >
      {showLabel && <span>{label}</span>}
      {getSortIcon()}
    </button>
  );
};
