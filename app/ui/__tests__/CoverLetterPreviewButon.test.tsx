/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/cover-letter-preview-button.test.tsx
 *
 * Type-safe tests for the CoverLetterPreviewButton component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CoverLetterPreviewButton from "../cover-letter-preview-button";

type TestCase = {
  coverLetter?: { id?: string | number } | null;
  user?: { email?: string } | null;
};

describe("CoverLetterPreviewButton", () => {
  it("renders a link with correct href and displays 'Preview' text", () => {
    const coverLetter = { id: "cl-123" };
    const user = { email: "user@example.com" };

    render(
      <CoverLetterPreviewButton
        coverLetter={coverLetter as any}
        user={user as any}
      />,
    );

    const link = screen.getByRole("link", { name: "Preview" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/cover-letter-preview/${coverLetter.id}/${user.email}`,
    );
  });

  it("applies the expected styling classes", () => {
    const coverLetter = { id: "cl-1" };
    const user = { email: "a@b.com" };

    render(
      <CoverLetterPreviewButton
        coverLetter={coverLetter as any}
        user={user as any}
      />,
    );

    const link = screen.getByRole("link", { name: "Preview" });
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
    const coverLetter = { id: "x" };
    const user = { email: "y@z.com" };

    render(
      <CoverLetterPreviewButton
        coverLetter={coverLetter as any}
        user={user as any}
      />,
    );

    const paragraph = screen.getByText("Preview");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("font-bold");
    expect(paragraph).toHaveClass("text-lg");
    expect(paragraph).toHaveClass("w-full");
    expect(paragraph).toHaveClass("flex");
    expect(paragraph).toHaveClass("justify-center");
    expect(paragraph).toHaveClass("m-auto");
  });

  it("handles different coverLetter.id and user.email values", () => {
    // Use a stricter type here since these test cases are known to have values
    const cases: Array<{
      coverLetter: { id: string | number };
      user: { email: string };
    }> = [
      { coverLetter: { id: "abc" }, user: { email: "one@two.com" } },
      { coverLetter: { id: 456 }, user: { email: "num@id.com" } },
      { coverLetter: { id: "xyz-789" }, user: { email: "u@e.co" } },
    ];

    const firstCase = cases[0]!;
    const { rerender } = render(
      <CoverLetterPreviewButton
        coverLetter={firstCase.coverLetter as any}
        user={firstCase.user as any}
      />,
    );

    for (const c of cases) {
      rerender(
        <CoverLetterPreviewButton
          coverLetter={c.coverLetter as any}
          user={c.user as any}
        />,
      );

      // Coerce to string for stable comparison (handles numeric ids)
      const idSegment = String(c.coverLetter.id);
      const emailSegment = String(c.user.email);

      const link = screen.getByRole("link", { name: "Preview" });
      expect(link).toHaveAttribute(
        "href",
        `/dashboard/cover-letter-preview/${idSegment}/${emailSegment}`,
      );
    }
  });

  it("gracefully handles undefined coverLetter or user (produces 'undefined' segments)", () => {
    const { rerender } = render(
      <CoverLetterPreviewButton
        coverLetter={undefined as any}
        user={undefined as any}
      />,
    );

    let link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/cover-letter-preview/undefined/undefined`,
    );

    // coverLetter present, user missing
    rerender(
      <CoverLetterPreviewButton
        coverLetter={{ id: "id-1" } as any}
        user={undefined as any}
      />,
    );
    link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/cover-letter-preview/id-1/undefined`,
    );

    // user present, coverLetter missing
    rerender(
      <CoverLetterPreviewButton
        coverLetter={undefined as any}
        user={{ email: "e@t.com" } as any}
      />,
    );
    link = screen.getByRole("link", { name: "Preview" });
    expect(link).toHaveAttribute(
      "href",
      `/dashboard/cover-letter-preview/undefined/e@t.com`,
    );
  });
});
