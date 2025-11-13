/**
 * @jest-environment jsdom
 *
 * app/components/__tests__/SandpackCSS.test.tsx
 *
 * Tests for the client component SandpackCSS
 *
 * - Mocks getSandpackCssText to return deterministic CSS
 * - Mocks useServerInsertedHTML to capture the callback
 * - Verifies the component returns null
 * - Verifies the captured callback renders the expected style tag
 */

import React from "react";
import { render } from "@testing-library/react";

// Mock the sandpack function
const mockGetSandpackCssText = jest
  .fn()
  .mockReturnValue(".test-class { color: red; }");
jest.mock("@codesandbox/sandpack-react", () => ({
  getSandpackCssText: mockGetSandpackCssText,
}));

// Capture the callback passed to useServerInsertedHTML
let capturedCallback: (() => React.ReactElement) | null = null;
jest.mock("next/navigation", () => ({
  useServerInsertedHTML: (cb: () => React.ReactElement) => {
    capturedCallback = cb;
  },
}));

// Import after mocks
import { SandpackCSS } from "../sandpack";

describe("SandpackCSS (client)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    capturedCallback = null;
  });

  it("returns null and captures callback that renders correct style tag", () => {
    const { container } = render(<SandpackCSS />);

    // Component returns null (no DOM output)
    expect(container.firstChild).toBeNull();

    // We captured the callback
    expect(typeof capturedCallback).toBe("function");

    // Invoke the callback (simulate server insertion) and cast the result so TypeScript knows the props shape
    const result = capturedCallback!();

    // Cast result to a React element with known props shape for a <style> element
    const element = result as React.ReactElement<
      { id?: string; dangerouslySetInnerHTML?: { __html: string } },
      string
    >;

    const props = element.props!;

    expect(mockGetSandpackCssText).toHaveBeenCalled();

    expect(element.type).toBe("style");
    expect(props.id).toBe("sandpack");
    expect(props.dangerouslySetInnerHTML?.__html).toBe(
      ".test-class { color: red; }",
    );
  });

  it("handles empty CSS text", () => {
    mockGetSandpackCssText.mockReturnValueOnce("");

    render(<SandpackCSS />);
    expect(typeof capturedCallback).toBe("function");

    const result = capturedCallback!();
    const element = result as React.ReactElement<
      { id?: string; dangerouslySetInnerHTML?: { __html: string } },
      string
    >;
    const props = element.props!;

    expect(mockGetSandpackCssText).toHaveBeenCalled();
    expect(element.type).toBe("style");
    expect(props.id).toBe("sandpack");
    expect(props.dangerouslySetInnerHTML?.__html).toBe("");
  });
});
