"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { MAX_DROPDOWN_HEIGHT } from "../constants/layout";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  /**
   * Array of available options
   */
  options: MultiSelectOption[];
  /**
   * Currently selected values
   */
  value: string[];
  /**
   * Callback when selection changes
   */
  onChange: (values: string[]) => void; // eslint-disable-line no-unused-vars
  /**
   * Placeholder text when no options are selected
   */
  placeholder?: string;
  /**
   * Maximum height for the dropdown (in pixels)
   */
  maxHeight?: number;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * MultiSelect component for selecting multiple options from a dropdown
 * Features checkbox-based selection with searchable options
 *
 * @param options - Array of options with value and label
 * @param value - Currently selected values
 * @param onChange - Callback with array of selected values
 * @param placeholder - Placeholder text
 * @param maxHeight - Maximum dropdown height in pixels (default: 300)
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { value: "ptsd", label: "PTSD" },
 *     { value: "anxiety", label: "Anxiety/Depression" }
 *   ]}
 *   value={selectedSpecialties}
 *   onChange={setSelectedSpecialties}
 *   placeholder="Select specialties"
 * />
 * ```
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  maxHeight = MAX_DROPDOWN_HEIGHT,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (optionValue: string): void => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleClearAll = (): void => {
    onChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedCount = value.length;
  const displayText = selectedCount === 0 ? placeholder : `${selectedCount} selected`;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`px-md py-sm border-secondary-400 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-200 flex w-full items-center justify-between rounded-md border bg-white transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-primary-700 dark:hover:border-primary-500 cursor-pointer"
        } ${isOpen ? "ring-primary-700 border-primary-700 dark:ring-primary-500 dark:border-primary-500 ring-2" : ""}`}
      >
        <span
          className={
            selectedCount === 0
              ? "text-secondary-500 dark:text-secondary-400"
              : "text-secondary-900 dark:text-secondary-200"
          }
        >
          {displayText}
        </span>
        <div className="gap-xs flex items-center">
          {selectedCount > 0 && !disabled && (
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClearAll();
                }
              }}
              className="p-xs hover:bg-secondary-200 dark:hover:bg-secondary-700 cursor-pointer rounded transition-colors"
              aria-label="Clear all selections"
            >
              <X className="h-4 w-4" />
            </div>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="mt-xs border-secondary-400 dark:border-secondary-600 dark:bg-secondary-800 absolute z-50 w-full rounded-md border bg-white shadow-lg"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <div className="p-sm border-secondary-200 dark:border-secondary-700 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-sm py-xs border-secondary-400 dark:border-secondary-600 dark:bg-secondary-900 dark:text-secondary-200 focus:ring-primary-700 dark:focus:ring-primary-500 focus:border-primary-700 dark:focus:border-primary-500 w-full rounded border focus:outline-none focus:ring-2"
            />
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: `${maxHeight - 60}px` }}>
            {filteredOptions.length === 0 ? (
              <div className="p-md text-secondary-500 dark:text-secondary-400 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="px-md py-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 flex cursor-pointer items-center transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(option.value)}
                      className="mr-sm text-primary-700 dark:text-primary-500 border-secondary-400 dark:border-secondary-600 focus:ring-primary-700 dark:focus:ring-primary-500 h-4 w-4 cursor-pointer rounded focus:ring-2"
                    />
                    <span className="text-secondary-900 dark:text-secondary-200">
                      {option.label}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
