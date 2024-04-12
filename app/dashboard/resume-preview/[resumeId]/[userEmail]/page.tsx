import React from "react";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import { getData } from "@/app/lib/data";
import EditButton from "@/app/ui/edit-button";
import ThreeDAnimator from "@/app/ui/resume/3d-animator/3d-animator";

async function Page({
  params: { resumeId, userEmail },
}: {
  params: { resumeId: string; userEmail: string };
}) {
  const props = await getData(resumeId, userEmail);

  return (
    <div className="h-auto overflow-y-auto w-full">
      <EditButton resumeId={resumeId} />
      {props.resume.template === "electrical-engineer" && (
        <ElectricalEngineer {...props} />
      )}
      {props.resume.template === "3d-animator" && <ThreeDAnimator {...props} />}
      {/* {props.resume.template === "classic" && <Classic {...props} />} */}
    </div>
  );
}

export default Page;
