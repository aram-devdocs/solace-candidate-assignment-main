import { getAdvocateFilterOptions } from "@repo/services";
import { isAppError } from "@repo/types";

/**
 * GET /api/advocates/filter-options
 * Returns available filter options with counts for populating UI filter dropdowns.
 * Heavily cached (1 hour) as this data changes infrequently.
 *
 * Success response:
 * {
 *   success: true,
 *   data: {
 *     cities: Array<{ id: number, name: string, count: number }>,
 *     degrees: Array<{ id: number, code: string, name: string, count: number }>,
 *     specialties: Array<{ id: number, name: string, count: number }>
 *   }
 * }
 *
 * Error response:
 * {
 *   success: false,
 *   error: { code: string, message: string, details?: string }
 * }
 */
export async function GET() {
  try {
    const result = await getAdvocateFilterOptions();

    if (result.success) {
      return Response.json({
        success: true,
        data: result.data,
      });
    }

    const error = result.error;
    const statusCode = isAppError(error) ? error.statusCode : 500;

    if (process.env.NODE_ENV === "development") {
      console.error("API Error [GET /api/advocates/filter-options]:", {
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
    console.error("Unexpected error in GET /api/advocates/filter-options:", error);
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
