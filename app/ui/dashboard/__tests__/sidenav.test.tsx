/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock next/link to render a simple anchor element
 */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

/**
 * Mock the AcmeLogo component
 */
jest.mock("@/app/ui/acme-logo", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="acme-logo">Acme Logo</div>,
  };
});

/**
 * Mock the SignOutButton component
 */
jest.mock("@/app/ui/dashboard/SignOutButton", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="sign-out-button">Sign Out</div>,
  };
});

/**
 * Mock the NavLinks component
 */
jest.mock("@/app/ui/dashboard/nav-links", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="nav-links">Navigation Links</div>,
  };
});

import SideNav from "../sidenav";

describe("SideNav", () => {
  const mockSession = {
    user: {
      name: "Test User",
      email: "test@example.com",
    },
  };

  it("renders the SideNav with all components", () => {
    render(<SideNav session={mockSession} />);

    // Check that the logo link is rendered with correct href and classes
    const logoLink = screen.getByRole("link", { name: /acme logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/dashboard");
    expect(logoLink).toHaveClass(
      "flex",
      "flex-row",
      "ml-2",
      "mr-2",
      "m-auto",
      "justify-start",
      "rounded-lg",
      "h-[125px]",
      "bg-gradient-amber",
      "tight-shadow",
      "p-4",
    );

    // Check that the AcmeLogo is rendered
    expect(screen.getByTestId("acme-logo")).toBeInTheDocument();

    // Check that the SignOutButton is rendered
    expect(screen.getByTestId("sign-out-button")).toBeInTheDocument();

    // Check that the NavLinks is rendered
    expect(screen.getByTestId("nav-links")).toBeInTheDocument();
  });

  it("applies correct container classes", () => {
    const { container } = render(<SideNav session={mockSession} />);

    const sideNav = container.firstChild as HTMLElement;
    expect(sideNav).toHaveClass(
      "relative",
      "tour_nav",
      "h-full",
      "flex-col",
      "py-4",
      "pl-2",
    );
  });

  it("renders navigation container with correct classes", () => {
    render(<SideNav session={mockSession} />);

    const navContainer = screen.getByTestId("nav-links")
      .parentElement as HTMLElement;
    expect(navContainer).toHaveClass(
      "flex",
      "mt-2",
      "pt-2",
      "pl-2",
      "pb-2",
      "pr-2",
      "gap-1",
      "space-y-1",
      "flex-col",
      "overflow-y-auto",
      "w-full",
    );
  });
});
