/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/navigation to control usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/link and preserve className so class assertions work
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock Heroicons and forward className so we can assert icon classes
jest.mock("@heroicons/react/24/outline", () => {
  const IconFactory = (testId: string) => (props: any) =>
    // use an element that accepts className
    React.createElement("svg", {
      "data-testid": testId,
      className: props.className,
      xmlns: "http://www.w3.org/2000/svg",
    });
  return {
    __esModule: true,
    HomeIcon: IconFactory("home-icon"),
    NewspaperIcon: IconFactory("newspaper-icon"),
    BuildingOffice2Icon: IconFactory("building-icon"),
    AcademicCapIcon: IconFactory("academic-icon"),
    AdjustmentsHorizontalIcon: IconFactory("adjustments-horizontal-icon"),
    DocumentDuplicateIcon: IconFactory("document-icon"),
    BriefcaseIcon: IconFactory("briefcase-icon"),
    CheckIcon: IconFactory("check-icon"),
    ListBulletIcon: IconFactory("list-bullet-icon"),
    AdjustmentsVerticalIcon: IconFactory("adjustments-vertical-icon"),
  };
});

import { usePathname } from "next/navigation";
import NavLinks from "../nav-links";

describe("NavLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all navigation links with correct icons and text", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<NavLinks />);

    // Link texts
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Job Applications")).toBeInTheDocument();
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Cover Letter Experience")).toBeInTheDocument();
    expect(screen.getByText("Resume Experience")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(screen.getByText("Organizations")).toBeInTheDocument();
    expect(screen.getByText("Resume Templates")).toBeInTheDocument();
    expect(screen.getByText("User Profile")).toBeInTheDocument();

    // Icons: some icons appear multiple times (document-icon). Use getAllByTestId for those.
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("newspaper-icon")).toBeInTheDocument();
    expect(screen.getByTestId("building-icon")).toBeInTheDocument();
    expect(screen.getByTestId("academic-icon")).toBeInTheDocument();
    expect(
      screen.getByTestId("adjustments-horizontal-icon"),
    ).toBeInTheDocument();
    expect(
      screen.getAllByTestId("document-icon").length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    expect(screen.getByTestId("list-bullet-icon")).toBeInTheDocument();
    expect(screen.getByTestId("adjustments-vertical-icon")).toBeInTheDocument();
  });

  it("applies active class to the current page link", () => {
    // Make Job Applications the active path
    (usePathname as jest.Mock).mockReturnValue("/dashboard/applications");

    render(<NavLinks />);

    const activeLink = screen.getByText("Job Applications").closest("a");
    expect(activeLink).toHaveClass("bg-amber-300");

    const inactiveLink = screen.getByText("Dashboard").closest("a");
    expect(inactiveLink).toHaveClass("bg-amber-50");
  });

  it("applies correct CSS classes to the Dashboard link and forwards icon classes", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<NavLinks />);

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass(
      "flex",
      "row",
      "h-auto",
      "tight-shadow",
      "gap-2",
      "rounded-md",
      "hover:text-rose-50",
      "hover:font-bold",
      "p-2",
      "text-sm",
      "font-lite",
      "hover:bg-amber-600",
      "bg-amber-300",
    );

    // Ensure the icon got the w-5 class forwarded
    const homeIcon = screen.getByTestId("home-icon");
    expect(homeIcon).toHaveClass("w-5");
  });
});
