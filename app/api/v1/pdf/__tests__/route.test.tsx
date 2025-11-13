/**
 * @jest-environment node
 *
 * app/api/pdf/__tests__/route.test.ts
 *
 * Tests for app/api/pdf/route.ts
 */

import { NextRequest } from "next/server";
import { GET } from "../route";

// --- Mocks ---
// Define mock page & browser objects before configuring jest.mock to avoid initialization order issues
const mockPage = {
  setDefaultTimeout: jest.fn(),
  setViewport: jest.fn(),
  setExtraHTTPHeaders: jest.fn(),
  goto: jest.fn(),
  emulateMediaType: jest.fn(),
  evaluate: jest.fn(),
  pdf: jest.fn(),
};

const mockBrowser = {
  newPage: jest.fn(),
  close: jest.fn(),
};

// Ensure newPage resolves to our mockPage
mockBrowser.newPage.mockResolvedValue(mockPage);

// puppeteeer-core mock: only expose launch as a jest.fn() to be configured in beforeEach
jest.mock("puppeteer-core", () => ({
  launch: jest.fn(),
}));

// chromium-min mock
jest.mock("@sparticuz/chromium-min", () => ({
  args: ["--test-arg"],
  executablePath: jest.fn().mockResolvedValue("/mock/chromium/path"),
}));

// mock rate limiter to return handler directly
jest.mock("@/app/lib/rateLimit", () => ({
  withRateLimit: jest.fn((handler) => handler),
}));

describe("GET /api/pdf", () => {
  const originalEnv = process.env;

  const mockRequest = (params: Record<string, string>): NextRequest => {
    const url = new URL("https://example.com");
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return new NextRequest(url.toString());
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Ensure puppeteer.launch resolves to our mock browser for each test
    const puppeteer = require("puppeteer-core");
    puppeteer.launch.mockResolvedValue(mockBrowser);

    // set sane defaults
    process.env = { ...originalEnv };
    process.env.DEPLOYMENT_URL = "https://example.com";
    process.env.INTERNAL_API_KEY = "test-api-key";
    delete process.env.AWS_REGION;
    delete process.env.CHROME_PATH;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 400 when resumeId is missing", async () => {
    const req = mockRequest({ userEmail: "test@example.com" });
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toBe("no resumeId provided");
  });

  it("returns 400 when userEmail is missing", async () => {
    const req = mockRequest({ resumeId: "r1" });
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toBe("no userEmail provided");
  });

  it("generates PDF successfully and returns correct headers", async () => {
    const mockPdf = Buffer.from("pdf-bytes");
    mockPage.pdf.mockResolvedValueOnce(mockPdf);

    const req = mockRequest({
      resumeId: "resume-123",
      userEmail: "user@example.com",
    });
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toBe(
      'inline; filename="resume-resume-123.pdf"',
    );
    expect(res.headers.get("Content-Length")).toBe(String(mockPdf.byteLength));
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=3600, stale-while-revalidate=60",
    );
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("X-Frame-Options")).toBe("DENY");

    // Verify puppeteer interactions
    expect(mockBrowser.newPage).toHaveBeenCalled();
    expect(mockPage.setDefaultTimeout).toHaveBeenCalledWith(20000);
    expect(mockPage.setViewport).toHaveBeenCalledWith({
      width: 1200,
      height: 900,
    });
    expect(mockPage.setExtraHTTPHeaders).toHaveBeenCalledWith({
      "X-API-Key": "test-api-key",
    });
    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://example.com/resume/resume-123/user%40example.com",
      { waitUntil: "networkidle0", timeout: 20000 },
    );
    expect(mockPage.emulateMediaType).toHaveBeenCalledWith("print");
    expect(mockPage.pdf).toHaveBeenCalledWith({
      displayHeaderFooter: false,
      format: "letter",
      printBackground: true,
      margin: { top: "0.4in", right: "0.4in", bottom: "0.4in", left: "0.4in" },
    });
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("sanitizes resumeId and userEmail", async () => {
    const mockPdf = Buffer.from("pdf");
    mockPage.pdf.mockResolvedValueOnce(mockPdf);

    const req = mockRequest({
      resumeId: "  resume-123  ",
      userEmail: "  USER@EXAMPLE.COM  ",
    });
    await GET(req);

    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://example.com/resume/resume-123/user%40example.com",
      expect.any(Object),
    );
  });

  it("uses localhost when DEPLOYMENT_URL is not set", async () => {
    delete process.env.DEPLOYMENT_URL;
    process.env.PORT = "4000";

    const mockPdf = Buffer.from("pdf");
    mockPage.pdf.mockResolvedValueOnce(mockPdf);

    const req = mockRequest({
      resumeId: "resume-1",
      userEmail: "u@e.com",
    });
    await GET(req);

    expect(mockPage.goto).toHaveBeenCalledWith(
      "http://localhost:4000/resume/resume-1/u%40e.com",
      expect.any(Object),
    );
  });

  it("honors CHROME_PATH when not in AWS", async () => {
    process.env.CHROME_PATH = "/custom/chrome";

    const mockPdf = Buffer.from("pdf");
    mockPage.pdf.mockResolvedValueOnce(mockPdf);

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    await GET(req);

    const puppeteer = require("puppeteer-core");
    expect(puppeteer.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        executablePath: "/custom/chrome",
      }),
    );
  });

  it("uses chromium-min when in AWS (executablePath becomes a string)", async () => {
    process.env.AWS_REGION = "us-east-1";

    const mockPdf = Buffer.from("pdf");
    mockPage.pdf.mockResolvedValueOnce(mockPdf);

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    await GET(req);

    const puppeteer = require("puppeteer-core");
    const chromium = require("@sparticuz/chromium-min");
    expect(puppeteer.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        args: chromium.args,
        executablePath: expect.any(String),
      }),
    );
  });

  it("returns 500 on non-timeout failures", async () => {
    mockPage.goto.mockRejectedValueOnce(new Error("Something bad"));

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Failed to generate PDF");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("returns 408 when error message includes 'timeout'", async () => {
    mockPage.goto.mockRejectedValueOnce(
      new Error("navigation TIMEOUT occurred"),
    );

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(408);
    expect(json.error).toBe("Failed to generate PDF");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("ignores font waiting errors and still returns PDF", async () => {
    mockPage.evaluate.mockRejectedValueOnce(new Error("fonts error"));
    mockPage.pdf.mockResolvedValueOnce(Buffer.from("pdf"));

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockPage.pdf).toHaveBeenCalled();
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("returns 500 if browser.close throws during happy path", async () => {
    mockBrowser.close.mockRejectedValueOnce(new Error("close failed"));
    mockPage.pdf.mockResolvedValueOnce(Buffer.from("pdf"));

    const req = mockRequest({
      resumeId: "r",
      userEmail: "u@e.com",
    });
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Failed to generate PDF");
  });
});
