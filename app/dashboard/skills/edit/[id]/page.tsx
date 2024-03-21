import {
  fetchCertificationById,
  fetchOrganizationById,
  fetchSkillById,
} from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import EditOrganization from "@/app/ui/forms/edit-organization";
import EditSkill from "@/app/ui/forms/edit-skill";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const skill: any = await fetchSkillById(id);

  if (skill?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditSkill skill={skill} />
    </div>
  );
}
