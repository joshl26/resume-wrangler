/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock the Heroicons to render simple elements with test ids
jest.mock("@heroicons/react/24/outline", () => ({
  BanknotesIcon: () => <div data-testid="banknotes-icon" />,
  ClockIcon: () => <div data-testid="clock-icon" />,
  UserGroupIcon: () => <div data-testid="user-group-icon" />,
  InboxIcon: () => <div data-testid="inbox-icon" />,
}));

// Mock the lusitana font to avoid warnings
jest.mock("@/app/ui/fonts", () => ({
  lusitana: {
    className: "lusitana-font-mock",
  },
}));

import { Card } from "../cards";

describe("Card", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly for collected type with icon and value", () => {
    render(<Card title="Collected" value="$1000" type="collected" />);

    // Check title
    expect(screen.getByText("Collected")).toBeInTheDocument();

    // Check value
    expect(screen.getByText("$1000")).toBeInTheDocument();

    // Check correct icon is rendered
    expect(screen.getByTestId("banknotes-icon")).toBeInTheDocument();

    // Check font class is applied
    const valueElement = screen.getByText("$1000");
    expect(valueElement).toHaveClass("lusitana-font-mock");
  });

  it("renders correctly for pending type with icon and value", () => {
    render(<Card title="Pending" value="5" type="pending" />);

    // Check title
    expect(screen.getByText("Pending")).toBeInTheDocument();

    // Check value
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check correct icon is rendered
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
  });

  it("renders correctly for invoices type with icon and value", () => {
    render(<Card title="Total Invoices" value="12" type="invoices" />);

    // Check title
    expect(screen.getByText("Total Invoices")).toBeInTheDocument();

    // Check value
    expect(screen.getByText("12")).toBeInTheDocument();

    // Check correct icon is rendered
    expect(screen.getByTestId("inbox-icon")).toBeInTheDocument();
  });

  it("renders correctly for customers type with icon and value", () => {
    render(<Card title="Total Customers" value="8" type="customers" />);

    // Check title
    expect(screen.getByText("Total Customers")).toBeInTheDocument();

    // Check value
    expect(screen.getByText("8")).toBeInTheDocument();

    // Check correct icon is rendered
    expect(screen.getByTestId("user-group-icon")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<Card title="Test" value="100" type="collected" />);

    const cardContainer = screen.getByText("Test").closest("div.rounded-xl");
    expect(cardContainer).toHaveClass("bg-gray-50", "shadow-sm");

    const valueContainer = screen.getByText("100");
    expect(valueContainer).toHaveClass(
      "truncate",
      "rounded-xl",
      "bg-white",
      "px-4",
      "py-8",
      "text-center",
      "text-2xl",
    );
  });

  it("handles numeric and string values correctly", () => {
    const { rerender } = render(
      <Card title="Test" value={42} type="collected" />,
    );

    expect(screen.getByText("42")).toBeInTheDocument();

    rerender(<Card title="Test" value="$1,234.56" type="collected" />);

    expect(screen.getByText("$1,234.56")).toBeInTheDocument();
  });
});
