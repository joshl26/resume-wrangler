/**
 * @jest-environment node
 *
 * app/api/[...nextauth]/__tests__/route.test.tsx
 *
 * Tests for NextAuth API route handler
 */

type NextAuthRouteModule = {
  GET?: any;
  POST?: any;
  PUT?: any;
  DELETE?: any;
  PATCH?: any;
  runtime?: string;
};

type NextAuthMocks = {
  mockNextAuth: jest.Mock<any, any>;
  mockHandler: jest.Mock<any, any>;
  fakeAuthOptions: { providers: any[]; callbacks: object; pages: object };
};

function loadNextAuthRouteWithMocks(): {
  routeModule: NextAuthRouteModule;
  mocks: NextAuthMocks;
} {
  jest.resetModules();

  const mockHandler = jest.fn((..._args: any[]) => {});
  const mockNextAuth = jest.fn(() => mockHandler);
  const fakeAuthOptions = { providers: [], callbacks: {}, pages: {} };

  jest.doMock("next-auth", () => ({ __esModule: true, default: mockNextAuth }));
  jest.doMock("@/auth", () => ({ authOptions: fakeAuthOptions }));

  // Require the route AFTER mocks are installed; relative to this __tests__ folder:
  const routeModule: NextAuthRouteModule = require("../route");

  return {
    routeModule,
    mocks: { mockNextAuth, mockHandler, fakeAuthOptions },
  };
}

// Mute noisy console.error
beforeAll(() => jest.spyOn(console, "error").mockImplementation(() => {}));
afterAll(() => (console.error as jest.Mock).mockRestore());

describe("NextAuth API Route Handler", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should call NextAuth with authOptions", () => {
    const { mocks } = loadNextAuthRouteWithMocks();
    expect(mocks.mockNextAuth).toHaveBeenCalledWith(mocks.fakeAuthOptions);
    expect(mocks.mockNextAuth).toHaveBeenCalledTimes(1);
  });

  it("should export all HTTP methods pointing to the same handler", () => {
    const { routeModule, mocks } = loadNextAuthRouteWithMocks();
    const { GET, POST, PUT, DELETE, PATCH } = routeModule;
    const createdHandler = mocks.mockNextAuth.mock.results[0]?.value;
    expect(createdHandler).toBeDefined();
    expect(GET).toBe(createdHandler);
    expect(POST).toBe(createdHandler);
    expect(PUT).toBe(createdHandler);
    expect(DELETE).toBe(createdHandler);
    expect(PATCH).toBe(createdHandler);
  });

  it("should have nodejs runtime export", () => {
    const { routeModule } = loadNextAuthRouteWithMocks();
    expect(routeModule.runtime).toBe("nodejs");
  });

  it("should create a single handler instance", () => {
    const { mocks } = loadNextAuthRouteWithMocks();
    expect(mocks.mockNextAuth).toHaveBeenCalledTimes(1);
  });
});
