"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectDropdownOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps {
  /**
   * Array of available options
   */
  options: SelectDropdownOption[];
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}

/**
 * SelectDropdown component for selecting a single option from a custom dropdown
 * Uses absolute positioning for reliable mobile rendering
 *
 * @param options - Array of options with value and label
 * @param value - Currently selected value
 * @param onChange - Callback with selected value
 * @param placeholder - Placeholder text
 * @param disabled - Whether the select is disabled
 * @param ariaLabel - ARIA label for accessibility
 *
 * @example
 * ```tsx
 * <SelectDropdown
 *   options={[
 *     { value: "10", label: "10" },
 *     { value: "25", label: "25" }
 *   ]}
 *   value={pageSize}
 *   onChange={setPageSize}
 *   ariaLabel="Items per page"
 * />
 * ```
 */
export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  className = "",
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string): void => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" && isOpen) {
      event.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      onChange(options[nextIndex].value);
    } else if (event.key === "ArrowUp" && isOpen) {
      event.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      onChange(options[prevIndex].value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`px-md py-sm border-secondary-400 flex w-full items-center justify-between rounded-md border bg-white transition-colors ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:border-primary-700 cursor-pointer"
        } ${isOpen ? "ring-primary-700 border-primary-700 ring-2" : ""}`}
      >
        <span className={!selectedOption ? "text-secondary-500" : "text-secondary-900"}>
          {displayText}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="mt-xs border-secondary-400 absolute z-50 w-full rounded-md border bg-white shadow-lg"
        >
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`px-md py-sm hover:bg-secondary-100 flex w-full cursor-pointer items-center text-left transition-colors ${
                    isSelected ? "bg-primary-50 text-primary-700 font-medium" : "text-secondary-900"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
