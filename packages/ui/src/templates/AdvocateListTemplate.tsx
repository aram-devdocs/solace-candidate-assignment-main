import React from "react";
import type { Advocate } from "@repo/types";
import { Greeting } from "../molecules/Greeting";
import { SearchBar } from "../molecules/SearchBar";
import { ErrorState } from "../molecules/ErrorState";
import { AdvocateTable } from "../organisms/AdvocateTable";
import { SkeletonSearchBar } from "../molecules/SkeletonSearchBar";
import { SkeletonAdvocateTable } from "../organisms/SkeletonAdvocateTable";

export interface AdvocateListTemplateProps {
  advocates: Advocate[];
  searchTerm: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetSearch: () => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * AdvocateListTemplate complete page layout with search and table
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
}) => {
  const getTimePeriod = (): "morning" | "afternoon" | "evening" => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  if (isLoading) {
    return (
      <main className="p-xl">
        <Greeting userName="Aram" timePeriod={getTimePeriod()} />
        <div className="my-2xl">
          <SkeletonSearchBar />
        </div>
        <div className="my-2xl">
          <SkeletonAdvocateTable />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-xl">
        <Greeting userName="Aram" timePeriod={getTimePeriod()} />
        <ErrorState error={error} />
      </main>
    );
  }

  return (
    <main className="p-xl">
      <Greeting userName="Aram" timePeriod={getTimePeriod()} />
      <div className="my-2xl">
        <SearchBar value={searchTerm} onChange={onSearchChange} onReset={onResetSearch} />
      </div>
      <div className="my-2xl">
        <AdvocateTable advocates={advocates} />
      </div>
    </main>
  );
};
