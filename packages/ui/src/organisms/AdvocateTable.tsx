import React from "react";
import type { AdvocateWithRelations } from "@repo/types";
import { TableRow, type TableCellData } from "../molecules/TableRow";
import { SortControl } from "../molecules/SortControl";
import { SpecialtyBadge } from "../molecules/SpecialtyBadge";
import { CityBadge } from "../molecules/CityBadge";
import { DegreeBadge } from "../molecules/DegreeBadge";
import { PhoneNumberDisplay } from "../molecules/PhoneNumberDisplay";
import { Pagination } from "../molecules/Pagination";
import { PageSizeSelector } from "../molecules/PageSizeSelector";
import { TableCell } from "../atoms/TableCell";
import {
  ADVOCATE_TABLE_COLUMNS,
  ADVOCATE_TABLE_HEADERS,
  type AdvocateColumnKey,
} from "../constants/table";
import { ARIA_LABELS } from "../constants/accessibility";
import type { DeviceSize, SortableColumn, SortDirection } from "@repo/utils";
import { formatPhoneNumber, extractAreaCode } from "@repo/utils";

export interface AdvocateTableProps {
  advocates: AdvocateWithRelations[];
  /**
   * Loading state for the table
   */
  isLoading?: boolean;
  /**
   * Fetching state (loading new data while existing data is visible)
   */
  isFetching?: boolean;
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
   * Current sort column
   */
  sortColumn?: SortableColumn | null;
  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;
  /**
   * Callback for sorting
   */
  onSort?: (column: SortableColumn) => void; // eslint-disable-line no-unused-vars
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
  /**
   * Optional callback when specialty badge is clicked (for filtering)
   */
  onSpecialtyClick?: (specialtyId: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when city badge is clicked (for filtering)
   */
  onCityClick?: (cityId: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when degree badge is clicked (for filtering)
   */
  onDegreeClick?: (degreeId: number) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when area code badge is clicked (for filtering)
   */
  onAreaCodeClick?: (areaCode: string) => void; // eslint-disable-line no-unused-vars
  /**
   * IDs of currently active specialty filters
   */
  activeSpecialtyIds?: number[];
  /**
   * IDs of currently active city filters
   */
  activeCityIds?: number[];
  /**
   * IDs of currently active degree filters
   */
  activeDegreeIds?: number[];
  /**
   * Currently active area codes
   */
  activeAreaCodes?: string[];
}

/**
 * Helper function to get cell value with proper formatting
 */
function getCellValue(
  advocate: AdvocateWithRelations,
  key: AdvocateColumnKey,
  onSpecialtyClick?: (specialtyId: number) => void, // eslint-disable-line no-unused-vars
  onCityClick?: (cityId: number) => void, // eslint-disable-line no-unused-vars
  onDegreeClick?: (degreeId: number) => void, // eslint-disable-line no-unused-vars
  onAreaCodeClick?: (areaCode: string) => void, // eslint-disable-line no-unused-vars
  activeSpecialtyIds?: number[],
  activeCityIds?: number[],
  activeDegreeIds?: number[],
  activeAreaCodes?: string[]
): React.ReactNode {
  if (key === "specialties") {
    return (
      <div className="gap-xs flex flex-wrap">
        {advocate.advocateSpecialties.map((as, i) => (
          <SpecialtyBadge
            key={i}
            specialty={as.specialty.name}
            specialtyId={as.specialty.id}
            onClick={onSpecialtyClick}
            clickable={!!onSpecialtyClick}
            isActive={activeSpecialtyIds?.includes(as.specialty.id)}
          />
        ))}
      </div>
    );
  }

  if (key === "city") {
    return (
      <CityBadge
        city={advocate.city.name}
        cityId={advocate.city.id}
        onClick={onCityClick}
        clickable={!!onCityClick}
        isActive={activeCityIds?.includes(advocate.city.id)}
      />
    );
  }

  if (key === "degree") {
    return (
      <DegreeBadge
        degree={advocate.degree.code}
        degreeId={advocate.degree.id}
        onClick={onDegreeClick}
        clickable={!!onDegreeClick}
        isActive={activeDegreeIds?.includes(advocate.degree.id)}
      />
    );
  }

  if (key === "phoneNumber") {
    const formattedNumber = formatPhoneNumber(advocate.phoneNumber);
    const areaCode = extractAreaCode(advocate.phoneNumber);

    return (
      <PhoneNumberDisplay
        phoneNumber={formattedNumber}
        areaCode={areaCode}
        onAreaCodeClick={onAreaCodeClick}
        clickable={!!onAreaCodeClick}
        isActiveAreaCode={activeAreaCodes?.includes(areaCode)}
      />
    );
  }

  return advocate[key];
}

/**
 * AdvocateTable component for displaying advocate data in a table
 * Supports sorting, pagination, and responsive design
 * Responsive: Shows different columns based on device size
 * Mobile: 3 columns + expandable details
 * Tablet: 5 columns
 * Desktop: 7 columns (all data)
 *
 * @param advocates - Array of advocate data to display
 * @param deviceSize - Current device size (mobile/tablet/desktop)
 * @param expandedRows - Set of expanded row indices
 * @param onToggleRow - Callback to toggle row expansion
 * @param sortColumn - Current sort column
 * @param sortDirection - Current sort direction
 * @param onSort - Callback for sorting
 * @param pagination - Pagination configuration
 * @param pageSize - Page size configuration
 * @param onSpecialtyClick - Callback when specialty badge is clicked
 * @param onCityClick - Callback when city badge is clicked
 * @param onDegreeClick - Callback when degree badge is clicked
 * @param onAreaCodeClick - Callback when area code badge is clicked
 */
export const AdvocateTable: React.FC<AdvocateTableProps> = ({
  advocates,
  isLoading = false,
  isFetching = false,
  deviceSize,
  expandedRows = new Set(),
  onToggleRow,
  sortColumn,
  sortDirection = "asc",
  onSort,
  pagination,
  pageSize,
  onSpecialtyClick,
  onCityClick,
  onDegreeClick,
  onAreaCodeClick,
  activeSpecialtyIds = [],
  activeCityIds = [],
  activeDegreeIds = [],
  activeAreaCodes = [],
}) => {
  const visibleColumns = ADVOCATE_TABLE_COLUMNS[deviceSize];
  const isDesktop = deviceSize === "desktop";
  const allColumns = ADVOCATE_TABLE_COLUMNS.desktop;

  const sortableColumns: SortableColumn[] = [
    "firstName",
    "lastName",
    "city",
    "degree",
    "yearsOfExperience",
  ];

  return (
    <div className="space-y-md">
      {/* Page Size Selector */}
      {pageSize && (
        <div className="flex items-center justify-between">
          <PageSizeSelector
            pageSize={pageSize.current}
            options={pageSize.options}
            totalItems={pageSize.totalItems}
            onPageSizeChange={pageSize.onPageSizeChange}
          />
        </div>
      )}

      {/* Table */}
      <div className="border-secondary-200 dark:border-secondary-700 scrollbar-hide relative max-h-[600px] w-full overflow-auto rounded-lg border lg:max-h-[70vh]">
        <table className="w-full border-collapse" aria-label={ARIA_LABELS.advocateTable}>
          <thead className="bg-secondary-50 dark:bg-secondary-800 border-secondary-300 dark:border-secondary-700 sticky top-0 z-10 border-b-2">
            <tr>
              {visibleColumns.map((key, index) => {
                const isSortable = sortableColumns.includes(key as SortableColumn);
                const isActive = sortColumn === key;

                return (
                  <TableCell key={index} as="th" scope="col" className="whitespace-nowrap">
                    {isSortable && onSort ? (
                      <SortControl
                        isActive={isActive}
                        direction={isActive ? sortDirection : undefined}
                        onToggle={() => onSort(key as SortableColumn)}
                        label={ADVOCATE_TABLE_HEADERS[key]}
                      />
                    ) : (
                      <span className="text-secondary-900 dark:text-secondary-100 font-bold">
                        {ADVOCATE_TABLE_HEADERS[key]}
                      </span>
                    )}
                  </TableCell>
                );
              })}
              {!isDesktop && (
                <TableCell as="th" scope="col" className="xl:hidden">
                  <span className="sr-only">Actions</span>
                </TableCell>
              )}
            </tr>
          </thead>
          <tbody className="relative">
            {/* Loading overlay when fetching new data - only covers rows */}
            {isFetching && advocates.length > 0 && (
              <tr className="pointer-events-none absolute inset-0">
                <td className="absolute inset-0">
                  <div className="bg-secondary-100/40 absolute inset-0 backdrop-blur-[2px]">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-secondary-700 rounded-md bg-white/90 px-4 py-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="border-secondary-400 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                          <span className="text-sm">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {advocates.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (!isDesktop ? 1 : 0)}
                  className="p-lg text-secondary-500 text-center"
                >
                  {isLoading ? "Loading..." : "No advocates found"}
                </td>
              </tr>
            ) : (
              advocates.map((advocate, index) => {
                const cells: TableCellData[] = visibleColumns.map((key) => {
                  return getCellValue(
                    advocate,
                    key,
                    onSpecialtyClick,
                    onCityClick,
                    onDegreeClick,
                    onAreaCodeClick,
                    activeSpecialtyIds,
                    activeCityIds,
                    activeDegreeIds,
                    activeAreaCodes
                  );
                });

                const expandableCells = !isDesktop
                  ? allColumns
                      .filter((key) => !visibleColumns.includes(key))
                      .map((key) => ({
                        label: ADVOCATE_TABLE_HEADERS[key],
                        content: getCellValue(
                          advocate,
                          key,
                          onSpecialtyClick,
                          onCityClick,
                          onDegreeClick,
                          onAreaCodeClick,
                          activeSpecialtyIds,
                          activeCityIds,
                          activeDegreeIds,
                          activeAreaCodes
                        ),
                      }))
                  : undefined;

                return (
                  <TableRow
                    key={index}
                    cells={cells}
                    expandableCells={expandableCells}
                    isExpanded={expandedRows.has(index)}
                    onToggleExpand={onToggleRow ? () => onToggleRow(index) : undefined}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            visiblePages={pagination.visiblePages}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPageChange={pagination.onPageChange}
            onFirstPage={pagination.onFirstPage}
            onLastPage={pagination.onLastPage}
            deviceSize={deviceSize}
          />
        </div>
      )}
    </div>
  );
};
