import { fetchSkillById } from "@/app/lib/data";
import EditSkill from "@/app/ui/forms/edit-skill";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const skill = await fetchSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <EditSkill skill={skill} />
    </div>
  );
}
