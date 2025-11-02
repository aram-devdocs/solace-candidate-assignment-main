import { useCallback, useMemo } from "react";
import type { Advocate } from "@repo/types";
import { useUrlState, useUrlArrayState, useUrlNumberState } from "./use-url-state";
import {
  getUniqueCities,
  getUniqueDegrees,
  getUniqueSpecialties,
  getUniqueAreaCodes,
} from "@repo/utils";
import type { AdvocateFilterCriteria } from "@repo/utils";

/**
 * Hook for managing advocate filter state with URL persistence
 *
 * Manages filter state for:
 * - Search term
 * - Degrees (MD, PhD, MSW)
 * - Cities
 * - Specialties
 * - Years of experience range (min/max)
 * - Area codes
 *
 * All filter state is persisted in URL query parameters for shareable/bookmarkable views
 *
 * @param allAdvocates - Full array of advocates for generating filter options
 * @returns Filter state, setters, options, and utility functions
 *
 * @example
 * const {
 *   filterCriteria,
 *   setSearchTerm,
 *   setSelectedDegrees,
 *   clearAllFilters,
 *   hasActiveFilters
 * } = useAdvocateFilters(advocates);
 */
export function useAdvocateFilters(allAdvocates: Advocate[]) {
  const [searchTerm, setSearchTerm] = useUrlState("search", "");
  const [selectedDegrees, setSelectedDegrees] = useUrlArrayState("degrees", []);
  const [selectedCities, setSelectedCities] = useUrlArrayState("cities", []);
  const [selectedSpecialties, setSelectedSpecialties] = useUrlArrayState("specialties", []);
  const [selectedAreaCodes, setSelectedAreaCodes] = useUrlArrayState("areaCodes", []);
  const [minExperience, setMinExperience] = useUrlNumberState("minExp", 0);
  const [maxExperience, setMaxExperience] = useUrlNumberState("maxExp", 0);

  const filterCriteria: AdvocateFilterCriteria = useMemo(
    () => ({
      searchTerm: searchTerm || undefined,
      degrees: selectedDegrees.length > 0 ? selectedDegrees : undefined,
      cities: selectedCities.length > 0 ? selectedCities : undefined,
      specialties: selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
      areaCodes: selectedAreaCodes.length > 0 ? selectedAreaCodes : undefined,
      minExperience: minExperience > 0 ? minExperience : undefined,
      maxExperience: maxExperience > 0 ? maxExperience : undefined,
    }),
    [
      searchTerm,
      selectedDegrees,
      selectedCities,
      selectedSpecialties,
      selectedAreaCodes,
      minExperience,
      maxExperience,
    ]
  );

  const availableDegrees = useMemo(() => getUniqueDegrees(allAdvocates), [allAdvocates]);

  const availableCities = useMemo(() => getUniqueCities(allAdvocates), [allAdvocates]);

  const availableSpecialties = useMemo(() => getUniqueSpecialties(allAdvocates), [allAdvocates]);

  const availableAreaCodes = useMemo(() => getUniqueAreaCodes(allAdvocates), [allAdvocates]);

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      selectedDegrees.length > 0 ||
      selectedCities.length > 0 ||
      selectedSpecialties.length > 0 ||
      selectedAreaCodes.length > 0 ||
      minExperience > 0 ||
      maxExperience > 0
    );
  }, [
    searchTerm,
    selectedDegrees,
    selectedCities,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
  ]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedDegrees([]);
    setSelectedCities([]);
    setSelectedSpecialties([]);
    setSelectedAreaCodes([]);
    setMinExperience(0);
    setMaxExperience(0);
  }, [
    setSearchTerm,
    setSelectedDegrees,
    setSelectedCities,
    setSelectedSpecialties,
    setSelectedAreaCodes,
    setMinExperience,
    setMaxExperience,
  ]);

  const removeFilter = useCallback(
    (type: "degree" | "city" | "specialty" | "experience" | "areaCode", value?: string) => {
      switch (type) {
        case "degree":
          if (value) {
            setSelectedDegrees(selectedDegrees.filter((d) => d !== value));
          }
          break;
        case "city":
          if (value) {
            setSelectedCities(selectedCities.filter((c) => c !== value));
          }
          break;
        case "specialty":
          if (value) {
            setSelectedSpecialties(selectedSpecialties.filter((s) => s !== value));
          }
          break;
        case "areaCode":
          if (value) {
            setSelectedAreaCodes(selectedAreaCodes.filter((a) => a !== value));
          }
          break;
        case "experience":
          setMinExperience(0);
          setMaxExperience(0);
          break;
      }
    },
    [
      selectedDegrees,
      selectedCities,
      selectedSpecialties,
      selectedAreaCodes,
      setSelectedDegrees,
      setSelectedCities,
      setSelectedSpecialties,
      setSelectedAreaCodes,
      setMinExperience,
      setMaxExperience,
    ]
  );

  const addSpecialtyFilter = useCallback(
    (specialty: string) => {
      if (!selectedSpecialties.includes(specialty)) {
        setSelectedSpecialties([...selectedSpecialties, specialty]);
      }
    },
    [selectedSpecialties, setSelectedSpecialties]
  );

  const addCityFilter = useCallback(
    (city: string) => {
      if (!selectedCities.includes(city)) {
        setSelectedCities([...selectedCities, city]);
      }
    },
    [selectedCities, setSelectedCities]
  );

  const addDegreeFilter = useCallback(
    (degree: string) => {
      if (!selectedDegrees.includes(degree)) {
        setSelectedDegrees([...selectedDegrees, degree]);
      }
    },
    [selectedDegrees, setSelectedDegrees]
  );

  const addAreaCodeFilter = useCallback(
    (areaCode: string) => {
      if (!selectedAreaCodes.includes(areaCode)) {
        setSelectedAreaCodes([...selectedAreaCodes, areaCode]);
      }
    },
    [selectedAreaCodes, setSelectedAreaCodes]
  );

  return {
    filterCriteria,
    searchTerm,
    setSearchTerm,
    selectedDegrees,
    setSelectedDegrees,
    selectedCities,
    setSelectedCities,
    selectedSpecialties,
    setSelectedSpecialties,
    selectedAreaCodes,
    setSelectedAreaCodes,
    minExperience,
    setMinExperience,
    maxExperience,
    setMaxExperience,
    availableDegrees,
    availableCities,
    availableSpecialties,
    availableAreaCodes,
    hasActiveFilters,
    clearAllFilters,
    removeFilter,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
    addAreaCodeFilter,
  };
}
