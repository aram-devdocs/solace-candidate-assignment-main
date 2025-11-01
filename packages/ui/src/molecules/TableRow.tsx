import React from "react";
import { TableCell } from "../atoms/TableCell";

export interface TableRowProps {
  cells: React.ReactNode[];
}

/**
 * TableRow component for table data row
 *
 * @param cells - Array of cell content
 */
export const TableRow: React.FC<TableRowProps> = ({ cells }) => {
  return (
    <tr>
      {cells.map((cell, index) => (
        <TableCell key={index}>{cell}</TableCell>
      ))}
    </tr>
  );
};
