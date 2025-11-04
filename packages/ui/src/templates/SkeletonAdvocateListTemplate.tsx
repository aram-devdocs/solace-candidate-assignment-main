import React from "react";
import { SkeletonGreeting } from "../molecules/SkeletonGreeting";
import { SkeletonSearchBar } from "../molecules/SkeletonSearchBar";
import { SkeletonAdvocateTable } from "../organisms/SkeletonAdvocateTable";

export interface SkeletonAdvocateListTemplateProps {
  /**
   * Number of skeleton table rows to display
   */
  rowCount?: number;
}

/**
 * SkeletonAdvocateListTemplate - loading state skeleton for AdvocateListTemplate
 *
 * @param rowCount - Number of skeleton table rows to display (default: 7)
 */
export const SkeletonAdvocateListTemplate: React.FC<SkeletonAdvocateListTemplateProps> = ({
  rowCount = 7,
}) => {
  return (
    <div className="p-xl">
      <div className="my-2xl">
        <SkeletonGreeting />
      </div>
      <div className="my-2xl">
        <SkeletonSearchBar />
      </div>
      <div className="my-2xl">
        <SkeletonAdvocateTable rowCount={rowCount} />
      </div>
    </div>
  );
};
