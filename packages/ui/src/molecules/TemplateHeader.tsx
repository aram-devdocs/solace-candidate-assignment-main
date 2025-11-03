import React from "react";

/**
 * Props for the TemplateHeader component
 */
export interface TemplateHeaderProps {
  /**
   * The title text to display
   */
  title: string;
  /**
   * Optional subtitle or description text
   */
  subtitle?: string;
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * TemplateHeader component displays a page title with optional subtitle.
 * Used at the top of templates to identify the page content.
 *
 * @example
 * ```tsx
 * <TemplateHeader title="Advocate Directory" />
 * <TemplateHeader
 *   title="Advocate Directory"
 *   subtitle="Browse and filter health advocates"
 * />
 * ```
 */
export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <header className={`gap-xs flex flex-col ${className}`}>
      <h1 className="text-secondary-900 dark:text-secondary-100 font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-secondary-600 dark:text-secondary-300 text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </header>
  );
};
