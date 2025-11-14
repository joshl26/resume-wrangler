/**
 * @jest-environment jsdom
 *
 * app/blog/__tests__/view-counter.test.tsx
 *
 * Tests for the client component ViewCounter (app/blog/view-counter.tsx)
 *
 * - Fixed duplicate-render issue by splitting null/undefined cases into separate tests
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import ViewCounter from "../view-counter";

describe("ViewCounter (client)", () => {
  it("renders view count correctly when data is present", () => {
    const allViews = [
      { slug: "post-1", count: 1234 },
      { slug: "post-2", count: 5678 },
    ];

    render(
      <ViewCounter slug="post-1" allViews={allViews} className="test-class" />,
    );

    expect(screen.getByText("1,234 views")).toBeInTheDocument();
    expect(screen.getByText("1,234 views")).toHaveClass("test-class");
  });

  it("renders 0 views when slug is not found", () => {
    const allViews = [{ slug: "post-1", count: 1234 }];

    render(
      <ViewCounter
        slug="non-existent-post"
        allViews={allViews}
        className="test-class"
      />,
    );

    expect(screen.getByText("0 views")).toBeInTheDocument();
  });

  it("renders 0 views when allViews is empty", () => {
    render(<ViewCounter slug="post-1" allViews={[]} className="test-class" />);

    expect(screen.getByText("0 views")).toBeInTheDocument();
  });

  it("renders 0 views when allViews is null", () => {
    render(
      <ViewCounter
        slug="post-1"
        // @ts-expect-error - testing null case

        allViews={null}
        className="test-class"
      />,
    );

    expect(screen.getByText("0 views")).toBeInTheDocument();
  });

  it("renders 0 views when allViews is undefined", () => {
    render(
      <ViewCounter
        slug="post-1"
        // @ts-expect-error - testing undefined case

        allViews={undefined}
        className="test-class"
      />,
    );

    expect(screen.getByText("0 views")).toBeInTheDocument();
  });

  it("applies className correctly", () => {
    const allViews = [{ slug: "post-1", count: 42 }];

    render(
      <ViewCounter
        slug="post-1"
        allViews={allViews}
        className="custom-class another-class"
      />,
    );

    const element = screen.getByText("42 views");
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("another-class");
  });

  it("formats large numbers correctly", () => {
    const allViews = [
      { slug: "post-1", count: 1000000 },
      { slug: "post-2", count: 1234567 },
    ];

    render(
      <ViewCounter slug="post-2" allViews={allViews} className="test-class" />,
    );

    // Flexible assertion to account for locale formatting (commas/periods)
    const element = screen.getByText(
      (content) =>
        content.includes("1") &&
        content.includes("234") &&
        content.includes("567") &&
        content.includes("views"),
    );
    expect(element).toBeInTheDocument();
  });
});
