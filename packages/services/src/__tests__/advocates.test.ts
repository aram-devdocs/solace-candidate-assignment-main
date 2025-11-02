import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllAdvocates, getAdvocateById } from "../advocates";
import { createMockAdvocates, createMockAdvocate } from "@repo/database/testing";
import { isSuccess, isFailure } from "@repo/types";

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

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data).toEqual(mockAdvocates);
    }
    expect(db.select).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalled();
  });

  it("should return array of advocates", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue(mockAdvocates);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).toHaveLength(3);
    }
  });

  it("should return empty array when no advocates exist", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue([]);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    }
  });

  it("should return failure when database query fails", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockRejectedValue(new Error("Database connection failed"));
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error.message).toBe("Failed to retrieve advocates");
    }
  });

  it("should include error details in failure result", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockRejectedValue(new Error("Query timeout"));
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error.message).toBe("Failed to retrieve advocates");
      expect(result.error.details).toBe("Query timeout");
    }
  });

  it("should return properly typed Advocate array", async () => {
    const { db } = await import("@repo/database");
    const mockFrom = vi.fn().mockResolvedValue(mockAdvocates);
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAllAdvocates();

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data[0]).toHaveProperty("firstName");
      expect(result.data[0]).toHaveProperty("lastName");
      expect(result.data[0]).toHaveProperty("city");
      expect(result.data[0]).toHaveProperty("degree");
      expect(result.data[0]).toHaveProperty("specialties");
      expect(result.data[0]).toHaveProperty("phoneNumber");
    }
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

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data).toEqual(mockAdvocate);
    }
    expect(db.select).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalled();
    expect(mockWhere).toHaveBeenCalled();
  });

  it("should return NotFoundError when advocate not found", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(999);

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error.code).toBe("NOT_FOUND");
      expect(result.error.message).toContain("Advocate");
      expect(result.error.message).toContain("999");
    }
  });

  it("should return first advocate when multiple results returned", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([mockAdvocate, createMockAdvocate({ id: 2 })]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data).toEqual(mockAdvocate);
      expect(result.data.id).toBe(1);
    }
  });

  it("should return failure when database query fails", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockRejectedValue(new Error("Database error"));
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error.message).toContain("Failed to retrieve advocate 1");
    }
  });

  it("should include advocate id in error details", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockRejectedValue(new Error("Connection lost"));
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(42);

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error.message).toContain("42");
      expect(result.error.details).toBe("Connection lost");
    }
  });

  it("should return properly typed Advocate when found", async () => {
    const { db } = await import("@repo/database");
    const mockWhere = vi.fn().mockResolvedValue([mockAdvocate]);
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as never);

    const result = await getAdvocateById(1);

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data).toHaveProperty("firstName");
      expect(result.data).toHaveProperty("lastName");
      expect(result.data).toHaveProperty("city");
    }
  });
});
