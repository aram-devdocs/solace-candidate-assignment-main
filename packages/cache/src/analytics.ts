import { getRedisClient } from "./client";

export interface CacheStats {
  memoryUsed: number;
  memoryUsedMB: number;
  memoryLimit: number;
  memoryLimitMB: number;
  memoryUsagePercent: number;
  totalKeys: number;
  advocateKeys: number;
}

export interface CacheAnalytics {
  stats: CacheStats;
  topKeys: Array<{
    key: string;
    ttl: number;
    sizeEstimate: string;
  }>;
}

/**
 * Gets comprehensive cache statistics and analytics.
 * Useful for monitoring memory usage and cache performance.
 *
 * @returns Cache analytics including memory usage and key statistics
 */
export async function getCacheAnalytics(): Promise<CacheAnalytics> {
  const redis = getRedisClient();
  if (!redis) {
    throw new Error("Redis client not available");
  }

  // Get memory stats using INFO command
  const info = await redis.info("memory");
  const memoryLines = info.split("\r\n");

  let memoryUsed = 0;
  let memoryLimit = 33554432; // Default 32MB in bytes

  for (const line of memoryLines) {
    if (line.startsWith("used_memory:")) {
      memoryUsed = Number.parseInt(line.split(":")[1] ?? "0", 10);
    }
    if (line.startsWith("maxmemory:")) {
      const maxMem = Number.parseInt(line.split(":")[1] ?? "0", 10);
      if (maxMem > 0) memoryLimit = maxMem;
    }
  }

  // Get all advocate cache keys
  const advocateKeys = await redis.keys("advocates:v1:*");
  const totalKeys = await redis.dbsize();

  // Get TTL and size for top 10 keys
  const topKeys: Array<{ key: string; ttl: number; sizeEstimate: string }> = [];

  for (const key of advocateKeys.slice(0, 10)) {
    const ttl = await redis.ttl(key);
    const value = await redis.get(key);
    const sizeEstimate = value
      ? `${(new TextEncoder().encode(value).length / 1024).toFixed(2)} KB`
      : "unknown";

    topKeys.push({
      key,
      ttl,
      sizeEstimate,
    });
  }

  const stats: CacheStats = {
    memoryUsed,
    memoryUsedMB: Number.parseFloat((memoryUsed / 1024 / 1024).toFixed(2)),
    memoryLimit,
    memoryLimitMB: Number.parseFloat((memoryLimit / 1024 / 1024).toFixed(2)),
    memoryUsagePercent: Number.parseFloat(((memoryUsed / memoryLimit) * 100).toFixed(2)),
    totalKeys,
    advocateKeys: advocateKeys.length,
  };

  return {
    stats,
    topKeys,
  };
}

/**
 * Checks if cache memory usage is approaching the limit.
 * Returns true if usage is above the threshold.
 *
 * @param threshold - Memory usage threshold percentage (default: 80%)
 * @returns True if memory usage exceeds threshold
 */
export async function isCacheMemoryHigh(threshold: number = 80): Promise<boolean> {
  const analytics = await getCacheAnalytics();
  return analytics.stats.memoryUsagePercent >= threshold;
}

/**
 * Evicts low-priority cache entries when memory is high.
 * Keeps landing page caches, removes older standard caches.
 *
 * @returns Number of keys evicted
 */
export async function evictLowPriorityCaches(): Promise<number> {
  const redis = getRedisClient();
  if (!redis) {
    throw new Error("Redis client not available");
  }

  // Get all advocate cache keys
  const allKeys = await redis.keys("advocates:v1:*");

  // Filter to find low-priority keys (exclude landing page and filter options)
  const lowPriorityKeys = allKeys.filter(
    (key) =>
      !key.includes("landing-page") &&
      !key.includes("filter-options") &&
      (key.includes("paginated") || key.includes("count"))
  );

  // Get TTL for each key and sort by remaining TTL (ascending)
  // Keys with shortest TTL (closest to expiry) are evicted first
  const keysWithTTL = await Promise.all(
    lowPriorityKeys.map(async (key) => ({
      key,
      ttl: await redis.ttl(key),
    }))
  );

  // Sort by TTL ascending (shortest TTL first)
  keysWithTTL.sort((a, b) => a.ttl - b.ttl);

  // Evict up to 25% of low-priority keys
  const evictCount = Math.ceil(lowPriorityKeys.length * 0.25);
  const keysToEvict = keysWithTTL.slice(0, evictCount).map((k) => k.key);

  if (keysToEvict.length > 0) {
    await redis.del(...keysToEvict);
  }

  return keysToEvict.length;
}

/**
 * Monitors cache health and automatically evicts if memory is high.
 * Should be called periodically or after cache warming.
 *
 * @returns Cache analytics after eviction (if any)
 */
export async function monitorAndOptimizeCache(): Promise<{
  wasHigh: boolean;
  evictedKeys: number;
  analytics: CacheAnalytics;
}> {
  const wasHigh = await isCacheMemoryHigh(75);

  let evictedKeys = 0;
  if (wasHigh) {
    console.log("[Cache Monitor] Memory usage high, evicting low-priority caches...");
    evictedKeys = await evictLowPriorityCaches();
    console.log(`[Cache Monitor] Evicted ${evictedKeys} low-priority cache entries`);
  }

  const analytics = await getCacheAnalytics();

  return {
    wasHigh,
    evictedKeys,
    analytics,
  };
}
