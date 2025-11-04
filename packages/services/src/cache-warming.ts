import { getAdvocatesPaginated } from "./advocates";
import type { AdvocateSortConfig, AdvocateFilters } from "@repo/types";
import { monitorAndOptimizeCache } from "@repo/cache";
import type { CacheAnalytics } from "@repo/cache";

/**
 * Priority queries for cache warming.
 * Ordered by importance - landing page queries have highest priority.
 */
const PRIORITY_QUERIES: Array<{
  priority: number;
  description: string;
  params: {
    page: number;
    pageSize: number;
    sortConfig?: AdvocateSortConfig;
    filters?: AdvocateFilters;
  };
}> = [
  {
    priority: 1,
    description: "Landing page - Page 1",
    params: {
      page: 1,
      pageSize: 100,
      sortConfig: {
        column: "firstName",
        direction: "asc",
      },
    },
  },
  {
    priority: 2,
    description: "Landing page - Page 2",
    params: {
      page: 2,
      pageSize: 100,
      sortConfig: {
        column: "firstName",
        direction: "asc",
      },
    },
  },
  {
    priority: 3,
    description: "Default view - Page 1",
    params: {
      page: 1,
      pageSize: 25,
      sortConfig: {
        column: "firstName",
        direction: "asc",
      },
    },
  },
];

export interface CacheWarmingResult {
  success: boolean;
  warmedQueries: number;
  failedQueries: number;
  totalTime: number;
  errors: Array<{
    query: string;
    error: string;
  }>;
  details: Array<{
    query: string;
    cached: boolean;
    timeMs: number;
  }>;
  cacheAnalytics?: CacheAnalytics;
}

/**
 * Warms the Redis cache by pre-executing priority queries.
 * Designed to run via cron (every 23 hours) to maintain warm cache.
 *
 * Strategy:
 * - Executes high-priority queries (landing page) first
 * - Stops if memory constraints are hit
 * - Returns detailed metrics for monitoring
 *
 * @param maxQueries - Maximum number of queries to warm (default: all priority queries)
 * @returns Warming results with success metrics
 */
export async function warmAdvocateCache(
  maxQueries: number = PRIORITY_QUERIES.length
): Promise<CacheWarmingResult> {
  const startTime = Date.now();
  const result: CacheWarmingResult = {
    success: true,
    warmedQueries: 0,
    failedQueries: 0,
    totalTime: 0,
    errors: [],
    details: [],
  };

  const queriesToWarm = PRIORITY_QUERIES.slice(0, maxQueries);

  for (const query of queriesToWarm) {
    const queryStartTime = Date.now();
    const queryDescription = `${query.description} (page=${query.params.page}, pageSize=${query.params.pageSize})`;

    try {
      // Execute query - will cache if not already cached
      await getAdvocatesPaginated(
        query.params.page,
        query.params.pageSize,
        query.params.filters,
        query.params.sortConfig
      );

      const queryTime = Date.now() - queryStartTime;

      result.warmedQueries++;
      result.details.push({
        query: queryDescription,
        cached: true,
        timeMs: queryTime,
      });
    } catch (error) {
      const queryTime = Date.now() - queryStartTime;

      result.failedQueries++;
      result.success = false;
      result.errors.push({
        query: queryDescription,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      result.details.push({
        query: queryDescription,
        cached: false,
        timeMs: queryTime,
      });
    }
  }

  result.totalTime = Date.now() - startTime;

  // Monitor cache health and optimize if needed
  try {
    const monitorResult = await monitorAndOptimizeCache();
    result.cacheAnalytics = monitorResult.analytics;

    if (monitorResult.evictedKeys > 0) {
      console.log(
        `[Cache Warming] Evicted ${monitorResult.evictedKeys} low-priority keys to stay under 32MB limit`
      );
    }
  } catch (error) {
    console.error("[Cache Warming] Failed to monitor cache:", error);
  }

  return result;
}

/**
 * Checks if the landing page cache is warm.
 * Used for health monitoring and alerting.
 *
 * @returns True if landing page queries are cached
 */
export async function isLandingPageCacheWarm(): Promise<boolean> {
  try {
    // Check if priority 1 query (landing page) is cached by executing it
    // If cached, should return in <100ms
    const startTime = Date.now();

    await getAdvocatesPaginated(1, 100, undefined, {
      column: "firstName",
      direction: "asc",
    });

    const executionTime = Date.now() - startTime;

    // If execution took less than 500ms, likely served from cache
    return executionTime < 500;
  } catch {
    return false;
  }
}
