import React, { useMemo } from "react";
import DonutChart from "../charts/donut-chart";

type JobTypeCardProps = {
  openApplicationsCount?: number | string | null;
  closedApplicationsCount?: number | string | null;
  pendingApplicationsCount?: number | string | null;
};

const toNumber = (v?: number | string | null): number => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
};

function JobTypeCardComponent({
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: JobTypeCardProps) {
  // Normalize and memoize counts
  const { open, closed, pending, total, percentages } = useMemo(() => {
    const open = toNumber(openApplicationsCount);
    const closed = toNumber(closedApplicationsCount);
    const pending = toNumber(pendingApplicationsCount);
    const total = open + closed + pending;

    const percentages =
      total > 0
        ? {
            openPct: Math.round((open / total) * 100),
            pendingPct: Math.round((pending / total) * 100),
            closedPct: Math.round((closed / total) * 100),
          }
        : { openPct: 0, pendingPct: 0, closedPct: 0 };

    return { open, closed, pending, total, percentages };
  }, [
    openApplicationsCount,
    closedApplicationsCount,
    pendingApplicationsCount,
  ]);

  return (
    <section
      className="tour-status w-full min-h-[220px] bg-white rounded-lg tight-shadow p-4 flex flex-col"
      aria-labelledby="jobtype-heading"
      role="region"
    >
      <div className="flex items-start justify-between">
        <h3 id="jobtype-heading" className="font-bold text-lg">
          Status
        </h3>
        <span className="text-sm text-muted-foreground" aria-hidden>
          {total} total
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center mt-2">
        {total === 0 ? (
          <div className="text-center text-sm text-neutral-600">
            No applications yet.
          </div>
        ) : (
          <>
            <DonutChart
              openApplicationsCount={open}
              closedApplicationsCount={closed}
              pendingApplicationsCount={pending}
              aria-label="Application status distribution"
            />

            {/* Optional textual breakdown for screen readers and to augment the chart */}
            <ul className="sr-only" aria-hidden={false}>
              <li>
                Open: {open} ({percentages.openPct}%)
              </li>
              <li>
                Pending: {pending} ({percentages.pendingPct}%)
              </li>
              <li>
                Closed: {closed} ({percentages.closedPct}%)
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Visible, compact legend for sighted users */}
      {total > 0 && (
        <div className="mt-3 flex gap-3 justify-center text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
            Open — {open} ({percentages.openPct}%)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-300 inline-block" />
            Pending — {pending} ({percentages.pendingPct}%)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-300 inline-block" />
            Closed — {closed} ({percentages.closedPct}%)
          </span>
        </div>
      )}
    </section>
  );
}

const JobTypeCard = React.memo(JobTypeCardComponent);
export default JobTypeCard;
