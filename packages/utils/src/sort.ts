import type { Advocate } from "@repo/types";

/**
 * Sort direction
 */
export type SortDirection = "asc" | "desc";

/**
 * Generic comparator function type
 */
export type CompareFn<T> = (a: T, b: T) => number; // eslint-disable-line no-unused-vars

/**
 * Generic sort function for any data type
 * Sorts data by a specified column key and direction
 *
 * @template T - The type of data being sorted
 * @template K - The key type (must be a key of T)
 *
 * @param data - Array of items to sort
 * @param column - Column key to sort by
 * @param direction - Sort direction (asc or desc)
 * @param customComparator - Optional custom comparator function for the column
 * @returns Sorted array
 *
 * @example
 * ```tsx
 * const sorted = sortData(users, "name", "asc");
 * ```
 *
 * @example
 * ```tsx
 * // With custom comparator for complex types
 * const sorted = sortData(
 *   users,
 *   "createdAt",
 *   "desc",
 *   (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
 * );
 * ```
 */
export function sortData<T, K extends keyof T>(
  data: T[],
  column: K | null,
  direction: SortDirection,
  customComparator?: CompareFn<T>
): T[] {
  if (!column) {
    return data;
  }

  return [...data].sort((a, b) => {
    if (customComparator) {
      const result = customComparator(a, b);
      return direction === "asc" ? result : -result;
    }

    const aValue = a[column];
    const bValue = b[column];

    // Handle different types
    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      return direction === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      const comparison = aValue - bValue;
      return direction === "asc" ? comparison : -comparison;
    }

    // Fallback: convert to string and compare
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    const comparison = aStr.localeCompare(bStr);
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Sortable column keys for Advocate table
 */
export type SortableColumn =
  | "firstName"
  | "lastName"
  | "city"
  | "degree"
  | "yearsOfExperience"
  | "phoneNumber";

/**
 * Sort configuration
 */
export interface SortConfig {
  column: SortableColumn | null;
  direction: SortDirection;
}

/**
 * Sorts advocates by specified column and direction
 * Uses the generic sortData function under the hood
 *
 * @param advocates - Array of advocates to sort
 * @param column - Column to sort by
 * @param direction - Sort direction (asc or desc)
 * @returns Sorted array of advocates
 *
 * @example
 * const sorted = sortAdvocates(advocates, "firstName", "asc");
 * // Returns advocates sorted by first name A-Z
 *
 * @example
 * const sorted = sortAdvocates(advocates, "yearsOfExperience", "desc");
 * // Returns advocates sorted by experience (most experienced first)
 */
export function sortAdvocates(
  advocates: Advocate[],
  column: SortableColumn | null,
  direction: SortDirection
): Advocate[] {
  return sortData(advocates, column, direction);
}

/**
 * Toggles sort direction for a column
 * - If column is null or different, returns "asc"
 * - If column is same and "asc", returns "desc"
 * - If column is same and "desc", returns null (no sort)
 *
 * @param currentColumn - Current sort column
 * @param currentDirection - Current sort direction
 * @param newColumn - Column being clicked
 * @returns New sort configuration
 *
 * @example
 * const config = toggleSort(null, "asc", "firstName");
 * // Returns { column: "firstName", direction: "asc" }
 *
 * @example
 * const config = toggleSort("firstName", "asc", "firstName");
 * // Returns { column: "firstName", direction: "desc" }
 *
 * @example
 * const config = toggleSort("firstName", "desc", "firstName");
 * // Returns { column: null, direction: "asc" }
 */
export function toggleSort(
  currentColumn: SortableColumn | null,
  currentDirection: SortDirection,
  newColumn: SortableColumn
): SortConfig {
  if (currentColumn !== newColumn) {
    return { column: newColumn, direction: "asc" };
  }

  if (currentDirection === "asc") {
    return { column: newColumn, direction: "desc" };
  }

  return { column: null, direction: "asc" };
}
