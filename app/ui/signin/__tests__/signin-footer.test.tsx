/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SigninFooter from "../signin-footer";

// Mock next/image so tests run in jsdom
jest.mock("next/image", () => {
  return ({ alt, src, ...props }: any) => {
    return (
      <img
        alt={alt}
        src={typeof src === "string" ? src : "/ResumeWranglerLogo.svg"}
        {...props}
      />
    );
  };
});

// If your test environment doesn't already handle static SVG imports, mock the svg import.
// This ensures the imported Logo value doesn't break the test.
jest.mock("/public/ResumeWranglerLogo.svg", () => "/ResumeWranglerLogo.svg", {
  virtual: true,
});

describe("SigninFooter", () => {
  it("renders logo link and title", () => {
    render(<SigninFooter />);

    // The top anchor contains the logo image and the title text "Resume Wrangler"
    const topLink = screen.getByRole("link", { name: /Resume\s*Wrangler/i });
    expect(topLink).toBeInTheDocument();
    // The anchor uses href="#" in the component
    expect(topLink).toHaveAttribute("href", "#");

    // Image rendered (mocked next/image -> img)
    const logoImg = screen.getByAltText("");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", "/ResumeWranglerLogo.svg");
  });

  it("renders blog/privacy/contact links", () => {
    render(<SigninFooter />);

    const blogLink = screen.getByRole("link", { name: /Blog/i });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute("href", "#");

    const privacyLink = screen.getByRole("link", { name: /Privacy Policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "#");

    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#");
  });

  it("renders copyright text and external link", () => {
    render(<SigninFooter />);

    // The copyright text contains the company link
    const companyLink = screen.getByRole("link", {
      name: /Blackrock Design Haus/i,
    });
    expect(companyLink).toBeInTheDocument();
    expect(companyLink).toHaveAttribute("href", "https://flowbite.com/");

    // The © text should be present
    expect(screen.getByText(/© 2023/i)).toBeInTheDocument();
  });
});
