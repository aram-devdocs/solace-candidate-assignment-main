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
 * <GoudNetworkLogo width={180} height={32} />
 * ```
 */
export function GoudNetworkLogo({
  width = 180,
  height = 32,
  fill = "#FFF",
  className,
}: GoudNetworkLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Goud Network"
    >
      {/* Stylized "Goud Network" text with serif font matching Advocate Directory */}
      <text
        x="0"
        y="24"
        fontFamily="Mollie Glaston, Georgia, Cambria, Times New Roman, Times, serif"
        fontSize="24"
        fontWeight="700"
        fill={fill}
        letterSpacing="0.5"
      >
        Goud Network
      </text>
    </svg>
  );
}
