/**
 * Formatting utilities for data display
 */

/**
 * Formats a phone number into US standard display format
 *
 * @param phoneNumber - The phone number as a string (e.g., "1234567890")
 * @returns Formatted phone number string (e.g., "(123) 456-7890")
 *
 * @example
 * ```ts
 * formatPhoneNumber("1234567890") // "(123) 456-7890"
 * formatPhoneNumber("5551234567") // "(555) 123-4567"
 * ```
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const phoneStr = phoneNumber;

  // Handle invalid phone number lengths
  if (phoneStr.length !== 10) {
    return phoneStr; // Return as-is if not a valid 10-digit US number
  }

  const areaCode = phoneStr.slice(0, 3);
  const prefix = phoneStr.slice(3, 6);
  const lineNumber = phoneStr.slice(6, 10);

  return `(${areaCode}) ${prefix}-${lineNumber}`;
}
