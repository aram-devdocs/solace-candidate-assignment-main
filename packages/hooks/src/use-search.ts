import React, { useState, useMemo } from "react";
import type { Advocate } from "@repo/types";
import { useAdvocates } from "@repo/queries";
import { filterAdvocatesBySearch } from "@repo/utils";
import { useDebouncedValue } from "./use-debounced-value";

/**
 * Comprehensive hook for advocate search functionality.
 *
 * Handles all business logic for the advocate search feature:
 * - Fetches advocates from API using React Query
 * - Manages search term state
 * - Debounces search input
 * - Filters advocates based on search term
 * - Provides handlers for search input and reset
 * - Tracks loading and error states
 *
 * @returns Object containing all state and handlers needed for advocate search UI
 *
 */
export function useAdvocateSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const { data: response, isLoading, error: queryError } = useAdvocates();

  const advocates: Advocate[] = response?.success ? response.data : [];
  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to fetch advocates"
    : response?.success === false
      ? response.error.message
      : null;

  const filteredAdvocates = useMemo(
    () => filterAdvocatesBySearch(advocates, debouncedSearchTerm),
    [advocates, debouncedSearchTerm]
  );

  const handleSearchChange = (e: React.ChangeEvent<React.ElementRef<"input">>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    filteredAdvocates,
    isLoading,
    error,
    handleSearchChange,
    handleResetSearch,
  };
}
