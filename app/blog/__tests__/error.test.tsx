/**
 * @jest-environment jsdom
 *
 * app/components/__tests__/BlogError.test.tsx
 *
 * Tests for the client component BlogError (app/.../BlogError.tsx)
 *
 * - Mocks the ErrorFallback UI so the test doesn't depend on the real implementation.
 * - Verifies console.error is called inside useEffect with the expected prefix and error.
 * - Verifies the mocked ErrorFallback receives the error and reset props (by rendering error message)
 *   and that the reset callback is invoked when the fallback UI triggers it.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock ErrorFallback before importing the component under test
const mockResetClickText = "Reset";
jest.mock("@/app/ui/ErrorFallback", () => {
  return {
    __esModule: true,
    default: ({ error, reset }: { error: Error; reset: () => void }) => (
      <div>
        <div data-testid="mock-error-message">{error?.message}</div>
        <button onClick={reset}>{mockResetClickText}</button>
      </div>
    ),
  };
});

// Import after mocks
import BlogError from "../error";
import ErrorFallback from "@/app/ui/ErrorFallback";

describe("BlogError (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("logs the error to console on mount and renders ErrorFallback with props", async () => {
    const err = new Error("boom");
    const reset = jest.fn();

    render(<BlogError error={err} reset={reset} />);

    // Wait for useEffect to run and call console.error
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("[BlogError]", err);
    });

    // Mocked ErrorFallback should render the error message
    expect(screen.getByTestId("mock-error-message")).toHaveTextContent("boom");

    // Clicking the reset button should call the reset prop
    fireEvent.click(screen.getByText(mockResetClickText));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("still renders when error is present and reset is callable", async () => {
    const err = new Error("another error");
    const reset = jest.fn();

    render(<BlogError error={err} reset={reset} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "another error",
    );
  });
});
