"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Advocate } from "@repo/types";
import { useAdvocates, useAdvocateFilterOptions, usePrefetchAdvocates } from "@repo/queries";
import {
  useDeviceSize,
  useExpandableRows,
  useAdvocateFilters,
  useTableSorting,
  useUrlNumberState,
  useToast,
  useDebouncedValue,
} from "@repo/hooks";
import { filterAdvocates, sortAdvocates, paginate, getPageNumbers } from "@repo/utils";
import type { SortableColumn } from "@repo/utils";
import { AdvocateListTemplate } from "@repo/ui";
import type { ActiveFilter } from "@repo/ui";

export const dynamic = "force-dynamic";

export default function Home() {
  const deviceSize = useDeviceSize();
  const { showToast } = useToast();
  const hasShownInitialToast = useRef(false);

  const { data: response, isLoading, error: queryError } = useAdvocates();
  const { data: filterOptions } = useAdvocateFilterOptions();

  const allAdvocates: Advocate[] = useMemo(
    () => (response?.success ? response.data : []),
    [response]
  );

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to fetch advocates"
    : response?.success === false
      ? response.error.message
      : null;

  useEffect(() => {
    if (response?.success && !hasShownInitialToast.current) {
      hasShownInitialToast.current = true;
      const count = response.data.length;
      showToast({
        variant: "success",
        message: "Advocates loaded successfully",
        description: `Found ${count} advocate${count !== 1 ? "s" : ""}`,
        duration: 3000,
      });
    }
  }, [response, showToast]);

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

  const {
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
    clearAllFilters,
    removeFilter,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
    addAreaCodeFilter,
  } = useAdvocateFilters(allAdvocates);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const debouncedFilterCriteria = useMemo(
    () => ({
      ...filterCriteria,
      search: debouncedSearchTerm,
    }),
    [filterCriteria, debouncedSearchTerm]
  );

  const { sortConfig, handleSort } = useTableSorting<SortableColumn>();

  const [currentPage, setCurrentPage] = useUrlNumberState("page", 1);
  const [pageSize, setPageSize] = useUrlNumberState("pageSize", 25);

  const filteredAdvocates = useMemo(() => {
    return filterAdvocates(allAdvocates, debouncedFilterCriteria);
  }, [allAdvocates, debouncedFilterCriteria]);

  const sortedAdvocates = useMemo(() => {
    return sortAdvocates(filteredAdvocates, sortConfig.column, sortConfig.direction);
  }, [filteredAdvocates, sortConfig]);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(sortedAdvocates.length / pageSize);
    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    return {
      currentPage: safePage,
      totalPages: totalPages || 1,
      hasPrevious: safePage > 1,
      hasNext: safePage < totalPages,
    };
  }, [currentPage, pageSize, sortedAdvocates.length]);

  const visiblePageNumbers = useMemo(
    () => getPageNumbers(paginationInfo.currentPage, paginationInfo.totalPages),
    [paginationInfo.currentPage, paginationInfo.totalPages]
  );

  const paginatedAdvocates = useMemo(
    () => paginate(sortedAdvocates, paginationInfo.currentPage, pageSize).data,
    [sortedAdvocates, paginationInfo.currentPage, pageSize]
  );

  const { expandedRows, toggleRow } = useExpandableRows(paginatedAdvocates.length);

  usePrefetchAdvocates({
    enabled: paginationInfo.hasNext,
    data: sortedAdvocates,
    nextPage: paginationInfo.currentPage + 1,
    pageSize,
  });

  const activeFilters: ActiveFilter[] = useMemo(() => {
    const filters: ActiveFilter[] = [];

    selectedDegrees.forEach((degree) => {
      filters.push({ type: "degree", label: degree, value: degree });
    });

    selectedCities.forEach((city) => {
      filters.push({ type: "city", label: city, value: city });
    });

    selectedSpecialties.forEach((specialty) => {
      filters.push({ type: "specialty", label: specialty, value: specialty });
    });

    selectedAreaCodes.forEach((areaCode) => {
      filters.push({ type: "areaCode", label: `(${areaCode})`, value: areaCode });
    });

    if (minExperience > 0 || maxExperience > 0) {
      const label =
        minExperience > 0 && maxExperience > 0
          ? `${minExperience}-${maxExperience} years`
          : minExperience > 0
            ? `${minExperience}+ years`
            : `Up to ${maxExperience} years`;
      filters.push({ type: "experience", label });
    }

    return filters;
  }, [
    selectedDegrees,
    selectedCities,
    selectedSpecialties,
    selectedAreaCodes,
    minExperience,
    maxExperience,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleResetSearch = (): void => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <AdvocateListTemplate
      advocates={paginatedAdvocates}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onResetSearch={handleResetSearch}
      isLoading={isLoading}
      error={error || undefined}
      deviceSize={deviceSize}
      expandedRows={expandedRows}
      onToggleRow={toggleRow}
      filters={{
        availableDegrees: filterOptions?.degrees || [],
        selectedDegrees,
        onDegreesChange: (degrees) => {
          setSelectedDegrees(degrees);
          setCurrentPage(1);
        },
        availableCities: filterOptions?.cities || [],
        selectedCities,
        onCitiesChange: (cities) => {
          setSelectedCities(cities);
          setCurrentPage(1);
        },
        availableSpecialties: filterOptions?.specialties || [],
        selectedSpecialties,
        onSpecialtiesChange: (specialties) => {
          setSelectedSpecialties(specialties);
          setCurrentPage(1);
        },
        availableAreaCodes: filterOptions?.areaCodes || [],
        selectedAreaCodes,
        onAreaCodesChange: (areaCodes) => {
          setSelectedAreaCodes(areaCodes);
          setCurrentPage(1);
        },
        minExperience,
        maxExperience,
        onMinExperienceChange: (value: number | "") => {
          setMinExperience(value === "" ? 0 : value);
          setCurrentPage(1);
        },
        onMaxExperienceChange: (value: number | "") => {
          setMaxExperience(value === "" ? 0 : value);
          setCurrentPage(1);
        },
        activeFilters,
        onRemoveFilter: (type, value) => {
          removeFilter(type, value);
          setCurrentPage(1);
        },
        onClearAll: () => {
          clearAllFilters();
          setCurrentPage(1);
        },
        onSpecialtyClick: (specialty) => {
          addSpecialtyFilter(specialty);
          setCurrentPage(1);
        },
        onCityClick: (city) => {
          addCityFilter(city);
          setCurrentPage(1);
        },
        onDegreeClick: (degree) => {
          addDegreeFilter(degree);
          setCurrentPage(1);
        },
        onAreaCodeClick: (areaCode) => {
          addAreaCodeFilter(areaCode);
          setCurrentPage(1);
        },
      }}
      sort={{
        column: sortConfig.column,
        direction: sortConfig.direction,
        onSort: handleSort,
      }}
      pagination={{
        currentPage: paginationInfo.currentPage,
        totalPages: paginationInfo.totalPages,
        visiblePages: visiblePageNumbers,
        hasPrevious: paginationInfo.hasPrevious,
        hasNext: paginationInfo.hasNext,
        onPageChange: setCurrentPage,
        onFirstPage: () => setCurrentPage(1),
        onLastPage: () => setCurrentPage(paginationInfo.totalPages),
      }}
      pageSize={{
        current: pageSize,
        options: [10, 25, 50, 100],
        totalItems: sortedAdvocates.length,
        onPageSizeChange: (newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        },
      }}
    />
  );
}
