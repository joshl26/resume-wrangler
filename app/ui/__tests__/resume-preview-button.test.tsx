/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/resume-preview-button.test.tsx
 *
 * Tests for the ResumePreviewButton component
 *
 * - Verifies the link href is constructed from resume.id and user.email
 * - Checks styling classes are present
 * - Ensures the inner "Preview" text is rendered and styled
 * - Tests multiple prop variations and undefined handling
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import ResumePreviewButton from "../resume-preview-button";

describe("ResumePreviewButton", () => {
  it("renders a link with correct href and displays 'Preview' text", () => {
    const resume = { id: "resume-123" };
    const user = { email: "user@example.com" };

    render(<ResumePreviewButton resume={resume} user={user} />);

    const link = screen.getByRole("link", { name: "Preview" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/resume-preview/${resume.id}/${user.email}`,
    );
  });

  it("applies the expected styling classes", () => {
    const resume = { id: "r1" };
    const user = { email: "a@b.com" };

    render(<ResumePreviewButton resume={resume} user={user} />);

    const link = screen.getByRole("link", { name: "Preview" });
    // Layout / color classes
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

  it("contains a paragraph with 'Preview' text centered and styled", () => {
    const resume = { id: "x" };
    const user = { email: "y@z.com" };

    render(<ResumePreviewButton resume={resume} user={user} />);

    const paragraph = screen.getByText("Preview");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("font-bold");
    expect(paragraph).toHaveClass("text-lg");
    expect(paragraph).toHaveClass("w-full");
    expect(paragraph).toHaveClass("flex");
    expect(paragraph).toHaveClass("justify-center");
    expect(paragraph).toHaveClass("m-auto");
  });

  it("handles different resume.id and user.email values", () => {
    const cases = [
      { resume: { id: "abc" }, user: { email: "one@two.com" } },
      { resume: { id: 456 }, user: { email: "num@id.com" } },
      { resume: { id: "xyz-789" }, user: { email: "u@e.co" } },
    ];

    const { rerender } = render(
      <ResumePreviewButton resume={cases[0]!.resume} user={cases[0]!.user} />,
    );

    cases.forEach((c) => {
      rerender(<ResumePreviewButton resume={c.resume} user={c.user} />);
      const link = screen.getByRole("link", { name: "Preview" });
      expect(link).toHaveAttribute(
        "href",
        `/dashboard/resume-preview/${c.resume.id}/${c.user.email}`,
      );
    });
  });

  it("gracefully handles undefined resume or user (produces 'undefined' segments)", () => {
    const { rerender } = render(
      <ResumePreviewButton resume={undefined} user={undefined} />,
    );

    let link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/resume-preview/undefined/undefined`,
    );

    // resume present, user missing
    rerender(<ResumePreviewButton resume={{ id: "id-1" }} user={undefined} />);
    link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/resume-preview/id-1/undefined`,
    );

    // user present, resume missing
    rerender(
      <ResumePreviewButton resume={undefined} user={{ email: "e@t.com" }} />,
    );
    link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/resume-preview/undefined/e@t.com`,
    );
  });
});
