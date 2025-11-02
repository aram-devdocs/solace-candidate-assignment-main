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
  onSpecialtyClick?: (specialty: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when city badge is clicked (for filtering)
   */
  onCityClick?: (city: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when degree badge is clicked (for filtering)
   */
  onDegreeClick?: (degree: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Optional callback when area code badge is clicked (for filtering)
   */
  onAreaCodeClick?: (areaCode: string) => void; // eslint-disable-line no-unused-vars
}

/**
 * Helper function to get cell value with proper formatting
 */
function getCellValue(
  advocate: AdvocateWithRelations,
  key: AdvocateColumnKey,
  onSpecialtyClick?: (specialty: string) => void, // eslint-disable-line no-unused-vars
  onCityClick?: (city: string) => void, // eslint-disable-line no-unused-vars
  onDegreeClick?: (degree: string) => void, // eslint-disable-line no-unused-vars
  onAreaCodeClick?: (areaCode: string) => void // eslint-disable-line no-unused-vars
): React.ReactNode {
  if (key === "specialties") {
    return (
      <div className="gap-xs flex flex-wrap">
        {advocate.advocateSpecialties.map((as, i) => (
          <SpecialtyBadge
            key={i}
            specialty={as.specialty.name}
            onClick={onSpecialtyClick}
            clickable={!!onSpecialtyClick}
          />
        ))}
      </div>
    );
  }

  if (key === "city") {
    return <CityBadge city={advocate.city.name} onClick={onCityClick} clickable={!!onCityClick} />;
  }

  if (key === "degree") {
    return (
      <DegreeBadge
        degree={advocate.degree.code}
        onClick={onDegreeClick}
        clickable={!!onDegreeClick}
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
      <div className="border-secondary-200 w-full overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse" aria-label={ARIA_LABELS.advocateTable}>
          <thead className="bg-secondary-50 border-secondary-300 border-b-2">
            <tr>
              {visibleColumns.map((key, index) => {
                const isSortable = sortableColumns.includes(key as SortableColumn);
                const isActive = sortColumn === key;

                return (
                  <TableCell key={index} as="th" scope="col">
                    {isSortable && onSort ? (
                      <SortControl
                        isActive={isActive}
                        direction={isActive ? sortDirection : undefined}
                        onToggle={() => onSort(key as SortableColumn)}
                        label={ADVOCATE_TABLE_HEADERS[key]}
                      />
                    ) : (
                      <span className="text-secondary-900 font-bold">
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
          <tbody>
            {advocates.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (!isDesktop ? 1 : 0)}
                  className="p-lg text-secondary-500 text-center"
                >
                  No advocates found
                </td>
              </tr>
            ) : (
              advocates.map((advocate, index) => {
                const cells: TableCellData[] = visibleColumns.map((key) => {
                  const content = getCellValue(
                    advocate,
                    key,
                    onSpecialtyClick,
                    onCityClick,
                    onDegreeClick,
                    onAreaCodeClick
                  );
                  const align = key === "yearsOfExperience" ? ("center" as const) : undefined;
                  return align ? { content, align } : content;
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
                          onAreaCodeClick
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
      {pagination && advocates.length > 0 && (
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
