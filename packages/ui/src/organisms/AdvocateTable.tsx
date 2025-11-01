import React from "react";
import type { Advocate } from "@repo/types";
import { TableHeader } from "../molecules/TableHeader";
import { TableRow } from "../molecules/TableRow";
import {
  ADVOCATE_TABLE_COLUMNS,
  ADVOCATE_TABLE_HEADERS,
  type AdvocateColumnKey,
} from "../constants/table";
import { ARIA_LABELS } from "../constants/accessibility";
import type { DeviceSize } from "@repo/utils";

export interface AdvocateTableProps {
  advocates: Advocate[];
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
}

/**
 * Helper function to get cell value with proper formatting
 */
function getCellValue(advocate: Advocate, key: AdvocateColumnKey): React.ReactNode {
  if (key === "specialties") {
    return (
      <ul className="list-none">
        {advocate.specialties.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    );
  }
  return advocate[key];
}

/**
 * AdvocateTable component for displaying advocate data in a table
 * Pure presentational component - responsive logic handled by parent via hooks
 * Responsive: Shows different columns based on device size
 * Mobile: 3 columns + expandable details
 * Tablet: 5 columns
 * Desktop: 7 columns (all data)
 *
 * @param advocates - Array of advocate data to display
 * @param deviceSize - Current device size (mobile/tablet/desktop)
 * @param expandedRows - Set of expanded row indices
 * @param onToggleRow - Callback to toggle row expansion
 */
export const AdvocateTable: React.FC<AdvocateTableProps> = ({
  advocates,
  deviceSize,
  expandedRows = new Set(),
  onToggleRow,
}) => {
  const visibleColumns = ADVOCATE_TABLE_COLUMNS[deviceSize];
  const isDesktop = deviceSize === "desktop";

  const headers = visibleColumns.map((key) => ADVOCATE_TABLE_HEADERS[key]);
  const allColumns = ADVOCATE_TABLE_COLUMNS.desktop;

  return (
    <div className="border-secondary-200 w-full overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse" aria-label={ARIA_LABELS.advocateTable}>
        <TableHeader headers={headers} showExpandColumn={!isDesktop} />
        <tbody>
          {advocates.map((advocate, index) => {
            const cells = visibleColumns.map((key) => getCellValue(advocate, key));

            const expandableCells = !isDesktop
              ? allColumns
                  .filter((key) => !visibleColumns.includes(key))
                  .map((key) => ({
                    label: ADVOCATE_TABLE_HEADERS[key],
                    content: getCellValue(advocate, key),
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
          })}
        </tbody>
      </table>
    </div>
  );
};
