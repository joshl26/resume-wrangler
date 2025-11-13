/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * next/link must be mocked before importing the component so the module loader
 * uses our mock when ApplicationsCard imports Link.
 */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

// Import the component under test after the mock
import ApplicationsCard from "../applications-card";

describe("ApplicationsCard", () => {
  const applications: any[] = [
    { id: "a1", job_position: "Frontend Engineer", is_complete: "false" },
    { id: "a2", job_position: "Backend Engineer", is_complete: "pending" },
    { id: "a3", job_position: "Data Scientist", is_complete: "true" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all applications by default and highlights the 'All' filter", () => {
    render(<ApplicationsCard applications={applications} />);

    // All job positions should be present
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();

    // The "All" button is selected by default — check the class for the selected style
    // The inner div with text "All" contains the classes; get it and assert class presence
    const allDiv = screen.getByText("All");
    expect(allDiv).toBeInTheDocument();
    expect(allDiv).toHaveClass("bg-purple-heart-400");
  });

  it("filters to 'Open' applications (is_complete === 'false') when Open is clicked", async () => {
    const user = userEvent.setup();
    render(<ApplicationsCard applications={applications} />);

    await user.click(screen.getByText("Open"));

    // Only the open application should be present
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Backend Engineer")).not.toBeInTheDocument();
    expect(screen.queryByText("Data Scientist")).not.toBeInTheDocument();

    // The open button should now have its selected class
    expect(screen.getByText("Open")).toHaveClass("bg-rose-400");
  });

  it("filters to 'Pending' and 'Closed' correctly", async () => {
    const user = userEvent.setup();
    render(<ApplicationsCard applications={applications} />);

    // Pending
    await user.click(screen.getByText("Pending"));
    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Frontend Engineer")).not.toBeInTheDocument();
    expect(screen.queryByText("Data Scientist")).not.toBeInTheDocument();
    expect(screen.getByText("Pending")).toHaveClass(
      "bg-international-orange-400",
    );

    // Closed
    await user.click(screen.getByText("Closed"));
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
    expect(screen.queryByText("Frontend Engineer")).not.toBeInTheDocument();
    expect(screen.queryByText("Backend Engineer")).not.toBeInTheDocument();
    expect(screen.getByText("Closed")).toHaveClass("bg-amber-500");
  });

  it("returns to showing all applications when All is clicked again", async () => {
    const user = userEvent.setup();
    render(<ApplicationsCard applications={applications} />);

    // Click Open first to change state
    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Backend Engineer")).not.toBeInTheDocument();

    // Click All to reset
    await user.click(screen.getByText("All"));
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
    expect(screen.getByText("All")).toHaveClass("bg-purple-heart-400");
  });
});
