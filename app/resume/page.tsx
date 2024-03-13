import React from "react";
import Classic from "../ui/resume/classic/classic-resume";
import { user } from "../data/user-details";
import { useSearchParams } from "next/navigation";
import ElectricalEngineer from "../ui/resume/electrical-engineer/electrical-engineer";
import { getData } from "../lib/data";

async function Page() {
  // const searchParams = useSearchParams();

  // const bodyFont = searchParams.get("bodyFont")!;
  // const headerFont = searchParams.get("headerFont")!;

  //TODO use jotai to laod global state. All data is fethed in

  const props = await getData("4", "user@nextmail.com");

  // console.log(data);

  return (
    <div>
      <ElectricalEngineer {...props} />
      {/* <Classic user={user} bodyFont={bodyFont} headingFont={headerFont} /> */}
    </div>
  );
}

export default Page;
