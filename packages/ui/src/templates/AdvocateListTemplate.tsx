"use client";

import React, { useState, useMemo } from "react";
import { Filter as FilterIcon } from "lucide-react";
import type { AdvocateWithRelations } from "@repo/types";
import { parseSearchTokens } from "@repo/utils";
import { Greeting } from "../molecules/Greeting";
import { TemplateHeader } from "../molecules/TemplateHeader";
import { SearchBar } from "../molecules/SearchBar";
import { SearchPills } from "../molecules/SearchPills";
import { SearchHelpTooltip } from "../atoms/SearchHelpTooltip";
import { ErrorState } from "../molecules/ErrorState";
import { PageSelector } from "../molecules/PageSelector";
import { AdvocateTable } from "../organisms/AdvocateTable";
import { FilterPanel } from "../organisms/FilterPanel";
import { ActiveFiltersBar } from "../organisms/ActiveFiltersBar";
import { SkeletonGreeting } from "../molecules/SkeletonGreeting";
import { SkeletonSearchBar } from "../molecules/SkeletonSearchBar";
import { SkeletonAdvocateTable } from "../organisms/SkeletonAdvocateTable";
import { IconButton } from "../atoms/IconButton";
import { StatusBadge } from "../atoms/StatusBadge";
import type { DeviceSize, SortableColumn, SortDirection } from "@repo/utils";
import type { ActiveFilter } from "../organisms/ActiveFiltersBar";

export interface AdvocateListTemplateProps {
  advocates: AdvocateWithRelations[];
  searchTerm: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetSearch: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isBackgroundFetching?: boolean;
  error?: string;
  totalRecords?: number;
  loadedRecords?: number;
  /**
   * Current device size (from useDeviceSize hook in parent)
   */
  deviceSize: DeviceSize;
  /**
   * Set of expanded row indices (from useExpandableRows hook in parent)
   */
  expandedRows?: Set<number>;
  /**
   * Callback to toggle row expansion
   */
  onToggleRow?: (index: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Filter configuration
   */
  filters?: {
    availableDegrees: string[];
    selectedDegrees: string[];
    onDegreesChange: (degrees: string[]) => void; // eslint-disable-line no-unused-vars
    availableCities: string[];
    selectedCities: string[];
    onCitiesChange: (cities: string[]) => void; // eslint-disable-line no-unused-vars
    availableSpecialties: string[];
    selectedSpecialties: string[];
    onSpecialtiesChange: (specialties: string[]) => void; // eslint-disable-line no-unused-vars
    availableAreaCodes: string[];
    selectedAreaCodes: string[];
    onAreaCodesChange: (areaCodes: string[]) => void; // eslint-disable-line no-unused-vars
    minExperience: number | "";
    maxExperience: number | "";
    onMinExperienceChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
    onMaxExperienceChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
    activeFilters: ActiveFilter[];
    onRemoveFilter: (
      type: "degree" | "city" | "specialty" | "experience" | "areaCode",
      value?: string
    ) => void; // eslint-disable-line no-unused-vars
    onClearAll: () => void;
    onSpecialtyClick?: (specialtyId: number) => void; // eslint-disable-line no-unused-vars
    onCityClick?: (cityId: number) => void; // eslint-disable-line no-unused-vars
    onDegreeClick?: (degreeId: number) => void; // eslint-disable-line no-unused-vars
    onAreaCodeClick?: (areaCode: string) => void; // eslint-disable-line no-unused-vars
    activeSpecialtyIds?: number[];
    activeCityIds?: number[];
    activeDegreeIds?: number[];
    activeAreaCodes?: string[];
  };
  /**
   * Sort configuration
   */
  sort?: {
    column: SortableColumn | null;
    direction: SortDirection;
    onSort: (column: SortableColumn) => void; // eslint-disable-line no-unused-vars
  };
  /**
   * Pagination configuration
   */
  pagination?: {
    currentPage: number;
    totalPages: number;
    visiblePages: (number | "...")[];
    hasPrevious: boolean;
    hasNext: boolean;
    onPageChange: (page: number) => void; // eslint-disable-line no-unused-vars
    onFirstPage: () => void;
    onLastPage: () => void;
  };
  /**
   * Page size configuration
   */
  pageSize?: {
    current: number;
    options: number[];
    totalItems: number;
    onPageSizeChange: (size: number) => void; // eslint-disable-line no-unused-vars
  };
}

/**
 * AdvocateListTemplate complete page layout with search, filters, and table
 * Supports filtering, sorting, and pagination
 * Responsive: Adjusts padding and spacing for different screen sizes
 * Mobile: p-md, my-lg
 * Tablet: p-lg, my-xl
 * Desktop: p-xl, my-2xl
 *
 * @param advocates - Array of advocates to display
 * @param searchTerm - Current search term
 * @param onSearchChange - Handler for search input changes
 * @param onResetSearch - Handler for reset button click
 * @param isLoading - Loading state
 * @param error - Error message if any
 * @param filters - Filter configuration
 * @param sort - Sort configuration
 * @param pagination - Pagination configuration
 * @param pageSize - Page size configuration
 */
export const AdvocateListTemplate: React.FC<AdvocateListTemplateProps> = ({
  advocates,
  searchTerm,
  onSearchChange,
  onResetSearch,
  isLoading = false,
  isFetching = false,
  isBackgroundFetching = false,
  error,
  totalRecords,
  loadedRecords,
  deviceSize,
  expandedRows,
  onToggleRow,
  filters,
  sort,
  pagination,
  pageSize,
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState<"morning" | "afternoon" | "evening">("morning");

  // Parse search tokens for highlighting and pills display
  const searchTokens = useMemo(() => parseSearchTokens(searchTerm), [searchTerm]);

  // Handler to remove individual search token
  const handleRemoveToken = (tokenToRemove: string): void => {
    const remainingTokens = searchTokens.filter((token: string) => token !== tokenToRemove);
    const newSearchTerm = remainingTokens
      .map((token: string) => (token.includes(" ") ? `"${token}"` : token))
      .join(" ");

    const event = {
      target: { value: newSearchTerm },
    } as React.ChangeEvent<HTMLInputElement>;
    onSearchChange(event);
  };

  // Helper to find and remove matching search token
  const findAndRemoveMatchingToken = (text: string): void => {
    const normalizedText = text.toLowerCase().trim();
    const matchingToken = searchTokens.find((token) =>
      normalizedText.includes(token.toLowerCase())
    );
    if (matchingToken) {
      handleRemoveToken(matchingToken);
    }
  };

  // Smart badge click handlers that remove matching search token and add filter
  const handleSmartSpecialtyClick = (specialtyId: number): void => {
    if (filters?.onSpecialtyClick) {
      // Find the specialty name to match against search tokens
      const advocate = advocates.find((adv) =>
        adv.advocateSpecialties.some((as) => as.specialty.id === specialtyId)
      );
      const specialty = advocate?.advocateSpecialties.find((as) => as.specialty.id === specialtyId)
        ?.specialty.name;

      if (specialty) {
        findAndRemoveMatchingToken(specialty);
      }

      filters.onSpecialtyClick(specialtyId);
    }
  };

  const handleSmartCityClick = (cityId: number): void => {
    if (filters?.onCityClick) {
      // Find the city name to match against search tokens
      const advocate = advocates.find((adv) => adv.city.id === cityId);
      const city = advocate?.city.name;

      if (city) {
        findAndRemoveMatchingToken(city);
      }

      filters.onCityClick(cityId);
    }
  };

  const handleSmartDegreeClick = (degreeId: number): void => {
    if (filters?.onDegreeClick) {
      // Find the degree code to match against search tokens
      const advocate = advocates.find((adv) => adv.degree.id === degreeId);
      const degree = advocate?.degree.code;

      if (degree) {
        findAndRemoveMatchingToken(degree);
      }

      filters.onDegreeClick(degreeId);
    }
  };

  const handleSmartAreaCodeClick = (areaCode: string): void => {
    if (filters?.onAreaCodeClick) {
      findAndRemoveMatchingToken(areaCode);
      filters.onAreaCodeClick(areaCode);
    }
  };

  // Calculate time period on client only to avoid hydration mismatch
  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimePeriod("morning");
    else if (hour < 18) setTimePeriod("afternoon");
    else setTimePeriod("evening");
  }, []);

  const paddingClasses = "p-sm sm:p-md md:p-lg lg:p-xl xl:p-lg 2xl:p-md";
  const spacingClasses = "my-lg md:my-xl lg:my-2xl";

  if (isLoading) {
    return (
      <div className={`${paddingClasses} w-full`}>
        <div className={spacingClasses}>
          <SkeletonGreeting />
        </div>
        <div className={spacingClasses}>
          <SkeletonSearchBar />
        </div>
        <div className={spacingClasses}>
          <SkeletonAdvocateTable />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${paddingClasses} w-full`}>
        <div className={spacingClasses}>
          <Greeting userName="Aram" timePeriod={timePeriod} />
        </div>
        <ErrorState error={error} />
      </div>
    );
  }

  return (
    <div className={`${paddingClasses} w-full`}>
      <div className={spacingClasses}>
        <Greeting userName="Aram" timePeriod={timePeriod} />
      </div>

      {/* Template Header */}
      <div className={spacingClasses}>
        <TemplateHeader
          title="Advocate Directory"
          subtitle="Browse and connect with health advocates"
        />
      </div>

      {/* Search Bar with Filter Button and Help */}
      <div className={spacingClasses}>
        <div className="gap-sm flex items-center">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={onSearchChange} onReset={onResetSearch} />
          </div>
          <SearchHelpTooltip />
          {filters && (
            <IconButton
              icon={FilterIcon}
              variant="ghost"
              size="lg"
              onClick={() => setIsFilterPanelOpen(true)}
              aria-label="Open filters"
            />
          )}
        </div>
        {/* Search Pills */}
        {searchTokens.length > 0 && (
          <div className="mt-3">
            <SearchPills tokens={searchTokens} onRemove={handleRemoveToken} removable={true} />
          </div>
        )}
      </div>

      {/* Active Filters Bar */}
      {filters && filters.activeFilters.length > 0 && (
        <div className={spacingClasses}>
          <ActiveFiltersBar
            activeFilters={filters.activeFilters}
            onRemoveFilter={filters.onRemoveFilter}
            onClearAll={filters.onClearAll}
            resultCount={advocates.length}
          />
        </div>
      )}

      {/* Status Badge */}
      {totalRecords !== undefined && (
        <div className={spacingClasses}>
          <StatusBadge
            displayedCount={advocates.length}
            totalCount={totalRecords}
            loadedCount={loadedRecords}
            itemLabel="advocates"
            isFiltered={filters ? filters.activeFilters.length > 0 : false}
            isBackgroundFetching={isBackgroundFetching}
          />
        </div>
      )}

      {/* Page Selector */}
      {pagination && pageSize && pagination.totalPages > 1 && (
        <div className={spacingClasses}>
          <PageSelector
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            visiblePages={pagination.visiblePages}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPageChange={pagination.onPageChange}
            onFirstPage={pagination.onFirstPage}
            onLastPage={pagination.onLastPage}
            pageSize={pageSize.current}
            pageSizeOptions={pageSize.options}
            totalItems={pageSize.totalItems}
            onPageSizeChange={pageSize.onPageSizeChange}
            deviceSize={deviceSize}
          />
        </div>
      )}

      {/* Advocate Table */}
      <div className={spacingClasses}>
        <AdvocateTable
          advocates={advocates}
          isFetching={isFetching}
          deviceSize={deviceSize}
          searchTokens={searchTokens}
          expandedRows={expandedRows}
          onToggleRow={onToggleRow}
          sortColumn={sort?.column}
          sortDirection={sort?.direction}
          onSort={sort?.onSort}
          pagination={pagination}
          pageSize={pageSize}
          onSpecialtyClick={handleSmartSpecialtyClick}
          onCityClick={handleSmartCityClick}
          onDegreeClick={handleSmartDegreeClick}
          onAreaCodeClick={handleSmartAreaCodeClick}
          activeSpecialtyIds={filters?.activeSpecialtyIds}
          activeCityIds={filters?.activeCityIds}
          activeDegreeIds={filters?.activeDegreeIds}
          activeAreaCodes={filters?.activeAreaCodes}
        />
      </div>

      {/* Filter Panel */}
      {filters && (
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            const event = {
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>;
            onSearchChange(event);
          }}
          availableDegrees={filters.availableDegrees}
          selectedDegrees={filters.selectedDegrees}
          onDegreesChange={filters.onDegreesChange}
          availableCities={filters.availableCities}
          selectedCities={filters.selectedCities}
          onCitiesChange={filters.onCitiesChange}
          availableSpecialties={filters.availableSpecialties}
          selectedSpecialties={filters.selectedSpecialties}
          onSpecialtiesChange={filters.onSpecialtiesChange}
          availableAreaCodes={filters.availableAreaCodes}
          selectedAreaCodes={filters.selectedAreaCodes}
          onAreaCodesChange={filters.onAreaCodesChange}
          minExperience={filters.minExperience}
          maxExperience={filters.maxExperience}
          onMinExperienceChange={filters.onMinExperienceChange}
          onMaxExperienceChange={filters.onMaxExperienceChange}
          onClearAll={filters.onClearAll}
          deviceSize={deviceSize}
        />
      )}
    </div>
  );
};
