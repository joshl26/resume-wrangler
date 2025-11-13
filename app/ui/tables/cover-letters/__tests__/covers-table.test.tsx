/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CoverLetters from "../covers-table";
import type {
  User,
  Companies,
  Applications,
  CoverLetters as CoverLettersType,
} from "@/app/lib/definitions";

// Mock next/link to render plain anchors in tests
jest.mock("next/link", () => {
  return ({ href, children }: any) =>
    React.createElement("a", { href }, children);
});

// Mock deleteCoverLetter action
const mockDeleteCoverLetter = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteCoverLetter: (...args: any[]) => mockDeleteCoverLetter(...args),
}));

describe("CoverLetters (table)", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  const mockApplications: Applications = [
    {
      id: "app-1",
      user_id: "user-1",
      company_id: "comp-1",
      job_position: "Frontend Developer",
    },
    {
      id: "app-2",
      user_id: "user-1",
      company_id: "comp-2",
      job_position: "Backend Engineer",
    },
  ] as Applications;

  const mockCoverLetters: CoverLettersType = [
    {
      id: "cl-1",
      user_id: "user-1",
      application_id: "app-1",
      company_id: "comp-1",
      job_position: "Frontend Developer",
    },
    {
      id: "cl-2",
      user_id: "user-1",
      application_id: "app-2",
      company_id: "comp-2",
      job_position: "Backend Engineer",
    },
    {
      id: "cl-3",
      user_id: "user-1",
      application_id: "app-3", // No matching app/company
      company_id: null,
      job_position: "Full Stack Dev",
    },
  ] as unknown as CoverLettersType;

  const defaultProps = {
    user: mockUser,
    coverLetters: mockCoverLetters,
    applications: mockApplications,
    companies: mockCompanies,
  };

  it("renders table headers correctly", () => {
    render(<CoverLetters {...defaultProps} />);

    expect(screen.getByText("Job Title")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Application")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders cover letters with correct data and links (uses real types)", () => {
    render(<CoverLetters {...defaultProps} />);

    // First cover letter row (Frontend Developer)
    const frontendLink = screen.getByRole("link", {
      name: /Frontend Developer/i,
    });
    expect(frontendLink).toHaveAttribute("href", "/dashboard/cover/edit/cl-1");

    const frontendRow = frontendLink.closest("tr");
    expect(frontendRow).toBeTruthy();
    if (!frontendRow) return;

    const rowQueries = within(frontendRow);
    expect(rowQueries.getByText("Tech Corp")).toBeInTheDocument();
    expect(rowQueries.getByText("123 Main St")).toBeInTheDocument();

    // There are multiple "Edit" links in the row. Use getAllByRole and pick by href.
    const editLinks = rowQueries.getAllByRole("link", { name: /Edit/i });
    const appEditLink1 = editLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/applications/edit/app-1",
    );
    expect(appEditLink1).toBeTruthy();

    const coverEditLink1 = editLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/cover/edit/cl-1",
    );
    expect(coverEditLink1).toBeTruthy();

    const removeBtn1 = rowQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn1).toBeInTheDocument();

    // Second cover letter row (Backend Engineer)
    const backendLink = screen.getByRole("link", { name: /Backend Engineer/i });
    expect(backendLink).toHaveAttribute("href", "/dashboard/cover/edit/cl-2");

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

    const coverEditLink2 = backendEditLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/cover/edit/cl-2",
    );
    expect(coverEditLink2).toBeTruthy();

    const removeBtn2 = backendQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn2).toBeInTheDocument();

    // Third cover letter row (no company)
    const fullStackLink = screen.getByRole("link", { name: /Full Stack Dev/i });
    expect(fullStackLink).toHaveAttribute("href", "/dashboard/cover/edit/cl-3");

    const fullStackRow = fullStackLink.closest("tr");
    expect(fullStackRow).toBeTruthy();
    if (!fullStackRow) return;

    const fullStackQueries = within(fullStackRow);
    expect(fullStackQueries.getAllByText("N/A").length).toBe(2); // company and location

    const fullStackEditLinks = fullStackQueries.getAllByRole("link", {
      name: /Edit/i,
    });
    const coverEditLink3 = fullStackEditLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/cover/edit/cl-3",
    );
    expect(coverEditLink3).toBeTruthy();

    const removeBtn3 = fullStackQueries.getByRole("button", {
      name: /Remove/i,
    });
    expect(removeBtn3).toBeInTheDocument();
  });

  it("renders create link when no cover letters exist", () => {
    render(<CoverLetters {...defaultProps} coverLetters={[]} />);

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first application here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/applications/new");
  });

  it("renders pagination controls", () => {
    render(<CoverLetters {...defaultProps} />);

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

  it("clicking Remove doesn't crash (remove handler not wired)", async () => {
    render(<CoverLetters {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    expect(removeBtn).toBeInTheDocument();
  });
});
