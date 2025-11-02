export { getRedisClient, closeRedisClient, isRedisHealthy } from "./client";
export {
  getCached,
  setCache,
  deleteCache,
  invalidatePattern,
  getMultipleCached,
  cacheExists,
  getCacheTTL,
  getCacheStats,
  CacheTTL,
} from "./operations";
export {
  filterOptionsKey,
  paginatedResultsKey,
  searchResultsKey,
  totalCountKey,
  advocateDetailKey,
  allAdvocatesPattern,
  paginatedPattern,
  searchPattern,
} from "./keys";
