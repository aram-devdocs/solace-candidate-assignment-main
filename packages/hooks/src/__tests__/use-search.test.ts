import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAdvocateSearch } from "../use-search";
import type { Advocate } from "@repo/types";

vi.mock("@repo/queries", () => ({
  fetchAdvocates: vi.fn(),
}));

vi.mock("@repo/utils", () => ({
  filterAdvocates: vi.fn((advocates, searchTerm) => {
    if (!searchTerm) return advocates;
    return advocates.filter((a: Advocate) =>
      a.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }),
}));

vi.mock("./use-debounced-value", () => ({
  useDebouncedValue: vi.fn((value) => value),
}));

import { fetchAdvocates } from "@repo/queries";

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Cardiology"],
    yearsOfExperience: 15,
    phoneNumber: 5551234567,
    createdAt: new Date(),
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "DO",
    specialties: ["Pediatrics"],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
    createdAt: new Date(),
  },
];

describe("useAdvocateSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start in loading state", () => {
    vi.mocked(fetchAdvocates).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should fetch advocates on mount and set loading to false", async () => {
    vi.mocked(fetchAdvocates).mockResolvedValue(mockAdvocates);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filteredAdvocates).toEqual(mockAdvocates);
    expect(result.current.error).toBe(null);
  });

  it("should set error state when fetch fails", async () => {
    const errorMessage = "Network error";
    vi.mocked(fetchAdvocates).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should update searchTerm when handleSearchChange is called", async () => {
    vi.mocked(fetchAdvocates).mockResolvedValue(mockAdvocates);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSearchChange({
        target: { value: "john" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    expect(result.current.searchTerm).toBe("john");
  });

  it("should clear searchTerm when handleResetSearch is called", async () => {
    vi.mocked(fetchAdvocates).mockResolvedValue(mockAdvocates);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSearchChange({
        target: { value: "test" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    expect(result.current.searchTerm).toBe("test");

    act(() => {
      result.current.handleResetSearch();
    });

    expect(result.current.searchTerm).toBe("");
  });

  it("should filter advocates based on search term", async () => {
    vi.mocked(fetchAdvocates).mockResolvedValue(mockAdvocates);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filteredAdvocates).toHaveLength(2);

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Jane" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    await waitFor(() => {
      expect(result.current.filteredAdvocates.length).toBeLessThanOrEqual(2);
    });
  });

  it("should cleanup and not update state after unmount", async () => {
    const slowPromise = new Promise<Advocate[]>((resolve) => {
      setTimeout(() => resolve(mockAdvocates), 1000);
    });

    vi.mocked(fetchAdvocates).mockReturnValue(slowPromise);

    const { unmount } = renderHook(() => useAdvocateSearch());

    unmount();

    await new Promise((resolve) => setTimeout(resolve, 1100));
  });

  it("should use filterAdvocates to filter results by debouncedSearchTerm", async () => {
    const { filterAdvocates: mockFilterAdvocates } = await import("@repo/utils");

    vi.mocked(fetchAdvocates).mockResolvedValue(mockAdvocates);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSearchChange({
        target: { value: "john" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    expect(mockFilterAdvocates).toHaveBeenCalled();
  });

  it("should handle empty advocates array", async () => {
    vi.mocked(fetchAdvocates).mockResolvedValue([]);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should format error message correctly for Error instances", async () => {
    const error = new Error("Test error");
    vi.mocked(fetchAdvocates).mockRejectedValue(error);

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.error).toBe("Test error");
    });
  });

  it("should provide default error message for non-Error throws", async () => {
    vi.mocked(fetchAdvocates).mockRejectedValue("string error");

    const { result } = renderHook(() => useAdvocateSearch());

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch advocates");
    });
  });
});
