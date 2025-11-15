import { getUser } from "@/app/lib/data";
import NewEducation from "@/app/ui/forms/new-education";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

export default async function Page(): Promise<JSX.Element> {
  try {
    const session = await auth();
    const email = session?.user?.email;

    // If not signed in, prompt the visitor to sign in instead of returning a 404
    if (!email) {
      return (
        <main className="w-full max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Add Education</h1>
          <div className="rounded-lg bg-white p-6 tight-shadow text-center">
            <p className="mb-4">
              You must be signed in to add education details.
            </p>
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

    const user = await getUser(email);
    if (!user) {
      // If the session exists but no user record is found, treat as 404
      return notFound();
    }

    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add Education</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow">
          <NewEducation user={user} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error rendering Add Education page:", error);
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add Education</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow text-center">
          <p className="mb-4">
            Sorry — something went wrong while loading the page. Please try
            again later.
          </p>
          <a
            href="/dashboard"
            className="inline-block text-azure-radiance-600 hover:underline"
          >
            Back to dashboard
          </a>
        </div>
      </main>
    );
  }
}
