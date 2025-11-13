/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/AcmeLogo.test.tsx
 *
 * Tests for the AcmeLogo component
 *
 * - Mocks the font module to supply a predictable className
 * - Verifies the rendered text and that the font class is applied
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock the font module used by the component so tests don't depend on real font exports
jest.mock("@/app/ui/fonts", () => ({
  lusitana: { className: "lusitana-mock" },
}));

// Import after mocks
import AcmeLogo from "../acme-logo";

describe("AcmeLogo", () => {
  it("renders the logo text and applies the font class", () => {
    const { container } = render(<AcmeLogo />);

    // The visible text
    const textEl = screen.getByText("Résumé Wrangler");
    expect(textEl).toBeInTheDocument();

    // Root wrapper should include the mocked font class and layout classes
    const wrapper = textEl.closest("div");
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveClass("lusitana-mock");
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("items-center");
  });
});
