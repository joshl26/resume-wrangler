import React from "react";

type CountValue = number | string | null | undefined;

interface WeeklyGoalCountProps {
  weeklyGoalCount?: CountValue;
  totalGoal?: number;
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

export default function WeeklyGoalCount({
  weeklyGoalCount,
  totalGoal = 15,
  className = "",
  srDescription,
}: WeeklyGoalCountProps) {
  const count = toSafeNumber(weeklyGoalCount);
  const safeTotal = Math.max(1, Math.floor(totalGoal)); // ensure at least 1
  const clampedCount = Math.min(count, safeTotal);
  const percent = Math.round((clampedCount / safeTotal) * 100);
  const formattedCount = formatNumber(clampedCount);
  const formattedTotal = formatNumber(safeTotal);

  return (
    <section
      className={`tour-goal tight-shadow flex flex-col bg-gradient-azure stats-card-container w-full rounded-lg p-4 ${className}`}
      role="region"
      aria-labelledby="weekly-goal-heading"
    >
      <h3 id="weekly-goal-heading" className="text-lg font-semibold">
        Weekly Goal
      </h3>

      <div className="flex items-center gap-4 my-3">
        <div className="font-bold text-[2.25rem] leading-none">
          {formattedCount}/{formattedTotal}
        </div>
        <div className="text-sm text-neutral-700">{percent}%</div>
      </div>

      {/* Accessible progress bar */}
      <div
        role="progressbar"
        aria-valuenow={clampedCount}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label="Weekly goal progress"
        className="w-full h-3 bg-white/30 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-azure-radiance-400 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Hidden description for screen readers (optional) */}
      <p className="sr-only">
        {srDescription ??
          `You have completed ${formattedCount} out of ${formattedTotal} tasks this week (${percent} percent).`}
      </p>
    </section>
  );
}
