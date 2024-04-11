import React from "react";

async function ClosedApplicationsCount({
  closedApplicationsCount,
}: {
  closedApplicationsCount: any;
}) {
  return (
    <div className="tour-open-applications tight-shadow flex flex-col bg-gradient-rose h-[125px] w-full rounded-xl">
      <h2 className="test p-2 font-bold">Closed Applications</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {closedApplicationsCount !== null ? closedApplicationsCount : "0"}
      </h2>
    </div>
  );
}

export default ClosedApplicationsCount;
