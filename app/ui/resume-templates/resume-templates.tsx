import type { ResumeTemplate, ResumeTemplates } from "@/app/lib/definitions";
import Image from "next/image";
import React from "react";

const ResumeTemplates = ({
  resumeTemplates,
}: {
  resumeTemplates: ResumeTemplates;
}) => {
  return (
    <div className="h-full overflow-y-auto w-full ">
      <div className="flex flex-row max-w-screen-lg m-auto bg-rose-300 tight-shadow pt-[15vh]">
        <h1 className="text-3xl font-bold text-center w-full pb-16">
          Start off with one of our curated resume templates
        </h1>
      </div>
      <div className="flex flex-row flex-wrap gap-10 px-14 pb-20 max-w-screen-lg m-auto bg-rose-300 w-full justify-around">
        {resumeTemplates?.map(
          (template: ResumeTemplate) =>
            template?.thumbnail_url !== null && (
              <div className="w-[350px]" key={template?.id}>
                <a
                  className="w-full"
                  href={`/dashboard/resume/${template?.id}`}
                >
                  <Image
                    className=""
                    width={350}
                    height={0}
                    alt={template?.name}
                    src={
                      template?.thumbnail_url == null
                        ? ""
                        : template?.thumbnail_url
                    }
                  />
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">{template?.name}</h1>
                    <h1 className="hover:text-rose-500">Preview</h1>
                  </div>
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ResumeTemplates;
