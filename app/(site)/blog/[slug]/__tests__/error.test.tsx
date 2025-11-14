/**
 * @jest-environment jsdom
 *
 * app/components/__tests__/BlogPostError.test.tsx
 *
 * Tests for the client component BlogPostError
 *
 * - Mocks the ErrorFallback UI so the test doesn't depend on the real implementation.
 * - Verifies console.error is called inside useEffect with the expected prefix and error.
 * - Verifies the mocked ErrorFallback receives the error and reset props and that the reset callback is invoked.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock ErrorFallback before importing the component under test
const mockResetButtonText = "Mock Reset";
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

// Import after mocking
// Adjust this import path if the component file is located elsewhere
import BlogPostError from "../error";

describe("BlogPostError (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("logs the error to console on mount and renders ErrorFallback with props", async () => {
    const err = new Error("post boom");
    const reset = jest.fn();

    render(<BlogPostError error={err} reset={reset} />);

    // Wait for useEffect to run and call console.error
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("[BlogPostError]", err);
    });

    // Mocked ErrorFallback should render the error message
    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "post boom",
    );

    // Clicking the reset button should call the reset prop
    fireEvent.click(screen.getByText(mockResetButtonText));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("still renders when error is present and reset is callable", async () => {
    const err = new Error("another post error");
    const reset = jest.fn();

    render(<BlogPostError error={err} reset={reset} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "another post error",
    );
  });
});
