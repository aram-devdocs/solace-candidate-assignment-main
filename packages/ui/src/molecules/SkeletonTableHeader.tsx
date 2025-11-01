import React from "react";
import { SkeletonLine } from "../atoms/SkeletonLine";

/**
 * SkeletonTableHeader component for loading state
 *
 * Displays skeleton placeholder matching TableHeader layout with 7 columns
 */
export const SkeletonTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-secondary-50 border-secondary-300 border-b-2">
        <th className="px-lg py-md text-left">
          <SkeletonLine width="80px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="75px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="45px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="60px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="85px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="140px" height="1rem" />
        </th>
        <th className="px-lg py-md text-left">
          <SkeletonLine width="110px" height="1rem" />
        </th>
      </tr>
    </thead>
  );
};
