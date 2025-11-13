/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/submit-button.test.tsx
 *
 * Tests for the SubmitButton component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { SubmitButton } from "../submit-button";

// Mock useFormStatus to control pending state in tests
const mockUseFormStatus = jest.fn();
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => mockUseFormStatus(),
}));

describe("SubmitButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children and has submit type when not pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    const childText = "Save Changes";
    render(<SubmitButton className="bg-blue-500">{childText}</SubmitButton>);

    const button = screen.getByRole("button", { name: childText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });

  it("shows 'Saving' and is disabled with opacity when pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(<SubmitButton className="bg-blue-500">Save</SubmitButton>);

    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("merges className prop with default classes", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    const customClass = "bg-green-500";
    render(<SubmitButton className={customClass}>Save</SubmitButton>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass(customClass);
  });

  it("is disabled and shows opacity when disabled prop is true, even if not pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    render(
      <SubmitButton className="bg-red-500" disabled>
        Save
      </SubmitButton>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("is disabled and shows opacity when both disabled and pending are true", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(
      <SubmitButton className="bg-purple-500" disabled>
        Save
      </SubmitButton>,
    );

    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("passes through other button attributes", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    render(
      <SubmitButton
        className="bg-yellow-500"
        aria-label="Save the form"
        data-testid="save-btn"
      >
        Save
      </SubmitButton>,
    );

    // Query by test id because aria-label becomes the accessible name
    const button = screen.getByTestId("save-btn");
    expect(button).toHaveAttribute("aria-label", "Save the form");
    expect(button).toHaveAttribute("data-testid", "save-btn");
    // Also ensure the visible text is still present
    expect(button).toHaveTextContent("Save");
  });
});
