/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Certifications from "../certifications-table";
import type {
  User,
  UserCertification,
  UserCertifications,
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

// Mock deleteCertification action
const mockDeleteCertification = jest.fn();
jest.mock("@/app/lib/actions", () => ({
  deleteCertification: (...args: any[]) => mockDeleteCertification(...args),
}));

// Mock Pagination component
jest.mock("@/app/ui/pagination", () => (props: any) => (
  <div data-testid="pagination">
    Pagination - Total Pages: {props.totalPages}, Total Count:{" "}
    {props.totalCount}
  </div>
));

describe("Certifications (table)", () => {
  const u = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: User = {
    id: "user-1",
    name: "Certified Tester",
    email: "cert@example.com",
  } as User;

  const mockCertifications: UserCertifications = [
    {
      id: "cert-1",
      user_id: "user-1",
      name: "AWS Certified Solutions Architect",
      location: "Online",
      start_date: "2021-01-01",
      end_date: "2024-01-01",
    } as UserCertification,
    {
      id: "cert-2",
      user_id: "user-1",
      name: "PMP",
      location: "San Francisco",
      start_date: "2020-03-15",
      end_date: null,
    } as unknown as UserCertification,
  ];

  const defaultProps = {
    certifications: mockCertifications,
    user: mockUser,
    totalPages: 2,
    query: "",
    currentPage: 1,
    totalCount: 12,
    filteredCertifications: mockCertifications,
  };

  it("renders table headers correctly", () => {
    render(<Certifications {...defaultProps} />);

    expect(screen.getByText("Certification Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders certifications with correct data and links", () => {
    render(<Certifications {...defaultProps} />);

    // First certification row (AWS)
    const awsLink = screen.getByRole("link", {
      name: /AWS Certified Solutions Architect/i,
    });
    expect(awsLink).toHaveAttribute(
      "href",
      "/dashboard/certifications/edit/cert-1",
    );

    const awsRow = awsLink.closest("tr");
    expect(awsRow).toBeTruthy();
    if (!awsRow) return;

    const rowQueries = within(awsRow);
    expect(rowQueries.getByText("Online")).toBeInTheDocument();
    expect(rowQueries.getByText("2021-01-01")).toBeInTheDocument();
    expect(rowQueries.getByText("2024-01-01")).toBeInTheDocument();

    // Action column: Edit and Remove for AWS
    const editLink1 = rowQueries.getByRole("link", { name: /Edit/i });
    expect(editLink1).toHaveAttribute(
      "href",
      "/dashboard/certifications/edit/cert-1",
    );

    const removeBtn1 = rowQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn1).toBeInTheDocument();
    expect(removeBtn1).not.toBeDisabled();

    // Second certification row (PMP)
    const pmpLink = screen.getByRole("link", { name: /PMP/i });
    expect(pmpLink).toHaveAttribute(
      "href",
      "/dashboard/certifications/edit/cert-2",
    );

    const pmpRow = pmpLink.closest("tr");
    expect(pmpRow).toBeTruthy();
    if (!pmpRow) return;

    const pmpQueries = within(pmpRow);
    expect(pmpQueries.getByText("San Francisco")).toBeInTheDocument();
    expect(pmpQueries.getByText("2020-03-15")).toBeInTheDocument();
    expect(pmpQueries.getByText("N/A")).toBeInTheDocument(); // null end_date

    // Action column: Edit and Remove for PMP
    const editLink2 = pmpQueries.getByRole("link", { name: /Edit/i });
    expect(editLink2).toHaveAttribute(
      "href",
      "/dashboard/certifications/edit/cert-2",
    );

    const removeBtn2 = pmpQueries.getByRole("button", { name: /Remove/i });
    expect(removeBtn2).toBeInTheDocument();
    expect(removeBtn2).not.toBeDisabled();
  });

  it("renders create link when no certifications exist", () => {
    render(<Certifications {...defaultProps} filteredCertifications={[]} />);

    const createLink = screen.getByRole("link", {
      name: /Start by creating your first certification here/i,
    });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/dashboard/certifications/new");
  });

  it("renders pagination controls", () => {
    render(<Certifications {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Total Pages: 2");
    expect(pagination).toHaveTextContent("Total Count: 12");
  });

  it("invokes deleteCertification when Remove is clicked (accepts FormData)", async () => {
    // Never resolves to simulate in-flight request
    mockDeleteCertification.mockImplementation(() => new Promise(() => {}));

    render(<Certifications {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    expect(removeBtn).toBeInTheDocument();

    await u.click(removeBtn!);

    // Wait until mock called
    await waitFor(() => expect(mockDeleteCertification).toHaveBeenCalled());

    // Should receive FormData
    const firstArg = mockDeleteCertification.mock.calls[0][0];
    expect(typeof firstArg.get).toBe("function");
    expect(firstArg.get("certification_id")).toBe("cert-1");
    expect(firstArg.get("resume_id")).toBe("blank");
  });

  it("calls deleteCertification and refreshes on successful delete", async () => {
    mockDeleteCertification.mockResolvedValueOnce({});

    render(<Certifications {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteCertification).toHaveBeenCalled());

    const firstArg = mockDeleteCertification.mock.calls[0][0];
    expect(typeof firstArg.get).toBe("function");
    expect(firstArg.get("certification_id")).toBe("cert-1");

    // Wait for router.refresh to be called after successful deletion
    await waitFor(() => expect(mockRefresh).toHaveBeenCalled());
  });

  it("logs error and does not refresh if deleteCertification returns errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockDeleteCertification.mockResolvedValueOnce({
      errors: ["Failed to delete"],
    });

    render(<Certifications {...defaultProps} />);

    const removeBtn = screen.getAllByRole("button", { name: /Remove/i })[0];
    await u.click(removeBtn!);

    await waitFor(() => expect(mockDeleteCertification).toHaveBeenCalled());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Delete certification failed:",
      expect.objectContaining({ errors: ["Failed to delete"] }),
    );
    expect(mockRefresh).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
