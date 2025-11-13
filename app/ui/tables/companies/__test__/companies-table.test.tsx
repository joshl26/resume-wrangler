/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompaniesTable from "../companies-table";
import type { User, Companies, Company } from "@/app/lib/definitions";

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

// Mock deleteCompany action
const mockDeleteCompany = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteCompany: (...args: any[]) => mockDeleteCompany(...args),
}));

// Mock Pagination component
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("CompaniesTable", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: User = {
    id: "user-1",
    name: "Test User",
    email: "test@example.com",
  } as User;

  const mockCompanies: Companies = [
    {
      id: "comp-1",
      user_id: "user-1",
      name: "Tech Corp",
      address_one: "123 Main St",
      recipient_title: "Hiring Manager",
      email: "hr@techcorp.com",
      phone: "555-1234",
    } as Company,
    {
      id: "comp-2",
      user_id: "user-1",
      name: "Startup Inc",
      address_one: "456 Market St",
      recipient_title: null,
      email: null,
      phone: null,
    } as unknown as Company,
  ];

  const defaultProps = {
    companies: mockCompanies,
    user: mockUser,
    totalPages: 2,
    query: "",
    currentPage: 1,
    totalCount: 15,
    filteredCompanies: mockCompanies,
  };

  it("renders table headers correctly", () => {
    render(<CompaniesTable {...defaultProps} />);

    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(screen.getByText("Address One")).toBeInTheDocument();
    expect(screen.getByText("Recipient")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders companies with correct data and links", () => {
    render(<CompaniesTable {...defaultProps} />);

    // First company row (Tech Corp)
    const techCorpLink = screen.getByRole("link", { name: /Tech Corp/i });
    expect(techCorpLink).toHaveAttribute(
      "href",
      "/dashboard/companies/edit/comp-1",
    );

    const techCorpRow = techCorpLink.closest("tr");
    expect(techCorpRow).toBeTruthy();
    if (!techCorpRow) return;

    const rowQueries = within(techCorpRow);
    expect(rowQueries.getByText("123 Main St")).toBeInTheDocument();
    expect(rowQueries.getByText("Hiring Manager")).toBeInTheDocument();
    expect(rowQueries.getByText("hr@techcorp.com")).toBeInTheDocument();
    expect(rowQueries.getByText("555-1234")).toBeInTheDocument();

    // Action column: Edit and Remove for Tech Corp
    const editLink1 = rowQueries.getByRole("link", { name: /Edit/i });
    expect(editLink1).toHaveAttribute(
      "href",
      "/dashboard/companies/edit/comp-1",
    );

    const removeBtn1 = rowQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn1).toBeInTheDocument();
    expect(removeBtn1).not.toBeDisabled();

    // Second company row (Startup Inc)
    const startupLink = screen.getByRole("link", { name: /Startup Inc/i });
    expect(startupLink).toHaveAttribute(
      "href",
      "/dashboard/companies/edit/comp-2",
    );

    const startupRow = startupLink.closest("tr");
    expect(startupRow).toBeTruthy();
    if (!startupRow) return;

    const startupQueries = within(startupRow);
    expect(startupQueries.getByText("456 Market St")).toBeInTheDocument();
    expect(startupQueries.getAllByText("N/A").length).toBe(3); // recipient, email, phone

    // Action column: Edit and Remove for Startup Inc
    const editLink2 = startupQueries.getByRole("link", { name: /Edit/i });
    expect(editLink2).toHaveAttribute(
      "href",
      "/dashboard/companies/edit/comp-2",
    );

    const removeBtn2 = startupQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn2).toBeInTheDocument();
    expect(removeBtn2).not.toBeDisabled();
  });

  it("renders create link when no companies exist", () => {
    render(<CompaniesTable {...defaultProps} filteredCompanies={[]} />);

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first company here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/companies/new");
  });

  it("renders pagination controls", () => {
    render(<CompaniesTable {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 15");
  });

  it("invokes deleteCompany when Remove is clicked (accepts FormData or string)", async () => {
    // Never resolves to simulate in-flight request
    mockDeleteCompany.mockImplementation(() => new Promise(() => {}));

    render(<CompaniesTable {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    expect(removeBtn).toBeInTheDocument();

    await u.click(removeBtn!);

    // Wait until mock called
    await waitFor(() => expect(mockDeleteCompany).toHaveBeenCalled());

    // Accept either string id (component tries id first) or FormData-like object
    const firstArg = mockDeleteCompany.mock.calls[0][0];
    if (typeof firstArg === "string") {
      expect(firstArg).toBe("comp-1");
    } else {
      expect(typeof firstArg.get).toBe("function");
    }
  });

  it("calls deleteCompany and refreshes on successful delete", async () => {
    mockDeleteCompany.mockResolvedValueOnce({});

    render(<CompaniesTable {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteCompany).toHaveBeenCalled());

    const firstArg = mockDeleteCompany.mock.calls[0][0];
    if (typeof firstArg === "string") {
      expect(firstArg).toBe("comp-1");
    } else {
      expect(typeof firstArg.get).toBe("function");
    }

    // Wait for router.refresh to be called after successful deletion
    await waitFor(() => expect(mockRefresh).toHaveBeenCalled());
  });

  it("logs error and does not refresh if deleteCompany returns errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockDeleteCompany.mockResolvedValueOnce({ errors: ["Failed to delete"] });

    render(<CompaniesTable {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteCompany).toHaveBeenCalled());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Delete company failed:",
      expect.objectContaining({ errors: ["Failed to delete"] }),
    );
    expect(mockRefresh).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
