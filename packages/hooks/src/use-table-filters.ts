import { useMemo } from "react";

/**
 * Generic filter configuration for table data
 * Simple, flexible approach that works with any data type
 *
 * @template T - The type of data being filtered
 */
export interface FilterConfig<T> {
  /**
   * Function to extract unique values for a field (for multi-select filters)
   */
  getUniqueValues: (data: T[], field: string) => string[]; // eslint-disable-line no-unused-vars
  /**
   * Function to filter data based on criteria
   */
  filterData: (data: T[], criteria: Record<string, unknown>) => T[]; // eslint-disable-line no-unused-vars
}

/**
 * Simple generic table filter hook
 * Designed to be extended by domain-specific hooks
 *
 * This hook provides the filtering logic framework.
 * Domain-specific hooks (like useAdvocateFilters) handle:
 * - URL state management
 * - Filter criteria structure
 * - Available values extraction
 *
 * @template T - The type of data being filtered
 * @template C - The filter criteria type
 *
 * @param data - Source data to filter
 * @param criteria - Current filter criteria
 * @param config - Filter configuration
 * @returns Filtered data
 *
 * @example
 * ```tsx
 * // In a domain-specific hook:
 * const filteredData = useTableFilters(
 *   allUsers,
 *   { searchTerm, selectedRoles, minAge },
 *   {
 *     getUniqueValues: (users, field) => {
 *       if (field === 'role') return Array.from(new Set(users.map(u => u.role)));
 *       return [];
 *     },
 *     filterData: (users, criteria) => {
 *       let result = users;
 *       if (criteria.searchTerm) {
 *         result = result.filter(u => u.name.includes(criteria.searchTerm));
 *       }
 *       return result;
 *     }
 *   }
 * );
 * ```
 */
export function useTableFilters<T, C = Record<string, unknown>>(
  data: T[],
  criteria: C,
  config: FilterConfig<T>
): T[] {
  return useMemo(() => {
    return config.filterData(data, criteria as Record<string, unknown>);
  }, [data, criteria, config]);
}

/**
 * Hook to extract unique values from data for filter options
 * Useful for multi-select filters
 *
 * @template T - The type of data
 * @param data - Source data
 * @param extractor - Function to extract values from each item
 * @returns Sorted array of unique values
 *
 * @example
 * ```tsx
 * const availableCities = useUniqueValues(
 *   advocates,
 *   (advocate) => advocate.city
 * );
 * ```
 */
export function useUniqueValues<T>(
  data: T[],
  extractor: (item: T) => string | string[] // eslint-disable-line no-unused-vars
): string[] {
  return useMemo(() => {
    const valueSet = new Set<string>();
    data.forEach((item) => {
      const value = extractor(item);
      if (Array.isArray(value)) {
        value.forEach((v) => valueSet.add(v));
      } else {
        valueSet.add(value);
      }
    });
    return Array.from(valueSet).sort();
  }, [data, extractor]);
}
