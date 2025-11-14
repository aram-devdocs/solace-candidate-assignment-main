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
      viewBox="0 0 180 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Goud Network"
    >
      {/* Decorative hexagon icon */}
      <path d="M12 4L18 8V16L12 20L6 16V8L12 4Z" stroke={fill} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" fill={fill} />

      {/* Stylized "Goud Network" text with serif font */}
      <text
        x="26"
        y="21"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill={fill}
        letterSpacing="0.5"
      >
        Goud Network
      </text>
    </svg>
  );
}
