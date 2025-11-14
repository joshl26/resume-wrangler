// app/ui/job-boards/JobBoards.tsx
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SearchProvider {
  id: number;
  name: string;
  url: string;
  searchUrl: string;
  logoImage: string;
}

const searchProviders: SearchProvider[] = [
  {
    id: 1,
    name: "Indeed",
    url: "https://ca.indeed.com/",
    searchUrl: "https://ca.indeed.com/jobs?q=",
    logoImage: "/logo-indeed.svg",
  },
  {
    id: 2,
    name: "Monster",
    url: "https://www.monster.ca/",
    searchUrl: "https://www.monster.ca/jobs/search?q=",
    logoImage: "/logo-monster.png",
  },
  {
    id: 3,
    name: "Glassdoor",
    url: "https://www.glassdoor.ca/",
    searchUrl: "https://www.glassdoor.ca/Job/jobs.htm?sc.keyword=",
    logoImage: "/logo-glassdoor.png",
  },
  {
    id: 4,
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    searchUrl: "https://www.linkedin.com/jobs/search?keywords=",
    logoImage: "/logo-linkedin.svg",
  },
  {
    id: 5,
    name: "Google",
    url: "https://www.google.com/",
    searchUrl: "https://www.google.com/search?q=&oq=&ibp=htl;jobs",
    logoImage: "/logo-google.svg",
  },
  {
    id: 6,
    name: "Jooble",
    url: "https://jooble.org/",
    searchUrl: "https://jooble.org/SearchResult?ukw=",
    logoImage: "/logo-jooble.svg",
  },
  {
    id: 7,
    name: "SimplyHired",
    url: "https://www.simplyhired.com/",
    searchUrl: "https://www.simplyhired.com/search?q=",
    logoImage: "/logo-simply-hired.png",
  },
  {
    id: 8,
    name: "ZipRecruiter",
    url: "https://www.ziprecruiter.com/",
    searchUrl: "https://www.ziprecruiter.com/jobs-search?search=",
    logoImage: "/logo-zip-recruiter.svg",
  },
  {
    id: 9,
    name: "Snagajob",
    url: "https://www.snagajob.com/",
    searchUrl: "https://www.snagajob.com/search?q=",
    logoImage: "/logo-snagajob.jpg",
  },
  {
    id: 10,
    name: "CareerBuilder",
    url: "https://www.careerbuilder.com/",
    searchUrl: "https://www.careerbuilder.com/jobs?emp=&keywords=",
    logoImage: "/logo-career-builder.png",
  },
  {
    id: 11,
    name: "Idealist",
    url: "https://www.idealist.org/",
    searchUrl: "https://www.idealist.org/en/jobs?q=",
    logoImage: "/logo-idealist.png",
  },
];

interface JobBoardsProps {
  initialQuery?: string;
}

const JobBoards: React.FC<JobBoardsProps> = ({ initialQuery = "" }) => {
  const [jobTitle, setJobTitle] = useState<string>(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="job-boards-section"
      aria-labelledby="job-boards-heading"
    >
      <div className="job-boards-card">
        <div className="job-boards-header">
          {/* title and subtitle color now come from job-boards CSS via the classes */}
          <h2 id="job-boards-heading" className="job-boards-title">
            Find Your Next Job
          </h2>
          <p className="job-boards-subtitle">
            Search across multiple job boards at once
          </p>
        </div>

        <form onSubmit={handleSubmit} className="job-boards-form">
          <div
            className={`job-boards-input-wrapper ${isFocused ? "focused" : ""}`}
          >
            <input
              ref={inputRef}
              type="text"
              value={jobTitle}
              onChange={handleChange}
              placeholder="Enter job title, keywords, or company"
              className="job-boards-input"
              aria-label="Enter job title, keywords, or company"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="submit"
              className="sr-only"
              aria-label="Submit search"
            >
              Search
            </button>
          </div>
        </form>

        <div className="job-boards-divider" aria-hidden="true" />

        <div
          className="job-boards-list"
          role="list"
          aria-label="Job board search links"
        >
          {searchProviders.map((provider) => (
            <div key={provider.id} className="job-board-item" role="listitem">
              <div className="job-board-logo" aria-hidden="true">
                <Image
                  src={provider.logoImage}
                  alt={`${provider.name} logo`}
                  width={100}
                  height={40}
                  className="job-board-logo-img"
                  unoptimized
                />
              </div>

              <Link
                href={
                  jobTitle
                    ? `${provider.searchUrl}${encodeURIComponent(jobTitle)}`
                    : provider.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="job-board-link"
                aria-label={
                  jobTitle
                    ? `Search ${provider.name} for ${jobTitle}`
                    : `Visit ${provider.name}`
                }
              >
                {jobTitle ? (
                  <span>
                    Search <strong>{provider.name}</strong> for{" "}
                    <em>&quot;{jobTitle}&quot;</em>
                  </span>
                ) : (
                  <span>Visit {provider.name}</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobBoards;
