import { ApiReference } from "@scalar/nextjs-api-reference";

/**
 * GET /api/reference
 *
 * Renders the Scalar API reference HTML page.
 * This is rendered as a standalone page and embedded via iframe.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = ApiReference({
  theme: "purple",
  layout: "modern",
  darkMode: true,
  spec: {
    url: "/api/openapi.json",
  },
} as any);
