/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/cover-edit-button.test.tsx
 *
 * Tests for the CoverEditButton component
 *
 * - Verifies the link renders with correct href based on coverId
 * - Checks that the button has the expected styling classes
 * - Ensures the "Edit" text is displayed
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CoverEditButton from "../cover-edit-button";

describe("CoverEditButton", () => {
  it("renders a link with correct href and displays 'Edit' text", () => {
    const coverId = "123";
    render(<CoverEditButton coverId={coverId} />);

    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/dashboard/cover/edit/${coverId}`);
  });

  it("applies the expected styling classes", () => {
    render(<CoverEditButton coverId="test-id" />);

    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toHaveClass("hover:bg-slate-600");
    expect(link).toHaveClass("text-white");
    expect(link).toHaveClass("absolute");
    expect(link).toHaveClass("bottom-6");
    expect(link).toHaveClass("right-6");
    expect(link).toHaveClass("w-[100px]");
    expect(link).toHaveClass("h-[100px]");
    expect(link).toHaveClass("bg-blue-500");
    expect(link).toHaveClass("border-2");
    expect(link).toHaveClass("border-black");
    expect(link).toHaveClass("rounded-full");
  });

  it("contains a paragraph with 'Edit' text centered", () => {
    render(<CoverEditButton coverId="test-id" />);

    const paragraph = screen.getByText("Edit");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("font-bold");
    expect(paragraph).toHaveClass("text-lg");
    expect(paragraph).toHaveClass("w-full");
    expect(paragraph).toHaveClass("flex");
    expect(paragraph).toHaveClass("justify-center");
    expect(paragraph).toHaveClass("m-auto");
  });

  it("handles different coverId values", () => {
    const coverIds = ["abc", 456, "xyz-789"];
    coverIds.forEach((id) => {
      const { rerender } = render(<CoverEditButton coverId={id} />);
      const link = screen.getByRole("link", { name: "Edit" });
      expect(link).toHaveAttribute("href", `/dashboard/cover/edit/${id}`);
      rerender(<></>); // Clear previous render to avoid duplicates
    });
  });
});
