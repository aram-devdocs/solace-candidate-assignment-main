import React from "react";
import { FormsEmptyState } from "../molecules/FormsEmptyState";

export interface FormsTemplateProps {
  className?: string;
}

/**
 * Forms template - simple page layout for forms
 *
 * Displays forms title with empty state
 *
 * @param className - Optional additional CSS classes
 *
 * @example
 * ```tsx
 * import { FormsTemplate } from "@repo/ui";
 *
 * <FormsTemplate />
 * ```
 */
export const FormsTemplate: React.FC<FormsTemplateProps> = ({ className = "" }) => {
  return (
    <main className={`absolute inset-0 overflow-hidden bg-white ${className}`}>
      <div className="p-md md:p-lg lg:p-xl">
        <h1 className="font-serif text-4xl font-light text-neutral-900">Forms</h1>
        <div className="mt-lg md:mt-xl">
          <FormsEmptyState />
        </div>
      </div>
    </main>
  );
};
