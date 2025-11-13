/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/resume-edit-button.test.tsx
 *
 * Tests for the ResumeEditButton component
 *
 * - Verifies the link renders with correct href based on resumeId
 * - Checks that the button has the expected styling classes
 * - Ensures the "Edit" text is displayed
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import ResumeEditButton from "../resume-edit-button";

describe("ResumeEditButton", () => {
  it("renders a link with correct href and displays 'Edit' text", () => {
    const resumeId = "123";
    render(<ResumeEditButton resumeId={resumeId} />);

    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/dashboard/resume/edit/${resumeId}`);
  });

  it("applies the expected styling classes", () => {
    render(<ResumeEditButton resumeId="test-id" />);

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
    render(<ResumeEditButton resumeId="test-id" />);

    const paragraph = screen.getByText("Edit");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("font-bold");
    expect(paragraph).toHaveClass("text-lg");
    expect(paragraph).toHaveClass("w-full");
    expect(paragraph).toHaveClass("flex");
    expect(paragraph).toHaveClass("justify-center");
    expect(paragraph).toHaveClass("m-auto");
  });

  it("handles different resumeId values", () => {
    const resumeIds = ["abc", 456, "xyz-789"];
    resumeIds.forEach((id) => {
      const { rerender } = render(<ResumeEditButton resumeId={id} />);
      const link = screen.getByRole("link", { name: "Edit" });
      expect(link).toHaveAttribute("href", `/dashboard/resume/edit/${id}`);
      rerender(<></>); // Clear previous render to avoid duplicates
    });
  });
});
