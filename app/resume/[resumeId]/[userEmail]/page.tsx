// app/resume/[resumeId]/[userEmail]/page.tsx
import React from "react";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
// import Classic from "@/app/ui/resume/classic/classic-resume";
import { getData } from "@/app/lib/data";
import ThreeDAnimator from "@/app/ui/resume/3d-animator/3d-animator";
// import Elegant from "@/app/ui/resume/old/elegant/elegant";
// import Modern from "@/app/ui/resume/modern/modern";
import { notFound } from "next/navigation";

type ResumeParams = {
  resumeId: string;
  userEmail: string;
};

interface PageProps {
  // Next may pass params as a Promise or undefined
  params?: Promise<ResumeParams>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) return notFound();

  const { resumeId, userEmail } = resolvedParams;

  const props = await getData(resumeId, userEmail);
  if (!props || !props.resume) return notFound();

  const template = props.resume.template;

  return (
    <div>
      {template === "electrical-engineer" && <ElectricalEngineer {...props} />}
      {template === "3d-animator" && <ThreeDAnimator {...props} />}
      {/* {template === "elegant" && <Elegant {...props} />}
      {template === "modern" && <Modern {...props} />} */}
      {/* {template === "classic" && <Classic {...props} />} */}
    </div>
  );
}
