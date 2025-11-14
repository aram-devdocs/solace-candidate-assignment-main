# @repo/openapi

OpenAPI 3.1 specification generator and documentation utilities for the Goud Network Advocates API.

## Overview

This package provides tools for generating OpenAPI specifications from Next.js API routes. It includes:

- OpenAPI 3.1 spec builder
- Route scanner for dynamic discovery
- Pre-defined schemas for common response types
- Type-safe documentation helpers

## Features

- **Automatic route discovery**: Scans Next.js App Router API routes
- **Type-safe schemas**: JSON schemas derived from TypeScript types
- **Minimal configuration**: Routes auto-discovered, enhanced via inline documentation
- **Scalar UI integration**: Beautiful, interactive API documentation

## Usage

### Generating OpenAPI Spec

The OpenAPI spec is served at `/api/openapi.json` and is generated dynamically:

```typescript
import { createOpenAPISpec } from "@repo/openapi";

const spec = createOpenAPISpec(
  {
    title: "My API",
    description: "API description",
    version: "1.0.0",
  },
  {
    "/api/users": {
      get: {
        summary: "List users",
        // ... OpenAPI operation object
      },
    },
  }
);
```

### Viewing Documentation

The interactive API documentation is available at `/api/docs` and uses Scalar UI.

## Architecture

### Packages Structure

- `src/builder.ts` - OpenAPI spec builder functions
- `src/scanner.ts` - Runtime route discovery utilities
- `src/schemas.ts` - Common JSON schemas for API responses
- `src/documentation.ts` - Route-specific documentation registry
- `src/types.ts` - TypeScript type definitions

### Common Schemas

The package provides pre-built schemas for common response patterns:

- `errorResponseSchema` - Standard error response format
- `paginationMetadataSchema` - Pagination metadata
- `advocateSchema` - Advocate entity schema
- `filterOptionsSchema` - Filter options schema
- `cacheStatsSchema` - Cache statistics schema

### Helper Functions

- `createPaginatedResponseSchema(itemSchema)` - Creates a paginated response schema
- `createSuccessResponseSchema(dataSchema)` - Creates a success response schema
- `commonResponses` - Pre-defined error responses (400, 403, 500)

## Adding New Routes

When you add a new API route, the OpenAPI spec can be updated in two ways:

### 1. Static Definition (Recommended)

Edit `apps/web/src/app/api/openapi.json/route.ts` and add your route to the paths object:

```typescript
const spec = createOpenAPISpec(config, {
  "/api/my-route": {
    get: {
      summary: "My route description",
      tags: ["my-tag"],
      parameters: [
        {
          name: "param1",
          in: "query",
          description: "Parameter description",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: createSuccessResponseSchema({
                type: "object",
                properties: {
                  // ... your response schema
                },
              }),
            },
          },
        },
        ...commonResponses,
      },
    },
  },
});
```

### 2. Dynamic Discovery (Advanced)

For automatic route discovery, use the scanner:

```typescript
import { generateOpenAPISpec } from "@repo/openapi";

const spec = await generateOpenAPISpec({
  title: "My API",
  description: "API description",
  version: "1.0.0",
  routesDir: "/path/to/app/api",
});
```

Note: Dynamic discovery requires filesystem access and may not work in all deployment environments.

## Best Practices

1. **Use static definitions for production** - More reliable and faster
2. **Leverage common schemas** - Reuse `commonResponses`, `pageParameter`, etc.
3. **Document all parameters** - Include descriptions and examples
4. **Add response examples** - Show realistic response data
5. **Group by tags** - Organize endpoints with tags

## Development

```bash
# Type check
pnpm --filter @repo/openapi type-check

# Lint
pnpm --filter @repo/openapi lint
```

## Dependencies

- `openapi3-ts` - OpenAPI 3.1 TypeScript definitions
