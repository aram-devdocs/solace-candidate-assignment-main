import React from "react";
import { BellIllustration } from "../atoms/BellIllustration";

export interface MessagePanelEmptyStateProps {
  className?: string;
}

/**
 * Empty state component for message panel
 *
 * Displays bell illustration and call-to-action text when no conversation is selected
 *
 * @param className - Optional additional CSS classes
 */
export const MessagePanelEmptyState: React.FC<MessagePanelEmptyStateProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`px-lg py-3xl flex flex-col items-center justify-center text-center ${className}`}
    >
      <BellIllustration width={200} height={200} className="mb-lg" />
      <h2 className="font-serif text-2xl font-light text-neutral-900">
        Start a conversation below!
      </h2>
    </div>
  );
};
