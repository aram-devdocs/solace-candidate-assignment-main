"use client";

import type { SVGProps } from "react";

/**
 * Props for the MessagesIcon component
 */
export interface MessagesIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Whether the icon is in active/hover state
   * @default false
   */
  active?: boolean;
}

/**
 * MessagesIcon component - custom Solace Health messages icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { MessagesIcon } from "@repo/ui";
 *
 * <MessagesIcon active={true} />
 * ```
 */
export function MessagesIcon({
  active = false,
  width = 32,
  height = 30,
  className,
  ...props
}: MessagesIconProps) {
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
          d="M5.50001 26C-1.06771 19.8788 6.50013 1.49997 6.50013 1.49997C6.50013 1.49997 16.4999 -1.5 25.5001 3.99999C31.7949 7.84673 29.4999 30 29.4999 30C29.4999 30 12.0677 32.1211 5.50001 26Z"
          fill="url(#paint0_linear_messages)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_messages"
            x1="14.2632"
            y1="5"
            x2="14.2632"
            y2="31.3224"
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
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        {...props}
      >
        <path
          d="M9.5 7.5H15.5M12.5 17.5H17.5M12.5 11.5H9.5M20.5 11.5H14.5M18.5 14.5H20.5M9.5 14.5H16.5M2.5 8.1655L2 8.5C1.0205 9.0835 0.5 10.3435 0.5 11.5V27.5C0.5 28.6565 1.422 29.5 2.5 29.5H27.5C28.6405 29.5 29.5 28.594 29.5 27.5V11.5C29.5 10.2345 29 9.1145 28 8.5L27.5 8.1655M25.5 14V2.5C25.5 1.406 24.5625 0.5 23.5 0.5H6.5C5.406 0.5 4.5 1.4375 4.5 2.5V14M27.5 26.5L20.5 21M9.479 21L2.5 26.5M27.5 12.5L16.5 20.875C16.5 20.875 15.729 21.5 14.979 21.5C14.2395 21.5 13.479 20.854 13.479 20.854L2.5 12.5"
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
