"use client";

import { useEffect } from "react";
import ErrorFallback from "@/app/ui/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Route-level logging; central monitoring should be added in ErrorFallback/ErrorBoundary
    console.error("[RouteError] /dashboard/education", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
