import React from "react";
import { FilterChip } from "../atoms/FilterChip";
import { Button } from "../atoms/Button";

export interface ActiveFilter {
  /**
   * Type of filter
   */
  type: "degree" | "city" | "specialty" | "experience" | "areaCode";
  /**
   * Display label for the filter
   */
  label: string;
  /**
   * Optional value (for removing specific filter)
   */
  value?: string;
}

export interface ActiveFiltersBarProps {
  /**
   * Array of active filters
   */
  activeFilters: ActiveFilter[];
  /**
   * Callback to remove a specific filter
   */
  onRemoveFilter: (
    type: "degree" | "city" | "specialty" | "experience" | "areaCode",
    value?: string
  ) => void; // eslint-disable-line no-unused-vars
  /**
   * Callback to clear all filters
   */
  onClearAll: () => void;
  /**
   * Total count of results after filtering
   */
  resultCount?: number;
}

/**
 * ActiveFiltersBar organism component for displaying active filters
 * Shows filter chips with remove buttons and clear all option
 * Responsive: Horizontal scroll on mobile, wrap on larger screens
 *
 * @param activeFilters - Array of active filter objects
 * @param onRemoveFilter - Handler to remove individual filter
 * @param onClearAll - Handler to clear all filters
 * @param resultCount - Number of results after filtering
 *
 * @example
 * ```tsx
 * <ActiveFiltersBar
 *   activeFilters={[
 *     { type: "specialty", label: "PTSD", value: "PTSD" },
 *     { type: "degree", label: "MD", value: "MD" }
 *   ]}
 *   onRemoveFilter={(type, value) => removeFilter(type, value)}
 *   onClearAll={clearAllFilters}
 *   resultCount={42}
 * />
 * ```
 */
export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  resultCount,
}) => {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="gap-sm bg-secondary-50 p-md border-secondary-200 flex flex-col items-start rounded-md border sm:flex-row sm:items-center">
      <div className="gap-sm text-secondary-700 flex items-center text-sm font-medium">
        <span>Active Filters:</span>
        {resultCount !== undefined && (
          <span className="text-primary-700">
            ({resultCount} result{resultCount !== 1 ? "s" : ""})
          </span>
        )}
      </div>

      <div className="gap-xs flex flex-1 flex-wrap items-center overflow-x-auto">
        {activeFilters.map((filter, index) => {
          const variantMap: Record<
            string,
            "degree" | "city" | "specialty" | "experience" | "areaCode" | "default"
          > = {
            degree: "degree",
            city: "city",
            specialty: "specialty",
            experience: "experience",
            areaCode: "areaCode",
          };
          const variant = variantMap[filter.type] || "default";

          return (
            <FilterChip
              key={`${filter.type}-${filter.value || filter.label}-${index}`}
              label={filter.label}
              onRemove={() => onRemoveFilter(filter.type, filter.value)}
              variant={variant}
            />
          );
        })}
      </div>

      <Button variant="secondary" onClick={onClearAll} className="whitespace-nowrap">
        Clear All
      </Button>
    </div>
  );
};
