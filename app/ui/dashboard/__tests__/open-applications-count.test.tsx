/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import OpenApplicationsCount from "../open-applications-count";

describe("OpenApplicationsCount", () => {
  it("renders the count when it is a valid number", async () => {
    const element = await (OpenApplicationsCount as any)({
      openApplicationsCount: 5,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Open Applications")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("5")).toHaveClass("font-bold", "text-[3rem]");
  });

  it("renders '0' when count is null", async () => {
    const element = await (OpenApplicationsCount as any)({
      openApplicationsCount: null,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Open Applications")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders '0' when count is 0", async () => {
    const element = await (OpenApplicationsCount as any)({
      openApplicationsCount: 0,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Open Applications")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the count when it is a large number", async () => {
    const element = await (OpenApplicationsCount as any)({
      openApplicationsCount: 1234,
    });
    render(element as React.ReactElement);

    expect(screen.getByText("Open Applications")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("applies the correct CSS classes and data-testid", async () => {
    const element = await (OpenApplicationsCount as any)({
      openApplicationsCount: 3,
    });
    const { container } = render(element as React.ReactElement);

    // Check the container has the correct data-testid
    const containerDiv = container.querySelector(
      '[data-testid="tour-open-applications"]',
    );
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass(
      "tour-open-applications",
      "tight-shadow",
      "bg-gradient-orange",
      "stats-card-container",
      "w-full",
      "rounded-lg",
    );

    const title = screen.getByText("Open Applications");
    expect(title).toHaveClass("text-xl", "pt-2", "pl-2", "font-bold");

    const count = screen.getByText("3");
    expect(count).toHaveClass("font-bold", "text-[3rem]", "m-auto");
  });
});
