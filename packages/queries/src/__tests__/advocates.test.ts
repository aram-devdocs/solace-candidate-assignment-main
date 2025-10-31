import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAdvocates } from "../advocates";
import type { Advocate } from "@repo/types";

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
    createdAt: new Date("2024-01-01"),
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
    createdAt: new Date("2024-01-02"),
  },
];

describe("fetchAdvocates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should fetch advocates successfully", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAdvocates }),
    } as Response);

    const result = await fetchAdvocates();

    expect(result).toEqual(mockAdvocates);
    expect(global.fetch).toHaveBeenCalledWith("/api/advocates");
  });

  it("should return data array from response", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAdvocates }),
    } as Response);

    const result = await fetchAdvocates();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("should throw error when response is not ok", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchAdvocates()).rejects.toThrow("Failed to fetch advocates: Not Found");
  });

  it("should include statusText in error message", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchAdvocates()).rejects.toThrow(
      "Failed to fetch advocates: Internal Server Error"
    );
  });

  it("should handle response without data property", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await fetchAdvocates();

    expect(result).toBeUndefined();
  });

  it("should return properly typed Advocate array", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAdvocates }),
    } as Response);

    const result = await fetchAdvocates();

    expect(result).toBeDefined();
    expect(result[0]).toHaveProperty("firstName");
    expect(result[0]).toHaveProperty("lastName");
    expect(result[0]).toHaveProperty("city");
    expect(result[0]).toHaveProperty("degree");
    expect(result[0]).toHaveProperty("specialties");
    expect(result[0]).toHaveProperty("phoneNumber");
  });

  it("should handle empty data array", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    const result = await fetchAdvocates();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("should throw error when fetch fails with network error", async () => {
    const networkError = new Error("Network error");
    vi.mocked(global.fetch).mockRejectedValue(networkError);

    await expect(fetchAdvocates()).rejects.toThrow("Network error");
  });

  it("should throw error when response JSON is invalid", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response);

    await expect(fetchAdvocates()).rejects.toThrow("Invalid JSON");
  });
});
