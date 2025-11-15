import React from "react";

type CountValue = number | string | null | undefined;

interface OpenApplicationsCountProps {
  openApplicationsCount?: CountValue;
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

export default function OpenApplicationsCount({
  openApplicationsCount,
  className = "",
  srDescription,
}: OpenApplicationsCountProps) {
  const count = toSafeNumber(openApplicationsCount);
  const formatted = formatNumber(count);

  return (
    <section
      data-testid="tour-open-applications"
      className={`tour-open-applications tight-shadow flex flex-col bg-gradient-orange stats-card-container w-full rounded-lg ${className}`}
      aria-labelledby="open-applications-heading"
      role="region"
    >
      <h3
        id="open-applications-heading"
        className="text-lg font-semibold pt-2 pl-2"
      >
        Open Applications
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
        <p className="sr-only">Number of currently open job applications.</p>
      )}
    </section>
  );
}
