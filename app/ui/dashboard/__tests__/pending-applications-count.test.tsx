/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import PendingApplicationsCount from "../pending-applications-count";

describe("PendingApplicationsCount", () => {
  it("renders the count when it is a valid number", async () => {
    const element = await (PendingApplicationsCount as any)({
      pendingApplicationsCount: 5,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Pending Applications")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("5")).toHaveClass("font-bold", "text-[3rem]");
  });

  it("renders '0' when count is null", async () => {
    const element = await (PendingApplicationsCount as any)({
      pendingApplicationsCount: null,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Pending Applications")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders '0' when count is 0", async () => {
    const element = await (PendingApplicationsCount as any)({
      pendingApplicationsCount: 0,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Pending Applications")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the count when it is a large number", async () => {
    const element = await (PendingApplicationsCount as any)({
      pendingApplicationsCount: 1234,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Pending Applications")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("applies the correct CSS classes", async () => {
    const element = await (PendingApplicationsCount as any)({
      pendingApplicationsCount: 3,
    });
    const { container } = render(element as React.ReactElement);

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass(
      "tour-pending-applications",
      "tight-shadow",
      "bg-gradient-purple",
      "stats-card-container",
      "w-full",
      "rounded-lg",
    );

    const title = screen.getByText("Pending Applications");
    expect(title).toHaveClass("text-xl", "pt-2", "pl-2", "font-bold");

    const count = screen.getByText("3");
    expect(count).toHaveClass("font-bold", "text-[3rem]", "m-auto");
  });
});
