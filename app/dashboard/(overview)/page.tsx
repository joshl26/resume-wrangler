import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { fetchApplicationsByUserId, getUser } from "@/app/lib/data";
import ApplicationsCard from "@/app/ui/dashboard/applications-card";
import TrendCard from "@/app/ui/dashboard/trend-card";
import JobTypeCard from "@/app/ui/dashboard/job-type-card";
import ResponsesCard from "@/app/ui/dashboard/responses-card";
import DemographicsCard from "@/app/ui/dashboard/demographics-card";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const user = await getUser(session?.user?.email!);

  const applications = await fetchApplicationsByUserId(user?.id!);

  return (
    <main className="w-full">
      <Suspense fallback={<CardsSkeleton />}>
        <div className="w-full h-full">
          <div className="flex flex-row gap-4 px-4 pb-4 ">
            <div className=" flex flex-col bg-gradient-orange h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Open Applications</h2>
              <h2 className="font-bold text-[3rem] m-auto">3</h2>
            </div>
            <div className=" flex flex-col bg-gradient-rose h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Closed Applications</h2>
              <h2 className="font-bold text-[3rem] m-auto">5</h2>
            </div>
            <div className=" flex flex-col bg-gradient-purple h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Responses this week</h2>
              <h2 className="font-bold text-[3rem] m-auto">2</h2>
            </div>
            <div className=" flex flex-col bg-gradient-azure h-[125px] w-full rounded-xl">
              <h2 className="p-2 font-bold">Weekly Goal</h2>
              <h2 className="font-bold text-[3rem] m-auto">3/15</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4">
            <TrendCard />
            <JobTypeCard />
            <ResponsesCard />
          </div>
          <div className="flex flex-row gap-4 px-4 pt-4">
            <ApplicationsCard applications={applications} />{" "}
            <DemographicsCard />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
