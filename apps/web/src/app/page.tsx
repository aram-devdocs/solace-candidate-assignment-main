"use client";

import { useAdvocateSearch } from "@repo/hooks";
import { AdvocateListTemplate } from "@repo/ui";

export default function Home() {
  const { searchTerm, filteredAdvocates, isLoading, error, handleSearchChange, handleResetSearch } =
    useAdvocateSearch();

  return (
    <AdvocateListTemplate
      advocates={filteredAdvocates}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onResetSearch={handleResetSearch}
      isLoading={isLoading}
      error={error || undefined}
    />
  );
}
