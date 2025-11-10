"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  error: Error | null | undefined;
  reset?: () => void;
};

export default function ErrorFallback({ error, reset }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-4">
        {error?.message ?? "An unexpected error occurred."}
      </p>

      <div className="flex gap-3">
        {reset && (
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Try again
          </button>
        )}

        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded border"
        >
          Go home
        </button>

        <Link href="/support" className="px-4 py-2 rounded border">
          Get help
        </Link>
      </div>

      <pre className="mt-6 p-3 bg-gray-100 rounded text-xs max-w-prose overflow-auto">
        {process.env.NODE_ENV !== "production" && error
          ? String(error.stack ?? error.message)
          : null}
      </pre>
    </div>
  );
}
