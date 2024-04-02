import React from "react";
import { fetchCertificationsByUserId, getUser } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Certifications from "@/app/ui/tables/certifications/certifications-table";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const user = await getUser(session?.user?.email!);
  const certifications = await fetchCertificationsByUserId(user?.id);

  if (!user ?? !certifications) {
    notFound();
  }

  return (
    <div className="h-full w-full px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Certifications</h1>
        </div>
        <div className="flex flex-col px-3">
          <Button className="btn btn-amber tight-shadow">
            <a href="/dashboard/certifications/new" className="m-auto">
              Add new certification
            </a>
          </Button>
        </div>
      </div>
      <Certifications certifications={certifications} />
    </div>
  );
}
