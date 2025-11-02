"use client";

import { useEffect, useState, useMemo } from "react";
import type { Advocate } from "@repo/types";
import { fetchAdvocates } from "@repo/queries";
import {
  useDeviceSize,
  useExpandableRows,
  useAdvocateFilters,
  useAdvocateSorting,
  useAdvocatePagination,
  DEFAULT_PAGE_SIZES,
} from "@repo/hooks";
import { filterAdvocates, sortAdvocates } from "@repo/utils";
import { AdvocateListTemplate } from "@repo/ui";
import type { ActiveFilter } from "@repo/ui";

export const dynamic = "force-dynamic";

export default function Home() {
  const [allAdvocates, setAllAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deviceSize = useDeviceSize();

  useEffect(() => {
    let isMounted = true;

    fetchAdvocates()
      .then((data) => {
        if (isMounted) {
          setAllAdvocates(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch advocates");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
    minExperience,
    setMinExperience,
    maxExperience,
    setMaxExperience,
    availableDegrees,
    availableCities,
    availableSpecialties,
    clearAllFilters,
    removeFilter,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
  } = useAdvocateFilters(allAdvocates);

  const { sortConfig, handleSort } = useAdvocateSorting();

  const filteredAndSortedAdvocates = useMemo(() => {
    const filtered = filterAdvocates(allAdvocates, filterCriteria);
    return sortAdvocates(filtered, sortConfig.column, sortConfig.direction);
  }, [allAdvocates, filterCriteria, sortConfig]);

  const {
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    visiblePageNumbers,
    hasPrevious,
    hasNext,
    setPage,
    goToFirstPage,
    goToLastPage,
    paginateData,
  } = useAdvocatePagination<Advocate>(filteredAndSortedAdvocates.length, 25);

  const paginatedAdvocates = useMemo(
    () => paginateData(filteredAndSortedAdvocates).data,
    [filteredAndSortedAdvocates, paginateData]
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
  }, [selectedDegrees, selectedCities, selectedSpecialties, minExperience, maxExperience]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleResetSearch = (): void => {
    setSearchTerm("");
    setPage(1);
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
          setPage(1);
        },
        availableCities,
        selectedCities,
        onCitiesChange: (cities) => {
          setSelectedCities(cities);
          setPage(1);
        },
        availableSpecialties,
        selectedSpecialties,
        onSpecialtiesChange: (specialties) => {
          setSelectedSpecialties(specialties);
          setPage(1);
        },
        minExperience,
        maxExperience,
        onMinExperienceChange: (value: number | "") => {
          setMinExperience(value === "" ? 0 : value);
          setPage(1);
        },
        onMaxExperienceChange: (value: number | "") => {
          setMaxExperience(value === "" ? 0 : value);
          setPage(1);
        },
        activeFilters,
        onRemoveFilter: (type, value) => {
          removeFilter(type, value);
          setPage(1);
        },
        onClearAll: () => {
          clearAllFilters();
          setPage(1);
        },
        onSpecialtyClick: (specialty) => {
          addSpecialtyFilter(specialty);
          setPage(1);
        },
        onCityClick: (city) => {
          addCityFilter(city);
          setPage(1);
        },
        onDegreeClick: (degree) => {
          addDegreeFilter(degree);
          setPage(1);
        },
      }}
      sort={{
        column: sortConfig.column,
        direction: sortConfig.direction,
        onSort: handleSort,
      }}
      pagination={{
        currentPage,
        totalPages,
        visiblePages: visiblePageNumbers,
        hasPrevious,
        hasNext,
        onPageChange: setPage,
        onFirstPage: goToFirstPage,
        onLastPage: goToLastPage,
      }}
      pageSize={{
        current: pageSize,
        options: DEFAULT_PAGE_SIZES,
        totalItems: filteredAndSortedAdvocates.length,
        onPageSizeChange: setPageSize,
      }}
    />
  );
}
