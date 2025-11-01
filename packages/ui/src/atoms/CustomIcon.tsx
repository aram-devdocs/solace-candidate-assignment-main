"use client";

import type { ReactElement } from "react";

/**
 * Props for the CustomIcon component
 */
export interface CustomIconProps {
  /**
   * The gradient SVG overlay shown when active
   */
  gradientSvg: ReactElement;
  /**
   * The base outline SVG shown always
   */
  baseSvg: ReactElement;
  /**
   * Whether the icon is in active/hover state
   * @default false
   */
  active?: boolean;
  /**
   * Icon width
   * @default 32
   */
  width?: number;
  /**
   * Icon height
   * @default 31
   */
  height?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CustomIcon wrapper component for Solace Health custom icons.
 * Handles the gradient overlay pattern used across all custom navigation icons.
 * Provides smooth transition between active and inactive states.
 *
 * This component eliminates duplication by centralizing the overlay logic
 * used in HomeIcon, MessagesIcon, NotesIcon, FormsIcon, HealthInsuranceIcon, and HelpIcon.
 *
 * @example
 * ```tsx
 * import { CustomIcon } from "@repo/ui";
 *
 * <CustomIcon
 *   active={true}
 *   gradientSvg={<svg>...</svg>}
 *   baseSvg={<svg>...</svg>}
 * />
 * ```
 */
export function CustomIcon({
  gradientSvg,
  baseSvg,
  active = false,
  width = 32,
  height = 31,
  className = "",
}: CustomIconProps): ReactElement {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Gradient overlay - behind, slides in when active */}
      <div
        className="absolute inset-0 transition-opacity transition-transform duration-300"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translate3d(0, 0, 0)" : "translate3d(-4px, 0, 0)",
          willChange: "transform, opacity",
        }}
      >
        {gradientSvg}
      </div>

      {/* Base outline - always visible on top */}
      <div className="absolute inset-0">{baseSvg}</div>
    </div>
  );
}
