"use client";

import { HealthInsuranceTemplate } from "@repo/ui";
import { useToast } from "@repo/hooks";

/**
 * Health Insurance page - health insurance management interface
 *
 * Displays health insurance information and contact support option
 */
export default function HealthInsurancePage() {
  const { showToast } = useToast();

  const handleContactSupport = () => {
    showToast({
      variant: "info",
      message: "Demo UI Only",
      description: "This feature is not functional in the demo",
    });
  };

  return <HealthInsuranceTemplate onContactSupport={handleContactSupport} />;
}
