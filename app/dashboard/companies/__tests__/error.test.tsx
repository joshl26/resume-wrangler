/**
 * @jest-environment jsdom
 *
 * app/dashboard/companies/__tests__/error.test.tsx
 *
 * Tests for the client component app/dashboard/companies/error.tsx
 *
 * - Mocks ErrorFallback to a simple component that renders error message and a reset button
 * - Verifies console.error is called with the expected prefix and error inside useEffect
 * - Verifies ErrorFallback receives the error and reset props
 * - Verifies clicking the reset button invokes the reset callback
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock ErrorFallback before importing the component under test
const mockResetButtonText = "Try Again";
jest.mock("@/app/ui/ErrorFallback", () => {
  return {
    __esModule: true,
    default: ({ error, reset }: { error: Error; reset: () => void }) => (
      <div>
        <div data-testid="mock-error-message">{error?.message}</div>
        <button onClick={reset}>{mockResetButtonText}</button>
      </div>
    ),
  };
});

// Import after mocks
import RouteError from "../error";

describe("Companies RouteError (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("logs the error to console on mount and renders ErrorFallback with props", async () => {
    const err = new Error("Failed to fetch companies");
    (err as any).digest = "digest-456"; // Simulate Next.js digest
    const reset = jest.fn();

    render(<RouteError error={err as any} reset={reset} />);

    // Wait for useEffect to run and call console.error
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[RouteError] /dashboard/companies",
        err,
      );
    });

    // Mocked ErrorFallback should render the error message
    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "Failed to fetch companies",
    );

    // Clicking the reset button should call the reset prop
    fireEvent.click(screen.getByText(mockResetButtonText));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("still renders when error has no digest", async () => {
    const err = new Error("Generic companies error");
    // No digest
    const reset = jest.fn();

    render(<RouteError error={err as any} reset={reset} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[RouteError] /dashboard/companies",
        err,
      );
    });

    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "Generic companies error",
    );
  });
});
