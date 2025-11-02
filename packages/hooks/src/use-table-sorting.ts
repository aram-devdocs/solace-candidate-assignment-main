import { useCallback } from "react";
import { useUrlState } from "./use-url-state";

/**
 * Sort direction type
 */
export type SortDirection = "asc" | "desc";

/**
 * Sort configuration
 */
export interface SortConfig<K extends string> {
  column: K | null;
  direction: SortDirection;
}

/**
 * Generic hook for managing table sorting state with URL persistence
 *
 * Provides:
 * - Sort column and direction state
 * - URL persistence for shareable views
 * - Toggle sorting on column headers
 *
 * @template K - The type of sortable column keys (string union)
 *
 * @returns Sort state and handlers
 *
 * @example
 * ```tsx
 * type UserColumn = "name" | "email" | "role" | "createdAt";
 * const { sortConfig, handleSort, clearSort } = useTableSorting<UserColumn>();
 *
 * // Click handler for table header
 * <th onClick={() => handleSort("name")}>Name</th>
 * ```
 */
export function useTableSorting<K extends string = string>() {
  const [sortColumn, setSortColumn] = useUrlState("sort", "");
  const [sortDirection, setSortDirection] = useUrlState("sortDir", "asc");

  const sortConfig: SortConfig<K> = {
    column: (sortColumn || null) as K | null,
    direction: (sortDirection as SortDirection) || "asc",
  };

  const handleSort = useCallback(
    (column: K) => {
      if (sortConfig.column === column) {
        // Toggle direction if same column
        const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
      } else {
        // New column, default to ascending
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortConfig.column, sortConfig.direction, setSortColumn, setSortDirection]
  );

  const clearSort = useCallback(() => {
    setSortColumn("");
    setSortDirection("asc");
  }, [setSortColumn, setSortDirection]);

  return {
    sortConfig,
    handleSort,
    clearSort,
  };
}
