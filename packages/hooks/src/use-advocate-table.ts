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
import { getPageNumbers, applyAllFilters, TIMEOUTS, CACHE_STRATEGY } from "@repo/utils";

export interface ActiveFilter {
  type: "degree" | "city" | "specialty" | "experience" | "areaCode";
  label: string;
  value?: string;
}

interface CacheManagementResult {
  updatedCache: Map<number, AdvocateWithRelations>;
  updatedAccessOrder: number[];
  hasNewData: boolean;
}

export interface UseAdvocateTableReturn {
  advocates: AdvocateWithRelations[];
  isLoading: boolean;
  isFetching: boolean;
  isBackgroundFetching: boolean;
  error: string | undefined;
  searchTerm: string;
  setSearchTerm: (_value: string) => void;
  selectedDegrees: number[];
  setSelectedDegrees: (_value: number[]) => void;
  selectedCities: number[];
  setSelectedCities: (_value: number[]) => void;
  selectedSpecialties: number[];
  setSelectedSpecialties: (_value: number[]) => void;
  selectedAreaCodes: string[];
  setSelectedAreaCodes: (_value: string[]) => void;
  minExperience: number | "";
  setMinExperience: (_value: number | "") => void;
  maxExperience: number | "";
  setMaxExperience: (_value: number | "") => void;
  sortConfig: AdvocateSortConfig;
  handleSort: (_column: string) => void;
  currentPage: number;
  setCurrentPage: (_page: number) => void;
  pageSize: number;
  setPageSize: (_size: number) => void;
  totalPages: number;
  totalRecords: number;
  loadedRecords: number;
  visiblePageNumbers: (number | "...")[];
  hasPrevious: boolean;
  hasNext: boolean;
  activeFilters: ActiveFilter[];
  removeFilter: (_type: string, _value?: string) => void;
  clearAllFilters: () => void;
  filterOptions: {
    cities: Array<{ id: number; name: string; count: number }>;
    degrees: Array<{ id: number; code: string; name: string; count: number }>;
    specialties: Array<{ id: number; name: string; count: number }>;
  };
  addSpecialtyFilter: (_specialtyId: number) => void;
  addCityFilter: (_cityId: number) => void;
  addDegreeFilter: (_degreeId: number) => void;
  addAreaCodeFilter: (_areaCode: string) => void;
}

/**
 * Calculates which server page contains the data for a given UI page
 */
function calculateServerPage(uiPage: number, uiPageSize: number, fetchSize: number): number {
  const startRecord = (uiPage - 1) * uiPageSize;
  return Math.floor(startRecord / fetchSize) + 1;
}

/**
 * Adds data to cache with LRU eviction when cache exceeds maximum size
 */
function addToCache(
  cache: Map<number, AdvocateWithRelations>,
  accessOrder: number[],
  newData: Array<{ index: number; advocate: AdvocateWithRelations }>
): CacheManagementResult {
  const updatedCache = new Map(cache);
  let updatedAccessOrder = [...accessOrder];
  let hasNewData = false;

  for (const { index, advocate } of newData) {
    if (!updatedCache.has(index)) {
      updatedCache.set(index, advocate);
      hasNewData = true;
      updatedAccessOrder.push(index);
    } else {
      updatedAccessOrder = updatedAccessOrder.filter((i) => i !== index);
      updatedAccessOrder.push(index);
    }
  }

  while (updatedCache.size > CACHE_STRATEGY.MAX_CACHED_RECORDS) {
    const lruKey = updatedAccessOrder.shift();
    if (lruKey !== undefined) {
      updatedCache.delete(lruKey);
    }
  }

  return { updatedCache, updatedAccessOrder, hasNewData };
}

/**
 * Merges advocate data into cache at specified batch index
 */
function mergeAdvocateData(
  advocates: AdvocateWithRelations[],
  batchStartIndex: number,
  currentCache: Map<number, AdvocateWithRelations>,
  currentAccessOrder: number[]
): CacheManagementResult {
  const newData = advocates.map((advocate, i) => ({
    index: batchStartIndex + i,
    advocate,
  }));

  return addToCache(currentCache, currentAccessOrder, newData);
}

/**
 * Hook for managing advocate table with filtering, sorting, and pagination.
 * Uses server-side filtering when filters are active, client-side caching for browsing.
 *
 * @returns Object containing advocates data, loading states, and filter/pagination handlers
 *
 * @example
 * const { advocates, isLoading, searchTerm, setSearchTerm, currentPage, setCurrentPage } = useAdvocateTable();
 */
export function useAdvocateTable(): UseAdvocateTableReturn {
  const { showToast } = useToast();
  const hasShownInitialToast = useRef(false);

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

  const [cachedAdvocatesMap, setCachedAdvocatesMap] = useState<Map<number, AdvocateWithRelations>>(
    new Map()
  );
  const [cacheSize, setCacheSize] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [fetchingPage, setFetchingPage] = useState<number | null>(null);
  const [loadedBatches, setLoadedBatches] = useState<Set<number>>(new Set());
  const [previousAdvocates, setPreviousAdvocates] = useState<AdvocateWithRelations[]>([]);

  const sortConfig: AdvocateSortConfig = useMemo(
    () => ({
      column: sortColumn as AdvocateSortConfig["column"],
      direction: sortDirection as AdvocateSortConfig["direction"],
    }),
    [sortColumn, sortDirection]
  );

  const debouncedSearchTerm = useDebouncedValue(searchTerm, TIMEOUTS.SEARCH_DEBOUNCE_MS);
  const [filteredTotalCount, setFilteredTotalCount] = useState<number | null>(null);
  const [accessOrder, setAccessOrder] = useState<number[]>([]);
  const accessOrderRef = useRef<number[]>([]);

  useEffect(() => {
    accessOrderRef.current = accessOrder;
  }, [accessOrder]);

  const MAX_INITIAL_FETCH = CACHE_STRATEGY.INITIAL_FETCH_SIZE;
  const hasFilters = Boolean(
    debouncedSearchTerm ||
      selectedCities.length > 0 ||
      selectedDegrees.length > 0 ||
      selectedSpecialties.length > 0 ||
      selectedAreaCodes.length > 0 ||
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
      areaCodes: selectedAreaCodes.length > 0 ? selectedAreaCodes : undefined,
      minExperience: minExperience > 0 ? minExperience : undefined,
      maxExperience: maxExperience > 0 ? maxExperience : undefined,
    };
  }, [
    debouncedSearchTerm,
    selectedCities,
    selectedDegrees,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
    hasFilters,
  ]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBatchNeeded = calculateServerPage(currentPage, pageSize, MAX_INITIAL_FETCH);
  const needsData = !hasFilters && (totalCount === 0 || !loadedBatches.has(currentBatchNeeded));

  let serverPageNeeded: number | null = null;
  if (needsData) {
    if (!loadedBatches.has(currentBatchNeeded)) {
      serverPageNeeded = currentBatchNeeded;
    } else if (currentBatchNeeded > 1) {
      serverPageNeeded =
        Array.from({ length: currentBatchNeeded - 1 }, (_, i) => i + 1).find(
          (batch) => !loadedBatches.has(batch)
        ) || null;
    }
  }

  const {
    data: mainResponse,
    isFetching: isMainFetching,
    isLoading: isMainLoading,
    error: mainError,
  } = useAdvocates({
    // When filters active, use actual current page for server pagination
    // When no filters, use server batch page for cache loading
    page: hasFilters ? currentPage : serverPageNeeded || currentBatchNeeded,
    pageSize: hasFilters ? pageSize : MAX_INITIAL_FETCH,
    filters,
    sort: sortConfig,
    // Always fetch when: filters active, specific page needed, OR cache is empty and we're on a valid page
    enabled: hasFilters || serverPageNeeded !== null || (totalCount === 0 && cachedAdvocatesMap.size === 0),
  });

  const prevBatch =
    !hasFilters && currentBatchNeeded > 1 && !loadedBatches.has(currentBatchNeeded - 1)
      ? currentBatchNeeded - 1
      : null;

  const { data: prevBatchResponse } = useAdvocates({
    page: prevBatch || 1,
    pageSize: MAX_INITIAL_FETCH,
    sort: sortConfig,
    enabled: prevBatch !== null,
  });

  const nextBatch =
    !hasFilters && !loadedBatches.has(currentBatchNeeded + 1) ? currentBatchNeeded + 1 : null;

  const { data: nextBatchResponse } = useAdvocates({
    page: nextBatch || 1,
    pageSize: MAX_INITIAL_FETCH,
    sort: sortConfig,
    enabled: nextBatch !== null,
  });

  const { data: filterOptionsResponse } = useAdvocateFilterOptions();

  useEffect(() => {
    if (hasFilters && mainResponse?.success && mainResponse.pagination?.totalRecords) {
      setFilteredTotalCount(mainResponse.pagination.totalRecords);
    }

    if (!hasFilters && filteredTotalCount !== null) {
      setFilteredTotalCount(null);
    }

    if (mainResponse?.success && Array.isArray(mainResponse.data) && !hasFilters) {
      const actualServerPage = serverPageNeeded !== null ? serverPageNeeded : currentBatchNeeded;
      const batchStartIndex = (actualServerPage - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prevCache) => {
        const result = mergeAdvocateData(
          mainResponse.data,
          batchStartIndex,
          prevCache,
          accessOrderRef.current
        );

        if (result.hasNewData) {
          setAccessOrder(result.updatedAccessOrder);
          setCacheSize(result.updatedCache.size);
        }

        return result.hasNewData ? result.updatedCache : prevCache;
      });

      if (mainResponse.pagination?.totalRecords) {
        setTotalCount(mainResponse.pagination.totalRecords);
      }

      setLoadedBatches((prev) => new Set(prev).add(actualServerPage));

      if (fetchingPage !== null && actualServerPage === fetchingPage) {
        setFetchingPage(null);
      }
    }
  }, [
    mainResponse,
    fetchingPage,
    serverPageNeeded,
    currentBatchNeeded,
    MAX_INITIAL_FETCH,
    hasFilters,
    filteredTotalCount,
  ]);

  useEffect(() => {
    if (prevBatchResponse?.success && Array.isArray(prevBatchResponse.data) && prevBatch) {
      const batchStartIndex = (prevBatch - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prevCache) => {
        const result = mergeAdvocateData(
          prevBatchResponse.data,
          batchStartIndex,
          prevCache,
          accessOrderRef.current
        );

        if (result.hasNewData) {
          setAccessOrder(result.updatedAccessOrder);
          setCacheSize(result.updatedCache.size);
        }

        return result.hasNewData ? result.updatedCache : prevCache;
      });

      setLoadedBatches((prev) => new Set(prev).add(prevBatch));
    }
  }, [prevBatchResponse, prevBatch, MAX_INITIAL_FETCH]);

  useEffect(() => {
    if (nextBatchResponse?.success && Array.isArray(nextBatchResponse.data) && nextBatch) {
      const batchStartIndex = (nextBatch - 1) * MAX_INITIAL_FETCH;

      setCachedAdvocatesMap((prevCache) => {
        const result = mergeAdvocateData(
          nextBatchResponse.data,
          batchStartIndex,
          prevCache,
          accessOrderRef.current
        );

        if (result.hasNewData) {
          setAccessOrder(result.updatedAccessOrder);
          setCacheSize(result.updatedCache.size);
        }

        return result.hasNewData ? result.updatedCache : prevCache;
      });

      setLoadedBatches((prev) => new Set(prev).add(nextBatch));
    }
  }, [nextBatchResponse, nextBatch, MAX_INITIAL_FETCH]);

  // Client-side filtering and sorting (instant)
  const filteredAndSortedAdvocates = useMemo(() => {
    // When filters active, use server data directly - no client-side filtering
    if (hasFilters && mainResponse?.success && Array.isArray(mainResponse.data)) {
      return mainResponse.data;
    }

    // When no filters, apply client-side filtering on cache for instant UX
    const cachedArray = Array.from(cachedAdvocatesMap.values());

    // Apply all filters client-side
    const result = applyAllFilters(cachedArray, {
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

    // Server handles sorting - no client-side sorting needed
    // The cached data is already in the correct sort order from the server
    return result;
  }, [
    hasFilters,
    mainResponse,
    cacheSize,
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

  // Calculate total records - use filtered count when filters active
  const totalRecords = hasFilters && filteredTotalCount !== null ? filteredTotalCount : totalCount;
  const loadedRecords = hasFilters && filteredTotalCount !== null ? filteredTotalCount : cacheSize;

  // Calculate total pages using the correct total (filtered or unfiltered)
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;

  // Get paginated advocates for current page
  const currentAdvocates = useMemo(() => {
    // When filters active, server already paginated - return data as is
    if (hasFilters) {
      return filteredAndSortedAdvocates;
    }

    // When no filters, extract records from cache using absolute indices
    const result: AdvocateWithRelations[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      const advocate = cachedAdvocatesMap.get(i);
      if (advocate) {
        result.push(advocate);
      }
    }

    return result;
  }, [hasFilters, filteredAndSortedAdvocates, startIndex, endIndex, cachedAdvocatesMap]);

  // Show previous data during loading, otherwise show current data
  const advocates =
    isMainFetching && previousAdvocates.length > 0 ? previousAdvocates : currentAdvocates;

  // Update previous advocates when current data changes and we're not fetching
  useEffect(() => {
    if (currentAdvocates.length > 0 && !isMainFetching) {
      setPreviousAdvocates(currentAdvocates);
    }
  }, [currentAdvocates, isMainFetching]);

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

  // Clear cache when sort changes to fetch data with new sort order
  useEffect(() => {
    setCachedAdvocatesMap(new Map());
    setLoadedBatches(new Set());
    setCacheSize(0);
  }, [sortConfig.column, sortConfig.direction]);

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
    isLoading: isMainLoading && totalCount === 0 && cachedAdvocatesMap.size === 0 && !hasFilters,
    isFetching: isMainFetching,
    isBackgroundFetching: isMainFetching || prevBatch !== null || nextBatch !== null,
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
