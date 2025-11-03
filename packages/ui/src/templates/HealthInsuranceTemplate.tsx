import React from "react";
import { HealthInsuranceEmptyState } from "../molecules/HealthInsuranceEmptyState";

export interface HealthInsuranceTemplateProps {
  className?: string;
  onContactSupport?: () => void;
}

/**
 * Health Insurance template - simple page layout for health insurance
 *
 * Displays health insurance title with contact support message
 *
 * @param className - Optional additional CSS classes
 * @param onContactSupport - Callback when contact support link is clicked
 *
 * @example
 * ```tsx
 * import { HealthInsuranceTemplate } from "@repo/ui";
 *
 * <HealthInsuranceTemplate onContactSupport={() => console.log('Contact support')} />
 * ```
 */
export const HealthInsuranceTemplate: React.FC<HealthInsuranceTemplateProps> = ({
  className = "",
  onContactSupport,
}) => {
  return (
    <main
      className={`dark:bg-secondary-900 absolute inset-0 overflow-hidden bg-white ${className}`}
    >
      <div className="p-md md:p-lg lg:p-xl">
        <h1 className="dark:text-secondary-100 font-serif text-4xl font-light text-neutral-900">
          Health Insurance
        </h1>
        <div className="mt-lg md:mt-xl">
          <HealthInsuranceEmptyState onContactSupport={onContactSupport} />
        </div>
      </div>
    </main>
  );
};
