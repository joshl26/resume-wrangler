/**
 * @jest-environment jsdom
 *
 * app/__tests__/error.test.tsx
 *
 * Tests for RootError component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RootError from "../error"; // ← correct relative path from app/__tests__ -> app/error.tsx

// Mock the ErrorFallback component (correct relative path from this test file)
jest.mock("../ui/ErrorFallback", () => {
  return function MockErrorFallback({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    return (
      <div data-testid="error-fallback">
        <h2>Error Fallback</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Reset</button>
      </div>
    );
  };
});

// Mute noisy console.error and keep a spy to assert logging
const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("RootError Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders ErrorFallback with error and reset props", () => {
    const testError = new Error("Test error message");
    const mockReset = jest.fn();

    render(<RootError error={testError} reset={mockReset} />);

    const errorFallback = screen.getByTestId("error-fallback");
    expect(errorFallback).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("calls reset function when reset button is clicked", () => {
    const testError = new Error("Test error");
    const mockReset = jest.fn();

    render(<RootError error={testError} reset={mockReset} />);

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("logs error to console when component mounts", () => {
    const testError = new Error("Console log test error");
    render(<RootError error={testError} reset={jest.fn()} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith("[RootError]", testError);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it("logs different errors when error prop changes", () => {
    const firstError = new Error("First error");
    const secondError = new Error("Second error");
    const { rerender } = render(
      <RootError error={firstError} reset={jest.fn()} />,
    );

    rerender(<RootError error={secondError} reset={jest.fn()} />);

    expect(consoleErrorSpy).toHaveBeenNthCalledWith(
      1,
      "[RootError]",
      firstError,
    );
    expect(consoleErrorSpy).toHaveBeenNthCalledWith(
      2,
      "[RootError]",
      secondError,
    );
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
  });
});
