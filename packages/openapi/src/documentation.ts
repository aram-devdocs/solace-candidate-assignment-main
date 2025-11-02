import type { OperationObject } from "openapi3-ts/oas31";
import type { HttpMethod } from "./types";
import {
  advocateSchema,
  filterOptionsSchema,
  cacheStatsSchema,
  createPaginatedResponseSchema,
  createSuccessResponseSchema,
  commonResponses,
  pageParameter,
  pageSizeParameter,
} from "./schemas";

/**
 * Route-specific documentation registry
 * Maps route paths and methods to their OpenAPI operation objects
 */
const documentationRegistry = new Map<string, OperationObject>();

/**
 * Registers documentation for a specific route
 *
 * @param path - API path (e.g., "/api/advocates")
 * @param method - HTTP method
 * @param operation - OpenAPI operation object
 */
function registerRoute(path: string, method: HttpMethod, operation: OperationObject): void {
  const key = `${method}:${path}`;
  documentationRegistry.set(key, operation);
}

/**
 * Gets documentation for a specific route
 *
 * @param path - API path
 * @param method - HTTP method
 * @returns OpenAPI operation object or undefined if not found
 */
export function getRouteDocumentation(path: string, method: HttpMethod): OperationObject {
  const key = `${method}:${path}`;
  const doc = documentationRegistry.get(key);

  if (!doc) {
    // Return a minimal operation if no documentation is registered
    return {
      summary: `${method} ${path}`,
      description: "No documentation available for this endpoint",
      responses: {
        200: {
          description: "Successful response",
        },
      },
    };
  }

  return doc;
}

/**
 * Initialize all route documentation
 * This function is called once to register all known routes
 */
export function initializeDocumentation(): void {
  // GET /api/advocates
  registerRoute("/api/advocates", "GET", {
    summary: "List advocates with pagination and filtering",
    description:
      "Retrieves a paginated list of advocates with optional filtering by city, degree, specialty, experience, area codes, and search terms. Supports sorting by various fields.",
    tags: ["advocates"],
    parameters: [
      pageParameter,
      pageSizeParameter,
      {
        name: "cityIds",
        in: "query",
        description: "Filter by city IDs (can be specified multiple times). Maximum 100 values.",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
            format: "uuid",
          },
          maxItems: 100,
        },
        style: "form",
        explode: true,
        examples: {
          single: {
            value: ["123e4567-e89b-12d3-a456-426614174000"],
            summary: "Single city",
          },
          multiple: {
            value: ["123e4567-e89b-12d3-a456-426614174000", "223e4567-e89b-12d3-a456-426614174001"],
            summary: "Multiple cities",
          },
        },
      },
      {
        name: "degreeIds",
        in: "query",
        description: "Filter by degree IDs (can be specified multiple times). Maximum 100 values.",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
            format: "uuid",
          },
          maxItems: 100,
        },
        style: "form",
        explode: true,
      },
      {
        name: "specialtyIds",
        in: "query",
        description:
          "Filter by specialty IDs (can be specified multiple times). Maximum 100 values.",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
            format: "uuid",
          },
          maxItems: 100,
        },
        style: "form",
        explode: true,
      },
      {
        name: "minExperience",
        in: "query",
        description: "Minimum years of experience (inclusive). Must be between 0 and 100.",
        required: false,
        schema: {
          type: "integer",
          minimum: 0,
          maximum: 100,
        },
        examples: {
          junior: {
            value: 0,
            summary: "Junior level (0+ years)",
          },
          midLevel: {
            value: 5,
            summary: "Mid-level (5+ years)",
          },
          senior: {
            value: 10,
            summary: "Senior level (10+ years)",
          },
        },
      },
      {
        name: "maxExperience",
        in: "query",
        description: "Maximum years of experience (inclusive). Must be between 0 and 100.",
        required: false,
        schema: {
          type: "integer",
          minimum: 0,
          maximum: 100,
        },
      },
      {
        name: "areaCodes",
        in: "query",
        description:
          "Filter by phone number area codes (can be specified multiple times). Maximum 100 values.",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
            pattern: "^[0-9]{3}$",
          },
          maxItems: 100,
        },
        style: "form",
        explode: true,
        examples: {
          newYork: {
            value: ["212", "718", "917"],
            summary: "New York area codes",
          },
        },
      },
      {
        name: "search",
        in: "query",
        description: "Search term to filter advocates by name or email (case-insensitive).",
        required: false,
        schema: {
          type: "string",
          minLength: 1,
        },
        examples: {
          name: {
            value: "john",
            summary: "Search by name",
          },
          email: {
            value: "example.com",
            summary: "Search by email domain",
          },
        },
      },
      {
        name: "sortColumn",
        in: "query",
        description: "Column to sort by. Must be one of the valid sort columns.",
        required: false,
        schema: {
          type: "string",
          enum: ["firstName", "lastName", "city", "degree", "yearsOfExperience", "createdAt"],
          default: "createdAt",
        },
        examples: {
          name: {
            value: "lastName",
            summary: "Sort by last name",
          },
          experience: {
            value: "yearsOfExperience",
            summary: "Sort by experience",
          },
          date: {
            value: "createdAt",
            summary: "Sort by creation date (default)",
          },
        },
      },
      {
        name: "sortDirection",
        in: "query",
        description: "Sort direction (ascending or descending).",
        required: false,
        schema: {
          type: "string",
          enum: ["asc", "desc"],
          default: "desc",
        },
      },
    ],
    responses: {
      200: {
        description: "Successful response with paginated advocates",
        content: {
          "application/json": {
            schema: createPaginatedResponseSchema(advocateSchema),
            examples: {
              success: {
                summary: "Successful pagination",
                value: {
                  success: true,
                  data: [
                    {
                      id: "123e4567-e89b-12d3-a456-426614174000",
                      firstName: "John",
                      lastName: "Doe",
                      email: "john.doe@example.com",
                      phoneNumber: "212-555-0100",
                      city: {
                        id: "c1",
                        name: "New York",
                        state: "NY",
                      },
                      degree: {
                        id: "d1",
                        name: "Bachelor of Science",
                        abbreviation: "BS",
                      },
                      specialty: {
                        id: "s1",
                        name: "Cardiology",
                      },
                      yearsOfExperience: 5,
                      createdAt: "2024-01-15T10:30:00Z",
                      updatedAt: "2024-01-15T10:30:00Z",
                    },
                  ],
                  pagination: {
                    currentPage: 1,
                    pageSize: 20,
                    totalRecords: 150,
                    totalPages: 8,
                    hasNext: true,
                    hasPrevious: false,
                  },
                },
              },
            },
          },
        },
      },
      ...commonResponses,
    },
  });

  // GET /api/advocates/filter-options
  registerRoute("/api/advocates/filter-options", "GET", {
    summary: "Get available filter options for advocates",
    description:
      "Retrieves all available filter options including cities, degrees, specialties, and experience range. Each option includes the count of advocates that match. Results are cached for 1 hour.",
    tags: ["advocates"],
    parameters: [],
    responses: {
      200: {
        description: "Successful response with filter options",
        content: {
          "application/json": {
            schema: createSuccessResponseSchema(filterOptionsSchema),
            examples: {
              success: {
                summary: "Available filter options",
                value: {
                  success: true,
                  data: {
                    cities: [
                      {
                        id: "c1",
                        name: "New York",
                        state: "NY",
                        count: 45,
                      },
                      {
                        id: "c2",
                        name: "Los Angeles",
                        state: "CA",
                        count: 38,
                      },
                    ],
                    degrees: [
                      {
                        id: "d1",
                        name: "Bachelor of Science",
                        abbreviation: "BS",
                        count: 67,
                      },
                      {
                        id: "d2",
                        name: "Master of Science",
                        abbreviation: "MS",
                        count: 42,
                      },
                    ],
                    specialties: [
                      {
                        id: "s1",
                        name: "Cardiology",
                        count: 28,
                      },
                      {
                        id: "s2",
                        name: "Neurology",
                        count: 23,
                      },
                    ],
                    experienceRange: {
                      min: 0,
                      max: 25,
                    },
                  },
                },
              },
            },
          },
        },
        headers: {
          "Cache-Control": {
            description: "Cache control header indicating the response can be cached",
            schema: {
              type: "string",
              example: "public, max-age=3600, stale-while-revalidate=7200",
            },
          },
        },
      },
      ...commonResponses,
    },
  });

  // GET /api/cache/stats
  registerRoute("/api/cache/stats", "GET", {
    summary: "Get cache statistics (Development only)",
    description:
      "Retrieves cache statistics including memory usage, key counts, and patterns. This endpoint is only available in development mode and returns 403 in production.",
    tags: ["cache"],
    parameters: [],
    responses: {
      200: {
        description: "Successful response with cache statistics",
        content: {
          "application/json": {
            schema: createSuccessResponseSchema(cacheStatsSchema),
            examples: {
              success: {
                summary: "Cache statistics",
                value: {
                  success: true,
                  data: {
                    totalKeys: 42,
                    memoryUsage: {
                      used: 1024000,
                      free: 512000,
                      total: 1536000,
                    },
                    keysByPattern: {
                      "advocates:*": 15,
                      "filter-options:*": 5,
                      "other:*": 22,
                    },
                  },
                },
              },
            },
          },
        },
      },
      403: commonResponses[403],
      500: commonResponses[500],
    },
  });
}

// Initialize documentation when module is loaded
initializeDocumentation();
