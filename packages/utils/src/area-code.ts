/**
 * Area code extraction utilities
 */

import type { Advocate } from "@repo/types";

/**
 * Extracts the area code (first 3 digits) from a phone number
 *
 * @param phoneNumber - The 10-digit phone number as a number
 * @returns The 3-digit area code as a string
 *
 * @example
 * ```ts
 * extractAreaCode(5551234567) // "555"
 * extractAreaCode(2025551234) // "202"
 * ```
 */
export function extractAreaCode(phoneNumber: number): string {
  const areaCode = Math.floor(phoneNumber / 10000000);
  return areaCode.toString().padStart(3, "0");
}

/**
 * Gets unique area codes from an array of advocates
 *
 * @param advocates - Array of advocate data
 * @returns Sorted array of unique area codes
 *
 * @example
 * ```ts
 * const advocates = [
 *   { phoneNumber: 5551234567, ... },
 *   { phoneNumber: 2025551234, ... },
 *   { phoneNumber: 5559876543, ... }
 * ];
 * getUniqueAreaCodes(advocates) // ["202", "555"]
 * ```
 */
export function getUniqueAreaCodes(advocates: Advocate[]): string[] {
  const areaCodes = new Set(advocates.map((advocate) => extractAreaCode(advocate.phoneNumber)));
  return Array.from(areaCodes).sort();
}
