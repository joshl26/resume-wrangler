// app/cover-letter/[coverLetterId]/[userEmail]/page.tsx
import React from "react";
import { getCoverData } from "@/app/lib/data";
import StandardCover from "@/app/ui/cover/standard/standard-cover";
import CoverEditButton from "@/app/ui/cover-edit-button";
import { notFound } from "next/navigation";

type CoverParams = {
  coverLetterId: string;
  userEmail: string;
};

interface PageProps {
  // Match Next's generated signature: params may be a Promise or undefined
  params?: Promise<CoverParams>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { coverLetterId, userEmail } = resolvedParams;

  const props = await getCoverData(coverLetterId, userEmail);

  if (!props || !props.coverLetter) {
    return notFound();
  }

  const {
    user,
    coverLetter,
    company,
    application,
    selectedCoverExperiences,
    userCoverExperiences,
    selectedCoverBodyFont,
    selectedCoverHeadingFont,
    selectedCoverColor,
    selectedCoverHighlightColor,
  } = props;

  return (
    <div className="h-auto overflow-y-auto w-full">
      <CoverEditButton coverId={coverLetterId} />
      {coverLetter?.template === "standard" && (
        <StandardCover
          user={user}
          coverLetter={coverLetter}
          company={company}
          application={application}
          selectedCoverExperiences={selectedCoverExperiences}
          userCoverExperiences={userCoverExperiences}
          selectedCoverBodyFont={selectedCoverBodyFont}
          selectedCoverHeadingFont={selectedCoverHeadingFont}
          selectedCoverColor={selectedCoverColor}
          selectedCoverHighlightColor={selectedCoverHighlightColor}
        />
      )}
    </div>
  );
}
