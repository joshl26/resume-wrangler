"use client";

import Image from "next/image";
import React, { useState } from "react";
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

const JobBoards: React.FC = () => {
  const [jobTitle, setJobTitle] = useState<string>("Software Engineer");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  return (
    <section className="job-boards-section">
      <div className="job-boards-card">
        <h1 className="job-boards-title">What is your job title?</h1>
        <p className="job-boards-subtitle">
          Type in the job position you are looking for.
        </p>

        <input
          type="text"
          value={jobTitle}
          onChange={handleChange}
          placeholder="e.g. Software Engineer"
          className="job-boards-input"
          aria-label="Enter job title"
        />

        <div className="job-boards-divider"></div>

        <div
          className="job-boards-list"
          role="list"
          aria-label="Job board links"
        >
          {searchProviders.map((provider) => (
            <div key={provider.id} className="job-board-item" role="listitem">
              <div className="job-board-logo">
                <Image
                  src={provider.logoImage}
                  alt={`${provider.name} logo`}
                  width={100}
                  height={40}
                  className="job-board-logo-img"
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
                  <span>Search {provider.name}</span>
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
