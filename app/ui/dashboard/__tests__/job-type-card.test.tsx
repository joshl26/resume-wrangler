/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock the DonutChart child so tests focus on JobTypeCard composition and prop-passing.
 * This mock must be registered before importing JobTypeCard.
 */
jest.mock("../../charts/donut-chart", () => ({
  __esModule: true,
  default: ({
    openApplicationsCount,
    closedApplicationsCount,
    pendingApplicationsCount,
  }: any) => (
    <div data-testid="donut-chart">{`${openApplicationsCount}|${closedApplicationsCount}|${pendingApplicationsCount}`}</div>
  ),
}));

import JobTypeCard from "../job-type-card";

describe("JobTypeCard", () => {
  it("renders the title and the DonutChart child", () => {
    render(
      <JobTypeCard
        openApplicationsCount={2}
        closedApplicationsCount={1}
        pendingApplicationsCount={0}
      />,
    );

    // Title should be rendered
    expect(screen.getByText("Status")).toBeInTheDocument();

    // DonutChart mock should render and display the passed props
    const donut = screen.getByTestId("donut-chart");
    expect(donut).toBeInTheDocument();
    expect(donut).toHaveTextContent("2|1|0");
  });

  it("applies expected container classes", () => {
    const { container } = render(
      <JobTypeCard
        openApplicationsCount={5}
        closedApplicationsCount={3}
        pendingApplicationsCount={2}
      />,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "tour-status",
      "w-full",
      "h-[250px]",
      "bg-white",
      "rounded-lg",
      "tight-shadow",
    );

    // Check heading styling
    const heading = screen.getByText("Status");
    expect(heading).toHaveClass("font-bold", "p-2");
  });
});
