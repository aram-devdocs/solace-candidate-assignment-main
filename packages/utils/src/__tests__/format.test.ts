import { describe, expect, it } from "vitest";
import { formatPhoneNumber } from "../format";

describe("formatPhoneNumber", () => {
  it("formats a valid 10-digit phone number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  it("formats different valid phone numbers correctly", () => {
    expect(formatPhoneNumber("5551234567")).toBe("(555) 123-4567");
    expect(formatPhoneNumber("9876543210")).toBe("(987) 654-3210");
    expect(formatPhoneNumber("2025551234")).toBe("(202) 555-1234");
  });

  it("handles numbers with leading zeros", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  it("returns unformatted string for invalid length numbers", () => {
    expect(formatPhoneNumber("123")).toBe("123");
    expect(formatPhoneNumber("12345")).toBe("12345");
    expect(formatPhoneNumber("123456789012")).toBe("123456789012");
  });

  it("handles edge cases", () => {
    expect(formatPhoneNumber("0")).toBe("0");
    expect(formatPhoneNumber("1111111111")).toBe("(111) 111-1111");
    expect(formatPhoneNumber("9999999999")).toBe("(999) 999-9999");
  });
});
