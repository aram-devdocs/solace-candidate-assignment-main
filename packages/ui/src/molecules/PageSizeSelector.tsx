import React from "react";
import { Select } from "../atoms/Select";
import type { SelectOption } from "../atoms/Select";

export interface PageSizeSelectorProps {
  /**
   * Current page size
   */
  pageSize: number;
  /**
   * Available page size options
   */
  options: number[];
  /**
   * Callback when page size changes
   */
  onPageSizeChange: (pageSize: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Total number of items
   */
  totalItems: number;
  /**
   * Label for the selector
   */
  label?: string;
}

/**
 * PageSizeSelector component for selecting number of items per page
 *
 * @param pageSize - Current page size
 * @param options - Available page size options (e.g., [10, 25, 50, 100])
 * @param onPageSizeChange - Handler for page size changes
 * @param totalItems - Total number of items
 * @param label - Optional label text
 *
 * @example
 * ```tsx
 * <PageSizeSelector
 *   pageSize={25}
 *   options={[10, 25, 50, 100]}
 *   onPageSizeChange={(size) => setPageSize(size)}
 *   totalItems={250}
 * />
 * ```
 */
export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  options,
  onPageSizeChange,
  label = "Show",
}) => {
  const selectOptions: SelectOption[] = options.map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const handleChange = (value: string): void => {
    onPageSizeChange(parseInt(value, 10));
  };

  return (
    <div className="gap-sm flex items-center text-sm">
      <span className="text-secondary-700">{label}</span>
      <Select
        options={selectOptions}
        value={pageSize.toString()}
        onChange={handleChange}
        className="w-20"
        aria-label="Items per page"
      />
      <span className="text-secondary-700">per page</span>
    </div>
  );
};
