"use client";

import type { SVGProps } from "react";

/**
 * Props for the NotesIcon component
 */
export interface NotesIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Whether the icon is in active/hover state
   * @default false
   */
  active?: boolean;
}

/**
 * NotesIcon component - custom Solace Health notes icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { NotesIcon } from "@repo/ui";
 *
 * <NotesIcon active={true} />
 * ```
 */
export function NotesIcon({
  active = false,
  width = 32,
  height = 34,
  className,
  ...props
}: NotesIconProps) {
  return (
    <div className={`relative ${className || ""}`} style={{ width, height }}>
      {/* Gradient overlay SVG - behind */}
      <svg
        width={width}
        height={height}
        viewBox="0 -4 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 transition-all duration-300"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translate(0px, 0px)" : "translate(-4px, 0px)",
        }}
      >
        <path
          d="M8.04551 27.9106L0.0171021 20.0558C0.0164312 20.0552 0.0155298 20.0548 0.0145912 20.0548C0.0121044 20.0548 -0.0078125 0.386761 -0.0078125 0.386761C-0.0078125 0.386761 14.8851 0.384512 14.885 0.386761C14.7453 5.83036 15.544 8.38894 20.2886 8.38894C25.0332 8.38894 25.5152 4.21559 25.1887 0.386761C25.1764 0.242736 27.6661 0.937925 27.6661 0.937925L27.9211 27.9106H8.04551Z"
          fill="url(#paint0_linear_notes)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_notes"
            x1="13.3819"
            y1="4.02731"
            x2="13.3819"
            y2="28.7796"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AFC8BF" />
            <stop offset="0.96875" stopColor="#DEB260" />
          </linearGradient>
        </defs>
      </svg>

      {/* Base outline SVG - on top */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        {...props}
      >
        <path
          d="M15.63 19.7586H21.1472M14.5265 23.069H22.2507M6.8024 19.7586H13.4231M6.8024 13.1379H15.63M11.2162 16.4483H17.8369M20.0438 16.4483H23.3541M6.8024 16.4483H9.00929M21.1472 12.0345V8.72414H24.4576C24.4576 5.96552 22.2507 5.41379 22.2507 5.41379V3.2069C22.2507 3.2069 23.3541 3.2069 23.3541 2.65517V1H18.9403V2.65517C18.9403 3.2069 20.0438 3.2069 20.0438 3.2069V5.41379C20.0438 5.41379 17.8369 5.96552 17.8369 8.72414H18.9403M11.2162 33H26.6645C27.8832 33 28.8714 32.0119 28.8714 30.7931V7.62069C28.8714 6.40193 27.8832 5.41379 26.6645 5.41379H26.1127M4.5955 25.2759H7.35412C8.26778 25.2759 9.00929 26.0174 9.00929 26.931V33L1.28516 25.2759V7.62069C1.28516 6.40193 2.27329 5.41379 3.49205 5.41379H16.1817"
          stroke="#555555"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
