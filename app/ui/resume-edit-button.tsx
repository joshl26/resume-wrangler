import React from "react";

const ResumeEditButton = ({ resumeId }: { resumeId: any }) => {
  return (
    <a
      href={`/dashboard/resume/edit/${resumeId}`}
      className="hover:bg-slate-600 text-white flex absolute bottom-6 right-6 w-[100px] h-[100px] bg-blue-500 border-2 border-black rounded-full"
    >
      <p className="font-bold text-lg w-full flex justify-center m-auto">
        Edit
      </p>
    </a>
  );
};

export default ResumeEditButton;
