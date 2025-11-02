import { NextResponse } from "next/server";
import { createOpenAPISpec, initializeDocumentation } from "@repo/openapi";
import type { OpenAPIObject } from "@repo/openapi";

/**
 * GET /api/openapi.json
 *
 * Generates and returns the OpenAPI 3.1 specification for this API.
 * The spec is generated dynamically based on route discovery and
 * registered documentation.
 *
 * In development, the spec is regenerated on each request.
 * In production, consider implementing caching for better performance.
 */
export async function GET() {
  try {
    // Ensure documentation is initialized
    initializeDocumentation();

    // For now, we'll use a static approach with manually defined paths
    // The scanner could be used for full dynamic discovery, but requires
    // filesystem access which may not work in all deployment environments
    const spec: OpenAPIObject = createOpenAPISpec(
      {
        title: "Solace Health Advocates API",
        description:
          "REST API for managing and querying health advocates. Supports filtering, pagination, and sorting.",
        version: "1.0.0",
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
      },
      {
        "/api/advocates": {
          get: {
            summary: "List advocates with pagination and filtering",
            description:
              "Retrieves a paginated list of advocates with optional filtering by city, degree, specialty, experience, area codes, and search terms. Supports sorting by various fields.",
            tags: ["advocates"],
            parameters: [
              {
                name: "page",
                in: "query",
                description: "Page number (1-indexed). Defaults to 1.",
                required: false,
                schema: {
                  type: "integer",
                  minimum: 1,
                  default: 1,
                },
              },
              {
                name: "pageSize",
                in: "query",
                description: "Number of items per page. Defaults to 20. Maximum 100.",
                required: false,
                schema: {
                  type: "integer",
                  minimum: 1,
                  maximum: 100,
                  default: 20,
                },
              },
              {
                name: "cityIds",
                in: "query",
                description:
                  "Filter by city IDs (can be specified multiple times). Maximum 100 values.",
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
                name: "degreeIds",
                in: "query",
                description:
                  "Filter by degree IDs (can be specified multiple times). Maximum 100 values.",
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
              },
              {
                name: "sortColumn",
                in: "query",
                description: "Column to sort by. Must be one of the valid sort columns.",
                required: false,
                schema: {
                  type: "string",
                  enum: [
                    "firstName",
                    "lastName",
                    "city",
                    "degree",
                    "yearsOfExperience",
                    "createdAt",
                  ],
                  default: "createdAt",
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
                    schema: {
                      type: "object",
                      required: ["success", "data", "pagination"],
                      properties: {
                        success: {
                          type: "boolean",
                          enum: [true],
                        },
                        data: {
                          type: "array",
                          items: {
                            type: "object",
                            required: ["id", "firstName", "lastName", "email"],
                            properties: {
                              id: { type: "string", format: "uuid" },
                              firstName: { type: "string" },
                              lastName: { type: "string" },
                              email: { type: "string", format: "email" },
                              phoneNumber: { type: "string", nullable: true },
                              city: {
                                type: "object",
                                nullable: true,
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                  state: { type: "string" },
                                },
                              },
                              degree: {
                                type: "object",
                                nullable: true,
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                  abbreviation: { type: "string" },
                                },
                              },
                              specialty: {
                                type: "object",
                                nullable: true,
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                },
                              },
                              yearsOfExperience: { type: "integer", nullable: true },
                              createdAt: { type: "string", format: "date-time" },
                              updatedAt: { type: "string", format: "date-time" },
                            },
                          },
                        },
                        pagination: {
                          type: "object",
                          required: [
                            "currentPage",
                            "pageSize",
                            "totalRecords",
                            "totalPages",
                            "hasNext",
                            "hasPrevious",
                          ],
                          properties: {
                            currentPage: { type: "integer", minimum: 1 },
                            pageSize: { type: "integer", minimum: 1 },
                            totalRecords: { type: "integer", minimum: 0 },
                            totalPages: { type: "integer", minimum: 0 },
                            hasNext: { type: "boolean" },
                            hasPrevious: { type: "boolean" },
                          },
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Bad Request - Invalid input parameters",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "error"],
                      properties: {
                        success: { type: "boolean", enum: [false] },
                        error: {
                          type: "object",
                          required: ["code", "message"],
                          properties: {
                            code: { type: "string" },
                            message: { type: "string" },
                            details: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal Server Error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "error"],
                      properties: {
                        success: { type: "boolean", enum: [false] },
                        error: {
                          type: "object",
                          required: ["code", "message"],
                          properties: {
                            code: { type: "string" },
                            message: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/advocates/filter-options": {
          get: {
            summary: "Get available filter options for advocates",
            description:
              "Retrieves all available filter options including cities, degrees, specialties, and experience range. Results are cached for 1 hour.",
            tags: ["advocates"],
            responses: {
              200: {
                description: "Successful response with filter options",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "data"],
                      properties: {
                        success: { type: "boolean", enum: [true] },
                        data: {
                          type: "object",
                          required: ["cities", "degrees", "specialties", "experienceRange"],
                          properties: {
                            cities: {
                              type: "array",
                              items: {
                                type: "object",
                                required: ["id", "name", "state", "count"],
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                  state: { type: "string" },
                                  count: { type: "integer" },
                                },
                              },
                            },
                            degrees: {
                              type: "array",
                              items: {
                                type: "object",
                                required: ["id", "name", "abbreviation", "count"],
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                  abbreviation: { type: "string" },
                                  count: { type: "integer" },
                                },
                              },
                            },
                            specialties: {
                              type: "array",
                              items: {
                                type: "object",
                                required: ["id", "name", "count"],
                                properties: {
                                  id: { type: "string", format: "uuid" },
                                  name: { type: "string" },
                                  count: { type: "integer" },
                                },
                              },
                            },
                            experienceRange: {
                              type: "object",
                              required: ["min", "max"],
                              properties: {
                                min: { type: "integer" },
                                max: { type: "integer" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal Server Error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "error"],
                      properties: {
                        success: { type: "boolean", enum: [false] },
                        error: {
                          type: "object",
                          required: ["code", "message"],
                          properties: {
                            code: { type: "string" },
                            message: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/cache/stats": {
          get: {
            summary: "Get cache statistics (Development only)",
            description:
              "Retrieves cache statistics including memory usage and key counts. Only available in development mode.",
            tags: ["cache"],
            responses: {
              200: {
                description: "Successful response with cache statistics",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "data"],
                      properties: {
                        success: { type: "boolean", enum: [true] },
                        data: {
                          type: "object",
                          description: "Cache statistics",
                        },
                      },
                    },
                  },
                },
              },
              403: {
                description: "Forbidden - Only available in development mode",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["success", "error"],
                      properties: {
                        success: { type: "boolean", enum: [false] },
                        error: {
                          type: "object",
                          required: ["code", "message"],
                          properties: {
                            code: { type: "string" },
                            message: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }
    );

    return NextResponse.json(spec, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error generating OpenAPI spec:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SPEC_GENERATION_ERROR",
          message: "Failed to generate OpenAPI specification",
          details: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 }
    );
  }
}
