/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/login-button.test.tsx
 *
 * Tests for the LoginButton component
 *
 * - Mocks useFormStatus to simulate pending state
 * - Verifies button renders children normally when not pending
 * - Checks that "Signing in…" is shown and button is disabled when pending
 * - Ensures className is merged and type is submit
 * - Tests disabled prop overrides pending state
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { LoginButton } from "../login-button";

// Mock useFormStatus to control pending state in tests
const mockUseFormStatus = jest.fn();
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => mockUseFormStatus(),
}));

describe("LoginButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children and has submit type when not pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    const childText = "Sign In";
    render(<LoginButton>{childText}</LoginButton>);

    const button = screen.getByRole("button", { name: childText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });

  it("shows 'Signing in…' and is disabled when pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(<LoginButton>Sign In</LoginButton>);

    const button = screen.getByRole("button", { name: "Signing in…" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("merges className prop with default 'w-full'", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    const customClass = "bg-blue-500";
    render(<LoginButton className={customClass}>Sign In</LoginButton>);

    const button = screen.getByRole("button", { name: "Sign In" });
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass(customClass);
  });

  it("is disabled when disabled prop is true, even if not pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    render(<LoginButton disabled>Sign In</LoginButton>);

    const button = screen.getByRole("button", { name: "Sign In" });
    expect(button).toBeDisabled();
  });

  it("is disabled when both disabled and pending are true", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(<LoginButton disabled>Sign In</LoginButton>);

    const button = screen.getByRole("button", { name: "Signing in…" });
    expect(button).toBeDisabled();
  });

  it("renders custom children when pending (children are not shown)", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(
      <LoginButton>
        <span>Custom Child</span>
      </LoginButton>,
    );

    // When pending, children are not rendered; only "Signing in…" is shown
    expect(screen.getByText("Signing in…")).toBeInTheDocument();
    expect(screen.queryByText("Custom Child")).not.toBeInTheDocument();
  });
});
