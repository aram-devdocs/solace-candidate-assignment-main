import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "../client";

describe("apiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should make successful API request with default config", async () => {
    const mockData = { id: 1, name: "test" };
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockData }),
    } as Response);

    const result = await apiClient<typeof mockData>("/api/test");

    expect(result).toEqual({ success: true, data: mockData });
    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should include custom headers in request", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    await apiClient("/api/test", {
      headers: { Authorization: "Bearer token" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        }),
      })
    );
  });

  it("should use custom baseUrl when provided", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    await apiClient("/api/test", { baseUrl: "https://example.com" });

    expect(global.fetch).toHaveBeenCalledWith("https://example.com/api/test", {
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should pass through fetch config options", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    await apiClient("/api/test", {
      method: "POST",
      body: JSON.stringify({ test: "data" }),
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ test: "data" }),
    });
  });

  it("should return error response from API", async () => {
    const errorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
        details: "Missing required field",
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => errorResponse,
    } as Response);

    const result = await apiClient("/api/test");

    expect(result).toEqual(errorResponse);
    expect(result.success).toBe(false);
  });

  it("should throw error when HTTP response is not ok", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(apiClient("/api/test")).rejects.toThrow("API request failed: 404 Not Found");
  });

  it("should throw error when HTTP response is 500", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(apiClient("/api/test")).rejects.toThrow(
      "API request failed: 500 Internal Server Error"
    );
  });

  it("should throw error when fetch fails with network error", async () => {
    const networkError = new Error("Network connection failed");
    vi.mocked(global.fetch).mockRejectedValue(networkError);

    await expect(apiClient("/api/test")).rejects.toThrow("Network connection failed");
  });

  it("should throw error when response JSON parsing fails", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response);

    await expect(apiClient("/api/test")).rejects.toThrow("Invalid JSON");
  });

  it("should handle array response data", async () => {
    const mockArray = [
      { id: 1, name: "item1" },
      { id: 2, name: "item2" },
    ];

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockArray }),
    } as Response);

    const result = await apiClient<typeof mockArray>("/api/items");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).toHaveLength(2);
    }
  });
});
