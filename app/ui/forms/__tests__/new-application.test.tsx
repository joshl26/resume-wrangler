/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Company, User } from "@/app/lib/definitions";

// Mock dependencies
jest.mock("@/app/lib/actions", () => ({
  createApplication: jest.fn(),
}));

jest.mock("../../back-button", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("../../submit-button", () => ({
  __esModule: true,
  SubmitButton: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <button type="submit" className={className}>
      {children}
    </button>
  ),
}));

import { createApplication } from "@/app/lib/actions";
import NewApplication from "../new-application";

/**
 * Safe factory helpers:
 * - keep base minimal (only fields we know we'll use)
 * - merge overrides and cast to the real type to avoid "unknown property" TS errors
 */
const makeCompany = (overrides: Partial<Company> = {}): Company => {
  const base = {
    id: "default-id",
    name: "Default Company",
    created_at: new Date().toISOString(),
  } as unknown as Company;

  return { ...(base as object), ...(overrides as object) } as Company;
};

const makeUser = (overrides: Partial<User> = {}): User => {
  const base = {
    id: "default-user-id",
    name: "Default User",
    email: "default@example.test",
  } as unknown as User;

  return { ...(base as object), ...(overrides as object) } as User;
};

const mockUser = makeUser({
  id: "user-123",
  name: "Test User",
  email: "test@example.com",
});

const mockCompanies: Company[] = [
  makeCompany({ id: "company-1", name: "Tech Corp" }),
  makeCompany({ id: "company-2", name: "Innovate Inc" }),
];

describe("NewApplication", () => {
  beforeEach(() => {
    (createApplication as jest.Mock).mockReset();
  });

  it("renders form with company select and input fields", () => {
    render(<NewApplication companies={mockCompanies} user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Create New Application")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/applications/",
    );

    // Hidden user ID field
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");

    // Company select
    const companySelect = screen.getByRole("combobox", {
      name: /Select a Company/i,
    });
    expect(companySelect).toBeInTheDocument();

    // Options present
    expect(screen.getByRole("option", { name: "" })).toBeInTheDocument();
    mockCompanies.forEach((c) => {
      expect(screen.getByRole("option", { name: c.name })).toBeInTheDocument();
    });

    // Inputs / textareas — use getByLabelText for exact matches
    expect(
      screen.getByRole("textbox", { name: /Job Position/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Posting Url/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Posting Text")).toBeInTheDocument();
    expect(screen.getByLabelText("Analyzed Posting Text")).toBeInTheDocument();

    // Submit button should not appear until edited
    expect(
      screen.queryByRole("button", { name: /Create New Application/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewApplication companies={mockCompanies} user={mockUser} />);

    // Initially no submit button
    expect(
      screen.queryByRole("button", { name: /Create New Application/i }),
    ).not.toBeInTheDocument();

    // Edit job position field to flip edited state
    const jobPositionInput = screen.getByRole("textbox", {
      name: /Job Position/i,
    });
    await user.type(jobPositionInput, "Software Engineer");

    // Submit button should appear
    expect(
      screen.getByRole("button", { name: /Create New Application/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createApplication as jest.Mock).mockResolvedValue({});

    render(<NewApplication companies={mockCompanies} user={mockUser} />);

    // Find elements by their visible labels
    const companySelect = screen.getByRole("combobox", {
      name: /Select a Company/i,
    });
    const jobPositionInput = screen.getByRole("textbox", {
      name: /Job Position/i,
    });
    const postingUrlInput = screen.getByRole("textbox", {
      name: /Posting Url/i,
    });
    const postingTextInput = screen.getByLabelText(
      "Posting Text",
    ) as HTMLTextAreaElement;
    const analyzedTextInput = screen.getByLabelText(
      "Analyzed Posting Text",
    ) as HTMLTextAreaElement;

    await user.selectOptions(companySelect, "company-1");
    await user.type(jobPositionInput, "Software Engineer");
    await user.type(postingUrlInput, "https://example.com/job");
    await user.type(postingTextInput, "Job description text");
    await user.type(analyzedTextInput, "Analyzed text");

    const submitButton = screen.getByRole("button", {
      name: /Create New Application/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createApplication).toHaveBeenCalledTimes(1);
    });

    // First call's first argument is the FormData
    const formData = (createApplication as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("company_id")).toBe("company-1");
    expect(formData.get("job_position")).toBe("Software Engineer");
    expect(formData.get("posting_url")).toBe("https://example.com/job");
    expect(formData.get("posting_text")).toBe("Job description text");
    expect(formData.get("analyzed_posting_text")).toBe("Analyzed text");
  });

  it("handles submission errors gracefully", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (createApplication as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewApplication companies={mockCompanies} user={mockUser} />);

    const companySelect = screen.getByRole("combobox", {
      name: /Select a Company/i,
    });
    const jobPositionInput = screen.getByRole("textbox", {
      name: /Job Position/i,
    });

    await user.selectOptions(companySelect, "company-1");
    await user.type(jobPositionInput, "Software Engineer");

    const submitButton = screen.getByRole("button", {
      name: /Create New Application/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Create failed:",
        "Validation failed",
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
