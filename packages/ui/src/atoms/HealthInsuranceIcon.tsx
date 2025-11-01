"use client";

import { CustomIcon } from "./CustomIcon";

/**
 * Props for the HealthInsuranceIcon component
 */
export interface HealthInsuranceIconProps {
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
   * @default 32
   */
  height?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HealthInsuranceIcon component - custom Solace Health insurance icon with gradient overlay
 *
 * @example
 * ```tsx
 * import { HealthInsuranceIcon } from "@repo/ui";
 *
 * <HealthInsuranceIcon active={true} />
 * ```
 */
export function HealthInsuranceIcon({
  active = false,
  width = 32,
  height = 32,
  className,
}: HealthInsuranceIconProps) {
  const gradientSvg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_255_4370)">
        <path
          d="M0.988375 22.6194L0.788456 8.31675C0.76507 6.64363 2.11496 5.27478 3.78824 5.27482L25.9439 5.27535C27.6007 5.27539 28.9438 6.61852 28.9438 8.27535L28.9438 16.7443C28.9438 16.8793 28.8135 16.9771 28.6833 16.9409C28.0422 16.7626 26.3385 16.3403 24.9435 16.4544C22.1077 16.6865 20.0567 17.3641 18.5546 19.7474C17.2457 21.8241 17.5607 25.5775 17.5607 25.5775L3.98808 25.5775C2.34758 25.5775 1.0113 24.2598 0.988375 22.6194Z"
          fill="url(#paint0_linear_health)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_health"
          x1="16.7832"
          y1="7.00646"
          x2="14.8858"
          y2="30.9489"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFC8BF" />
          <stop offset="0.96875" stopColor="#DEB260" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_255_4370">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const baseSvg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_255_4395)">
        <rect width="32" height="32" fill="none" />
        <path
          d="M29 16.8693V8.5C29 6.84315 27.6569 5.5 26 5.5H4C2.34315 5.5 1 6.84315 1 8.5V22.5C1 24.1569 2.34314 25.5 4 25.5H17.3702"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16.569 18.8742H14.5M19.6724 15.7707H14.5M24.8448 15.7707H21.7414M21.7414 12.6328H14.5"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M25.4402 18.9925L30.1595 20.6581C30.3829 20.7369 30.5203 20.9617 30.4886 21.1964L29.8258 26.109C29.788 26.389 29.6336 26.6399 29.4006 26.7998L25.3903 29.5519C25.2199 29.6689 24.995 29.6689 24.8245 29.5519L20.8142 26.7998C20.5813 26.6399 20.4268 26.389 20.3891 26.109L19.7262 21.1964C19.6946 20.9617 19.832 20.7369 20.0553 20.6581L24.7746 18.9925C24.99 18.9165 25.2249 18.9165 25.4402 18.9925Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22.125 27.2969C22.125 26.4728 23.4612 25.8047 25.1094 25.8047C26.7576 25.8047 28.0938 26.4728 28.0938 27.2969M26.6016 22.8203C26.6016 23.6444 25.9335 24.3125 25.1094 24.3125C24.2853 24.3125 23.6172 23.6444 23.6172 22.8203C23.6172 21.9962 24.2853 21.3281 25.1094 21.3281C25.9335 21.3281 26.6016 21.9962 26.6016 22.8203Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M9.17057 11.1953V13.7552H11.7305V16.3151H9.17057V18.875H6.61068V16.3151H4.05078V13.7552H6.61068V11.1953H9.17057Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <defs>
        <clipPath id="clip0_255_4395">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
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
