/**
 * app/lib/__tests__/useWindowSize.test.tsx
 *
 * Tests for useWindowSize hook
 */

import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useWindowSize } from "@/app/hooks/useWindowSize"; // adjust import path if needed

function TestComponent() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <span data-testid="width">{width}</span>
      <span data-testid="height">{height}</span>
    </div>
  );
}

describe("useWindowSize", () => {
  const originalInnerWidth = global.innerWidth;
  const originalInnerHeight = global.innerHeight;

  beforeEach(() => {
    // ensure a predictable baseline
    global.innerWidth = 1024;
    global.innerHeight = 768;
  });

  afterEach(() => {
    // restore
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
    cleanup();
    jest.restoreAllMocks();
  });

  it("updates size on mount to current window dimensions", async () => {
    // set the window size before mounting so the effect reads these values
    global.innerWidth = 1280;
    global.innerHeight = 720;

    render(<TestComponent />);

    // effect runs after mount; use act to wait for it (render already flushed, so a simple assertion with wait is sufficient)
    await act(async () => {
      // Dispatch resize to ensure the effect's handleResize runs (the hook calls handleResize on mount already,
      // but a resize event ensures consistent behavior across environments)
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("width")).toHaveTextContent("1280");
    expect(screen.getByTestId("height")).toHaveTextContent("720");
  });

  it("responds to window resize events", async () => {
    // start with default size
    global.innerWidth = 800;
    global.innerHeight = 600;

    render(<TestComponent />);

    // ensure initial mount handled
    await act(async () => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("width")).toHaveTextContent("800");
    expect(screen.getByTestId("height")).toHaveTextContent("600");

    // simulate resize
    await act(async () => {
      global.innerWidth = 640;
      global.innerHeight = 480;
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("width")).toHaveTextContent("640");
    expect(screen.getByTestId("height")).toHaveTextContent("480");
  });

  it("attaches and removes the resize listener on mount/unmount", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<TestComponent />);

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
