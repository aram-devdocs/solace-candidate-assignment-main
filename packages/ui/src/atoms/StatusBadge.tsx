import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the StatusBadge component
 */
export interface StatusBadgeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Current count of displayed items
   */
  displayedCount: number;
  /**
   * Total count of all items (from server, accurate)
   */
  totalCount: number;
  /**
   * Count of items currently loaded in client cache
   */
  loadedCount?: number;
  /**
   * Label for the items being counted
   * @default "records"
   */
  itemLabel?: string;
  /**
   * Whether filters are currently applied
   */
  isFiltered?: boolean;
  /**
   * Whether background fetching is in progress
   */
  isBackgroundFetching?: boolean;
}

/**
 * StatusBadge component - displays count information with total vs displayed items
 *
 * Shows users how many items they're viewing and whether results are filtered.
 * Provides transparency about data completeness and filter state.
 * Shows background fetching indicator when validating cached data against server.
 *
 * @example
 * ```tsx
 * import { StatusBadge } from "@repo/ui";
 *
 * // Unfiltered, all loaded
 * <StatusBadge displayedCount={25} totalCount={150} loadedCount={500} itemLabel="advocates" />
 * // Renders: "Showing 25 of 500 loaded (150 total)"
 *
 * // Filtered, checking server
 * <StatusBadge
 *   displayedCount={10}
 *   totalCount={150}
 *   loadedCount={500}
 *   itemLabel="advocates"
 *   isFiltered
 *   isBackgroundFetching
 * />
 * // Renders: "Showing 10 of 500 loaded (checking server...)" with spinner
 *
 * // Filtered, complete
 * <StatusBadge displayedCount={25} totalCount={127} loadedCount={500} itemLabel="advocates" isFiltered />
 * // Renders: "Showing 25 of 127 total (filtered)"
 * ```
 */
export function StatusBadge({
  displayedCount,
  totalCount,
  loadedCount,
  itemLabel = "records",
  isFiltered = false,
  isBackgroundFetching = false,
  className = "",
  ...props
}: StatusBadgeProps) {
  // Determine what to show based on state
  const showingAll = displayedCount === totalCount;
  const hasLoadedCount = loadedCount !== undefined && loadedCount > 0;

  let statusText = "";

  if (isBackgroundFetching && isFiltered) {
    // Background fetching: "Showing 10 of 500 loaded (checking server...)"
    statusText = hasLoadedCount
      ? `Showing ${displayedCount.toLocaleString()} of ${loadedCount.toLocaleString()} loaded`
      : `Showing ${displayedCount.toLocaleString()} ${itemLabel}`;
  } else if (isFiltered && hasLoadedCount) {
    // Filtered with loaded count: "Showing 25 of 127 total (filtered)"
    statusText = `Showing ${displayedCount.toLocaleString()} of ${totalCount.toLocaleString()} total`;
  } else if (!isFiltered && hasLoadedCount && loadedCount < totalCount) {
    // Unfiltered but not all loaded: "Showing 25 of 500 loaded (10,000 total)"
    statusText = `Showing ${displayedCount.toLocaleString()} of ${loadedCount.toLocaleString()} loaded`;
  } else if (showingAll) {
    // All shown: "Showing all 150 advocates"
    statusText = `Showing all ${totalCount.toLocaleString()} ${itemLabel}`;
  } else {
    // Default: "Showing 25 of 150 advocates"
    statusText = `Showing ${displayedCount.toLocaleString()} of ${totalCount.toLocaleString()} ${itemLabel}`;
  }

  return (
    <div
      className={`bg-secondary-50 text-secondary-700 border-secondary-200 flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${className}`.trim()}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span className="font-medium">
        {statusText}
        {isBackgroundFetching && isFiltered && (
          <span className="text-primary-600 ml-1">(checking server...)</span>
        )}
        {isFiltered && !isBackgroundFetching && (
          <span className="text-primary-600 ml-1">(filtered)</span>
        )}
        {!isFiltered && hasLoadedCount && loadedCount < totalCount && (
          <span className="text-secondary-500 ml-1">({totalCount.toLocaleString()} total)</span>
        )}
      </span>
      {isBackgroundFetching && (
        <svg
          className="text-primary-600 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </div>
  );
}
