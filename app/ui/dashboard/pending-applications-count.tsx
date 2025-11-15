import React from "react";

type CountValue = number | string | null | undefined;

interface PendingApplicationsCountProps {
  pendingApplicationsCount?: CountValue;
  className?: string;
  srDescription?: string;
}

/** Normalize incoming values to a safe non-negative integer */
const toSafeNumber = (v?: CountValue): number => {
  if (v == null) return 0;
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
};

const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export default function PendingApplicationsCount({
  pendingApplicationsCount,
  className = "",
  srDescription,
}: PendingApplicationsCountProps) {
  const count = toSafeNumber(pendingApplicationsCount);
  const formatted = formatNumber(count);

  return (
    <section
      className={`tour-pending-applications tight-shadow flex flex-col bg-gradient-purple stats-card-container w-full rounded-lg ${className}`}
      role="region"
      aria-labelledby="pending-applications-heading"
    >
      <h3
        id="pending-applications-heading"
        className="text-lg font-semibold pt-2 pl-2"
      >
        Pending Applications
      </h3>

      <div
        className="font-bold text-[3rem] m-auto"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatted}
      </div>

      <p className="sr-only">
        {srDescription ?? "Number of pending job applications."}
      </p>
    </section>
  );
}
