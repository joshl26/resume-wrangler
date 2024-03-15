import React from "react";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import Classic from "@/app/ui/resume/classic/classic-resume";
import { getData } from "@/app/lib/data";

async function Page({
  params: { resumeId, userEmail },
}: {
  params: { resumeId: string; userEmail: string };
}) {
  // const props = await getData("4", "user@nextmail.com");
  const props = await getData(resumeId, userEmail);

  return (
    <div>
      {props.resume?.template === "electrical-engineer" && (
        <ElectricalEngineer {...props} />
      )}
      {props.resume?.template === "classic" && <Classic {...props} />}
    </div>
  );
}

export default Page;
