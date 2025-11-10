"use client";

import React, { useEffect } from "react";
import ErrorFallback from "./ui/ErrorFallback";

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console + optional monitoring
    console.error("[RootError]", error);
    // Example Sentry capture (if you use Sentry)
    // if ((window as any).Sentry) (window as any).Sentry.captureException(error)
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
