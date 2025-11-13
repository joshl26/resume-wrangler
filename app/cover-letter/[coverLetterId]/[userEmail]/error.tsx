"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/app/ui/ErrorFallback";

export default function CoverLetterUserError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CoverLetterUserError]", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
