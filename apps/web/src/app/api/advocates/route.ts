import { getAllAdvocates } from "@repo/services";
import { isAppError } from "@repo/types";

/**
 * GET /api/advocates
 * Returns all advocates from the database.
 *
 * Success response: { success: true, data: Advocate[] }
 * Error response: { success: false, error: { code: string, message: string, details?: string } }
 */
export async function GET() {
  const result = await getAllAdvocates();

  if (result.success) {
    return Response.json({ success: true, data: result.data });
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
}
