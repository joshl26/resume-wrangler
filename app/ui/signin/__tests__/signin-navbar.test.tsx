/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SigninNavBar from "../signin-navbar";

// Mock next/image to render a plain img tag for tests
jest.mock("next/image", () => {
  return ({ alt, src, ...props }: any) => {
    return (
      <img
        alt={alt}
        src={typeof src === "string" ? src : "/ResumeWranglerLogo-white.png"}
        {...props}
      />
    );
  };
});

// Mock the PNG import to prevent module resolution issues in tests
jest.mock(
  "/public/ResumeWranglerLogo-white.png",
  () => "/ResumeWranglerLogo-white.png",
  { virtual: true },
);

describe("SigninNavBar", () => {
  const u = userEvent.setup();

  it("renders the logo image", () => {
    render(<SigninNavBar />);

    const logo = screen.getByAltText("");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/ResumeWranglerLogo-white.png");
  });

  // Note: The hamburger menu and mobile menu are commented out in the component,
  // so these tests are written to match the current implementation.
  // If you uncomment the menu later, you can enable these tests.

  /*
  it("toggles mobile menu when hamburger button is clicked", async () => {
    render(<SigninNavBar />);

    // Initially, mobile menu should not be visible
    expect(screen.queryByText(/Resume Templates/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Blog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument();

    // Click the hamburger button
    const menuButton = screen.getByRole("button", { name: /Menu/i });
    await u.click(menuButton);

    // Mobile menu should now be visible
    expect(screen.getByText(/Resume Templates/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  });

  it("renders correct links in mobile menu", async () => {
    render(<SigninNavBar />);

    // Open the menu
    const menuButton = screen.getByRole("button", { name: /Menu/i });
    await u.click(menuButton);

    // Check all links
    const resumeTemplatesLink = screen.getByRole("link", { name: /Resume Templates/i });
    expect(resumeTemplatesLink).toHaveAttribute("href", "/resume-templates");

    const blogLink = screen.getByRole("link", { name: /Blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");

    const loginLink = screen.getByRole("link", { name: /Log in/i });
    expect(loginLink).toHaveAttribute("href", "/login");

    const registerLink = screen.getByRole("link", { name: /Create Account/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });
  */

  it("does not show mobile menu by default (menu is commented out)", () => {
    render(<SigninNavBar />);

    // Since the menu is commented out, these should not be in the document
    expect(screen.queryByText(/Resume Templates/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Blog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument();
  });
});
