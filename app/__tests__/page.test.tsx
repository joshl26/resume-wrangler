/**
 * @jest-environment jsdom
 *
 * app/__tests__/page.test.tsx
 *
 * Tests the page component that composes Landing + landing sections
 * - Ensures the page renders the composed sections
 * - Ensures exported metadata is correct and metadataBase uses DEPLOYMENT_URL
 */

// Mock the landing components (must be done before requiring the module under test)
jest.mock("../landing/page", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-landing">{children}</div>
    ),
  };
});

jest.mock("../ui/landing/landing-section-one", () => {
  return {
    __esModule: true,
    default: () => <section data-testid="landing-one">One</section>,
  };
});

jest.mock("../ui/landing/landing-section-two", () => {
  return {
    __esModule: true,
    default: () => <section data-testid="landing-two">Two</section>,
  };
});

jest.mock("../ui/landing/landing-section-three", () => {
  return {
    __esModule: true,
    default: () => <section data-testid="landing-three">Three</section>,
  };
});

jest.mock("../ui/landing/landing-section-four", () => {
  return {
    __esModule: true,
    default: () => <section data-testid="landing-four">Four</section>,
  };
});

import React from "react";
import { render, screen } from "@testing-library/react";

function loadPageModule() {
  // Ensure environment is set before the module is evaluated
  jest.resetModules();
  process.env.DEPLOYMENT_URL = "https://example.com";

  // require instead of import so we control when the module is evaluated
  const mod = require("../page");
  return mod;
}

describe("Landing Page (app/page)", () => {
  afterEach(() => {
    // cleanup env & modules so other tests are unaffected
    delete process.env.DEPLOYMENT_URL;
    jest.resetModules();
  });

  it("renders Landing and all landing sections", async () => {
    const mod = loadPageModule();

    // default export is an async function returning JSX
    const element = await mod.default();
    render(element);

    expect(screen.getByTestId("mock-landing")).toBeInTheDocument();
    expect(screen.getByTestId("landing-one")).toBeInTheDocument();
    expect(screen.getByTestId("landing-two")).toBeInTheDocument();
    expect(screen.getByTestId("landing-three")).toBeInTheDocument();
    expect(screen.getByTestId("landing-four")).toBeInTheDocument();
  });

  it("exports metadata with DEPLOYMENT_URL used as metadataBase and correct title/description", () => {
    const mod = loadPageModule();
    const metadata = mod.metadata;

    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Résumé Wrangler");
    expect(metadata.description).toContain("Tame your Job Search");

    // metadataBase must be constructed from process.env.DEPLOYMENT_URL
    expect(metadata.metadataBase).toEqual(new URL("https://example.com"));
  });
});
