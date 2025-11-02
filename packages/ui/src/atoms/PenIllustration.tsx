import React from "react";

export interface PenIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Pen illustration component for empty notes state
 *
 * Displays a decorative pen image from external source
 *
 * @param className - Optional additional CSS classes
 * @param width - Image width in pixels (default: 200)
 * @param height - Image height in pixels (default: 200)
 */
export const PenIllustration: React.FC<PenIllustrationProps> = ({
  className = "",
  width = 200,
  height = 200,
}) => {
  return (
    <img
      src="https://app.solace.health/images/pen.png"
      alt="Pen illustration"
      width={width}
      height={height}
      className={className}
    />
  );
};
