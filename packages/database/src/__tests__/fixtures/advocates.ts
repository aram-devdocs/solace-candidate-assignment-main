import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { advocates } from "../../schema";

type Advocate = InferSelectModel<typeof advocates>;
type NewAdvocate = InferInsertModel<typeof advocates>;

/**
 * Creates a mock Advocate with default values.
 * All fields can be overridden via the overrides parameter.
 *
 * @param overrides - Partial Advocate object to override defaults
 * @returns Complete Advocate object with type safety
 *
 * @example
 * const advocate = createMockAdvocate({ firstName: "Test" });
 */
export function createMockAdvocate(overrides?: Partial<Advocate>): Advocate {
  return {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    cityId: 1,
    degreeId: 1,
    yearsOfExperience: 10,
    phoneNumber: "5551234567",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    deletedAt: null,
    ...overrides,
  };
}

/**
 * Creates a mock NewAdvocate (for inserts) with default values.
 * All fields can be overridden via the overrides parameter.
 *
 * @param overrides - Partial NewAdvocate object to override defaults
 * @returns Complete NewAdvocate object for database inserts
 *
 * @example
 * const newAdvocate = createMockNewAdvocate({ lastName: "Smith" });
 */
export function createMockNewAdvocate(overrides?: Partial<NewAdvocate>): NewAdvocate {
  return {
    firstName: "John",
    lastName: "Doe",
    cityId: 1,
    degreeId: 1,
    yearsOfExperience: 10,
    phoneNumber: "5551234567",
    ...overrides,
  };
}

/**
 * Creates an array of mock Advocates for testing list operations.
 *
 * @param count - Number of mock advocates to generate (default: 5)
 * @returns Array of Advocate objects with varied data
 *
 * @example
 * const advocates = createMockAdvocates(10);
 */
export function createMockAdvocates(count: number = 5): Advocate[] {
  const firstNames = ["John", "Jane", "Alice", "Michael", "Emily", "Chris", "Sarah", "David"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Davis", "Martinez", "Lee", "Wilson"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    cityId: (i % 3) + 1,
    degreeId: (i % 3) + 1,
    yearsOfExperience: 5 + (i % 15),
    phoneNumber: `555${String(1234567 + i).padStart(7, "0")}`,
    isActive: true,
    createdAt: new Date(`2024-01-${String((i % 28) + 1).padStart(2, "0")}`),
    updatedAt: new Date(`2024-01-${String((i % 28) + 1).padStart(2, "0")}`),
    deletedAt: null,
  }));
}

/**
 * Pre-generated mock advocates array for quick testing.
 * Use this for tests that don't need custom data.
 * Data is aligned with existing test expectations for backward compatibility.
 */
export const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    cityId: 1,
    degreeId: 1,
    yearsOfExperience: 15,
    phoneNumber: "5551234567",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    deletedAt: null,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    cityId: 2,
    degreeId: 2,
    yearsOfExperience: 8,
    phoneNumber: "5559876543",
    isActive: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
    deletedAt: null,
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    cityId: 3,
    degreeId: 1,
    yearsOfExperience: 20,
    phoneNumber: "5555555555",
    isActive: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
    deletedAt: null,
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    cityId: 1,
    degreeId: 2,
    yearsOfExperience: 12,
    phoneNumber: "5551112222",
    isActive: true,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
    deletedAt: null,
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    cityId: 2,
    degreeId: 3,
    yearsOfExperience: 10,
    phoneNumber: "5553334444",
    isActive: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    deletedAt: null,
  },
];
