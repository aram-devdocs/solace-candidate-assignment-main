import { useCallback, useMemo } from "react";
import { useUrlNumberState } from "./use-url-state";
import { paginate, getPageNumbers } from "@repo/utils";
import type { PaginationResult } from "@repo/utils";

/**
 * Default page sizes for pagination
 */
export const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

/**
 * Hook for managing advocate pagination state with URL persistence
 *
 * Manages pagination state with URL query parameters:
 * - page: current page number
 * - pageSize: items per page
 *
 * @param totalItems - Total number of items to paginate
 * @param defaultPageSize - Default page size (default: 25)
 * @returns Pagination state, handlers, and metadata
 *
 * @example
 * const {
 *   currentPage,
 *   pageSize,
 *   setPage,
 *   setPageSize,
 *   goToNextPage,
 *   goToPreviousPage
 * } = useAdvocatePagination(advocates.length);
 */
export function useAdvocatePagination<T>(totalItems: number, defaultPageSize: number = 25) {
  const [currentPage, setCurrentPage] = useUrlNumberState("page", 1);
  const [pageSize, setPageSize] = useUrlNumberState("pageSize", defaultPageSize);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    return {
      currentPage: safePage,
      totalPages: totalPages || 1,
      totalItems,
      pageSize,
      hasPrevious: safePage > 1,
      hasNext: safePage < totalPages,
    };
  }, [currentPage, pageSize, totalItems]);

  const setPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, paginationInfo.totalPages));
      setCurrentPage(safePage);
    },
    [paginationInfo.totalPages, setCurrentPage]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setCurrentPage(1);
    },
    [setPageSize, setCurrentPage]
  );

  const goToNextPage = useCallback(() => {
    if (paginationInfo.hasNext) {
      setPage(paginationInfo.currentPage + 1);
    }
  }, [paginationInfo.hasNext, paginationInfo.currentPage, setPage]);

  const goToPreviousPage = useCallback(() => {
    if (paginationInfo.hasPrevious) {
      setPage(paginationInfo.currentPage - 1);
    }
  }, [paginationInfo.hasPrevious, paginationInfo.currentPage, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(paginationInfo.totalPages);
  }, [paginationInfo.totalPages, setPage]);

  const paginateData = useCallback(
    (items: T[]): PaginationResult<T> => {
      return paginate(items, paginationInfo.currentPage, pageSize);
    },
    [paginationInfo.currentPage, pageSize]
  );

  const visiblePageNumbers = useMemo(
    () => getPageNumbers(paginationInfo.currentPage, paginationInfo.totalPages),
    [paginationInfo.currentPage, paginationInfo.totalPages]
  );

  return {
    ...paginationInfo,
    setPage,
    setPageSize: handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    paginateData,
    visiblePageNumbers,
  };
}
