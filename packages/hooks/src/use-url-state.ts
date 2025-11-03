"use client";

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Hook for syncing state with URL query parameters
 * Enables shareable/bookmarkable URLs with filter/sort/pagination state
 *
 * @param key - Query parameter key
 * @param defaultValue - Default value if not in URL
 * @returns Tuple of [value, setValue]
 *
 * @example
 * const [page, setPage] = useUrlState("page", "1");
 * // URL: ?page=2
 * // page === "2"
 *
 * @example
 * const [specialties, setSpecialties] = useUrlState("specialties", "");
 * // URL: ?specialties=PTSD,Anxiety
 * // specialties === "PTSD,Anxiety"
 */
export function useUrlState(key: string, defaultValue: string): [string, (arg: string) => void] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get(key) || defaultValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (value === defaultValue || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [key, value, defaultValue]);

  const handleSetValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return [value, handleSetValue];
}

/**
 * Hook for syncing array state with URL query parameters
 * Uses comma-separated values in URL
 *
 * @param key - Query parameter key
 * @param defaultValue - Default array if not in URL
 * @returns Tuple of [values, setValues]
 *
 * @example
 * const [specialties, setSpecialties] = useUrlArrayState("specialties", []);
 * // URL: ?specialties=PTSD,Anxiety
 * // specialties === ["PTSD", "Anxiety"]
 */
export function useUrlArrayState(
  key: string,
  defaultValue: string[]
): [string[], (arg: string[]) => void] {
  // Memoize default value string to avoid recreating on every render
  const defaultValueString = useMemo(() => defaultValue.join(","), []);
  const [urlValue, setUrlValue] = useUrlState(key, defaultValueString);

  const valuesList = useMemo(() => {
    if (urlValue) {
      const parsed = urlValue.split(",").filter(Boolean);
      return parsed.length > 0 ? parsed : [];
    }
    return [];
  }, [urlValue]);

  const setValues = useCallback(
    (newValues: string[]) => {
      setUrlValue(newValues.join(","));
    },
    [setUrlValue]
  );

  return [valuesList, setValues];
}

/**
 * Hook for syncing numeric state with URL query parameters
 *
 * @param key - Query parameter key
 * @param defaultValue - Default number if not in URL
 * @returns Tuple of [value, setValue]
 *
 * @example
 * const [page, setPage] = useUrlNumberState("page", 1);
 * // URL: ?page=2
 * // page === 2
 */
export function useUrlNumberState(
  key: string,
  defaultValue: number
): [number, (arg: number) => void] {
  const [urlValue, setUrlValue] = useUrlState(key, defaultValue.toString());

  const numValue = parseInt(urlValue, 10) || defaultValue;

  const setValue = useCallback(
    (newValue: number) => {
      setUrlValue(newValue.toString());
    },
    [setUrlValue]
  );

  return [numValue, setValue];
}

/**
 * Hook for syncing numeric array state with URL query parameters
 * Uses comma-separated values in URL
 *
 * @param key - Query parameter key
 * @param defaultValue - Default array if not in URL
 * @returns Tuple of [values, setValues]
 *
 * @example
 * const [cityIds, setCityIds] = useUrlNumberArrayState("cities", []);
 * // URL: ?cities=1,5,12
 * // cityIds === [1, 5, 12]
 */
export function useUrlNumberArrayState(
  key: string,
  defaultValue: number[]
): [number[], (arg: number[]) => void] {
  // Memoize default value string to avoid recreating on every render
  const defaultValueString = useMemo(() => defaultValue.join(","), []);
  const [urlValue, setUrlValue] = useUrlState(key, defaultValueString);

  const valuesList = useMemo(() => {
    if (urlValue) {
      const parsed = urlValue
        .split(",")
        .filter(Boolean)
        .map((v) => parseInt(v, 10))
        .filter((n) => !isNaN(n));
      return parsed.length > 0 ? parsed : [];
    }
    return [];
  }, [urlValue]);

  const setValues = useCallback(
    (newValues: number[]) => {
      setUrlValue(newValues.join(","));
    },
    [setUrlValue]
  );

  return [valuesList, setValues];
}
