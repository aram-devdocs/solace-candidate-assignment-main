import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  AdvocateWithRelations,
  AdvocateFilters,
  AdvocateSortConfig,
  PaginatedResponse,
} from "@repo/types";
import { fetchAdvocatesPaginated } from "../advocates";
import { queryKeys } from "../query-keys";
import type { ApiResponse } from "../client";

/**
 * Result type for paginated advocates query
 */
export type PaginatedAdvocatesResponse = ApiResponse<AdvocateWithRelations[]> & {
  pagination?: PaginatedResponse<AdvocateWithRelations>["pagination"];
};

/**
 * Parameters for useAdvocates hook
 */
export interface UseAdvocatesParams {
  page?: number;
  pageSize?: number;
  filters?: AdvocateFilters;
  sort?: AdvocateSortConfig;
  enabled?: boolean;
}

/**
 * Options for the useAdvocates hook.
 */
export type UseAdvocatesOptions<TData = PaginatedAdvocatesResponse> = Omit<
  UseQueryOptions<PaginatedAdvocatesResponse, Error, TData>,
  "queryKey" | "queryFn" | "enabled"
>;

/**
 * React Query hook for fetching paginated advocates with smart caching.
 *
 * Features:
 * - Server-side pagination for scalability
 * - Client-side smart boundary detection (tripwire logic)
 * - Automatic cache management with React Query
 * - Support for filtering, sorting, and searching
 * - Optimistic updates and background refetching
 *
 * The hook uses ClientCacheManager to track loaded pages and intelligently
 * decide when to fetch from server vs use cached data.
 *
 * @param params - Pagination, filter, and sort parameters
 * @param options - React Query options
 * @returns Query result with paginated data and metadata
 *
 * @example
 * // Basic usage with pagination
 * function AdvocatesList() {
 *   const { data, isLoading } = useAdvocates({
 *     page: 1,
 *     pageSize: 25
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (!data?.success) return <div>Error</div>;
 *
 *   return (
 *     <div>
 *       {data.data.map(advocate => (
 *         <div key={advocate.id}>{advocate.firstName}</div>
 *       ))}
 *       <p>Page {data.pagination.currentPage} of {data.pagination.totalPages}</p>
 *     </div>
 *   );
 * }
 *
 * @example
 * // With filters and search
 * function FilteredAdvocates() {
 *   const [filters, setFilters] = useState({ cityIds: [1, 2] });
 *
 *   const { data } = useAdvocates({
 *     page: 1,
 *     pageSize: 25,
 *     filters,
 *     sort: { column: "firstName", direction: "asc" }
 *   });
 *
 *   return <AdvocateTable data={data?.data} />;
 * }
 */
export function useAdvocates<TData = PaginatedAdvocatesResponse>(
  params: UseAdvocatesParams = {},
  options?: UseAdvocatesOptions<TData>
) {
  const { page = 1, pageSize = 25, filters, sort, enabled = true } = params;

  const result = useQuery({
    queryKey: queryKeys.advocates.paginated({ page, pageSize, filters, sort }),
    queryFn: async () => {
      const response = await fetchAdvocatesPaginated({ page, pageSize, filters, sort });
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled,
    ...options,
  });

  return result;
}
