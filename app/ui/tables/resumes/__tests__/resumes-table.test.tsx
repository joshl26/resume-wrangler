/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Resumes from "../resumes-table";
import type {
  User,
  Companies,
  Resume,
  Application,
} from "@/app/lib/definitions";

// Mock next/link to render plain anchors in tests
jest.mock("next/link", () => {
  return ({ href, children }: any) =>
    React.createElement("a", { href }, children);
});

describe("Resumes (table)", () => {
  const mockUser: User = {
    id: "user-1",
    name: "Jane Smith",
    email: "jane@example.com",
  } as User;

  const mockCompanies: Companies = [
    {
      id: "comp-1",
      name: "Tech Corp",
      address_one: "123 Main St",
    },
    {
      id: "comp-2",
      name: "Startup Inc",
      address_one: "456 Market St",
    },
  ] as Companies;

  // Keep lightweight mocks (no need to fill every Resume field in tests).
  // We'll cast when passing to the component so TS doesn't complain.
  const mockResumesWithApps = [
    {
      id: "resume-1",
      user_id: "user-1",
      application_id: "app-1",
      company_id: "comp-1",
      job_position: "Frontend Developer",
    },
    {
      id: "resume-2",
      user_id: "user-1",
      application_id: "app-2",
      company_id: "comp-2",
      job_position: "Backend Engineer",
    },
    {
      id: "resume-3",
      user_id: "user-1",
      application_id: "app-3",
      company_id: null,
      job_position: "Full Stack Dev",
    },
  ];

  // Mark defaultProps as `any` (or cast resumes) so TypeScript accepts our partial mocks.
  const defaultProps: any = {
    user: mockUser,
    resumes: mockResumesWithApps as unknown as Resume[], // cast to satisfy prop typing
    companies: mockCompanies,
  };

  it("renders table headers correctly", () => {
    render(<Resumes {...defaultProps} />);

    expect(screen.getByText("Job Title")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Application")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders resumes with correct data and links (uses real types)", () => {
    render(<Resumes {...defaultProps} />);

    // First resume row (Frontend Developer)
    const frontendLink = screen.getByRole("link", {
      name: /Frontend Developer/i,
    });
    expect(frontendLink).toHaveAttribute(
      "href",
      "/dashboard/resume/edit/resume-1",
    );

    const frontendRow = frontendLink.closest("tr");
    expect(frontendRow).toBeTruthy();
    if (!frontendRow) return;

    const rowQueries = within(frontendRow);
    expect(rowQueries.getByText("Tech Corp")).toBeInTheDocument();
    expect(rowQueries.getByText("123 Main St")).toBeInTheDocument();

    const editLinks = rowQueries.getAllByRole("link", { name: /Edit/i });
    const appEditLink1 = editLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/applications/edit/app-1",
    );
    expect(appEditLink1).toBeTruthy();

    const resumeEditLink1 = editLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/resume/edit/resume-1",
    );
    expect(resumeEditLink1).toBeTruthy();

    // Second resume row (Backend Engineer)
    const backendLink = screen.getByRole("link", { name: /Backend Engineer/i });
    expect(backendLink).toHaveAttribute(
      "href",
      "/dashboard/resume/edit/resume-2",
    );

    const backendRow = backendLink.closest("tr");
    expect(backendRow).toBeTruthy();
    if (!backendRow) return;

    const backendQueries = within(backendRow);
    expect(backendQueries.getByText("Startup Inc")).toBeInTheDocument();
    expect(backendQueries.getByText("456 Market St")).toBeInTheDocument();

    const backendEditLinks = backendQueries.getAllByRole("link", {
      name: /Edit/i,
    });
    const appEditLink2 = backendEditLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/applications/edit/app-2",
    );
    expect(appEditLink2).toBeTruthy();

    // Third resume row (no company)
    const fullStackLink = screen.getByRole("link", { name: /Full Stack Dev/i });
    expect(fullStackLink).toHaveAttribute(
      "href",
      "/dashboard/resume/edit/resume-3",
    );

    const fullStackRow = fullStackLink.closest("tr");
    expect(fullStackRow).toBeTruthy();
    if (!fullStackRow) return;

    const fullStackQueries = within(fullStackRow);
    const naInFullStack = fullStackQueries.getAllByText("N/A");
    expect(naInFullStack.length).toBe(2);
    expect(screen.getAllByText("N/A").length).toBeGreaterThanOrEqual(2);

    // Ensure a resume edit link exists for each resume id (deduplicated)
    const resumeEditLinks = screen
      .getAllByRole("link")
      .filter((link) =>
        link.getAttribute("href")?.startsWith("/dashboard/resume/edit/"),
      );
    const uniqueResumeHrefs = Array.from(
      new Set(resumeEditLinks.map((l) => l.getAttribute("href"))),
    );
    expect(uniqueResumeHrefs).toEqual(
      expect.arrayContaining([
        "/dashboard/resume/edit/resume-1",
        "/dashboard/resume/edit/resume-2",
        "/dashboard/resume/edit/resume-3",
      ]),
    );

    // Remove buttons: scoped checks
    expect(
      within(frontendRow).getByRole("button", { name: /Remove/i }),
    ).toBeInTheDocument();
    expect(
      within(backendRow).getByRole("button", { name: /Remove/i }),
    ).toBeInTheDocument();
    expect(
      within(fullStackRow).getByRole("button", { name: /Remove/i }),
    ).toBeInTheDocument();
  });

  it("renders create link when no resumes exist", () => {
    render(
      <Resumes
        {...{
          user: mockUser,
          resumes: [] as any,
          companies: mockCompanies,
        }}
      />,
    );

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first application here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/applications/new");
  });

  it("renders pagination controls", () => {
    render(<Resumes {...defaultProps} />);

    const nav = screen.getByLabelText("Table navigation");
    const navWithin = within(nav);
    expect(navWithin.getByText("1-10")).toBeInTheDocument();
    expect(navWithin.getByText("1000")).toBeInTheDocument();

    const prevLink = screen.getByRole("link", { name: /Previous/i });
    expect(prevLink).toBeInTheDocument();
    expect(prevLink).toHaveAttribute("href", "#");

    const nextLink = screen.getByRole("link", { name: /Next/i });
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute("href", "#");

    const pageLink = screen.getByRole("link", { name: "1" });
    expect(pageLink).toBeInTheDocument();
    expect(pageLink).toHaveAttribute("href", "#");
  });
});
