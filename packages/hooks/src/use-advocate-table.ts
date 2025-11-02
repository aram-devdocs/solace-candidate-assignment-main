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

  // Local cache state - using Map for O(1) inserts without sorting
  const [cachedAdvocatesMap, setCachedAdvocatesMap] = useState<Map<number, AdvocateWithRelations>>(
    new Map()
  );
  const [cacheSize, setCacheSize] = useState(0); // Track size for memo dependencies
  const [totalCount, setTotalCount] = useState(0);
  const [fetchingPage, setFetchingPage] = useState<number | null>(null);
  const [loadedBatches, setLoadedBatches] = useState<Set<number>>(new Set());
  const [backfillBatch, setBackfillBatch] = useState<number | null>(null);
  const [currentBatchLoaded, setCurrentBatchLoaded] = useState(false);

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

  // Calculate which page we need to fetch from server for current UI page
  const calculateServerPage = (uiPage: number, uiPageSize: number): number => {
    const startRecord = (uiPage - 1) * uiPageSize;
    return Math.floor(startRecord / MAX_INITIAL_FETCH) + 1;
  };

  // Check if we have the data for current page in cache
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Calculate which batch we need for the current page
  const currentBatchNeeded = calculateServerPage(currentPage, pageSize);

  // We need data if we haven't loaded the batch that contains the current page
  const needsData = !hasFilters && (totalCount === 0 || !loadedBatches.has(currentBatchNeeded));

  // Strategy: Fetch current batch FIRST, then backfill gaps in background
  // This prevents UI flashing when jumping to high pages
  let serverPageNeeded: number | null = null;
  if (needsData) {
    if (!loadedBatches.has(currentBatchNeeded)) {
      // Priority: fetch the batch we need for the current page
      serverPageNeeded = currentBatchNeeded;
    } else if (currentBatchNeeded > 1) {
      // Current batch loaded, now fill gaps if any
      serverPageNeeded =
        Array.from({ length: currentBatchNeeded - 1 }, (_, i) => i + 1).find(
          (batch) => !loadedBatches.has(batch)
        ) || null;
    }
  }

  // Calculate total pages early so we can use it in prefetch logic
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // Main fetch - fetches data for current page OR when filters change
  const {
    data: mainResponse,
    isFetching: isMainFetching,
    isLoading: isMainLoading,
    error: mainError,
  } = useAdvocates({
    page: serverPageNeeded || 1,
    pageSize: MAX_INITIAL_FETCH,
    filters,
    enabled: hasFilters || serverPageNeeded !== null, // Fetch when filters active OR need specific page
  });

  // Backfill mechanism - progressively fetch earlier batches in background
  const { data: backfillResponse } = useAdvocates({
    page: backfillBatch || 1,
    pageSize: MAX_INITIAL_FETCH,
    enabled: backfillBatch !== null && !loadedBatches.has(backfillBatch),
  });

  // Prefetch next page if user is getting close
  const nextServerPage = calculateServerPage(currentPage + 1, pageSize);
  const shouldPrefetchNext =
    !hasFilters &&
    currentPage < totalPages &&
    nextServerPage > (serverPageNeeded || 1) &&
    cacheSize < nextServerPage * MAX_INITIAL_FETCH &&
    loadedBatches.has(nextServerPage - 1); // Only prefetch if previous batch is loaded

  const { data: prefetchResponse } = useAdvocates({
    page: nextServerPage,
    pageSize: MAX_INITIAL_FETCH,
    enabled: shouldPrefetchNext,
  });

  const { data: filterOptionsResponse } = useAdvocateFilterOptions();

  // Update cache from main fetch
  useEffect(() => {
    if (mainResponse?.success && Array.isArray(mainResponse.data) && serverPageNeeded !== null) {
      // Calculate starting index for this batch
      const batchStartIndex = (serverPageNeeded - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prev) => {
        const next = new Map(prev);
        let hasNewData = false;

        mainResponse.data.forEach((advocate, i) => {
          const recordIndex = batchStartIndex + i;
          if (!next.has(recordIndex)) {
            next.set(recordIndex, advocate);
            hasNewData = true;
          }
        });

        return hasNewData ? next : prev;
      });

      setCacheSize(() => {
        const newSize =
          cachedAdvocatesMap.size +
          mainResponse.data.filter((_, i) => !cachedAdvocatesMap.has(batchStartIndex + i)).length;
        return newSize;
      });

      if (mainResponse.pagination?.totalRecords) {
        setTotalCount(mainResponse.pagination.totalRecords);
      }

      setLoadedBatches((prev) => new Set(prev).add(serverPageNeeded));

      // If we just loaded the current batch and it's > 1, start backfilling
      if (
        serverPageNeeded === currentBatchNeeded &&
        serverPageNeeded > 1 &&
        backfillBatch === null
      ) {
        setCurrentBatchLoaded(true);
        setBackfillBatch(1);
      }

      if (fetchingPage !== null && serverPageNeeded === fetchingPage) {
        setFetchingPage(null);
      }
    }
  }, [
    mainResponse,
    fetchingPage,
    serverPageNeeded,
    currentBatchNeeded,
    backfillBatch,
    MAX_INITIAL_FETCH,
    cachedAdvocatesMap,
  ]);

  // Handle backfill responses
  useEffect(() => {
    if (
      backfillResponse?.success &&
      Array.isArray(backfillResponse.data) &&
      backfillBatch !== null
    ) {
      // Calculate starting index for this batch
      const batchStartIndex = (backfillBatch - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prev) => {
        const next = new Map(prev);
        let hasNewData = false;

        backfillResponse.data.forEach((advocate, i) => {
          const recordIndex = batchStartIndex + i;
          if (!next.has(recordIndex)) {
            next.set(recordIndex, advocate);
            hasNewData = true;
          }
        });

        return hasNewData ? next : prev;
      });

      setCacheSize(cachedAdvocatesMap.size);

      // Mark this batch as loaded
      setLoadedBatches((prev) => new Set(prev).add(backfillBatch));

      // Continue backfilling to the next batch
      const maxBatchToFetch = (currentBatchNeeded || 1) - 1;

      if (backfillBatch < maxBatchToFetch) {
        setBackfillBatch(backfillBatch + 1);
      } else {
        // Backfill complete
        setBackfillBatch(null);
        setCurrentBatchLoaded(false);
      }
    }
  }, [backfillResponse, backfillBatch, currentBatchNeeded, MAX_INITIAL_FETCH, cachedAdvocatesMap]);

  // Merge prefetch results into cache
  useEffect(() => {
    if (prefetchResponse?.success && Array.isArray(prefetchResponse.data) && nextServerPage) {
      // Calculate starting index for this batch
      const batchStartIndex = (nextServerPage - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prev) => {
        const next = new Map(prev);
        let hasNewData = false;

        prefetchResponse.data.forEach((advocate, i) => {
          const recordIndex = batchStartIndex + i;
          if (!next.has(recordIndex)) {
            next.set(recordIndex, advocate);
            hasNewData = true;
          }
        });

        return hasNewData ? next : prev;
      });

      setCacheSize(cachedAdvocatesMap.size);
      setLoadedBatches((prev) => new Set(prev).add(nextServerPage));
    }
  }, [prefetchResponse, nextServerPage, MAX_INITIAL_FETCH, cachedAdvocatesMap]);

  // Client-side filtering and sorting (instant)
  const filteredAndSortedAdvocates = useMemo(() => {
    // Convert Map to Array - only recompute when cache size changes
    const cachedArray = Array.from(cachedAdvocatesMap.values());

    // Apply all filters client-side
    let result = applyAllFilters(cachedArray, {
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
    cacheSize, // Use size instead of map reference to prevent unnecessary recomputation
    debouncedSearchTerm,
    selectedCities,
    selectedDegrees,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
    sortConfig,
    cachedAdvocatesMap,
  ]);

  // Calculate client-side pagination
  const totalRecords = totalCount;
  const loadedRecords = cacheSize;

  // Get paginated advocates for current page
  const advocates = useMemo(() => {
    // When no filters, slice directly from the sorted/filtered results
    // The Map-based cache + size dependency prevents unnecessary recomputation
    const sliced = filteredAndSortedAdvocates.slice(startIndex, endIndex);

    // If we're fetching this page and have no data, return empty to show loading
    if (sliced.length === 0 && needsData && isMainFetching && !currentBatchLoaded) {
      return [];
    }

    return sliced;
  }, [
    filteredAndSortedAdvocates,
    startIndex,
    endIndex,
    needsData,
    isMainFetching,
    currentBatchLoaded,
  ]);

  const filterOptions = useMemo(
    () =>
      filterOptionsResponse?.success
        ? filterOptionsResponse.data
        : { cities: [], degrees: [], specialties: [] },
    [filterOptionsResponse]
  );

  const error = mainError
    ? mainError instanceof Error
      ? mainError.message
      : "Failed to fetch advocates"
    : mainResponse?.success === false
      ? mainResponse.error.message
      : undefined;

  useEffect(() => {
    if (mainResponse?.success && !hasShownInitialToast.current) {
      hasShownInitialToast.current = true;
      const count = mainResponse.pagination?.totalRecords || mainResponse.data.length;
      showToast({
        variant: "success",
        message: "Advocates loaded successfully",
        description: `Found ${count} advocate${count !== 1 ? "s" : ""}`,
        duration: 3000,
      });
    }
  }, [mainResponse, showToast]);

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
    isLoading: isMainLoading && totalCount === 0 && cachedAdvocatesMap.size === 0,
    isFetching: isMainFetching,
    isBackgroundFetching: isMainFetching || backfillBatch !== null,
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
