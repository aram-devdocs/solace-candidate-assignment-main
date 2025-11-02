import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "**/*.config.ts", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@repo/database/testing": path.resolve(
        __dirname,
        "../database/src/__tests__/fixtures/index.ts"
      ),
      "@repo/database": path.resolve(__dirname, "../database/src/index.ts"),
      "@repo/types": path.resolve(__dirname, "../types/src/index.ts"),
    },
  },
});
