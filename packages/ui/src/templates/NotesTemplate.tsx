import React from "react";
import { NotesEmptyState } from "../molecules/NotesEmptyState";
import { DecorativeWavesSvg } from "../atoms/DecorativeWavesSvg";

export interface NotesTemplateProps {
  className?: string;
}

/**
 * Notes template - simple page layout for notes
 *
 * Displays notes title with empty state and decorative background
 * Desktop: Shows decorative SVG in top-right corner
 * Mobile: Hides decorative SVG
 *
 * @param className - Optional additional CSS classes
 *
 * @example
 * ```tsx
 * import { NotesTemplate } from "@repo/ui";
 *
 * <NotesTemplate />
 * ```
 */
export const NotesTemplate: React.FC<NotesTemplateProps> = ({ className = "" }) => {
  return (
    <main
      className={`dark:bg-secondary-900 absolute inset-0 overflow-hidden bg-white ${className}`}
    >
      {/* Decorative SVG - Desktop only */}
      <div className="pointer-events-none absolute right-0 top-0 hidden md:block">
        <DecorativeWavesSvg />
      </div>

      {/* Content */}
      <div className="p-md md:p-lg lg:p-xl relative z-10">
        <h1 className="dark:text-secondary-100 font-serif text-4xl font-light text-neutral-900">
          Notes
        </h1>
        <div className="mt-lg md:mt-xl">
          <NotesEmptyState />
        </div>
      </div>
    </main>
  );
};
