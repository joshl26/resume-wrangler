/**
 * @jest-environment jsdom
 *
 * app/__tests__/providers.test.tsx
 *
 * Tests for the Providers component (app/providers.js)
 *
 * - Mocks the `jotai` Provider so tests don't depend on the real library.
 * - Verifies children render and that the Provider wrapper is used.
 */

// Mock jotai before importing the module under test
const providerRenderSpy = jest.fn();

jest.mock("jotai", () => {
  // Return a Provider component that records a render and renders children inside a wrapper for assertions
  return {
    Provider: ({ children }: { children: React.ReactNode }) => {
      providerRenderSpy();
      return <div data-testid="mock-jotai-provider">{children}</div>;
    },
  };
});

import React from "react";
import { render, screen } from "@testing-library/react";
// Import after mocking jotai
import Providers from "../providers";

describe("Providers (app/providers)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children passed to Providers", () => {
    render(
      <Providers>
        <div data-testid="child">Hello Providers</div>
      </Providers>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Hello Providers")).toBeInTheDocument();
  });

  it("wraps children with the jotai Provider (mock) and calls the Provider", () => {
    const { container } = render(
      <Providers>
        <span data-testid="child-2">Child 2</span>
      </Providers>,
    );

    // The mock Provider renders a wrapper with this test id
    expect(
      container.querySelector('[data-testid="mock-jotai-provider"]'),
    ).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();

    // Ensure our mock Provider was invoked
    expect(providerRenderSpy).toHaveBeenCalledTimes(1);
  });

  it("supports multiple children", () => {
    render(
      <Providers>
        <div data-testid="c1">One</div>
        <div data-testid="c2">Two</div>
      </Providers>,
    );

    expect(screen.getByTestId("c1")).toBeInTheDocument();
    expect(screen.getByTestId("c2")).toBeInTheDocument();
    expect(providerRenderSpy).toHaveBeenCalled();
  });
});
