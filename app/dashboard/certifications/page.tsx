import React from "react";
import { fetchCertificationsByUserId, getUser } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Certifications from "@/app/ui/tables/certifications/certifications-table";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="h-full w-full">
      <Link className="underline px-4" href={"/dashboard/"}>
        Back
      </Link>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold px-3">Certifications</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center">
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
