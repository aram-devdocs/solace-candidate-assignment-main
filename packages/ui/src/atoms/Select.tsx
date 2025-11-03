import React from "react";
import { SelectDropdown } from "./SelectDropdown";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  /**
   * Array of options to display in the select dropdown
   */
  options: SelectOption[];
  /**
   * Placeholder text to display when no option is selected
   */
  placeholder?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Visual variant of the select
   */
  variant?: "default" | "error";
  /**
   * Use custom dropdown for better mobile positioning (default: true)
   */
  useCustomDropdown?: boolean;
}

/**
 * Select component for single-select dropdowns
 *
 * @param options - Array of options with value and label
 * @param placeholder - Placeholder text when nothing is selected
 * @param onChange - Callback with selected value
 * @param variant - Visual variant (default or error)
 *
 * @example
 * ```tsx
 * <Select
 *   options={[{ value: "md", label: "MD" }, { value: "phd", label: "PhD" }]}
 *   placeholder="Select degree"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      onChange,
      variant = "default",
      className = "",
      value,
      useCustomDropdown = true,
      ...props
    },
    ref
  ) => {
    if (useCustomDropdown) {
      return (
        <SelectDropdown
          options={options}
          value={value as string}
          onChange={onChange || (() => {})}
          placeholder={placeholder}
          disabled={props.disabled}
          className={className}
          ariaLabel={props["aria-label"]}
        />
      );
    }

    const baseClasses = "relative px-md py-sm rounded-md transition-colors cursor-pointer";
    const variantClasses = {
      default:
        "border border-secondary-400 dark:border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-700 dark:focus:ring-primary-500 focus:border-primary-700 dark:focus:border-primary-500 bg-white dark:bg-secondary-800 dark:text-secondary-200",
      error:
        "border border-error-500 dark:border-error-400 focus:outline-none focus:ring-2 focus:ring-error-500 dark:focus:ring-error-400 bg-white dark:bg-secondary-800 dark:text-secondary-200",
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      onChange?.(event.target.value);
    };

    return (
      <select
        ref={ref}
        value={value}
        onChange={handleChange}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
