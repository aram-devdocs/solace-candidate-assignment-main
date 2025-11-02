import crypto from "crypto";

/**
 * Cache key version for invalidating all keys when schema changes.
 * Increment this when making breaking changes to cached data structures.
 */
const CACHE_VERSION = "v1";

/**
 * Generates a consistent hash from an object.
 * Used for creating cache keys from filter/query parameters.
 *
 * @param obj - Object to hash
 * @returns 8-character hex hash
 */
function hashObject(obj: Record<string, unknown>): string {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = sortedKeys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Record<string, unknown>
  );

  const jsonStr = JSON.stringify(sortedObj);
  return crypto.createHash("md5").update(jsonStr).digest("hex").slice(0, 8);
}

/**
 * Generates a cache key for filter options.
 * Format: advocates:v1:filter-options
 *
 * @returns Cache key string
 */
export function filterOptionsKey(): string {
  return `advocates:${CACHE_VERSION}:filter-options`;
}

/**
 * Generates a cache key for paginated advocate results.
 * Format: advocates:v1:paginated:{hash}
 *
 * @param params - Query parameters including page, pageSize, and filters
 * @returns Cache key string
 */
export function paginatedResultsKey(params: Record<string, unknown>): string {
  const hash = hashObject(params);
  return `advocates:${CACHE_VERSION}:paginated:${hash}`;
}

/**
 * Generates a cache key for search results.
 * Format: advocates:v1:search:{hash}
 *
 * @param searchTerm - Search query term
 * @param page - Page number
 * @param pageSize - Items per page
 * @returns Cache key string
 */
export function searchResultsKey(searchTerm: string, page: number, pageSize: number): string {
  const hash = hashObject({ searchTerm, page, pageSize });
  return `advocates:${CACHE_VERSION}:search:${hash}`;
}

/**
 * Generates a cache key for total count queries.
 * Format: advocates:v1:count:{hash}
 *
 * @param filters - Filter parameters
 * @returns Cache key string
 */
export function totalCountKey(filters: Record<string, unknown>): string {
  const hash = hashObject(filters);
  return `advocates:${CACHE_VERSION}:count:${hash}`;
}

/**
 * Generates a cache key for individual advocate details.
 * Format: advocates:v1:detail:{id}
 *
 * @param id - Advocate ID
 * @returns Cache key string
 */
export function advocateDetailKey(id: number): string {
  return `advocates:${CACHE_VERSION}:detail:${id}`;
}

/**
 * Gets the pattern for invalidating all advocate-related caches.
 * Format: advocates:v1:*
 *
 * @returns Cache key pattern string
 */
export function allAdvocatesPattern(): string {
  return `advocates:${CACHE_VERSION}:*`;
}

/**
 * Gets the pattern for invalidating all paginated results.
 * Format: advocates:v1:paginated:*
 *
 * @returns Cache key pattern string
 */
export function paginatedPattern(): string {
  return `advocates:${CACHE_VERSION}:paginated:*`;
}

/**
 * Gets the pattern for invalidating all search results.
 * Format: advocates:v1:search:*
 *
 * @returns Cache key pattern string
 */
export function searchPattern(): string {
  return `advocates:${CACHE_VERSION}:search:*`;
}
