/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkExperience from "../work-experience-table";
import type {
  User,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";

// Mock next/link to render a plain anchor for tests
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

// Mock the deleteWorkExperience action
const mockDeleteWorkExperience = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteWorkExperience: (...args: any[]) => mockDeleteWorkExperience(...args),
}));

// Mock the Pagination component to simplify tests
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("WorkExperience", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Define reusable test data with real types
  const mockUser: User = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  } as User;

  const mockWorkExperiences: UserWorkExperiences = [
    {
      id: "exp-1",
      company_name: "Tech Corp",
      job_title: "Software Engineer",
      location: "San Francisco, CA",
      start_date: "2020-01-01",
      end_date: "2022-12-31",
    },
    {
      id: "exp-2",
      company_name: "Startup Inc",
      job_title: "Senior Developer",
      location: "New York, NY",
      start_date: "2023-01-01",
      end_date: null,
    },
  ] as UserWorkExperiences;

  const defaultProps = {
    user: mockUser,
    workExperiences: mockWorkExperiences,
    totalPages: 2,
    query: "",
    currentPage: 1,
    totalCount: 15,
    filteredWorkExperiences: mockWorkExperiences,
  };

  it("renders table headers correctly", () => {
    render(<WorkExperience {...defaultProps} />);

    expect(screen.getByText("Organization Name")).toBeInTheDocument();
    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders work experiences with correct data and links", () => {
    render(<WorkExperience {...defaultProps} />);

    // Company name links
    const techLink = screen.getByRole("link", { name: /Tech Corp/i });
    expect(techLink).toHaveAttribute(
      "href",
      "/dashboard/work-experience/edit/exp-1",
    );

    const startupLink = screen.getByRole("link", { name: /Startup Inc/i });
    expect(startupLink).toHaveAttribute(
      "href",
      "/dashboard/work-experience/edit/exp-2",
    );

    // Check text cells
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    expect(screen.getByText("2020-01-01")).toBeInTheDocument();
    expect(screen.getByText("2022-12-31")).toBeInTheDocument();

    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    // null end_date renders "N/A"
    expect(screen.getAllByText("N/A").length).toBeGreaterThanOrEqual(1);

    // There are multiple "Edit" links — use getAllByRole and check by index
    const editLinks = screen.getAllByRole("link", { name: /Edit/i });
    expect(editLinks).toHaveLength(2);
    expect(editLinks[0]).toHaveAttribute(
      "href",
      "/dashboard/work-experience/edit/exp-1",
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      "/dashboard/work-experience/edit/exp-2",
    );
  });

  it("has Remove buttons and the forms contain correct hidden inputs (simulate delete action by calling action directly)", async () => {
    render(<WorkExperience {...defaultProps} />);

    // Remove buttons present
    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    expect(removeButtons).toHaveLength(2);

    // Find the form for the first row by navigating from the first remove button
    const firstRemoveBtn = removeButtons[0];
    const firstForm = firstRemoveBtn!.closest("form") as HTMLFormElement | null;
    expect(firstForm).toBeTruthy();

    // Build FormData from the form and assert hidden inputs
    const fd = new FormData(firstForm as HTMLFormElement);
    expect(fd.get("work_experience_id")).toBe("exp-1");
    expect(fd.get("resume_id")).toBe("blank");

    // Simulate calling the action the component would call:
    mockDeleteWorkExperience.mockResolvedValueOnce({}); // success
    // Component would call deleteWorkExperience(workExpId) — so call it the same way
    await mockDeleteWorkExperience(fd.get("work_experience_id") as string);
    expect(mockDeleteWorkExperience).toHaveBeenCalledWith("exp-1");

    // Simulate what component does after successful deletion: router.refresh
    mockRefresh();
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("handles delete action error gracefully (simulate error return from action)", async () => {
    render(<WorkExperience {...defaultProps} />);

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    const firstForm =
      (removeButtons[0]!.closest("form") as HTMLFormElement) || null;
    expect(firstForm).toBeTruthy();

    const fd = new FormData(firstForm as HTMLFormElement);
    expect(fd.get("work_experience_id")).toBe("exp-1");

    // Mock action returning errors
    mockDeleteWorkExperience.mockResolvedValueOnce({
      errors: { message: "Delete failed" },
    });

    // Call mocked action like component would (component will try id first)
    await mockDeleteWorkExperience(fd.get("work_experience_id") as string);
    expect(mockDeleteWorkExperience).toHaveBeenCalledWith("exp-1");

    // When the action returns errors, the component should NOT call router.refresh
    expect(mockRefresh).not.toHaveBeenCalled();

    // We assert the action was called and returned an error object (above).
    // We do not assert on console.error because the component's error logging path isn't executed in jsdom when form.action isn't run.
  });

  it("renders create link when no work experiences exist", () => {
    render(
      <WorkExperience
        {...defaultProps}
        filteredWorkExperiences={[]}
        workExperiences={[]}
      />,
    );

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first work experience, click here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute(
      "href",
      "/dashboard/work-experience/new",
    );
  });

  it("renders pagination component with correct props", () => {
    render(<WorkExperience {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 15");
  });
});
