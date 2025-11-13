/**
 * app/lib/__tests__/utils.test.ts
 *
 * Tests for formatCurrency, formatDateToLocal, generateYAxis, generatePagination
 */

import {
    formatCurrency,
    formatDateToLocal,
    generateYAxis,
    generatePagination,
  } from "@/app/lib/utils"; // adjust path if your file is located elsewhere
  
  describe("formatCurrency", () => {
    it("formats cents to USD currency string", () => {
      expect(formatCurrency(123456)).toBe("$1,234.56"); // 123456 / 100 = 1234.56
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(50)).toBe("$0.50");
    });
  });
  
  describe("formatDateToLocal", () => {
    it("formats ISO date string to en-US short month/day/year", () => {
      // Using UTC in formatter ensures consistent output across environments
      expect(formatDateToLocal("2020-01-02T00:00:00Z", "en-US")).toBe("Jan 2, 2020");
    });
  
    it("respects locale (en-GB)", () => {
      // en-GB places day before month and we use numeric (no leading zero)
      expect(formatDateToLocal("2020-01-02T00:00:00Z", "en-GB")).toBe("2 Jan 2020");
    });
  });  
  describe("generateYAxis", () => {
    it("generates yAxis labels and topLabel in 1000s descending to 0", () => {
      const revenue = [
        { month: "2023-01", revenue: 1500 },
        { month: "2023-02", revenue: 2500 },
        { month: "2023-03", revenue: 0 },
      ] as any; // cast to any if you don't have the Revenue type imported in tests
  
      const { yAxisLabels, topLabel } = generateYAxis(revenue);
  
      // highest record = 2500 => topLabel = ceil(2500/1000)*1000 = 3000
      expect(topLabel).toBe(3000);
      expect(yAxisLabels).toEqual(["$3K", "$2K", "$1K", "$0K"]);
    });
  
    it("handles exact multiples of 1000 correctly", () => {
      const revenue = [{ month: "m", revenue: 2000 }] as any;
      const { yAxisLabels, topLabel } = generateYAxis(revenue);
      expect(topLabel).toBe(2000);
      expect(yAxisLabels).toEqual(["$2K", "$1K", "$0K"]);
    });
  
    it("handles zero revenue", () => {
      const revenue = [{ month: "m", revenue: 0 }] as any;
      const { yAxisLabels, topLabel } = generateYAxis(revenue);
      expect(topLabel).toBe(0);
      expect(yAxisLabels).toEqual(["$0K"]);
    });
  });
  
  describe("generatePagination", () => {
    it("returns all pages when totalPages <= 7", () => {
      expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(generatePagination(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  
    it("shows first 3, ellipsis, last 2 when currentPage <= 3 and totalPages > 7", () => {
      expect(generatePagination(2, 10)).toEqual([1, 2, 3, "...", 9, 10]);
      expect(generatePagination(3, 8)).toEqual([1, 2, 3, "...", 7, 8]);
    });
  
    it("shows first 2, ellipsis, last 3 when currentPage is among last 3", () => {
      expect(generatePagination(9, 10)).toEqual([1, 2, "...", 8, 9, 10]);
      expect(generatePagination(8, 10)).toEqual([1, 2, "...", 8, 9, 10]);
    });
  
    it("shows ellipses around current page when in the middle", () => {
      expect(generatePagination(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
      expect(generatePagination(6, 15)).toEqual([1, "...", 5, 6, 7, "...", 15]);
    });
  });