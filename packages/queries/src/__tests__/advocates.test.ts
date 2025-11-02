import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAdvocatesPaginated } from "../advocates";
import { createMockAdvocates } from "@repo/database/testing";

const mockAdvocates = createMockAdvocates(2);

describe("fetchAdvocatesPaginated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should fetch advocates successfully and return success response", async () => {
    const mockPaginatedResponse = {
      success: true,
      data: mockAdvocates,
      pagination: {
        currentPage: 1,
        pageSize: 25,
        totalRecords: 2,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockPaginatedResponse,
    } as Response);

    const result = await fetchAdvocatesPaginated();

    expect(result).toEqual(mockPaginatedResponse);
    expect(global.fetch).toHaveBeenCalledWith("/api/advocates", {
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should return API response with data array", async () => {
    const mockPaginatedResponse = {
      success: true,
      data: mockAdvocates,
      pagination: {
        currentPage: 1,
        pageSize: 25,
        totalRecords: 2,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockPaginatedResponse,
    } as Response);

    const result = await fetchAdvocatesPaginated();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.pagination).toBeDefined();
      expect(result.pagination?.totalRecords).toBe(2);
    }
  });

  it("should return error response when API returns error", async () => {
    const errorResponse = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Advocates not found",
        details: "No advocates in database",
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => errorResponse,
    } as Response);

    const result = await fetchAdvocatesPaginated();

    expect(result).toEqual(errorResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe("NOT_FOUND");
      expect(result.error.message).toBe("Advocates not found");
    }
  });

  it("should throw error when HTTP response is not ok", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(fetchAdvocatesPaginated()).rejects.toThrow("API request failed: 404 Not Found");
  });

  it("should include status code in error message", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchAdvocatesPaginated()).rejects.toThrow(
      "API request failed: 500 Internal Server Error"
    );
  });

  it("should return properly typed Advocate array in success response", async () => {
    const mockPaginatedResponse = {
      success: true,
      data: mockAdvocates,
      pagination: {
        currentPage: 1,
        pageSize: 25,
        totalRecords: 2,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockPaginatedResponse,
    } as Response);

    const result = await fetchAdvocatesPaginated();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
      expect(result.data[0]).toHaveProperty("id");
      expect(result.data[0]).toHaveProperty("firstName");
      expect(result.data[0]).toHaveProperty("lastName");
      expect(result.data[0]).toHaveProperty("cityId");
      expect(result.data[0]).toHaveProperty("degreeId");
      expect(result.data[0]).toHaveProperty("phoneNumber");
      expect(result.data[0]).toHaveProperty("yearsOfExperience");
    }
  });

  it("should handle empty data array in success response", async () => {
    const mockPaginatedResponse = {
      success: true,
      data: [],
      pagination: {
        currentPage: 1,
        pageSize: 25,
        totalRecords: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockPaginatedResponse,
    } as Response);

    const result = await fetchAdvocatesPaginated();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    }
  });

  it("should throw error when fetch fails with network error", async () => {
    const networkError = new Error("Network error");
    vi.mocked(global.fetch).mockRejectedValue(networkError);

    await expect(fetchAdvocatesPaginated()).rejects.toThrow("Network error");
  });

  it("should throw error when response JSON is invalid", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response);

    await expect(fetchAdvocatesPaginated()).rejects.toThrow("Invalid JSON");
  });
});
