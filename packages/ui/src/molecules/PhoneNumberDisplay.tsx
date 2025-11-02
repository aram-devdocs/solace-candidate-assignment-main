import React from "react";

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
}: PhoneNumberDisplayProps) {
  const handleAreaCodeClick = (e: React.MouseEvent) => {
    if (clickable && onAreaCodeClick) {
      e.stopPropagation();
      onAreaCodeClick(areaCode);
    }
  };

  const areaCodeWithParens = `(${areaCode})`;
  const restOfNumber = phoneNumber.substring(areaCodeWithParens.length).trim();

  return (
    <div className="bg-secondary-50 text-secondary-900 border-secondary-200 px-sm py-xs inline-flex items-center whitespace-nowrap rounded-full border text-sm">
      {clickable && onAreaCodeClick ? (
        <button
          type="button"
          onClick={handleAreaCodeClick}
          className="text-primary-700 hover:text-primary-900 hover:bg-primary-50 decoration-primary-400 focus:ring-primary-500 px-xs -mx-xs cursor-pointer rounded font-semibold underline decoration-dotted underline-offset-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
          aria-label={`Filter by area code ${areaCode}`}
        >
          {areaCodeWithParens}
        </button>
      ) : (
        <span className="font-semibold">{areaCodeWithParens}</span>
      )}
      <span className="ml-xs">{restOfNumber}</span>
    </div>
  );
}
