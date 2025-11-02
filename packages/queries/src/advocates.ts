import type {
  AdvocateWithRelations,
  AdvocateFilters,
  AdvocateSortConfig,
  PaginatedResponse,
  AdvocateFilterOptions,
} from "@repo/types";
import { apiClient, type ApiResponse } from "./client";

/**
 * Parameters for paginated advocate queries
 */
export interface FetchAdvocatesParams {
  page?: number;
  pageSize?: number;
  filters?: AdvocateFilters;
  sort?: AdvocateSortConfig;
}

/**
 * Builds query string from parameters
 */
function buildQueryString(params: FetchAdvocatesParams): string {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append("page", params.page.toString());
  }
  if (params.pageSize !== undefined) {
    searchParams.append("pageSize", params.pageSize.toString());
  }

  // Filters
  if (params.filters) {
    if (params.filters.search) {
      searchParams.append("search", params.filters.search);
    }
    if (params.filters.cityIds) {
      params.filters.cityIds.forEach((id) => searchParams.append("cityIds", id.toString()));
    }
    if (params.filters.degreeIds) {
      params.filters.degreeIds.forEach((id) => searchParams.append("degreeIds", id.toString()));
    }
    if (params.filters.specialtyIds) {
      params.filters.specialtyIds.forEach((id) =>
        searchParams.append("specialtyIds", id.toString())
      );
    }
    if (params.filters.minExperience !== undefined) {
      searchParams.append("minExperience", params.filters.minExperience.toString());
    }
    if (params.filters.maxExperience !== undefined) {
      searchParams.append("maxExperience", params.filters.maxExperience.toString());
    }
  }

  // Sort
  if (params.sort) {
    searchParams.append("sortColumn", params.sort.column);
    searchParams.append("sortDirection", params.sort.direction);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Fetches paginated advocates from the API with optional filtering and sorting.
 *
 * @param params - Query parameters for pagination, filtering, and sorting
 * @returns Promise resolving to paginated API response
 *
 * @example
 * const response = await fetchAdvocatesPaginated({
 *   page: 1,
 *   pageSize: 25,
 *   filters: { cityIds: [1, 2], search: "john" },
 *   sort: { column: "firstName", direction: "asc" }
 * });
 */
export async function fetchAdvocatesPaginated(params: FetchAdvocatesParams = {}): Promise<
  ApiResponse<AdvocateWithRelations[]> & {
    pagination?: PaginatedResponse<AdvocateWithRelations>["pagination"];
  }
> {
  const queryString = buildQueryString(params);
  return apiClient<AdvocateWithRelations[]>(`/api/advocates${queryString}`) as Promise<
    ApiResponse<AdvocateWithRelations[]> & {
      pagination?: PaginatedResponse<AdvocateWithRelations>["pagination"];
    }
  >;
}

/**
 * Fetches filter options (cities, degrees, specialties) with counts.
 * Used to populate filter dropdown menus.
 *
 * @returns Promise resolving to filter options
 *
 * @example
 * const response = await fetchAdvocateFilterOptions();
 * if (response.success) {
 *   console.log(response.data.cities); // [{ id: 1, name: "New York", count: 5 }]
 * }
 */
export async function fetchAdvocateFilterOptions(): Promise<ApiResponse<AdvocateFilterOptions>> {
  return apiClient<AdvocateFilterOptions>("/api/advocates/filter-options");
}
