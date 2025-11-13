/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock actions and child components
jest.mock("@/app/lib/actions", () => ({
  createUserEducation: jest.fn(),
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

import { createUserEducation } from "@/app/lib/actions";
import NewEducation from "../new-education";

/** Minimal factory for User objects (cast to User to satisfy TS without enumerating every field) */
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

describe("NewEducation", () => {
  beforeEach(() => {
    (createUserEducation as jest.Mock).mockReset();
  });

  it("renders form with all required fields", () => {
    render(<NewEducation user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Education Experience")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/education/",
    );

    // Hidden inputs (user_id and resume_id)
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");

    const resumeIdInput = screen.getByDisplayValue("blank") as HTMLInputElement;
    expect(resumeIdInput).toHaveAttribute("id", "resume_id");
    expect(resumeIdInput).toHaveAttribute("name", "resume_id");
    expect(resumeIdInput).toHaveValue("blank");
    expect(resumeIdInput).toHaveAttribute("hidden");
    expect(resumeIdInput).toHaveAttribute("readonly");
    expect(resumeIdInput).toHaveAttribute("type", "text"); // explicit type=text

    // Visible inputs
    expect(
      screen.getByRole("textbox", { name: /Institution Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Institution Location/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Program Start Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Program End Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Program Grade/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Program Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Link \(Web URL\)/i }),
    ).toBeInTheDocument();

    // Submit button not visible initially
    expect(
      screen.queryByRole("button", {
        name: /Create New Education Experience/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewEducation user={mockUser} />);

    expect(
      screen.queryByRole("button", {
        name: /Create New Education Experience/i,
      }),
    ).not.toBeInTheDocument();

    const institutionInput = screen.getByRole("textbox", {
      name: /Institution Name/i,
    });
    await user.type(institutionInput, "MIT");

    expect(
      screen.getByRole("button", { name: /Create New Education Experience/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createUserEducation as jest.Mock).mockResolvedValue({});

    render(<NewEducation user={mockUser} />);

    // Fill all form fields
    const institutionInput = screen.getByRole("textbox", {
      name: /Institution Name/i,
    });
    const locationInput = screen.getByRole("textbox", {
      name: /Institution Location/i,
    });
    const startDateInput = screen.getByRole("textbox", {
      name: /Program Start Date/i,
    });
    const endDateInput = screen.getByRole("textbox", {
      name: /Program End Date/i,
    });
    const gradeInput = screen.getByRole("textbox", { name: /Program Grade/i });
    const programInput = screen.getByRole("textbox", { name: /Program Name/i });
    const urlInput = screen.getByRole("textbox", { name: /Link \(Web URL\)/i });

    await user.type(institutionInput, "MIT");
    await user.type(locationInput, "Cambridge, MA");
    await user.type(startDateInput, "2015-09-01");
    await user.type(endDateInput, "2019-06-01");
    await user.type(gradeInput, "3.8 GPA");
    await user.type(programInput, "Computer Science");
    await user.type(urlInput, "https://mit.edu");

    const submitButton = screen.getByRole("button", {
      name: /Create New Education Experience/i,
    });
    await user.click(submitButton);

    // Wait for the mocked action to be called
    await waitFor(() => {
      expect(createUserEducation).toHaveBeenCalledTimes(1);
    });

    // Correctly access first call's first argument
    const formData = (createUserEducation as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("resume_id")).toBe("blank");
    expect(formData.get("institution_name")).toBe("MIT");
    expect(formData.get("location")).toBe("Cambridge, MA");
    expect(formData.get("start_date")).toBe("2015-09-01");
    expect(formData.get("end_date")).toBe("2019-06-01");
    expect(formData.get("grade")).toBe("3.8 GPA");
    expect(formData.get("program")).toBe("Computer Science");
    expect(formData.get("url")).toBe("https://mit.edu");
  });

  it("handles validation errors returned from action (assert create call and payload)", async () => {
    const user = userEvent.setup();
    (createUserEducation as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewEducation user={mockUser} />);

    const institutionInput = screen.getByRole("textbox", {
      name: /Institution Name/i,
    });
    await user.type(institutionInput, "MIT");

    const submitButton = screen.getByRole("button", {
      name: /Create New Education Experience/i,
    });
    await user.click(submitButton);

    // Ensure the action was invoked with the expected FormData
    await waitFor(() => {
      expect(createUserEducation).toHaveBeenCalledTimes(1);
    });

    const formData = (createUserEducation as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("institution_name")).toBe("MIT");

    // Note: we avoid asserting console.error here because the function-valued form action
    // may not call console.error in the test DOM the same way it does at runtime.
  });

  it("handles unexpected errors (rejections) gracefully (assert action called)", async () => {
    const user = userEvent.setup();
    (createUserEducation as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewEducation user={mockUser} />);

    const institutionInput = screen.getByRole("textbox", {
      name: /Institution Name/i,
    });
    await user.type(institutionInput, "MIT");

    const submitButton = screen.getByRole("button", {
      name: /Create New Education Experience/i,
    });
    await user.click(submitButton);

    // Ensure the action was invoked (even if it rejected)
    await waitFor(() => {
      expect(createUserEducation).toHaveBeenCalledTimes(1);
    });
  });
});
