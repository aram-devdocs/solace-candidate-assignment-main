import React from "react";
import { SkeletonTableHeader } from "../molecules/SkeletonTableHeader";
import { SkeletonTableRow } from "../molecules/SkeletonTableRow";

export interface SkeletonAdvocateTableProps {
  /**
   * Number of skeleton rows to display
   */
  rowCount?: number;
}

/**
 * SkeletonAdvocateTable component for loading state
 *
 * Displays skeleton placeholder matching AdvocateTable layout
 *
 * @param rowCount - Number of skeleton rows to display (default: 7)
 */
export const SkeletonAdvocateTable: React.FC<SkeletonAdvocateTableProps> = ({ rowCount = 7 }) => {
  return (
    <div className="border-secondary-200 overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse">
        <SkeletonTableHeader />
        <tbody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <SkeletonTableRow key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
