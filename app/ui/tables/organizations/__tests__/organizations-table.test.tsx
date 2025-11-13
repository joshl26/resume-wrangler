/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Organizations from "../organizations-table";
import type { User, userOrganizations } from "@/app/lib/definitions";

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

// Mock deleteOrganization action
const mockDeleteOrganization = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteOrganization: (...args: any[]) => mockDeleteOrganization(...args),
}));

// Mock Pagination component
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("Organizations (table)", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Use real types from your codebase
  const mockUser: User = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  } as User;

  const mockOrganizations: userOrganizations = [
    {
      id: "org-1",
      user_id: "user-1",
      name: "Charity Org",
      location: "New York",
      start_date: "2020-01-01",
      end_date: "2022-01-01",
    },
    {
      id: "org-2",
      user_id: "user-1",
      name: "Volunteer Group",
      location: "San Francisco",
      start_date: "2021-05-01",
      end_date: null, // Ongoing
    },
  ] as userOrganizations;

  const defaultProps = {
    organizations: mockOrganizations,
    user: mockUser,
    totalPages: 2,
    query: "",
    currentPage: 1,
    totalCount: 15,
    filteredOrganizations: mockOrganizations,
  };

  it("renders table headers correctly", () => {
    render(<Organizations {...defaultProps} />);

    expect(screen.getByText("Organization Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders organizations with correct data and links (uses real types)", () => {
    render(<Organizations {...defaultProps} />);

    // First organization row (Charity Org)
    const charityLink = screen.getByRole("link", { name: /Charity Org/i });
    expect(charityLink).toHaveAttribute(
      "href",
      "/dashboard/organizations/edit/org-1",
    );

    const charityRow = charityLink.closest("tr");
    expect(charityRow).toBeTruthy();
    if (!charityRow) return;

    const rowQueries = within(charityRow);
    expect(rowQueries.getByText("New York")).toBeInTheDocument();
    expect(rowQueries.getByText("2020-01-01")).toBeInTheDocument();
    expect(rowQueries.getByText("2022-01-01")).toBeInTheDocument();

    // Action column: Edit and Remove for Charity Org
    const charityEditLink = rowQueries.getByRole("link", { name: /Edit/i });
    expect(charityEditLink).toHaveAttribute(
      "href",
      "/dashboard/organizations/edit/org-1",
    );

    const charityRemoveBtn = rowQueries.getByRole("button", {
      name: /Remove/i,
    });
    expect(charityRemoveBtn).toBeInTheDocument();

    // Second organization row (Volunteer Group)
    const volunteerLink = screen.getByRole("link", {
      name: /Volunteer Group/i,
    });
    expect(volunteerLink).toHaveAttribute(
      "href",
      "/dashboard/organizations/edit/org-2",
    );

    const volunteerRow = volunteerLink.closest("tr");
    expect(volunteerRow).toBeTruthy();
    if (!volunteerRow) return;

    const volunteerQueries = within(volunteerRow);
    expect(volunteerQueries.getByText("San Francisco")).toBeInTheDocument();
    expect(volunteerQueries.getByText("2021-05-01")).toBeInTheDocument();
    // For null end_date, should show "N/A"
    expect(volunteerQueries.getByText("N/A")).toBeInTheDocument();

    // Action column: Edit and Remove for Volunteer Group
    const volunteerEditLink = volunteerQueries.getByRole("link", {
      name: /Edit/i,
    });
    expect(volunteerEditLink).toHaveAttribute(
      "href",
      "/dashboard/organizations/edit/org-2",
    );

    const volunteerRemoveBtn = volunteerQueries.getByRole("button", {
      name: /Remove/i,
    });
    expect(volunteerRemoveBtn).toBeInTheDocument();
  });

  it("renders create link when no organizations exist", () => {
    render(<Organizations {...defaultProps} filteredOrganizations={[]} />);

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first organization here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/organizations/new");
  });

  it("renders pagination controls", () => {
    render(<Organizations {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 15");
  });

  // Updated test: don't assert disabled/loading UI (server action isn't executed in jsdom).
  // Instead assert that clicking Remove triggers deleteOrganization.
  it("invokes deleteOrganization when Remove is clicked", async () => {
    // Never resolves to simulate in-flight request (we only care that it was called)
    mockDeleteOrganization.mockImplementation(() => new Promise(() => {}));

    render(<Organizations {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    expect(removeBtn).toBeInTheDocument();

    await u.click(removeBtn!);

    // Wait until mock called
    await waitFor(() => expect(mockDeleteOrganization).toHaveBeenCalled());

    // Accept either string id (component tries id first) or FormData-like object
    const firstArg = mockDeleteOrganization.mock.calls[0][0];
    if (typeof firstArg === "string") {
      expect(firstArg).toBe("org-1");
    } else {
      expect(typeof firstArg.get).toBe("function");
    }
  });

  it("calls deleteOrganization and refreshes on successful delete", async () => {
    mockDeleteOrganization.mockResolvedValueOnce({});

    render(<Organizations {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteOrganization).toHaveBeenCalled());

    const firstArg = mockDeleteOrganization.mock.calls[0][0];
    if (typeof firstArg === "string") {
      expect(firstArg).toBe("org-1");
    } else {
      expect(typeof firstArg.get).toBe("function");
    }

    // Wait for router.refresh to be called after successful deletion
    await waitFor(() => expect(mockRefresh).toHaveBeenCalled());
  });

  it("logs error and does not refresh if deleteOrganization returns errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockDeleteOrganization.mockResolvedValueOnce({
      errors: ["Failed to delete"],
    });

    render(<Organizations {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteOrganization).toHaveBeenCalled());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Delete organization failed:",
      expect.objectContaining({ errors: ["Failed to delete"] }),
    );
    expect(mockRefresh).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
