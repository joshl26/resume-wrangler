import Image from "next/image";
import React from "react";

const ResumeTemplates = ({
  resumeTemplates,
  resumeColors,
  bodyFonts,
  headerFonts,
}: {
  resumeTemplates: any;
  resumeColors: any;
  bodyFonts: any;
  headerFonts: any;
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-row flex-wrap gap-4 justify-around w-full">
        {resumeTemplates.map((template: any) => (
          <div className="" key={template.id}>
            <Image
              className="h-auto w-auto"
              width={150}
              height={150}
              alt={template.name}
              src={template.thumbnail_url}
            />
            <h1>{template.name}</h1>
            <a href={`/dashboard/resume/${template.id}`}>Preview</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
