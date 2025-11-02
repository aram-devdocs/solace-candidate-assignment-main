import React from "react";
import { PenIllustration } from "../atoms/PenIllustration";

export interface NotesEmptyStateProps {
  className?: string;
}

/**
 * Empty state component for notes page
 *
 * Displays pen illustration and message when no notes exist
 *
 * @param className - Optional additional CSS classes
 */
export const NotesEmptyState: React.FC<NotesEmptyStateProps> = ({ className = "" }) => {
  return (
    <div className={`px-md py-lg flex flex-col items-start ${className}`}>
      <p className="mb-xl text-lg text-neutral-900">
        Your Care Champion doesn&apos;t have any notes for you just yet.
      </p>
      <PenIllustration width={350} height={210} />
    </div>
  );
};
