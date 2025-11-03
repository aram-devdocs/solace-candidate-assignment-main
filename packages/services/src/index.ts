/**
 * Business Logic Services
 *
 * Business logic layer that orchestrates database operations.
 * Provides abstraction between API routes and data access layer.
 */

export {
  getAllAdvocates,
  getAdvocateById,
  getAdvocatesPaginated,
  searchAdvocates,
  getAdvocateFilterOptions,
  invalidateAdvocateCaches,
  healthCheck,
} from "./advocates";
