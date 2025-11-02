import React from "react";

export interface BellIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Bell illustration component for empty message state
 *
 * Displays a decorative bell image from external source
 *
 * @param className - Optional additional CSS classes
 * @param width - Image width in pixels (default: 200)
 * @param height - Image height in pixels (default: 200)
 */
export const BellIllustration: React.FC<BellIllustrationProps> = ({
  className = "",
  width = 200,
  height = 200,
}) => {
  return (
    <img
      src="https://app.solace.health/images/bell-color.png"
      alt="Bell illustration"
      width={width}
      height={height}
      className={className}
    />
  );
};
