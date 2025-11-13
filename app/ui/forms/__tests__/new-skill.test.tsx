/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@/app/lib/definitions";

// Mock actions and child components
jest.mock("@/app/lib/actions", () => ({
  createUserSkill: jest.fn(),
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

import { createUserSkill } from "@/app/lib/actions";
import NewSkill from "../new-skill";

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

describe("NewSkill", () => {
  beforeEach(() => {
    (createUserSkill as jest.Mock).mockReset();
  });

  it("renders form with all required fields", () => {
    render(<NewSkill user={mockUser} />);

    // Header and back link
    expect(screen.getByText("Create New Skill")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/dashboard/skills/",
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

    expect(resumeIdInput).toBeDefined();
    expect(resumeIdInput).toHaveAttribute("id", "resume_id");
    expect(resumeIdInput).toHaveAttribute("name", "resume_id");
    expect(resumeIdInput).toHaveValue("blank");
    expect(resumeIdInput).toHaveAttribute("hidden");
    expect(resumeIdInput).toHaveAttribute("readonly");

    // Visible inputs
    expect(
      screen.getByRole("textbox", { name: /Skill Name/i }),
    ).toBeInTheDocument();
    // Use getByLabelText to find slider by its label (avoids matching the numeric part)
    expect(screen.getByLabelText(/Skill Level/i)).toBeInTheDocument();

    // Submit button not visible initially
    expect(
      screen.queryByRole("button", { name: /Create New Skill/i }),
    ).not.toBeInTheDocument();
  });

  it("shows submit button when form is edited", async () => {
    const user = userEvent.setup();
    render(<NewSkill user={mockUser} />);

    expect(
      screen.queryByRole("button", { name: /Create New Skill/i }),
    ).not.toBeInTheDocument();

    const skillNameInput = screen.getByRole("textbox", { name: /Skill Name/i });
    await user.type(skillNameInput, "JavaScript");

    expect(
      screen.getByRole("button", { name: /Create New Skill/i }),
    ).toBeInTheDocument();
  });

  it("updates skill level label when slider changes", async () => {
    const user = userEvent.setup();
    render(<NewSkill user={mockUser} />);

    // Find slider by label
    const skillLevelSlider = screen.getByLabelText(
      /Skill Level/i,
    ) as HTMLInputElement;
    expect(skillLevelSlider).toHaveValue("50");

    // Change value using fireEvent.change (reliable in jsdom)
    fireEvent.change(skillLevelSlider, { target: { value: "52" } });

    // slider input value should update
    expect(skillLevelSlider).toHaveValue("52");

    // Check the label element text contains the updated percent
    const labelEl = document.querySelector(
      'label[for="skill_level"]',
    ) as HTMLElement | null;
    expect(labelEl).not.toBeNull();
    expect(labelEl!.textContent!.replace(/\s+/g, " ").trim()).toMatch(
      /Skill Level\s*52\s*%/,
    );
  });

  it("submits form data successfully", async () => {
    const user = userEvent.setup();
    (createUserSkill as jest.Mock).mockResolvedValue({});

    render(<NewSkill user={mockUser} />);

    const skillNameInput = screen.getByRole("textbox", { name: /Skill Name/i });
    const skillLevelSlider = screen.getByLabelText(
      /Skill Level/i,
    ) as HTMLInputElement;

    await user.type(skillNameInput, "TypeScript");

    // Set slider value reliably
    fireEvent.change(skillLevelSlider, { target: { value: "48" } });
    expect(skillLevelSlider).toHaveValue("48");

    const submitButton = screen.getByRole("button", {
      name: /Create New Skill/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createUserSkill).toHaveBeenCalledTimes(1);
    });

    // Get the first call's first arg (FormData)
    const formData = (createUserSkill as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("user_id")).toBe(mockUser.id);
    expect(formData.get("section_title")).toBe("blank");
    expect(formData.get("resume_id")).toBe("blank");
    expect(formData.get("skill_title")).toBe("TypeScript");
    expect(formData.get("skill_level")).toBe("48");
  });

  it("handles validation-style responses (assert action called and payload)", async () => {
    const user = userEvent.setup();
    (createUserSkill as jest.Mock).mockResolvedValue({
      errors: true,
      message: "Validation failed",
    });

    render(<NewSkill user={mockUser} />);

    const skillNameInput = screen.getByRole("textbox", { name: /Skill Name/i });
    await user.type(skillNameInput, "React");

    const skillLevelSlider = screen.getByLabelText(
      /Skill Level/i,
    ) as HTMLInputElement;
    // set required slider value so validation doesn't block submission
    fireEvent.change(skillLevelSlider, { target: { value: "60" } });

    const submitButton = screen.getByRole("button", {
      name: /Create New Skill/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createUserSkill).toHaveBeenCalledTimes(1);
    });

    const formData = (createUserSkill as jest.Mock).mock
      .calls[0][0] as FormData;
    expect(formData.get("skill_title")).toBe("React");
  });

  it("handles unexpected rejections (assert action called)", async () => {
    const user = userEvent.setup();
    (createUserSkill as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    render(<NewSkill user={mockUser} />);

    const skillNameInput = screen.getByRole("textbox", { name: /Skill Name/i });
    await user.type(skillNameInput, "Next.js");

    const skillLevelSlider = screen.getByLabelText(
      /Skill Level/i,
    ) as HTMLInputElement;
    fireEvent.change(skillLevelSlider, { target: { value: "70" } });

    const submitButton = screen.getByRole("button", {
      name: /Create New Skill/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createUserSkill).toHaveBeenCalledTimes(1);
    });
  });
});
