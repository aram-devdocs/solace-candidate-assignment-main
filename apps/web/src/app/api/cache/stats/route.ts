import { getCacheStats } from "@repo/cache";

/**
 * GET /api/cache/stats
 * Returns Redis cache statistics for monitoring and debugging.
 * Dev-only endpoint for cache performance visibility.
 *
 * Success response:
 * {
 *   success: true,
 *   data: {
 *     memoryUsage: string,
 *     keyCount: number,
 *     patterns: Record<string, number>,
 *     oldestCacheAge: number | null,
 *     staleEntries: number
 *   }
 * }
 *
 * Error response:
 * {
 *   success: false,
 *   error: { code: string, message: string }
 * }
 */
export async function GET() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Cache stats endpoint is only available in development",
          },
        },
        { status: 403 }
      );
    }

    const stats = await getCacheStats();

    return Response.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching cache stats:", error);

    return Response.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: error instanceof Error ? error.message : "Failed to fetch cache stats",
        },
      },
      { status: 500 }
    );
  }
}
