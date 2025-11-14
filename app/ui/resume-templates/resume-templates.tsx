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
      <div className="resume-templates-empty">
        <p>No resume templates available at this time.</p>
      </div>
    );
  }

  return (
    <section className="resume-templates">
      <div className="resume-templates-header">
        <h1 className="resume-templates-title">
          Start off with one of our curated resume templates
        </h1>
      </div>

      <div
        className="resume-templates-grid"
        role="list"
        aria-label="Resume templates"
      >
        {resumeTemplates.map((template) => {
          if (!template.thumbnail_url) return null;

          return (
            <div
              className="resume-template-card"
              key={template.id}
              role="listitem"
            >
              <Link
                href={`/dashboard/resume/${template.id}`}
                className="resume-template-link"
                aria-label={`Preview ${template.name}`}
              >
                <div className="resume-template-thumb">
                  <Image
                    src={template.thumbnail_url}
                    alt={template.name}
                    width={350}
                    height={450}
                    className="resume-template-img"
                  />
                </div>

                <div className="resume-template-info">
                  <h3 className="resume-template-name">{template.name}</h3>
                  <span className="resume-template-preview">Preview</span>
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
