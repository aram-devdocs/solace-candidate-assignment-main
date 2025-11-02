import { getAdvocateFilterOptions } from "@repo/services";
import { isAppError } from "@repo/types";

/**
 * GET /api/advocates/filter-options
 * Returns available filter options with counts for populating UI filter dropdowns.
 */
export async function GET() {
  try {
    const result = await getAdvocateFilterOptions();

    if (result.success) {
      return Response.json(
        {
          success: true,
          data: result.data,
        },
        {
          headers: {
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=7200",
          },
        }
      );
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
