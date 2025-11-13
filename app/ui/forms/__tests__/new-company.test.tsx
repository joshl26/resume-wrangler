/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock dependencies
jest.mock("@/app/lib/actions", () => ({
  createCompany: jest.fn(),
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

import { createCompany } from "@/app/lib/actions";
import NewCompany from "../new-company";

/** Safe factory for User objects to satisfy TS without enumerating all fields */
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

describe("NewCompany", () => {
  beforeEach(() => {
    (createCompany as jest.Mock).mockReset();
  });

  it("renders form with all required fields", () => {
    render(<NewCompany user={mockUser} />);

    // Header and back button
    expect(screen.getByText("Add New Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/companies",
    );

    // Hidden user_id input (component uses boolean `hidden` + defaultValue)
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");
    expect(userIdInput).toHaveAttribute("required");

    // Visible inputs
    expect(
      screen.getByRole("textbox", { name: /Company Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Address One/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Address Two/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Recipient Title/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Phone/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Website Url/i }),
    ).toBeInTheDocument();

    // Submit button should not be visible initially
    expect(
      screen.queryByRole("button", { name: /Create New Company/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewCompany user={mockUser} />);

    // Initially no submit button
    expect(
      screen.queryByRole("button", { name: /Create New Company/i }),
    ).not.toBeInTheDocument();

    // Edit a field to flip edited state
    const companyNameInput = screen.getByRole("textbox", {
      name: /Company Name/i,
    });
    await user.type(companyNameInput, "Acme Co");

    // Submit button should appear
    expect(
      screen.getByRole("button", { name: /Create New Company/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createCompany as jest.Mock).mockResolvedValue({});

    render(<NewCompany user={mockUser} />);

    // Fill form fields
    const companyNameInput = screen.getByRole("textbox", {
      name: /Company Name/i,
    });
    const addressOneInput = screen.getByRole("textbox", {
      name: /Address One/i,
    });
    const addressTwoInput = screen.getByRole("textbox", {
      name: /Address Two/i,
    });
    const recipientTitleInput = screen.getByRole("textbox", {
      name: /Recipient Title/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    const phoneInput = screen.getByRole("textbox", { name: /Phone/i });
    const websiteInput = screen.getByRole("textbox", { name: /Website Url/i });

    await user.type(companyNameInput, "Acme Co");
    await user.type(addressOneInput, "123 Main St");
    await user.type(addressTwoInput, "Suite 100");
    await user.type(recipientTitleInput, "HR");
    await user.type(emailInput, "hr@acme.example");
    await user.type(phoneInput, "555-1234");
    await user.type(websiteInput, "https://acme.example");

    // Submit button appears and is clicked
    const submitButton = screen.getByRole("button", {
      name: /Create New Company/i,
    });
    await user.click(submitButton);

    // Ensure createCompany was called
    await waitFor(() => {
      expect(createCompany).toHaveBeenCalledTimes(1);
    });

    const formData = (createCompany as jest.Mock).mock.calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("company_name")).toBe("Acme Co");
    expect(formData.get("address_one")).toBe("123 Main St");
    expect(formData.get("address_two")).toBe("Suite 100");
    expect(formData.get("recipient_title")).toBe("HR");
    expect(formData.get("email")).toBe("hr@acme.example");
    expect(formData.get("phone")).toBe("555-1234");
    expect(formData.get("website_url")).toBe("https://acme.example");
  });

  it("handles submission errors gracefully", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (createCompany as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewCompany user={mockUser} />);

    const companyNameInput = screen.getByRole("textbox", {
      name: /Company Name/i,
    });
    await user.type(companyNameInput, "Acme Co");

    const submitButton = screen.getByRole("button", {
      name: /Create New Company/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Create company failed:",
        expect.objectContaining({
          errors: true,
          message: "Validation failed",
        }),
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("handles unexpected errors gracefully", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (createCompany as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<NewCompany user={mockUser} />);

    const companyNameInput = screen.getByRole("textbox", {
      name: /Company Name/i,
    });
    await user.type(companyNameInput, "Acme Co");

    const submitButton = screen.getByRole("button", {
      name: /Create New Company/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unexpected error creating company:",
        expect.objectContaining({ message: "Network error" }),
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
