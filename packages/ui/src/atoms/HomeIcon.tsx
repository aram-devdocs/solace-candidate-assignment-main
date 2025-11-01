"use client";

import { CustomIcon } from "./CustomIcon";

/**
 * Props for the HomeIcon component
 */
export interface HomeIconProps {
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
 * HomeIcon component - custom Solace Health home icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { HomeIcon } from "@repo/ui";
 *
 * <HomeIcon active={true} />
 * ```
 */
export function HomeIcon({ active = false, width = 32, height = 31, className }: HomeIconProps) {
  const gradientSvg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.92064 21.7363C-1.64707 15.6152 0.256258 0.000103717 0.256258 0.000103717C0.256258 0.000103717 19.5421 -0.120114 25.4439 7.82515C29.8429 13.7472 28.9192 26.9529 28.9192 26.9529C28.9192 26.9529 11.4884 27.8575 4.92064 21.7363Z"
        fill="url(#paint0_linear_home)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_home"
          x1="14.2632"
          y1="0"
          x2="14.2632"
          y2="26.3224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFC8BF" />
          <stop offset="0.96875" stopColor="#DEB260" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  const baseSvg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 5H9V3H10V1H6V3H7V5M22 29C22 29.552 22.448 30 23 30M28.5 30C29.3285 30 30 29.3285 30 28.5C30 27.6715 29.3285 27 28.5 27C27.814 27 27.2185 27.414 27 28C27 26.8955 26.1045 26 25 26C23.8955 26 23 26.8955 23 28C22.448 28 22 28.448 22 29M8 28C8 26.8955 7.1045 26 6 26C4.8955 26 4 26.8955 4 28C3.7815 27.414 3.186 27 2.5 27C1.6715 27 1 27.6715 1 28.5C1 29.3285 1.6715 30 2.5 30M8 30C8.552 30 9 29.552 9 29C9 28.448 8.552 28 8 28M20 28H11V30M7 5H1L1.002 17.5L15.497 3M20.5 5H30V17.5L15.5 3M17 23H18H17ZM25 24V18H21V24H25ZM21 21H25H21ZM20 24H26H20ZM10 24V18H6V24H10ZM17 10.5C17 9.6715 16.328 9 15.5 9C14.672 9 14 9.6715 14 10.5C14 11.3285 14.672 12 15.5 12C16.328 12 17 11.3285 17 10.5ZM3 18.5V27.0765V18.5ZM13 30H25H13ZM28 27.077V18.5V27.077ZM6 21H10H6ZM5 24H11H5ZM18 28V18H13V28H18Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <CustomIcon
      gradientSvg={gradientSvg}
      baseSvg={baseSvg}
      active={active}
      width={width}
      height={height}
      className={className}
    />
  );
}
