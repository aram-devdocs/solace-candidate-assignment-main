import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Advocate } from "@repo/types";
import { queryKeys } from "../query-keys";

/**
 * Options for prefetching advocates.
 */
interface PrefetchAdvocatesOptions {
  enabled?: boolean;
  data?: Advocate[];
  nextPage?: number;
  pageSize?: number;
}

/**
 * Hook to prefetch next page of advocates for improved perceived performance.
 *
 * This hook encapsulates the prefetching logic within the queries package,
 * keeping React Query implementation details hidden from consumers.
 *
 * @param options - Prefetch configuration
 *
 * @example
 * function AdvocatesList() {
 *   const paginatedData = getPaginatedAdvocates();
 *
 *   // Automatically prefetch next page when conditions are met
 *   usePrefetchAdvocates({
 *     enabled: hasNextPage,
 *     data: allAdvocates,
 *     nextPage: currentPage + 1,
 *     pageSize: 25
 *   });
 *
 *   return <div>...</div>;
 * }
 */
export function usePrefetchAdvocates(options: PrefetchAdvocatesOptions) {
  const queryClient = useQueryClient();
  const { enabled = true, data = [], nextPage, pageSize } = options;

  useEffect(() => {
    if (!enabled || !nextPage || !pageSize || data.length === 0) {
      return;
    }

    const startIndex = (nextPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const nextPageData = data.slice(startIndex, endIndex);

    if (nextPageData.length > 0) {
      queryClient.setQueryData(
        queryKeys.advocates.paginated({ page: nextPage, pageSize }),
        nextPageData
      );
    }
  }, [enabled, data, nextPage, pageSize, queryClient]);
}
