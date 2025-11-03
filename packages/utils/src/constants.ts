/**
 * Application-wide constants.
 * Centralizes magic numbers and configuration values for better maintainability.
 */

/**
 * Timeout values in milliseconds
 */
export const TIMEOUTS = {
  /** Debounce delay for search input to reduce excessive API calls */
  SEARCH_DEBOUNCE_MS: 300,
  /** Maximum time to wait for API requests before timeout */
  API_REQUEST_TIMEOUT_MS: 30000,
} as const;

/**
 * Cache configuration values
 */
export const CACHE_CONFIG = {
  /** How long data is considered fresh before refetching (5 minutes) */
  STALE_TIME_MS: 5 * 60 * 1000,
  /** How long unused data stays in cache before garbage collection (10 minutes) */
  GC_TIME_MS: 10 * 60 * 1000,
  /** Number of keys to scan per Redis SCAN operation */
  REDIS_SCAN_BATCH_SIZE: 100,
  /** Maximum iterations for SCAN operations to prevent infinite loops */
  MAX_SCAN_ITERATIONS: 1000,
} as const;

/**
 * Pagination configuration
 */
export const PAGINATION = {
  /** Default number of items per page */
  DEFAULT_PAGE_SIZE: 25,
  /** Maximum allowed page size to prevent excessive data fetching */
  MAX_PAGE_SIZE: 500,
  /** Maximum records to fetch initially for client-side processing */
  MAX_INITIAL_FETCH: 500,
} as const;

/**
 * Filter validation limits
 */
export const FILTER_LIMITS = {
  /** Maximum number of filter IDs in array (cities, degrees, specialties) */
  MAX_ARRAY_LENGTH: 100,
  /** Minimum valid experience years */
  MIN_EXPERIENCE: 0,
  /** Maximum valid experience years */
  MAX_EXPERIENCE: 100,
} as const;

/**
 * API validation limits
 */
export const API_LIMITS = {
  /** Maximum page number to prevent excessive pagination */
  MAX_PAGE: 100000,
  /** Minimum valid page number */
  MIN_PAGE: 1,
  /** Maximum number of items per page */
  MAX_PAGE_SIZE: 500,
  /** Minimum number of items per page */
  MIN_PAGE_SIZE: 1,
  /** Default page size when not specified */
  DEFAULT_PAGE_SIZE: 25,
} as const;

/**
 * Client-side caching strategy configuration
 */
export const CACHE_STRATEGY = {
  /** Maximum records to fetch on initial page load (reduced for performance) */
  INITIAL_FETCH_SIZE: 100,
  /** Maximum records to cache client-side (prevents memory issues) */
  MAX_CACHED_RECORDS: 2000,
  /** Background fetch batch size for progressive loading */
  BATCH_SIZE: 100,
} as const;
