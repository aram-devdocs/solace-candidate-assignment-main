/**
 * ARIA labels for common UI components
 * Centralized for consistency and maintainability
 */
export const ARIA_LABELS = {
  searchInput: "Search advocates by name, specialty, or location",
  searchRegion: "Advocate search",
  advocateTable: "Healthcare advocates directory",
  loadingRegion: "Loading content",
  errorRegion: "Error message",
  expandRow: "Expand to show more details",
  collapseRow: "Collapse to hide details",
} as const;

/**
 * Screen reader announcements for dynamic content
 */
export const SR_ANNOUNCEMENTS = {
  loading: "Loading advocates data",
  error: "Error loading advocates. Please try again.",
  searchResults: (count: number): string => `Found ${count} advocate${count === 1 ? "" : "s"}`,
  noResults: "No advocates found matching your search",
  rowExpanded: "Row expanded, showing additional details",
  rowCollapsed: "Row collapsed, hiding additional details",
} as const;

/**
 * Accessibility roles for semantic HTML
 */
export const A11Y_ROLES = {
  search: "search",
  alert: "alert",
  status: "status",
} as const;
