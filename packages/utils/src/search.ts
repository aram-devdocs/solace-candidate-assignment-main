import type { Advocate } from "@repo/types";

/**
 * Filters advocates based on a search term across multiple fields.
 *
 * Performs case-insensitive search across:
 * - First Name
 * - Last Name
 * - City
 * - Degree
 * - Specialties (array)
 * - Phone Number
 *
 * @param advocates - Array of advocates to filter
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of advocates matching the search term
 *
 * @example
 * const results = filterAdvocates(advocates, "john");
 * // Returns advocates with "John" in firstName, regardless of case
 *
 * @example
 * const results = filterAdvocates(advocates, "555");
 * // Returns advocates with "555" in their phone number
 */
export function filterAdvocates(advocates: Advocate[], searchTerm: string): Advocate[] {
  if (!searchTerm || searchTerm.trim() === "") {
    return advocates;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return advocates.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(normalizedSearchTerm) ||
      advocate.lastName.toLowerCase().includes(normalizedSearchTerm) ||
      advocate.city.toLowerCase().includes(normalizedSearchTerm) ||
      advocate.degree.toLowerCase().includes(normalizedSearchTerm) ||
      advocate.specialties.some((specialty: string) =>
        specialty.toLowerCase().includes(normalizedSearchTerm)
      ) ||
      advocate.phoneNumber.toString().includes(normalizedSearchTerm)
    );
  });
}
