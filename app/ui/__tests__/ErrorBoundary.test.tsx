/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/ErrorBoundary.test.tsx
 *
 * Tests for the ErrorBoundary class component.
 *
 * Fixes:
 * - Call captured reset and rerender with a non-throwing child inside the same `act()` call
 *   so the boundary receives the cleared state and the new child together.
 * - Use waitFor to verify DOM updates where appropriate.
 */

import React, { ReactNode } from "react";
import { render, screen, waitFor, act } from "@testing-library/react";

// We'll capture the latest reset callback so tests can call it directly.
let latestResetCallback: (() => void) | null = null;

const MockErrorFallback = ({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) => {
  // store the latest reset so tests can call it directly
  latestResetCallback = reset;
  return (
    <div data-testid="error-fallback">
      <span>Fallback Rendered</span>
      <span data-testid="error-message">
        {error?.message || "Unknown error"}
      </span>
      <button data-testid="reset-button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

jest.mock("../ErrorFallback", () => ({
  __esModule: true,
  default: MockErrorFallback,
}));

// Import after mocks
import ErrorBoundary from "../ErrorBoundary";

describe("ErrorBoundary (client)", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Suppress console.error in tests
    latestResetCallback = null;
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("renders children normally when no error occurs", () => {
    const childText = "Normal child content";
    render(
      <ErrorBoundary>
        <div>{childText}</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
    expect(screen.queryByTestId("error-fallback")).not.toBeInTheDocument();
  });

  it("catches errors and renders ErrorFallback", () => {
    // A component that throws when rendered
    class BrokenComponent extends React.Component<{ errorMessage?: string }> {
      override render(): ReactNode {
        throw new Error(this.props.errorMessage || "Intentional test error");
      }
    }

    const errorMessage = "Test error from component";
    render(
      <ErrorBoundary>
        <BrokenComponent errorMessage={errorMessage} />
      </ErrorBoundary>,
    );

    // Should show fallback UI
    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toHaveTextContent(errorMessage);

    // Should log error to console
    expect(console.error).toHaveBeenCalledWith(
      "[ErrorBoundary]",
      expect.objectContaining({ message: errorMessage }),
      expect.any(Object),
    );
  });

  it("resets state and re-renders children after reset is called", async () => {
    // A component that throws when rendered
    class BrokenComponent extends React.Component<{ errorMessage?: string }> {
      override render(): ReactNode {
        throw new Error(this.props.errorMessage || "Intentional test error");
      }
    }

    const { rerender } = render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    // Initially shows fallback
    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();

    // Call reset and immediately rerender with a working child inside the same act()
    const childText = "Working child";
    await act(async () => {
      if (!latestResetCallback) {
        throw new Error("Reset callback was not captured from ErrorFallback");
      }
      latestResetCallback();
      // Immediately provide a non-throwing child so the boundary doesn't re-throw
      rerender(
        <ErrorBoundary>
          <div>{childText}</div>
        </ErrorBoundary>,
      );
    });

    // Wait for the DOM update
    await waitFor(() => {
      expect(screen.getByText(childText)).toBeInTheDocument();
      expect(screen.queryByTestId("error-fallback")).not.toBeInTheDocument();
    });
  });

  it("re-throws if a new error occurs after reset", async () => {
    const errorMessage1 = "First error";
    const errorMessage2 = "Second error";

    // Functional component that throws if `msg` prop is provided
    const Thrower = ({ msg }: { msg?: string }): ReactNode => {
      if (msg) {
        throw new Error(msg);
      }
      return <div>Normal render</div>;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <Thrower msg={errorMessage1} />
      </ErrorBoundary>,
    );

    // First error caught
    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      errorMessage1,
    );

    // Reset boundary state and immediately rerender with a non-throwing child in same act
    await act(async () => {
      if (!latestResetCallback) {
        throw new Error("Reset callback was not captured from ErrorFallback");
      }
      latestResetCallback();
      rerender(
        <ErrorBoundary>
          <Thrower />
        </ErrorBoundary>,
      );
    });

    // Wait for the non-throwing child to appear
    await waitFor(() => {
      expect(screen.getByText("Normal render")).toBeInTheDocument();
    });

    // Now cause a new error by rerendering with a Thrower that throws a different message
    await act(async () => {
      rerender(
        <ErrorBoundary>
          <Thrower msg={errorMessage2} />
        </ErrorBoundary>,
      );
    });

    // Should show fallback again with the new error
    await waitFor(() => {
      expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        errorMessage2,
      );
    });
  });

  it("uses getDerivedStateFromError to update state", () => {
    const error = new Error("Direct static method test");
    const newState = (ErrorBoundary as any).getDerivedStateFromError(error);

    expect(newState).toEqual({
      hasError: true,
      error,
    });
  });
});
