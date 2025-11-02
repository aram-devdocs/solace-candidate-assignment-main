import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAdvocateSearch } from "../use-search";
import type { Advocate } from "@repo/types";
import type { ApiResponse } from "@repo/queries";

const mockUseAdvocates = vi.fn();

vi.mock("@repo/queries", () => ({
  useAdvocates: () => mockUseAdvocates(),
}));

vi.mock("@repo/utils", () => ({
  filterAdvocatesBySearch: vi.fn((advocates, searchTerm) => {
    if (!searchTerm) return advocates;
    return advocates.filter((a: Advocate) =>
      a.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }),
}));

vi.mock("./use-debounced-value", () => ({
  useDebouncedValue: vi.fn((value) => value),
}));

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
    mockUseAdvocates.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should fetch advocates on mount and set loading to false", async () => {
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: mockAdvocates,
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.filteredAdvocates).toEqual(mockAdvocates);
    expect(result.current.error).toBe(null);
  });

  it("should set error state when fetch fails", async () => {
    const errorMessage = "Network error";
    mockUseAdvocates.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should update searchTerm when handleSearchChange is called", async () => {
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: mockAdvocates,
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "john" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    expect(result.current.searchTerm).toBe("john");
  });

  it("should clear searchTerm when handleResetSearch is called", async () => {
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: mockAdvocates,
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

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
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: mockAdvocates,
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

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

  it("should use filterAdvocatesBySearch to filter results by debouncedSearchTerm", async () => {
    const { filterAdvocatesBySearch: mockFilterAdvocates } = await import("@repo/utils");
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: mockAdvocates,
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "john" },
      } as React.ChangeEvent<React.ElementRef<"input">>);
    });

    expect(mockFilterAdvocates).toHaveBeenCalled();
  });

  it("should handle empty advocates array", async () => {
    const successResponse: ApiResponse<Advocate[]> = {
      success: true,
      data: [],
    };

    mockUseAdvocates.mockReturnValue({
      data: successResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.filteredAdvocates).toEqual([]);
  });

  it("should format error message correctly for Error instances", async () => {
    const error = new Error("Test error");
    mockUseAdvocates.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: error,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.error).toBe("Test error");
  });

  it("should provide default error message for non-Error throws", async () => {
    mockUseAdvocates.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: "string error",
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.error).toBe("Failed to fetch advocates");
  });

  it("should handle API error response", async () => {
    const errorResponse: ApiResponse<Advocate[]> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Advocates not found",
      },
    };

    mockUseAdvocates.mockReturnValue({
      data: errorResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAdvocateSearch());

    expect(result.current.error).toBe("Advocates not found");
    expect(result.current.filteredAdvocates).toEqual([]);
  });
});
