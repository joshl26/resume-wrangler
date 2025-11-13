/**
 * @jest-environment node
 *
 * app/cover-letter/[coverLetterId]/[userEmail]/__tests__/page.test.tsx
 *
 * Tests for the server component app/cover-letter/[coverLetterId]/[userEmail]/page.tsx
 *
 * - Mocks data fetching (getCoverData) so tests don't hit real data.
 * - Mocks UI components (StandardCover, CoverEditButton) to keep output deterministic.
 * - Calls the async page function, renders the returned element to static HTML,
 *   and asserts on the produced HTML string.
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// --- Mocks ---
// Mock data fetcher
jest.mock("@/app/lib/data", () => ({
  __esModule: true,
  getCoverData: jest.fn(),
}));

// Mock UI components
jest.mock("@/app/ui/cover/standard/standard-cover", () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement(
      "div",
      { "data-testid": "mock-standard-cover" },
      `StandardCover: ${props.coverLetter?.id}, ${props.user?.email}`,
    ),
}));

jest.mock("@/app/ui/cover-edit-button", () => ({
  __esModule: true,
  default: ({ coverId }: { coverId: string }) =>
    React.createElement(
      "div",
      { "data-testid": "mock-cover-edit-button" },
      `Edit Button for ${coverId}`,
    ),
}));

// Import after mocks
import Page from "../page";
import { getCoverData } from "@/app/lib/data";

describe("Cover Letter Page (server)", () => {
  const mockParams = {
    coverLetterId: "cl-123",
    userEmail: "user@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cover letter page with StandardCover and CoverEditButton", async () => {
    // Mock successful data fetch
    (getCoverData as jest.Mock).mockResolvedValue({
      user: { id: "user-1", email: "user@example.com" },
      coverLetter: { id: "cl-123", template: "standard" },
      company: {},
      application: {},
      selectedCoverExperiences: [],
      userCoverExperiences: [],
      selectedCoverBodyFont: {},
      selectedCoverHeadingFont: {},
      selectedCoverColor: {},
      selectedCoverHighlightColor: {},
    });

    // Create a resolved Promise for params (matching Next.js behavior)
    const resolvedParams = Promise.resolve(mockParams);

    const element = await Page({ params: resolvedParams });
    const html = renderToStaticMarkup(element);

    // Should render the edit button
    expect(html).toContain('data-testid="mock-cover-edit-button"');
    expect(html).toContain("Edit Button for cl-123");

    // Should render the standard cover with data
    expect(html).toContain('data-testid="mock-standard-cover"');
    expect(html).toContain("StandardCover: cl-123, user@example.com");
  });

  it("renders error message when cover data is not found", async () => {
    // Mock data fetch returning null
    (getCoverData as jest.Mock).mockResolvedValue(null);

    const resolvedParams = Promise.resolve(mockParams);

    const element = await Page({ params: resolvedParams });
    const html = renderToStaticMarkup(element);

    // Should show error message
    expect(html).toContain("Error loading cover letter data.");

    // Should not render edit button or cover
    expect(html).not.toContain('data-testid="mock-cover-edit-button"');
    expect(html).not.toContain('data-testid="mock-standard-cover"');
  });

  it("renders missing params message when params is undefined", async () => {
    // Pass undefined params
    const element = await Page({ params: undefined });
    const html = renderToStaticMarkup(element);

    // Should show missing params message
    expect(html).toContain("Missing route parameters.");

    // Should not attempt to fetch data
    expect(getCoverData).not.toHaveBeenCalled();

    // Should not render edit button or cover
    expect(html).not.toContain('data-testid="mock-cover-edit-button"');
    expect(html).not.toContain('data-testid="mock-standard-cover"');
  });

  it("does not render StandardCover when template is not 'standard'", async () => {
    // Mock data with different template
    (getCoverData as jest.Mock).mockResolvedValue({
      user: { id: "user-1", email: "user@example.com" },
      coverLetter: { id: "cl-123", template: "modern" }, // Not 'standard'
      company: {},
      application: {},
      selectedCoverExperiences: [],
      userCoverExperiences: [],
      selectedCoverBodyFont: {},
      selectedCoverHeadingFont: {},
      selectedCoverColor: {},
      selectedCoverHighlightColor: {},
    });

    const resolvedParams = Promise.resolve(mockParams);

    const element = await Page({ params: resolvedParams });
    const html = renderToStaticMarkup(element);

    // Should render the edit button
    expect(html).toContain('data-testid="mock-cover-edit-button"');

    // Should NOT render the standard cover
    expect(html).not.toContain('data-testid="mock-standard-cover"');
  });
});
