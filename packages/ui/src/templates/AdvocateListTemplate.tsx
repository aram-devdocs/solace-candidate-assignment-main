import React from "react";
import type { Advocate } from "@repo/types";
import { Greeting } from "../molecules/Greeting";
import { SearchBar } from "../molecules/SearchBar";
import { ErrorState } from "../molecules/ErrorState";
import { AdvocateTable } from "../organisms/AdvocateTable";
import { SkeletonGreeting } from "../molecules/SkeletonGreeting";
import { SkeletonSearchBar } from "../molecules/SkeletonSearchBar";
import { SkeletonAdvocateTable } from "../organisms/SkeletonAdvocateTable";
import type { DeviceSize } from "@repo/utils";

export interface AdvocateListTemplateProps {
  advocates: Advocate[];
  searchTerm: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetSearch: () => void;
  isLoading?: boolean;
  error?: string;
  /**
   * Current device size (from useDeviceSize hook in parent)
   */
  deviceSize: DeviceSize;
  /**
   * Set of expanded row indices (from useExpandableRows hook in parent)
   */
  expandedRows?: Set<number>;
  /**
   * Callback to toggle row expansion
   */
  onToggleRow?: (index: number) => void; // eslint-disable-line no-unused-vars
}

/**
 * AdvocateListTemplate complete page layout with search and table
 * Responsive: Adjusts padding and spacing for different screen sizes
 * Mobile: p-md, my-lg
 * Tablet: p-lg, my-xl
 * Desktop: p-xl, my-2xl
 *
 * @param advocates - Array of advocates to display
 * @param searchTerm - Current search term
 * @param onSearchChange - Handler for search input changes
 * @param onResetSearch - Handler for reset button click
 * @param isLoading - Loading state
 * @param error - Error message if any
 */
export const AdvocateListTemplate: React.FC<AdvocateListTemplateProps> = ({
  advocates,
  searchTerm,
  onSearchChange,
  onResetSearch,
  isLoading = false,
  error,
  deviceSize,
  expandedRows,
  onToggleRow,
}) => {
  const getTimePeriod = (): "morning" | "afternoon" | "evening" => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const paddingClasses = "p-md md:p-lg lg:p-xl";
  const spacingClasses = "my-lg md:my-xl lg:my-2xl";

  if (isLoading) {
    return (
      <main className={paddingClasses}>
        <div className={spacingClasses}>
          <SkeletonGreeting />
        </div>
        <div className={spacingClasses}>
          <SkeletonSearchBar />
        </div>
        <div className={spacingClasses}>
          <SkeletonAdvocateTable />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={paddingClasses}>
        <div className={spacingClasses}>
          <Greeting userName="Aram" timePeriod={getTimePeriod()} />
        </div>
        <ErrorState error={error} />
      </main>
    );
  }

  return (
    <main className={paddingClasses}>
      <div className={spacingClasses}>
        <Greeting userName="Aram" timePeriod={getTimePeriod()} />
      </div>
      <div className={spacingClasses}>
        <SearchBar value={searchTerm} onChange={onSearchChange} onReset={onResetSearch} />
      </div>
      <div className={spacingClasses}>
        <AdvocateTable
          advocates={advocates}
          deviceSize={deviceSize}
          expandedRows={expandedRows}
          onToggleRow={onToggleRow}
        />
      </div>
    </main>
  );
};
