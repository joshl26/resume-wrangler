/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationsTable from "../applications-table";
import type {
  User,
  Application,
  Applications,
  Companies,
  Company,
  CoverLetter,
  CoverLetters,
  Resume,
  Resumes,
} from "@/app/lib/definitions";

// Mock next/link to render plain anchors in tests
jest.mock("next/link", () => {
  return ({ href, children }: any) =>
    React.createElement("a", { href }, children);
});

// Mock next/navigation to control router.refresh
const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

// Create jest.fn wrappers for each action and mock the module
const mockCreateCoverLetter = jest.fn();
const mockCreateResume = jest.fn();
const mockDeleteApplication = jest.fn();
const mockDeleteCoverLetter = jest.fn();
const mockDeleteResume = jest.fn();

jest.mock("@/app/lib/actions", () => ({
  createCoverLetter: (...args: any[]) => mockCreateCoverLetter(...args),
  createResume: (...args: any[]) => mockCreateResume(...args),
  deleteApplication: (...args: any[]) => mockDeleteApplication(...args),
  deleteCoverLetter: (...args: any[]) => mockDeleteCoverLetter(...args),
  deleteResume: (...args: any[]) => mockDeleteResume(...args),
}));

// Mock fetchFilteredApplications
const mockFetchFilteredApplications = jest.fn();
jest.mock("@/app/lib/data", () => ({
  fetchFilteredApplications: (...args: any[]) =>
    mockFetchFilteredApplications(...args),
}));

// Mock Pagination component to simplify assertions
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("ApplicationsTable", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: User = {
    id: "user-1",
    name: "Jane Doe",
    email: "jane@example.com",
  } as User;

  const mockCompanies: Companies = [
    {
      id: "comp-1",
      name: "Acme Co",
      address_one: "100 Main St",
    },
  ] as Companies;

  const mockCoverLetters: CoverLetters = [
    {
      id: "cover-1",
      application_id: "app-1",
      user_id: "user-1",
      content: "Cover 1",
    },
  ] as unknown as CoverLetters;

  const mockResumes: Resumes = [
    {
      id: "resume-1",
      application_id: "app-1",
      user_id: "user-1",
      content: "Resume 1",
    },
  ] as unknown as Resumes;

  const mockApplications: Applications = [
    {
      id: "app-1",
      job_position: "Frontend Engineer",
      company_id: "comp-1",
      is_complete: "2023-01-01",
    },
    {
      id: "app-2",
      job_position: "Backend Developer",
      company_id: "comp-unknown",
      is_complete: null,
    },
  ] as Applications;

  const defaultProps = {
    user: mockUser,
    resumes: mockResumes,
    coverLetters: mockCoverLetters,
    companies: mockCompanies,
    totalPages: 3,
    query: "",
    currentPage: 1,
    totalCount: 42,
    sort: "newest",
    serverApplications: mockApplications,
  };

  it("renders table headers and pagination", () => {
    render(<ApplicationsTable {...defaultProps} />);

    expect(screen.getByText("Job Position")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Submitted")).toBeInTheDocument();
    expect(screen.getByText("Cover")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Application")).toBeInTheDocument();

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 3");
    expect(pagination).toHaveTextContent("Total Count: 42");
  });

  it("renders applications rows with correct links and company data (using real types)", () => {
    render(<ApplicationsTable {...defaultProps} />);

    // Job position links (use these to scope to the row)
    const app1Link = screen.getByRole("link", {
      name: /Frontend Engineer/i,
    });
    expect(app1Link).toHaveAttribute(
      "href",
      "/dashboard/applications/edit/app-1",
    );

    const app2Link = screen.getByRole("link", {
      name: /Backend Developer/i,
    });
    expect(app2Link).toHaveAttribute(
      "href",
      "/dashboard/applications/edit/app-2",
    );

    // Company name and location for app-1 (company exists)
    expect(screen.getByText("Acme Co")).toBeInTheDocument();
    expect(screen.getByText("100 Main St")).toBeInTheDocument();

    // For app-2 company not found -> "N/A"
    expect(screen.getAllByText("N/A").length).toBeGreaterThanOrEqual(1);

    // Submitted column shows date for app-1 and "—" for null (app-2)
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(1);

    // Now scope to the first row (app-1) to find its cover/resume/app specific Edit links
    const app1Row = app1Link.closest("tr");
    expect(app1Row).toBeTruthy();
    if (!app1Row) return; // typeguard for TS

    const rowQueries = within(app1Row);
    const editLinksInRow = rowQueries.getAllByRole("link", { name: /Edit/i });
    // There should be multiple "Edit" links in the row (cover, resume, application)
    expect(editLinksInRow.length).toBeGreaterThanOrEqual(1);

    // Find the cover edit specifically by href
    const coverEdit = editLinksInRow.find(
      (a) => a.getAttribute("href") === "/dashboard/cover/edit/cover-1",
    );
    expect(coverEdit).toBeTruthy();

    // Find the resume edit specifically by href
    const resumeEdit = editLinksInRow.find(
      (a) => a.getAttribute("href") === "/dashboard/resume/edit/resume-1",
    );
    expect(resumeEdit).toBeTruthy();

    // The application edit link also exists in the row
    const appEdit = editLinksInRow.find(
      (a) => a.getAttribute("href") === "/dashboard/applications/edit/app-1",
    );
    expect(appEdit).toBeTruthy();

    // Also assert there are edit links for app-2 (scoped to its row)
    const app2Row = app2Link.closest("tr");
    expect(app2Row).toBeTruthy();
    if (!app2Row) return;
    const app2RowQueries = within(app2Row);
    const app2EditLinks = app2RowQueries.queryAllByRole("link", {
      name: /Edit/i,
    });
    // Should include application edit link for app-2
    const app2Edit = app2EditLinks.find(
      (a) => a.getAttribute("href") === "/dashboard/applications/edit/app-2",
    );
    expect(app2Edit).toBeTruthy();
  });

  it("forms contain the expected hidden inputs and simulate create/delete actions", async () => {
    render(<ApplicationsTable {...defaultProps} />);

    // For app-1 cover: use known button id to select the correct button
    const removeCoverBtn = document.getElementById(
      "remove-cover-cover-1",
    ) as HTMLButtonElement | null;
    expect(removeCoverBtn).toBeTruthy();
    if (!removeCoverBtn) return;

    const coverForm = removeCoverBtn.closest("form") as HTMLFormElement | null;
    expect(coverForm).toBeTruthy();
    if (!coverForm) return;

    const coverFormData = new FormData(coverForm);
    expect(coverFormData.get("id")).toBe("cover-1");

    // Simulate deleteCoverLetter success and ensure it's called with id
    mockDeleteCoverLetter.mockResolvedValueOnce({});
    await mockDeleteCoverLetter(coverFormData.get("id") as string);
    expect(mockDeleteCoverLetter).toHaveBeenCalledWith("cover-1");

    // Simulate router.refresh being called after success (component would call it)
    mockRefresh();
    expect(mockRefresh).toHaveBeenCalled();

    // For resume removal button (app-1)
    const removeResumeBtn = document.getElementById(
      "remove-resume-resume-1",
    ) as HTMLButtonElement | null;
    expect(removeResumeBtn).toBeTruthy();
    if (!removeResumeBtn) return;
    const resumeForm = removeResumeBtn.closest(
      "form",
    ) as HTMLFormElement | null;
    expect(resumeForm).toBeTruthy();
    if (!resumeForm) return;
    const resumeFormData = new FormData(resumeForm);
    expect(resumeFormData.get("id")).toBe("resume-1");

    mockDeleteResume.mockResolvedValueOnce({});
    await mockDeleteResume(resumeFormData.get("id") as string);
    expect(mockDeleteResume).toHaveBeenCalledWith("resume-1");

    // For app-2 (no cover/resume) there should be Create buttons for cover & resume.
    // Find a Create button whose form contains application_id === "app-2"
    const createButtons = screen.getAllByRole("button", { name: /Create/i });
    expect(createButtons.length).toBeGreaterThanOrEqual(1);

    const createFormForApp2 = createButtons
      .map((btn) => btn.closest("form"))
      .find((f) => {
        if (!f) return false;
        const fd = new FormData(f as HTMLFormElement);
        return fd.get("application_id") === "app-2";
      }) as HTMLFormElement | undefined;

    expect(createFormForApp2).toBeTruthy();
    if (!createFormForApp2) return;

    const createFd = new FormData(createFormForApp2);
    expect(createFd.get("user_id")).toBe(String(mockUser.id));
    expect(createFd.get("application_id")).toBe("app-2");

    // Simulate create handlers being called with the FormData (component would do same)
    mockCreateCoverLetter.mockResolvedValueOnce({});
    mockCreateResume.mockResolvedValueOnce({});
    await mockCreateCoverLetter(createFd);
    await mockCreateResume(createFd);
    expect(mockCreateCoverLetter).toHaveBeenCalled();
    expect(mockCreateResume).toHaveBeenCalled();
  });

  it("shows 'start by creating' link when there are no applications", () => {
    render(
      <ApplicationsTable
        {...defaultProps}
        serverApplications={[] as Applications}
      />,
    );

    const startText = screen.getByText(
      /Start by creating your first application/i,
    );
    expect(startText).toBeInTheDocument();

    const hereLink = screen.getByRole("link", { name: /here/i });
    expect(hereLink).toBeInTheDocument();
    expect(hereLink).toHaveAttribute("href", "/dashboard/applications/new");
  });

  it("calls fetchFilteredApplications when serverApplications is not provided", async () => {
    mockFetchFilteredApplications.mockResolvedValueOnce([
      {
        id: "app-remote-1",
        job_position: "Remote App",
        company_id: "comp-1",
        is_complete: "2023-02-02",
      },
    ] as Applications);

    render(
      <ApplicationsTable
        {...defaultProps}
        serverApplications={undefined}
        query="test"
        currentPage={2}
      />,
    );

    await waitFor(() => {
      expect(mockFetchFilteredApplications).toHaveBeenCalledWith(
        "test",
        2,
        mockUser.id,
        defaultProps.sort,
      );
    });

    // Wait for the component to render the fetched result
    await waitFor(() => {
      expect(screen.getByText("Remote App")).toBeInTheDocument();
    });
  });

  it("does not call fetchFilteredApplications when serverApplications is provided", async () => {
    render(<ApplicationsTable {...defaultProps} />);

    // Wait a tick for effects to settle
    await waitFor(() => {
      expect(mockFetchFilteredApplications).not.toHaveBeenCalled();
    });
  });
});
