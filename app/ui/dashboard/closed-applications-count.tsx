import React from "react";

type CountValue = number | string | null | undefined;

interface ClosedApplicationsCountProps {
  closedApplicationsCount?: CountValue;
  className?: string;
  /**
   * Optional description for screen readers (useful if multiple cards are on the page).
   */
  srDescription?: string;
}

/** Coerce various incoming values into a safe non-negative integer. */
const toSafeNumber = (v?: CountValue): number => {
  if (v == null) return 0;
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  // Ensure integer and non-negative
  return Math.max(0, Math.floor(n));
};

const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export default function ClosedApplicationsCount({
  closedApplicationsCount,
  className = "",
  srDescription,
}: ClosedApplicationsCountProps) {
  const count = toSafeNumber(closedApplicationsCount);
  const formatted = formatNumber(count);

  return (
    <section
      className={`tour-closed-applications tight-shadow flex flex-col bg-gradient-rose w-full rounded-lg ${className}`}
      aria-labelledby="closed-applications-heading"
      role="region"
    >
      <h3
        id="closed-applications-heading"
        className="text-lg font-semibold pt-2 pl-2"
      >
        Closed Applications
      </h3>

      {/* Announce changes for assistive tech */}
      <div
        className="font-bold text-[3rem] m-auto"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatted}
      </div>

      {/* Provide additional contextual description for screen readers (optional) */}
      {srDescription ? (
        <p className="sr-only">{srDescription}</p>
      ) : (
        <p className="sr-only">Number of closed job applications.</p>
      )}
    </section>
  );
}
