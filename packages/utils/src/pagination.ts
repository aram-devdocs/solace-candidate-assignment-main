/**
 * Pagination configuration
 */
export interface PaginationConfig {
  /**
   * Current page number (1-indexed)
   */
  currentPage: number;
  /**
   * Number of items per page
   */
  pageSize: number;
  /**
   * Total number of items
   */
  totalItems: number;
}

/**
 * Pagination result with data and metadata
 */
export interface PaginationResult<T> {
  /**
   * Paginated data for current page
   */
  data: T[];
  /**
   * Current page number (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Total number of items across all pages
   */
  totalItems: number;
  /**
   * Number of items per page
   */
  pageSize: number;
  /**
   * Whether there is a previous page
   */
  hasPrevious: boolean;
  /**
   * Whether there is a next page
   */
  hasNext: boolean;
  /**
   * Index of first item on current page (0-indexed)
   */
  startIndex: number;
  /**
   * Index of last item on current page (0-indexed)
   */
  endIndex: number;
}

/**
 * Paginates an array of items
 *
 * @param items - Array of items to paginate
 * @param currentPage - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Pagination result with data and metadata
 *
 * @example
 * const result = paginate(advocates, 2, 25);
 * // Returns advocates for page 2 (items 26-50) with metadata
 */
export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  const data = items.slice(startIndex, endIndex + 1);

  return {
    data,
    currentPage: safePage,
    totalPages: totalPages || 1,
    totalItems,
    pageSize,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    startIndex,
    endIndex,
  };
}

/**
 * Calculates page numbers to display in pagination controls
 * Shows ellipsis for large page ranges
 *
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page buttons to show (default: 7)
 * @returns Array of page numbers and ellipsis indicators
 *
 * @example
 * getPageNumbers(5, 20, 7);
 * // Returns [1, "...", 4, 5, 6, "...", 20]
 *
 * @example
 * getPageNumbers(2, 5, 7);
 * // Returns [1, 2, 3, 4, 5]
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | "...")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  pages.push(1);

  let startPage = Math.max(2, currentPage - halfVisible + 1);
  let endPage = Math.min(totalPages - 1, currentPage + halfVisible - 1);

  if (currentPage <= halfVisible) {
    endPage = maxVisible - 1;
  } else if (currentPage >= totalPages - halfVisible) {
    startPage = totalPages - maxVisible + 2;
  }

  if (startPage > 2) {
    pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
