import React from "react";
import { CoverLetter, User } from "../lib/definitions";

const CoverLetterPreviewButton = ({
  coverLetter,
  user,
}: {
  coverLetter: CoverLetter;
  user: User;
}) => {
  return (
    <a
      href={`/dashboard/cover-letter-preview/${coverLetter?.id}/${user?.email}`}
      className="hover:bg-slate-600 text-white flex absolute bottom-6 right-6 w-[100px] h-[100px] bg-blue-500 border-2 border-black rounded-full"
    >
      <p className="font-bold text-lg w-full flex justify-center m-auto">
        Preview
      </p>
    </a>
  );
};

export default CoverLetterPreviewButton;
