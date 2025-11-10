"use client";

import React, { useEffect } from "react";
import ErrorFallback from "../ui/ErrorFallback";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[DashboardError]", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
