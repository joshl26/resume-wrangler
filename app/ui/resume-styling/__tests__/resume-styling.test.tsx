/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResumeStyling from "../resume-styling";

// Mock next/link to render a plain anchor for tests
jest.mock("next/link", () => {
  return ({ href, children }: any) =>
    React.createElement("a", { href }, children);
});

// Mock child components used inside ResumeStyling to keep tests focused and fast.
// Each mock renders an element with an explicit test id or visible text so tests can assert on it.
jest.mock("@/app/ui/forms/your-resume-styling", () => () => (
  <div data-testid="your-resume-styling">YourResumeStyling</div>
));
jest.mock("@/app/ui/forms/your-profile", () => () => (
  <div data-testid="your-profile">YourProfile</div>
));
jest.mock("@/app/ui/forms/your-social-links", () => () => (
  <div data-testid="your-social-links">YourSocialLinks</div>
));
jest.mock("@/app/ui/forms/your-skills", () => () => (
  <div data-testid="your-skills">YourSkills</div>
));
jest.mock("@/app/ui/forms/your-education", () => () => (
  <div data-testid="your-education">YourEducation</div>
));
jest.mock("@/app/ui/forms/your-work-experiences", () => () => (
  <div data-testid="your-experience">YourWorkExperiences</div>
));
jest.mock("@/app/ui/forms/your-organizations", () => () => (
  <div data-testid="your-organizations">YourOrganizations</div>
));
jest.mock("@/app/ui/forms/your-certifications", () => () => (
  <div data-testid="your-certifications">YourCertifications</div>
));
// Mock the resume preview/downloader and back button
jest.mock("@/app/ui/resume-preview-button", () => () => (
  <div data-testid="resume-preview-button">ResumePreviewButton</div>
));
jest.mock("@/app/ui/back-button", () => ({ children }: any) => (
  <button data-testid="back-button">{children}</button>
));

// Provide a minimal props object containing only the fields used by the component.
// Types are intentionally minimal to keep the test focused.
const baseProps = {
  resumeTemplates: {},
  resumeColors: {},
  bodyFonts: {},
  headerFonts: {},
  user: {
    id: "u1",
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    access_level: "pro", // non-empty -> shows "Download PDF" anchor
  },
  resume: {
    id: "r1",
    template: "elegant",
    body_font: "Arial",
    heading_font: "Georgia",
    color: "blue",
    highlight_color: "pink",
    show_social_icons: true,
    show_skills_section: true,
    show_skill_progress: true,
    show_education_section: true,
    show_custom_section_one: false,
    show_custom_section_two: false,
  },
  userSkills: {},
  userEducation: {},
  userOrganizations: {},
  userCertifications: {},
  userWorkExperiences: {},
  educationResumeLines: {},
  workResumeLines: {},
  skillResumeLines: {},
  certificationResumeLines: {},
  organizationResumeLines: {},
  company: {},
  application: { job_position: "Frontend Developer" },
};

describe("ResumeStyling", () => {
  const u = userEvent.setup();

  it("renders the sidebar and default (styling) section", () => {
    render(<ResumeStyling {...(baseProps as any)} />);

    // Sidebar buttons present
    expect(
      screen.getByRole("button", { name: /Styling/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Socials/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Skills/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Education/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Organizations/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Certifications/i }),
    ).toBeInTheDocument();

    // Default selected section is "styling" -> YourResumeStyling should be visible
    expect(screen.getByTestId("your-resume-styling")).toBeInTheDocument();

    // Resume preview button should be present
    expect(screen.getByTestId("resume-preview-button")).toBeInTheDocument();

    // Because user.access_level is non-empty, a Download PDF anchor should be rendered
    const downloadAnchor = screen.getByRole("link", { name: /Download PDF/i });
    expect(downloadAnchor).toBeInTheDocument();
    // href should include resumeId and userEmail
    expect(downloadAnchor.getAttribute("href")).toContain("api/pdf?resumeId=");
    expect(downloadAnchor.getAttribute("href")).toContain(
      `userEmail=${baseProps.user.email}`,
    );
    // download attribute should be present and include user's name and job_position
    expect(downloadAnchor.getAttribute("download")).toContain(
      baseProps.user.first_name,
    );
    expect(downloadAnchor.getAttribute("download")).toContain(
      baseProps.application.job_position,
    );
  });

  it("switches sections when sidebar buttons are clicked", async () => {
    render(<ResumeStyling {...(baseProps as any)} />);

    // Click Profile
    await u.click(screen.getByRole("button", { name: /Profile/i }));
    expect(screen.getByTestId("your-profile")).toBeInTheDocument();

    // Click Socials
    await u.click(screen.getByRole("button", { name: /Socials/i }));
    expect(screen.getByTestId("your-social-links")).toBeInTheDocument();

    // Click Skills
    await u.click(screen.getByRole("button", { name: /Skills/i }));
    expect(screen.getByTestId("your-skills")).toBeInTheDocument();

    // Click Education
    await u.click(screen.getByRole("button", { name: /Education/i }));
    expect(screen.getByTestId("your-education")).toBeInTheDocument();

    // Click Experience
    await u.click(screen.getByRole("button", { name: /Experience/i }));
    expect(screen.getByTestId("your-experience")).toBeInTheDocument();

    // Click Organizations
    await u.click(screen.getByRole("button", { name: /Organizations/i }));
    expect(screen.getByTestId("your-organizations")).toBeInTheDocument();

    // Click Certifications
    await u.click(screen.getByRole("button", { name: /Certifications/i }));
    expect(screen.getByTestId("your-certifications")).toBeInTheDocument();
  });

  it("shows upgrade link when user has no access_level", () => {
    const noAccessProps = {
      ...baseProps,
      user: { ...baseProps.user, access_level: "" },
    };

    render(<ResumeStyling {...(noAccessProps as any)} />);

    // When access_level is empty, the component renders a Link to upgrade with the visible text
    const upgradeLink = screen.getByRole("link", {
      name: /Upgrade Account to Download PDF/i,
    });
    expect(upgradeLink).toBeInTheDocument();
    expect(upgradeLink).toHaveAttribute("href", "/dashboard/upgrade");
  });
});
