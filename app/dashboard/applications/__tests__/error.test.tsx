/**
 * @jest-environment jsdom
 *
 * app/dashboard/applications/__tests__/error.test.tsx
 *
 * Tests for the client component app/dashboard/applications/error.tsx
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock ErrorFallback before importing the component under test
const mockResetButtonText = "Try Again";
jest.mock("@/app/ui/ErrorFallback", () => ({
  __esModule: true,
  default: ({ error, reset }: { error: Error; reset: () => void }) => (
    <div>
      <div data-testid="mock-error-message">{error?.message}</div>
      <button onClick={reset}>{mockResetButtonText}</button>
    </div>
  ),
}));

// Import after mocks
import RouteError from "../error";

describe("Applications RouteError (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("logs the error to console on mount and renders ErrorFallback with props", async () => {
    const err = new Error("Failed to fetch applications");
    (err as any).digest = "digest-123"; // simulate Next.js digest
    const reset = jest.fn();

    render(<RouteError error={err as any} reset={reset} />);

    // Wait for useEffect to run and call console.error
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[RouteError] /dashboard/applications",
        err,
      );
    });

    // Mocked ErrorFallback should render the error message
    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "Failed to fetch applications",
    );

    // Clicking the reset button should call the reset prop
    fireEvent.click(screen.getByText(mockResetButtonText));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("still renders when error has no digest", async () => {
    const err = new Error("Generic applications error");
    const reset = jest.fn();

    render(<RouteError error={err as any} reset={reset} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[RouteError] /dashboard/applications",
        err,
      );
    });

    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "Generic applications error",
    );
  });
});
