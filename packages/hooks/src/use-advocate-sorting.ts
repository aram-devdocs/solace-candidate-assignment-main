import { useCallback, useMemo } from "react";
import type { SortableColumn, SortDirection, SortConfig } from "@repo/utils";
import { toggleSort } from "@repo/utils";
import { useUrlState } from "./use-url-state";

/**
 * Hook for managing advocate sorting state with URL persistence
 *
 * Manages sort state with URL query parameters:
 * - sortBy: column name
 * - sortDir: asc or desc
 *
 * @returns Sort state and handlers
 *
 * @example
 * const { sortConfig, handleSort } = useAdvocateSorting();
 * // URL: ?sortBy=firstName&sortDir=asc
 * // sortConfig === { column: "firstName", direction: "asc" }
 */
export function useAdvocateSorting() {
  const [sortBy, setSortBy] = useUrlState("sortBy", "");
  const [sortDir, setSortDir] = useUrlState("sortDir", "asc");

  const sortConfig: SortConfig = useMemo(
    () => ({
      column: sortBy as SortableColumn | null,
      direction: (sortDir as SortDirection) || "asc",
    }),
    [sortBy, sortDir]
  );

  const handleSort = useCallback(
    (column: SortableColumn) => {
      const newConfig = toggleSort(sortConfig.column, sortConfig.direction, column);

      if (newConfig.column === null) {
        setSortBy("");
        setSortDir("asc");
      } else {
        setSortBy(newConfig.column);
        setSortDir(newConfig.direction);
      }
    },
    [sortConfig, setSortBy, setSortDir]
  );

  const clearSort = useCallback(() => {
    setSortBy("");
    setSortDir("asc");
  }, [setSortBy, setSortDir]);

  return {
    sortConfig,
    handleSort,
    clearSort,
  };
}
