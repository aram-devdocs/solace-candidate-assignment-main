"use client";

import { HelpTemplate } from "@repo/ui";
import { useToast } from "@repo/hooks";

/**
 * Help page - help center interface
 *
 * Displays help resources and contact support options
 */
export default function HelpPage() {
  const { showToast } = useToast();

  const handleShowDemoToast = () => {
    showToast({
      variant: "info",
      message: "Demo UI Only",
      description: "This feature is not functional in the demo",
    });
  };

  return (
    <HelpTemplate
      onHelpCenterClick={handleShowDemoToast}
      onFaqClick={handleShowDemoToast}
      onContactSupportClick={handleShowDemoToast}
    />
  );
}
