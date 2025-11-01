import React from "react";
import type { Advocate } from "@repo/types";
import { Text } from "../atoms/Text";
import { SearchBar } from "../molecules/SearchBar";
import { LoadingState } from "../molecules/LoadingState";
import { ErrorState } from "../molecules/ErrorState";
import { AdvocateTable } from "../organisms/AdvocateTable";

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
  if (isLoading) {
    return (
      <main className="p-xl">
        <Text as="h1" variant="h1">
          Solace Advocates
        </Text>
        <LoadingState message="Loading advocates..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-xl">
        <Text as="h1" variant="h1">
          Solace Advocates
        </Text>
        <ErrorState error={error} />
      </main>
    );
  }

  return (
    <main className="p-xl">
      <Text as="h1" variant="h1">
        Solace Advocates
      </Text>
      <div className="my-2xl">
        <SearchBar value={searchTerm} onChange={onSearchChange} onReset={onResetSearch} />
      </div>
      <div className="my-2xl">
        <AdvocateTable advocates={advocates} />
      </div>
    </main>
  );
};
