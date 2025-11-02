import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllAdvocates, getAdvocateById } from "../advocates";
import { createMockAdvocates, createMockAdvocate } from "@repo/database/testing";

vi.mock("@repo/database", () => ({
  db: {
    select: vi.fn(),
  },
  advocates: {},
  eq: vi.fn(),
}));

const mockAdvocates = createMockAdvocates(3);
const mockAdvocate = createMockAdvocate({ id: 1 });

describe("getAllAdvocates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve all advocates successfully", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue(mockAdvocates);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(result).toEqual(mockAdvocates);
    expect(db.select).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalled();
  });

  it("should return array of advocates", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue(mockAdvocates);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });

  it("should return empty array when no advocates exist", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue([]);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("should throw error when database query fails", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockRejectedValue(new Error("Database connection failed"));
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    await expect(getAllAdvocates()).rejects.toThrow(
      "Failed to retrieve advocates: Database connection failed"
    );
  });

  it("should include error message in thrown error", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockRejectedValue(new Error("Query timeout"));
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    await expect(getAllAdvocates()).rejects.toThrow("Failed to retrieve advocates: Query timeout");
  });

  it("should return properly typed Advocate array", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue(mockAdvocates);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(result[0]).toHaveProperty("firstName");
    expect(result[0]).toHaveProperty("lastName");
    expect(result[0]).toHaveProperty("city");
    expect(result[0]).toHaveProperty("degree");
    expect(result[0]).toHaveProperty("specialties");
    expect(result[0]).toHaveProperty("phoneNumber");
  });
});

describe("getAdvocateById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve advocate by id successfully", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([mockAdvocate]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(result).toEqual(mockAdvocate);
    expect(db.select).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalled();
    expect(mockWhere).toHaveBeenCalled();
  });

  it("should return null when advocate not found", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(999);

    expect(result).toBeNull();
  });

  it("should return first advocate when multiple results returned", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([mockAdvocate, createMockAdvocate({ id: 2 })]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(result).toEqual(mockAdvocate);
    expect(result?.id).toBe(1);
  });

  it("should throw error when database query fails", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockRejectedValue(new Error("Database error"));
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    await expect(getAdvocateById(1)).rejects.toThrow(
      "Failed to retrieve advocate 1: Database error"
    );
  });

  it("should include advocate id in error message", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockRejectedValue(new Error("Connection lost"));
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    await expect(getAdvocateById(42)).rejects.toThrow(
      "Failed to retrieve advocate 42: Connection lost"
    );
  });

  it("should return properly typed Advocate when found", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([mockAdvocate]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("firstName");
    expect(result).toHaveProperty("lastName");
    expect(result).toHaveProperty("city");
  });
});
