import type { SchemaObject } from "openapi3-ts/oas31";

/**
 * Common response schemas used across the API
 */

/**
 * Standard error response schema
 */
export const errorResponseSchema: SchemaObject = {
  type: "object",
  required: ["success", "error"],
  properties: {
    success: {
      type: "boolean",
      enum: [false],
      description: "Always false for error responses",
    },
    error: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: {
          type: "string",
          description: "Machine-readable error code",
          examples: ["VALIDATION_ERROR", "DATABASE_ERROR", "NOT_FOUND"],
        },
        message: {
          type: "string",
          description: "Human-readable error message",
          examples: ["Invalid page number", "Database connection failed"],
        },
        details: {
          type: "string",
          description: "Additional error details (development only)",
        },
      },
    },
  },
};

/**
 * Pagination metadata schema
 */
export const paginationMetadataSchema: SchemaObject = {
  type: "object",
  required: ["currentPage", "pageSize", "totalRecords", "totalPages", "hasNext", "hasPrevious"],
  properties: {
    currentPage: {
      type: "integer",
      description: "Current page number (1-indexed)",
      minimum: 1,
      examples: [1],
    },
    pageSize: {
      type: "integer",
      description: "Number of items per page",
      minimum: 1,
      maximum: 100,
      examples: [20],
    },
    totalRecords: {
      type: "integer",
      description: "Total number of records across all pages",
      minimum: 0,
      examples: [150],
    },
    totalPages: {
      type: "integer",
      description: "Total number of pages",
      minimum: 0,
      examples: [8],
    },
    hasNext: {
      type: "boolean",
      description: "Whether there is a next page",
      examples: [true],
    },
    hasPrevious: {
      type: "boolean",
      description: "Whether there is a previous page",
      examples: [false],
    },
  },
};

/**
 * Advocate schema (simplified for OpenAPI docs)
 */
export const advocateSchema: SchemaObject = {
  type: "object",
  required: ["id", "firstName", "lastName", "email", "createdAt", "updatedAt"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the advocate",
    },
    firstName: {
      type: "string",
      description: "Advocate's first name",
      examples: ["John"],
    },
    lastName: {
      type: "string",
      description: "Advocate's last name",
      examples: ["Doe"],
    },
    email: {
      type: "string",
      format: "email",
      description: "Advocate's email address",
      examples: ["john.doe@example.com"],
    },
    phoneNumber: {
      type: ["string", "null"],
      description: "Advocate's phone number",
      examples: ["555-0100"],
    },
    city: {
      type: ["object", "null"],
      description: "City where the advocate is located",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", examples: ["New York"] },
        state: { type: "string", examples: ["NY"] },
      },
    },
    degree: {
      type: ["object", "null"],
      description: "Advocate's degree",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", examples: ["Bachelor of Science"] },
        abbreviation: { type: "string", examples: ["BS"] },
      },
    },
    specialty: {
      type: ["object", "null"],
      description: "Advocate's specialty",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", examples: ["Cardiology"] },
      },
    },
    yearsOfExperience: {
      type: ["integer", "null"],
      description: "Years of professional experience",
      minimum: 0,
      maximum: 100,
      examples: [5],
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "When the advocate record was created",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "When the advocate record was last updated",
    },
  },
};

/**
 * Filter options schema
 */
export const filterOptionsSchema: SchemaObject = {
  type: "object",
  required: ["cities", "degrees", "specialties", "experienceRange"],
  properties: {
    cities: {
      type: "array",
      description: "Available cities with advocate counts",
      items: {
        type: "object",
        required: ["id", "name", "state", "count"],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", examples: ["New York"] },
          state: { type: "string", examples: ["NY"] },
          count: {
            type: "integer",
            description: "Number of advocates in this city",
            minimum: 0,
          },
        },
      },
    },
    degrees: {
      type: "array",
      description: "Available degrees with advocate counts",
      items: {
        type: "object",
        required: ["id", "name", "abbreviation", "count"],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", examples: ["Bachelor of Science"] },
          abbreviation: { type: "string", examples: ["BS"] },
          count: {
            type: "integer",
            description: "Number of advocates with this degree",
            minimum: 0,
          },
        },
      },
    },
    specialties: {
      type: "array",
      description: "Available specialties with advocate counts",
      items: {
        type: "object",
        required: ["id", "name", "count"],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", examples: ["Cardiology"] },
          count: {
            type: "integer",
            description: "Number of advocates with this specialty",
            minimum: 0,
          },
        },
      },
    },
    experienceRange: {
      type: "object",
      required: ["min", "max"],
      description: "Range of years of experience across all advocates",
      properties: {
        min: {
          type: "integer",
          description: "Minimum years of experience",
          minimum: 0,
        },
        max: {
          type: "integer",
          description: "Maximum years of experience",
          minimum: 0,
        },
      },
    },
  },
};

/**
 * Cache statistics schema
 */
export const cacheStatsSchema: SchemaObject = {
  type: "object",
  description: "Cache statistics and metrics",
  properties: {
    totalKeys: {
      type: "integer",
      description: "Total number of keys in cache",
      minimum: 0,
    },
    memoryUsage: {
      type: "object",
      description: "Memory usage information",
      properties: {
        used: { type: "integer", description: "Bytes used" },
        free: { type: "integer", description: "Bytes free" },
        total: { type: "integer", description: "Total bytes" },
      },
    },
    keysByPattern: {
      type: "object",
      description: "Number of keys grouped by pattern",
      additionalProperties: {
        type: "integer",
      },
    },
  },
};

/**
 * Helper to create a paginated success response schema
 */
export function createPaginatedResponseSchema(itemSchema: SchemaObject): SchemaObject {
  return {
    type: "object",
    required: ["success", "data", "pagination"],
    properties: {
      success: {
        type: "boolean",
        enum: [true],
        description: "Always true for successful responses",
      },
      data: {
        type: "array",
        items: itemSchema,
        description: "Array of items for the current page",
      },
      pagination: paginationMetadataSchema,
    },
  };
}

/**
 * Helper to create a simple success response schema
 */
export function createSuccessResponseSchema(dataSchema: SchemaObject): SchemaObject {
  return {
    type: "object",
    required: ["success", "data"],
    properties: {
      success: {
        type: "boolean",
        enum: [true],
        description: "Always true for successful responses",
      },
      data: dataSchema,
    },
  };
}

/**
 * Common parameter schemas
 */
export const pageParameter = {
  name: "page",
  in: "query" as const,
  description: "Page number (1-indexed). Defaults to 1.",
  required: false,
  schema: {
    type: "integer" as const,
    minimum: 1,
    default: 1,
  },
  examples: {
    default: {
      value: 1,
      summary: "First page",
    },
    second: {
      value: 2,
      summary: "Second page",
    },
  },
};

export const pageSizeParameter = {
  name: "pageSize",
  in: "query" as const,
  description: "Number of items per page. Defaults to 20. Maximum 100.",
  required: false,
  schema: {
    type: "integer" as const,
    minimum: 1,
    maximum: 100,
    default: 20,
  },
  examples: {
    small: {
      value: 10,
      summary: "10 items per page",
    },
    default: {
      value: 20,
      summary: "Default (20 items)",
    },
    large: {
      value: 50,
      summary: "50 items per page",
    },
  },
};

/**
 * Common response definitions
 */
export const commonResponses = {
  400: {
    description: "Bad Request - Invalid input parameters",
    content: {
      "application/json": {
        schema: errorResponseSchema,
        examples: {
          invalidPage: {
            summary: "Invalid page number",
            value: {
              success: false,
              error: {
                code: "VALIDATION_ERROR",
                message: "Page must be a positive integer",
              },
            },
          },
          invalidFilter: {
            summary: "Invalid filter value",
            value: {
              success: false,
              error: {
                code: "VALIDATION_ERROR",
                message: "Too many filter values. Maximum 100 allowed.",
              },
            },
          },
        },
      },
    },
  },
  403: {
    description: "Forbidden - Access denied",
    content: {
      "application/json": {
        schema: errorResponseSchema,
        examples: {
          productionOnly: {
            summary: "Development-only endpoint",
            value: {
              success: false,
              error: {
                code: "FORBIDDEN",
                message: "This endpoint is only available in development mode",
              },
            },
          },
        },
      },
    },
  },
  500: {
    description: "Internal Server Error - Something went wrong on the server",
    content: {
      "application/json": {
        schema: errorResponseSchema,
        examples: {
          databaseError: {
            summary: "Database error",
            value: {
              success: false,
              error: {
                code: "DATABASE_ERROR",
                message: "Failed to fetch data from database",
              },
            },
          },
        },
      },
    },
  },
};
