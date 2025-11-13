// app/ui/forms/__tests__/signup-form.test.tsx
/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the fonts module so Next's `next/font/google` isn't invoked during tests
jest.mock("@/app/ui/fonts", () => ({
  lusitana: { className: "lusitana" },
}));

// Mock heroicons used in the component to avoid rendering the real library in tests.
// Each mock returns a simple SVG element with a data-testid so tests can assert presence.
jest.mock("@heroicons/react/24/outline", () => ({
  AtSymbolIcon: (props: any) => <svg data-testid="AtSymbolIcon" {...props} />,
  KeyIcon: (props: any) => <svg data-testid="KeyIcon" {...props} />,
  ExclamationCircleIcon: (props: any) => (
    <svg data-testid="ExclamationCircleIcon" {...props} />
  ),
}));

jest.mock("@heroicons/react/20/solid", () => ({
  ArrowRightIcon: (props: any) => (
    <svg data-testid="ArrowRightIcon" {...props} />
  ),
}));

import SignupForm from "../signup-form";

describe("SignupForm", () => {
  const user = userEvent.setup();

  it("renders the signup form with all fields", () => {
    render(<SignupForm />);

    // Title
    expect(
      screen.getByText("Please create an account to continue."),
    ).toBeInTheDocument();

    // Username
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username address"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /username/i }),
    ).toBeInTheDocument();

    // Email
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your email address"),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();

    // Password
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );

    // Mocked icons: there should be two AtSymbolIcon instances (username + email)
    const atIcons = screen.getAllByTestId("AtSymbolIcon");
    expect(atIcons.length).toBe(2);

    // KeyIcon should appear once (password)
    const keyIcons = screen.getAllByTestId("KeyIcon");
    expect(keyIcons.length).toBe(1);
  });

  it("has correct input attributes", () => {
    render(<SignupForm />);

    const usernameInput = screen.getByLabelText("Username");
    expect(usernameInput).toHaveAttribute("name", "username");
    expect(usernameInput).toBeRequired();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toBeRequired();

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("minlength", "6"); // DOM lowercases attribute names
  });

  it("allows users to type in all fields", async () => {
    render(<SignupForm />);

    const usernameInput = screen.getByLabelText("Username");
    await user.type(usernameInput, "testuser");
    expect((usernameInput as HTMLInputElement).value).toBe("testuser");

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "test@example.com");
    expect((emailInput as HTMLInputElement).value).toBe("test@example.com");

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "password123");
    expect((passwordInput as HTMLInputElement).value).toBe("password123");
  });

  it("applies expected container classes for basic styling", () => {
    render(<SignupForm />);

    const title = screen.getByText("Please create an account to continue.");
    const formContainer = title.closest("div"); // the immediate container in the component
    expect(formContainer).toHaveClass("flex-1", "rounded-lg", "bg-gray-50");
  });
});
