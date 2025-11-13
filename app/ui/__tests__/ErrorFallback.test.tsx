/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/ErrorFallback.test.tsx
 *
 * Tests for the ErrorFallback client component
 *
 * - Mocks Next.js router.push to verify navigation
 * - Checks rendering of error message
 * - Verifies presence and behavior of "Try again", "Go home", and "Get help" buttons
 * - Ensures stack trace is shown in dev mode but not in production
 * - Uses rerender to avoid duplicate DOM nodes
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock Next.js router
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock Next.js Link to render as a regular anchor
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Import after mocks
import ErrorFallback from "../ErrorFallback";

describe("ErrorFallback (client)", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    //@ts-expect-error
    process.env.NODE_ENV = "test"; // default to test mode
  });

  afterEach(() => {
    //@ts-expect-error

    process.env.NODE_ENV = originalNodeEnv;
  });

  it("renders error message and buttons", () => {
    const errorMessage = "Test error message";
    const error = new Error(errorMessage);

    render(<ErrorFallback error={error} />);

    // Should show header and error message
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Buttons/links
    expect(
      screen.getByRole("button", { name: /Go home/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get help/i })).toBeInTheDocument();

    // No "Try again" when reset not provided
    expect(
      screen.queryByRole("button", { name: /Try again/i }),
    ).not.toBeInTheDocument();
  });

  it("calls reset function when Try again is clicked", () => {
    const mockReset = jest.fn();
    const error = new Error("Test error");

    render(<ErrorFallback error={error} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", { name: /Try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("navigates to home when Go home is clicked", () => {
    const error = new Error("Test error");

    render(<ErrorFallback error={error} />);

    const goHomeButton = screen.getByRole("button", { name: /Go home/i });
    fireEvent.click(goHomeButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("links to support page", () => {
    const error = new Error("Test error");

    render(<ErrorFallback error={error} />);

    const supportLink = screen.getByRole("link", { name: /Get help/i });
    expect(supportLink).toHaveAttribute("href", "/support");
  });

  it("shows stack trace in development mode", () => {
    //@ts-expect-error

    process.env.NODE_ENV = "development";
    const errorMessage = "Dev error";
    const error = new Error(errorMessage);
    error.stack = "Fake stack trace for testing";

    render(<ErrorFallback error={error} />);

    // message and stack trace shown in dev
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(error.stack!)).toBeInTheDocument();
  });

  it("hides stack trace in production mode but still shows message", () => {
    //@ts-expect-error

    process.env.NODE_ENV = "production";
    const errorMessage = "Prod error";
    const error = new Error(errorMessage);
    error.stack = "Fake stack trace for testing";

    render(<ErrorFallback error={error} />);

    // In production the stack trace is hidden, but the message is still rendered
    expect(screen.queryByText(error.stack)).not.toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("handles null or undefined error gracefully (uses fallback message)", () => {
    const { rerender } = render(<ErrorFallback error={null} />);
    expect(
      screen.getByText("An unexpected error occurred."),
    ).toBeInTheDocument();

    // Replace the component instance with undefined error (avoid duplicate DOM by using rerender)
    rerender(<ErrorFallback error={undefined} />);
    expect(
      screen.getByText("An unexpected error occurred."),
    ).toBeInTheDocument();
  });
});
