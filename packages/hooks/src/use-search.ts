import { filterBySearch } from "@repo/utils";
import type { AdvocateWithRelations } from "@repo/types";

/**
 * Hook for client-side search functionality with debouncing
 *
 * @param items - Array of advocates to search through
 * @param searchTerm - Current search term
 * @returns Filtered array of advocates matching the search term
 *
 * @example
 * ```tsx
 * const filteredAdvocates = useSearch(advocates, searchTerm);
 * ```
 */
export function useSearch(
  items: AdvocateWithRelations[],
  searchTerm: string
): AdvocateWithRelations[] {
  return filterBySearch(items, searchTerm);
}
