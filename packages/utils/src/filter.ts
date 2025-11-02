import type { Advocate } from "@repo/types";

/**
 * Criteria for filtering advocates
 */
export interface AdvocateFilterCriteria {
  /**
   * Search term to filter across all text fields
   */
  searchTerm?: string;
  /**
   * Filter by degree (MD, PhD, MSW)
   */
  degrees?: string[];
  /**
   * Filter by city
   */
  cities?: string[];
  /**
   * Filter by specialties (any match)
   */
  specialties?: string[];
  /**
   * Minimum years of experience (inclusive)
   */
  minExperience?: number;
  /**
   * Maximum years of experience (inclusive)
   */
  maxExperience?: number;
}

/**
 * Filters advocates based on search term across multiple fields.
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
 * const results = filterAdvocatesBySearch(advocates, "john");
 * // Returns advocates with "John" in firstName, regardless of case
 */
export function filterAdvocatesBySearch(advocates: Advocate[], searchTerm: string): Advocate[] {
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

/**
 * Filters advocates based on comprehensive criteria including search, degrees, cities,
 * specialties, and years of experience range.
 *
 * @param advocates - Array of advocates to filter
 * @param criteria - Filter criteria object
 * @returns Filtered array of advocates matching all criteria
 *
 * @example
 * const results = filterAdvocates(advocates, {
 *   searchTerm: "john",
 *   degrees: ["MD", "PhD"],
 *   specialties: ["PTSD", "Anxiety/Depression"],
 *   minExperience: 5,
 *   maxExperience: 15
 * });
 */
export function filterAdvocates(
  advocates: Advocate[],
  criteria: AdvocateFilterCriteria
): Advocate[] {
  let filtered = advocates;

  if (criteria.searchTerm && criteria.searchTerm.trim() !== "") {
    filtered = filterAdvocatesBySearch(filtered, criteria.searchTerm);
  }

  if (criteria.degrees && criteria.degrees.length > 0) {
    filtered = filtered.filter((advocate) => criteria.degrees!.includes(advocate.degree));
  }

  if (criteria.cities && criteria.cities.length > 0) {
    filtered = filtered.filter((advocate) => criteria.cities!.includes(advocate.city));
  }

  if (criteria.specialties && criteria.specialties.length > 0) {
    filtered = filtered.filter((advocate) =>
      advocate.specialties.some((specialty: string) => criteria.specialties!.includes(specialty))
    );
  }

  if (criteria.minExperience !== undefined) {
    filtered = filtered.filter((advocate) => advocate.yearsOfExperience >= criteria.minExperience!);
  }

  if (criteria.maxExperience !== undefined) {
    filtered = filtered.filter((advocate) => advocate.yearsOfExperience <= criteria.maxExperience!);
  }

  return filtered;
}

/**
 * Get unique cities from advocates array for filter options
 *
 * @param advocates - Array of advocates
 * @returns Sorted array of unique city names
 */
export function getUniqueCities(advocates: Advocate[]): string[] {
  const cities = new Set(advocates.map((a) => a.city));
  return Array.from(cities).sort();
}

/**
 * Get unique degrees from advocates array for filter options
 *
 * @param advocates - Array of advocates
 * @returns Sorted array of unique degree types
 */
export function getUniqueDegrees(advocates: Advocate[]): string[] {
  const degrees = new Set(advocates.map((a) => a.degree));
  return Array.from(degrees).sort();
}

/**
 * Get unique specialties from advocates array for filter options
 *
 * @param advocates - Array of advocates
 * @returns Sorted array of unique specialty names
 */
export function getUniqueSpecialties(advocates: Advocate[]): string[] {
  const specialties = new Set<string>();
  advocates.forEach((advocate) => {
    advocate.specialties.forEach((specialty: string) => {
      specialties.add(specialty);
    });
  });
  return Array.from(specialties).sort();
}
