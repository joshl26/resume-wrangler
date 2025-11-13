/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock dependencies
jest.mock("@/app/lib/actions", () => ({
  createCertification: jest.fn(),
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

import { createCertification } from "@/app/lib/actions";
import NewCertification from "../new-certification";

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

describe("NewCertification", () => {
  beforeEach(() => {
    (createCertification as jest.Mock).mockReset();
  });

  it("renders form with all required fields", () => {
    render(<NewCertification user={mockUser} />);

    // Header and back button
    expect(screen.getByText("Add New Certification")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/certifications",
    );

    // Hidden fields — component uses boolean `hidden` & `readOnly`, so assert those attributes
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");

    // There are multiple inputs with value "blank" (section_title and resume_id).
    // Use getAllByDisplayValue and pick by id.
    const blankInputs = screen.getAllByDisplayValue(
      "blank",
    ) as HTMLInputElement[];
    const sectionTitleInput = blankInputs.find(
      (el) => el.id === "section_title",
    );
    const resumeIdInput = blankInputs.find((el) => el.id === "resume_id");

    expect(sectionTitleInput).toBeDefined();
    expect(sectionTitleInput).toHaveAttribute("id", "section_title");
    expect(sectionTitleInput).toHaveAttribute("name", "section_title");
    expect(sectionTitleInput).toHaveValue("blank");
    expect(sectionTitleInput).toHaveAttribute("hidden");
    expect(sectionTitleInput).toHaveAttribute("readonly");

    expect(resumeIdInput).toBeDefined();
    expect(resumeIdInput).toHaveAttribute("id", "resume_id");
    expect(resumeIdInput).toHaveAttribute("name", "resume_id");
    expect(resumeIdInput).toHaveValue("blank");
    expect(resumeIdInput).toHaveAttribute("hidden");
    expect(resumeIdInput).toHaveAttribute("readonly");

    // Visible input fields
    expect(
      screen.getByRole("textbox", { name: /Certification Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Certification Location/i }),
    ).toBeInTheDocument();

    // Submit button should not be visible initially
    expect(
      screen.queryByRole("button", { name: /Create New Certification/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewCertification user={mockUser} />);

    // Initially no submit button
    expect(
      screen.queryByRole("button", { name: /Create New Certification/i }),
    ).not.toBeInTheDocument();

    // Edit certification name field
    const certNameInput = screen.getByRole("textbox", {
      name: /Certification Name/i,
    });
    await user.type(certNameInput, "AWS Certified Solutions Architect");

    // Submit button should appear
    expect(
      screen.getByRole("button", { name: /Create New Certification/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createCertification as jest.Mock).mockResolvedValue({});

    render(<NewCertification user={mockUser} />);

    // Fill form fields
    const certNameInput = screen.getByRole("textbox", {
      name: /Certification Name/i,
    });
    const certLocationInput = screen.getByRole("textbox", {
      name: /Certification Location/i,
    });

    await user.type(certNameInput, "AWS Certified Solutions Architect");
    await user.type(certLocationInput, "Online");

    // Submit button should appear after editing
    const submitButton = screen.getByRole("button", {
      name: /Create New Certification/i,
    });
    await user.click(submitButton);

    // Verify form data submission
    await waitFor(() => {
      expect(createCertification).toHaveBeenCalledTimes(1);
    });

    const formData = (createCertification as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("section_title")).toBe("blank");
    expect(formData.get("resume_id")).toBe("blank");
    expect(formData.get("certification_name")).toBe(
      "AWS Certified Solutions Architect",
    );
    expect(formData.get("certification_location")).toBe("Online");
  });

  it("handles submission errors gracefully", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {}); // suppress logs in test

    (createCertification as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewCertification user={mockUser} />);

    // Fill minimal form
    const certNameInput = screen.getByRole("textbox", {
      name: /Certification Name/i,
    });
    await user.type(certNameInput, "Test Certification");

    const certLocationInput = screen.getByRole("textbox", {
      name: /Certification Location/i,
    });
    await user.type(certLocationInput, "Test Location");

    // Submit
    const submitButton = screen.getByRole("button", {
      name: /Create New Certification/i,
    });
    await user.click(submitButton);

    // Verify error handling
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Create certification failed:",
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

    (createCertification as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewCertification user={mockUser} />);

    // Fill form
    const certNameInput = screen.getByRole("textbox", {
      name: /Certification Name/i,
    });
    await user.type(certNameInput, "Test Certification");

    const certLocationInput = screen.getByRole("textbox", {
      name: /Certification Location/i,
    });
    await user.type(certLocationInput, "Test Location");

    // Submit
    const submitButton = screen.getByRole("button", {
      name: /Create New Certification/i,
    });
    await user.click(submitButton);

    // Verify error handling
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unexpected error creating certification:",
        new Error("Network error"),
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
