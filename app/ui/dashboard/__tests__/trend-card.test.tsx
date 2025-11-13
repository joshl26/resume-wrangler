/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock BarChart and ErrorBoundary before importing TrendCard so the module
 * loader uses the mocks when TrendCard imports them.
 */
jest.mock("@/app/ui/charts/barchart", () => ({
  __esModule: true,
  default: () => <div data-testid="bar-chart">BarChart</div>,
}));

jest.mock("@/app/ui/ErrorBoundary", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

import TrendCard from "../trend-card";

describe("TrendCard", () => {
  it("renders the card title and wraps BarChart with ErrorBoundary", () => {
    const { container } = render(<TrendCard />);

    // Title present
    expect(screen.getByText("Demographics")).toBeInTheDocument();

    // ErrorBoundary mock wrapper is present
    const boundary = screen.getByTestId("error-boundary");
    expect(boundary).toBeInTheDocument();

    // BarChart mock is rendered inside the ErrorBoundary
    const chart = screen.getByTestId("bar-chart");
    expect(chart).toBeInTheDocument();
    expect(boundary).toContainElement(chart);

    // Container classes
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "tour-trend",
      "w-full",
      "h-[250px]",
      "m-auto",
      "bg-white",
      "rounded-lg",
      "tight-shadow",
    );

    // Heading classes
    const heading = screen.getByText("Demographics");
    expect(heading).toHaveClass("font-bold", "p-2");
  });
});
