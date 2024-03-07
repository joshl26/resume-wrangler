import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Button } from "@/app/ui/button";
import Applications from "@/app/ui/tables/applications/applications-table";
import CoverLetters from "@/app/ui/tables/cover-letters/covers-table";

export default async function Page() {
  return (
    <main className="w-full">
      <Suspense fallback={<CardsSkeleton />}>
        <div className="border border-red w-full h-full">
          <div className="flex flex-row px-2 mt-6 ml-4 mr-4 border-red h-10 bg-slate-200">
            <p className="m-auto">
              Youre on the free plan. To create unlimited pdf resumes, export
              PDFs and more,
              <a className="underline" href="">
                Upgrade to PRO
              </a>
            </p>
          </div>
          <div className="flex flex-row gap-6 mt-6 ml-4 mr-4 border-red h-10 bg-slate-200">
            <Button>Your Applications</Button>
            <Button>Cover Letter Templates</Button>
            <Button>Your Cover Letters</Button>
            <Button>Résumé Templates</Button>
            <Button>Your Résumés</Button>
            <Button>User Profile</Button>
            <Button>Upgrade to PRO</Button>
          </div>
          {/* <Applications  /> */}
          <CoverLetters />
        </div>
      </Suspense>
    </main>
  );
}
