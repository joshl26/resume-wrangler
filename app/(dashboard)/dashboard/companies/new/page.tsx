import { getUser } from "@/app/lib/data";
import NewCompany from "@/app/ui/forms/new-company";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

/**
 * New Company page (server component)
 *
 * Behavior:
 * - If the request is unauthenticated, show a sign-in CTA.
 * - If a valid session exists but no user is found, return notFound().
 * - Any unexpected errors are caught and shown as a friendly error message.
 */
export default async function Page(): Promise<JSX.Element> {
  try {
    const session = await auth();
    const email = session?.user?.email;

    // If not signed in, prompt the visitor to sign in instead of returning a 404
    if (!email) {
      return (
        <main className="w-full max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Create a Company</h1>
          <div className="rounded-lg bg-white p-6 tight-shadow">
            <p className="mb-4">You must be signed in to create a company.</p>
            <a
              href="/signin"
              className="inline-block rounded bg-azure-radiance-600 px-4 py-2 text-white hover:bg-azure-radiance-700"
            >
              Sign in
            </a>
          </div>
        </main>
      );
    }

    // Resolve user and guard if user record isn't found
    const user = await getUser(email);
    if (!user) {
      return notFound();
    }

    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Create a Company</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow">
          <NewCompany user={user} />
        </div>
      </main>
    );
  } catch (error) {
    // Log for server-side diagnostics and show a friendly message to the user
    console.error("Error rendering New Company page:", error);
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Create a Company</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow text-center">
          <p className="mb-4">
            Sorry — something went wrong while loading the page. Please try
            again later.
          </p>
        </div>
      </main>
    );
  }
}
