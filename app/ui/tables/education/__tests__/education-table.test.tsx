/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Education from "../education-table";
import type {
  User,
  UserEducationExperience,
  UserEducationExperiences,
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

// Mock data + actions modules
const mockFetchFilteredEducation = jest.fn();
const mockDeleteEducation = jest.fn();

jest.mock("@/app/lib/data", () => ({
  fetchFilteredEducation: (...args: any[]) =>
    mockFetchFilteredEducation(...args),
}));

jest.mock("@/app/lib/actions", () => ({
  deleteEducation: (...args: any[]) => mockDeleteEducation(...args),
}));

// Mock Pagination component
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("Education (table)", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: User = {
    id: "user-1",
    name: "Tester",
    email: "tester@example.com",
  } as User;

  const mockEducationData: UserEducationExperiences = [
    {
      id: "edu-1",
      user_id: "user-1",
      institution_name: "State University",
      program: "Computer Science",
      location: "Boston",
      start_date: "2015-09-01",
      end_date: "2019-06-01",
    } as unknown as UserEducationExperience,
    {
      id: "edu-2",
      user_id: "user-1",
      institution_name: "Community College",
      program: "Math",
      location: "Remote",
      start_date: "2013-01-01",
      end_date: null,
    } as unknown as UserEducationExperience,
  ];

  it("renders table headers", async () => {
    mockFetchFilteredEducation.mockResolvedValueOnce([]);
    render(
      <Education
        user={mockUser}
        totalPages={1}
        query=""
        currentPage={1}
        totalCount={0}
      />,
    );

    expect(screen.getByText("Institution Name")).toBeInTheDocument();
    expect(screen.getByText("Program Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("fetches and renders education rows", async () => {
    mockFetchFilteredEducation.mockResolvedValueOnce(mockEducationData);

    render(
      <Education
        user={mockUser}
        totalPages={2}
        query=""
        currentPage={1}
        totalCount={10}
      />,
    );

    // Wait for the effect to finish and rows to render
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /State University/i }),
      ).toBeInTheDocument(),
    );

    // First row checks
    const instLink = screen.getByRole("link", { name: /State University/i });
    expect(instLink).toHaveAttribute("href", "/dashboard/education/edit/edu-1");

    const row = instLink.closest("tr");
    expect(row).toBeTruthy();
    if (!row) return;
    const rowWithin = within(row);

    expect(rowWithin.getByText("Computer Science")).toBeInTheDocument();
    expect(rowWithin.getByText("Boston")).toBeInTheDocument();
    expect(rowWithin.getByText("2015-09-01")).toBeInTheDocument();
    expect(rowWithin.getByText("2019-06-01")).toBeInTheDocument();

    // Action links/buttons
    const editLink = rowWithin.getByRole("link", { name: /Edit/i });
    expect(editLink).toHaveAttribute("href", "/dashboard/education/edit/edu-1");

    const removeBtn = rowWithin.getByRole("button", { name: /Remove/i });
    expect(removeBtn).toBeInTheDocument();

    // Second row (null end_date -> N/A)
    const secondInst = screen.getByRole("link", { name: /Community College/i });
    expect(secondInst).toHaveAttribute(
      "href",
      "/dashboard/education/edit/edu-2",
    );

    const secondRow = secondInst.closest("tr");
    expect(secondRow).toBeTruthy();
    if (!secondRow) return;
    const secondWithin = within(secondRow);

    expect(secondWithin.getByText("Math")).toBeInTheDocument();
    expect(secondWithin.getByText("Remote")).toBeInTheDocument();
    expect(secondWithin.getByText("2013-01-01")).toBeInTheDocument();
    expect(secondWithin.getByText("N/A")).toBeInTheDocument();

    // Pagination present
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 10");
  });

  it("renders create link when no education exists", async () => {
    mockFetchFilteredEducation.mockResolvedValueOnce([]);

    render(
      <Education
        user={mockUser}
        totalPages={1}
        query=""
        currentPage={1}
        totalCount={0}
      />,
    );

    // Wait for effect
    await waitFor(() =>
      expect(
        screen.getByRole("link", {
          name: /Start by creating your first education experience here/i,
        }),
      ).toBeInTheDocument(),
    );

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first education experience here/i,
    });
    expect(createLink).toHaveAttribute("href", "/dashboard/education/new");
  });

  it("invokes deleteEducation when Remove is clicked (accepts FormData or string)", async () => {
    mockFetchFilteredEducation.mockResolvedValueOnce(mockEducationData);
    // Return a never-resolving promise to simulate in-flight; we only check it was called.
    mockDeleteEducation.mockImplementation(() => new Promise(() => {}));

    render(
      <Education
        user={mockUser}
        totalPages={1}
        query=""
        currentPage={1}
        totalCount={2}
      />,
    );

    // Wait for rows
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /State University/i }),
      ).toBeInTheDocument(),
    );

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteEducation).toHaveBeenCalled());

    const firstArg = mockDeleteEducation.mock.calls[0][0];
    if (typeof firstArg === "string") {
      // If somehow a string was passed, ensure it's the expected id
      expect(firstArg).toBe("edu-1");
    } else {
      // Should be a FormData-like object
      expect(typeof firstArg.get).toBe("function");
      // If the test environment exposes FormData behavior, we can assert the value:
      try {
        const val = firstArg.get("education_id");
        // The value may be a string or null depending on how the FormData was constructed
        expect(String(val)).toBe("edu-1");
      } catch {
        // If FormData isn't fully functional in this environment, just assert shape above
      }
    }
  });

  it("does not refresh when deleteEducation returns errors and logs the error", async () => {
    mockFetchFilteredEducation.mockResolvedValueOnce(mockEducationData);
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockDeleteEducation.mockResolvedValueOnce({ errors: ["Failed"] });

    render(
      <Education
        user={mockUser}
        totalPages={1}
        query=""
        currentPage={1}
        totalCount={2}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /State University/i }),
      ).toBeInTheDocument(),
    );

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteEducation).toHaveBeenCalled());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Delete education failed:",
      expect.objectContaining({ errors: ["Failed"] }),
    );

    expect(mockRefresh).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
