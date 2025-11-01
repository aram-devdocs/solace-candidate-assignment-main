import React from "react";

/**
 * Props for the SkeletonGreeting component
 */
export interface SkeletonGreetingProps {
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * SkeletonGreeting component that displays a loading placeholder for the Greeting component.
 * Matches the responsive layout of Greeting with skeleton elements for both mobile and desktop views.
 *
 * Responsive behavior:
 * - Mobile: Icon above text (centered)
 * - Tablet: Icon on right side
 * - Desktop: Full SVG illustration on right side
 *
 * @example
 * ```tsx
 * <SkeletonGreeting />
 * ```
 */
export const SkeletonGreeting: React.FC<SkeletonGreetingProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-greeting-background border-secondary-200 flex min-h-[180px] flex-col items-center justify-between overflow-hidden rounded-lg border shadow-md md:min-h-[150px] md:flex-row ${className}`}
    >
      {/* Skeleton icon for mobile - centered above text */}
      <div className="mt-xl bg-secondary-200 block h-16 w-16 shrink-0 animate-pulse rounded-full md:hidden" />

      {/* Skeleton text - matches text-3xl line height (h-9) with p-xl padding */}
      <div className="p-xl">
        <div className="bg-secondary-200 h-9 w-64 animate-pulse rounded-md" />
      </div>

      {/* Skeleton icon for tablet - right side */}
      <div className="mr-xl bg-secondary-200 hidden h-[150px] w-[150px] shrink-0 animate-pulse rounded-lg md:block lg:hidden" />

      {/* Skeleton illustration for desktop - full height, matches SVG aspect ratio */}
      <div className="bg-secondary-200 hidden h-full min-h-[150px] w-auto shrink-0 animate-pulse lg:block lg:w-[341px]" />
    </div>
  );
};
