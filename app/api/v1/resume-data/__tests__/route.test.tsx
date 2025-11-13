/**
 * @jest-environment node
 *
 * app/api/resume-data/__tests__/route.test.ts
 *
 * Tests for the resume data API route
 */

import { NextRequest } from "next/server";
import { GET } from "../route";

// Mock the data layer
jest.mock("@/app/lib/data", () => ({
  fetchCertificationsByResumeID: jest.fn(),
  fetchEducationExperiencesbyResumeID: jest.fn(),
  fetchOrganizationsByResumeID: jest.fn(),
  fetchResumeById: jest.fn(),
  fetchSkillsByResumeID: jest.fn(),
  fetchWorkExperiencesbyResumeID: jest.fn(),
  getUser: jest.fn(),
}));

// Mock the rate limiter
jest.mock("@/app/lib/rateLimit", () => ({
  withRateLimit: jest.fn((handler) => handler),
}));

// Import mocked functions
import {
  fetchCertificationsByResumeID,
  fetchEducationExperiencesbyResumeID,
  fetchOrganizationsByResumeID,
  fetchResumeById,
  fetchSkillsByResumeID,
  fetchWorkExperiencesbyResumeID,
  getUser,
} from "@/app/lib/data";

describe("GET /api/resume-data", () => {
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
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 400 if resumeId is missing", async () => {
    const request = mockRequest({ userEmail: "test@example.com" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.message).toBe("resumeId is required");
  });

  it("returns 400 if userEmail is missing", async () => {
    const request = mockRequest({ resumeId: "resume-123" });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.message).toBe("userEmail is required");
  });

  it("returns 404 if user is not found", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce(null);

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("User not found");
    expect(getUser).toHaveBeenCalledWith("test@example.com");
  });

  it("returns 404 if resume is not found", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
    });
    (fetchResumeById as jest.Mock).mockResolvedValueOnce(null);

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Resume not found");
    expect(fetchResumeById).toHaveBeenCalledWith("resume-123");
  });

  it("returns 403 if user is not authorized (not owner and not admin)", async () => {
    (getUser as jest.Mock).mockResolvedValueOnce({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      access_level: "user",
    });
    (fetchResumeById as jest.Mock).mockResolvedValueOnce({
      id: "resume-123",
      user_id: "user-456", // Different user ID
    });

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(403);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Forbidden");
  });

  it("returns resume data successfully for owner", async () => {
    const mockUser = {
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      access_level: "user",
    };

    const mockResume = {
      id: "resume-123",
      user_id: "user-123",
      title: "Test Resume",
    };

    const mockSkills = [{ id: "skill-1", name: "JavaScript" }];
    const mockEducation = [{ id: "edu-1", institution: "Test University" }];
    const mockOrganizations = [{ id: "org-1", name: "Test Org" }];
    const mockCertifications = [{ id: "cert-1", name: "Test Cert" }];
    const mockWork = [{ id: "work-1", company: "Test Company" }];

    (getUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (fetchResumeById as jest.Mock).mockResolvedValueOnce(mockResume);
    (fetchSkillsByResumeID as jest.Mock).mockResolvedValueOnce(mockSkills);
    (fetchEducationExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce(
      mockEducation,
    );
    (fetchOrganizationsByResumeID as jest.Mock).mockResolvedValueOnce(
      mockOrganizations,
    );
    (fetchCertificationsByResumeID as jest.Mock).mockResolvedValueOnce(
      mockCertifications,
    );
    (fetchWorkExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce(
      mockWork,
    );

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(json.success).toBe(true);
    expect(json.data).toEqual({
      user: {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
      },
      resume: mockResume,
      skillResumeLines: mockSkills,
      educationResumeLines: mockEducation,
      organizationResumeLines: mockOrganizations,
      certificationResumeLines: mockCertifications,
      workResumeLines: mockWork,
    });

    // Verify all functions were called with correct parameters
    expect(getUser).toHaveBeenCalledWith("test@example.com");
    expect(fetchResumeById).toHaveBeenCalledWith("resume-123");
    expect(fetchSkillsByResumeID).toHaveBeenCalledWith("resume-123");
    expect(fetchEducationExperiencesbyResumeID).toHaveBeenCalledWith(
      "resume-123",
    );
    expect(fetchOrganizationsByResumeID).toHaveBeenCalledWith("resume-123");
    expect(fetchCertificationsByResumeID).toHaveBeenCalledWith("resume-123");
    expect(fetchWorkExperiencesbyResumeID).toHaveBeenCalledWith("resume-123");
  });

  it("returns resume data successfully for admin", async () => {
    const mockUser = {
      id: "admin-123",
      name: "Admin User",
      email: "admin@example.com",
      access_level: "admin",
    };

    const mockResume = {
      id: "resume-123",
      user_id: "user-456", // Different user ID
      title: "Test Resume",
    };

    const mockSkills = [{ id: "skill-1", name: "JavaScript" }];
    const mockEducation = [{ id: "edu-1", institution: "Test University" }];
    const mockOrganizations = [{ id: "org-1", name: "Test Org" }];
    const mockCertifications = [{ id: "cert-1", name: "Test Cert" }];
    const mockWork = [{ id: "work-1", company: "Test Company" }];

    (getUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (fetchResumeById as jest.Mock).mockResolvedValueOnce(mockResume);
    (fetchSkillsByResumeID as jest.Mock).mockResolvedValueOnce(mockSkills);
    (fetchEducationExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce(
      mockEducation,
    );
    (fetchOrganizationsByResumeID as jest.Mock).mockResolvedValueOnce(
      mockOrganizations,
    );
    (fetchCertificationsByResumeID as jest.Mock).mockResolvedValueOnce(
      mockCertifications,
    );
    (fetchWorkExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce(
      mockWork,
    );

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "admin@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.user).toEqual({
      id: "admin-123",
      name: "Admin User",
      email: "admin@example.com",
    });
  });

  it("sanitizes inputs correctly", async () => {
    const mockUser = {
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      access_level: "user",
    };

    const mockResume = {
      id: "resume-123",
      user_id: "user-123",
      title: "Test Resume",
    };

    (getUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (fetchResumeById as jest.Mock).mockResolvedValueOnce(mockResume);
    (fetchSkillsByResumeID as jest.Mock).mockResolvedValueOnce([]);
    (fetchEducationExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce(
      [],
    );
    (fetchOrganizationsByResumeID as jest.Mock).mockResolvedValueOnce([]);
    (fetchCertificationsByResumeID as jest.Mock).mockResolvedValueOnce([]);
    (fetchWorkExperiencesbyResumeID as jest.Mock).mockResolvedValueOnce([]);

    const request = mockRequest({
      resumeId: "  resume-123  ", // Extra whitespace
      userEmail: "  TEST@EXAMPLE.COM  ", // Uppercase and whitespace
    });
    await GET(request);

    // Verify inputs were sanitized
    expect(getUser).toHaveBeenCalledWith("test@example.com");
    expect(fetchResumeById).toHaveBeenCalledWith("resume-123");
  });

  it("returns 500 if there's an internal server error", async () => {
    (getUser as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const request = mockRequest({
      resumeId: "resume-123",
      userEmail: "test@example.com",
    });
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBe("Failed to fetch resume data");
  });
});
