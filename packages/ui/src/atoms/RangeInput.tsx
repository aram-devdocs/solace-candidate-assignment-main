import React from "react";

export interface RangeInputProps {
  /**
   * Minimum value in the range
   */
  min: number | "";
  /**
   * Maximum value in the range
   */
  max: number | "";
  /**
   * Callback when min value changes
   */
  onMinChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
  /**
   * Callback when max value changes
   */
  onMaxChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
  /**
   * Placeholder for min input
   */
  minPlaceholder?: string;
  /**
   * Placeholder for max input
   */
  maxPlaceholder?: string;
  /**
   * Label for the range input
   */
  label?: string;
  /**
   * Whether the inputs are disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * RangeInput component for numeric min/max range selection
 * Used for filtering by numeric ranges like years of experience
 *
 * @param min - Current minimum value
 * @param max - Current maximum value
 * @param onMinChange - Callback when minimum changes
 * @param onMaxChange - Callback when maximum changes
 * @param minPlaceholder - Placeholder for min input (default: "Min")
 * @param maxPlaceholder - Placeholder for max input (default: "Max")
 * @param label - Optional label for the range
 *
 * @example
 * ```tsx
 * <RangeInput
 *   min={minExperience}
 *   max={maxExperience}
 *   onMinChange={setMinExperience}
 *   onMaxChange={setMaxExperience}
 *   label="Years of Experience"
 * />
 * ```
 */
export const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  label,
  disabled = false,
  className = "",
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    onMinChange(value === "" ? "" : Number(value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    onMaxChange(value === "" ? "" : Number(value));
  };

  const inputBaseClasses =
    "px-md py-sm rounded-md border border-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-colors";

  return (
    <div className={`gap-sm flex flex-col ${className}`}>
      {label && <label className="text-secondary-900 text-sm font-medium">{label}</label>}
      <div className="gap-sm flex min-w-0 items-center">
        <input
          type="number"
          value={min}
          onChange={handleMinChange}
          placeholder={minPlaceholder}
          disabled={disabled}
          className={`w-0 min-w-0 flex-1 ${inputBaseClasses} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          min={0}
          aria-label={label ? `${label} minimum` : "Minimum value"}
        />
        <span className="text-secondary-500 flex-shrink-0">to</span>
        <input
          type="number"
          value={max}
          onChange={handleMaxChange}
          placeholder={maxPlaceholder}
          disabled={disabled}
          className={`w-0 min-w-0 flex-1 ${inputBaseClasses} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          min={0}
          aria-label={label ? `${label} maximum` : "Maximum value"}
        />
      </div>
    </div>
  );
};
