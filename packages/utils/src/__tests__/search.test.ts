import { describe, it, expect } from "vitest";
import { filterAdvocatesBySearch } from "../filter";
import { mockAdvocates } from "@repo/database/testing";

describe("filterAdvocatesBySearch", () => {
  it("should return all advocates when search term is empty", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "");
    expect(result).toEqual(mockAdvocates);
    expect(result).toHaveLength(5);
  });

  it("should return all advocates when search term is only whitespace", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "   ");
    expect(result).toEqual(mockAdvocates);
    expect(result).toHaveLength(5);
  });

  it("should filter by firstName case-insensitively", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "john");
    expect(result).toHaveLength(2);
    expect(result[0].firstName).toBe("John");
    expect(result[1].firstName).toBe("Michael");
  });

  it("should filter by lastName case-insensitively", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "smith");
    expect(result).toHaveLength(1);
    expect(result[0].lastName).toBe("Smith");
  });

  it("should filter by city", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "chicago");
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe("Chicago");
  });

  it("should filter by degree", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "MD");
    expect(result).toHaveLength(2);
    expect(result[0].degree).toBe("MD");
    expect(result[1].degree).toBe("MD");
  });

  it("should filter by specialty in specialties array", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "cardiology");
    expect(result).toHaveLength(1);
    expect(result[0].specialties).toContain("Cardiology");
  });

  it("should filter by phone number", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "555");
    expect(result).toHaveLength(5);
  });

  it("should match partial strings", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "Wil");
    expect(result).toHaveLength(1);
    expect(result[0].lastName).toBe("Williams");
  });

  it("should return multiple advocates matching different fields", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "surgery");
    expect(result).toHaveLength(1);
    expect(result[0].specialties).toContain("Surgery");
  });

  it("should return empty array when no advocates match", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "xyz123notfound");
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("should trim whitespace from search term before filtering", () => {
    const result = filterAdvocatesBySearch(mockAdvocates, "  john  ");
    expect(result).toHaveLength(2);
    expect(result[0].firstName).toBe("John");
  });
});
