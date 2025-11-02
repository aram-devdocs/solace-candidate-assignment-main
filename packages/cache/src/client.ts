import Redis from "ioredis";

/**
 * Redis client singleton instance.
 * Configured for production use with connection pooling and retry logic.
 */
let redis: Redis | null = null;

/**
 * Gets or creates the Redis client instance.
 * Uses connection pooling and automatic reconnection.
 *
 * @returns Redis client instance
 * @throws {Error} If REDIS_URL environment variable is not set
 */
export function getRedisClient(): Redis {
  if (redis) {
    return redis;
  }

  const REDIS_URL = process.env.REDIS_URL || process.env.KV_URL;

  if (!REDIS_URL) {
    throw new Error("REDIS_URL or KV_URL environment variable must be set");
  }

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
    console.error("Redis Client Error:", err);
  });

  redis.on("connect", () => {
    console.log("Redis Client Connected");
  });

  return redis;
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
    const result = await client.ping();
    return result === "PONG";
  } catch (error) {
    console.error("Redis health check failed:", error);
    return false;
  }
}
