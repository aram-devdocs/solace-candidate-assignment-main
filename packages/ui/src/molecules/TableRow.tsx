import React from "react";
import { TableCell } from "../atoms/TableCell";
import { ARIA_LABELS } from "../constants/accessibility";

export type TableCellData =
  | React.ReactNode
  | { content: React.ReactNode; align?: "left" | "center" | "right" };

export interface TableRowProps {
  cells: TableCellData[];
  /**
   * Additional cells to show in expandable section on mobile
   */
  expandableCells?: Array<{ label: string; content: React.ReactNode }>;
  /**
   * Whether this row is currently expanded (controlled from parent)
   */
  isExpanded?: boolean;
  /**
   * Callback when expand/collapse button is clicked
   */
  onToggleExpand?: () => void;
}

/**
 * TableRow component for table data row
 * Pure presentational component - state managed by parent
 * Supports expandable cards on mobile for additional data
 *
 * @param cells - Array of cell content
 * @param expandableCells - Additional cells shown in expandable section on mobile
 * @param isExpanded - Whether row is currently expanded
 * @param onToggleExpand - Callback when expand button clicked
 */
export const TableRow: React.FC<TableRowProps> = ({
  cells,
  expandableCells,
  isExpanded = false,
  onToggleExpand,
}) => {
  const hasExpandableContent = expandableCells && expandableCells.length > 0;

  return (
    <>
      <tr
        className={`border-secondary-200 hover:bg-primary-50 border-b transition-colors ${hasExpandableContent && onToggleExpand ? "cursor-pointer" : ""}`}
        onClick={hasExpandableContent && onToggleExpand ? onToggleExpand : undefined}
      >
        {cells.map((cell, index) => {
          const isCellObject = typeof cell === "object" && cell !== null && "content" in cell;
          const content = isCellObject ? cell.content : cell;
          const align = isCellObject ? cell.align : undefined;
          const isLastCell = index === cells.length - 1;

          return (
            <TableCell
              key={index}
              align={align}
              className={hasExpandableContent && isLastCell ? "xl:pr-md pr-0" : ""}
            >
              <div
                className={`${
                  hasExpandableContent && isLastCell
                    ? "xl:max-w-none max-w-[calc(100vw-16rem)] overflow-hidden"
                    : ""
                }`}
              >
                {content}
              </div>
            </TableCell>
          );
        })}
        {hasExpandableContent && onToggleExpand && (
          <TableCell className="!px-xs !py-xs sticky right-0 bg-inherit xl:hidden">
            <button
              aria-label={isExpanded ? ARIA_LABELS.collapseRow : ARIA_LABELS.expandRow}
              aria-expanded={isExpanded}
              className="text-primary-700 hover:text-primary-900 focus-visible:ring-primary-500 px-sm py-xs rounded transition-colors focus:outline-none focus-visible:ring-2"
            >
              {isExpanded ? "▲" : "▼"}
            </button>
          </TableCell>
        )}
      </tr>
      {isExpanded && hasExpandableContent && (
        <tr className="border-secondary-200 border-b bg-white xl:hidden">
          <td colSpan={cells.length + 1} className="p-md">
            <div className="space-y-xs">
              {expandableCells.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-secondary-500 text-sm font-medium">{item.label}:</span>
                  <span className="text-secondary-700 mt-xs">{item.content}</span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
