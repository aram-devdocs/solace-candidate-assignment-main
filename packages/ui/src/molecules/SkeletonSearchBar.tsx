import React from "react";
import { SkeletonLine } from "../atoms/SkeletonLine";

/**
 * SkeletonSearchBar component for loading state
 * Responsive: Matches SearchBar responsive layout (stack on mobile, horizontal on tablet+)
 *
 * Displays skeleton placeholder matching SearchBar layout
 */
export const SkeletonSearchBar: React.FC = () => {
  return (
    <div className="space-y-md">
      <SkeletonLine width="60px" height="1.5rem" />
      <SkeletonLine width="150px" height="1.25rem" />
      <div className="gap-md flex flex-col md:flex-row">
        <div className="flex-1">
          <SkeletonLine height="2.5rem" rounded="lg" />
        </div>
        <SkeletonLine width="130px" height="2.5rem" rounded="lg" />
      </div>
    </div>
  );
};
