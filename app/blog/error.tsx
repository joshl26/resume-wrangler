"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/ui/ErrorFallback";

export default function BlogError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BlogError]", error);
    // Optional: send to monitoring (Sentry/LogRocket)
    // (window as any).Sentry?.captureException?.(error)
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
