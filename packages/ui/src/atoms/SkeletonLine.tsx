import React from "react";

export interface SkeletonLineProps {
  /**
   * Width of the skeleton line
   */
  width?: string;
  /**
   * Height of the skeleton line
   */
  height?: string;
  /**
   * Border radius variant
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SkeletonLine component for loading placeholders
 *
 * Displays an animated shimmer effect to indicate loading content
 *
 * @param width - CSS width value (default: "100%")
 * @param height - CSS height value (default: "1rem")
 * @param rounded - Border radius variant (default: "md")
 * @param className - Additional CSS classes
 */
export const SkeletonLine: React.FC<SkeletonLineProps> = ({
  width = "100%",
  height = "1rem",
  rounded = "md",
  className = "",
}) => {
  const roundedClass = `rounded-${rounded}`;

  return (
    <div
      className={`from-secondary-200 via-secondary-100 to-secondary-200 animate-shimmer bg-gradient-to-r bg-[length:2000px_100%] ${roundedClass} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
