"use client";

import { useDeviceSize, useExpandableRows, useAdvocateTable } from "@repo/hooks";
import { AdvocateListTemplate } from "@repo/ui";
import type { SortableColumn } from "@repo/utils";

export const dynamic = "force-dynamic";

export default function Home() {
  const deviceSize = useDeviceSize();

  const {
    advocates,
    isLoading,
    isBackgroundFetching,
    error,
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
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalRecords,
    loadedRecords,
    visiblePageNumbers,
    hasPrevious,
    hasNext,
    activeFilters,
    removeFilter,
    clearAllFilters,
    filterOptions,
    addSpecialtyFilter,
    addCityFilter,
    addDegreeFilter,
    selectedAreaCodes,
    setSelectedAreaCodes,
    addAreaCodeFilter,
  } = useAdvocateTable();

  const { expandedRows, toggleRow } = useExpandableRows(advocates.length);

  return (
    <AdvocateListTemplate
      advocates={advocates}
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onResetSearch={() => setSearchTerm("")}
      isLoading={isLoading}
      isBackgroundFetching={isBackgroundFetching}
      error={error}
      totalRecords={totalRecords}
      loadedRecords={loadedRecords}
      deviceSize={deviceSize}
      expandedRows={expandedRows}
      onToggleRow={toggleRow}
      filters={{
        availableDegrees: filterOptions.degrees.map((d) => d.code),
        selectedDegrees: selectedDegrees.map((id) => {
          const degree = filterOptions.degrees.find((d) => d.id === id);
          return degree?.code || "";
        }),
        onDegreesChange: (codes) => {
          const ids = codes
            .map((code) => filterOptions.degrees.find((d) => d.code === code)?.id)
            .filter((id): id is number => id !== undefined);
          setSelectedDegrees(ids);
        },
        availableCities: filterOptions.cities.map((c) => c.name),
        selectedCities: selectedCities.map((id) => {
          const city = filterOptions.cities.find((c) => c.id === id);
          return city?.name || "";
        }),
        onCitiesChange: (names) => {
          const ids = names
            .map((name) => filterOptions.cities.find((c) => c.name === name)?.id)
            .filter((id): id is number => id !== undefined);
          setSelectedCities(ids);
        },
        availableSpecialties: filterOptions.specialties.map((s) => s.name),
        selectedSpecialties: selectedSpecialties.map((id) => {
          const specialty = filterOptions.specialties.find((s) => s.id === id);
          return specialty?.name || "";
        }),
        onSpecialtiesChange: (names) => {
          const ids = names
            .map((name) => filterOptions.specialties.find((s) => s.name === name)?.id)
            .filter((id): id is number => id !== undefined);
          setSelectedSpecialties(ids);
        },
        availableAreaCodes: [],
        selectedAreaCodes,
        onAreaCodesChange: setSelectedAreaCodes,
        minExperience,
        maxExperience,
        onMinExperienceChange: setMinExperience,
        onMaxExperienceChange: setMaxExperience,
        activeFilters,
        onRemoveFilter: removeFilter,
        onClearAll: clearAllFilters,
        onSpecialtyClick: (specialtyId) => {
          addSpecialtyFilter(specialtyId);
        },
        onCityClick: (cityId) => {
          addCityFilter(cityId);
        },
        onDegreeClick: (degreeId) => {
          addDegreeFilter(degreeId);
        },
        onAreaCodeClick: (areaCode) => {
          addAreaCodeFilter(areaCode);
        },
        activeSpecialtyIds: selectedSpecialties,
        activeCityIds: selectedCities,
        activeDegreeIds: selectedDegrees,
        activeAreaCodes: selectedAreaCodes,
      }}
      sort={{
        column: sortConfig.column as SortableColumn,
        direction: sortConfig.direction,
        onSort: (column: SortableColumn) => handleSort(column || "firstName"),
      }}
      pagination={{
        currentPage,
        totalPages,
        visiblePages: visiblePageNumbers,
        hasPrevious,
        hasNext,
        onPageChange: setCurrentPage,
        onFirstPage: () => setCurrentPage(1),
        onLastPage: () => setCurrentPage(totalPages),
      }}
      pageSize={{
        current: pageSize,
        options: [10, 25, 50, 100],
        totalItems: totalRecords,
        onPageSizeChange: setPageSize,
      }}
    />
  );
}
