/**
 * app/hooks/__tests__/WindowSize.test.tsx
 *
 * Tests for WindowSize component.
 *
 * IMPORTANT: adjust the mock paths below if your file structure is different.
 */

import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock DeviceSize (default export) — path is relative to this test file.
// WindowSize imports DeviceSize as "../ui/dashboard/device-size" (relative to WindowSize file).
// From this test file (app/hooks/__tests__), that resolves to "../../ui/dashboard/device-size".
jest.mock("../../ui/dashboard/device-size", () => ({
  __esModule: true,
  default: function MockDeviceSize() {
    return <div data-testid="device-size">Device Size Warning</div>;
  },
}));

// Mock the hook useWindowSize which WindowSize imports as "./useWindowSize".
// From this test file the path is "../useWindowSize".
jest.mock("../useWindowSize", () => ({
  useWindowSize: jest.fn(),
}));

// Now import the component under test (after mocks)
import WindowSize from "../WindowSize";
const { useWindowSize } = require("../useWindowSize") as {
  useWindowSize: jest.Mock;
};

describe("WindowSize", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("renders children when size is above thresholds", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 768 });

    render(
      <WindowSize>
        <div data-testid="child-content">Child Content</div>
      </WindowSize>,
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.queryByTestId("device-size")).not.toBeInTheDocument();
  });

  it("renders DeviceSize when width is below threshold", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 767, height: 768 }); // width < 768

    render(
      <WindowSize>
        <div data-testid="child-content">Child Content</div>
      </WindowSize>,
    );

    expect(screen.getByTestId("device-size")).toBeInTheDocument();
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
  });

  it("renders DeviceSize when height is below threshold", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 299 }); // height < 300

    render(
      <WindowSize>
        <div data-testid="child-content">Child Content</div>
      </WindowSize>,
    );

    expect(screen.getByTestId("device-size")).toBeInTheDocument();
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
  });

  it("handles initial state (0,0) without rendering anything", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 0, height: 0 });

    const { container } = render(
      <WindowSize>
        <div data-testid="child-content">Child Content</div>
      </WindowSize>,
    );

    // Component currently returns nothing for (0,0) — the container should be empty
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("device-size")).not.toBeInTheDocument();
  });

  it("updates when window size changes (via rerender with different hook return)", async () => {
    // initial: large
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 768 });

    const { rerender } = render(
      <WindowSize>
        <div data-testid="child-content">Child Content</div>
      </WindowSize>,
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();

    // change hook return to small size and rerender
    (useWindowSize as jest.Mock).mockReturnValue({ width: 300, height: 200 });

    await act(async () => {
      rerender(
        <WindowSize>
          <div data-testid="child-content">Child Content</div>
        </WindowSize>,
      );
    });

    expect(screen.getByTestId("device-size")).toBeInTheDocument();
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
  });
});
