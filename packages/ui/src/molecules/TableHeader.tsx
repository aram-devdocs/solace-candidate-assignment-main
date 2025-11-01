import React from "react";
import { TableCell } from "../atoms/TableCell";

export interface TableHeaderProps {
  headers: string[];
  /**
   * Whether to show the expand/collapse column on mobile
   */
  showExpandColumn?: boolean;
}

/**
 * TableHeader component for table header row
 * Supports responsive column visibility and mobile expand column
 *
 * @param headers - Array of header labels
 * @param showExpandColumn - Whether to show expand/collapse column
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ headers, showExpandColumn = false }) => {
  return (
    <thead className="bg-secondary-50 border-secondary-300 border-b-2">
      <tr>
        {headers.map((header, index) => (
          <TableCell key={index} as="th" scope="col">
            <span className="text-secondary-900 font-bold">{header}</span>
          </TableCell>
        ))}
        {showExpandColumn && (
          <TableCell as="th" scope="col" className="xl:hidden">
            <span className="sr-only">Actions</span>
          </TableCell>
        )}
      </tr>
    </thead>
  );
};
