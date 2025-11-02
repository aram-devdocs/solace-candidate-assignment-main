import { useState, useMemo, useEffect, useRef } from "react";
import type { AdvocateSortConfig, AdvocateWithRelations, AdvocateFilters } from "@repo/types";
import { useAdvocates, useAdvocateFilterOptions } from "@repo/queries";
import {
  useUrlNumberState,
  useUrlState,
  useUrlArrayState,
  useUrlNumberArrayState,
} from "./use-url-state";
import { useDebouncedValue } from "./use-debounced-value";
import { useToast } from "./use-toast";
import { getPageNumbers, applyAllFilters, sortAdvocates } from "@repo/utils";

export interface ActiveFilter {
  type: "degree" | "city" | "specialty" | "experience" | "areaCode";
  label: string;
  value?: string;
}

/* eslint-disable no-unused-vars */
export interface UseAdvocateTableReturn {
  advocates: AdvocateWithRelations[];
  isLoading: boolean;
  isFetching: boolean;
  isBackgroundFetching: boolean;
  error: string | undefined;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDegrees: number[];
  setSelectedDegrees: (value: number[]) => void;
  selectedCities: number[];
  setSelectedCities: (value: number[]) => void;
  selectedSpecialties: number[];
  setSelectedSpecialties: (value: number[]) => void;
  selectedAreaCodes: string[];
  setSelectedAreaCodes: (value: string[]) => void;
  minExperience: number | "";
  setMinExperience: (value: number | "") => void;
  maxExperience: number | "";
  setMaxExperience: (value: number | "") => void;
  sortConfig: AdvocateSortConfig;
  handleSort: (column: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  totalRecords: number;
  loadedRecords: number;
  visiblePageNumbers: (number | "...")[];
  hasPrevious: boolean;
  hasNext: boolean;
  activeFilters: ActiveFilter[];
  removeFilter: (type: string, value?: string) => void;
  clearAllFilters: () => void;
  filterOptions: {
    cities: Array<{ id: number; name: string; count: number }>;
    degrees: Array<{ id: number; code: string; name: string; count: number }>;
    specialties: Array<{ id: number; name: string; count: number }>;
  };
  addSpecialtyFilter: (specialtyId: number) => void;
  addCityFilter: (cityId: number) => void;
  addDegreeFilter: (degreeId: number) => void;
  addAreaCodeFilter: (areaCode: string) => void;
}
/* eslint-enable no-unused-vars */

/**
 * Hook for managing advocate table with smart progressive hybrid caching.
 *
 * Smart Caching Strategy:
 * 1. **Initial Load:** Fetches MAX_INITIAL_FETCH records (default 500)
 * 2. **Client-Side First:** All filters/sorts happen instantly on cached data
 * 3. **Background Validation:** When filters change, fetches from server in background
 * 4. **Progressive Merge:** New server results merged into cache seamlessly
 * 5. **No Loading States:** Only shows skeleton on initial load, never on filter changes
 *
 * UX Benefits:
 * - Instant filter/sort/search (0ms response on cached data)
 * - Smooth background fetching (transparent to user)
 * - Accurate total counts (server provides truth)
 * - Progressive data loading (cache builds as user interacts)
 * - Environment-configurable limits (no hardcoded values)
 *
 * @returns Object containing all state and handlers for the advocate table
 *
 * @example
 * function AdvocateTablePage() {
 *   const {
 *     advocates,
 *     isLoading,
 *     isBackgroundFetching,
 *     totalRecords,
 *     loadedRecords,
 *     searchTerm,
 *     setSearchTerm,
 *     // ... other properties
 *   } = useAdvocateTable();
 *
 *   return (
 *     <AdvocateListTemplate
 *       advocates={advocates}
 *       isLoading={isLoading}
 *       isBackgroundFetching={isBackgroundFetching}
 *       totalRecords={totalRecords}
 *       loadedRecords={loadedRecords}
 *       ...
 *     />
 *   );
 * }
 */
export function useAdvocateTable(): UseAdvocateTableReturn {
  const { showToast } = useToast();
  const hasShownInitialToast = useRef(false);

  // URL state for persistence
  const [currentPage, setCurrentPage] = useUrlNumberState("page", 1);
  const [pageSize, setPageSize] = useUrlNumberState("pageSize", 25);
  const [searchTerm, setSearchTerm] = useUrlState("search", "");
  const [selectedDegrees, setSelectedDegrees] = useUrlNumberArrayState("degrees", []);
  const [selectedCities, setSelectedCities] = useUrlNumberArrayState("cities", []);
  const [selectedSpecialties, setSelectedSpecialties] = useUrlNumberArrayState("specialties", []);
  const [selectedAreaCodes, setSelectedAreaCodes] = useUrlArrayState("areaCodes", []);
  const [minExperience, setMinExperience] = useUrlNumberState("minExp", 0);
  const [maxExperience, setMaxExperience] = useUrlNumberState("maxExp", 0);
  const [sortColumn, setSortColumn] = useUrlState("sort", "firstName");
  const [sortDirection, setSortDirection] = useUrlState("sortDir", "asc");

  // Local cache state
  const [cachedAdvocates, setCachedAdvocates] = useState<AdvocateWithRelations[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const sortConfig: AdvocateSortConfig = {
    column: sortColumn as AdvocateSortConfig["column"],
    direction: sortDirection as AdvocateSortConfig["direction"],
  };

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // Get environment config with fallbacks
  const MAX_INITIAL_FETCH = parseInt(process.env.NEXT_PUBLIC_MAX_INITIAL_FETCH || "500");

  // Build filters object
  const hasFilters = Boolean(
    debouncedSearchTerm ||
      selectedCities.length > 0 ||
      selectedDegrees.length > 0 ||
      selectedSpecialties.length > 0 ||
      minExperience > 0 ||
      maxExperience > 0
  );

  const filters = useMemo<AdvocateFilters | undefined>(() => {
    if (!hasFilters) {
      return undefined;
    }

    return {
      search: debouncedSearchTerm || undefined,
      cityIds: selectedCities.length > 0 ? selectedCities : undefined,
      degreeIds: selectedDegrees.length > 0 ? selectedDegrees : undefined,
      specialtyIds: selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
      minExperience: minExperience > 0 ? minExperience : undefined,
      maxExperience: maxExperience > 0 ? maxExperience : undefined,
    };
  }, [
    debouncedSearchTerm,
    selectedCities,
    selectedDegrees,
    selectedSpecialties,
    minExperience,
    maxExperience,
    hasFilters,
  ]);

  // Initial fetch - load first batch of advocates
  const {
    data: initialResponse,
    isLoading: isInitialLoading,
    error: initialError,
  } = useAdvocates({
    page: 1,
    pageSize: MAX_INITIAL_FETCH,
    enabled: true,
  });

  // Background fetch - validates/expands cache when filters change
  const {
    data: backgroundResponse,
    isFetching: isBackgroundFetching,
    error: backgroundError,
  } = useAdvocates({
    page: 1,
    pageSize: MAX_INITIAL_FETCH,
    filters,
    enabled: hasFilters, // Only fetch when filters active
  });

  const { data: filterOptionsResponse } = useAdvocateFilterOptions();

  // Update cache from initial fetch
  useEffect(() => {
    if (initialResponse?.success && Array.isArray(initialResponse.data)) {
      setCachedAdvocates(initialResponse.data);
      if (initialResponse.pagination?.totalRecords) {
        setTotalCount(initialResponse.pagination.totalRecords);
      }
    }
  }, [initialResponse]);

  // Merge background fetch results into cache
  useEffect(() => {
    if (backgroundResponse?.success && Array.isArray(backgroundResponse.data)) {
      setCachedAdvocates((prev) => {
        const existingIds = new Set(prev.map((a) => a.id));
        const newAdvocates = backgroundResponse.data.filter((a) => !existingIds.has(a.id));

        if (newAdvocates.length > 0) {
          return [...prev, ...newAdvocates];
        }
        return prev;
      });

      if (backgroundResponse.pagination?.totalRecords) {
        setTotalCount(backgroundResponse.pagination.totalRecords);
      }
    }
  }, [backgroundResponse]);

  // Client-side filtering and sorting (instant)
  const filteredAndSortedAdvocates = useMemo(() => {
    let result = cachedAdvocates;

    // Apply all filters client-side
    result = applyAllFilters(result, {
      searchTerm: debouncedSearchTerm,
      cityIds: selectedCities,
      degreeIds: selectedDegrees,
      specialtyIds: selectedSpecialties,
      areaCodes: selectedAreaCodes,
      minExperience:
        typeof minExperience === "number" && minExperience > 0 ? minExperience : undefined,
      maxExperience:
        typeof maxExperience === "number" && maxExperience > 0 ? maxExperience : undefined,
    });

    // Apply sorting client-side
    if (sortConfig.column !== "createdAt") {
      result = sortAdvocates(result, sortConfig.column, sortConfig.direction);
    }

    return result;
  }, [
    cachedAdvocates,
    debouncedSearchTerm,
    selectedCities,
    selectedDegrees,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
    sortConfig,
  ]);

  // Calculate client-side pagination
  const totalRecords = hasFilters ? totalCount : cachedAdvocates.length;
  const loadedRecords = cachedAdvocates.length;
  const filteredCount = filteredAndSortedAdvocates.length;
  const totalPages = Math.ceil(filteredCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get paginated advocates for current page
  const advocates = useMemo(() => {
    return filteredAndSortedAdvocates.slice(startIndex, endIndex);
  }, [filteredAndSortedAdvocates, startIndex, endIndex]);

  const filterOptions = useMemo(
    () =>
      filterOptionsResponse?.success
        ? filterOptionsResponse.data
        : { cities: [], degrees: [], specialties: [] },
    [filterOptionsResponse]
  );

  const error = initialError
    ? initialError instanceof Error
      ? initialError.message
      : "Failed to fetch advocates"
    : backgroundError
      ? backgroundError instanceof Error
        ? backgroundError.message
        : "Failed to fetch filtered advocates"
      : initialResponse?.success === false
        ? initialResponse.error.message
        : undefined;

  useEffect(() => {
    if (initialResponse?.success && !hasShownInitialToast.current) {
      hasShownInitialToast.current = true;
      const count = initialResponse.pagination?.totalRecords || initialResponse.data.length;
      showToast({
        variant: "success",
        message: "Advocates loaded successfully",
        description: `Found ${count} advocate${count !== 1 ? "s" : ""}`,
        duration: 3000,
      });
    }
  }, [initialResponse, showToast]);

  useEffect(() => {
    if (error) {
      showToast({
        variant: "error",
        message: "Failed to load advocates",
        description: error,
        duration: 5000,
      });
    }
  }, [error, showToast]);

  const visiblePageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const activeFiltersList: ActiveFilter[] = [];

    selectedDegrees.forEach((degreeId) => {
      const degree = filterOptions.degrees.find((d) => d.id === degreeId);
      if (degree) {
        activeFiltersList.push({ type: "degree", label: degree.code, value: String(degreeId) });
      }
    });

    selectedCities.forEach((cityId) => {
      const city = filterOptions.cities.find((c) => c.id === cityId);
      if (city) {
        activeFiltersList.push({ type: "city", label: city.name, value: String(cityId) });
      }
    });

    selectedSpecialties.forEach((specialtyId) => {
      const specialty = filterOptions.specialties.find((s) => s.id === specialtyId);
      if (specialty) {
        activeFiltersList.push({
          type: "specialty",
          label: specialty.name,
          value: String(specialtyId),
        });
      }
    });

    selectedAreaCodes.forEach((areaCode) => {
      activeFiltersList.push({ type: "areaCode", label: areaCode, value: areaCode });
    });

    if (
      (typeof minExperience === "number" && minExperience > 0) ||
      (typeof maxExperience === "number" && maxExperience > 0)
    ) {
      const min = typeof minExperience === "number" ? minExperience : 0;
      const max = typeof maxExperience === "number" ? maxExperience : 0;
      const label =
        min > 0 && max > 0
          ? `${min}-${max} years`
          : min > 0
            ? `${min}+ years`
            : `Up to ${max} years`;
      activeFiltersList.push({ type: "experience", label });
    }

    return activeFiltersList;
  }, [
    selectedDegrees,
    selectedCities,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
    filterOptions,
  ]);

  const removeFilter = (type: string, value?: string) => {
    if (type === "degree" && value) {
      setSelectedDegrees(selectedDegrees.filter((id) => String(id) !== value));
    } else if (type === "city" && value) {
      setSelectedCities(selectedCities.filter((id) => String(id) !== value));
    } else if (type === "specialty" && value) {
      setSelectedSpecialties(selectedSpecialties.filter((id) => String(id) !== value));
    } else if (type === "areaCode" && value) {
      setSelectedAreaCodes(selectedAreaCodes.filter((code) => code !== value));
    } else if (type === "experience") {
      setMinExperience(0);
      setMaxExperience(0);
    }
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDegrees([]);
    setSelectedCities([]);
    setSelectedSpecialties([]);
    setSelectedAreaCodes([]);
    setMinExperience(0);
    setMaxExperience(0);
    setSortColumn("firstName");
    setSortDirection("asc");
    setCurrentPage(1);
  };

  const addSpecialtyFilter = (specialtyId: number) => {
    if (!selectedSpecialties.includes(specialtyId)) {
      setSelectedSpecialties([...selectedSpecialties, specialtyId]);
      setCurrentPage(1);
    }
  };

  const addCityFilter = (cityId: number) => {
    if (!selectedCities.includes(cityId)) {
      setSelectedCities([...selectedCities, cityId]);
      setCurrentPage(1);
    }
  };

  const addDegreeFilter = (degreeId: number) => {
    if (!selectedDegrees.includes(degreeId)) {
      setSelectedDegrees([...selectedDegrees, degreeId]);
      setCurrentPage(1);
    }
  };

  const addAreaCodeFilter = (areaCode: string) => {
    if (!selectedAreaCodes.includes(areaCode)) {
      setSelectedAreaCodes([...selectedAreaCodes, areaCode]);
      setCurrentPage(1);
    }
  };

  return {
    advocates,
    isLoading: isInitialLoading,
    isFetching: isBackgroundFetching,
    isBackgroundFetching,
    error,
    searchTerm,
    setSearchTerm: (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    },
    selectedDegrees,
    setSelectedDegrees: (value: number[]) => {
      setSelectedDegrees(value);
      setCurrentPage(1);
    },
    selectedCities,
    setSelectedCities: (value: number[]) => {
      setSelectedCities(value);
      setCurrentPage(1);
    },
    selectedSpecialties,
    setSelectedSpecialties: (value: number[]) => {
      setSelectedSpecialties(value);
      setCurrentPage(1);
    },
    selectedAreaCodes,
    setSelectedAreaCodes: (value: string[]) => {
      setSelectedAreaCodes(value);
      setCurrentPage(1);
    },
    minExperience: minExperience || "",
    setMinExperience: (value: number | "") => {
      setMinExperience(typeof value === "number" ? value : 0);
      setCurrentPage(1);
    },
    maxExperience: maxExperience || "",
    setMaxExperience: (value: number | "") => {
      setMaxExperience(typeof value === "number" ? value : 0);
      setCurrentPage(1);
    },
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize: (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
    },
    totalPages,
    totalRecords,
    loadedRecords,
    visiblePageNumbers,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    activeFilters,
    removeFilter,
    clearAllFilters,
    filterOptions,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
    addAreaCodeFilter,
  };
}
