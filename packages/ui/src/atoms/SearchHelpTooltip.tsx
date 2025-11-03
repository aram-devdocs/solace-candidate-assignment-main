"use client";

import React, { useState } from "react";

export interface SearchHelpTooltipProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SearchHelpTooltip component for explaining search syntax
 * Displays help icon with expandable tooltip explaining multi-term search and quoted phrases
 *
 * @example
 * ```tsx
 * <SearchHelpTooltip />
 * ```
 */
export const SearchHelpTooltip: React.FC<SearchHelpTooltipProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="focus:ring-primary-500 inline-flex h-5 w-5 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-1"
        aria-label="Search help"
        aria-expanded={isOpen}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg"
          role="tooltip"
        >
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <svg
                className="text-primary-600 mt-0.5 h-4 w-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-neutral-900">Search Tips</p>
              </div>
            </div>

            <div className="space-y-1.5 text-neutral-700">
              <div>
                <p className="font-medium">Multiple terms:</p>
                <p className="text-neutral-600">
                  <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">denver vegan</code>{" "}
                  finds advocates matching both terms
                </p>
              </div>

              <div>
                <p className="font-medium">Exact phrases:</p>
                <p className="text-neutral-600">
                  <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
                    &quot;sports nutrition&quot;
                  </code>{" "}
                  finds the exact specialty
                </p>
              </div>

              <div>
                <p className="font-medium">Combined search:</p>
                <p className="text-neutral-600">
                  <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
                    denver &quot;sports nutrition&quot;
                  </code>{" "}
                  works too!
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-1">
                <p className="font-medium">Quick tip:</p>
                <p className="text-neutral-600">
                  Click any highlighted badge to filter by it instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
