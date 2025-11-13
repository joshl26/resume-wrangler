/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */

// Mock the updateCoverExperience action
jest.mock("@/app/lib/actions", () => ({
  __esModule: true,
  updateCoverExperience: jest.fn().mockResolvedValue({}),
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

import EditCoverExperience from "../edit-cover-experience";

describe("EditCoverExperience", () => {
  const baseCoverExperience = {
    id: "exp-1",
    title: "Original Title",
    description: "Original description content.",
  };

  const userId = "user-123";

  it("renders form with default values and hidden inputs", () => {
    const { container } = render(
      <EditCoverExperience
        coverExperience={baseCoverExperience as any}
        userId={userId}
      />,
    );

    // Back button present and correct href
    const back = screen.getByTestId("back-button");
    expect(back).toBeInTheDocument();
    expect(back).toHaveAttribute("href", "/dashboard/cover-experience");

    // Heading
    expect(screen.getByText("Edit Cover Experience")).toBeInTheDocument();

    // Hidden inputs: experience_id and user_id
    const expId = container.querySelector<HTMLInputElement>("#experience_id");
    expect(expId).toBeInTheDocument();
    expect(expId).toHaveValue(baseCoverExperience.id);

    const userInput = container.querySelector<HTMLInputElement>("#user_id");
    expect(userInput).toBeInTheDocument();
    expect(userInput).toHaveValue(userId);

    // Title input default value
    const titleInput = screen.getByLabelText(
      "Cover Experience Title",
    ) as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(baseCoverExperience.title);

    // Description textarea default value
    const descTextarea = screen.getByLabelText(
      "Description One",
    ) as HTMLTextAreaElement;
    expect(descTextarea).toBeInTheDocument();
    expect(descTextarea).toHaveValue(baseCoverExperience.description);

    // Initially edited is false -> SubmitButton should NOT be rendered
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Container classes
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass(
      "overflow-y-auto",
      "h-full",
      "w-[600px]",
      "px-3",
      "pb-3",
    );
  });

  it("shows the SubmitButton after changing the title", () => {
    render(
      <EditCoverExperience
        coverExperience={baseCoverExperience as any}
        userId={userId}
      />,
    );

    const titleInput = screen.getByLabelText(
      "Cover Experience Title",
    ) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Update Cover Experience");
    // Should not be disabled initially
    expect(submit).not.toBeDisabled();
  });

  it("shows the SubmitButton after changing the description", () => {
    render(
      <EditCoverExperience
        coverExperience={baseCoverExperience as any}
        userId={userId}
      />,
    );

    const descTextarea = screen.getByLabelText(
      "Description One",
    ) as HTMLTextAreaElement;
    fireEvent.change(descTextarea, {
      target: { value: "Updated description" },
    });

    const submit = screen.getByTestId("submit-button");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Update Cover Experience");
  });
});
