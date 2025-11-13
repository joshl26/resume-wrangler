/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock next-auth/react to control signOut behavior in tests
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

// Mock @heroicons/react to render a simple element for the icon
jest.mock("@heroicons/react/24/outline", () => ({
  PowerIcon: () => <span data-testid="power-icon" />,
}));

// Import the component under test using the exact filename you provided
import SignOutButton from "../SignOutButton";
import { signOut } from "next-auth/react";

describe("SignOutButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign out button with correct text and icon", () => {
    render(<SignOutButton />);

    // Button and text
    const button = screen.getByRole("button", { name: /sign out/i });
    expect(button).toBeInTheDocument();

    // Icon rendered via mock
    expect(screen.getByTestId("power-icon")).toBeInTheDocument();

    // CSS classes present (sample checks)
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn-amber");
    expect(button).toHaveClass("rounded-full");
  });

  it("calls signOut with correct callbackUrl when clicked", async () => {
    const user = userEvent.setup();
    render(<SignOutButton />);

    const button = screen.getByRole("button", { name: /sign out/i });
    await user.click(button);

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
});
