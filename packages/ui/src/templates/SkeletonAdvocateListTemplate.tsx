import React from "react";
import { Text } from "../atoms/Text";
import { SkeletonSearchBar } from "../molecules/SkeletonSearchBar";
import { SkeletonAdvocateTable } from "../organisms/SkeletonAdvocateTable";

export interface SkeletonAdvocateListTemplateProps {
  /**
   * Number of skeleton table rows to display
   */
  rowCount?: number;
}

/**
 * SkeletonAdvocateListTemplate - complete page skeleton for loading state
 *
 * Displays skeleton placeholder matching AdvocateListTemplate layout
 *
 * @param rowCount - Number of skeleton table rows to display (default: 7)
 */
export const SkeletonAdvocateListTemplate: React.FC<SkeletonAdvocateListTemplateProps> = ({
  rowCount = 7,
}) => {
  return (
    <main className="p-xl">
      <Text as="h1" variant="h1">
        Solace Advocates
      </Text>
      <div className="my-2xl">
        <SkeletonSearchBar />
      </div>
      <div className="my-2xl">
        <SkeletonAdvocateTable rowCount={rowCount} />
      </div>
    </main>
  );
};
