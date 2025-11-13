/**
 * @jest-environment jsdom
 *
 * app/dashboard/providers/__tests__/providers.test.tsx
 *
 * Tests for the client component dashboard/providers.tsx
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock SessionProvider to a simple div wrapper that exposes the session as a data attribute
jest.mock("next-auth/react", () => ({
  SessionProvider: ({
    children,
    session,
  }: {
    children: React.ReactNode;
    session: any;
  }) =>
    React.createElement(
      "div",
      {
        "data-testid": "mock-session-provider",
        "data-session": JSON.stringify(session),
      },
      children,
    ),
}));

// Import after mocks
import Providers from "../providers";

describe("Dashboard Providers (client)", () => {
  it("renders children inside SessionProvider", () => {
    render(
      <Providers>
        <div data-testid="child-content">Hello World</div>
      </Providers>,
    );

    // Child content should be present
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();

    // Mocked SessionProvider wrapper should be present
    expect(screen.getByTestId("mock-session-provider")).toBeInTheDocument();
  });

  it("passes session prop to SessionProvider", () => {
    const mockSession = {
      user: { id: "user-1", name: "Test User", email: "test@example.com" },
      expires: "2025-01-01T00:00:00.000Z",
    };

    render(
      <Providers session={mockSession}>
        <div>Child</div>
      </Providers>,
    );

    const providerWrapper = screen.getByTestId("mock-session-provider");
    expect(providerWrapper).toHaveAttribute(
      "data-session",
      JSON.stringify(mockSession),
    );
  });
  it("handles null session", () => {
    render(
      <Providers session={null}>
        <div>Child</div>
      </Providers>,
    );

    const providerWrapper = screen.getByTestId("mock-session-provider");

    // Verify null session was passed through
    expect(providerWrapper).toHaveAttribute("data-session", "null");
  });

  it("handles undefined session (attribute should be absent)", () => {
    render(
      <Providers>
        <div>Child</div>
      </Providers>,
    );

    const providerWrapper = screen.getByTestId("mock-session-provider");

    // When session is undefined, JSON.stringify(undefined) === undefined and React will omit the attribute,
    // so data-session will be absent (null)
    expect(providerWrapper.getAttribute("data-session")).toBeNull();
  });
});
