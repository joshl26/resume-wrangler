/**
 * @jest-environment jsdom
 *
 * app/__tests__/layout.test.tsx
 *
 * Tests for RootLayout component and metadata
 */

// Mock CSS and font imports (declare before requiring the module)
jest.mock("@/app/ui/global.css", () => ({}), { virtual: true });
jest.mock(
  "@/app/ui/fonts",
  () => ({
    inter: { className: "inter-font-class" },
  }),
  { virtual: true },
);

import React from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

function loadLayoutModule() {
  jest.resetModules();
  process.env.DEPLOYMENT_URL = "https://example.com";
  // require after env is set
  const mod = require("../layout");
  return {
    RootLayout: mod.default,
    metadata: mod.metadata,
  };
}

describe("RootLayout (rendering + server HTML checks)", () => {
  afterEach(() => {
    delete process.env.DEPLOYMENT_URL;
    jest.resetModules();
  });

  it("renders children correctly (RTL)", () => {
    const { RootLayout } = loadLayoutModule();

    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>,
    );

    expect(
      container.querySelector('[data-testid="test-child"]'),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("server-rendered HTML contains <html lang='en'>, body classes, and AdSense head tags", () => {
    const { RootLayout } = loadLayoutModule();

    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Server Rendered</div>
      </RootLayout>,
    );

    // html lang attribute
    expect(html).toContain('lang="en"');

    // body class contains the mocked font class and 'antialiased'
    const bodyClassMatch = html.match(/<body[^>]*class="([^"]*)"/);
    expect(bodyClassMatch).toBeTruthy();
    const bodyClass = bodyClassMatch ? bodyClassMatch[1] : "";
    expect(bodyClass).toContain("inter-font-class");
    expect(bodyClass).toContain("antialiased");

    // head: meta and script identifiers
    expect(html).toContain('name="google-adsense-account"');
    expect(html).toContain("googlesyndication");
  });
});

describe("RootLayout metadata", () => {
  afterEach(() => {
    delete process.env.DEPLOYMENT_URL;
    jest.resetModules();
  });

  it("exports metadata with a valid metadataBase and expected fields", () => {
    const { metadata } = loadLayoutModule();

    expect(metadata.metadataBase).toEqual(new URL("https://example.com"));

    expect(metadata.title).toEqual({
      default: "Résumé Wrangler",
      template: "%s | Résumé Wrangler",
    });

    expect(metadata.description).toBe("Résumé Wrangler");

    expect(metadata.openGraph).toEqual({
      title: "Résumé Wrangler",
      description: "Online résumé customization tool",
      url: "https://example.com",
      siteName: "Résumé Wrangler",
      locale: "en_CA",
      type: "website",
    });

    expect(metadata.twitter).toEqual({
      title: "Résumé Wrangler",
      card: "summary_large_image",
    });

    expect(metadata.robots).toBeDefined();
    expect(metadata.robots.index).toBe(true);
    expect(metadata.robots.follow).toBe(true);
  });
});
