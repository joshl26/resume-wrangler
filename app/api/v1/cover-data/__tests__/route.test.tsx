/**
 * @jest-environment node
 *
 * app/api/cover-data/__tests__/route.test.ts
 *
 * Tests for the cover data API route
 */

import { NextRequest } from "next/server";
import { GET } from "../route";

// Mock the data layer
jest.mock("@/app/lib/data", () => ({
  fetchApplicationById: jest.fn(),
  fetchCompanyById: jest.fn(),
  fetchCoverExperiencesByCoverLetterId: jest.fn(),
  fetchCoverExperiencesByUserId: jest.fn(),
  fetchCoverLetterByIdAndUserId: jest.fn(),
  getUser: jest.fn(),
}));

// Mock the rate limiter
jest.mock("@/app/lib/rateLimit", () => ({
  withRateLimit: jest.fn((handler) => handler),
}));

// Import mocked functions
import {
  fetchApplicationById,
  fetchCompanyById,
  fetchCoverExperiencesByCoverLetterId,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  getUser,
} from "@/app/lib/data";

describe("GET /api/cover-data", () => {
  const mockRequest = (params: Record<string, string>): NextRequest => {
    const url = new URL("https://example.com");
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return new NextRequest(url.toString());
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if coverId is missing", async () => {
    const request = mockRequest({ userEmail: "test@example.com" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("Valid cover ID is required");
  });

  it("returns 400 if coverId is not a string", async () => {
    const request = mockRequest({ coverId: "", userEmail: "test@example.com" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("Valid cover ID is required");
  });

  it("returns 400 if userEmail is missing", async () => {
    const request = mockRequest({ coverId: "cover-123" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("Valid user email is required");
  });

  it("returns 400 if userEmail is not a string", async () => {
    const request = mockRequest({ coverId: "cover-123", userEmail: "" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe("Valid user email is required");
  });

  it("returns 404 if user is not found", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce(null);

    const request = mockRequest({
      coverId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.message).toBe("User not found");
    expect(getUser).toHaveBeenCalledWith("test@example.com");
  });

  it("returns 404 if cover letter is not found", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
    });
    (fetchCoverLetterByIdAndUserId as jest.Mock).mockResolvedValueOnce(null);

    const request = mockRequest({
      coverId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.message).toBe("Cover letter not found or access denied");
    expect(fetchCoverLetterByIdAndUserId).toHaveBeenCalledWith(
      "cover-123",
      "user-123",
    );
  });

  it("returns complete cover data successfully", async () => {
    // Mock all data dependencies
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
    });

    (fetchCoverLetterByIdAndUserId as jest.Mock).mockResolvedValueOnce({
      id: "cover-123",
      title: "Test Cover Letter",
      body: "Dear Hiring Manager...",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      company_id: "company-456",
      application_id: "app-789",
      body_font: "Arial",
      heading_font: "Helvetica",
      color: "#000000",
      highlight_color: "#FF0000",
    });

    (fetchCompanyById as jest.Mock).mockResolvedValueOnce({
      id: "company-456",
      name: "Test Company",
    });

    (fetchApplicationById as jest.Mock).mockResolvedValueOnce({
      id: "app-789",
      position: "Software Engineer",
    });

    (fetchCoverExperiencesByCoverLetterId as jest.Mock).mockResolvedValueOnce([
      { id: "exp-1", content: "Experience 1" },
    ]);

    (fetchCoverExperiencesByUserId as jest.Mock).mockResolvedValueOnce([
      { id: "exp-1", content: "Experience 1" },
      { id: "exp-2", content: "Experience 2" },
    ]);

    const request = mockRequest({
      coverId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual({
      user: {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
      },
      coverLetter: {
        id: "cover-123",
        title: "Test Cover Letter",
        body: "Dear Hiring Manager...",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
        companyId: "company-456",
        applicationId: "app-789",
      },
      selectedCoverExperiences: [{ id: "exp-1", content: "Experience 1" }],
      userCoverExperiences: [
        { id: "exp-1", content: "Experience 1" },
        { id: "exp-2", content: "Experience 2" },
      ],
      company: { id: "company-456", name: "Test Company" },
      application: { id: "app-789", position: "Software Engineer" },
      styling: {
        bodyFont: "Arial",
        headingFont: "Helvetica",
        color: "#000000",
        highlightColor: "#FF0000",
      },
    });

    // Verify all functions were called with correct parameters
    expect(getUser).toHaveBeenCalledWith("test@example.com");
    expect(fetchCoverLetterByIdAndUserId).toHaveBeenCalledWith(
      "cover-123",
      "user-123",
    );
    expect(fetchCompanyById).toHaveBeenCalledWith("company-456");
    expect(fetchApplicationById).toHaveBeenCalledWith("app-789");
    expect(fetchCoverExperiencesByCoverLetterId).toHaveBeenCalledWith(
      "cover-123",
    );
    expect(fetchCoverExperiencesByUserId).toHaveBeenCalledWith("user-123");
  });

  it("handles null company and application gracefully", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
    });

    (fetchCoverLetterByIdAndUserId as jest.Mock).mockResolvedValueOnce({
      id: "cover-123",
      title: "Test Cover Letter",
      body: "Dear Hiring Manager...",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      company_id: null,
      application_id: null,
      body_font: null,
      heading_font: null,
      color: null,
      highlight_color: null,
    });

    (fetchCompanyById as jest.Mock).mockResolvedValueOnce(null);
    (fetchApplicationById as jest.Mock).mockResolvedValueOnce(null);
    (fetchCoverExperiencesByCoverLetterId as jest.Mock).mockResolvedValueOnce(
      [],
    );
    (fetchCoverExperiencesByUserId as jest.Mock).mockResolvedValueOnce([]);

    const request = mockRequest({
      coverId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.company).toBeNull();
    expect(json.data.application).toBeNull();
    expect(json.data.styling).toEqual({
      bodyFont: null,
      headingFont: null,
      color: null,
      highlightColor: null,
    });
  });

  it("returns 500 if there's an internal server error", async () => {
    (getUser as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const request = mockRequest({
      coverId: "cover-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Failed to fetch cover data");
  });

  it("sanitizes inputs correctly", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
    });

    (fetchCoverLetterByIdAndUserId as jest.Mock).mockResolvedValueOnce({
      id: "cover-123",
      title: "Test Cover Letter",
      body: "Dear Hiring Manager...",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      company_id: null,
      application_id: null,
      body_font: null,
      heading_font: null,
      color: null,
      highlight_color: null,
    });

    (fetchCompanyById as jest.Mock).mockResolvedValueOnce(null);
    (fetchApplicationById as jest.Mock).mockResolvedValueOnce(null);
    (fetchCoverExperiencesByCoverLetterId as jest.Mock).mockResolvedValueOnce(
      [],
    );
    (fetchCoverExperiencesByUserId as jest.Mock).mockResolvedValueOnce([]);

    const request = mockRequest({
      coverId: "  cover-123  ", // Extra whitespace
      userEmail: "  TEST@EXAMPLE.COM  ", // Uppercase and whitespace
    });
    await GET(request);

    // Verify inputs were sanitized
    expect(getUser).toHaveBeenCalledWith("test@example.com");
    expect(fetchCoverLetterByIdAndUserId).toHaveBeenCalledWith(
      "cover-123",
      "user-123",
    );
  });
});
