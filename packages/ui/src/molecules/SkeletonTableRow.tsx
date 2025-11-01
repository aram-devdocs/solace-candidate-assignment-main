import React from "react";
import { SkeletonLine } from "../atoms/SkeletonLine";

/**
 * SkeletonTableRow component for loading state
 *
 * Displays skeleton placeholder matching TableRow layout with 7 columns
 */
export const SkeletonTableRow: React.FC = () => {
  return (
    <tr className="border-secondary-200 hover:bg-primary-50 border-b transition-colors">
      <td className="px-lg py-md">
        <SkeletonLine width="90px" height="1rem" />
      </td>
      <td className="px-lg py-md">
        <SkeletonLine width="85px" height="1rem" />
      </td>
      <td className="px-lg py-md">
        <SkeletonLine width="100px" height="1rem" />
      </td>
      <td className="px-lg py-md">
        <SkeletonLine width="65px" height="1rem" />
      </td>
      <td className="px-lg py-md">
        <div className="space-y-xs">
          <SkeletonLine width="110px" height="1rem" />
          <SkeletonLine width="90px" height="1rem" />
        </div>
      </td>
      <td className="px-lg py-md">
        <SkeletonLine width="25px" height="1rem" />
      </td>
      <td className="px-lg py-md">
        <SkeletonLine width="120px" height="1rem" />
      </td>
    </tr>
  );
};
