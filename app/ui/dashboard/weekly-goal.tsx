import React from "react";

async function WeeklyGoalCount({
  weeklyGoalCount,
}: {
  weeklyGoalCount: number;
}) {
  return (
    <div className="tour-goal tight-shadow flex flex-col bg-gradient-azure stats-card-container w-full rounded-lg">
      <h2 className="text-xl pl-2 pt-2 font-bold">Weekly Goal</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {weeklyGoalCount !== null ? `${weeklyGoalCount}/15` : "0"}
      </h2>
    </div>
  );
}

export default WeeklyGoalCount;
