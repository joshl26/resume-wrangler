// app/.../page.tsx
import { fetchSkillById } from "@/app/lib/data";
import EditSkill from "@/app/ui/forms/edit-skill";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // Next may pass params as a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) return notFound();

  const { id } = resolvedParams;

  const skill = await fetchSkillById(id);
  if (!skill) return notFound();

  return (
    <div>
      <EditSkill skill={skill} />
    </div>
  );
}
