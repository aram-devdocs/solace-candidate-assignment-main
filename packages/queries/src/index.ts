/**
 * Query Layer with React Query Integration
 *
 * Type-safe API queries with centralized caching and state management.
 * Uses React Query for optimal data fetching patterns and caching strategies.
 *
 * Usage:
 * - For React components: Use hooks from "./hooks/*" (e.g., useAdvocates, useAdvocateFilterOptions)
 * - For direct API calls: Use functions from "./advocates" etc.
 * - For cache management: Use queryKeys for invalidation
 * - For performance: Use select transforms, separate filter options hook, and prefetching
 *
 * All queries return properly typed results using @repo/types.
 * React Query implementation details are encapsulated within this package.
 */

export * from "./advocates";
export * from "./client";
export * from "./hooks/use-advocates";
export * from "./hooks/use-advocate-filter-options";
export * from "./hooks/use-prefetch-advocates";
export * from "./provider";
export * from "./query-keys";
