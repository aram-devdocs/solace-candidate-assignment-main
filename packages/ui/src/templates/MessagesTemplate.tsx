import React from "react";
import { MessageThreadListEmptyState } from "../molecules/MessageThreadListEmptyState";
import { MessagePanelEmptyState } from "../molecules/MessagePanelEmptyState";

export interface MessagesTemplateProps {
  className?: string;
}

/**
 * Messages template - split view layout for messaging interface
 *
 * Desktop: Shows thread list on left and message panel on right
 * Mobile: Shows only thread list (single column)
 *
 * @param className - Optional additional CSS classes
 *
 * @example
 * ```tsx
 * import { MessagesTemplate } from "@repo/ui";
 *
 * <MessagesTemplate />
 * ```
 */
export const MessagesTemplate: React.FC<MessagesTemplateProps> = ({ className = "" }) => {
  return (
    <main className={`absolute inset-0 flex flex-col ${className}`}>
      <div className="flex flex-1 overflow-hidden">
        {/* Thread List Panel */}
        <div className="dark:border-secondary-700 dark:bg-secondary-900 flex w-full flex-col border-r border-neutral-200 bg-white md:w-80 lg:w-96">
          <div className="px-md py-md dark:border-secondary-700 border-b border-neutral-200">
            <h1 className="dark:text-secondary-100 font-serif text-2xl font-light text-neutral-900">
              Your Inbox
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MessageThreadListEmptyState />
          </div>
        </div>

        {/* Message Panel - Hidden on mobile */}
        <div className="dark:bg-secondary-900 hidden flex-1 flex-col bg-white md:flex">
          <MessagePanelEmptyState className="flex-1" />
        </div>
      </div>
    </main>
  );
};
