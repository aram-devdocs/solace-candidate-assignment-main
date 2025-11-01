"use client";

import type { SVGProps } from "react";

/**
 * Props for the HelpIcon component
 */
export interface HelpIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Whether the icon is in active/hover state
   * @default false
   */
  active?: boolean;
}

/**
 * HelpIcon component - custom Solace Health help icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { HelpIcon } from "@repo/ui";
 *
 * <HelpIcon active={true} />
 * ```
 */
export function HelpIcon({
  active = false,
  width = 32,
  height = 32,
  className,
  ...props
}: HelpIconProps) {
  return (
    <div className={`relative ${className || ""}`} style={{ width, height }}>
      {/* Gradient overlay SVG - behind */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 transition-all duration-300"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translate(0px, 0px)" : "translate(-4px, 0px)",
        }}
      >
        <path
          d="M5.2281 22.0018C4.72832 19.0018 5.2282 13.0018 6.2281 11.0018C7.228 9.00181 11.0064 4.90135 15.7281 5.00181C20.2813 5.09869 24.2281 9.00181 25.228 11.0018C26.228 13.0018 27.742 18.469 25.7275 22.5018C25.228 23.5018 30.8008 27.1027 29.7275 27.5018C24.705 29.3697 5.44124 28.5568 1.22771 27.0018C-0.17657 26.4836 5.37935 22.9097 5.2281 22.0018Z"
          fill="url(#paint0_linear_help)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_help"
            x1="15.7275"
            y1="5"
            x2="15.7275"
            y2="22.5018"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AFC8BF" />
            <stop offset="0.96875" stopColor="#D7A13B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Base outline SVG - on top */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        {...props}
      >
        <path
          d="M8.5 5.77742C7.198 6.64992 6.056 7.74292 5.1275 9.00342M27.226 9.50192C26.354 8.20042 25.2605 7.05942 24.001 6.13142M24.125 14.4994C23.614 12.8389 22.6075 11.3954 21.279 10.3414M19.503 9.25692C19.1875 9.11392 18.8625 8.98992 18.528 8.88592M28.5 24.5034H2.5V26.5034C1.948 26.5034 1.5 26.9514 1.5 27.5034V29.5034H30.5V27.5034C30.5 26.9514 30.0525 26.5034 29.5 26.5034H4.5M18 4.50342H20C20.2765 4.50342 20.5 4.27942 20.5 4.00342V3.00342C20.5 2.72742 20.2765 2.50342 20 2.50342H12C11.724 2.50342 11.5 2.72742 11.5 3.00342V4.00342C11.5 4.27942 11.724 4.50342 12 4.50342H16V6.50342M16 6.50342C10.201 6.50342 5.5 11.2044 5.5 17.0034V22.5034M16 6.50342C21.799 6.50342 26.5 11.2044 26.5 17.0034V22.5034"
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
