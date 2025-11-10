// app/dashboard/certifications/error.tsx
"use client";

import { useEffect } from "react";
import ErrorFallback from "@/ui/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
