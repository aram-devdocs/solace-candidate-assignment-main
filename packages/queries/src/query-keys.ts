import type { AdvocateFilters, AdvocateSortConfig } from "@repo/types";

/**
 * Pagination parameters for advocate queries.
 */
export interface AdvocatePaginationParams {
  page?: number;
  pageSize?: number;
  filters?: AdvocateFilters;
  sort?: AdvocateSortConfig;
}

/**
 * Centralized query key factory for React Query.
 *
 * Query keys are used by React Query to identify and cache queries.
 * Using a factory pattern ensures consistency and makes it easy to
 * invalidate or refetch related queries.
 *
 * The key structure supports filter/sort/pagination parameters for
 * granular cache management and future server-side implementation.
 *
 * @example
 * // Invalidate all advocate queries
 * queryClient.invalidateQueries({ queryKey: queryKeys.advocates.all });
 *
 * @example
 * // Use in a query hook (basic)
 * useQuery({ queryKey: queryKeys.advocates.list(), ... });
 *
 * @example
 * // Use with filters (future-proof for server-side filtering)
 * useQuery({
 *   queryKey: queryKeys.advocates.filtered({ cities: ['New York'], degrees: ['MD'] }),
 *   ...
 * });
 *
 * @example
 * // Invalidate specific filtered query
 * queryClient.invalidateQueries({
 *   queryKey: queryKeys.advocates.filtered({ cities: ['New York'] })
 * });
 */
export const queryKeys = {
  advocates: {
    all: ["advocates"] as const,
    list: () => [...queryKeys.advocates.all, "list"] as const,
    detail: (id: string) => [...queryKeys.advocates.all, "detail", id] as const,
    filtered: (filters?: AdvocateFilters) =>
      [...queryKeys.advocates.all, "filtered", filters] as const,
    sorted: (sort?: AdvocateSortConfig) => [...queryKeys.advocates.all, "sorted", sort] as const,
    paginated: (params?: AdvocatePaginationParams) =>
      [...queryKeys.advocates.all, "paginated", params] as const,
    filterOptions: () => [...queryKeys.advocates.all, "filterOptions"] as const,
  },
} as const;
