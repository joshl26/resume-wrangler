// definition: Add a new skill entry for the authenticated user.
// file: app/(dashboard)/dashboard/skills/new/page.tsx

import { getUser } from "@/app/lib/data";
import NewSkill from "@/app/ui/forms/new-skill";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { JSX } from "react";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add Skill</h1>
        <div className="rounded-lg bg-white p-6 tight-shadow text-center">
          <p className="mb-4">You must be signed in to add skill details.</p>
          <a
            href="/signin"
            className="inline-block rounded bg-azure-radiance-600 px-4 py-2 text-white hover:bg-azure-radiance-700"
          >
            Sign in
          </a>
        </div>
      </main>
    );
  }

  const user = await getUser(email);
  if (!user) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Skills", url: "/dashboard/skills/" },
    { name: "Add Skill", url: "/dashboard/skills/new/" },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <div className="rounded-lg my-8 p-6 tight-shadow">
        <NewSkill user={user} />
      </div>
      <BackButton href="/dashboard/skills/" className="mt-4">
        Back to Skills
      </BackButton>
    </div>
  );
}
