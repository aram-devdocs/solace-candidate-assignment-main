import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
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
   * Device size for responsive rendering
   */
  deviceSize?: "mobile" | "tablet" | "desktop";
}

/**
 * Pagination component for navigating through pages
 * Responsive: Shows different controls based on device size
 * Mobile: First/Prev/Next/Last icons (when totalPages > 5), page indicator
 * Tablet: First/Prev/Next/Last icons (when totalPages > 5) + limited page numbers
 * Desktop: First/Prev/Next/Last with text labels (when totalPages > 5) + full page numbers
 *
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param visiblePages - Page numbers to display
 * @param hasPrevious - Whether previous page exists
 * @param hasNext - Whether next page exists
 * @param onPageChange - Handler for page selection
 * @param deviceSize - Current device size
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   visiblePages={[1, 2, 3, "...", 10]}
 *   hasPrevious={true}
 *   hasNext={true}
 *   onPageChange={(page) => setPage(page)}
 *   deviceSize="desktop"
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  visiblePages,
  hasPrevious,
  hasNext,
  onPageChange,
  onFirstPage,
  onLastPage,
  deviceSize = "desktop",
}) => {
  const buttonBaseClasses =
    "px-sm py-xs rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const pageButtonClasses = `${buttonBaseClasses} hover:bg-secondary-200`;
  const activePageClasses = `${buttonBaseClasses} bg-primary-700 text-white`;
  const navButtonClasses = `${buttonBaseClasses} border border-secondary-400 hover:bg-secondary-100 flex items-center gap-xs`;

  const showFirstLast = totalPages > 5;

  return (
    <div className="gap-sm flex flex-wrap items-center justify-center">
      {showFirstLast && (
        <button
          onClick={onFirstPage}
          disabled={!hasPrevious}
          className={navButtonClasses}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
          {deviceSize === "desktop" && <span className="hidden md:inline">First</span>}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={navButtonClasses}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        {deviceSize !== "mobile" && <span className="hidden sm:inline">Prev</span>}
      </button>

      {deviceSize !== "mobile" && (
        <div className="gap-xs flex items-center">
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-sm text-secondary-500">
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={isActive ? activePageClasses : pageButtonClasses}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      {deviceSize === "mobile" && (
        <div className="px-sm text-secondary-700 text-sm">
          Page {currentPage} of {totalPages}
        </div>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={navButtonClasses}
        aria-label="Next page"
      >
        {deviceSize !== "mobile" && <span className="hidden sm:inline">Next</span>}
        <ChevronRight className="h-4 w-4" />
      </button>

      {showFirstLast && (
        <button
          onClick={onLastPage}
          disabled={!hasNext}
          className={navButtonClasses}
          aria-label="Last page"
        >
          {deviceSize === "desktop" && <span className="hidden md:inline">Last</span>}
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
