/**
 * @jest-environment node
 *
 * app/api/v1/cover-pdf/__tests__/route.test.tsx
 *
 * Tests for the cover PDF API route (fixed expectations)
 */

import { NextRequest } from "next/server";
import { GET } from "../route";

// Mock puppeteer-core and chromium-min
const mockPage = {
  setDefaultTimeout: jest.fn(),
  setViewport: jest.fn(),
  setExtraHTTPHeaders: jest.fn(),
  goto: jest.fn(),
  emulateMediaType: jest.fn(),
  evaluate: jest.fn(),
  pdf: jest.fn(),
};

// Create mock browser after mockPage is defined
const mockBrowser = {
  newPage: jest.fn(),
  close: jest.fn(),
};

// resolve newPage to mockPage
mockBrowser.newPage.mockResolvedValue(mockPage);

jest.mock("puppeteer-core", () => ({
  launch: jest.fn(),
}));

jest.mock("@sparticuz/chromium-min", () => ({
  args: ["--test-arg"],
  executablePath: jest.fn().mockResolvedValue("/mock/chromium/path"),
}));

// Mock the rate limiter
jest.mock("@/app/lib/rateLimit", () => ({
  withRateLimit: jest.fn((handler) => handler),
}));

describe("GET /api/cover-pdf", () => {
  const mockRequest = (params: Record<string, string>): NextRequest => {
    const url = new URL("https://example.com");
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return new NextRequest(url.toString());
  };

  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();

    // Ensure puppeteer.launch resolves to our mock browser
    const puppeteer = require("puppeteer-core");
    puppeteer.launch.mockResolvedValue(mockBrowser);

    process.env = { ...originalEnv };
    process.env.DEPLOYMENT_URL = "https://example.com";
    process.env.INTERNAL_API_KEY = "test-api-key";
    // default: not in AWS; tests set AWS_REGION explicitly when needed
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 400 if coverLetterId is missing", async () => {
    const request = mockRequest({ userEmail: "test@example.com" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("no coverLetterId provided");
  });

  it("returns 400 if userEmail is missing", async () => {
    const request = mockRequest({ coverLetterId: "cover-123" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("no userEmail provided");
  });

  it("returns PDF successfully with valid inputs", async () => {
    // Mock PDF generation
    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toBe(
      'inline; filename="cover-cover-123.pdf"',
    );
    expect(response.headers.get("Content-Length")).toBe(
      String(mockPdfBuffer.byteLength),
    );
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=3600");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");

    // Verify puppeteer calls
    expect(mockBrowser.newPage).toHaveBeenCalled();
    expect(mockPage.setDefaultTimeout).toHaveBeenCalledWith(15000);
    expect(mockPage.setViewport).toHaveBeenCalledWith({
      width: 1200,
      height: 800,
    });
    expect(mockPage.setExtraHTTPHeaders).toHaveBeenCalledWith({
      "X-API-Key": "test-api-key",
    });
    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://example.com/cover-letter/cover-123/test%40example.com",
      { waitUntil: "networkidle0", timeout: 15000 },
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

  it("sanitizes inputs correctly", async () => {
    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "  cover-123  ", // Extra whitespace
      userEmail: "  TEST@EXAMPLE.COM  ", // Uppercase and whitespace
    });
    await GET(request);

    // Verify sanitized inputs were used
    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://example.com/cover-letter/cover-123/test%40example.com",
      expect.any(Object),
    );
    expect(mockPage.setExtraHTTPHeaders).toHaveBeenCalledWith({
      "X-API-Key": "test-api-key",
    });
  });

  it("uses localhost URL when DEPLOYMENT_URL is not set", async () => {
    delete process.env.DEPLOYMENT_URL;
    process.env.PORT = "3001";

    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    await GET(request);

    expect(mockPage.goto).toHaveBeenCalledWith(
      "http://localhost:3001/cover-letter/cover-123/test%40example.com",
      expect.any(Object),
    );
  });

  it("uses custom CHROME_PATH when not in AWS", async () => {
    delete process.env.AWS_REGION;
    process.env.CHROME_PATH = "/custom/chrome/path";

    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    await GET(request);

    // Verify puppeteer was called with custom executable path
    const puppeteer = require("puppeteer-core");
    expect(puppeteer.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        executablePath: "/custom/chrome/path",
      }),
    );
  });

  it("uses chromium-min when in AWS", async () => {
    process.env.AWS_REGION = "us-east-1";

    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    await GET(request);

    // Verify puppeteer was called with chromium-min options.
    // chrome.executablePath() is awaited in the route, so the executablePath becomes a string.
    const puppeteer = require("puppeteer-core");
    const chromium = require("@sparticuz/chromium-min");
    expect(puppeteer.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        args: chromium.args,
        executablePath: expect.any(String),
      }),
    );
  });

  it("returns 500 if PDF generation fails (non-timeout error)", async () => {
    // Use a non-timeout error so route returns 500
    mockPage.goto.mockRejectedValueOnce(new Error("Some failure"));

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Failed to generate PDF");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("returns 408 if timeout occurs (error message includes 'timeout')", async () => {
    mockPage.goto.mockRejectedValueOnce(new Error("Navigation timeout error"));

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(408);
    expect(json.error).toBe("Failed to generate PDF");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("returns detailed error in development", async () => {
    //@ts-expect-error
    process.env.NODE_ENV = "development";
    mockPage.goto.mockRejectedValueOnce(new Error("Navigation failed"));

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    // In development the route includes the real message
    expect(json.message).toBe("Navigation failed");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("handles font loading timeout gracefully", async () => {
    mockPage.evaluate.mockRejectedValueOnce(new Error("Font timeout"));
    const mockPdfBuffer = Buffer.from("mock-pdf-content");
    mockPage.pdf.mockResolvedValueOnce(mockPdfBuffer);

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);

    // Should still succeed despite font loading error
    expect(response.status).toBe(200);
    expect(mockPage.pdf).toHaveBeenCalled();
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("returns 500 if browser.close throws during flow", async () => {
    // If close throws during the happy path, the route will catch and return an error.
    mockBrowser.close.mockRejectedValueOnce(new Error("Close failed"));
    mockPage.pdf.mockResolvedValueOnce(Buffer.from("mock-pdf-content"));

    const request = mockRequest({
      coverLetterId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Failed to generate PDF");
  });
});
