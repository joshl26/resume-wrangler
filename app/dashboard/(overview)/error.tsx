"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/app/ui/ErrorFallback"; // Adjust the import path as needed

export default function DashboardOverviewError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[DashboardOverviewError]", error);
    // Optional: Add Sentry or other monitoring service integration here
    // if ((window as any).Sentry) (window as any).Sentry.captureException(error)
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
