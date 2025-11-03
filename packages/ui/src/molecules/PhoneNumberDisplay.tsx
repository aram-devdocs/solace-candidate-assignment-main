import React from "react";
import { getHighlightedSegments } from "@repo/utils";

export interface PhoneNumberDisplayProps {
  /**
   * The formatted phone number to display (e.g., "(555) 789-0123")
   */
  phoneNumber: string;
  /**
   * The area code portion (e.g., "555")
   */
  areaCode: string;
  /**
   * Optional click handler for area code filtering
   */
  onAreaCodeClick?: (areaCode: string) => void;
  /**
   * Whether the area code is clickable
   */
  clickable?: boolean;
  /**
   * Whether this area code is currently an active filter
   */
  isActiveAreaCode?: boolean;
  /**
   * Search tokens to highlight in the area code
   */
  searchTokens?: string[];
}

/**
 * Displays a phone number in a cohesive pill-shaped container with an
 * optionally clickable area code portion for filtering.
 *
 * @example
 * ```tsx
 * <PhoneNumberDisplay
 *   phoneNumber="(555) 789-0123"
 *   areaCode="555"
 *   onAreaCodeClick={(code) => console.log('Filter by:', code)}
 *   clickable={true}
 * />
 * ```
 */
export function PhoneNumberDisplay({
  phoneNumber,
  areaCode,
  onAreaCodeClick,
  clickable = false,
  isActiveAreaCode = false,
  searchTokens,
}: PhoneNumberDisplayProps) {
  const handleAreaCodeClick = (e: React.MouseEvent) => {
    if (clickable && onAreaCodeClick) {
      e.stopPropagation();
      onAreaCodeClick(areaCode);
    }
  };

  const areaCodeWithParens = `(${areaCode})`;
  const restOfNumber = phoneNumber.substring(areaCodeWithParens.length).trim();
  const segments = getHighlightedSegments(areaCode, searchTokens);

  const areaCodeClasses = isActiveAreaCode
    ? "text-white bg-primary-600 hover:bg-primary-700 decoration-white"
    : "text-primary-700 hover:text-primary-900 hover:bg-primary-50 decoration-primary-400";

  const renderAreaCode = () => (
    <>
      (
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <mark key={index} className="bg-highlight/80 text-primary-900 rounded px-0.5">
            {segment.text}
          </mark>
        ) : (
          <React.Fragment key={index}>{segment.text}</React.Fragment>
        )
      )}
      )
    </>
  );

  return (
    <div className="bg-secondary-50 text-secondary-900 border-secondary-200 px-sm py-xs inline-flex items-center whitespace-nowrap rounded-full border text-sm">
      {clickable && onAreaCodeClick ? (
        <button
          type="button"
          onClick={handleAreaCodeClick}
          className={`${areaCodeClasses} focus:ring-primary-500 px-xs -mx-xs active:ring-primary-400 cursor-pointer rounded font-semibold underline decoration-dotted underline-offset-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-95 active:ring-2`}
          aria-label={`Filter by area code ${areaCode}`}
          aria-pressed={isActiveAreaCode}
        >
          {renderAreaCode()}
        </button>
      ) : (
        <span className="font-semibold">{renderAreaCode()}</span>
      )}
      <span className="ml-xs">{restOfNumber}</span>
    </div>
  );
}
