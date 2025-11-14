"use client";

/**
 * Props for the GoudNetworkLogo component
 */
export interface GoudNetworkLogoProps {
  /**
   * Width of the logo
   */
  width?: number;
  /**
   * Height of the logo
   */
  height?: number;
  /**
   * Fill color for the logo
   */
  fill?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Goud Network logo component - official brand mark
 *
 * @example
 * ```tsx
 * import { GoudNetworkLogo } from "@repo/ui";
 *
 * <GoudNetworkLogo width={140} height={24} />
 * ```
 */
export function GoudNetworkLogo({
  width = 140,
  height = 24,
  fill = "#FFF",
  className,
}: GoudNetworkLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Goud Network"
    >
      <text
        x="0"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill={fill}
        letterSpacing="0.5"
      >
        Goud Network
      </text>
    </svg>
  );
}
