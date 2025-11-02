/**
 * Area code extraction utilities for phone number display and filtering
 */

/**
 * Extracts the area code (first 3 digits) from a phone number string
 *
 * @param phoneNumber - The phone number as a string (e.g., "5551234567")
 * @returns The 3-digit area code as a string
 *
 * @example
 * ```ts
 * extractAreaCode("5551234567") // "555"
 * extractAreaCode("2025551234") // "202"
 * ```
 */
export function extractAreaCode(phoneNumber: string): string {
  return phoneNumber.substring(0, 3);
}
