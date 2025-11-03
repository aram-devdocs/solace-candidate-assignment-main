"use client";

"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook to manage expandable row state for tables
 * Tracks which rows are expanded/collapsed
 *
 * @param totalRows - Total number of rows in the table
 * @returns Object containing expanded state and toggle function
 *
 * @example
 * ```tsx
 * const { expandedRows, toggleRow, isExpanded } = useExpandableRows(advocates.length);
 * ```
 */
export function useExpandableRows(totalRows: number = 0) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = useCallback((index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (index: number) => {
      return expandedRows.has(index);
    },
    [expandedRows]
  );

  const collapseAll = useCallback(() => {
    setExpandedRows(new Set());
  }, []);

  const expandAll = useCallback(() => {
    setExpandedRows(new Set(Array.from({ length: totalRows }, (_, i) => i)));
  }, [totalRows]);

  return {
    expandedRows,
    toggleRow,
    isExpanded,
    collapseAll,
    expandAll,
  };
}
