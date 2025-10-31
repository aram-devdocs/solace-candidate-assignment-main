import { describe, it, expect } from "vitest";
import { filterAdvocates } from "../search";
import { mockAdvocates } from "./fixtures/advocates";

describe("filterAdvocates", () => {
  it("should return all advocates when search term is empty", () => {
    const result = filterAdvocates(mockAdvocates, "");
    expect(result).toEqual(mockAdvocates);
    expect(result).toHaveLength(5);
  });

  it("should return all advocates when search term is only whitespace", () => {
    const result = filterAdvocates(mockAdvocates, "   ");
    expect(result).toEqual(mockAdvocates);
    expect(result).toHaveLength(5);
  });

  it("should filter by firstName case-insensitively", () => {
    const result = filterAdvocates(mockAdvocates, "john");
    expect(result).toHaveLength(2);
    expect(result[0].firstName).toBe("John");
    expect(result[1].firstName).toBe("Michael");
  });

  it("should filter by lastName case-insensitively", () => {
    const result = filterAdvocates(mockAdvocates, "smith");
    expect(result).toHaveLength(1);
    expect(result[0].lastName).toBe("Smith");
  });

  it("should filter by city", () => {
    const result = filterAdvocates(mockAdvocates, "chicago");
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe("Chicago");
  });

  it("should filter by degree", () => {
    const result = filterAdvocates(mockAdvocates, "MD");
    expect(result).toHaveLength(2);
    expect(result[0].degree).toBe("MD");
    expect(result[1].degree).toBe("MD");
  });

  it("should filter by specialty in specialties array", () => {
    const result = filterAdvocates(mockAdvocates, "cardiology");
    expect(result).toHaveLength(1);
    expect(result[0].specialties).toContain("Cardiology");
  });

  it("should filter by phone number", () => {
    const result = filterAdvocates(mockAdvocates, "555");
    expect(result).toHaveLength(5);
  });

  it("should match partial strings", () => {
    const result = filterAdvocates(mockAdvocates, "Wil");
    expect(result).toHaveLength(1);
    expect(result[0].lastName).toBe("Williams");
  });

  it("should return multiple advocates matching different fields", () => {
    const result = filterAdvocates(mockAdvocates, "surgery");
    expect(result).toHaveLength(1);
    expect(result[0].specialties).toContain("Surgery");
  });

  it("should return empty array when no advocates match", () => {
    const result = filterAdvocates(mockAdvocates, "xyz123notfound");
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("should trim whitespace from search term before filtering", () => {
    const result = filterAdvocates(mockAdvocates, "  john  ");
    expect(result).toHaveLength(2);
    expect(result[0].firstName).toBe("John");
  });
});
