/// <reference types="jest" />
import { authConfig } from "../auth.config";

describe("auth.config.ts", () => {
  // Mock global Response.redirect for Node environment
  const redirectMock = jest.fn((url: URL) => {
    return {
      status: 307,
      headers: {
        get: (name: string) =>
          name.toLowerCase() === "location" ? url.toString() : null,
      },
    };
  });

  beforeAll(() => {
    // Provide a global Response object with redirect mocked
    (global as any).Response = { redirect: redirectMock };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("callbacks.authorized", () => {
    const authorized = authConfig.callbacks?.authorized!;
    if (!authorized) throw new Error("authorized callback not defined");

    it("redirects authenticated users away from non-dashboard pages to /dashboard", async () => {
      const req = { nextUrl: new URL("http://localhost:3000/login") } as any;

      const result = await authorized({
        auth: { user: { id: "1" } },
        request: req,
      } as any);

      // Assert the mock was called with a URL
      expect(redirectMock).toHaveBeenCalledWith(expect.any(URL));

      // Safely access mock.calls via casting to jest.Mock
      const calls = (redirectMock as jest.Mock).mock.calls;
      expect(calls.length).toBeGreaterThan(0);

      const calledWithUrl = calls[0][0] as URL;
      expect(calledWithUrl.toString()).toBe("http://localhost:3000/dashboard");

      // Ensure the returned object contains the location header we expect
      expect(result).toBeDefined();
      const location = (result as any).headers.get("location");
      expect(location).toBe("http://localhost:3000/dashboard");
    });
  });
});
