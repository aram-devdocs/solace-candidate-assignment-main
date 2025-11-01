"use client";

import { useAdvocateSearch, useDeviceSize, useExpandableRows } from "@repo/hooks";
import { AdvocateListTemplate } from "@repo/ui";

export const dynamic = "force-dynamic";

export default function Home() {
  const { searchTerm, filteredAdvocates, isLoading, error, handleSearchChange, handleResetSearch } =
    useAdvocateSearch();

  const deviceSize = useDeviceSize();
  const { expandedRows, toggleRow } = useExpandableRows(filteredAdvocates.length);

  return (
    <AdvocateListTemplate
      advocates={filteredAdvocates}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onResetSearch={handleResetSearch}
      isLoading={isLoading}
      error={error || undefined}
      deviceSize={deviceSize}
      expandedRows={expandedRows}
      onToggleRow={toggleRow}
    />
  );
}
