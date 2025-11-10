// app/cover-letter/[coverLetterId]/[userEmail]/page.tsx
import React from "react";
import { getCoverData } from "@/app/lib/data";
import StandardCover from "@/app/ui/cover/standard/standard-cover";
import CoverEditButton from "@/app/ui/cover-edit-button";

type CoverParams = {
  coverLetterId: string;
  userEmail: string;
};

// Match Next's generated signature: params is Promise<...> | undefined
interface PageProps {
  params?: Promise<CoverParams>;
}

export default async function Page({ params }: PageProps) {
  // Await params (works whether it's a Promise or undefined)
  const resolvedParams = await params;

  if (!resolvedParams) {
    // Graceful fallback if Next doesn't pass params (shouldn't usually happen,
    // but this prevents runtime/destructure errors and satisfies the type-checker)
    return <div className="p-4 text-white">Missing route parameters.</div>;
  }

  const { coverLetterId, userEmail } = resolvedParams;

  const props = await getCoverData(coverLetterId, userEmail);

  if (!props) {
    return (
      <div className="p-4 text-white">Error loading cover letter data.</div>
    );
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
