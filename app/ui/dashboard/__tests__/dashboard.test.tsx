/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock the child components that Dashboard imports.
 * The module specifiers below must match the exact imports used by Dashboard.
 */
jest.mock("../trend-card", () => ({
  __esModule: true,
  default: () => <div data-testid="trend-card" />,
}));

jest.mock("../job-type-card", () => ({
  __esModule: true,
  default: ({
    openApplicationsCount,
    closedApplicationsCount,
    pendingApplicationsCount,
  }: any) => (
    <div data-testid="job-type-card">
      {`${openApplicationsCount}|${closedApplicationsCount}|${pendingApplicationsCount}`}
    </div>
  ),
}));

jest.mock("../responses-card", () => ({
  __esModule: true,
  default: () => <div data-testid="responses-card" />,
}));

jest.mock("../applications-card", () => ({
  __esModule: true,
  default: ({ applications }: any) => (
    <div data-testid="applications-card">{applications?.length ?? 0}</div>
  ),
}));

jest.mock("../demographics-card", () => ({
  __esModule: true,
  default: () => <div data-testid="demographics-card" />,
}));

jest.mock("../open-applications-count", () => ({
  __esModule: true,
  default: ({ openApplicationsCount }: any) => (
    <div data-testid="open-applications-count">
      {String(openApplicationsCount)}
    </div>
  ),
}));

jest.mock("../closed-applications-count", () => ({
  __esModule: true,
  default: ({ closedApplicationsCount }: any) => (
    <div data-testid="closed-applications-count">
      {String(closedApplicationsCount)}
    </div>
  ),
}));

jest.mock("../pending-applications-count", () => ({
  __esModule: true,
  default: ({ pendingApplicationsCount }: any) => (
    <div data-testid="pending-applications-count">
      {String(pendingApplicationsCount)}
    </div>
  ),
}));

jest.mock("../weekly-goal", () => ({
  __esModule: true,
  default: ({ weeklyGoalCount }: any) => (
    <div data-testid="weekly-goal">{String(weeklyGoalCount)}</div>
  ),
}));

// Import Dashboard after setting up mocks
import Dashboard from "../dashboard";

describe("Dashboard", () => {
  const sampleApplications = [
    { id: "a1", job_position: "Frontend" },
    { id: "a2", job_position: "Backend" },
    { id: "a3", job_position: "Data" },
  ];

  const sampleUser = {
    id: "u1",
    first_name: "Test",
    last_name: "User",
    email: "test@example.com",
  };

  it("renders child cards and passes props to children", () => {
    render(
      <Dashboard
        applications={sampleApplications as any}
        user={sampleUser as any}
        openApplicationsCount={2}
        closedApplicationsCount={1}
        pendingApplicationsCount={0}
      />,
    );

    // Top row counters
    expect(screen.getByTestId("open-applications-count")).toHaveTextContent(
      "2",
    );
    expect(screen.getByTestId("closed-applications-count")).toHaveTextContent(
      "1",
    );
    expect(screen.getByTestId("pending-applications-count")).toHaveTextContent(
      "0",
    );
    expect(screen.getByTestId("weekly-goal")).toHaveTextContent("3"); // Dashboard passes 3 statically

    // Middle row cards
    expect(screen.getByTestId("trend-card")).toBeInTheDocument();
    // JobTypeCard should receive the three counts joined by '|'
    expect(screen.getByTestId("job-type-card")).toHaveTextContent("2|1|0");

    // Bottom row
    // ApplicationsCard should receive `applications` prop; our mock renders its length
    expect(screen.getByTestId("applications-card")).toHaveTextContent(
      String(sampleApplications.length),
    );
    expect(screen.getByTestId("demographics-card")).toBeInTheDocument();
  });

  it("renders correctly with empty applications array", () => {
    render(
      <Dashboard
        applications={[] as any}
        user={sampleUser as any}
        openApplicationsCount={0}
        closedApplicationsCount={0}
        pendingApplicationsCount={0}
      />,
    );

    expect(screen.getByTestId("applications-card")).toHaveTextContent("0");
    expect(screen.getByTestId("job-type-card")).toHaveTextContent("0|0|0");
  });
});
