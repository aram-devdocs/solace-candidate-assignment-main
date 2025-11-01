/**
 * Breakpoint values matching Tailwind CSS defaults
 * Use these constants for responsive logic in components
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

/**
 * Device size categories for responsive component behavior
 */
export type DeviceSize = "mobile" | "tablet" | "desktop";

/**
 * Determines device size category based on window width
 * Adjusted thresholds to account for sidebar and ensure better iPad compatibility
 *
 * @param width - Current window width in pixels
 * @returns Device size category
 */
export function getDeviceSize(width: number): DeviceSize {
  // Mobile: < 900px (allows for sidebar on small tablets)
  if (width < 900) {
    return "mobile";
  }
  // Tablet: 900px - 1200px (covers most tablet widths with sidebar)
  if (width < 1200) {
    return "tablet";
  }
  // Desktop: >= 1200px
  return "desktop";
}
