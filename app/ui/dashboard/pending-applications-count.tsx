import React from "react";

async function PendingApplicationsCount({
  pendingApplicationsCount,
}: {
  pendingApplicationsCount: any;
}) {
  return (
    <div className="tour-open-applications tight-shadow flex flex-col bg-gradient-purple h-[125px] w-full rounded-lg">
      <h2 className="test p-2 font-bold">Pending Applications</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {pendingApplicationsCount !== null ? pendingApplicationsCount : "0"}
      </h2>
    </div>
  );
}

export default PendingApplicationsCount;
