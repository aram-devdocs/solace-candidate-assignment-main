import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { advocates, cities, degrees, specialties, advocateSpecialties } from "@repo/database";

/**
 * Type representing a complete Advocate record from the database.
 * Auto-generated from Drizzle schema for type safety.
 */
export type Advocate = InferSelectModel<typeof advocates>;

/**
 * Type representing data required to insert a new Advocate record.
 * Auto-generated from Drizzle schema for type safety.
 */
export type NewAdvocate = InferInsertModel<typeof advocates>;

/**
 * Type representing a City record.
 */
export type City = InferSelectModel<typeof cities>;

/**
 * Type representing data required to insert a new City.
 */
export type NewCity = InferInsertModel<typeof cities>;

/**
 * Type representing a Degree record.
 */
export type Degree = InferSelectModel<typeof degrees>;

/**
 * Type representing data required to insert a new Degree.
 */
export type NewDegree = InferInsertModel<typeof degrees>;

/**
 * Type representing a Specialty record.
 */
export type Specialty = InferSelectModel<typeof specialties>;

/**
 * Type representing data required to insert a new Specialty.
 */
export type NewSpecialty = InferInsertModel<typeof specialties>;

/**
 * Type representing an Advocate-Specialty relationship record.
 */
export type AdvocateSpecialty = InferSelectModel<typeof advocateSpecialties>;

/**
 * Type representing data required to insert a new Advocate-Specialty relationship.
 */
export type NewAdvocateSpecialty = InferInsertModel<typeof advocateSpecialties>;

/**
 * Type representing an Advocate with all related data joined.
 * Used for API responses that include city, degree, and specialties.
 */
export type AdvocateWithRelations = Advocate & {
  city: City;
  degree: Degree;
  advocateSpecialties: Array<{
    specialty: Specialty;
  }>;
};

export * from "./result";
export * from "./errors";

/**
 * Pagination parameters for list queries.
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Pagination metadata returned with paginated responses.
 */
export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Filter criteria for querying advocates.
 */
export interface AdvocateFilters {
  search?: string;
  cityIds?: number[];
  degreeIds?: number[];
  specialtyIds?: number[];
  minExperience?: number;
  maxExperience?: number;
  isActive?: boolean;
}

/**
 * Sort configuration for advocate queries.
 */
export interface AdvocateSortConfig {
  column: "firstName" | "lastName" | "city" | "degree" | "yearsOfExperience" | "createdAt";
  direction: "asc" | "desc";
}

/**
 * Paginated response wrapper.
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetadata;
}

/**
 * Filter options available for advocates.
 * Used to populate filter dropdowns in the UI.
 */
export interface AdvocateFilterOptions {
  cities: Array<{ id: number; name: string; count: number }>;
  degrees: Array<{ id: number; code: string; name: string; count: number }>;
  specialties: Array<{ id: number; name: string; count: number }>;
}
