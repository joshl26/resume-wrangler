/**
 * @jest-environment jsdom
 *
 * app/ui/charts/__test__/barchart.test.tsx
 *
 * Tests for the BarChart component
 */

import React from "react";
import { render } from "@testing-library/react";

/**
 * Prepare mocks BEFORE importing the component under test.
 */

// Keep a single destroy mock instance referenced by the jest.mock closure
const mockChartDestroy = jest.fn();
const mockChartCalls: Array<{ ctx: any; config: any }> = [];

// Mock chart.js/auto as a constructor function that records its args
jest.mock("chart.js/auto", () => {
  return jest.fn().mockImplementation((ctx: any, config: any) => {
    mockChartCalls.push({ ctx, config });
    return { destroy: mockChartDestroy };
  });
});

// Now import the component (after creating the mock)
import BarChart from "../barchart";

// Grab the mocked constructor function for assertions
const ChartMock = require("chart.js/auto");

describe("BarChart", () => {
  beforeEach(() => {
    // reset tracked calls and mock state
    mockChartCalls.length = 0;
    mockChartDestroy.mockReset();
    jest.clearAllMocks();

    // Ensure canvas.getContext returns a truthy "2d" context so Chart gets instantiated
    // The returned object can be a minimal stub
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      // minimal methods/properties Chart.js might read - can be extended if needed
      canvas: {},
    });
  });

  it("renders a canvas with the expected id", () => {
    const { container } = render(<BarChart />);
    const canvas = container.querySelector("canvas#myChart3");
    expect(canvas).toBeInTheDocument();
  });

  it("creates a Chart with the expected configuration", () => {
    render(<BarChart />);

    // Chart constructor should have been called once
    expect(ChartMock).toHaveBeenCalledTimes(1);

    // We recorded the ctx and config in mockChartCalls
    expect(mockChartCalls.length).toBe(1);
    const { config } = mockChartCalls[0]!;
    expect(config.type).toBe("bar");
    expect(config.data.labels).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);

    expect(config.data.datasets).toHaveLength(3);
    expect(config.data.datasets[0].label).toBe("Open");
    expect(config.data.datasets[0].data).toEqual([4, 10, 4, 7, 6, 3, 1]);
    expect(config.data.datasets[1].label).toBe("Pending");
    expect(config.data.datasets[2].label).toBe("Closed");

    // Styling checks
    expect(config.data.datasets[0].borderColor).toBe("rgb(75, 192, 192)");
    expect(config.data.datasets[0].backgroundColor).toBe(
      "rgba(75, 192, 192, 0.5)",
    );
  });

  it("calls destroy on the chart instance when unmounted", () => {
    const { unmount } = render(<BarChart />);

    // Chart was created
    expect(ChartMock).toHaveBeenCalledTimes(1);

    // Unmount triggers the cleanup effect which calls destroy on the instance returned by the mock
    unmount();

    expect(mockChartDestroy).toHaveBeenCalledTimes(1);
  });

  it("does not instantiate Chart when canvas context is not available", () => {
    // Make getContext return null for this test
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);

    render(<BarChart />);

    // Chart constructor should not have been invoked
    expect(ChartMock).not.toHaveBeenCalled();
    expect(mockChartCalls.length).toBe(0);
  });
});
