import {
  healthCheck,
  warmAdvocateCache,
  isLandingPageCacheWarm,
  type CacheWarmingResult,
} from "@repo/services";

/**
 * GET /api/health
 * Health check endpoint with optional cache warming for landing page.
 *
 * Query Parameters:
 * - warm: Set to "true" to trigger cache warming for landing page queries
 * - check: Set to "cache" to check if landing page cache is warm
 *
 * This endpoint is designed to be called by cron-job.org every 23 hours
 * to maintain warm cache for the landing page and minimize Neon compute usage.
 *
 * Success response (basic health check):
 * {
 *   success: true,
 *   timestamp: string,
 *   database: "connected"
 * }
 *
 * Success response (with cache warming):
 * {
 *   success: true,
 *   timestamp: string,
 *   database: "connected",
 *   cacheWarming: {
 *     warmedQueries: number,
 *     failedQueries: number,
 *     totalTime: number,
 *     details: Array<...>
 *   }
 * }
 *
 * Success response (cache check):
 * {
 *   success: true,
 *   timestamp: string,
 *   database: "connected",
 *   landingPageCacheWarm: boolean
 * }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shouldWarmCache = searchParams.get("warm") === "true";
    const shouldCheckCache = searchParams.get("check") === "cache";

    // Always perform database health check
    await healthCheck();

    const response: {
      success: boolean;
      timestamp: string;
      database: string;
      cacheWarming?: CacheWarmingResult;
      landingPageCacheWarm?: boolean;
    } = {
      success: true,
      timestamp: new Date().toISOString(),
      database: "connected",
    };

    // Warm cache if requested (for cron-job.org)
    if (shouldWarmCache) {
      console.log("[Health Check] Warming advocate cache...");
      const warmingResult = await warmAdvocateCache();
      response.cacheWarming = warmingResult;

      if (!warmingResult.success) {
        console.error("[Health Check] Cache warming failed:", warmingResult.errors);
      } else {
        console.log(
          `[Health Check] Cache warming completed: ${warmingResult.warmedQueries} queries warmed in ${warmingResult.totalTime}ms`
        );
      }
    }

    // Check cache status if requested
    if (shouldCheckCache) {
      const isCacheWarm = await isLandingPageCacheWarm();
      response.landingPageCacheWarm = isCacheWarm;
    }

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("[Health Check] Failed:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
