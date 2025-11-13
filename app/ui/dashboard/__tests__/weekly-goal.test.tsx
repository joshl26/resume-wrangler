/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyGoalCount from "../weekly-goal";

describe("WeeklyGoalCount", () => {
  it("renders the weekly goal when given a number", async () => {
    const element = await (WeeklyGoalCount as any)({ weeklyGoalCount: 3 });
    render(element as React.ReactElement);

    expect(screen.getByText("Weekly Goal")).toBeInTheDocument();
    expect(screen.getByText("3/15")).toBeInTheDocument();
    expect(screen.getByText("3/15")).toHaveClass("font-bold", "text-[3rem]");
  });

  it('renders "0" when weeklyGoalCount is null', async () => {
    const element = await (WeeklyGoalCount as any)({ weeklyGoalCount: null });
    render(element as React.ReactElement);

    expect(screen.getByText("Weekly Goal")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders 0/15 when weeklyGoalCount is 0", async () => {
    const element = await (WeeklyGoalCount as any)({ weeklyGoalCount: 0 });
    render(element as React.ReactElement);

    expect(screen.getByText("Weekly Goal")).toBeInTheDocument();
    expect(screen.getByText("0/15")).toBeInTheDocument();
  });

  it("applies correct container and heading classes", async () => {
    const element = await (WeeklyGoalCount as any)({ weeklyGoalCount: 5 });
    const { container } = render(element as React.ReactElement);

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass(
      "tour-goal",
      "tight-shadow",
      "flex",
      "flex-col",
      "bg-gradient-azure",
      "stats-card-container",
      "w-full",
      "rounded-lg",
    );

    const heading = screen.getByText("Weekly Goal");
    expect(heading).toHaveClass("text-xl", "pl-2", "pt-2", "font-bold");

    const value = screen.getByText("5/15");
    expect(value).toHaveClass("font-bold", "text-[3rem]", "m-auto");
  });
});
