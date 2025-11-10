"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/ui/ErrorFallback";

export default function CoverLetterIdError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CoverLetterIdError]", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
