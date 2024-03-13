import React from "react";
import Classic from "../../../ui/resume/classic/classic-resume";
import { user } from "../../../data/user-details";
import { useSearchParams } from "next/navigation";
import ElectricalEngineer from "../../../ui/resume/electrical-engineer/electrical-engineer";
import { getData } from "../../../lib/data";

async function Page({
  params: { resumeId, userEmail },
}: {
  params: { resumeId: string; userEmail: string };
}) {
  // const searchParams = useSearchParams();

  // const resumeId = searchParams.get("resumeId")!;
  // const userEmail = searchParams.get("userEmail")!;

  //TODO use jotai to laod global state. All data is fethed in

  // const props = await getData("4", "user@nextmail.com");
  const props = await getData(resumeId, userEmail);

  // console.log(resumeId, userEmail);

  return (
    <div>
      <ElectricalEngineer {...props} />
      {/* <Classic user={user} bodyFont={bodyFont} headingFont={headerFont} /> */}
    </div>
  );
}

export default Page;
