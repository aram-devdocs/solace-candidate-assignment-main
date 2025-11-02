import { getAdvocatesPaginated, searchAdvocates } from "@repo/services";
import { isAppError, type AdvocateFilters, type AdvocateSortConfig } from "@repo/types";
import { NextRequest } from "next/server";

/**
 * Parses query parameters into typed filter and sort objects.
 */
function parseQueryParams(searchParams: URLSearchParams): {
  page: number;
  pageSize: number;
  filters?: AdvocateFilters;
  sort?: AdvocateSortConfig;
  useSearch: boolean;
  searchTerm?: string;
} {
  // Pagination
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "25")));

  // Search
  const searchTerm = searchParams.get("search") || undefined;
  const useSearch = !!searchTerm?.trim();

  // Filters
  const cityIds = searchParams
    .getAll("cityIds")
    .map(Number)
    .filter((n) => !isNaN(n));
  const degreeIds = searchParams
    .getAll("degreeIds")
    .map(Number)
    .filter((n) => !isNaN(n));
  const specialtyIds = searchParams
    .getAll("specialtyIds")
    .map(Number)
    .filter((n) => !isNaN(n));
  const minExperience = searchParams.get("minExperience");
  const maxExperience = searchParams.get("maxExperience");

  const filters: AdvocateFilters = {
    search: searchTerm,
    cityIds: cityIds.length > 0 ? cityIds : undefined,
    degreeIds: degreeIds.length > 0 ? degreeIds : undefined,
    specialtyIds: specialtyIds.length > 0 ? specialtyIds : undefined,
    minExperience: minExperience ? parseInt(minExperience) : undefined,
    maxExperience: maxExperience ? parseInt(maxExperience) : undefined,
  };

  // Remove undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key as keyof AdvocateFilters] === undefined) {
      delete filters[key as keyof AdvocateFilters];
    }
  });

  // Sort
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");

  const sort: AdvocateSortConfig | undefined =
    sortColumn && sortDirection
      ? {
          column: sortColumn as AdvocateSortConfig["column"],
          direction: sortDirection as "asc" | "desc",
        }
      : undefined;

  return {
    page,
    pageSize,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    sort,
    useSearch,
    searchTerm,
  };
}

/**
 * GET /api/advocates
 * Returns paginated advocates with optional filtering, sorting, and searching.
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - pageSize: Items per page (default: 25, max: 100)
 * - search: Full-text search term
 * - cityIds[]: Array of city IDs to filter by
 * - degreeIds[]: Array of degree IDs to filter by
 * - specialtyIds[]: Array of specialty IDs to filter by
 * - minExperience: Minimum years of experience
 * - maxExperience: Maximum years of experience
 * - sortColumn: Column to sort by
 * - sortDirection: Sort direction (asc|desc)
 *
 * Success response:
 * {
 *   success: true,
 *   data: AdvocateWithRelations[],
 *   pagination: {
 *     currentPage: number,
 *     pageSize: number,
 *     totalRecords: number,
 *     totalPages: number,
 *     hasNext: boolean,
 *     hasPrevious: boolean
 *   }
 * }
 *
 * Error response:
 * {
 *   success: false,
 *   error: { code: string, message: string, details?: string }
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, pageSize, filters, sort, useSearch, searchTerm } = parseQueryParams(searchParams);

    // Use full-text search if search term provided, otherwise use filtered pagination
    const result =
      useSearch && searchTerm
        ? await searchAdvocates(searchTerm, page, pageSize)
        : await getAdvocatesPaginated(page, pageSize, filters, sort);

    if (result.success) {
      return Response.json({
        success: true,
        data: result.data.data,
        pagination: result.data.pagination,
      });
    }

    const error = result.error;
    const statusCode = isAppError(error) ? error.statusCode : 500;

    if (process.env.NODE_ENV === "development") {
      console.error("API Error [GET /api/advocates]:", {
        code: isAppError(error) ? error.code : "UNKNOWN",
        message: error.message,
        details: isAppError(error) ? error.details : undefined,
      });
    }

    return Response.json(
      {
        success: false,
        error: {
          code: isAppError(error) ? error.code : "INTERNAL_ERROR",
          message: error.message,
          details: isAppError(error) ? error.details : undefined,
        },
      },
      { status: statusCode }
    );
  } catch (error) {
    console.error("Unexpected error in GET /api/advocates:", error);
    return Response.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}
