/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock actions and child components
jest.mock("@/app/lib/actions", () => ({
  createWorkExperience: jest.fn(),
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

import { createWorkExperience } from "@/app/lib/actions";
import NewWorkExperience from "../new-work-experience";

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

describe("NewWorkExperience", () => {
  beforeEach(() => {
    (createWorkExperience as jest.Mock).mockReset();
  });

  it("renders form with all expected fields", () => {
    render(<NewWorkExperience user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Add New Work Experience")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/work-experience",
    );

    // Hidden inputs: user_id and resume_id
    const userIdInput = screen.getByDisplayValue(
      mockUser.id,
    ) as HTMLInputElement;
    expect(userIdInput).toHaveAttribute("id", "user_id");
    expect(userIdInput).toHaveAttribute("name", "user_id");
    expect(userIdInput).toHaveValue(mockUser.id);
    expect(userIdInput).toHaveAttribute("hidden");
    expect(userIdInput).toHaveAttribute("readonly");

    const resumeInput = screen.getByDisplayValue("blank") as HTMLInputElement;
    expect(resumeInput).toHaveAttribute("id", "resume_id");
    expect(resumeInput).toHaveAttribute("name", "resume_id");
    expect(resumeInput).toHaveValue("blank");
    expect(resumeInput).toHaveAttribute("hidden");
    expect(resumeInput).toHaveAttribute("readonly");

    // Visible inputs / textareas
    expect(
      screen.getByRole("textbox", { name: /Company Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Location/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Job Title/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Start Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /End Date/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description One/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description Two/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description Three/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description Four/i }),
    ).toBeInTheDocument();

    // Submit button not visible until edited
    expect(
      screen.queryByRole("button", { name: /Create New Work Experience/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when any field is edited", async () => {
    const user = userEvent.setup();
    render(<NewWorkExperience user={mockUser} />);

    expect(
      screen.queryByRole("button", { name: /Create New Work Experience/i }),
    ).not.toBeInTheDocument();

    const companyInput = screen.getByRole("textbox", { name: /Company Name/i });
    await user.type(companyInput, "Acme Corp");

    expect(
      screen.getByRole("button", { name: /Create New Work Experience/i }),
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createWorkExperience as jest.Mock).mockResolvedValue({});

    render(<NewWorkExperience user={mockUser} />);

    // Fill required + some optional fields
    const companyInput = screen.getByRole("textbox", { name: /Company Name/i });
    const locationInput = screen.getByRole("textbox", { name: /Location/i });
    const jobTitleInput = screen.getByRole("textbox", { name: /Job Title/i });
    const startInput = screen.getByRole("textbox", { name: /Start Date/i });
    const endInput = screen.getByRole("textbox", { name: /End Date/i });
    const descOne = screen.getByRole("textbox", { name: /Description One/i });
    const descTwo = screen.getByRole("textbox", { name: /Description Two/i });

    await user.type(companyInput, "Acme Corp");
    await user.type(locationInput, "Remote");
    await user.type(jobTitleInput, "Engineer");
    await user.type(startInput, "2021-01-01");
    await user.type(endInput, "2023-01-01");
    await user.type(descOne, "Did engineering work.");
    await user.type(descTwo, "Led projects.");

    const submitButton = screen.getByRole("button", {
      name: /Create New Work Experience/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createWorkExperience).toHaveBeenCalledTimes(1);
    });

    const formData = (createWorkExperience as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("resume_id")).toBe("blank");
    expect(formData.get("company_name")).toBe("Acme Corp");
    expect(formData.get("location")).toBe("Remote");
    expect(formData.get("job_title")).toBe("Engineer");
    expect(formData.get("start_date")).toBe("2021-01-01");
    expect(formData.get("end_date")).toBe("2023-01-01");
    expect(formData.get("description_one")).toBe("Did engineering work.");
    expect(formData.get("description_two")).toBe("Led projects.");
  });

  it("handles validation-style responses (assert action called and payload)", async () => {
    const user = userEvent.setup();
    (createWorkExperience as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewWorkExperience user={mockUser} />);

    const companyInput = screen.getByRole("textbox", { name: /Company Name/i });
    const locationInput = screen.getByRole("textbox", { name: /Location/i });

    // Fill required fields so submission isn't blocked by browser validation
    await user.type(companyInput, "Acme Corp");
    await user.type(locationInput, "Remote");

    const submitButton = screen.getByRole("button", {
      name: /Create New Work Experience/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createWorkExperience).toHaveBeenCalledTimes(1);
    });

    const formData = (createWorkExperience as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("company_name")).toBe("Acme Corp");
  });

  it("handles unexpected rejections (assert action called)", async () => {
    const user = userEvent.setup();
    (createWorkExperience as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewWorkExperience user={mockUser} />);

    const companyInput = screen.getByRole("textbox", { name: /Company Name/i });
    const locationInput = screen.getByRole("textbox", { name: /Location/i });

    await user.type(companyInput, "Acme Corp");
    await user.type(locationInput, "Remote");

    const submitButton = screen.getByRole("button", {
      name: /Create New Work Experience/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createWorkExperience).toHaveBeenCalledTimes(1);
    });
  });
});
