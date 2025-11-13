/**
 * @jest-environment jsdom
 *
 * app/store/__tests__/StoreProvider.test.tsx
 *
 * Tests for the StoreProvider client component
 */

import React from "react";
import { render, screen, within } from "@testing-library/react";

// Mock jotai to control Provider and track createStore calls
const mockCreateStore = jest.fn();
const MockJotaiProvider = ({
  store,
  children,
}: {
  store: any;
  children: React.ReactNode;
}) => (
  <div data-testid="jotai-provider">
    <span>Jotai Provider Mock</span>
    <span data-testid="provider-store-id">{store?.id || "unknown"}</span>
    {children}
  </div>
);

jest.mock("jotai", () => ({
  createStore: mockCreateStore,
  Provider: MockJotaiProvider,
}));

// Import after mocks
import StoreProvider from "../StoreProvider";

describe("StoreProvider (client)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Provide a createStore implementation that yields distinct stores per call
    let storeIdCounter = 0;
    mockCreateStore.mockImplementation(() => ({
      id: `store-${++storeIdCounter}`,
    }));
  });

  it("renders children inside Jotai Provider with a new store", () => {
    const testChildText = "Test Child Content";
    const { getByTestId, getByText } = render(
      <StoreProvider>
        <div>{testChildText}</div>
      </StoreProvider>,
    );

    // Children should be rendered
    expect(getByText(testChildText)).toBeInTheDocument();

    // Mocked Provider should be rendered
    const provider = getByTestId("jotai-provider");
    expect(provider).toBeInTheDocument();
    expect(provider).toHaveTextContent("Jotai Provider Mock");

    // Verify createStore was called once to initialize the store
    expect(mockCreateStore).toHaveBeenCalledTimes(1);

    // Verify the store passed to Provider is the one created
    const storeIdElement = getByTestId("provider-store-id");
    expect(storeIdElement).toHaveTextContent("store-1");
  });

  it("creates only one store per component instance", () => {
    const { rerender } = render(
      <StoreProvider>
        <div>Child</div>
      </StoreProvider>,
    );

    // createStore should be called exactly once (by useState initializer)
    expect(mockCreateStore).toHaveBeenCalledTimes(1);

    // Rerender the same component instance (should not call createStore again)
    rerender(
      <StoreProvider>
        <div>Child</div>
      </StoreProvider>,
    );
    expect(mockCreateStore).toHaveBeenCalledTimes(1);
  });

  it("creates a new store for each mounted instance", () => {
    // Render first instance and use scoped queries via `within`
    const first = render(
      <StoreProvider>
        <div>Instance 1</div>
      </StoreProvider>,
    );
    expect(mockCreateStore).toHaveBeenCalledTimes(1);
    expect(
      within(first.container).getByTestId("provider-store-id"),
    ).toHaveTextContent("store-1");

    // Render second instance and scope queries to its container
    const second = render(
      <StoreProvider>
        <div>Instance 2</div>
      </StoreProvider>,
    );
    expect(mockCreateStore).toHaveBeenCalledTimes(2);
    expect(
      within(second.container).getByTestId("provider-store-id"),
    ).toHaveTextContent("store-2");

    // Unmount first, verify second still present
    first.unmount();
    expect(screen.queryByText("Instance 1")).not.toBeInTheDocument();
    expect(
      within(second.container).getByText("Instance 2"),
    ).toBeInTheDocument();

    second.unmount();
  });
});
