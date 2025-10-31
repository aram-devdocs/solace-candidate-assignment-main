import React, { useEffect, useState } from "react";
import type { Advocate } from "@repo/types";
import { fetchAdvocates } from "@repo/queries";
import { filterAdvocates } from "@repo/utils";
import { useDebouncedValue } from "./use-debounced-value";

/**
 * Comprehensive hook for advocate search functionality.
 *
 * Handles all business logic for the advocate search feature:
 * - Fetches advocates from API on mount
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
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  useEffect(() => {
    let isMounted = true;

    fetchAdvocates()
      .then((data) => {
        if (isMounted) {
          setAdvocates(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch advocates");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAdvocates = filterAdvocates(advocates, debouncedSearchTerm);

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
