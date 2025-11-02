import { describe, it, expect } from "vitest";
import { CacheTTL } from "../operations";

describe("Cache Operations", () => {
  describe("CacheTTL", () => {
    it("should have valid TTL values", () => {
      expect(CacheTTL.FILTER_OPTIONS).toBeGreaterThan(0);
      expect(CacheTTL.PAGINATED_RESULTS).toBeGreaterThan(0);
      expect(CacheTTL.SEARCH_RESULTS).toBeGreaterThan(0);
      expect(CacheTTL.TOTAL_COUNT).toBeGreaterThan(0);
      expect(CacheTTL.ADVOCATE_DETAIL).toBeGreaterThan(0);
    });

    it("should have reasonable TTL hierarchy", () => {
      // Filter options should cache longer than search/paginated results
      expect(CacheTTL.FILTER_OPTIONS).toBeGreaterThanOrEqual(CacheTTL.PAGINATED_RESULTS);
      expect(CacheTTL.FILTER_OPTIONS).toBeGreaterThanOrEqual(CacheTTL.SEARCH_RESULTS);

      // Detail cache should be longer than search results
      expect(CacheTTL.ADVOCATE_DETAIL).toBeGreaterThanOrEqual(CacheTTL.SEARCH_RESULTS);
    });

    it("should define all expected TTL constants", () => {
      expect(CacheTTL).toHaveProperty("FILTER_OPTIONS");
      expect(CacheTTL).toHaveProperty("PAGINATED_RESULTS");
      expect(CacheTTL).toHaveProperty("SEARCH_RESULTS");
      expect(CacheTTL).toHaveProperty("TOTAL_COUNT");
      expect(CacheTTL).toHaveProperty("ADVOCATE_DETAIL");
    });
  });
});
