import Redis from "ioredis";

/**
 * Redis client singleton instance.
 * Configured for production use with connection pooling and retry logic.
 */
let redis: Redis | null = null;

/**
 * Tracks Redis availability for graceful degradation.
 * Set to false if Redis connection fails or is not configured.
 */
let isRedisAvailable = true;

/**
 * Gets or creates the Redis client instance with graceful degradation.
 * Uses connection pooling and automatic reconnection.
 *
 * @returns Redis client instance, or null if Redis is unavailable
 */
export function getRedisClient(): Redis | null {
  if (!isRedisAvailable) {
    return null;
  }

  if (redis) {
    return redis;
  }

  const REDIS_URL = process.env.REDIS_URL || process.env.KV_URL;

  if (!REDIS_URL) {
    console.warn(
      "[Cache] Redis URL not configured, caching disabled. Set REDIS_URL or KV_URL environment variable."
    );
    isRedisAvailable = false;
    return null;
  }

  try {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError(err) {
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
          return true;
        }
        return false;
      },
      lazyConnect: false,
      enableReadyCheck: true,
    });

    redis.on("error", (err) => {
      console.error("[Cache] Redis Client Error:", err);
    });

    redis.on("connect", () => {
      console.log("[Cache] Redis Client Connected");
      isRedisAvailable = true;
    });

    redis.on("close", () => {
      console.warn("[Cache] Redis connection closed");
      isRedisAvailable = false;
    });

    return redis;
  } catch (error) {
    console.error("[Cache] Failed to initialize Redis client:", error);
    isRedisAvailable = false;
    return null;
  }
}

/**
 * Closes the Redis connection.
 * Should be called during application shutdown.
 */
export async function closeRedisClient(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

/**
 * Check if Redis is connected and healthy.
 *
 * @returns True if Redis is connected and responding to PING
 */
export async function isRedisHealthy(): Promise<boolean> {
  try {
    const client = getRedisClient();
    if (!client) {
      return false;
    }
    const result = await client.ping();
    return result === "PONG";
  } catch (error) {
    console.error("[Cache] Redis health check failed:", error);
    return false;
  }
}
