import React from "react";
import { PenIllustration } from "../atoms/PenIllustration";

export interface HealthInsuranceEmptyStateProps {
  className?: string;
  onContactSupport?: () => void;
}

/**
 * Empty state component for health insurance page
 *
 * Displays pen illustration and contact support message
 *
 * @param className - Optional additional CSS classes
 * @param onContactSupport - Callback when contact support link is clicked
 */
export const HealthInsuranceEmptyState: React.FC<HealthInsuranceEmptyStateProps> = ({
  className = "",
  onContactSupport,
}) => {
  return (
    <div className={`px-md py-lg flex flex-col items-start ${className}`}>
      <p className="mb-xl dark:text-secondary-100 text-lg text-neutral-900">
        Please{" "}
        <button
          onClick={onContactSupport}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          contact Solace Support
        </button>{" "}
        to modify your health insurance on file.
      </p>
      <PenIllustration width={350} height={210} />
    </div>
  );
};
