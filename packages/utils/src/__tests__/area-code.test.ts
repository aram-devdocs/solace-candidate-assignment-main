import { describe, expect, it } from "vitest";
import { extractAreaCode, getUniqueAreaCodes } from "../area-code";
import type { Advocate } from "@repo/types";

describe("extractAreaCode", () => {
  it("extracts area code from a valid 10-digit phone number", () => {
    expect(extractAreaCode(5551234567)).toBe("555");
    expect(extractAreaCode(2025551234)).toBe("202");
    expect(extractAreaCode(9876543210)).toBe("987");
  });

  it("handles phone numbers with leading zeros in area code", () => {
    expect(extractAreaCode(1234567890)).toBe("123");
    expect(extractAreaCode(234567890)).toBe("023");
    expect(extractAreaCode(34567890)).toBe("003");
  });

  it("pads area codes with leading zeros when necessary", () => {
    expect(extractAreaCode(1234567)).toBe("000");
    expect(extractAreaCode(12345678)).toBe("001");
    expect(extractAreaCode(123456789)).toBe("012");
  });

  it("handles edge cases", () => {
    expect(extractAreaCode(0)).toBe("000");
    expect(extractAreaCode(9999999999)).toBe("999");
  });
});

describe("getUniqueAreaCodes", () => {
  const createAdvocate = (phoneNumber: number): Advocate =>
    ({
      id: 1,
      firstName: "Test",
      lastName: "User",
      city: "City",
      degree: "MD",
      specialties: [],
      yearsOfExperience: 5,
      phoneNumber,
      createdAt: null,
    }) as Advocate;

  it("returns unique area codes from advocates", () => {
    const advocates = [
      createAdvocate(5551234567),
      createAdvocate(5559876543),
      createAdvocate(2025551234),
    ];

    const result = getUniqueAreaCodes(advocates);
    expect(result).toEqual(["202", "555"]);
  });

  it("removes duplicate area codes", () => {
    const advocates = [
      createAdvocate(5551234567),
      createAdvocate(5559876543),
      createAdvocate(5551111111),
    ];

    const result = getUniqueAreaCodes(advocates);
    expect(result).toEqual(["555"]);
  });

  it("returns sorted area codes", () => {
    const advocates = [
      createAdvocate(9876543210),
      createAdvocate(2025551234),
      createAdvocate(5551234567),
    ];

    const result = getUniqueAreaCodes(advocates);
    expect(result).toEqual(["202", "555", "987"]);
  });

  it("handles empty array", () => {
    const result = getUniqueAreaCodes([]);
    expect(result).toEqual([]);
  });

  it("handles single advocate", () => {
    const advocates = [createAdvocate(5551234567)];
    const result = getUniqueAreaCodes(advocates);
    expect(result).toEqual(["555"]);
  });

  it("handles area codes with leading zeros", () => {
    const advocates = [createAdvocate(234567890), createAdvocate(2345678901)];

    const result = getUniqueAreaCodes(advocates);
    expect(result).toEqual(["023", "234"]);
  });
});
