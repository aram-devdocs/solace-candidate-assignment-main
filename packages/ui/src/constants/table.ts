import type { Advocate } from "@repo/types";

/**
 * Column identifiers for the Advocate table
 * Typed from the Advocate interface for type safety
 */
export type AdvocateColumnKey = keyof Pick<
  Advocate,
  "firstName" | "lastName" | "city" | "degree" | "specialties" | "yearsOfExperience" | "phoneNumber"
>;

/**
 * Column visibility configuration for different device sizes
 * Defines which columns appear at each breakpoint
 */
export const ADVOCATE_TABLE_COLUMNS: Record<
  "mobile" | "tablet" | "desktop",
  readonly AdvocateColumnKey[]
> = {
  mobile: ["firstName", "lastName", "city"],
  tablet: ["firstName", "lastName", "city", "degree", "specialties"],
  desktop: [
    "firstName",
    "lastName",
    "city",
    "degree",
    "specialties",
    "yearsOfExperience",
    "phoneNumber",
  ],
} as const;

/**
 * Human-readable column header labels
 */
export const ADVOCATE_TABLE_HEADERS: Record<AdvocateColumnKey, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  city: "City",
  degree: "Degree",
  specialties: "Specialties",
  yearsOfExperience: "Years of Experience",
  phoneNumber: "Phone Number",
} as const;

/**
 * Columns that should be hidden on mobile but shown in expandable card
 */
export const EXPANDABLE_COLUMNS: readonly AdvocateColumnKey[] = [
  "degree",
  "specialties",
  "yearsOfExperience",
  "phoneNumber",
] as const;
