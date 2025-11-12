// types/next-auth-augment.d.ts
import "next-auth";

declare module "next-auth" {
  // Add the authorized callback shape you need
  interface CallbacksOptions<P = any, A = any> {
    authorized?: (opts: {
      auth: { user?: any }; // you can narrow these types to your user type
      request: { nextUrl: URL };
    }) => Promise<boolean | Response> | boolean | Response;
  }
}