/**
 * @jest-environment jsdom
 *
 * app/ui/charts/__test__/donut-chart.test.tsx
 *
 * Tests for the DonutChart component
 */

import React from "react";
import { render } from "@testing-library/react";

/**
 * Prepare mocks BEFORE importing the component under test.
 */

// Keep a single destroy mock instance referenced by the jest.mock closure
let mockChartDestroy = jest.fn();
const mockChartCalls: Array<{ ctx: any; config: any }> = [];

// Mock chart.js/auto as a constructor function that records its args
jest.mock("chart.js/auto", () => {
  return jest.fn().mockImplementation((ctx: any, config: any) => {
    mockChartCalls.push({ ctx, config });
    return { destroy: mockChartDestroy };
  });
});

// Import component after setting up the mock
import DonutChart from "../donut-chart";

// Grab the mocked constructor function for assertions
const ChartMock = require("chart.js/auto");

describe("DonutChart", () => {
  beforeEach(() => {
    // Reset tracked calls and mock state
    mockChartCalls.length = 0;
    mockChartDestroy = jest.fn();
    jest.clearAllMocks();

    // Ensure canvas.getContext returns a truthy "2d" context so Chart gets instantiated
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      // minimal methods/properties Chart.js might read - extend if needed
      canvas: {},
    });
  });

  it("renders a canvas with the expected id", () => {
    const { container } = render(
      <DonutChart
        openApplicationsCount={5}
        pendingApplicationsCount={3}
        closedApplicationsCount={2}
      />,
    );
    const canvas = container.querySelector("canvas#myChart4");
    expect(canvas).toBeInTheDocument();
  });

  it("creates a Doughnut Chart with the expected configuration", () => {
    render(
      <DonutChart
        openApplicationsCount={5}
        pendingApplicationsCount={3}
        closedApplicationsCount={2}
      />,
    );

    // Chart constructor should have been called once
    expect(ChartMock).toHaveBeenCalledTimes(1);

    // We recorded the ctx and config in mockChartCalls
    expect(mockChartCalls.length).toBe(1);
    const { config } = mockChartCalls[0]!;

    expect(config.type).toBe("doughnut");

    // Check labels
    expect(config.data.labels).toEqual(["Open", "Pending", "Closed"]);

    // Check datasets
    expect(config.data.datasets).toHaveLength(1);
    const dataset = config.data.datasets[0];
    expect(dataset.data).toEqual([5, 3, 2]); // Matches props
    expect(dataset.borderColor).toEqual([
      "rgb(75, 192, 192)",
      "rgb(255, 205, 86)",
      "rgb(255, 99, 132)",
    ]);
    expect(dataset.backgroundColor).toEqual([
      "rgb(75, 192, 192)",
      "rgb(255, 205, 86)",
      "rgb(255, 99, 132)",
    ]);
    expect(dataset.borderWidth).toBe(2);

    // Check options
    expect(config.options.responsive).toBe(true);
    expect(config.options.maintainAspectRatio).toBe(false);
  });

  it("updates chart when props change (destroys previous instance and recreates)", () => {
    const { rerender } = render(
      <DonutChart
        openApplicationsCount={5}
        pendingApplicationsCount={3}
        closedApplicationsCount={2}
      />,
    );

    // Initial creation
    expect(ChartMock).toHaveBeenCalledTimes(1);
    expect(mockChartCalls.length).toBe(1);
    expect(mockChartCalls[0]!.config.data.datasets[0].data).toEqual([5, 3, 2]);

    // Before rerender the cleanup hasn't run yet, so destroy should not have been called
    expect(mockChartDestroy).toHaveBeenCalledTimes(0);

    // Rerender with new props -> React will run the cleanup (destroy) then effect again to create new chart
    rerender(
      <DonutChart
        openApplicationsCount={10}
        pendingApplicationsCount={5}
        closedApplicationsCount={3}
      />,
    );

    // After rerender: previous instance's destroy should have been called once
    expect(mockChartDestroy).toHaveBeenCalledTimes(1);

    // A new Chart should have been created
    expect(ChartMock).toHaveBeenCalledTimes(2);
    expect(mockChartCalls.length).toBe(2);
    expect(mockChartCalls[1]!.config.data.datasets[0].data).toEqual([10, 5, 3]);
  });

  it("calls destroy on the chart instance when unmounted", () => {
    const { unmount } = render(
      <DonutChart
        openApplicationsCount={5}
        pendingApplicationsCount={3}
        closedApplicationsCount={2}
      />,
    );

    // Chart was created
    expect(ChartMock).toHaveBeenCalledTimes(1);

    // Unmount triggers the cleanup effect which calls destroy
    unmount();

    expect(mockChartDestroy).toHaveBeenCalledTimes(1);
  });

  it("does not instantiate Chart when canvas context is not available", () => {
    // Make getContext return null for this test
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);

    render(
      <DonutChart
        openApplicationsCount={5}
        pendingApplicationsCount={3}
        closedApplicationsCount={2}
      />,
    );

    // Chart constructor should not have been invoked
    expect(ChartMock).not.toHaveBeenCalled();
    expect(mockChartCalls.length).toBe(0);
  });
});
