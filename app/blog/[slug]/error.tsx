"use client";

import React, { useEffect } from "react";
import ErrorFallback from "@/app/ui/ErrorFallback";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BlogPostError]", error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
