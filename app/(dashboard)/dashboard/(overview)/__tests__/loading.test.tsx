/**
 * @jest-environment jsdom
 *
 * app/dashboard/(overview)/__tests__/loading.test.tsx
 *
 * Tests for the loading component (app/dashboard/(overview)/loading.tsx)
 *
 * - Mocks the default export from "@/app/ui/skeletons" as a React component
 * - Verifies the Loading component renders the mocked skeleton
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock the module to export a default React component
jest.mock("@/app/ui/skeletons", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-dashboard-skeleton">Loading...</div>,
}));

// Import after mocks
import Loading from "../loading";

describe("Dashboard Loading Component", () => {
  it("renders DashboardSkeleton", () => {
    render(<Loading />);

    // Should render the mocked skeleton
    expect(screen.getByTestId("mock-dashboard-skeleton")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
