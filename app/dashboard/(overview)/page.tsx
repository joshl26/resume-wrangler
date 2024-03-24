import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { fetchApplicationsByUserId, getUser } from "@/app/lib/data";
import ApplicationsCard from "@/app/ui/dashboard/applications-card";
import WorldMap from "@/app/ui/dashboard/worldmap";

export default async function Page() {
  const session = await auth();
  // console.log(session);
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
  }

  const user = await getUser(session?.user?.email!);

  const applications = await fetchApplicationsByUserId(user?.id!);

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

          <div className="flex flex-row gap-4 p-4 ">
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col bg-international-orange-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Open Applications</h2>
              <h2 className="text-[3rem] m-auto">3</h2>
            </div>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col bg-rose-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Closed Applications</h2>
              <h2 className="text-[3rem] m-auto">5</h2>
            </div>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col bg-purple-heart-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Responses this week</h2>
              <h2 className="text-[3rem] m-auto">2</h2>
            </div>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col bg-azure-radiance-400 h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Weekly Goal</h2>
              <h2 className="text-[3rem] m-auto">3/15</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4">
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/2 h-[250px] bg-white rounded-xl">
              <h2 className="font-bold p-2">Trend</h2>
            </div>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/4 h-[250px] bg-white rounded-xl">
              <h2 className="font-bold p-2">Job Type</h2>
            </div>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/4 h-[250px] bg-white rounded-xl">
              <h2 className="font-bold p-2">Responses</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4 pt-4">
            <ApplicationsCard applications={applications} />{" "}
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/2 h-[275px] bg-white rounded-xl">
              <h2 className="font-bold p-2">Company Demographic</h2>
              {/* <WorldMap /> */}
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
