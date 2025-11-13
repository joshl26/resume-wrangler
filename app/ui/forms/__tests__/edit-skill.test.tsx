/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */

// Mock the updateUserSkill action so the module exists for the component import
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateUserSkill: jest.fn().mockResolvedValue({}),
}));

// Mock SubmitButton to render a real button and forward disabled/className/children
jest.mock("../../submit-button", () => ({
  __esModule: true,
  SubmitButton: ({ children, className, disabled, ...props }: any) => (
    <button
      data-testid="submit-button"
      type="submit"
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock BackButton so we can assert it renders and exposes href/children
jest.mock("../../back-button", () => ({
  __esModule: true,
  default: ({ children, className, href }: any) => (
    <a data-testid="back-button" className={className} href={href}>
      {children}
    </a>
  ),
}));

import EditSkill from "../edit-skill";

describe("EditSkill", () => {
  const baseSkill = {
    id: "skill-1",
    skill: "React",
    skill_level: 60,
  };

  it("renders form with default values and hidden inputs", () => {
    const { container } = render(<EditSkill skill={baseSkill as any} />);

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/skills/");

    // Heading
    expect(screen.getByText("Edit Skill")).toBeInTheDocument();

    // Hidden inputs: skill_id, resume_id, user_id
    const skillId = container.querySelector<HTMLInputElement>("#skill_id");
    expect(skillId).toBeInTheDocument();
    expect(skillId).toHaveValue(baseSkill.id);

    const resumeId = container.querySelector<HTMLInputElement>("#resume_id");
    expect(resumeId).toBeInTheDocument();
    expect(resumeId).toHaveValue("blank");

    const userId = container.querySelector<HTMLInputElement>("#user_id");
    expect(userId).toBeInTheDocument();
    expect(userId).toHaveValue("blank");

    // Skill name input default value
    const nameInput = screen.getByLabelText("Skill Name") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue(baseSkill.skill);

    // Skill level range input and label
    const expectedLabel = `Skill Level ${baseSkill.skill_level}%`;
    const label = screen.getByText(expectedLabel);
    expect(label).toBeInTheDocument();

    const rangeInput = screen.getByLabelText(expectedLabel) as HTMLInputElement;
    expect(rangeInput).toBeInTheDocument();
    // defaultValue on range may be string; check value
    expect(Number(rangeInput.defaultValue || rangeInput.value)).toBe(
      baseSkill.skill_level,
    );

    // Initially edited is false -> SubmitButton should NOT be rendered
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Root container
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("px-3");
  });

  it("shows the SubmitButton after changing the skill name", () => {
    render(<EditSkill skill={baseSkill as any} />);

    const nameInput = screen.getByLabelText("Skill Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Vue" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    // Component renders "Save Update" (note singular in component)
    expect(submit).toHaveTextContent("Save Update");
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton and updates label when changing the range input", () => {
    render(<EditSkill skill={baseSkill as any} />);

    const initialLabel = screen.getByText(
      `Skill Level ${baseSkill.skill_level}%`,
    );
    expect(initialLabel).toBeInTheDocument();

    const rangeInput = screen.getByLabelText(
      `Skill Level ${baseSkill.skill_level}%`,
    ) as HTMLInputElement;
    // Change the value to 85
    fireEvent.change(rangeInput, { target: { value: "85" } });

    // After change, the label should reflect the updated state (Skill Level 85%)
    expect(screen.getByText(/Skill Level 85%/)).toBeInTheDocument();

    // Submit button appears
    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Save Update");
  });
});
