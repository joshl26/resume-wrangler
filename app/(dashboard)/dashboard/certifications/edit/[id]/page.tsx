// app/.../page.tsx
import { fetchCertificationById } from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // Keep the signature flexible in case Next provides a Promise
  params?: Params | Promise<Params> | undefined;
}

export default async function Page({ params }: PageProps) {
  try {
    // Support both promise and plain object for params
    const resolvedParams = params instanceof Promise ? await params : params;

    // If params are missing or id is invalid, show 404
    if (
      !resolvedParams ||
      !resolvedParams.id ||
      typeof resolvedParams.id !== "string"
    ) {
      return notFound();
    }

    const id = resolvedParams.id.trim();
    if (!id) return notFound();

    // Fetch the certification
    const certification = await fetchCertificationById(id);

    // If not found, show 404
    if (!certification) {
      return notFound();
    }

    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Certification</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow">
          <EditCertification certification={certification} />
        </div>
      </main>
    );
  } catch (error) {
    // Log for server diagnostics and show a user-friendly fallback
    console.error("Error rendering Edit Certification page:", error);
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Certification</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow text-center">
          <p className="mb-4">
            Sorry — something went wrong while loading the certification. Please
            try again later.
          </p>
          <a
            href="/dashboard/certifications"
            className="inline-block text-azure-radiance-600 hover:underline"
          >
            Back to certifications
          </a>
        </div>
      </main>
    );
  }
}
