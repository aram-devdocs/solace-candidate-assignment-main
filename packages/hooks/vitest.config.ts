import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "**/*.config.ts", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@repo/types": path.resolve(__dirname, "../types/src"),
      "@repo/utils": path.resolve(__dirname, "../utils/src"),
      "@repo/queries": path.resolve(__dirname, "../queries/src"),
    },
  },
});
