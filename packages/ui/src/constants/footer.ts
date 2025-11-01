/**
 * Footer constants for copyright text
 */

/**
 * Company name used in footer copyright text
 */
export const COMPANY_NAME = "Solace Health";

/**
 * Current year (calculated once at module load)
 */
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Footer copyright text with current year and company name
 * Format: "© YYYY Company Name"
 * @example
 * ```tsx
 * <Footer copyright={FOOTER_COPYRIGHT} />
 * // Renders: © 2025 Solace Health
 * ```
 */
export const FOOTER_COPYRIGHT = `© ${CURRENT_YEAR} ${COMPANY_NAME}`;

/**
 * Footer copyright text with "All rights reserved" suffix
 * @example
 * ```tsx
 * <Footer copyright={FOOTER_COPYRIGHT_WITH_RIGHTS} />
 * // Renders: © 2025 Solace Health. All rights reserved.
 * ```
 */
export const FOOTER_COPYRIGHT_WITH_RIGHTS = `${FOOTER_COPYRIGHT}. All rights reserved.`;
