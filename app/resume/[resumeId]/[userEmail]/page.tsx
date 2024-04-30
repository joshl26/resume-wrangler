import React from "react";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
// import Classic from "@/app/ui/resume/classic/classic-resume";
import { getData } from "@/app/lib/data";
import ThreeDAnimator from "@/app/ui/resume/3d-animator/3d-animator";
import Elegant from "@/app/ui/resume/elegant/elegant";
import Modern from "@/app/ui/resume/modern/modern";

async function Page({
  params: { resumeId, userEmail },
}: {
  params: { resumeId: string; userEmail: string };
}) {
  const props = await getData(resumeId, userEmail);

  return (
    <div>
      {props.resume?.template === "electrical-engineer" && (
        <ElectricalEngineer {...props} />
      )}
      {props.resume?.template === "3d-animator" && (
        <ThreeDAnimator {...props} />
      )}
      {props.resume?.template === "elegant" && <Elegant {...props} />}
      {props.resume?.template === "modern" && <Modern {...props} />}

      {/* {props.resume?.template === "classic" && <Classic {...props} />} */}
    </div>
  );
}

export default Page;
