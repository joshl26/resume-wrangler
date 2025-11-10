"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/ui/ErrorFallback";

export default function CoverLetterError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CoverLetterError]", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
