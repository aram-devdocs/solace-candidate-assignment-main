/**
 * Client-side filtering utilities for advocates
 * Used when data is already cached to provide instant filtering without API calls
 */

import type { AdvocateWithRelations } from "@repo/types";
import { extractAreaCode } from "./area-code";

/**
 * Filters advocates by search term (case-insensitive, searches first and last name)
 */
export function filterBySearch(
  advocates: AdvocateWithRelations[],
  searchTerm: string
): AdvocateWithRelations[] {
  if (!searchTerm.trim()) return advocates;

  const normalizedSearch = searchTerm.toLowerCase().trim();
  return advocates.filter((advocate) => {
    const firstName = advocate.firstName.toLowerCase();
    const lastName = advocate.lastName.toLowerCase();
    return firstName.includes(normalizedSearch) || lastName.includes(normalizedSearch);
  });
}

/**
 * Filters advocates by selected city IDs
 */
export function filterByCities(
  advocates: AdvocateWithRelations[],
  cityIds: number[]
): AdvocateWithRelations[] {
  if (cityIds.length === 0) return advocates;
  return advocates.filter((advocate) => cityIds.includes(advocate.cityId));
}

/**
 * Filters advocates by selected degree IDs
 */
export function filterByDegrees(
  advocates: AdvocateWithRelations[],
  degreeIds: number[]
): AdvocateWithRelations[] {
  if (degreeIds.length === 0) return advocates;
  return advocates.filter((advocate) => degreeIds.includes(advocate.degreeId));
}

/**
 * Filters advocates by selected specialty IDs
 */
export function filterBySpecialties(
  advocates: AdvocateWithRelations[],
  specialtyIds: number[]
): AdvocateWithRelations[] {
  if (specialtyIds.length === 0) return advocates;
  return advocates.filter((advocate) =>
    advocate.advocateSpecialties.some((as) => specialtyIds.includes(as.specialty.id))
  );
}

/**
 * Filters advocates by area codes
 */
export function filterByAreaCodes(
  advocates: AdvocateWithRelations[],
  areaCodes: string[]
): AdvocateWithRelations[] {
  if (areaCodes.length === 0) return advocates;
  return advocates.filter((advocate) => {
    const areaCode = extractAreaCode(advocate.phoneNumber);
    return areaCodes.includes(areaCode);
  });
}

/**
 * Filters advocates by years of experience range
 */
export function filterByExperience(
  advocates: AdvocateWithRelations[],
  minExperience?: number,
  maxExperience?: number
): AdvocateWithRelations[] {
  return advocates.filter((advocate) => {
    const meetsMin = minExperience === undefined || advocate.yearsOfExperience >= minExperience;
    const meetsMax = maxExperience === undefined || advocate.yearsOfExperience <= maxExperience;
    return meetsMin && meetsMax;
  });
}

/**
 * Applies all filters to a list of advocates
 */
export function applyAllFilters(
  advocates: AdvocateWithRelations[],
  filters: {
    searchTerm?: string;
    cityIds?: number[];
    degreeIds?: number[];
    specialtyIds?: number[];
    areaCodes?: string[];
    minExperience?: number;
    maxExperience?: number;
  }
): AdvocateWithRelations[] {
  let filtered = advocates;

  if (filters.searchTerm) {
    filtered = filterBySearch(filtered, filters.searchTerm);
  }

  if (filters.cityIds && filters.cityIds.length > 0) {
    filtered = filterByCities(filtered, filters.cityIds);
  }

  if (filters.degreeIds && filters.degreeIds.length > 0) {
    filtered = filterByDegrees(filtered, filters.degreeIds);
  }

  if (filters.specialtyIds && filters.specialtyIds.length > 0) {
    filtered = filterBySpecialties(filtered, filters.specialtyIds);
  }

  if (filters.areaCodes && filters.areaCodes.length > 0) {
    filtered = filterByAreaCodes(filtered, filters.areaCodes);
  }

  if (filters.minExperience !== undefined || filters.maxExperience !== undefined) {
    filtered = filterByExperience(filtered, filters.minExperience, filters.maxExperience);
  }

  return filtered;
}
