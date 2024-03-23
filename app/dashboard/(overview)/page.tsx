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
          {/* <div className="flex flex-row px-2 mt-6 ml-4 mr-4 border-red h-10 bg-slate-200">
            <p className="m-auto">
              Youre on the free plan. To create unlimited pdf resumes, export
              PDFs and more,
              <a className="underline" href="">
                Upgrade to PRO
              </a>
            </p>
          </div> */}
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col bg-international-orange-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Open Applications</h2>
              <h2 className="text-[3rem] m-auto">3</h2>
            </div>
            <div className=" flex flex-col bg-rose-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Closed Applications</h2>
              <h2 className="text-[3rem] m-auto">5</h2>
            </div>
            <div className=" flex flex-col bg-purple-heart-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Responses this week</h2>
              <h2 className="text-[3rem] m-auto">2</h2>
            </div>
            <div className="flex flex-col bg-azure-radiance-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Weekly Goal</h2>
              <h2 className="text-[3rem] m-auto">3/15</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4">
            <div className="w-1/2 h-[250px] bg-slate-200 rounded-xl">
              <h2 className="font-bold p-2">Trend</h2>
            </div>
            <div className="w-1/4 h-[250px] bg-slate-200 rounded-xl">
              <h2 className="font-bold p-2">Job Type</h2>
            </div>
            <div className="w-1/4 h-[250px] bg-slate-200 rounded-xl">
              <h2 className="font-bold p-2">Responses</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4 pt-4">
            <div className="w-1/2 h-[275px] bg-slate-200 rounded-xl">
              <div className="flex flex-row justify-between">
                <h2 className="font-bold p-2">Applications</h2>
                <div className="relative h-auto w-[125px] m-4">
                  <select className="h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-900 focus:border-2 focus:border-gray-900  ">
                    <option value="this-week">This Week</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row px-2">
                <button>
                  <div className="px-6 border border-purple-heart-400 bg-purple-heart-400 rounded-full p-1">
                    All
                  </div>
                </button>
              </div>
            </div>
            <div className="w-1/2 h-[275px] bg-slate-200 rounded-xl">
              <h2 className="font-bold p-2">Company Demographic</h2>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
