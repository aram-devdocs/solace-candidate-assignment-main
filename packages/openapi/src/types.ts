import type {
  OpenAPIObject,
  OperationObject,
  ParameterObject,
  SchemaObject,
} from "openapi3-ts/oas31";

/**
 * HTTP methods supported by Next.js App Router
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

/**
 * Metadata extracted from a route file
 */
export interface RouteMetadata {
  /** The API path (e.g., /api/advocates) */
  path: string;
  /** HTTP methods exported by this route */
  methods: HttpMethod[];
  /** File path to the route handler */
  filePath: string;
  /** JSDoc description extracted from the handler */
  description?: string;
  /** Tags for grouping operations */
  tags?: string[];
}

/**
 * Configuration for the OpenAPI spec generator
 */
export interface OpenAPIConfig {
  /** API title */
  title: string;
  /** API description */
  description: string;
  /** API version */
  version: string;
  /** Base URL for the API (optional) */
  baseUrl?: string;
  /** Root directory to scan for routes (default: app/api) */
  routesDir?: string;
}

/**
 * Extracted route documentation from JSDoc comments and type annotations
 */
export interface RouteDocumentation {
  /** Operation summary (first line of JSDoc) */
  summary?: string;
  /** Detailed description */
  description?: string;
  /** Tags for grouping */
  tags?: string[];
  /** Query parameters */
  parameters?: ParameterObject[];
  /** Request body schema */
  requestBody?: OperationObject["requestBody"];
  /** Response schemas by status code */
  responses?: OperationObject["responses"];
  /** Whether this endpoint is deprecated */
  deprecated?: boolean;
}

export type { OpenAPIObject, OperationObject, ParameterObject, SchemaObject };
