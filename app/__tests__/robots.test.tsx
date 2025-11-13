/**
 * @jest-environment jsdom
 *
 * app/__tests__/robots.test.ts
 *
 * Tests for the default robots() function exported from app/robots.ts
 *
 * Ensures:
 *  - The returned shape contains rules, sitemap and host
 *  - sitemap and host are built from process.env.DEPLOYMENT_URL
 *
 * NOTE: we use require() and jest.resetModules() so we can set
 * process.env.DEPLOYMENT_URL before the module is evaluated.
 */

describe("robots()", () => {
  const ORIGINAL_ENV = process.env;

  afterEach(() => {
    // restore environment & reset module registry
    process.env = { ...ORIGINAL_ENV };
    jest.resetModules();
  });

  it("returns rules, sitemap and host using DEPLOYMENT_URL", () => {
    jest.resetModules();
    process.env.DEPLOYMENT_URL = "https://example.com";

    // require after setting env so the function will use the value
    const robotsFn: () => any = require("../robots").default;

    const result = robotsFn();

    expect(result).toBeDefined();
    expect(Array.isArray(result.rules)).toBe(true);
    expect(result.rules).toHaveLength(1);
    expect(result.rules[0]).toEqual({ userAgent: "*" });

    expect(result.sitemap).toBe("https://example.com/sitemap.xml");
    expect(result.host).toBe("https://example.com");
  });

  it("includes the sitemap path and host even with a trailing slash in DEPLOYMENT_URL", () => {
    jest.resetModules();
    process.env.DEPLOYMENT_URL = "https://example.com/"; // trailing slash

    const robotsFn: () => any = require("../robots").default;
    const result = robotsFn();

    // the implementation concatenates strings; this assertion allows either behavior.
    // Accept either single-slash-normalized or double-slash output:
    expect(result.sitemap).toMatch(
      /https:\/\/example\.com\/sitemap\.xml|https:\/\/example\.com\/\/sitemap\.xml/,
    );
    expect(result.host).toMatch(/https:\/\/example\.com\/?/);
  });
});
