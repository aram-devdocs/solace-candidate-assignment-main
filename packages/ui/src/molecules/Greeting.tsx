import React from "react";

import { AfternoonIllustration } from "../atoms/AfternoonIllustration";
import { EveningIllustration } from "../atoms/EveningIllustration";
import { MorningIllustration } from "../atoms/MorningIllustration";

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

  const imageSrc = `https://app.solace.health/images/${timePeriod}.png`;
  const imageAlt = timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1);

  return (
    <div
      className={`bg-greeting-background border-secondary-200 flex flex-col items-center justify-between overflow-hidden rounded-lg border shadow-md md:flex-row ${className}`}
    >
      {/* PNG for mobile - centered above text */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width="64"
        height="64"
        className="mt-lg mb-sm block max-w-full object-contain md:hidden"
      />

      <h1 className="text-secondary-900 px-sm sm:px-md md:px-lg md:py-xl pb-lg font-serif text-2xl font-bold sm:text-3xl">
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

      {/* SVG for desktop - full height */}
      <div className="hidden h-full lg:block">{svgComponent}</div>
    </div>
  );
};
