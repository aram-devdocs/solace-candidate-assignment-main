import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AdvocateFilterOptions } from "@repo/types";
import { fetchAdvocateFilterOptions } from "../advocates";
import { queryKeys } from "../query-keys";
import type { ApiResponse } from "../client";

/**
 * Options for the useAdvocateFilterOptions hook.
 */
export type UseAdvocateFilterOptionsOptions<TData = ApiResponse<AdvocateFilterOptions>> = Omit<
  UseQueryOptions<ApiResponse<AdvocateFilterOptions>, Error, TData>,
  "queryKey" | "queryFn"
>;

/**
 * React Query hook for fetching advocate filter options.
 *
 * Returns available cities, degrees, and specialties with counts for populating
 * filter dropdown menus. This data is heavily cached (1 hour) as it changes infrequently.
 *
 * Features:
 * - Returns only options with active advocates
 * - Includes counts for each option
 * - Long cache time (1 hour) for performance
 * - Separate cache from main advocates data
 *
 * @param options - React Query options
 * @returns Query result with filter options
 *
 * @example
 * function FilterDropdowns() {
 *   const { data, isLoading } = useAdvocateFilterOptions();
 *
 *   if (isLoading) return <div>Loading filters...</div>;
 *   if (!data?.success) return null;
 *
 *   return (
 *     <div>
 *       <CitySelect options={data.data.cities} />
 *       <DegreeSelect options={data.data.degrees} />
 *       <SpecialtySelect options={data.data.specialties} />
 *     </div>
 *   );
 * }
 *
 * @example
 * // Extract just city names for autocomplete
 * function CityAutocomplete() {
 *   const { data: cityNames } = useAdvocateFilterOptions({
 *     select: (response) => response.success
 *       ? response.data.cities.map(c => c.name)
 *       : []
 *   });
 *
 *   return <Autocomplete options={cityNames} />;
 * }
 */
export function useAdvocateFilterOptions<TData = ApiResponse<AdvocateFilterOptions>>(
  options?: UseAdvocateFilterOptionsOptions<TData>
) {
  return useQuery({
    queryKey: queryKeys.advocates.filterOptions(),
    queryFn: fetchAdvocateFilterOptions,
    staleTime: 1000 * 60 * 60, // 1 hour - data changes infrequently
    gcTime: 1000 * 60 * 120, // 2 hours
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}
