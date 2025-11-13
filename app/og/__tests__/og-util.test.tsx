/**
 * @jest-environment node
 *
 * app/og/__tests__/og-util.test.ts
 *
 * Tests createOgImageResponse (pure function) without touching import.meta or Edge runtime.
 */

import { createOgImageResponse } from "../og-util";

// Capture ImageResponse constructor args
const mockImageResponseCtor = jest.fn();

// Mock next/og ImageResponse constructor so we don't need Edge runtime
jest.mock("next/og", () => ({
  ImageResponse: jest.fn(function (element: any, options: any) {
    // capture args for assertions
    mockImageResponseCtor(element, options);
    // return a simple object so createOgImageResponse returns something testable
    return { mocked: true, options };
  }),
}));

describe("createOgImageResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates ImageResponse with provided title and font", () => {
    const fontBuf = new ArrayBuffer(8);
    const title = "Hello Test";
    const deploymentUrl = "https://example.com";

    const res = createOgImageResponse(title, fontBuf, deploymentUrl);

    // The util returns whatever the mocked ImageResponse returned
    expect(res).toEqual({ mocked: true, options: expect.any(Object) });

    // ImageResponse should have been called once
    expect(mockImageResponseCtor).toHaveBeenCalledTimes(1);
    const [element, options] = mockImageResponseCtor.mock.calls[0];

    // element is a React element (JS object). Basic assertions:
    expect(element).toBeDefined();
    // the inner text should be the title
    // element.props.children is second-level div; check its children
    const inner = element.props.children;
    expect(inner.props.children).toBe(title);

    // check options
    expect(options.width).toBe(1920);
    expect(options.height).toBe(1080);
    expect(Array.isArray(options.fonts)).toBe(true);
    expect(options.fonts[0]).toEqual({
      name: "Raleway",
      data: fontBuf,
      style: "normal",
    });

    // background should contain deploymentUrl
    const outerStyle = element.props.style;
    expect(outerStyle.backgroundImage).toContain(`${deploymentUrl}/og-bg.png`);
  });

  it("handles null title and undefined deploymentUrl", () => {
    const fontBuf = new ArrayBuffer(16);
    const res = createOgImageResponse(null, fontBuf, undefined);

    expect(mockImageResponseCtor).toHaveBeenCalledTimes(1);
    const [element, options] = mockImageResponseCtor.mock.calls[0];

    // title is null in element
    const inner = element.props.children;
    expect(inner.props.children).toBe(null);

    // fallback for deploymentUrl should result in '/og-bg.png' (empty prefix)
    expect(element.props.style.backgroundImage).toContain("/og-bg.png");
    expect(options.fonts[0].data).toBe(fontBuf);
  });
});
