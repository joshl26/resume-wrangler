/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mocks must be declared before importing the component under test
 * so the module loader uses our mocks when the component imports them.
 */

// Mock next/link to render a simple anchor (keeps href & children)
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Mock child components used by CoverStyling to make assertions simple
jest.mock("@/app/ui/resume-preview-button", () => ({
  __esModule: true,
  default: () => (
    <button data-testid="resume-preview-button">ResumePreview</button>
  ),
}));

jest.mock("@/app/ui/back-button", () => ({
  __esModule: true,
  default: ({ children }: any) => <a data-testid="back-button">{children}</a>,
}));

jest.mock("@/app/ui/forms/your-cover-styling", () => ({
  __esModule: true,
  default: () => <div data-testid="your-cover-styling">YourCoverStyling</div>,
}));

jest.mock("@/app/ui/forms/your-cover-letter-experiences", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="your-cover-letter-experiences">
      YourCoverLetterExperiences
    </div>
  ),
}));

jest.mock("@/app/ui/cover/standard/standard-cover", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="standard-cover">
      StandardCover - template:{String(props.selectedCoverTemplate)}
    </div>
  ),
}));

// Mock the CoverLetterPreviewButton component that's actually used
jest.mock("@/app/ui/cover-letter-preview-button", () => ({
  __esModule: true,
  default: () => <a data-testid="preview-button">Preview</a>,
}));

// Import the component under test after establishing mocks
import CoverStyling from "../cover-styling";

describe("CoverStyling", () => {
  // Cast test props to `any` to avoid needing full domain types
  const baseProps: any = {
    userCoverExperiences: [],
    user: {
      id: "user123",
      email: "user@example.com",
      first_name: "John",
      last_name: "Doe",
      access_level: "pro", // default non-basic
      // other User fields omitted for tests
    },
    coverLetter: {
      id: "cv1",
      template: "standard",
      body_font: "Arial",
      heading_font: "Helvetica",
      color: "blue",
      highlight_color: "orange",
    },
    company: { name: "Acme" },
    application: { job_position: "Engineer" },
    selectedCoverExperiences: [],
    coverTemplates: {},
    resumeColors: {},
    bodyFonts: {},
    headerFonts: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children (BackButton, YourCoverStyling, StandardCover, preview) and shows Download for non-basic users", () => {
    render(<CoverStyling {...baseProps} />);

    // BackButton rendered with children "Back"
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toHaveTextContent("Back");

    // YourCoverStyling and YourCoverLetterExperiences rendered
    expect(screen.getByTestId("your-cover-styling")).toBeInTheDocument();
    expect(
      screen.getByTestId("your-cover-letter-experiences"),
    ).toBeInTheDocument();

    // StandardCover should render because coverLetter.template === 'standard'
    expect(screen.getByTestId("standard-cover")).toBeInTheDocument();

    // Preview button component exists
    expect(screen.getByTestId("preview-button")).toBeInTheDocument();

    // Download PDF link present for non-basic user
    const downloadLink = screen.getByText("Download PDF");
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute(
      "href",
      `/api/cover-pdf?coverLetterId=${baseProps.coverLetter.id}&userEmail=${baseProps.user.email}`,
    );

    // Download attribute is constructed from user and application props
    expect(downloadLink).toHaveAttribute(
      "download",
      `${baseProps.user.first_name}_${baseProps.user.last_name}_${baseProps.application.job_position}_cover_letter.pdf`,
    );
  });

  it("shows upgrade link for basic users instead of Download PDF", () => {
    const basicUserProps = {
      ...baseProps,
      user: {
        ...baseProps.user,
        access_level: "basic",
      },
    };

    render(<CoverStyling {...(basicUserProps as any)} />);

    // Download PDF should NOT be present
    expect(screen.queryByText("Download PDF")).not.toBeInTheDocument();

    // Upgrade link (next/link mocked as anchor) should be shown
    const upgradeLink = screen.getByText("Upgrade Account to Download PDF");
    expect(upgradeLink).toBeInTheDocument();
    expect(upgradeLink).toHaveAttribute("href", "/dashboard/upgrade");
  });
});
