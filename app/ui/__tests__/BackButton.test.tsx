/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/back-button.test.tsx
 *
 * Tests for the BackButton component
 *
 * - Verifies the link renders with correct href and text
 * - Checks that the default "hover:underline" class is applied
 * - Ensures additional classes passed via className prop are merged
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/link to render as a regular anchor (avoids need for router context)
jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

// Import after mocks
import BackButton from "../back-button";

describe("BackButton", () => {
  it("renders a link with the correct href and text", () => {
    const href = "/dashboard";
    const text = "Back to Dashboard";

    render(
      <BackButton href={href} className="">
        {text}
      </BackButton>,
    );

    const link = screen.getByRole("link", { name: text });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
  });

  it("applies default hover:underline class and merges additional classes", () => {
    const additionalClass = "text-blue-500";

    render(
      <BackButton href="/" className={additionalClass}>
        Back
      </BackButton>,
    );

    const link = screen.getByRole("link", { name: "Back" });
    expect(link).toHaveClass("hover:underline");
    expect(link).toHaveClass(additionalClass);
  });

  it("renders children as link text", () => {
    const childText = "Go Back";

    render(
      <BackButton href="/" className="">
        {childText}
      </BackButton>,
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
