import { getAdvocatesPaginated } from "@repo/services";
import { isAppError, type AdvocateFilters, type AdvocateSortConfig } from "@repo/types";
import { API_LIMITS, FILTER_LIMITS } from "@repo/utils";
import { NextRequest } from "next/server";

const VALID_SORT_COLUMNS = [
  "firstName",
  "lastName",
  "city",
  "degree",
  "yearsOfExperience",
  "createdAt",
] as const;

/**
 * Parses query parameters into typed filter and sort objects with validation.
 * @throws {Error} If validation fails
 */
function parseQueryParams(searchParams: URLSearchParams): {
  page: number;
  pageSize: number;
  filters?: AdvocateFilters;
  sort?: AdvocateSortConfig;
} {
  // Pagination validation
  const pageStr = searchParams.get("page") || "1";
  const pageSizeStr = searchParams.get("pageSize") || String(API_LIMITS.DEFAULT_PAGE_SIZE);

  const page = parseInt(pageStr, 10);
  const pageSize = parseInt(pageSizeStr, 10);

  if (isNaN(page) || page < API_LIMITS.MIN_PAGE || page > API_LIMITS.MAX_PAGE) {
    throw new Error(
      `Invalid page number: must be between ${API_LIMITS.MIN_PAGE} and ${API_LIMITS.MAX_PAGE}`
    );
  }

  if (
    isNaN(pageSize) ||
    pageSize < API_LIMITS.MIN_PAGE_SIZE ||
    pageSize > API_LIMITS.MAX_PAGE_SIZE
  ) {
    throw new Error(
      `Invalid pageSize: must be between ${API_LIMITS.MIN_PAGE_SIZE} and ${API_LIMITS.MAX_PAGE_SIZE}`
    );
  }

  // Search (included in filters)
  const searchTerm = searchParams.get("search") || undefined;

  // Filter ID validation
  const validateIdArray = (paramName: string, values: string[]): number[] => {
    if (values.length > FILTER_LIMITS.MAX_ARRAY_LENGTH) {
      throw new Error(`Too many ${paramName}: maximum ${FILTER_LIMITS.MAX_ARRAY_LENGTH} allowed`);
    }

    const ids = values.map((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) {
        throw new Error(`Invalid ${paramName} value: ${val}. Must be a positive integer.`);
      }
      return num;
    });

    return ids;
  };

  const cityIds = validateIdArray("cityIds", searchParams.getAll("cityIds"));
  const degreeIds = validateIdArray("degreeIds", searchParams.getAll("degreeIds"));
  const specialtyIds = validateIdArray("specialtyIds", searchParams.getAll("specialtyIds"));

  // Area codes validation
  const areaCodes = searchParams.getAll("areaCodes");
  if (areaCodes.length > FILTER_LIMITS.MAX_ARRAY_LENGTH) {
    throw new Error(`Too many areaCodes: maximum ${FILTER_LIMITS.MAX_ARRAY_LENGTH} allowed`);
  }

  // Experience validation
  const minExperienceStr = searchParams.get("minExperience");
  const maxExperienceStr = searchParams.get("maxExperience");

  let minExperience: number | undefined;
  let maxExperience: number | undefined;

  if (minExperienceStr) {
    minExperience = parseInt(minExperienceStr, 10);
    if (
      isNaN(minExperience) ||
      minExperience < FILTER_LIMITS.MIN_EXPERIENCE ||
      minExperience > FILTER_LIMITS.MAX_EXPERIENCE
    ) {
      throw new Error(
        `Invalid minExperience: must be between ${FILTER_LIMITS.MIN_EXPERIENCE} and ${FILTER_LIMITS.MAX_EXPERIENCE}`
      );
    }
  }

  if (maxExperienceStr) {
    maxExperience = parseInt(maxExperienceStr, 10);
    if (
      isNaN(maxExperience) ||
      maxExperience < FILTER_LIMITS.MIN_EXPERIENCE ||
      maxExperience > FILTER_LIMITS.MAX_EXPERIENCE
    ) {
      throw new Error(
        `Invalid maxExperience: must be between ${FILTER_LIMITS.MIN_EXPERIENCE} and ${FILTER_LIMITS.MAX_EXPERIENCE}`
      );
    }
  }

  if (minExperience !== undefined && maxExperience !== undefined && minExperience > maxExperience) {
    throw new Error("minExperience cannot be greater than maxExperience");
  }

  const filters: AdvocateFilters = {
    search: searchTerm,
    cityIds: cityIds.length > 0 ? cityIds : undefined,
    degreeIds: degreeIds.length > 0 ? degreeIds : undefined,
    specialtyIds: specialtyIds.length > 0 ? specialtyIds : undefined,
    areaCodes: areaCodes.length > 0 ? areaCodes : undefined,
    minExperience,
    maxExperience,
  };

  // Remove undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key as keyof AdvocateFilters] === undefined) {
      delete filters[key as keyof AdvocateFilters];
    }
  });

  // Sort validation
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");

  let sort: AdvocateSortConfig | undefined;

  if (sortColumn || sortDirection) {
    if (!sortColumn) {
      throw new Error("sortColumn is required when sortDirection is provided");
    }
    if (!sortDirection) {
      throw new Error("sortDirection is required when sortColumn is provided");
    }

    if (!VALID_SORT_COLUMNS.includes(sortColumn as (typeof VALID_SORT_COLUMNS)[number])) {
      throw new Error(`Invalid sortColumn: must be one of ${VALID_SORT_COLUMNS.join(", ")}`);
    }

    if (sortDirection !== "asc" && sortDirection !== "desc") {
      throw new Error('Invalid sortDirection: must be "asc" or "desc"');
    }

    sort = {
      column: sortColumn as AdvocateSortConfig["column"],
      direction: sortDirection as "asc" | "desc",
    };
  }

  return {
    page,
    pageSize,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    sort,
  };
}

/**
 * GET /api/advocates
 * Returns paginated advocates with optional filtering, sorting, and searching.
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - pageSize: Items per page (default: 25, max: 500)
 * - search: Full-text search term
 * - cityIds[]: Array of city IDs to filter by
 * - degreeIds[]: Array of degree IDs to filter by
 * - specialtyIds[]: Array of specialty IDs to filter by
 * - areaCodes[]: Array of area codes to filter by (e.g., "555", "202")
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

    // Parse and validate query parameters
    let parsedParams;
    try {
      parsedParams = parseQueryParams(searchParams);
    } catch (validationError) {
      return Response.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message:
              validationError instanceof Error
                ? validationError.message
                : "Invalid request parameters",
          },
        },
        { status: 400 }
      );
    }

    const { page, pageSize, filters, sort } = parsedParams;

    // Use getAdvocatesPaginated for all requests (handles search via filters.search)
    const result = await getAdvocatesPaginated(page, pageSize, filters, sort);

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
      console.error("[API] Error in GET /api/advocates:", {
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
    console.error("[API] Unexpected error in GET /api/advocates:", error);
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
