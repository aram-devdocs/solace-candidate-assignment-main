import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Advocate } from "@repo/types";
import { fetchAdvocates } from "../advocates";
import { queryKeys } from "../query-keys";
import type { ApiResponse } from "../client";

/**
 * Options for the useAdvocates hook.
 * Supports all React Query options including select transforms for optimization.
 */
export type UseAdvocatesOptions<TData = ApiResponse<Advocate[]>> = Omit<
  UseQueryOptions<ApiResponse<Advocate[]>, Error, TData>,
  "queryKey" | "queryFn"
>;

/**
 * React Query hook for fetching advocates.
 *
 * Provides automatic caching, background refetching, and error handling
 * for the advocates list. Uses React Query's stale-while-revalidate
 * pattern for optimal user experience.
 *
 * Supports React Query's `select` option for performance optimization with large datasets.
 * The select function runs only when the data changes, enabling efficient data transformations
 * and reducing component re-renders.
 *
 * @param options - Optional React Query configuration, including select transforms
 * @returns Query result with advocates data, loading state, and error handling
 *
 * @example
 * // Basic usage
 * function AdvocatesList() {
 *   const { data, isLoading, error } = useAdvocates();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!data?.success) return <div>Error: {data?.error.message}</div>;
 *
 *   return (
 *     <ul>
 *       {data.data.map(advocate => (
 *         <li key={advocate.id}>{advocate.firstName}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * @example
 * // Using select for performance optimization
 * function AdvocateCount() {
 *   const { data: count } = useAdvocates({
 *     select: (response) => response.success ? response.data.length : 0
 *   });
 *
 *   return <div>Total advocates: {count}</div>;
 * }
 *
 * @example
 * // Extract only specific fields to reduce memory footprint
 * function AdvocateNames() {
 *   const { data: names } = useAdvocates({
 *     select: (response) => response.success
 *       ? response.data.map(a => ({ id: a.id, name: `${a.firstName} ${a.lastName}` }))
 *       : []
 *   });
 *
 *   return <ul>{names.map(n => <li key={n.id}>{n.name}</li>)}</ul>;
 * }
 */
export function useAdvocates<TData = ApiResponse<Advocate[]>>(
  options?: UseAdvocatesOptions<TData>
) {
  return useQuery({
    queryKey: queryKeys.advocates.list(),
    queryFn: fetchAdvocates,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}
