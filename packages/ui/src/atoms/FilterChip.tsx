import React from "react";
import { X } from "lucide-react";

export interface FilterChipProps {
  /**
   * Label text to display in the chip
   */
  label: string;
  /**
   * Callback when the remove button is clicked
   */
  onRemove: () => void;
  /**
   * Visual variant of the chip
   * - degree: Light muted teal (for degree filters)
   * - city: Light muted blue (for city filters)
   * - specialty: Medium muted teal (for specialty filters)
   * - experience: Neutral gray (for experience filters)
   * - default: Secondary gray
   * - primary: Muted teal (backward compatibility)
   */
  variant?: "default" | "primary" | "degree" | "city" | "specialty" | "experience";
  /**
   * Additional className for the chip
   */
  className?: string;
}

/**
 * FilterChip component for displaying active filters
 * Shows a removable badge with label and close button
 *
 * @param label - Text to display in the chip
 * @param onRemove - Callback when chip is removed
 * @param variant - Visual style (default or primary)
 *
 * @example
 * ```tsx
 * <FilterChip
 *   label="PTSD"
 *   onRemove={() => removeFilter("ptsd")}
 *   variant="primary"
 * />
 * ```
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onRemove,
  variant = "default",
  className = "",
}) => {
  const variantClasses = {
    default: "bg-secondary-200 text-secondary-900 hover:bg-secondary-300",
    primary: "bg-primary-100 text-primary-700 hover:bg-primary-200",
    degree: "bg-primary-50 text-primary-700 hover:bg-primary-100",
    city: "bg-primary-100 text-primary-800 hover:bg-primary-150",
    specialty: "bg-primary-200 text-primary-800 hover:bg-primary-300",
    experience: "bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
  };

  return (
    <div
      className={`gap-xs px-sm py-xs inline-flex items-center rounded-full ${variantClasses[variant]} ${className}`}
    >
      <span className="text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="p-xs rounded-full transition-colors hover:bg-white/50"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};
