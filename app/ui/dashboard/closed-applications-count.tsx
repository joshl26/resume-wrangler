import React from "react";

async function ClosedApplicationsCount({
  closedApplicationsCount,
}: {
  closedApplicationsCount: any;
}) {
  return (
    <div className="tour-closed-applications tight-shadow flex flex-col bg-gradient-rose  w-full rounded-lg">
      <h2 className="text-xl pt-2 pl-2 font-bold">Closed Applications</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {closedApplicationsCount !== null ? closedApplicationsCount : "0"}
      </h2>
    </div>
  );
}

export default ClosedApplicationsCount;
