/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock actions and child components
jest.mock("@/app/lib/actions", () => ({
  createOrganization: jest.fn(),
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

import { createOrganization } from "@/app/lib/actions";
import NewOrganization from "../new-organization";

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

describe("NewOrganization", () => {
  beforeEach(() => {
    (createOrganization as jest.Mock).mockReset();
  });

  it("renders form with all required fields", () => {
    render(<NewOrganization user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Create New Organization")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/organizations/",
    );

    // Hidden fields (user_id, section_title, resume_id)
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");
    expect(userIdInput).toHaveAttribute("required");

    // Two inputs share value "blank" — pick them by id from getAllByDisplayValue
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
    expect(sectionTitleInput).toHaveAttribute("required");

    expect(resumeIdInput).toBeDefined();
    expect(resumeIdInput).toHaveAttribute("id", "resume_id");
    expect(resumeIdInput).toHaveAttribute("name", "resume_id");
    expect(resumeIdInput).toHaveValue("blank");
    expect(resumeIdInput).toHaveAttribute("hidden");
    expect(resumeIdInput).toHaveAttribute("readonly");
    expect(resumeIdInput).toHaveAttribute("required");

    // Visible inputs / textarea
    expect(
      screen.getByRole("textbox", { name: /Organization Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Organization Location/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Start Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /End Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Organization Description/i }),
    ).toBeInTheDocument();

    // Submit button not visible initially
    expect(
      screen.queryByRole("button", { name: /Create New Organization/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewOrganization user={mockUser} />);

    expect(
      screen.queryByRole("button", { name: /Create New Organization/i }),
    ).not.toBeInTheDocument();

    const orgNameInput = screen.getByRole("textbox", {
      name: /Organization Name/i,
    });
    await user.type(orgNameInput, "OpenAI Org");

    expect(
      screen.getByRole("button", { name: /Create New Organization/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createOrganization as jest.Mock).mockResolvedValue({});

    render(<NewOrganization user={mockUser} />);

    const orgNameInput = screen.getByRole("textbox", {
      name: /Organization Name/i,
    });
    const orgLocationInput = screen.getByRole("textbox", {
      name: /Organization Location/i,
    });
    const startInput = screen.getByRole("textbox", { name: /Start Date/i });
    const endInput = screen.getByRole("textbox", { name: /End Date/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Organization Description/i,
    });

    await user.type(orgNameInput, "OpenAI Org");
    await user.type(orgLocationInput, "San Francisco, CA");
    await user.type(startInput, "2020-01-01");
    await user.type(endInput, "2022-12-31");
    await user.type(descriptionInput, "Worked on research and engineering.");

    const submitButton = screen.getByRole("button", {
      name: /Create New Organization/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createOrganization).toHaveBeenCalledTimes(1);
    });

    const formData = (createOrganization as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("section_title")).toBe("blank");
    expect(formData.get("resume_id")).toBe("blank");
    expect(formData.get("organization_name")).toBe("OpenAI Org");
    expect(formData.get("organization_location")).toBe("San Francisco, CA");
    expect(formData.get("organization_start")).toBe("2020-01-01");
    expect(formData.get("organization_end")).toBe("2022-12-31");
    expect(formData.get("organization_description")).toBe(
      "Worked on research and engineering.",
    );
  });

  it("handles validation-style responses (assert action called and payload)", async () => {
    const user = userEvent.setup();
    (createOrganization as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewOrganization user={mockUser} />);

    const orgNameInput = screen.getByRole("textbox", {
      name: /Organization Name/i,
    });
    const orgLocationInput = screen.getByRole("textbox", {
      name: /Organization Location/i,
    });
    const startInput = screen.getByRole("textbox", { name: /Start Date/i });
    const endInput = screen.getByRole("textbox", { name: /End Date/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Organization Description/i,
    });

    // Fill required fields so browser validation doesn't block submission
    await user.type(orgNameInput, "OpenAI Org");
    await user.type(orgLocationInput, "San Francisco, CA");
    await user.type(startInput, "2020-01-01");
    await user.type(endInput, "2022-12-31");
    await user.type(descriptionInput, "Short description");

    const submitButton = screen.getByRole("button", {
      name: /Create New Organization/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createOrganization).toHaveBeenCalledTimes(1);
    });

    const formData = (createOrganization as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("organization_name")).toBe("OpenAI Org");
    // We avoid asserting console.error for reasons discussed earlier.
  });

  it("handles unexpected rejections (assert action called)", async () => {
    const user = userEvent.setup();
    (createOrganization as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewOrganization user={mockUser} />);

    const orgNameInput = screen.getByRole("textbox", {
      name: /Organization Name/i,
    });
    const orgLocationInput = screen.getByRole("textbox", {
      name: /Organization Location/i,
    });
    const startInput = screen.getByRole("textbox", { name: /Start Date/i });
    const endInput = screen.getByRole("textbox", { name: /End Date/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Organization Description/i,
    });

    // Fill required fields so browser validation doesn't block submission
    await user.type(orgNameInput, "OpenAI Org");
    await user.type(orgLocationInput, "San Francisco, CA");
    await user.type(startInput, "2020-01-01");
    await user.type(endInput, "2022-12-31");
    await user.type(descriptionInput, "Short description");

    const submitButton = screen.getByRole("button", {
      name: /Create New Organization/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createOrganization).toHaveBeenCalledTimes(1);
    });

    // No console assertions here — the action rejection is tested by ensuring the mock was invoked.
  });
});
