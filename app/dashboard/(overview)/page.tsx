import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main className="w-full">
      <Suspense fallback={<CardsSkeleton />}>
        <div className="border border-red w-full h-full">
          <div className="flex flex-row px-2 mt-6 ml-4 mr-4 border-red h-10 bg-slate-200">
            <p className="m-auto">
              Youre on the free plan. To create unlimited pdf resumes, export
              PDFs and more,{" "}
              <a className="underline" href="">
                Upgrade to PRO
              </a>
            </p>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
