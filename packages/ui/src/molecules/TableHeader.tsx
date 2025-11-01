import React from "react";
import { TableCell } from "../atoms/TableCell";

export interface TableHeaderProps {
  headers: string[];
}

/**
 * TableHeader component for table header row
 *
 * @param headers - Array of header labels
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead className="bg-secondary-50 border-secondary-300 border-b-2">
      <tr>
        {headers.map((header, index) => (
          <TableCell key={index} as="th">
            <span className="text-secondary-900 font-bold">{header}</span>
          </TableCell>
        ))}
      </tr>
    </thead>
  );
};
