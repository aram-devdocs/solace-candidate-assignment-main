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
    <thead>
      <tr>
        {headers.map((header, index) => (
          <TableCell key={index} as="th">
            {header}
          </TableCell>
        ))}
      </tr>
    </thead>
  );
};
