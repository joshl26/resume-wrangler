import React from "react";

async function OpenApplicationsCount({
  openApplicationsCount,
}: {
  openApplicationsCount: any;
}) {
  return (
    <div className="tour-open-applications tight-shadow flex flex-col bg-gradient-orange h-[125px] w-full rounded-lg">
      <h2 className="test p-2 font-bold">Open Applications</h2>
      <h2 className="font-bold text-[3rem] m-auto">
        {openApplicationsCount !== null ? openApplicationsCount : "0"}
      </h2>
    </div>
  );
}

export default OpenApplicationsCount;
