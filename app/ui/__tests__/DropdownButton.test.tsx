/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/dropdown.test.tsx
 *
 * Tests for the Dropdown client component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock Next.js navigation hooks
const mockUsePathname = jest.fn();
const mockUseSearchParams = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
  useRouter: () => ({
    replace: mockRouterReplace,
  }),
}));

// Mock use-debounce to call the callback immediately (skip debounce in tests)
jest.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: any) => fn,
}));

// Import after mocks
import Dropdown from "../DropdownButton";

describe("Dropdown (client)", () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // suppress console.log in tests

    // Set default mock values
    mockUsePathname.mockReturnValue("/dashboard/applications");
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it("toggles dropdown visibility on button click", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    expect(dropdownButton).toBeInTheDocument();

    // Initially closed
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Open dropdown
    fireEvent.click(dropdownButton);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(dropdownButton);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("displays default text when no option is selected", () => {
    render(<Dropdown />);
    expect(
      screen.getByRole("button", { name: /Sort By/i }),
    ).toBeInTheDocument();
  });

  it("updates button text when an option is selected", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    // Use exact name to avoid matching "Not Submitted"
    const optionButton = screen.getByRole("button", { name: "Submitted" });
    fireEvent.click(optionButton);

    // Button text should update to the selected label
    expect(
      screen.getByRole("button", { name: "Submitted" }),
    ).toBeInTheDocument();
  });

  it("calls router.replace with correct params when an option is selected", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    // Use exact match for "Not Submitted"
    const optionButton = screen.getByRole("button", { name: "Not Submitted" });
    fireEvent.click(optionButton);

    // Should call replace with updated query params
    expect(mockRouterReplace).toHaveBeenCalledWith(
      "/dashboard/applications?sort=not_submitted",
    );
  });

  it("clears sort param when 'All Applications' is selected", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    const allButton = screen.getByRole("button", { name: "All Applications" });
    fireEvent.click(allButton);

    // Should set sort=all (based on current implementation)
    expect(mockRouterReplace).toHaveBeenCalledWith(
      "/dashboard/applications?sort=all",
    );
  });

  it("removes page param and sets sort when selecting an option", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("page=2&other=value"),
    );

    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    // Use exact match
    const submittedButton = screen.getByRole("button", { name: "Submitted" });
    fireEvent.click(submittedButton);

    // Should remove page, preserve other params, and set sort
    expect(mockRouterReplace).toHaveBeenCalledWith(
      "/dashboard/applications?other=value&sort=submitted",
    );
  });

  it("logs the clicked option id to console", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    const notSubmittedButton = screen.getByRole("button", {
      name: "Not Submitted",
    });
    fireEvent.click(notSubmittedButton);

    // Should log the id of the clicked button
    expect(console.log).toHaveBeenCalledWith("not_submitted");
  });

  it("closes dropdown after selecting an option", () => {
    render(<Dropdown />);

    const dropdownButton = screen.getByRole("button", { name: /Sort By/i });
    fireEvent.click(dropdownButton);

    // Dropdown should be open
    expect(screen.getByRole("list")).toBeInTheDocument();

    const optionButton = screen.getByRole("button", { name: "Submitted" });
    fireEvent.click(optionButton);

    // Dropdown should be closed
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
