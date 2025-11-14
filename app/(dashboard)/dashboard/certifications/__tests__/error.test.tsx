/**
 * @jest-environment jsdom
 *
 * app/dashboard/certifications/__tests__/error.test.tsx
 *
 * Tests for the client component app/dashboard/certifications/error.tsx
 *
 * - Mocks ErrorFallback so tests don't depend on the real implementation.
 * - Verifies console.error is called inside useEffect with the expected error.
 * - Verifies the mocked ErrorFallback receives the error and reset props and that the reset callback is invoked.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock ErrorFallback before importing the component under test
const mockResetButtonText = "Retry";
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
import CertificationsError from "../error";

describe("Dashboard Certifications Error (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("logs the error to console on mount and renders ErrorFallback with props", async () => {
    const err = new Error("certifications fetch failed");
    (err as any).digest = "digest-xyz"; // optional digest to mirror Next.js shape
    const reset = jest.fn();

    render(<CertificationsError error={err as any} reset={reset} />);

    // Wait for useEffect to run and call console.error
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(err);
    });

    // Mocked ErrorFallback should render the error message
    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "certifications fetch failed",
    );

    // Clicking the reset button should call the reset prop
    fireEvent.click(screen.getByText(mockResetButtonText));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("still renders when error has no digest", async () => {
    const err = new Error("generic certification error");
    const reset = jest.fn();

    render(<CertificationsError error={err as any} reset={reset} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(err);
    });

    expect(screen.getByTestId("mock-error-message")).toHaveTextContent(
      "generic certification error",
    );
  });
});
