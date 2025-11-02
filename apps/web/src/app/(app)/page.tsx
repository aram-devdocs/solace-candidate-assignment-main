"use client";

import { useEffect, useState, useMemo } from "react";
import type { Advocate } from "@repo/types";
import { fetchAdvocates } from "@repo/queries";
import {
  useDeviceSize,
  useExpandableRows,
  useAdvocateFilters,
  useTableSorting,
  useUrlNumberState,
  useToast,
} from "@repo/hooks";
import { filterAdvocates, sortAdvocates, paginate, getPageNumbers } from "@repo/utils";
import type { SortableColumn } from "@repo/utils";
import { AdvocateListTemplate } from "@repo/ui";
import type { ActiveFilter } from "@repo/ui";

export const dynamic = "force-dynamic";

export default function Home() {
  const [allAdvocates, setAllAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deviceSize = useDeviceSize();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    fetchAdvocates()
      .then((data) => {
        if (isMounted) {
          setAllAdvocates(data);
          setIsLoading(false);
          showToast({
            variant: "success",
            message: "Advocates loaded successfully",
            description: `Found ${data.length} advocate${data.length !== 1 ? "s" : ""}`,
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch advocates";
          setError(errorMessage);
          setIsLoading(false);
          showToast({
            variant: "error",
            message: "Failed to load advocates",
            description: errorMessage,
            duration: 5000,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showToast]);

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
    availableDegrees,
    availableCities,
    availableSpecialties,
    availableAreaCodes,
    clearAllFilters,
    removeFilter,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
    addAreaCodeFilter,
  } = useAdvocateFilters(allAdvocates);

  const { sortConfig, handleSort } = useTableSorting<SortableColumn>();

  const [currentPage, setCurrentPage] = useUrlNumberState("page", 1);
  const [pageSize, setPageSize] = useUrlNumberState("pageSize", 25);

  const filteredAndSortedAdvocates = useMemo(() => {
    const filtered = filterAdvocates(allAdvocates, filterCriteria);
    return sortAdvocates(filtered, sortConfig.column, sortConfig.direction);
  }, [allAdvocates, filterCriteria, sortConfig]);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredAndSortedAdvocates.length / pageSize);
    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    return {
      currentPage: safePage,
      totalPages: totalPages || 1,
      hasPrevious: safePage > 1,
      hasNext: safePage < totalPages,
    };
  }, [currentPage, pageSize, filteredAndSortedAdvocates.length]);

  const visiblePageNumbers = useMemo(
    () => getPageNumbers(paginationInfo.currentPage, paginationInfo.totalPages),
    [paginationInfo.currentPage, paginationInfo.totalPages]
  );

  const paginatedAdvocates = useMemo(
    () => paginate(filteredAndSortedAdvocates, paginationInfo.currentPage, pageSize).data,
    [filteredAndSortedAdvocates, paginationInfo.currentPage, pageSize]
  );

  const { expandedRows, toggleRow } = useExpandableRows(paginatedAdvocates.length);

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
        availableDegrees,
        selectedDegrees,
        onDegreesChange: (degrees) => {
          setSelectedDegrees(degrees);
          setCurrentPage(1);
        },
        availableCities,
        selectedCities,
        onCitiesChange: (cities) => {
          setSelectedCities(cities);
          setCurrentPage(1);
        },
        availableSpecialties,
        selectedSpecialties,
        onSpecialtiesChange: (specialties) => {
          setSelectedSpecialties(specialties);
          setCurrentPage(1);
        },
        availableAreaCodes,
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
        totalItems: filteredAndSortedAdvocates.length,
        onPageSizeChange: (newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        },
      }}
    />
  );
}
