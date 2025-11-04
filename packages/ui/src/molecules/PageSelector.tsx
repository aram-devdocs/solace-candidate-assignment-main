import React from "react";
import { Pagination } from "./Pagination";
import { PageSizeSelector } from "./PageSizeSelector";

export interface PageSelectorProps {
  /**
   * Current page number (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Visible page numbers (can include "..." for ellipsis)
   */
  visiblePages: (number | "...")[];
  /**
   * Whether there is a previous page
   */
  hasPrevious: boolean;
  /**
   * Whether there is a next page
   */
  hasNext: boolean;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Callback to go to first page
   */
  onFirstPage?: () => void;
  /**
   * Callback to go to last page
   */
  onLastPage?: () => void;
  /**
   * Current page size
   */
  pageSize: number;
  /**
   * Available page size options
   */
  pageSizeOptions: number[];
  /**
   * Total number of items
   */
  totalItems: number;
  /**
   * Callback when page size changes
   */
  onPageSizeChange: (pageSize: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Device size for responsive rendering
   */
  deviceSize?: "mobile" | "tablet" | "desktop";
  /**
   * Layout orientation
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * PageSelector component combines pagination controls and page size selection
 * Provides a unified interface for table navigation with responsive design
 *
 * Responsive behavior:
 * - Mobile: Stacked vertical layout with compact controls
 * - Tablet: Horizontal layout with medium spacing
 * - Desktop: Full horizontal layout with all controls
 *
 * @param currentPage - Current page number (1-indexed)
 * @param totalPages - Total number of pages
 * @param visiblePages - Page numbers to display (can include "..." for ellipsis)
 * @param hasPrevious - Whether previous page exists
 * @param hasNext - Whether next page exists
 * @param onPageChange - Handler for page selection
 * @param onFirstPage - Handler to go to first page
 * @param onLastPage - Handler to go to last page
 * @param pageSize - Current items per page
 * @param pageSizeOptions - Available page size options
 * @param totalItems - Total number of items across all pages
 * @param onPageSizeChange - Handler for page size changes
 * @param deviceSize - Current device size for responsive rendering
 * @param orientation - Layout direction (horizontal or vertical)
 *
 * @example
 * ```tsx
 * <PageSelector
 *   currentPage={2}
 *   totalPages={10}
 *   visiblePages={[1, 2, 3, "...", 10]}
 *   hasPrevious={true}
 *   hasNext={true}
 *   onPageChange={(page) => setPage(page)}
 *   onFirstPage={() => setPage(1)}
 *   onLastPage={() => setPage(10)}
 *   pageSize={25}
 *   pageSizeOptions={[10, 25, 50, 100]}
 *   totalItems={250}
 *   onPageSizeChange={(size) => setPageSize(size)}
 *   deviceSize="desktop"
 * />
 * ```
 */
export const PageSelector: React.FC<PageSelectorProps> = ({
  currentPage,
  totalPages,
  visiblePages,
  hasPrevious,
  hasNext,
  onPageChange,
  onFirstPage,
  onLastPage,
  pageSize,
  pageSizeOptions,
  totalItems,
  onPageSizeChange,
  deviceSize = "desktop",
  orientation = "horizontal",
}) => {
  const isVertical = orientation === "vertical" || deviceSize === "mobile";

  const containerClasses = isVertical
    ? "flex flex-col gap-md items-center"
    : "flex flex-row gap-lg items-center justify-between flex-wrap";

  return (
    <div className={containerClasses}>
      <div className={isVertical ? "order-2" : ""}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPageChange={onPageChange}
          onFirstPage={onFirstPage}
          onLastPage={onLastPage}
          deviceSize={deviceSize}
        />
      </div>
      <div className={isVertical ? "order-1" : ""}>
        <PageSizeSelector
          pageSize={pageSize}
          options={pageSizeOptions}
          onPageSizeChange={onPageSizeChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};
