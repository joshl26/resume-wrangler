// app/dashboard/applications/error.tsx
"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/ui/ErrorFallback";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Route-level logging; ErrorFallback can also log if desired.
    console.error("[RouteError] /dashboard/applications", error);
  }, [error]);

  // Delegate UI + reset actions to the shared fallback
  return <ErrorFallback error={error} reset={reset} />;
}
