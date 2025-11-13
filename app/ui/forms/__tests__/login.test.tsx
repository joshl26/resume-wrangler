/**
 * @jest-environment jsdom
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

/**
 * Mocks - MUST be declared before importing the component under test
 */
jest.mock("next-auth/react", () => ({
  __esModule: true,
  signIn: jest.fn(),
}));

jest.mock("../../login-button", () => ({
  __esModule: true,
  LoginButton: ({ children, className, disabled, ...props }: any) => (
    <button
      data-testid="login-button"
      type="submit"
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
}));

import { signIn } from "next-auth/react";
import LoginForm from "../login";

describe("LoginForm", () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders inputs, icons and OAuth buttons and calls signIn for each provider", async () => {
    const providers = ["google", "github", "linkedin"] as const;

    for (const provider of providers) {
      (signIn as jest.Mock).mockResolvedValueOnce({});

      const { unmount } = render(<LoginForm />);

      const readableName =
        provider === "github"
          ? "GitHub"
          : provider.charAt(0).toUpperCase() + provider.slice(1);
      const btn = screen.getByRole("button", {
        name: new RegExp(`Sign in with ${readableName}`, "i"),
      });
      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith(provider, {
          callbackUrl: "/dashboard",
        });
      });

      unmount();
    }
  });

  it("calls signIn for credentials and shows loading state while signing in", async () => {
    // Use a promise that resolves after a tick so we can observe the loading state.
    let resolveSignIn: (value?: any) => void;
    const signInPromise = new Promise((res) => {
      resolveSignIn = res;
    });
    (signIn as jest.Mock).mockReturnValue(signInPromise);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId("login-button");

    fireEvent.change(emailInput, { target: { value: "user@example.test" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit
    fireEvent.click(submitButton);

    // signIn should have been called with correct args
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "user@example.test",
        password: "password123",
        callbackUrl: "/dashboard",
      });
    });

    // While signIn is unresolved the UI should show loading state
    expect(screen.getByTestId("login-button")).toHaveTextContent(
      /Signing in.../i,
    );
    expect(screen.getByTestId("login-button")).toBeDisabled();

    // Resolve signIn (simulate success). We don't assert navigation since window.location is read-only in this env.
    resolveSignIn!({});

    // After resolution, there's no error shown (can't rely on navigation in jsdom), and tests should not throw.
    await waitFor(() => {
      // Ensure no error message is visible
      const err = screen.queryByText(/Invalid credentials/i);
      expect(err).toBeNull();
    });
  });

  it("shows an error when credentials signIn returns an error and resets loading", async () => {
    // signIn resolves with an error
    (signIn as jest.Mock).mockResolvedValue({ error: "Invalid" });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId("login-button");

    fireEvent.change(emailInput, { target: { value: "bad@example.test" } });
    fireEvent.change(passwordInput, { target: { value: "wrong" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "bad@example.test",
        password: "wrong",
        callbackUrl: "/dashboard",
      });
    });

    // Error message should appear
    const errMsg = await screen.findByText("Invalid credentials");
    expect(errMsg).toBeInTheDocument();

    // Loading should be reset and the button should show "Log In"
    expect(screen.getByTestId("login-button")).toHaveTextContent("Log In");
    expect(screen.getByTestId("login-button")).not.toBeDisabled();
  });
});
