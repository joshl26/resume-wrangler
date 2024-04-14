import React from "react";
import { getCoverData } from "@/app/lib/data";
import StandardCover from "@/app/ui/cover/standard/standard-cover";
import CoverEditButton from "@/app/ui/cover-edit-button";

async function Page({
  params: { coverLetterId, userEmail },
}: {
  params: { coverLetterId: string; userEmail: string };
}) {
  const props = await getCoverData(coverLetterId, userEmail);

  const user = props?.user;
  const coverLetter = props?.cover;
  const company = props?.company;
  const application = props?.application;
  const selectedCoverExperiences = props?.selectedCoverExperiences;
  const userCoverExperiences = props?.userCoverExperiences;


  

  return (
    <div className="h-auto overflow-y-auto w-full">
      <CoverEditButton coverId={coverLetterId} />
      {props.coverLetter.template === "standard" && (
        <StandardCover
          user={user}
          coverLetter={coverLetter}
          company={company}
          application={application}
          selectedCoverExperiences={selectedCoverExperiences}
          userCoverExperiences={userCoverExperiences}
          selectedCoverBodyFont={""}
          selectedCoverHeadingFont={""}
          selectedCoverColor={""}
          selectedCoverHighlightColor={""}
        />
      )}
    </div>
  );
}

export default Page;

// coverLetter,
//   user,
//   company,
//   application,
//   selectedCoverExperiences,
//   userCoverExperiences,
//   selectedCoverBodyFont,
//   selectedCoverHeadingFont,
