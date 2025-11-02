import type { Advocate } from "@repo/types";
import { useAdvocates, type UseAdvocatesOptions } from "./use-advocates";

/**
 * Filter options derived from advocate data.
 */
export interface AdvocateFilterOptions {
  degrees: string[];
  cities: string[];
  specialties: string[];
  areaCodes: string[];
}

/**
 * Extract unique degrees from advocates list.
 */
function getUniqueDegrees(advocates: Advocate[]): string[] {
  return Array.from(new Set(advocates.map((a) => a.degree))).sort();
}

/**
 * Extract unique cities from advocates list.
 */
function getUniqueCities(advocates: Advocate[]): string[] {
  return Array.from(new Set(advocates.map((a) => a.city))).sort();
}

/**
 * Extract unique specialties from advocates list.
 */
function getUniqueSpecialties(advocates: Advocate[]): string[] {
  const allSpecialties = advocates.flatMap((a) => a.specialties);
  return Array.from(new Set(allSpecialties)).sort();
}

/**
 * Extract unique area codes from advocates list.
 */
function getUniqueAreaCodes(advocates: Advocate[]): string[] {
  const areaCodes = advocates.map((a) => {
    const phoneStr = a.phoneNumber.toString();
    return phoneStr.slice(0, 3);
  });
  return Array.from(new Set(areaCodes)).sort();
}

/**
 * React Query hook for fetching advocate filter options.
 *
 * This hook uses a select transform to extract only filter options from the advocates data,
 * providing significant performance benefits:
 * - Separate caching with longer stale time (filter options change rarely)
 * - Computed only when advocate data changes (not on every render)
 * - Structural sharing prevents unnecessary re-renders
 * - Reduces memory footprint by caching only the derived data needed
 *
 * Perfect for large datasets where filter options should be computed once and cached.
 *
 * @param options - Optional React Query configuration
 * @returns Query result with filter options, loading state, and error handling
 *
 * @example
 * function FilterPanel() {
 *   const { data: options, isLoading } = useAdvocateFilterOptions();
 *
 *   if (isLoading) return <div>Loading filters...</div>;
 *   if (!options) return null;
 *
 *   return (
 *     <div>
 *       <Select options={options.degrees} label="Degree" />
 *       <Select options={options.cities} label="City" />
 *       <Select options={options.specialties} label="Specialty" />
 *       <Select options={options.areaCodes} label="Area Code" />
 *     </div>
 *   );
 * }
 */
export function useAdvocateFilterOptions(
  options?: Omit<UseAdvocatesOptions<AdvocateFilterOptions>, "select">
) {
  return useAdvocates({
    select: (response) => {
      if (!response.success) {
        return {
          degrees: [],
          cities: [],
          specialties: [],
          areaCodes: [],
        };
      }

      return {
        degrees: getUniqueDegrees(response.data),
        cities: getUniqueCities(response.data),
        specialties: getUniqueSpecialties(response.data),
        areaCodes: getUniqueAreaCodes(response.data),
      };
    },
    staleTime: 1000 * 60 * 60,
    ...options,
  });
}
