"use client";

import React from "react";

import { AfternoonIllustration } from "../atoms/AfternoonIllustration";
import { AfternoonIllustrationDark } from "../atoms/AfternoonIllustrationDark";
import { EveningIllustration } from "../atoms/EveningIllustration";
import { EveningIllustrationDark } from "../atoms/EveningIllustrationDark";
import { MorningIllustration } from "../atoms/MorningIllustration";
import { MorningIllustrationDark } from "../atoms/MorningIllustrationDark";

/**
 * Props for the Greeting component
 */
export interface GreetingProps {
  /**
   * User's name to display in the greeting.
   * If not provided, displays a generic greeting without a name.
   */
  userName?: string;
  /**
   * Time period for the greeting (morning, afternoon, or evening).
   * Determines which illustration and greeting text to display.
   */
  timePeriod: "morning" | "afternoon" | "evening";
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * Greeting component that displays a personalized time-based greeting with an illustration.
 * Shows different illustrations for morning, afternoon, and evening.
 * Responsive: displays SVG on desktop and PNG on mobile devices.
 *
 * @example
 * ```tsx
 * <Greeting userName="John" timePeriod="morning" />
 * <Greeting timePeriod="afternoon" />
 * ```
 */
export const Greeting: React.FC<GreetingProps> = ({ userName, timePeriod, className = "" }) => {
  const greetingText = userName
    ? `Good ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}, ${userName}`
    : `Good ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`;

  const svgComponent = {
    morning: <MorningIllustration />,
    afternoon: <AfternoonIllustration />,
    evening: <EveningIllustration />,
  }[timePeriod];

  const svgComponentDark = {
    morning: <MorningIllustrationDark />,
    afternoon: <AfternoonIllustrationDark />,
    evening: <EveningIllustrationDark />,
  }[timePeriod];

  const imageSrc = `https://app.solace.health/images/${timePeriod}.png`;
  const imageAlt = timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1);

  return (
    <div
      className={`bg-greeting-background dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 flex w-full max-w-full flex-col items-center justify-between overflow-hidden rounded-lg border shadow-md md:flex-row ${className}`}
    >
      {/* PNG for mobile - centered above text */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width="64"
        height="64"
        className="mt-lg mb-sm block max-w-full object-contain md:hidden"
      />

      <h1 className="text-secondary-900 dark:text-secondary-100 px-sm sm:px-md md:px-lg md:py-xl pb-lg font-serif text-2xl font-bold sm:text-3xl">
        {greetingText}
      </h1>

      {/* PNG for tablet - right side, same size as mobile */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width="64"
        height="64"
        className="mr-md sm:mr-lg md:mr-xl hidden max-w-full object-contain md:block lg:hidden"
      />

      {/* SVG for desktop - full height (light mode) */}
      <div className="hidden h-full lg:block dark:hidden">{svgComponent}</div>

      {/* SVG for desktop - full height (dark mode) */}
      <div className="hidden h-full dark:block lg:dark:block">{svgComponentDark}</div>
    </div>
  );
};
