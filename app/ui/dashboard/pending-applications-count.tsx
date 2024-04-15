import React from "react";

async function PendingApplicationsCount({
  pendingApplicationsCount,
}: {
  pendingApplicationsCount: any;
}) {
  return (
    <div className="tour-pending-applications tight-shadow flex flex-col bg-gradient-purple stats-card-container w-full rounded-lg">
      <h2 className="text-xl pt-2 pl-2 font-bold">Pending Applications</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {pendingApplicationsCount !== null ? pendingApplicationsCount : "0"}
      </h2>
    </div>
  );
}

export default PendingApplicationsCount;
