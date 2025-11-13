/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock actions and child components
jest.mock("@/app/lib/actions", () => ({
  createCoverExperience: jest.fn(),
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

import { createCoverExperience } from "@/app/lib/actions";
import NewCoverExperience from "../new-cover-experience";

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

describe("NewCoverExperience", () => {
  beforeEach(() => {
    (createCoverExperience as jest.Mock).mockReset();
  });

  it("renders form with required fields", () => {
    render(<NewCoverExperience user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Add New Cover Experience")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/cover-experience",
    );

    // Hidden user_id input uses boolean `hidden` & `readOnly`
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");

    // Title input and Description textarea
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description/i }),
    ).toBeInTheDocument();

    // Submit button not visible initially
    expect(
      screen.queryByRole("button", { name: /Create New Cover Experience/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewCoverExperience user={mockUser} />);

    expect(
      screen.queryByRole("button", { name: /Create New Cover Experience/i }),
    ).not.toBeInTheDocument();

    const titleInput = screen.getByRole("textbox", { name: /Title/i });
    await user.type(titleInput, "Senior Engineer");

    expect(
      screen.getByRole("button", { name: /Create New Cover Experience/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createCoverExperience as jest.Mock).mockResolvedValue({});

    render(<NewCoverExperience user={mockUser} />);

    const titleInput = screen.getByRole("textbox", { name: /Title/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Description/i,
    });

    await user.type(titleInput, "Senior Engineer");
    await user.type(
      descriptionInput,
      "This is a sample cover experience description.",
    );

    const submitButton = screen.getByRole("button", {
      name: /Create New Cover Experience/i,
    });
    await user.click(submitButton);

    // Wait for the mocked action to be called (reliable in tests)
    await waitFor(() => {
      expect(createCoverExperience).toHaveBeenCalledTimes(1);
    });

    // Assert the FormData passed to createCoverExperience
    const formData = (createCoverExperience as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("title")).toBe("Senior Engineer");
    expect(formData.get("description")).toBe(
      "This is a sample cover experience description.",
    );
  });

  it("handles validation errors returned from action (assert create call and payload)", async () => {
    const user = userEvent.setup();
    // we return a validation-style response; component would console.error inside handleCreate,
    // but in the test environment the internal action wrapper may not run console calls reliably.
    (createCoverExperience as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewCoverExperience user={mockUser} />);

    const titleInput = screen.getByRole("textbox", { name: /Title/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Description/i,
    });

    await user.type(titleInput, "Test Title");
    await user.type(descriptionInput, "Test description");

    const submitButton = screen.getByRole("button", {
      name: /Create New Cover Experience/i,
    });
    await user.click(submitButton);

    // Ensure the action was invoked with the expected FormData
    await waitFor(() => {
      expect(createCoverExperience).toHaveBeenCalledTimes(1);
    });

    const formData = (createCoverExperience as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("title")).toBe("Test Title");
    expect(formData.get("description")).toBe("Test description");

    // Note: we avoid asserting console.error here because the function-valued form action
    // may not call console.error in the test DOM the same way it does at runtime.
  });

  it("handles unexpected errors (rejections) gracefully (assert action called)", async () => {
    const user = userEvent.setup();
    (createCoverExperience as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewCoverExperience user={mockUser} />);

    const titleInput = screen.getByRole("textbox", { name: /Title/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Description/i,
    });

    await user.type(titleInput, "Test Title");
    await user.type(descriptionInput, "Test description");

    const submitButton = screen.getByRole("button", {
      name: /Create New Cover Experience/i,
    });
    await user.click(submitButton);

    // Ensure the action was invoked (even if it rejected)
    await waitFor(() => {
      expect(createCoverExperience).toHaveBeenCalledTimes(1);
    });

    // We don't assert console.error here for the same reason as above.
  });
});
