// app/ui/resume-templates/resume-templates.tsx
import type { ResumeTemplate, ResumeTemplates } from "@/app/lib/definitions";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface ResumeTemplatesProps {
  resumeTemplates: ResumeTemplates;
}

const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({
  resumeTemplates,
}) => {
  if (!resumeTemplates || resumeTemplates.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No resume templates available at this time.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Start off with one of our curated resume templates
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Choose a professional design to showcase your experience
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
        aria-label="Resume templates"
      >
        {resumeTemplates.map((template) => {
          if (!template.thumbnail_url) return null;

          return (
            <div
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              key={template.id}
              role="listitem"
            >
              <Link
                href={`/dashboard/resume/${template.id}`}
                className="block h-full"
                aria-label={`Preview ${template.name}`}
              >
                <div className="relative aspect-[350/450] w-full overflow-hidden">
                  <Image
                    src={template.thumbnail_url}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    Preview
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResumeTemplates;
