"use client";

import type { SVGProps } from "react";

/**
 * Props for the FormsIcon component
 */
export interface FormsIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Whether the icon is in active/hover state
   * @default false
   */
  active?: boolean;
}

/**
 * FormsIcon component - custom Solace Health forms icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { FormsIcon } from "@repo/ui";
 *
 * <FormsIcon active={true} />
 * ```
 */
export function FormsIcon({
  active = false,
  width = 32,
  height = 36,
  className,
  ...props
}: FormsIconProps) {
  return (
    <div className={`relative ${className || ""}`} style={{ width, height }}>
      {/* Gradient overlay SVG - behind */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 26 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 transition-all duration-300"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translate(0px, 0px)" : "translate(-4px, 0px)",
        }}
      >
        <path
          d="M1.49997 28C0.499943 25 -1.00001 4.00004 1.49997 2.00004C3.99995 4.3869e-05 13.9999 0.0454984 17.4999 1.00004C20.9999 1.95459 23.9999 5.00004 24.9999 7.00004C26 9.00004 25.5 16 25.5 18C25.5 20 18.4999 27 16.5 28C14.5 29 2.5 31 1.49997 28Z"
          fill="url(#paint0_linear_forms)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_forms"
            x1="1.49994"
            y1="2.50004"
            x2="20.9999"
            y2="24.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AFC8BF" />
            <stop offset="1" stopColor="#DEB260" />
          </linearGradient>
        </defs>
      </svg>

      {/* Base outline SVG - on top */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 31 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        {...props}
      >
        <g>
          <path
            d="M24.7 32.32L28.18 28.84V5.64H24.7M7.3 5.64H3.82V30.58C3.82 31.5411 4.59894 32.32 5.56 32.32H22.38V28.84C22.38 28.26 22.8997 27.68 23.54 27.68H25.86M24.7 3.32H28.18C29.34 3.32 30.5 4.48 30.5 5.64V32.32C30.5 33.48 29.34 34.64 28.18 34.64H3.82C2.66 34.64 1.5 33.48 1.5 32.32V5.64C1.5 4.48 2.66 3.32 3.82 3.32H7.3M13.7963 25.8889H18.0926M13.7963 22.6667H20.2407M13.7963 19.4444H23.463M13.7963 16.2222H21.3148M13.7963 13H22.3889M9.5 25.8889H10.5741M9.5 22.6667H10.5741M9.5 19.4444H10.5741M9.5 16.2222H10.5741M9.5 13H10.5741M18.8414 3.32C18.5729 1.99644 17.403 1 16 1C14.597 1 13.4271 1.99644 13.1586 3.32H9.62V6.8H22.38V3.32H18.8414ZM16 3.32C15.6793 3.32 15.42 3.57984 15.42 3.9C15.42 4.22016 15.6793 4.48 16 4.48C16.3207 4.48 16.58 4.22016 16.58 3.9C16.58 3.57984 16.3207 3.32 16 3.32Z"
            stroke="#555555"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
