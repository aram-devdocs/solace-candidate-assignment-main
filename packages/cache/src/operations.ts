import { getRedisClient } from "./client";
import { CACHE_CONFIG } from "@repo/utils";

/**
 * TTL (Time To Live) constants in seconds.
 * Optimized for 30MB Redis limit - shorter TTLs to prevent memory buildup.
 */
export const CacheTTL = {
  FILTER_OPTIONS: 3600,
  PAGINATED_RESULTS: 300,
  /**
   * DEMO PURPOSE: Extended to 72 hours for demo environment where data doesn't change.
   * In production, consider reducing to 1 hour based on data update frequency.
   */
  DEFAULT_PAGINATED_RESULTS: 259200, // 72 hours = 72 * 60 * 60
  SEARCH_RESULTS: 900, // 15 minutes - increased from 3 min for better UX
  TOTAL_COUNT: 300,
  /**
   * DEMO PURPOSE: Extended to 72 hours for demo environment where data doesn't change.
   * In production, consider reducing to 1 hour based on data update frequency.
   */
  DEFAULT_TOTAL_COUNT: 259200, // 72 hours = 72 * 60 * 60
  ADVOCATE_DETAIL: 600,
} as const;

/**
 * Gets a cached value by key.
 *
 * @param key - Cache key
 * @returns Parsed JSON value or null if not found/expired/unavailable
 *
 * @example
 * const advocate = await getCached<AdvocateWithRelations>("advocates:v1:detail:123");
 * if (advocate) {
 *   console.log(advocate.firstName);
 * }
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return null;
    }

    const cached = await redis.get(key);

    if (!cached) {
      return null;
    }

    return JSON.parse(cached) as T;
  } catch (error) {
    console.error(`[Cache] GET error for key "${key}":`, error);
    return null;
  }
}

/**
 * Sets a cached value with TTL.
 *
 * @param key - Cache key
 * @param value - Value to cache (will be JSON stringified)
 * @param ttlSeconds - Time to live in seconds
 * @returns True if successful, false otherwise
 *
 * @example
 * await setCache("advocates:v1:detail:123", advocate, CacheTTL.ADVOCATE_DETAIL);
 */
export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<boolean> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return false;
    }

    const serialized = JSON.stringify(value);

    await redis.setex(key, ttlSeconds, serialized);
    return true;
  } catch (error) {
    console.error(`[Cache] SET error for key "${key}":`, error);
    return false;
  }
}

/**
 * Deletes a specific cache key.
 *
 * @param key - Cache key to delete
 * @returns Number of keys deleted (0 or 1)
 */
export async function deleteCache(key: string): Promise<number> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return 0;
    }
    return await redis.del(key);
  } catch (error) {
    console.error(`[Cache] DELETE error for key "${key}":`, error);
    return 0;
  }
}

/**
 * Invalidates all cache keys matching a pattern.
 * Uses SCAN for memory-efficient iteration with batching protection.
 *
 * @param pattern - Redis key pattern (e.g., "advocates:v1:*")
 * @returns Number of keys deleted
 *
 * @example
 * await invalidatePattern("advocates:v1:*"); // Clear all advocate caches
 * await invalidatePattern("advocates:v1:paginated:*"); // Clear only paginated results
 */
export async function invalidatePattern(pattern: string): Promise<number> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return 0;
    }

    let cursor = "0";
    let deletedCount = 0;
    let iterations = 0;

    do {
      if (iterations++ > CACHE_CONFIG.MAX_SCAN_ITERATIONS) {
        console.warn(
          `[Cache] Invalidation stopped after ${CACHE_CONFIG.MAX_SCAN_ITERATIONS} iterations for pattern "${pattern}"`
        );
        break;
      }

      const [newCursor, keys] = await redis.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        CACHE_CONFIG.REDIS_SCAN_BATCH_SIZE
      );
      cursor = newCursor;

      if (keys.length > 0) {
        const pipeline = redis.pipeline();
        keys.forEach((key) => pipeline.del(key));
        const results = await pipeline.exec();
        deletedCount += results?.filter(([err]) => !err).length ?? 0;
      }
    } while (cursor !== "0");

    return deletedCount;
  } catch (error) {
    console.error(`[Cache] Invalidate pattern error for "${pattern}":`, error);
    return 0;
  }
}

/**
 * Gets multiple cache keys at once.
 * More efficient than multiple individual GET calls.
 *
 * @param keys - Array of cache keys
 * @returns Object mapping keys to their values (null if not found)
 */
export async function getMultipleCached<T>(keys: string[]): Promise<Record<string, T | null>> {
  if (keys.length === 0) {
    return {};
  }

  try {
    const redis = getRedisClient();
    if (!redis) {
      return keys.reduce(
        (acc, key) => {
          acc[key] = null;
          return acc;
        },
        {} as Record<string, T | null>
      );
    }

    const values = await redis.mget(...keys);

    return keys.reduce(
      (acc, key, index) => {
        const value = values[index];
        acc[key] = value ? (JSON.parse(value) as T) : null;
        return acc;
      },
      {} as Record<string, T | null>
    );
  } catch (error) {
    console.error("[Cache] MGET error:", error);
    return keys.reduce(
      (acc, key) => {
        acc[key] = null;
        return acc;
      },
      {} as Record<string, T | null>
    );
  }
}

/**
 * Checks if a cache key exists.
 *
 * @param key - Cache key
 * @returns True if key exists
 */
export async function cacheExists(key: string): Promise<boolean> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return false;
    }
    const result = await redis.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`[Cache] EXISTS error for key "${key}":`, error);
    return false;
  }
}

/**
 * Gets the remaining TTL for a cache key.
 *
 * @param key - Cache key
 * @returns TTL in seconds, -1 if no expiry, -2 if key doesn't exist or cache unavailable
 */
export async function getCacheTTL(key: string): Promise<number> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return -2;
    }
    return await redis.ttl(key);
  } catch (error) {
    console.error(`[Cache] TTL error for key "${key}":`, error);
    return -2;
  }
}

/**
 * Gets cache memory usage statistics.
 * Useful for monitoring the 30MB limit.
 *
 * @returns Memory stats object
 */
export async function getCacheStats(): Promise<{
  usedMemory: number;
  usedMemoryHuman: string;
  maxMemory: number;
  maxMemoryHuman: string;
  keyCount: number;
}> {
  try {
    const redis = getRedisClient();
    if (!redis) {
      return {
        usedMemory: 0,
        usedMemoryHuman: "0B",
        maxMemory: 0,
        maxMemoryHuman: "0B",
        keyCount: 0,
      };
    }

    const info = await redis.info("memory");
    const dbSize = await redis.dbsize();

    const usedMemoryMatch = info.match(/used_memory:(\d+)/);
    const maxMemoryMatch = info.match(/maxmemory:(\d+)/);
    const usedMemoryHumanMatch = info.match(/used_memory_human:([^\r\n]+)/);
    const maxMemoryHumanMatch = info.match(/maxmemory_human:([^\r\n]+)/);

    return {
      usedMemory: usedMemoryMatch ? parseInt(usedMemoryMatch[1]) : 0,
      usedMemoryHuman: usedMemoryHumanMatch ? usedMemoryHumanMatch[1].trim() : "0B",
      maxMemory: maxMemoryMatch ? parseInt(maxMemoryMatch[1]) : 0,
      maxMemoryHuman: maxMemoryHumanMatch ? maxMemoryHumanMatch[1].trim() : "0B",
      keyCount: dbSize,
    };
  } catch (error) {
    console.error("[Cache] Stats error:", error);
    return {
      usedMemory: 0,
      usedMemoryHuman: "0B",
      maxMemory: 0,
      maxMemoryHuman: "0B",
      keyCount: 0,
    };
  }
}
