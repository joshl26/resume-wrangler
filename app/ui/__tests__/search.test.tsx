/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/search.test.tsx
 *
 * Tests for the Search component
 *
 * - Mocks next/navigation hooks (usePathname, useSearchParams, useRouter)
 * - Mocks useDebouncedCallback to call the callback synchronously so tests run deterministically
 * - Verifies placeholder and default value rendering
 * - Verifies replace() is called with the expected URL when typing and when clearing the input
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock next/navigation so we can control pathname/search params and spy on replace()
const mockReplace = jest.fn();
const mockedUsePathname = jest.fn();
const mockedUseSearchParams = jest.fn();
const mockedUseRouter = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockedUsePathname(),
  useSearchParams: () => mockedUseSearchParams(),
  useRouter: () => mockedUseRouter(),
}));

// Mock useDebouncedCallback so it returns the callback directly (no debounce) for tests
jest.mock("use-debounce", () => ({
  useDebouncedCallback: (cb: (...args: any[]) => any) => {
    // Return a function that just calls the callback immediately
    return ((...args: any[]) => cb(...args)) as unknown;
  },
}));

// Import after mocks
import Search from "../search";

describe("Search component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mocks
    mockedUsePathname.mockReturnValue("/items");
    // default search params e.g. queries already present
    mockedUseSearchParams.mockReturnValue(
      new URLSearchParams("query=old&foo=bar&page=2"),
    );
    mockedUseRouter.mockReturnValue({ replace: mockReplace });
  });

  it("renders the input with placeholder and defaultValue from searchParams", () => {
    render(<Search placeholder="Find..." />);

    const input = screen.getByPlaceholderText("Find...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    // defaultValue should come from searchParams.get("query")
    expect(input.defaultValue).toBe("old");
  });

  it("calls replace with updated query and page=1 when typing a term", () => {
    render(<Search placeholder="Search" />);

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;

    // Type a new search term — because we mocked useDebouncedCallback to call immediately,
    // replace will be invoked synchronously.
    fireEvent.change(input, { target: { value: "abc" } });

    expect(mockReplace).toHaveBeenCalledTimes(1);
    const calledArg = mockReplace.mock.calls[0][0] as string;

    // Must include pathname
    expect(calledArg.startsWith("/items")).toBe(true);
    // Query param should be set to the new term
    expect(calledArg).toEqual(expect.stringContaining("query=abc"));
    // page should be reset to 1
    expect(calledArg).toEqual(expect.stringContaining("page=1"));
    // Other params (foo=bar) should be preserved
    expect(calledArg).toEqual(expect.stringContaining("foo=bar"));
  });

  it("removes the query param when input is cleared", () => {
    render(<Search placeholder="Search" />);

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;

    // Clear the input
    fireEvent.change(input, { target: { value: "" } });

    expect(mockReplace).toHaveBeenCalledTimes(1);
    const calledArg = mockReplace.mock.calls[0][0] as string;

    // Should NOT contain query=
    expect(calledArg).not.toEqual(expect.stringContaining("query="));
    // page should still be set to 1
    expect(calledArg).toEqual(expect.stringContaining("page=1"));
    // other params preserved
    expect(calledArg).toEqual(expect.stringContaining("foo=bar"));
  });
});
