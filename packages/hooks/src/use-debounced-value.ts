import { useEffect, useState } from "react";

const DEBOUNCE_DELAY_MS = 300;

/**
 * Debounces a value by delaying updates until after a specified delay.
 *
 * Useful for expensive operations like search filtering or API calls
 * that should not trigger on every keystroke.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (defaults to 300ms)
 * @returns The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebouncedValue(searchTerm);
 *
 * useEffect(() => {
 *   // This only runs 300ms after user stops typing
 *   performSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export function useDebouncedValue<T>(value: T, delay: number = DEBOUNCE_DELAY_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
