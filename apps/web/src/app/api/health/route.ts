import { healthCheck } from "@repo/services";

/**
 * GET /api/health
 * Minimal health check endpoint that executes a lightweight database query
 * to keep Neon compute warm and prevent cold starts.
 *
 * This endpoint is designed to be called by Vercel Cron Jobs every 4 minutes
 * to maintain an active connection and avoid the 5-minute auto-suspend threshold.
 *
 * Success response:
 * {
 *   success: true,
 *   timestamp: string,
 *   database: "connected"
 * }
 *
 * Error response:
 * {
 *   success: false,
 *   error: string,
 *   timestamp: string
 * }
 */
export async function GET() {
  try {
    await healthCheck();

    return Response.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Health Check] Database connection failed:", error);

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
