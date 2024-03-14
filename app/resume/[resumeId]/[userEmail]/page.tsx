import React from "react";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import Classic from "@/app/ui/resume/classic/classic-resume";
import { getData } from "@/app/lib/data";

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
      {props.resume.template === "electrical-engineer" && (
        <ElectricalEngineer {...props} />
      )}
      {props.resume.template === "classic" && <Classic {...props} />}
    </div>
  );
}

export default Page;
