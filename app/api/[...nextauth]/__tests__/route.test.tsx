/**
 * @jest-environment node
 *
 * app/api/[...nextauth]/__tests__/route.test.tsx
 *
 * Tests for NextAuth API route handler
 */

type RouteModule = {
  GET?: any;
  POST?: any;
  PUT?: any;
  DELETE?: any;
  PATCH?: any;
  runtime?: string;
};

function loadRouteWithMocks() {
  // Reset modules so mocks are applied cleanly
  jest.resetModules();

  // Create per-test mocks
  const mockHandler = jest.fn((..._args: any[]) => {
    /* no-op handler returned by NextAuth */
  });
  const mockNextAuth = jest.fn(() => mockHandler);
  const fakeAuthOptions = {
    providers: [],
    callbacks: {},
    pages: {},
  };

  // Install mocks before requiring the route
  jest.doMock("next-auth", () => {
    return {
      __esModule: true,
      default: mockNextAuth,
    };
  });

  jest.doMock("@/auth", () => {
    return {
      authOptions: fakeAuthOptions,
    };
  });

  // Require the route AFTER mocks are in place.
  // Relative require from this __tests__ directory to ../route
  const routeModule: RouteModule = require("../route");

  return {
    routeModule,
    mocks: {
      mockNextAuth,
      mockHandler,
      fakeAuthOptions,
    },
  };
}

// Mute noisy console.error output while running these tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("NextAuth API Route Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call NextAuth with authOptions", () => {
    const { mocks } = loadRouteWithMocks();

    // NextAuth should have been called during module initialization
    expect(mocks.mockNextAuth).toHaveBeenCalledWith(mocks.fakeAuthOptions);
    expect(mocks.mockNextAuth).toHaveBeenCalledTimes(1);
  });

  it("should export all HTTP methods pointing to the same handler", () => {
    const { routeModule, mocks } = loadRouteWithMocks();
    const { GET, POST, PUT, DELETE, PATCH } = routeModule;

    // NextAuth returns `mockHandler`, so the exported handler should equal that
    const createdHandler = mocks.mockNextAuth.mock.results[0]?.value;
    expect(createdHandler).toBeDefined();

    expect(GET).toBe(createdHandler);
    expect(POST).toBe(createdHandler);
    expect(PUT).toBe(createdHandler);
    expect(DELETE).toBe(createdHandler);
    expect(PATCH).toBe(createdHandler);
  });

  it("should have nodejs runtime export", () => {
    const { routeModule } = loadRouteWithMocks();
    const { runtime } = routeModule;
    expect(runtime).toBe("nodejs");
  });

  it("should create a single handler instance", () => {
    const { mocks } = loadRouteWithMocks();
    // NextAuth should be called exactly once during module initialization
    expect(mocks.mockNextAuth).toHaveBeenCalledTimes(1);
  });
});
